Wakeup Source
--------------------------
The following table lists the wakeup sources that can be used to wake up the system under different power modes.

.. table:: Wakeup sources
   :width: 100%
   :widths: auto

   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | Wakeup source  | Sleep CG | Sleep PG | Deep-sleep | Restriction                                                                                                            |
   +================+==========+==========+============+========================================================================================================================+
   | WLAN           | √        | √        | X          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | BT             | √        | √        | X          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | IPC            | √        | √        | X          | Only KM0 can use the IPC to wake up KM4.                                                                               |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | Basic Timer4~7 | √        | √        | X          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | PMC Timer      | √        | √        | X          | For internal usage                                                                                                     |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | UART0~2        | √        | √        | X          | - When using UART as a wakeup source, the Rx clock source can only be OSC2M, and do not turn off OSC4M during sleep.   |
   |                |          |          |            |                                                                                                                        |
   |                |          |          |            | - When the baudrate is larger than 115200, it is not recommended to use UART as a wakeup source.                       |
   |                |          |          |            |                                                                                                                        |
   |                |          |          |            | - The portion of the command used to wake up that exceeds the FIFO depth (64B) will be lost.                           |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | LOGUART        | √        | √        | X          | When using LOGUART as a wakeup source:                                                                                 |
   |                |          |          |            |                                                                                                                        |
   |                |          |          |            | - If the Rx clock source is XTAL40M, do not turn off XTAL or OSC4M during sleep.                                       |
   |                |          |          |            |                                                                                                                        |
   |                |          |          |            | - If the Rx clock source is OSC2M, do not turn off OSC4M during sleep.                                                 |
   |                |          |          |            |                                                                                                                        |
   |                |          |          |            | - The portion of the command used to wake up that exceeds the FIFO depth (16B) will be lost.                           |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | GPIO           | √        | √        | X          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | I2C            | √        | √        | X          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | CAP_TOUCH      | √        | √        | X          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | ADC            | √        | √        | X          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | SDIO           | √        | √        | X          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | Key-Scan       | √        | √        | X          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | BOR            | √        | √        | √          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | PWR_DOWN       | √        | √        | √          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | AON_TIMER      | √        | √        | √          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | AON_WAKEPIN    | √        | √        | √          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+
   | RTC            | √        | √        | √          |                                                                                                                        |
   +----------------+----------+----------+------------+------------------------------------------------------------------------------------------------------------------------+

Entering Sleep Mode
--------------------------------------
Sleep mode is based on FreeRTOS tickless, thus it is recommended to enter sleep mode by releasing the wakelock.

1. Initialize the specific peripheral.

2. Enable and register the peripheral's interrupt.

3. Set ``sleep_wevent_config[]`` in :file:`ambea_sleepcfg.c`, and the interrupt should be registered on the same CPU selected by ``sleep_wevent_config[]``.

4. For peripherals that need special clock settings, set ``ps_config[]`` in :file:`ameba_sleepcfg.c` if needed.

5. Register sleep/wakeup callback if needed.

6. Enter sleep mode by releasing the wakelock in KM4 (`PMU_OS` needs to be released since it is acquired by default when boot).

7. Clear the peripheral's interrupt when wakeup.


For peripherals that need specific clock settings, such as UART and LOGUART, their setting flows are described in Section :ref:`power_saving_uart` and :ref:`power_saving_loguart`.

.. _power_saving_uart:

UART
~~~~~~~~
.. note::
   When using UART as a wakeup source, there are some restrictions:
   
   - The Rx clock source can only be OSC2M, and do not turn off OSC4M during sleep.
   - When the baudrate is larger than 115200, it is not recommended to use UART as a wakeup source.
   - The portion of the command used to wake up that exceeds the FIFO depth (64B) will be lost.

**Configuration:**

1. Initialize UART and enable its interrupt.

2. Set the related wakeup source (`WAKE_SRC_UART0`/`WAKE_SRC_UART1`/`WAKE_SRC_UART2_BT`) in ``sleep_wevent_config[]`` to `WAKEUP_KM4` or `WAKEUP_KM0` (based on which CPU you want to wake). The interrupt should be registered on the same CPU selected by `sleep_wevent_config[]`.

3. Set `keep_OSC4M_on` in ``ps_config[]`` to **TRUE** to keep OSC4M enabled during sleep mode.

4. Switch clock to OSC2M with API ``RCC_PeriphClockSource_UART(UARTx_DEV, UART_RX_CLK_OSC_LP)``.

5. Enter sleep mode by releasing the wakelock in KM4 (PMU_OS needs to be released since it is acquired by default when boot).

6. Clear the UART interrupt when wakeup.

7. If a higher baudrate is required after waking up, it is recommended to switch to XTAL40M Rx clock by API ``RCC_PeriphClockSource_UART(UART0_DEV, UART_RX_CLK_XTAL_40M)``.

.. _power_saving_loguart:

LOGUART
~~~~~~~~~~~~~~
.. note::
   When using LOGUART as a wakeup source, there are some restrictions:
   
   - If the Rx clock source is XTAL40M, do not turn off XTAL or OSC4M during sleep; if the Rx clock source is OSC2M, do not turn off OSC4M during sleep.
   - The portion of the command used to wake up that exceeds the FIFO depth (16B) will be lost.

**Configuration:**

1. Initialize LOGUART and enable its interrupt.

2. Set `WAKE_SRC_UART_LOG` in ``sleep_wevent_config[]`` to `WAKEUP_KM4` or `WAKEUP_KM0` (based on which CPU you want to wake). The interrupt should be registered on the same CPU selected by `sleep_wevent_config[]`.

3. Set `xtal_mode_in_sleep` to **XTAL_Normal** in ``ps_config[]``.

4. Enter sleep mode by releasing the wakelock in KM4 (PMU_OS needs to be released since it is acquired by default when boot).

5. Clear the LOGUART interrupt when wakeup.

Entering Deep-Sleep Mode
------------------------------------------------
Deep-sleep can also be entered from FreeRTOS tickless flow.

When the system boots, KM4 holds the deepwakelock `PMU_OS`,
thus :func:`freertos_ready_to_dsleep()` will be checked fail and the system does not enter deep-sleep mode in idle task by default.
Since :func:`freertos_ready_to_dsleep()` will be checked only after :func:`freertos_ready_to_sleep()` is checked pass,
both the wakelock and deepwakelock need to be released for entering deep-sleep mode.

**Configuration:**

1. Initialize the related peripheral and enable its interrupt.

2. Set ``sleep_wakepin_config[]`` in :file:`ameba_sleepcfg.c` when using AON wakepin as a wakeup source.

3. Enter deep-sleep mode by releasing the deepwakelock and wakelock in KM4.

Power-Saving Configuration
----------------------------
Wakeup Mask Setup
~~~~~~~~~~~~~~~~~~~
For sleep mode, only one CPU is required to wake up to execute the program in some situations. The wakeup mask module is designed to implement this function.
By setting a wakeup mask, you can choose to wake up only KM0, or KM4. If KM4 is chosen, KM0 will be waked up first and then KM0 will resume KM4.

Users can set the wakeup attribute in ``sleep_wevent_config[]`` in :file:`ameba_sleepcfg.c` to choose which CPU you want to wake up.
The wakeup attribute of each wakeup source can be set to **WAKEUP_KM4** or **WAKEUP_KM0** or **WAKEUP_NULL**,
respectively indicating that this wakeup source is only to wake up KM4, or wake up KM0, or not used as a wakeup source.

.. code-block:: c

   /* Wakeup entry can be set to WAKEUP_NULL/WAKEUP_KM4/WAKEUP_KM0 */
   WakeEvent_TypeDef sleep_wevent_config[] = {
   //   Module              Wakeup
   {WAKE_SRC_SDIO,          WAKEUP_NULL},
   {WAKE_SRC_AON_WAKEPIN,      WAKEUP_NULL},
   {WAKE_SRC_AON_TIM,        WAKEUP_NULL},
   {WAKE_SRC_Keyscan,        WAKEUP_NULL},
   {WAKE_SRC_PWR_DOWN,        WAKEUP_NULL},
   {WAKE_SRC_BOR,          WAKEUP_NULL},
   {WAKE_SRC_ADC,          WAKEUP_NULL},
   {WAKE_SRC_RTC,          WAKEUP_NULL},
   {WAKE_SRC_CTOUCH,        WAKEUP_NULL},
   {WAKE_SRC_I2C1,          WAKEUP_NULL},
   {WAKE_SRC_I2C0,          WAKEUP_NULL},
   {WAKE_SRC_GPIOB,        WAKEUP_NULL},
   {WAKE_SRC_GPIOA,        WAKEUP_NULL},
   {WAKE_SRC_UART_LOG,        WAKEUP_NULL},
   {WAKE_SRC_UART2_BT,        WAKEUP_NULL},
   {WAKE_SRC_UART1,        WAKEUP_NULL},
   {WAKE_SRC_UART0,        WAKEUP_NULL},
   {WAKE_SRC_pmc_timer1,      WAKEUP_KM0},  /* Internal use, do not change it*/
   {WAKE_SRC_pmc_timer0,      WAKEUP_KM4},  /* Internal use, do not change it*/
   {WAKE_SRC_Timer7,        WAKEUP_NULL},
   {WAKE_SRC_Timer6,        WAKEUP_NULL},
   {WAKE_SRC_Timer5,        WAKEUP_NULL},
   {WAKE_SRC_Timer4,        WAKEUP_NULL},
   {WAKE_SRC_IPC_KM4,        WAKEUP_KM4},  /* IPC can only wake up KM4, do not change it*/
   {WAKE_SRC_BT_WAKE_HOST,      WAKEUP_NULL},
   {WAKE_SRC_KM4_WAKE_IRQ,      WAKEUP_KM0},  /* Internal use, do not change it*/
   {WAKE_SRC_WIFI_FTSR_MAILBOX,  WAKEUP_KM0},  /* Wi-Fi wakeup, do not change it*/
   {WAKE_SRC_WIFI_FISR_FESR_IRQ,  WAKEUP_KM0},  /* Wi-Fi wakeup, do not change it*/
   {0xFFFFFFFF,          WAKEUP_NULL},
   };

AON Wakepin Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~
AON wakepin is one of the peripherals that can be set as a wakeup source. The |CHIP_NAME| has two AON wakepins (``PB30`` and ``PB31``), which can be configured in ``sleep_wakepin_config[]`` in :file:`ameba_sleepcfg.c`.
The config attribute can be set to **DISABLE_WAKEPIN** or **HIGH_LEVEL_WAKEUP** or **LOW_LEVEL_WAKEUP**, meaning not wake up, or GPIO level high will wake up, or GPIO level low will wake up respectively.

.. code-block:: c

   /* can be used by sleep mode & deep sleep mode */
   /* config can be set to DISABLE_WAKEPIN/HIGH_LEVEL_WAKEUP/LOW_LEVEL_WAKEUP */
   WAKEPIN_TypeDef sleep_wakepin_config[] = {
   //   wakepin      config
   {WAKEPIN_0,    DISABLE_WAKEPIN},  /* WAKEPIN_0 corresponding to _PB_30 */
   {WAKEPIN_1,    DISABLE_WAKEPIN},  /* WAKEPIN_1 corresponding to _PB_31 */
   {0xFFFFFFFF,  DISABLE_WAKEPIN},
   };



.. note:: 
   - By default, AON_WAKEPIN_IRQ will not be enabled in ``sleep_wakepin_config[]``, and users need to enable it by themselves.
   - The wakeup mask will not be set in ``sleep_wakepin_config[]``. If wakepin is used for sleep mode, `WAKE_SRC_AON_WAKEPIN` entry
     needs to be set in ``sleep_wevent_config[]``.

Clock and Voltage Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The XTAL, OSC4M state, and sleep mode voltage are configurable in ``ps_config[]`` in :file:`ameba_sleepcfg.c`.
Users can use this configuration for peripherals that need XTAL or OSC4M on in sleep mode.

.. code-block:: c

   PSCFG_TypeDef ps_config = {
   .keep_OSC4M_on = FALSE,        /* Keep OSC4M on or off for sleep */
   .xtal_mode_in_sleep = XTAL_OFF,    /* Set XTAL mode during sleep mode, see enum xtal_mode_sleep for details */
   .sleep_to_08V = FALSE,        /* Default sleep to 0.7V, setting this option to TRUE will sleep to 0.8V */
   };

Sleep Type Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
KM4 can set sleep mode to CG or PG by calling the function :func:`pmu_set_sleep_type(uint32_t type)`, and users can get CPU's sleep mode by calling the function :func:`pmu_get_sleep_type()`.

.. note::
      - KM0 and KM4 are in the same power domain, so they will have the same sleep type, thus :func:`pmu_set_sleep_type()` should be set to KM4, and KM0 will follow KM4's sleep mode type.

      - Sleep mode is set to PG by default. If users want to change the sleep type, :func:`pmu_set_sleep_type()` needs to be called before sleep.


Power-Saving Related APIs
--------------------------------------------------

.. _power_saving_wakelock_apis:

Wakelock APIs
~~~~~~~~~~~~~~~~~~~~~~~~~~
In some situations, the system needs to keep awake to receive certain events; otherwise, events may be missed when the system is in sleep mode.
An idea of wakelock is introduced in that the system cannot enter sleep mode if some module is holding the wakelock.

The Wakelock is a 32-bit map. Each module has its own bit in the wakelock bit map (see enum `PMU_DEVICE`). Users can also add the wakelock in the enum.

- If the wakelock bit map equals zero, it means that there is no module holding the wakelock.

- If the wakelock bit map is larger than zero, it means that some modules are holding the wakelock, and the system is not allowed to enter sleep mode.


Wakelock is a judging condition in the function :func:`freertos_ready_to_sleep()`.
When the system boots, KM4 holds the wakelock `PMU_OS`, and KM0 holds the wakelock `PMU_OS` and `PMU_KM4_RUN`.
Only if all wakelocks are released, KM4 or KM0 is permitted to enter sleep mode. The function :func:`freertos_ready_to_sleep()` will judge the value of wakelock.

.. code-block:: c

   typedef enum {
   PMU_OS        = 0,
   PMU_WLAN_DEVICE,
   PMU_KM4_RUN,
   PMU_WLAN_FW_DEVICE,
   PMU_BT_DEVICE,
   PMU_DEV_USER_BASE,
   PMU_MAX
   } PMU_DEVICE;

It is recommended to enter sleep mode by releasing the wakelock.
After the wakelock `PMU_OS` of KM4 is released, KM4 will enter sleep mode in idle task and send IPC to KM0.
KM0 will gate KM4's clock first and then release `PMU_OS` and `PMU_KM4_RUN`.

When the system wakes, it will enter sleep mode again quickly unless it acquires the wakelock.

Similar to the wakelock for sleep mode, there is a 32-bit deepwakelock map for deep-sleep mode.
If the deepwakelock bit map is larger than zero, it means that some modules are holding the deepwakelock, and the system is not allowed to enter deep-sleep mode.
When the system boots, KM4 holds the deepwakelock `PMU_OS`.

Deepwakelock is a judging condition in the function :func:`freertos_ready_to_dsleep()`.
After the deepwakelock `PMU_OS` of KM4 is released, and all wakelocks of KM4 are released, KM4 will be allowed to enter deep-sleep mode and send IPC to KM0 in idle task.
KM0 will send a deep-sleep request and let the chip finally enter deep-sleep mode.

APIs in the following sections are provided to control the wakelock or deepwakelock.

pmu_acquire_wakelock
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. table::
   :width: 100%
   :widths: auto

   +--------------+--------------------------------------------------+
   | Items        | Description                                      |
   +==============+==================================================+
   | Introduction | Acquire the wakelock for one module              |
   +--------------+--------------------------------------------------+
   | Parameter    | nDeviceId: Device ID of the corresponding module |
   |              |                                                  |
   |              | .. code-block:: c                                |
   |              |                                                  |
   |              |    typedef enum {                                |
   |              |       PMU_OS  = 0,                               |
   |              |       ...                                        |
   |              |       PMU_MAX                                    |
   |              |    } PMU_DEVICE;                                 |
   +--------------+--------------------------------------------------+
   | Return       | None                                             |
   +--------------+--------------------------------------------------+

pmu_release_wakelock
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. table::
   :align: center
   :width: 100%
   :widths: auto

   +--------------+--------------------------------------------------+
   | Items        | Description                                      |
   +==============+==================================================+
   | Introduction | Release the wakelock for one module              |
   +--------------+--------------------------------------------------+
   | Parameter    | nDeviceId: Device ID of the corresponding module |
   |              |                                                  |
   |              | .. code-block:: c                                |
   |              |                                                  |
   |              |    typedef enum {                                |
   |              |       PMU_OS  = 0,                               |
   |              |       ...                                        |
   |              |       PMU_MAX                                    |
   |              |    } PMU_DEVICE;                                 |
   +--------------+--------------------------------------------------+
   | Return       | None                                             |
   +--------------+--------------------------------------------------+

pmu_acquire_deepwakelock
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. table::
   :width: 100%
   :widths: auto

   +--------------+--------------------------------------------------+
   | Items        | Description                                      |
   +==============+==================================================+
   | Introduction | Acquire the deepwakelock for one module          |
   +--------------+--------------------------------------------------+
   | Parameter    | nDeviceId: Device ID of the corresponding module |
   |              |                                                  |
   |              | .. code-block:: c                                |
   |              |                                                  |
   |              |    typedef enum {                                |
   |              |       PMU_OS  = 0,                               |
   |              |       ...                                        |
   |              |       PMU_MAX                                    |
   |              |    } PMU_DEVICE;                                 |
   +--------------+--------------------------------------------------+
   | Return       | None                                             |
   +--------------+--------------------------------------------------+

pmu_release_deepwakelock
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. table::
   :width: 100%
   :widths: auto

   +--------------+--------------------------------------------------+
   | Items        | Description                                      |
   +==============+==================================================+
   | Introduction | Release the deepwakelock for one module          |
   +--------------+--------------------------------------------------+
   | Parameter    | nDeviceId: Device ID of the corresponding module |
   |              |                                                  |
   |              | .. code-block:: c                                |
   |              |                                                  |
   |              |    typedef enum {                                |
   |              |       PMU_OS  = 0,                               |
   |              |       ...                                        |
   |              |       PMU_MAX                                    |
   |              |    } PMU_DEVICE;                                 |
   +--------------+--------------------------------------------------+
   | Return       | None                                             |
   +--------------+--------------------------------------------------+

.. _pmu_set_sysactive_time:

pmu_set_sysactive_time
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
In some situations, the system needs to keep awake for a period of time to complete a certain process while the system is active.

.. table::
   :width: 100%
   :widths: auto

   +--------------+--------------------------------------------------------------+
   | Items        | Description                                                  |
   +==============+==============================================================+
   | Introduction | Set a period of time that the system will keep active        |
   +--------------+--------------------------------------------------------------+
   | Parameter    | timeout: time value, unit is ms.                             |
   |              |                                                              |
   |              | The system will keep active for this time value from now on. |
   +--------------+--------------------------------------------------------------+
   | Return       | 0                                                            |
   +--------------+--------------------------------------------------------------+

Sleep/Wake Callback APIs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
These APIs are used to register suspend/resume callback function for *<nDeviceId>*.
The suspend callback function will be called in idle task before the system enters sleep mode, and the resume callback function will be called after the system resumes.


It is a good way to use the suspend and resume function if there is something to do before the chip sleeps or after the chip wakes.
A typical application of the resume function is to acquire the wakelock to prevent the chip from sleeping again.
Also, if the CPU chooses PG, some peripherals will lose power so they need to be reinitialized. This can be implemented in the resume function.



.. note::
   - Yield OS is not permitted in the suspend/resume callback functions, thus RTOS APIs which may cause OS yield such as *rtos_task_yield*, *rtos_time_delay_ms*, or mutex, semaphore related APIs are not recommended to use.

   - *pmu_set_sysactive_time* is not permitted in the suspend callback function, but permitted in the resume callback function.

pmu_register_sleep_callback
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. table::
   :width: 100%
   :widths: auto

   +--------------+--------------------------------------------------------------+
   | Items        | Description                                                  |
   +==============+==============================================================+
   | Introduction | Register the suspend/resume callback function for one module |
   +--------------+--------------------------------------------------------------+
   | Parameter    | - nDeviceId: Device ID needs suspend/resume callback         |
   |              |                                                              |
   |              |   .. code-block:: c                                          |
   |              |                                                              |
   |              |      typedef enum {                                          |
   |              |         PMU_OS  = 0,                                         |
   |              |         ...                                                  |
   |              |         PMU_MAX                                              |
   |              |      } PMU_DEVICE;                                           |
   |              |                                                              |
   |              | - sleep_hook_fun: Suspend callback function                  |
   |              |                                                              |
   |              | - sleep_param_ptr: Suspend callback function parameter       |
   |              |                                                              |
   |              | - wakeup_hook_fun: Resume callback function                  |
   |              |                                                              |
   |              | - wakeup_param_ptr: Resume callback function parameter       |
   +--------------+--------------------------------------------------------------+
   | Return       | None                                                         |
   +--------------+--------------------------------------------------------------+

pmu_unregister_sleep_callback
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. table::
   :width: 100%
   :widths: auto

   +--------------+--------------------------------------------------------------+
   | Items        | Description                                                  |
   +==============+==============================================================+
   | Introduction | Register the suspend/resume callback function for one module |
   +--------------+--------------------------------------------------------------+
   | Parameter    | - nDeviceId: Device ID needs suspend/resume callback         |
   |              |                                                              |
   |              |   .. code-block:: c                                          |
   |              |                                                              |
   |              |      typedef enum {                                          |
   |              |         PMU_OS  = 0,                                         |
   |              |         ...                                                  |
   |              |         PMU_MAX                                              |
   |              |      } PMU_DEVICE;                                           |
   |              |                                                              |
   |              | - sleep_hook_fun: Suspend callback function                  |
   |              |                                                              |
   |              | - sleep_param_ptr: Suspend callback function parameter       |
   |              |                                                              |
   |              | - wakeup_hook_fun: Resume callback function                  |
   |              |                                                              |
   |              | - wakeup_param_ptr: Resume callback function parameter       |
   +--------------+--------------------------------------------------------------+
   | Return       | None                                                         |
   +--------------+--------------------------------------------------------------+

pmu_set_max_sleep_time
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: auto

   +--------------+-----------------------------------------------------+
   | Items        | Description                                         |
   +==============+=====================================================+
   | Introduction | Set the maximum sleep time                          |
   +--------------+-----------------------------------------------------+
   | Parameter    | timer_ms: system maximum sleep timeout, unit is ms. |
   +--------------+-----------------------------------------------------+
   | Return       | None                                                |
   +--------------+-----------------------------------------------------+

.. note::
      - The system will be woken up after the timeout.

      - The system may be woken up by other wake events before the timeout.

      - This setting only works once. The timer will be cleared after the system wakes up.


Wakeup Reason APIs
~~~~~~~~~~~~~~~~~~~~
SOCPS_AONWakeReason
^^^^^^^^^^^^^^^^^^^^^
.. table::
   :width: 100%
   :widths: auto

   +--------------+----------------------------------+
   | Items        | Description                      |
   +==============+==================================+
   | Introduction | Get the deep-sleep wakeup reason |
   +--------------+----------------------------------+
   | Parameter    | None                             |
   +--------------+----------------------------------+
   | Return       | - Bit[0]: CHIP_EN short press    |
   |              |                                  |
   |              | - Bit[1]: CHIP_EN long press     |
   |              |                                  |
   |              | - Bit[2]: BOR                    |
   |              |                                  |
   |              | - Bit[3]: AON Timer              |
   |              |                                  |
   |              | - Bit[5:4]: AON GPIO             |
   |              |                                  |
   |              | - Bit[8]: RTC                    |
   +--------------+----------------------------------+

WAK_STATUS0
^^^^^^^^^^^^^^^^^^^^^^
The following register can be used to get the sleep wakeup reason.


.. table::
   :width: 100%
   :widths: auto

   +-------------+----------------------------+
   | Register    | Parameters                 |
   +=============+============================+
   | WAK_STATUS0 | - Bit[1:0]: WLAN           |
   |             |                            |
   |             | - Bit[2]: KM4_WAKE         |
   |             |                            |
   |             | - Bit[3]: BT_WAKE_HOST     |
   |             |                            |
   |             | - Bit[4]: IPC_KM4          |
   |             |                            |
   |             | - Bit[9:6]: BASIC TIMER4~7 |
   |             |                            |
   |             | - Bit[11:10]: PMC TIMER0~1 |
   |             |                            |
   |             | - Bit[14:12]: UART0~2      |
   |             |                            |
   |             | - Bit[15]: UART_LOG        |
   |             |                            |
   |             | - Bit[16]: GPIOA           |
   |             |                            |
   |             | - Bit[17]: GPIOB           |
   |             |                            |
   |             | - Bit[19:18]:I2C0~1        |
   |             |                            |
   |             | - Bit[20]: Cap-Touch       |
   |             |                            |
   |             | - Bit[21]: RTC             |
   |             |                            |
   |             | - Bit[22]: ADC             |
   |             |                            |
   |             | - Bit[24]: BOR             |
   |             |                            |
   |             | - Bit[25]: PWR_DOWN        |
   |             |                            |
   |             | - Bit[26]: Key-Scan        |
   |             |                            |
   |             | - Bit[27]: AON_Timer       |
   |             |                            |
   |             | - Bit[28]: AON_Wakepin     |
   |             |                            |
   |             |  -Bit[29]: SDIO            |
   +-------------+----------------------------+


Note that when wakeup, the corresponding peripheral interrupt will be raised; when clearing the interrupt, the corresponding bit in wakeup reason will also be cleared.
Thus it is not possible to get the wakeup reason after the interrupt is cleared.

Wi-Fi Power Saving
------------------------------------
IEEE 802.11 power save management allows the station to enter its own sleep state.
It defines that the station needs to keep awake at a certain timestamp and enter a sleep state otherwise.


WLAN driver acquires the wakelock to avoid the system entering sleep mode when WLAN needs to keep awake.
And it releases the wakelock when it is permitted to enter the sleep state.


IEEE 802.11 power management allows the station to enter power-saving mode.
The station cannot receive any frame during power saving. Thus AP needs to buffer these frames and requires the station to periodically wake up to
check the beacon which has the information of buffered frames.

.. figure:: ../figures/timeline_of_power_saving.png
   :scale: 50%
   :align: center

   Timeline of power saving

When the system is active, and Wi-Fi is connected and enters IEEE 802.11 power management mechanism, this is called LPS in SDK;
if the system enters sleep mode when Wi-Fi is connected, we call it WoWLAN mode.

In WoWLAN mode, a timer with a period of about 102ms will be set in the suspend function, and KM0 will wake up every 102ms to
receive the beacon to maintain the connection.

Except LPS and WoWLAN modes, there is also an IPS mode, which can be used when Wi-Fi is not connected.
The following tables list all three power-saving modes for Wi-Fi and the relationship between power modes of the system and Wi-Fi respectively.

.. table:: WiFi power saving modes
   :width: 100%
   :widths: auto

   +--------+----------------------------------------+-------------------------------------------------------------------+------------------------------------------------------+
   | Mode   | Wi-Fi status                           |  Description                                                      | SDK                                                  |
   +========+========================================+===================================================================+======================================================+
   | IPS    | Not associated:                        | Wi-Fi driver automatically turns Wi-Fi off to save power.         | IPS mode is enabled in SDK by default and is not     |
   |        |                                        |                                                                   |                                                      |
   |        | - RF/BB/MAC OFF                        |                                                                   | recommended to be disabled.                          |
   +--------+----------------------------------------+-------------------------------------------------------------------+------------------------------------------------------+
   | LPS    | Associated:                            | LPS mode is used to implement IEEE 802.11 power management.       | LPS mode is enabled in SDK by default but can be     |
   |        |                                        |                                                                   |                                                      |
   |        | - RF periodically ON/OFF               | NP will control RF ON/OFF based on TSF and TIM IE in the beacon.  | disabled through API :func:`wifi_set_lps_enable()`.  |
   |        |                                        |                                                                   |                                                      |
   |        | - MAC/BB always ON                     |                                                                   |                                                      |
   +--------+----------------------------------------+-------------------------------------------------------------------+------------------------------------------------------+
   | WoWLAN | Associated:                            | NP is waked up at each beacon early interrupt to receive a beacon | WoWLAN mode is enabled in SDK by default.            |
   |        |                                        |                                                                   |                                                      |
   |        | - RF and BB periodically ON/OFF        | from the associated AP.                                           |                                                      |
   |        |                                        |                                                                   |                                                      |
   |        | - MAC periodically enters/ exits CG/PG | NP will wake up AP when receiving a data packet.                  |                                                      |
   +--------+----------------------------------------+-------------------------------------------------------------------+------------------------------------------------------+

.. table:: Relationship between power modes of system and Wi-Fi
   :width: 100%
   :widths: auto

   +-------------------+------------------+------------------------------------------------------------------------+
   | System power mode | Wi-Fi power mode | Description                                                            |
   +===================+==================+========================================================================+
   | Active            | IPS              | Wi-Fi is on, but not connected.                                        |
   |                   +-------------------+-----------------------------------------------------------------------+
   |                   | LPS              | Wi-Fi is connected and enters IEEE 802.11 power management mechanism.  |
   +-------------------+------------------+------------------------------------------------------------------------+
   | Sleep             | Wi-Fi OFF/IPS    |                                                                        |
   +                   +------------------+------------------------------------------------------------------------+
   |                   | WoWLAN           | Wi-Fi keeps associating.                                               |
   +-------------------+------------------+------------------------------------------------------------------------+
   | Deep-sleep        | Wi-Fi OFF        | Deep-sleep is not recommended if Wi-Fi needs to keep on or associated. |
   +-------------------+------------------+------------------------------------------------------------------------+

.. table:: API to enable/disable LPS
   :width: 100%
   :widths: 40, 60

   +------------------------------------+----------------------+
   | API                                | Parameters           |
   +====================================+======================+
   | int wifi_set_lps_enable(u8 enable) | Parameter: enable    |
   |                                    |                      |
   |                                    | - TRUE: enable LPS   |
   |                                    |                      |
   |                                    | - FALSE: disable LPS |
   +------------------------------------+----------------------+


When Wi-Fi is connected and the system enters sleep mode, WoWLAN mode will be entered automatically, and KM0 will periodically wake up to
receive the beacon to maintain the connection, this will consume some power.
If you are more concerned about the system power consumption during sleep mode, and Wi-Fi is not a necessary function in your application,
it is recommended to set Wi-Fi off or choose Wi-Fi IPS mode.


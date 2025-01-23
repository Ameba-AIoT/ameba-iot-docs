Wakeup Source
--------------------------
The following table lists the wakeup sources that can be used to wake up the system under different power modes.

.. table:: Wakeup sources
   :width: 100%
   :widths: auto

   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | Wakeup source | Sleep CG | Sleep PG | Deep-sleep | Restriction                                                                                  |
   +===============+==========+==========+============+==============================================================================================+
   | WLAN          | √        | √        | X          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | BT            | √        | √        | X          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | AON_WAKEPIN   | √        | √        | √          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | UART          | √        | √        | X          | - When using UART as a wakeup source:                                                        |
   |               |          |          |            |                                                                                              |
   |               |          |          |            |   - If the Rx clock source is XTAL40M, do not turn off XTAL during sleep.                    |
   |               |          |          |            |   - If the Rx clock source is OSC2M, do not turn off OSC4M during sleep.                     |
   |               |          |          |            |                                                                                              |
   |               |          |          |            | - The portion of the command used to wake up that exceeds the FIFO depth (64B) will be lost. |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | IPC           | √        | √        | X          | The IPC can only wake up CA32 and KM4, but not KM0.                                          |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | SPI           | √        | X        | X          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | VAD           | √        | X        | X          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | BOR           | √        | √        | √          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | PWR_DOWN      | √        | √        | √          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | CAP_TOUCH     | √        | √        | X          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | ADC           | √        | √        | X          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | RTC           | √        | √        | √          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | GPIO          | √        | √        | X          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | LOGUART       | √        | √        | X          | - When using LOGUART as a wakeup source:                                                     |
   |               |          |          |            |                                                                                              |
   |               |          |          |            |   - If the Rx clock source is XTAL40M, do not turn off XTAL during sleep.                    |
   |               |          |          |            |   - If the Rx clock source is OSC2M, do not turn off OSC4M during sleep.                     |
   |               |          |          |            |                                                                                              |
   |               |          |          |            | - The portion of the command used to wake up that exceeds the FIFO depth (16B) will be lost. |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | Basic Timer   | √        | √        | X          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | IWDG          | √        | √        | X          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+
   | AON_TIMER     | √        | √        | √          |                                                                                              |
   +---------------+----------+----------+------------+----------------------------------------------------------------------------------------------+


A hardware SYSON power management control module (SYSON PMC) is designed to control the clock and power of LP, and then LP controls the clock and power of NP and AP. When the system enters sleep mode, CPUs can select to enter clock-gating (CG) or power-gating (PG) mode, while SYSON PMC maintained active to wake up LP when wakeup sources are triggered.

Entering Sleep Mode
--------------------------------------
Sleep mode is based on FreeRTOS tickless, thus it is recommended to enter sleep mode by releasing the wakelock.

1. Initialize the specific peripheral.

2. Enable and register the peripheral's interrupt.

3. Set ``sleep_wevent_config[]`` in :file:`ambea_sleepcfg.c`, and the interrupt should be registered on the same CPU selected by ``sleep_wevent_config[]``.

4. For peripherals that need special clock settings, set ``ps_config[]`` in :file:`ameba_sleepcfg.c` if needed.

5. Register sleep/wakeup callback if needed.

6. Enter sleep mode by releasing the wakelock in CA32 (`PMU_OS` needs to be released since it is acquired by default when boot).

7. Clear the peripheral's interrupt when wakeup.

For peripherals that need specific clock settings, such as UART and LOGUART, their setting flows are described in Section :ref:`power_saving_uart` and :ref:`power_saving_loguart`.

.. _power_saving_uart:

UART
~~~~~~~~

.. note::

   When using UART as a wakeup source, there are some restrictions:

   - If the Rx clock source is XTAL40M, do not turn off XTAL during sleep; if the Rx clock source is OSC2M, do not turn off OSC4M during sleep.
   - The portion of the command used to wake up that exceeds the FIFO depth (64B) will be lost.

Configuration:

1. Initialize UART and enable its interrupt.

2. Set the related wakeup source (`WAKE_SRC_UART0/WAKE_SRC_UART1/WAKE_SRC_UART2_BT`) in ``sleep_wevent_config[]`` to `WAKEUP_KM4` or `WAKEUP_KM0` (based on which CPU you want to wake). The interrupt should be registered on the same CPU selected by ``sleep_wevent_config[]``.

3. Set the corresponding entry of ``uart_config[]`` in :file:`ameba_sleepcfg.c` to **ENABLE**.

4. Set `keep_OSC4M_on` in ``ps_config[]`` to **TRUE** to keep OSC4M enabled during sleep mode.

5. Enter sleep mode by releasing the wakelock in KM4 (`PMU_OS` needs to be released since it is acquired by default when boot).

6. Clear the UART interrupt when wakeup.

.. _power_saving_loguart:

LOGUART
~~~~~~~~~~~~~~

.. note::

   When using LOGUART as a wakeup source, there are some restrictions:

   - If the Rx clock source is XTAL40M, do not turn off XTAL during sleep; if the Rx clock source is OSC2M, do not turn off OSC4M during sleep.
   - The portion of the command used to wake up that exceeds the FIFO depth (16B) will be lost.


Configuration:

1. Initialize LOGUART and enable its interrupt.

2. Set `WAKE_SRC_UART_LOG` in ``sleep_wevent_config[]`` to `WAKEUP_KM4` or `WAKEUP_KM0` (based on which CPU you want to wake). The interrupt should be registered on the same CPU selected by ``sleep_wevent_config[]``.

3. Set `xtal_mode_in_sleep` to **XTAL_Normal** in ``ps_config[]``.

4. Enter sleep mode by releasing the wakelock in KM4 (`PMU_OS` needs to be released since it is acquired by default when boot).

5. Clear the LOGUART interrupt when wakeup.

Entering Deep-Sleep Mode
-------------------------
Deep-sleep can also be entered from FreeRTOS tickless flow.

When the system boots, CA32 holds the deepwakelock `PMU_OS`,
thus :func:`freertos_ready_to_dsleep()` will be checked fail and the system does not enter deep-sleep mode in idle task by default.
Since :func:`freertos_ready_to_dsleep()` will be checked only after :func:`freertos_ready_to_sleep()` is checked pass,
both the wakelock and deepwakelock need to be released for entering deep-sleep mode.

Configuration:

1. Initialize the related peripheral and enable its interrupt.

2. Set ``sleep_wakepin_config[]`` in :file:`ameba_sleepcfg.c` when using AON wakepin as a wakeup source.

3. Enter deep-sleep mode by releasing the deepwakelock and wakelock in CA32.

Power-Saving Configuration
---------------------------
Wakeup Mask Setup
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
For sleep mode, only one CPU is required to wake up to execute the program in some situations. The wakeup mask module is designed to implement this function.
By setting a wakeup mask, you can choose to wake up only KM0, KM4 or CA32. If KM4 is chosen, KM0 will be waked up first and then KM0 will resume KM4, and if CA32 is chosen, KM0 will be waked up first and then KM0 will resume KM4, and CA32 will be resumed at last.

Users can set the wakeup attribute in ``sleep_wevent_config[]`` in :file:`ameba_sleepcfg.c` to choose which CPU you want to wake up.
The wakeup attribute of each wakeup source can be set to `WAKEUP_KM4` or `WAKEUP_KM0` or `WAKEUP_NULL`,
respectively indicating that this wakeup source is only to wake up KM4, or wake up KM0, or not used as a wakeup source.

.. code-block:: c

   /*wakeup attribute can be set to WAKEUP_NULL/WAKEUP_LP/WAKEUP_NP/WAKEUP_AP*/
   WakeEvent_TypeDef sleep_wevent_config[] = {
   //  Module                  wakeup
   {WAKE_SRC_nFIQOUT1_OR_nIRQOUT1,      WAKEUP_NULL},
   {WAKE_SRC_nFIQOUT0_OR_nIRQOUT0,      WAKEUP_NULL},
   {WAKE_SRC_BT_WAKE_HOST,          WAKEUP_NULL},
   {WAKE_SRC_AON_WAKEPIN,          WAKEUP_NULL},
   {WAKE_SRC_UART2,            WAKEUP_NULL},
   {WAKE_SRC_UART1,            WAKEUP_NULL},
   {WAKE_SRC_UART0,            WAKEUP_NULL},
   {WAKE_SRC_SPI1,              WAKEUP_NULL},
   {WAKE_SRC_SPI0,              WAKEUP_NULL},
   {WAKE_SRC_IPC_AP,            WAKEUP_AP},    /* do not change it */
   {WAKE_SRC_IPC_NP,            WAKEUP_NP},   /* do not change it*/
   {WAKE_SRC_VADBT_OR_VADPC,        WAKEUP_NULL},
   {WAKE_SRC_PWR_DOWN,            WAKEUP_LP},
   {WAKE_SRC_BOR,              WAKEUP_NULL},
   {WAKE_SRC_ADC,              WAKEUP_NULL},
   {WAKE_SRC_CTOUCH,            WAKEUP_NULL},
   {WAKE_SRC_RTC,              WAKEUP_NULL},
   {WAKE_SRC_GPIOC,            WAKEUP_NULL},
   {WAKE_SRC_GPIOB,            WAKEUP_NULL},
   {WAKE_SRC_GPIOA,            WAKEUP_NULL},
   {WAKE_SRC_UART_LOG,            WAKEUP_NULL},
   {WAKE_SRC_Timer7,            WAKEUP_NULL},
   {WAKE_SRC_Timer6,            WAKEUP_NP},
   {WAKE_SRC_Timer5,            WAKEUP_NULL},
   {WAKE_SRC_Timer4,            WAKEUP_NULL},
   {WAKE_SRC_Timer3,            WAKEUP_NULL},
   {WAKE_SRC_Timer2,            WAKEUP_NULL},
   {WAKE_SRC_Timer1,            WAKEUP_NULL},
   {WAKE_SRC_Timer0,            WAKEUP_NULL},
   {WAKE_SRC_WDG0,              WAKEUP_NULL},
   {WAKE_SRC_AP_WAKE,            WAKEUP_NULL},
   {WAKE_SRC_NP_WAKE,            WAKEUP_NULL},
   {WAKE_SRC_AON_TIM,            WAKEUP_NULL},
   {WAKE_SRC_WIFI_FTSR_MAILBOX,      WAKEUP_LP},    /* Wi-Fi wakeup, do not change it*/
   {WAKE_SRC_WIFI_FISR_FESR,        WAKEUP_LP},    /* Wi-Fi wakeup, do not change it*/
   {0xFFFFFFFF,              WAKEUP_NULL},  /* Table end */

AON Wakepin Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~
AON wakepin is one of the peripherals that can be set as a wakeup source.
The |CHIP_NAME| has four AON wakepins (``PB21``, ``PB22``, ``PB23`` and ``PB24``), which can be configured in ``sleep_wakepin_config[]`` in :file:`ameba_sleepcfg.c`.
The config attribute can be set to **DISABLE_WAKEPIN** or **HIGH_LEVEL_WAKEUP** or **LOW_LEVEL_WAKEUP**, meaning not wake up, or GPIO positive pulse will wake up, or GPIO negative pulse will wake up respectively.

.. code-block:: c

   /* can be used by sleep mode & deep sleep mode */
   /* config can be set to DISABLE_WAKEPIN/HIGH_LEVEL_WAKEUP/LOW_LEVEL_WAKEUP */
   WAKEPIN_TypeDef sleep_wakepin_config[] = {
   //  wakepin      config
   {WAKEPIN_0,    DISABLE_WAKEPIN},  /* WAKEPIN_0 corresponding to _PB_21 */
   {WAKEPIN_1,    DISABLE_WAKEPIN},  /* WAKEPIN_1 corresponding to _PB_22  */
   {WAKEPIN_2,    DISABLE_WAKEPIN},  /* WAKEPIN_2 corresponding to _PB_23  */
   {WAKEPIN_3,    DISABLE_WAKEPIN},  /* WAKEPIN_3 corresponding to _PB_24  */
   {0xFFFFFFFF,  DISABLE_WAKEPIN},  /* Table end */
   }

.. note::

   - ``PB23`` and ``PB24`` is for loguart trx by default, if ``PB23`` and ``PB24`` is needed to wake up system from dslp, contact realtek for help. Active and sleep mode of pin is controlled by pinmap config, change ``pmap_func[]`` in :file:`ameba_pinmapcfg.c` if needed.
   - By default, `AON_WAKEPIN_IRQ` will not be enabled in ``sleep_wakepin_config[]``, and users need to enable it by themselves.
   - The wakeup mask will not be set in ``sleep_wakepin_config[]``. If wakepin is used for sleep mode, `WAKE_SRC_AON_WAKEPIN` entry needs to be set in ``sleep_wevent_config[]``.

Clock Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The XTAL, OSC4M state are configurable in ``ps_config[]`` in :file:`ameba_sleepcfg.c`. Users can use this configuration for peripherals that need XTAL or OSC4M on in sleep mode.

.. code-block:: c

   PSCFG_TypeDef ps_config = {
   .km0_tickles_debug = TRUE,/* if open WIFI FW, should close it, or beacon will lost in WOWLAN */
   .km0_pll_off = TRUE,
   .km0_audio_vad_on = FALSE,
   #if defined(CONFIG_CLINTWOOD ) && CONFIG_CLINTWOOD
   .km0_config_psram = FALSE, /* if device enter sleep mode or not, false for keep active */
   .km0_sleep_withM4 = FALSE,
   #else
   .km0_config_psram = TRUE, /* if device enter sleep mode or not, false for keep active */
   .km0_sleep_withM4 = TRUE,
   #endif
   .keep_OSC4M_on = FALSE,
   .xtal_mode_in_sleep = XTAL_OFF,
   .swr_mode_in_sleep = SWR_PFM,
   };

Power-Saving Related APIs
---------------------------

.. _power_saving_wakelock_apis:

Wakelock APIs
~~~~~~~~~~~~~~~
In some situations, the system needs to keep awake to receive certain events; otherwise, events may be missed when the system is in sleep mode.
An idea of wakelock is introduced in that the system cannot enter sleep mode if some module is holding the wakelock.

Wakelock is a 32-bit map. Each module has its own bit in the wakelock bit map (see enum. `PMU_DEVICE`). Users can also add the wakelock in the enum.

- If the wakelock bit map equals zero, it means that there is no module holding the wakelock.
- If the wakelock bit map is larger than zero, it means that some modules are holding the wakelock, and the system is not allowed to enter sleep mode.

Wakelock is a judging condition in the function :func:`freertos_ready_to_sleep()`.
When the system boots, CA32/KM4 holds the wakelock PMU_OS, and KM0 holds the wakelock `PMU_OS`, `PMU_KM4_RUN` and `PMU_AP_RUN`.
Only if all wakelocks are released, CPU is permitted to enter sleep mode. The function :func:`freertos_ready_to_sleep()` will judge the value of wakelock.

.. code-block:: c

   typedef enum {
   PMU_OS          = 0,
   PMU_WLAN_DEVICE    = 1,
   PMU_LOGUART_DEVICE  = 2,
   PMU_KM4_RUN      = 3,
   PMU_UART0_DEVICE    = 4,
   PMU_UART1_DEVICE    = 5,
   PMU_I2C0_DEVICE    = 6,
   PMU_TOUCH_DEVICE    = 7,
   PMU_USOC_DEVICE    = 8,
   PMU_DONGLE_DEVICE  = 9,
   PMU_RTC_DEVICE    = 10,
   PMU_CONSOL_DEVICE  = 11,
   PMU_ADC_DEVICE  = 12,
   PMU_WAKWLOCK_TIMEOUT = 13,
   PMU_AP_RUN  = 14,
   PMU_PSRAM_DEVICE  = 15,
   PMU_DEV_USER_BASE  = 16, /*number 16 ~ 31 is reserved for customer use*/
   PMU_BT_DEVICE  = 17,
   PMU_VAD_DEVICE  = 18,
   PMU_MAX        = 31
   } PMU_DEVICE;

It is recommended to enter sleep mode by releasing the wakelock.
After the wakelock `PMU_OS` of CA32 is released, CA32 will enter sleep mode in idle task and send IPC to KM0.
KM0 will gate CA32 clock/power first and then release `PMU_AP_RUN`, and then KM4 will release `PMU_OS` in idle task if found CA32 entered sleep mode already,
and send IPC to KM0, KM0 will gate KM4 clock/power first and then release `PMU_OS` and `PMU_KM4_RUN`.

When the system wakes, it will enter sleep mode again quickly unless it acquires the wakelock.

Similar to the wakelock for sleep mode, there is a 32-bit deepwakelock map for deep-sleep mode.
If the deepwakelock bit map is larger than zero, it means that some modules are holding the deepwakelock, and the system is not allowed to enter deep-sleep mode.
When the system boots, CA32 holds the deepwakelock `PMU_OS`.

Deepwakelock is a judging condition in the function :func:`freertos_ready_to_dsleep()`.
After the deepwakelock `PMU_OS` of CA32 is released, and all wakelocks of CA32 are released, CA32 will be allowed to enter deep-sleep mode and send IPC to KM0 in idle task.
KM0 will send a deep-sleep request and let the chip finally enter deep-sleep mode.

APIs in the following sections are provided to control the wakelock or deepwakelock.

pmu_acquire_wakelock
^^^^^^^^^^^^^^^^^^^^^^

.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+--------------------------------------------------+
   | Items        | Description                                      |
   +==============+==================================================+
   | Introduction | Acquire the wakelock for one module              |
   +--------------+--------------------------------------------------+
   | Parameter    | nDeviceId: Device ID of the corresponding module |
   |              |                                                  |
   |              | .. code-block:: c                                |
   |              |                                                  |
   |              |    enum DEVICE {                                 |
   |              |       PMU_OS  = 0,                               |
   |              |       ...                                        |
   |              |       PMU_MAX = 31                               |
   |              |    };                                            |
   +--------------+--------------------------------------------------+
   | Return       | None                                             |
   +--------------+--------------------------------------------------+

pmu_release_wakelock
^^^^^^^^^^^^^^^^^^^^^^^

.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+--------------------------------------------------+
   | Items        | Description                                      |
   +==============+==================================================+
   | Introduction | Release the wakelock for one module              |
   +--------------+--------------------------------------------------+
   | Parameter    | nDeviceId: Device ID of the corresponding module |
   |              |                                                  |
   |              | .. code-block:: c                                |
   |              |                                                  |
   |              |    enum DEVICE {                                 |
   |              |       PMU_OS  = 0,                               |
   |              |       ...                                        |
   |              |       PMU_MAX = 31                               |
   |              |    };                                            |
   +--------------+--------------------------------------------------+
   | Return       | None                                             |
   +--------------+--------------------------------------------------+

pmu_acquire_deepwakelock
^^^^^^^^^^^^^^^^^^^^^^^^^

.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+--------------------------------------------------+
   | Items        | Description                                      |
   +==============+==================================================+
   | Introduction | Acquire the deepwakelock for one module          |
   +--------------+--------------------------------------------------+
   | Parameter    | nDeviceId: Device ID of the corresponding module |
   |              |                                                  |
   |              | .. code-block:: c                                |
   |              |                                                  |
   |              |    enum DEVICE {                                 |
   |              |       PMU_OS  = 0,                               |
   |              |       ...                                        |
   |              |       PMU_MAX = 31                               |
   |              |    };                                            |
   +--------------+--------------------------------------------------+
   | Return       | None                                             |
   +--------------+--------------------------------------------------+

pmu_release_deepwakelock
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+--------------------------------------------------+
   | Items        | Description                                      |
   +==============+==================================================+
   | Introduction | Release the deepwakelock for one module          |
   +--------------+--------------------------------------------------+
   | Parameter    | nDeviceId: Device ID of the corresponding module |
   |              |                                                  |
   |              | .. code-block:: c                                |
   |              |                                                  |
   |              |    enum DEVICE {                                 |
   |              |       PMU_OS  = 0,                               |
   |              |       ...                                        |
   |              |       PMU_MAX = 31                               |
   |              |    };                                            |
   +--------------+--------------------------------------------------+
   | Return       | None                                             |
   +--------------+--------------------------------------------------+

.. _pmu_set_sysactive_time:

pmu_set_sysactive_time
~~~~~~~~~~~~~~~~~~~~~~~
In some situations, the system needs to keep awake for a period of time to complete a certain process while the system is active.

.. table::
   :width: 100%
   :widths: 30, 70

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
~~~~~~~~~~~~~~~~~~~~~~~~~
These APIs are used to register suspend/resume callback function for *<nDeviceId>*.
The suspend callback function will be called in idle task before the system enters sleep mode, and the resume callback function will be called after the system resumes.

It is a good way to use the suspend and resume function if there is something to do before the chip sleeps or after the chip wakes.
A typical application of the resume function is to acquire the wakelock to prevent the chip from sleeping again.
Also, if the CPU chooses PG, some peripherals will lose power so they need to be reinitialized. This can be implemented in the resume function.

.. note::

   - Yield OS is not permitted in the suspend/resume callback functions, thus RTOS APIs which may cause OS yield such as *rtos_task_yield*, *rtos_time_delay_ms*, or mutex, semaphore related APIs are not recommended to use.
   - *pmu_set_sysactive_time* is not permitted in the suspend callback function, but permitted in the resume callback function.

pmu_register_sleep_callback
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+--------------------------------------------------------------+
   | Items        | Description                                                  |
   +==============+==============================================================+
   | Introduction | Register the suspend/resume callback function for one module |
   +--------------+--------------------------------------------------------------+
   | Parameter    | - nDeviceId: Device ID needs suspend/resume callback         |
   |              |                                                              |
   |              |   .. code-block:: c                                          |
   |              |                                                              |
   |              |      enum DEVICE {                                           |
   |              |         PMU_OS  = 0,                                         |
   |              |         ...                                                  |
   |              |         PMU_MAX = 31                                         |
   |              |      };                                                      |
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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+--------------------------------------------------------------+
   | Items        | Description                                                  |
   +==============+==============================================================+
   | Introduction | Register the suspend/resume callback function for one module |
   +--------------+--------------------------------------------------------------+
   | Parameter    | - nDeviceId: Device ID needs suspend/resume callback         |
   |              |                                                              |
   |              |   .. code-block:: c                                          |
   |              |                                                              |
   |              |      enum DEVICE {                                           |
   |              |         PMU_OS  = 0,                                         |
   |              |         ...                                                  |
   |              |         PMU_MAX = 31                                         |
   |              |      };                                                      |
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
~~~~~~~~~~~~~~~~~~~~~~~

.. table::
   :width: 100%
   :widths: 30, 70

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
   - This setting only works once. The timer will be cleared after the system wakes up

Wakeup Reason APIs
~~~~~~~~~~~~~~~~~~~
SOCPS_AONWakeReason
^^^^^^^^^^^^^^^^^^^^
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+----------------------------------+
   | Items        | Description                      |
   +==============+==================================+
   | Introduction | Get the deep-sleep wakeup reason |
   +--------------+----------------------------------+
   | Parameter    | None                             |
   +--------------+----------------------------------+
   | Return       | Bit[0]: CHIP_EN short press      |
   |              |                                  |
   |              | Bit[1]: CHIP_EN long press       |
   |              |                                  |
   |              | Bit[2]: BOR                      |
   |              |                                  |
   |              | Bit[3]: AON Timer                |
   |              |                                  |
   |              | Bit[7:4]: AON GPIO               |
   |              |                                  |
   |              | Bit[8]: RTC                      |
   +--------------+----------------------------------+

WAK_STATUS0
^^^^^^^^^^^^^
The following register can be used to get the sleep wakeup reason.

.. table::
   :width: 100%
   :widths: 30, 70

   +-------------+-----------------------------+
   | Register    | Parameters                  |
   +=============+=============================+
   | WAK_STATUS0 | - Bit[1:0]: WLAN            |
   |             |                             |
   |             | - Bit[2]: AON_TIMER         |
   |             |                             |
   |             | - Bit[3]: NP_WAKE           |
   |             |                             |
   |             | - Bit[4]: AP_WAKE           |
   |             |                             |
   |             | - Bit[5]: IWDG0             |
   |             |                             |
   |             | - Bit[13:6]: BASIC TIMER0~7 |
   |             |                             |
   |             | - Bit[14]: UART_LOG         |
   |             |                             |
   |             | - Bit[17:15]: GPIO          |
   |             |                             |
   |             | - Bit[18]: RTC              |
   |             |                             |
   |             | - Bit[19]: Cap-Touch        |
   |             |                             |
   |             | - Bit[20]: ADC              |
   |             |                             |
   |             | - Bit[22]: BOR              |
   |             |                             |
   |             | - Bit[23]: PWR_DOWN         |
   |             |                             |
   |             | - Bit[24]: VAD              |
   |             |                             |
   |             | - Bit[25]: IPC_NP           |
   |             |                             |
   |             | - Bit[26]: IPC_AP           |
   |             |                             |
   |             | - Bit[29:28]: SPI0~1        |
   |             |                             |
   |             | - Bit[31:30]: UART0~1       |
   +-------------+-----------------------------+

.. table::
   :width: 100%
   :widths: 30, 70

   +-------------+----------------------+
   | Register    | Parameters           |
   +=============+======================+
   | WAK_STATUS1 | Bit[0]: UART2        |
   |             |                      |
   |             | Bit[5]: AON_WAPEPIN  |
   |             |                      |
   |             | Bit[6]: BT_WAKE_HOST |
   +-------------+----------------------+

.. note::

   When wakeup, the corresponding peripheral interrupt will be raised; when clearing the interrupt, the corresponding bit in wakeup reason will also be cleared.
   Thus it is not possible to get the wakeup reason after the interrupt is cleared

Wi-Fi Power Saving
-------------------
IEEE 802.11 power-saving management allows the station to enter its own sleep state.
It defines that the station needs to keep awake at a certain timestamp and enters a sleep state otherwise.

WLAN driver acquires the wakelock to avoid the system entering sleep mode when WLAN needs to keep awake.
And it releases the wakelock when it is permitted to enter the sleep state.

IEEE 802.11 power management allows the station to enter power-saving mode.
The station cannot receive any frame during power saving.
Thus AP needs to buffer these frames and requires the station periodically wake up to check the beacon which has the information of buffered frames.

.. figure:: ../figures/timeline_of_power_saving.png
   :scale: 50%
   :align: center

   Timeline of power saving

When the system is active, and Wi-Fi is connected and enters IEEE 802.11 power management mechanism, this is called LPS in SDK;
If the system enters sleep mode when Wi-Fi is connected, we call it WoWLAN mode.

In WoWLAN mode, a timer with a period of about 102ms will be set in the suspend function,
and KM0 will wake up every 102ms to receive the beacon to maintain the connection.

Except LPS and WoWLAN modes, there is also an IPS mode, which can be used when Wi-Fi is not connected.
The following tables list all three power-saving modes for Wi-Fi and the relationship between power modes of the system and Wi-Fi.

.. table:: Wi-Fi power-saving modes
   :width: 100%
   :widths: auto

   +--------+----------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------+
   | Mode   | Wi-Fi status                           |          Description                                            | SDK                                                 |
   +========+========================================+=================================================================+=====================================================+
   | IPS    | Not associated:                        | Wi-Fi driver automatically turns Wi-Fi off to save power.       | IPS mode is enabled in SDK by default and is not    |
   |        |                                        |                                                                 |                                                     |
   |        | - RF/BB/MAC OFF                        |                                                                 | recommended to be disabled.                         |
   +--------+----------------------------------------+-----------------------------------------------------------------+-----------------------------------------------------+
   | LPS    | Associated                             | LPS mode is used to implement IEEE 802.11 power management.     | LPS mode is enabled in SDK by default but can be    |
   |        |                                        |                                                                 |                                                     |
   |        | - RF periodically ON/OFF               | NP will control RF ON/OFF based on TSF and TIM IE in the beacon | disabled through API :func:`wifi_set_lps_enable()`. |
   |        |                                        |                                                                 |                                                     |
   |        | - MAC/BB always ON                     |                                                                 |                                                     |
   +--------+----------------------------------------+---------------+-------------------------------------------------+-----------------------------------------------------+
   | WoWLAN | Associated:                            | NP is waked up at each beacon early interrupt to receive a      | WoWLAN mode is enabled in SDK by default.           |
   |        |                                        |                                                                 |                                                     |
   |        | - RF and BB periodically ON/OFF        | beacon from the associated AP.                                  |                                                     |
   |        |                                        |                                                                 |                                                     |
   |        | - MAC periodically enters/exits CG/PG  | NP will wake up AP when receiving a data packet.                |                                                     |
   +--------+----------------------------------------+---------------+-------------------------------------------------+-----------------------------------------------------+

.. table:: Relationship between power modes of system and Wi-Fi
   :width: 100%
   :widths: auto

   +-------------------+------------------+------------------------------------------------------------------------+
   | System power mode | Wi-Fi power mode | Description                                                            |
   +===================+==================+========================================================================+
   | Active            | IPS              | Wi-Fi is on, but not connected                                         |
   +-------------------+------------------+------------------------------------------------------------------------+
   | Active            | LPS              | Wi-Fi is connected and enters IEEE 802.11 power management mechanism   |
   +-------------------+------------------+------------------------------------------------------------------------+
   | Sleep             | Wi-Fi OFF/IPS    |                                                                        |
   +-------------------+------------------+------------------------------------------------------------------------+
   | Sleep             | WoWLAN           | Wi-Fi keeps associating.                                               |
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

When Wi-Fi is connected and the system enters sleep mode, WoWLAN mode will be entered automatically,
and KM0 will periodically wake up to receive the beacon to maintain the connection, this will consume some power.
If you are more concerned about the system power consumption during sleep mode, and Wi-Fi is not a necessary function in your application,
it is recommended to set Wi-Fi off or choose Wi-Fi IPS mode.


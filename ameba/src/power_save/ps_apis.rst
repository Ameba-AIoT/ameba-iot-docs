.. _power_saving_wakelock_apis:

Wakelock APIs
~~~~~~~~~~~~~~~~~~~~~~~~~~

In some situations, the system needs to keep awake to receive certain events; otherwise, events may be missed when the system is in sleep mode.
An idea of wakelock is introduced in that the system cannot enter sleep mode if some module is holding the wakelock.

The Wakelock is a 32-bit map. Each module has its own bit in the wakelock bit map (see enum `PMU_DEVICE`). Users can also add the wakelock in the enum.

- If the wakelock bit map equals zero, it means that there is no module holding the wakelock.

- If the wakelock bit map is larger than zero, it means that some modules are holding the wakelock, and the system is not allowed to enter sleep mode.

.. tabs::
   .. include:: ps_wakelock_enum_dplus.rst
   .. include:: ps_wakelock_enum_lite.rst
   .. include:: ps_wakelock_enum_smart.rst

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
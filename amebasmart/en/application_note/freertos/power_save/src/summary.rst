.. _power_saving:

Power Saving Mode
----------------------------------
The |CHIP_NAME| has an advanced Power Management Controller (PMC), which can flexibly power up different power domains of the chip,
to achieve the best balance between chip performance and power consumption.
AON, SYSON, SOC are three main power domains in digital system.
Functions in different power domains will be turned off differently in different power-saving modes.
More information about power domains and wakeup sources are depicted in below.

.. figure:: ../figures/power_domains_and_wakeup_sources.svg
   :scale: 130%
   :align: center

   Power domains and wakeup sources

To simplify the power management for typical scenarios, |CHIP_NAME| supports two low-power modes: sleep mode and deep-sleep mode.
Tickless is a FreeRTOS low power feature, which just gates the CPU (no clock or power be turned off) when it has nothing to do.
Sleep mode flow and deep-sleep mode flow are based on Tickless.
The following table explains power-saving related terms.

.. table:: Power-saving mode
   :width: 100%
   :widths: auto

   +------------+------------+--------------+------------------+--------------------------------------------------------------------------------------------------------------------+
   | Mode       | AON domain | SYSON domain | SOC domain       | Description                                                                                                        |
   +============+============+==============+==================+====================================================================================================================+
   | Tickless   | ON         | ON           | ON               | - FreeRTOS low power feature                                                                                       |
   |            |            |              |                  |                                                                                                                    |
   |            |            |              |                  | - CPU periodically enters WFI, and exits WFI when interrupts happen.                                               |
   |            |            |              |                  |                                                                                                                    |
   |            |            |              |                  | - Radio status can be configured off/periodically on/always on, which depends on the application.                  |
   +------------+------------+--------------+------------------+--------------------------------------------------------------------------------------------------------------------+
   | Sleep      | ON         | ON           | | Clock-gated    | - A power saving mode on chip level, including clock-gating mode and power-gating mode.                            |
   |            |            |              | | or power-gated |                                                                                                                    |
   |            |            |              |                  | - CPU can restore stack status when the system exits from sleep mode.                                              |
   |            |            |              |                  |                                                                                                                    |
   |            |            |              |                  | - The system RAM will be retained, and the data in system RAM will not be lost.                                    |
   +------------+------------+--------------+------------------+--------------------------------------------------------------------------------------------------------------------+
   | Deep-sleep | ON         | OFF          | OFF              | - A more power-saving mode on chip-level.                                                                          |
   |            |            |              |                  |                                                                                                                    |
   |            |            |              |                  | - CPU cannot restore stack status. When the system exits from deep-sleep mode, the CPU follows the reboot process. |
   |            |            |              |                  |                                                                                                                    |
   |            |            |              |                  | - The system RAM will not be retained.                                                                             |
   +------------+------------+--------------+------------------+--------------------------------------------------------------------------------------------------------------------+

The FreeRTOS supports a low-power feature called tickless. It is implemented in an idle task which has the lowest priority.
That is, it is invoked when there is no other task under running. Note that unlike the original FreeRTOS, the |CHIP_NAME| does not wake up based on the `xEpectedIdleTime`.

.. figure:: ../figures/freertos_tickless_in_an_idle_task.svg
   :scale: 125%
   :align: center

   FreeRTOS tickless in an idle task

The figure above shows idle task code flow. In idle task, it will check sleep conditions (wakelock, sysactive_time, details in Section :ref:`power_saving_wakelock_apis` and :ref:`pmu_set_sysactive_time`) to determine whether needs to enter sleep mode or not.

- If not, the CPU will execute an ARM instruction **WFI** (wait for interrupt) which makes the CPU suspend until the interrupt happens. Normally systick interrupt resumes it. This is the software tickless.
- If yes, it will execute the function :func:`freertos_pre_sleep_processing` to enter sleep mode or deep-sleep mode.

.. note::

   - Even FreeRTOS time control like software timer or `vTaskDelay` is set, it still enters the sleep mode if meeting the requirement as long as the idle task is executed.
   - `configUSE_TICKLESS_IDLE` must be enabled for power-saving application because sleep mode flow is based on tickless.


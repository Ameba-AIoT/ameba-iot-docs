We supports two low-power modes, which are sleep mode and deep-sleep mode.
The deep-sleep mode turns off more power domains than the sleep mode, so it has lower power consumption.

Tickless is a FreeRTOS low power feature, which just gates the CPU (no clock or power be turned off) when it has nothing to do.
Sleep mode flow and deep-sleep mode flow are based on Tickless.
The following table explains power-saving related terms.

.. table:: Power-saving mode
   :width: 100%
   :widths: auto

   +------------+------------+--------------+----------------------------+--------------------------------------------------------------------------------------------------------------------+
   | Mode       | AON domain | SYSON domain | SOC domain                 | Description                                                                                                        |
   +============+============+==============+============================+====================================================================================================================+
   | Tickless   | ON         | ON           | ON                         | - FreeRTOS low power feature                                                                                       |
   |            |            |              |                            |                                                                                                                    |
   |            |            |              |                            | - CPU periodically enters WFI, and exits WFI when interrupts happen.                                               |
   |            |            |              |                            |                                                                                                                    |
   |            |            |              |                            | - Radio status can be configured off/periodically on/always on, which depends on the application.                  |
   +------------+------------+--------------+----------------------------+--------------------------------------------------------------------------------------------------------------------+
   | Sleep      | ON         | ON           | Clock-gated or power-gated | - A power saving mode on chip level, including clock-gating mode and power-gating mode.                            |
   |            |            |              |                            |                                                                                                                    |
   |            |            |              |                            | - CPU can restore stack status when the system exits from sleep mode.                                              |
   |            |            |              |                            |                                                                                                                    |
   |            |            |              |                            | - The system RAM will be retained, and the data in system RAM will not be lost.                                    |
   +------------+------------+--------------+----------------------------+--------------------------------------------------------------------------------------------------------------------+
   | Deep-sleep | ON         | OFF          | OFF                        | - A more power-saving mode on chip-level.                                                                          |
   |            |            |              |                            |                                                                                                                    |
   |            |            |              |                            | - CPU cannot restore stack status. When the system exits from deep-sleep mode, the CPU follows the reboot process. |
   |            |            |              |                            |                                                                                                                    |
   |            |            |              |                            | - The system RAM will not be retained.                                                                             |
   |            |            |              |                            |                                                                                                                    |
   |            |            |              |                            | - The retention SRAM will not be power off.                                                                        |
   +------------+------------+--------------+----------------------------+--------------------------------------------------------------------------------------------------------------------+

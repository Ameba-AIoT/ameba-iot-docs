.. tab:: RTL8730E

   **SOCPS_AONWakeReason**

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

   **WAK_STATUS0**

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

   **WAK_STATUS1**

   .. table::
      :width: 100%
      :widths: 30, 70

      +-------------+-----------------------------+
      | Register    | Parameters                  |
      +=============+=============================+
      | WAK_STATUS1 | Bit[0]: UART2               |
      |             |                             |
      |             | Bit[5]: AON_WAPEPIN         |
      |             |                             |
      |             | Bit[6]: BT_WAKE_HOST        |
      +-------------+-----------------------------+

   .. note::

      When wakeup, the corresponding peripheral interrupt will be raised; when clearing the interrupt, the corresponding bit in wakeup reason will also be cleared.
      Thus it is not possible to get the wakeup reason after the interrupt is cleared

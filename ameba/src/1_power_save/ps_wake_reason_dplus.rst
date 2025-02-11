.. tab:: RTL8721Dx

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

   **WAK_STATUS0**

   The following register can be used to get the sleep wakeup reason.


   .. table::
      :width: 100%
      :widths: 30, 70

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
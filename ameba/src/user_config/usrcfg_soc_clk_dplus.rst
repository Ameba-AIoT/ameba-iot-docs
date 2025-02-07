1. (Optional) Find out the speed limit of embedded PSRAM device if not sure.

   a. Print the value of ``ChipInfo_BDNum()`` function, which will get the chip info from OTP.

   b. Refer to PSRAM type in ``Chip_Info[]`` in ``\lib\ram_common\ameba_chipinfo_lib.c``.

   For now, this step can be skipped because only *wb955* is used.

2. Check the value of ``Boot_SocClk_Info_Idx`` and ``SocClk_Info[]`` in ``\usrcfg\ameba_ bootcfg.c``.

   .. code-block:: c
      :emphasize-lines: 5, 6, 7, 8, 9, 10, 11, 12, 20, 22

      // For KM4, max. 345MHz under 1.0V, max. 260MHz under 0.9V
      // For KM0, max. 115MHz under 1.0V, max. 104MHz under 0.9V
      // PLL can be 300MHz~688.128MHz
      // KM4_CKD range is [1, 8], KM0_CKD range is [1, 16] or USEXTAL
      const SocClk_Info_TypeDef SocClk_Info[] = {
         // PLL_CLK,    Vol_Type,      KM4_CKD,    KM0_CKD,     PSRAMC_CKD
         {PLL_520M,     CORE_VOL_0P9,  CLKDIV(2),	CLKDIV(5),   CLKDIV(2)},
         {PLL_331M,     CORE_VOL_1P0,  CLKDIV(1),	CLKDIV(3),   CLKDIV(1)},
         {PLL_400M,     CORE_VOL_0P9,  CLKDIV(2),	CLKDIV(4),   CLKDIV(1)},
         {PLL_480M,     CORE_VOL_0P9,  CLKDIV(2),	CLKDIV(5),   CLKDIV(2)},  // 48M for USB
         {PLL_677P376M, CORE_VOL_1P0,  CLKDIV(2),  CLKDIV(6),   CLKDIV(2)},
         {PLL_688P128M, CORE_VOL_1P0,  CLKDIV(2),  CLKDIV(6),   CLKDIV(2)},
      };

      /**
      * @brif SocClk_Info selection
      * Boot_SocClk_Info_Idx is [0, sizeof(SocClk_Info)), Soc will set the SoC clock by SocClk_Info[Boot_SocClk_Info_Idx]
      * /
      #ifdef CONFIG_USB_DEVICE_EN
      u8 Boot_SocClk_Info_Idx = 3; // Make sure the PLL_CLK for USB is an integer multiple of 48MHz 
      #else
      u8 Boot_SocClk_Info_Idx = 0;
      #endif

3. Check the ``BOOT_ChipInfo_ClkInfoIdx()`` function in ``\bootloader\bootloader_km4.c``.

   .. code-block:: c

      u32 BOOT_ChipInfo_ClkInfoIdx(void)
      {
         /* PSRAM die is wb955 which can run up to 200MHz */
         /* Boot_SocClk_Info_Idx is valid, use user config socclk */
         return Boot_SocClk_Info_Idx;
      }

   The bootloader will set the SoC clock defined by ``SocClk_Info[Boot_SocClk_Info_Idx]``, and PSRAM rate will also be changed with SoC clock.

   .. table::
      :width: 100%
      :widths: auto

      +------------+-------------+--------------------+-------------------+
      | PSRAM type | PSRAM speed |   SocClk_Info[x]   | Clock Info        |
      +============+=============+====================+===================+
      | No PSRAM   |             | SocClk_Info[0]     | - PLL: 520MHz     |
      |            |             |                    |                   |
      |            |             |                    | - KM4: 260MHz     |
      |            |             |                    |                   |
      |            |             |                    | - KM0: 86.6MHz    |
      +------------+-------------+--------------------+-------------------+
      | WB955      | ≤200MHz     | SocClk_Info[1]     | - PLL: 330MHz     |
      |            |             |                    |                   |
      |            |             |                    | - KM4: PLL/1      |
      |            |             |                    |                   |
      |            |             |                    | - KM0: PLL/4      |
      |            |             |                    |                   |
      |            |             |                    | - PSRASM: PLL/2   |
      +------------+-------------+--------------------+-------------------+

4. Refer to one of the following methods to change the SoC clock if needed.

   - Modify ``SocClk_Info[0]`` in ``\usrcfg\ameba_bootcfg.c``..

   - Modify ``Boot_SocClk_Info_Idx`` to *[0, sizeof(SocClk_Info)]*, and then define your own clock info in ``SocClk_Info [Boot_SocClk_ Info_Idx]``.


   .. note::

      Consider the limitations of the hardware and do not set the clock info illogically.

   **Example**

   Change ``KM4_CKD`` of ``SocClk_Info[0]`` to ``CLKDIV(3)`` if KM4 is wanted to run at 520MHz/3.

      .. code-block:: c
         :emphasize-lines: 7

         // For KM4, max. 345MHz under 1.0V, max. 260MHz under 0.9V
         // For KM0, max. 115MHz under 1.0V, max. 104MHz under 0.9V
         // PLL can be 300MHz~688.128MHz
         // KM4_CKD range is [1, 8], KM0_CKD range is [1, 16] or USEXTAL
         const SocClk_Info_TypeDef SocClk_Info[] = {
            // PLL_CLK,    Vol_Type,      KM4_CKD,    KM0_CKD,     PSRAMC_CKD 
            {PLL_520M,     CORE_VOL_0P9,  CLKDIV(2),	CLKDIV(5),   CLKDIV(2)},
            {PLL_331M,     CORE_VOL_1P0,  CLKDIV(1),	CLKDIV(3),   CLKDIV(1)},
            {PLL_400M,     CORE_VOL_0P9,  CLKDIV(2),	CLKDIV(4),   CLKDIV(1)},
            {PLL_480M,     CORE_VOL_0P9,  CLKDIV(2),	CLKDIV(5),   CLKDIV(2)},  // 48M for USB
            {PLL_677P376M, CORE_VOL_1P0,  CLKDIV(2),  CLKDIV(6),   CLKDIV(2)},
            {PLL_688P128M, CORE_VOL_1P0,  CLKDIV(2),  CLKDIV(6),   CLKDIV(2)},
         };

   Based on the example configuration, the clock of KM4 is 173.3MHz, KM0 is 86.6MHz, PSRAM controller is 260MHz (twice the PSRAM), and core power is 0.9V.
   The clocks of left modules will be set to a reasonable value by software automatically based on their maximum speeds.

5. Rebuild the project and download the new image again.
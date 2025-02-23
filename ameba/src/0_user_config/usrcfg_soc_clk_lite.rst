1. (Optional) Find out the speed limit of embedded PSRAM device, if not sure.

   a. Print the value of :func:`ChipInfo_BDNum()` function, which will get the chip info from OTP.

   b. Refer to PSRAM type in *Chip_Info[]* in ``\component\soc\amebalite\lib\ram_common\ameba_chipinfo_lib.c``.

   For example, if *bdnumer* is 0x1010, the PSRAM can run under 200MHz.

   .. code-block:: c

      const CHIPINFO_TypeDef Chip_Info[] = {
         //subnum    pkgnum      bdnumer   psram type
         {0,            2,       1010,     PSRAM_DEVICE_CLK_200 | PSRAM_VENDOR_WB | PSRAM_SIZE_32Mb | PSRAM_PAGE128   }, //QFN48
         {0,            3,       1011,     PSRAM_DEVICE_CLK_250 | PSRAM_VENDOR_WB | PSRAM_SIZE_256Mb | PSRAM_PAGE1024 }, //QFN68
         {0,            1,       1012,     PSRAM_VENDOR_NONE                                                          }, //QFN48
         {0,            0,       1014,     PSRAM_DEVICE_CLK_NotClear | PSRAM_VENDOR_NotClear                          }, //QFN144 debug package
         {1,            2,       1015,     PSRAM_DEVICE_CLK_200 | PSRAM_VENDOR_WB | PSRAM_SIZE_32Mb | PSRAM_PAGE128   }, //QFN48
         {1,            1,       1016,     PSRAM_VENDOR_NONE                                                          }, //QFN48
         {0,            4,       1019,     PSRAM_DEVICE_CLK_250 | PSRAM_VENDOR_WB | PSRAM_SIZE_128Mb | PSRAM_PAGE2048 }, //QFN68
         {0,            5,       1022,     PSRAM_VENDOR_NONE                                                          }, //QFN48
         {1,            2,       1023,     PSRAM_DEVICE_CLK_200 | PSRAM_VENDOR_WB | PSRAM_SIZE_32Mb | PSRAM_PAGE128   }, //QFN48
         {1,            1,       1024,     PSRAM_VENDOR_NONE                                                          }, //QFN48
         {1,            5,       1025,     PSRAM_VENDOR_NONE                                                          }, //QFN48
         {0,            6,       1026,     PSRAM_VENDOR_NONE                                                          }, //QFN68
         {0,            7,       1027,     PSRAM_VENDOR_NONE                                                          }, //QFN68

         {0xFF,         0xFF,    0xFFFF,   PSRAM_DEVICE_CLK_NotClear | PSRAM_VENDOR_NotClear                           }, //debug package
      };

2. Check the value of *Boot_SocClk_Info_Idx* and the clock info in ``\component\soc\amebalite\usrcfg\ameba_bootcfg.c``.

   .. code-block:: c
      :emphasize-lines: 7, 8, 9, 10, 19

      // for kr4/km4, max 400MHz under 1.0v, max 200MHz under 0.9v
      // for dsp, max 500MHz under 1.0v, max 400MHz under 0.9v
      // CPUPLL(PLLM)/DSPPLL(PLLD) can be 330MHz~660MHz
      // All CLKDIV range is [1, 16]
      SocClk_Info_TypeDef SocClk_Info[] = {
         /* PLLM_CLK,	PLLD_CLK,	Vol_Type,		CPU_CKD,			      PSRAMC_CKD*/
         {PLL_600M,		PLL_500M,	CORE_VOL_0P9,	CLKDIV(3) | ISPLLM,	CLKDIV(2) | ISPLLM}, /*0.9V, PSRAM-166M 8720E QFN48*/
         {PLL_600M,		PLL_500M,	CORE_VOL_1P0,	CLKDIV(3) | ISPLLM,	CLKDIV(2) | ISPLLM}, /*1.0V, PSRAM-166M 8720E QFN48*/
         {PLL_400M,		PLL_500M,	CORE_VOL_1P0,	CLKDIV(2) | ISPLLM,	CLKDIV(1) | ISPLLM}, /*1.0V, PSRAM-200M*/
         {PLL_480M,		PLL_500M,	CORE_VOL_1P0,	CLKDIV(2) | ISPLLM,	CLKDIV(1) | ISPLLD}, /*1.0V, PSRAM-250M 8726E QFN68*/
      };

      /**
      * @brif  SocClk_Info select
      * Boot_SocClk_Info_Idx valid value is [0, 3] and 0xFF
      * when Boot_SocClk_Info_Idx is 0xFF, set socclk by chipinfo Automatically
      * when Boot_SocClk_Info_Idx is [0, 3], set socclk by SocClk_Info[Boot_SocClk_Info_Idx]
      */
      u8 Boot_SocClk_Info_Idx = 0xFF;

   - If *Boot_SocClk_Info_Idx* is not 0xFF, the bootloader will set the SoC clock defined by ``SocClk_Info[Boot_SocClk_Info_Idx]``.

   - If *Boot_SocClk_Info_Idx* is 0xFF (defult), the bootloader will set the SoC clock automatically according to the embedded PSRAM type.

   For example, if *bdnumer* is 0x1010, the PSRAM can run under 166MHz, and the bootloader will use ``SocClk_Info[1]. CLKDIV(3) | ISPLLM``, means the clocks KM4/KR4 equal to PLLM/3.

   .. table::
      :width: 100%
      :widths: auto

      +------------+-------------+--------------------+-------------------+
      | PSRAM type | PSRAM speed |   SocClk_Info[x]   | Clock Info        |
      +============+=============+====================+===================+
      | No PSRAM   |             | SocClk_Info[0]     | - PLLM: 600MHz    |
      |            |             |                    |                   |
      |            |             |                    | - PLLD: 500MHz    |
      |            |             |                    |                   |
      |            |             |                    | - KM4/KR4: 200MHz |
      +------------+-------------+--------------------+-------------------+
      | With PSRAM | ≤166MHz     | SocClk_Info[1]     | - PLLM: 600MHz    |
      |            |             |                    |                   |
      |            |             |                    | - PLLD: 500MHz    |
      |            |             |                    |                   |
      |            |             |                    | - KM4/KR4: 200MHz |
      +------------+-------------+--------------------+-------------------+
      | With PSRAM | ≤200MHz     | SocClk_Info[2]     | - PLLM: 400MHz    |
      |            |             |                    |                   |
      |            |             |                    | - PLLD: 500MHz    |
      |            |             |                    |                   |
      |            |             |                    | - KM4/KR4: 200MHz |
      +------------+-------------+--------------------+-------------------+
      | With PSRAM | ≤250MHz     | SocClk_Info[3]     | - PLLM: 480MHz    |
      |            |             |                    |                   |
      |            |             |                    | - PLLD: 500MHz    |
      |            |             |                    |                   |
      |            |             |                    | - KM4/KR4: 240MHz |
      +------------+-------------+--------------------+-------------------+

3. Refer to one of the following methods to change the SoC clock if needed.

   - Keep the *Boot_SocClk_Info_Idx* 0xFF, and only change the clock info of ``SocClk_Info[x]`` to set the clocks of PLLM/PLLD and CPUs.

   - Modify the *Boot_SocClk_Info_Idx* to [0, 3], and then define your own clock info in ``SocClk_Info[Boot_SocClk_Info_Idx]``.

   .. note:: Consider the limitations of the hardware and do not set the clock info illogically.

   **Example**

   Change *CPU_CKD* of ``SocClk_Info[2]`` to *CLKDIV(1)* if CPU is needed to run faster.

      .. code-block:: c
         :emphasize-lines: 5

         SocClk_Info_TypeDef SocClk_Info[] = {
            /* PLLM_CLK,	PLLD_CLK,	Vol_Type,		CPU_CKD,			      PSRAMC_CKD*/
            {PLL_600M,		PLL_500M,	CORE_VOL_0P9,	CLKDIV(3) | ISPLLM,	CLKDIV(2) | ISPLLM}, /*0.9V, PSRAM-166M 8720E QFN48*/
            {PLL_600M,		PLL_500M,	CORE_VOL_1P0,	CLKDIV(3) | ISPLLM,	CLKDIV(2) | ISPLLM}, /*1.0V, PSRAM-166M 8720E QFN48*/
            {PLL_400M,		PLL_500M,	CORE_VOL_1P0,	CLKDIV(2) | ISPLLM,	CLKDIV(1) | ISPLLM}, /*1.0V, PSRAM-200M*/
            {PLL_480M,		PLL_500M,	CORE_VOL_1P0,	CLKDIV(2) | ISPLLM,	CLKDIV(1) | ISPLLD}, /*1.0V, PSRAM-250M 8726E QFN68*/
         };

         /**
         * @brif  SocClk_Info select
         * Boot_SocClk_Info_Idx valid value is [0, 3] and 0xFF
         * when Boot_SocClk_Info_Idx is 0xFF, set socclk by chipinfo Automatically
         * when Boot_SocClk_Info_Idx is [0, 3], set socclk by SocClk_Info[Boot_SocClk_Info_Idx]
         */
         u8 Boot_SocClk_Info_Idx = 0xFF;

   Based on the configuration, the clock of KM4/KR4 is 400MHz, PSRAM controller is 400MHz (twice the PSRAM), and core power is 1.0V.
   The clocks of left modules will be set to a reasonable value by software automatically based on their maximum speeds.

   .. note:: The PLLD can be disabled if you do not need it work.

4. Re-build the project and download the new image again.
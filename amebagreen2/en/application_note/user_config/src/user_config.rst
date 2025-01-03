.. _user_configuration:

Introduction
------------------------
The KM4 in |CHIP_NAME| device boots at 200MHz at the BootRom Stage, and switches to a higher frequency during the Bootloader Stage. There are some limits when changing SoC clock:

.. table:: 
   :width: 100%
   :widths: auto

   +-------+-------+-----------------+--------------+
   | Clock | Cut   | Frequency       | Core voltage |
   +=======+=======+=================+==============+
   | PLL   |       | 300MHz ~ 600MHz |              |
   +-------+-------+-----------------+--------------+
   | KM0   | A-Cut | ≤115MHz         |              |
   +-------+-------+-----------------+--------------+
   | KM4   | A-Cut | ≤260MHz         | 0.9V         |
   +-------+-------+-----------------+--------------+
   | KM4   | A-Cut | ≤345MHz         | 1.0V         |
   +-------+-------+-----------------+--------------+


.. note::
   The maximum operating speed of Flash with Wide Range VCC 1.65V~3.6V should use the speed limit of 1.65V~2.3V power supply.

.. only:: internal
   
   Flash使用1.8V供电时，只支持pad为strong driving的情况。
   
SoC Clock Switch
--------------------------------
The SDK path mentioned in the following sections is ``{SDK}\component\soc\amebadplus\``.

.. _flow:

Flow
~~~~~~~~

.. _soc_clock_switch_flow_step_1:

1. (Optional) Find out the speed limit of PSRAM device embedded in |CHIP_NAME| if not sure.

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
	    // PLL_CLK,    Vol_Type,      KM4_CKD,    KM0_CKD,   PSRAMC_CKD
	    {PLL_520M,     CORE_VOL_0P9,  CLKDIV(2),	CLKDIV(5),  CLKDIV(2)},
	    {PLL_331M,     CORE_VOL_1P0,  CLKDIV(1),	CLKDIV(3),  CLKDIV(1)},
	    {PLL_400M,     CORE_VOL_0P9,  CLKDIV(2),	CLKDIV(4),  CLKDIV(1)},
	    {PLL_480M,     CORE_VOL_0P9,  CLKDIV(2),	CLKDIV(5),  CLKDIV(2)},  // 48M for USB
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

   No limitation by PSRAM device, the bootloader will set the SoC clock defined by ``SocClk_Info[Boot_SocClk_Info_Idx]``.

   .. list-table::
      :header-rows: 1

      * - PSRAM type
        - PSRAM speed
        - SocClk_Info[*x*]
        - Description
        - Clock Info
      * - No PSRAM
        - 
        - Boot_SocClk_Info_Idx = 0
        - Bootloader will set the Soc clock

          according to ``SocClk_Info[0]``
        - 
          - PLL: 520MHz
          - KM4: 260MHz
          - KM0: 86.6MHz
      * - WB955
        - <=200M
        - Boot_SocClk_Info_Idx = 1
        - Bootloader will set the Soc clock
  
          according to ``SocClk_Info[1]``
        - 
          - PLL: 330MHz
          - KM4: PLL/1
          - KM0: PLL/4
          - PSRASM: PLL/1/2


4. Refer to one of the following methods to change the SoC clock if needed.

   - Modify ``SocClk_Info[0]`` in ``\usrcfg\ameba_bootcfg.c``. Please refer to Section :ref:`example` Step :ref:`2 <soc_clock_switch_example_step_2>` for details.

   - Modify ``Boot_SocClk_Info_Idx`` to *[0, sizeof(SocClk_Info)]*, and then define your own clock info in ``SocClk_Info [Boot_SocClk_ Info_Idx]``.


   .. note::

      Consider the limitations of the hardware and do not set the clock info illogically.


5. Rebuild the project and download the new image again.

.. _example:

Example
~~~~~~~~~~~~~~
1. Refer to Section :ref:`flow` Step :ref:`1 <soc_clock_switch_flow_step_1>` to find out the speed limit of PSRAM device if not sure (suppose the maximum speed is 200MHz).

.. _soc_clock_switch_example_step_2:

1. Change ``KM4_CKD`` of ``SocClk_Info[0]`` to ``CLKDIV(3)`` if KM4 is wanted to run at 520MHz/3.

   .. code-block:: c
      :emphasize-lines: 7

      // For KM4, max. 345MHz under 1.0V, max. 260MHz under 0.9V
      // For KM0, max. 115MHz under 1.0V, max. 104MHz under 0.9V
      // PLL can be 300MHz~688.128MHz
      // KM4_CKD range is [1, 8], KM0_CKD range is [1, 16] or USEXTAL
      const SocClk_Info_TypeDef SocClk_Info[] = {
	    // PLL_CLK,    Vol_Type,      KM4_CKD,    KM0_CKD,   PSRAMC_CKD 
	    {PLL_520M,     CORE_VOL_0P9,  CLKDIV(2),	CLKDIV(5),  CLKDIV(2)},
	    {PLL_331M,     CORE_VOL_1P0,  CLKDIV(1),	CLKDIV(3),  CLKDIV(1)},
	    {PLL_400M,     CORE_VOL_0P9,  CLKDIV(2),	CLKDIV(4),  CLKDIV(1)},
	    {PLL_480M,     CORE_VOL_0P9,  CLKDIV(2),	CLKDIV(5),  CLKDIV(2)},  // 48M for USB
	    {PLL_677P376M, CORE_VOL_1P0,  CLKDIV(2),  CLKDIV(6),   CLKDIV(2)},
	    {PLL_688P128M, CORE_VOL_1P0,  CLKDIV(2),  CLKDIV(6),   CLKDIV(2)},
      };


2. Rebuild the project and download the new image.

Now, the clock of KM4 is 173.3MHz, KM0 is 86.6MHz, PSRAM controller is 260MHz (twice the PSRAM), and core power is 0.9V.
The clocks of left modules in |CHIP_NAME| will be set to a reasonable value by software automatically based on their maximum speeds.

Flash Clock Switch
------------------------------------
Flash runs half as fast as the SPI Flash controller. 
By default, the speed of the SPI Flash controller is divided by the PLL, and the speed of the SPI Flash controller shall be less than ``SPIC_CLK_LIMIT`` (208MHz).
If the Flash needs to run slower, change the value of ``Flash_Speed`` (SPIC0) or ``Data_Flash_Speed`` (SPIC1) in ``\usrcfg\ameba_flashcfg.c``.

.. code-block:: c

    /**
    * @brif Indicate the flash baudrate. It can be one of the following values:
    *	CLKDIV(10): => SPIC clock = 1/10 pll
    *	CLKDIV(9): => SPIC clock = 1/9 pll
    *	CLKDIV(8): => SPIC clock = 1/8 pll
    *	CLKDIV(7): => SPIC clock = 1/7 pll
    *	CLKDIV(6): => SPIC clock = 1/6 pll
    *	CLKDIV(5): => SPIC clock = 1/5 pll
    *	CLKDIV(4): => SPIC clock = 1/4 pll
    *	CLKDIV(3): => SPIC clock = 1/3 pll
    *	CLKDIV(2): => SPIC clock = 1/2 pll
    *	other value is not support.
    */
    const u16 Flash_Speed = CLKDIV(2);
    const u16 Data_Flash_Speed = CLKDIV(2);


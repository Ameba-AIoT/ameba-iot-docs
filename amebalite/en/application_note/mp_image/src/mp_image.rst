.. _mp_image:

Introduction
------------------------
The MP image is used for Wi-Fi & BT performance verification and Wi-Fi & BT parameters calibration in massive production. This chapter mainly illustrates how to build and use the MP image.


.. only:: RTL8726EA

   Refer to *WS_RTL8720E_RTL8726E_MP_FLOW.pdf* for more details about MP flow.


.. _how_to_build_mp_image:

How to Build MP Image
------------------------------------------
The steps of building MP image are depicted below:

1. Switch to work directory ``{SDK}\amebalite_gcc_project``.

2. Use command ``$make menuconfig`` to modify the configurations.

   a. Enable MP

      .. figure:: ../figures/enable_mp.svg
         :scale: 110%
         :align: center

   b. Enable Wi-Fi, and configure KM4 as AP core and KR4 as NP core.

      .. figure:: ../figures/enable_wifi.svg
         :scale: 110%
         :align: center

   c. Enable BT, and configure KM4 as AP core and KR4 as NP core.

      .. figure:: ../figures/enable_bt.svg
         :scale: 110%
         :align: center

   d. Save and exit the menuconfig.

3. Use command ``$make all`` to rebuild project of KR4 and KM4.

.. only:: RTL8726EA

   The MP image :file:`kr4_km4_dsp_app_mp.bin` will be generated in ``{SDK}\amebalite_gcc_project`` and all the images related to the MP image can be found in the paths below:

   ::

      {SDK}\amebalite_gcc_project\project_km4\asdk\image_mp
      {SDK}\amebalite_gcc_project\project_kr4\asdk\image_mp

   .. note::
      For details of mergeing DSP image into application image, refer to :ref:`OTA Firmware Update <ota_firmware_update>`.

.. _how_to_combine_images:

How to Combine Images
------------------------------------------
Before downloading images into the chip, the MP image needs to be combined with normal image. In massive production, the MP image is used to calibrate the parameters first. After calibration, you can use the command illustrated in :ref:`how_to_switch_image` to switch to the normal image and boot from it. Since the chip boots from OTA1 by default when both OTA1 and OTA2 images are valid and with the same version number, the MP image should be located in the OTA1 field.


The steps of combining images are depicted below:

1. Check if both the normal image and MP image are valid.

.. only:: RTL8726EA

   2. Use ImageTool to combine all the images, including :file:`km4_boot_all.bin`, :file:`kr4_km4_dsp_app_mp.bin` and :file:`kr4_km4_dsp_app.bin`, which are generated in ``{SDK}\amebalite_gcc_project``.

      a. Set the image offsets in Image Tool according to the Flash layout, which can be found in ``{SDK}\component\soc\amebalite\ usrcfg\ameba_flashcfg.c``.

         - Set kr4_km4_dsp_app_mp.bin in ``IMG_APP_OTA1`` section.
         - Set kr4_km4_dsp_app.bin in ``IMG_APP_OTA2`` section.

         .. code-block::
            :emphasize-lines: 3, 5, 9

            FlashLayoutInfo_TypeDef Flash_Layout[] = {
               /*Region_Type,	[StartAddr,	EndAddr] */
               {IMG_BOOT,		0x08000000,	0x08013FFF},	//Boot Manifest(4K) + KM4 Bootloader(76K)
               //Users should modify below according to their own memory
               {IMG_APP_OTA1,	0x08014000,	0x08093FFF},	//Certificate(4K) + Manifest(4K) + KM4 Application OTA1
               {IMG_KR4_OTA1,	0x8094000,	0x081F3FFF},	//Manifest(4K) + KR4 Application OTA1

               //{IMG_BOOT_OTA2,	0x08200000,	0x08213FFF},	//Boot Manifest(4K) + KM4 Bootloader(76K) OTA2
               {IMG_APP_OTA2,	0x08214000,	0x08293FFF},	//Certificate(4K) + Manifest(4K) + KM4 Application OTA2
               {IMG_KR4_OTA2,	0x08294000,	0x083F3FFF},	//Manifest(4K) + KR4 Application OTA1

               {FTL, 			0x08700000, 0x08702FFF}, //FTL for BT(>=12K), The start offset of flash pages which is allocated to FTL physical map.
               {VFS1, 			0x08703000, 0x08722FFF}, //VFS region 1 (128K)
               {VFS2, 			0xFFFFFFFF, 0xFFFFFFFF}, //VFS region 2
               {USER, 			0xFFFFFFFF, 0xFFFFFFFF}, //reserve for user

               /* End */
               {0xFF, 			0xFFFFFFFF, 0xFFFFFFFF},
            };


      b. Click :guilabel:`Generate` button in Image Tool, and save the combined image named :file:`Image_All.bin`.

         .. figure:: ../figures/mp_generate_image_8726EA.svg
            :scale: 90%
            :align: center


3. Download the :file:`Image_All.bin` into the device after the combination is finished.

.. only:: RTL8726EA

   .. note::
      The normal image :file:`kr4_km4_dsp_app.bin` is built with MP disabled. Check the normal image in ``{SDK}\amebalite_gcc_project``. All the images related to normal image can be found in paths below:

      ::

         {SDK}\amebalite_gcc_project\project_km4\asdk\image.
         {SDK}\amebalite_gcc_project\project_kr4\asdk\image.


      .. figure:: ../figures/disable_mp.svg
         :scale: 90%
         :align: center

Boot Flow
------------------
1. Reset the device after downloading image is finished.
2. Check if the device boots from MP image successfully.

   .. code-block::
      :emphasize-lines: 12, 33

      [MODULE_BOOT-LEVEL_INFO]: KR4 XIP IMG[0c000000:120000]
      [MODULE_BOOT-LEVEL_INFO]: KR4 PSRAM[60060000:2e74]
      [MODULE_BOOT-LEVEL_INFO]: KR4 SRAM[0c122e74:20]
      [MODULE_BOOT-LEVEL_INFO]: KR4 B00T[20040000:40]
      [MODULE_BOOT-LEVEL_INFO]: KR4 PMC[20004c20:160]
      [MODULE_BOOT-LEVEL_INFO]: KM4 XIP IMG[0e000000:5d080]
      [MODULE_BOOT-LEVEL_INFO]: KM4 PSRAM[60060000:27a0]
      [MODULE_BOOT-LEVEL_INFO]: KM4 SRAM[0e05f820:20]
      [MODULE_BOOT-LEVEL_INFO]: KM4 PMC[20004e00:1f0]
      [MODULE_BOOT-LEVEL_INFO]: DSP PhyAddr 8199a30 ImgAddr d000000
      [MODULE_BOOT-LEVEL_INFO]: DSP XIP IMG Invalid ffffffff ffffffff
      [MODULE_BOOT-LEVEL_INFO]: IMG2 BOOT from OTA1
      [MODULE_BOOT-LEVEL_INFO]: PMC_CORE_ROLE: 0 (0 represents AP2NP), NP: 0 (1 represents KR4 is NP)
      [MODULE_BOOT-LEVEL_INFO]: KM4 APP START
      [MODULE_BOOT-LEVEL_INFO]: IMG2 SECURE STATE: O
      [MODULE_BOOT-LEVEL_INFO]: KM4 BOOT REASON: O
      [MODULE_BOOT-LEVEL_INFO]: KM4 CPU CLK: 240000000Hz
      [MODULE_BOOT-LEVEL_INFO]: KR4 OS START
      [CAL131K]: delta:26 target:2441 PpM: 10651 PPM_Limit:30000
      [CAL4M]: delta:1 target:320 PPM: 3125 PPM_Limit:30000
      [MODULE_BOOT-LEVEL_INFO]: KM4 MAIN
      [MODULE_PMC-LEVEL_INFO]: SYSPMC_OPT 200000
      [MODULE_PMC-LEVEL_INFO]: AP wake event 200020 0
      [MODULE_PMC-LEVEL_INFO]: DSP wake event 80 0
      [MODULE_PMC-LEVEL_INFO]: NP wake event 4f 0
      [MoDULE_PMC-LEVEL_TNFO]: REG_AON_PMC_OPT 0x32
      [MODULE_BOOT-LEVEL_INFO]: KM4 START SCHEDULER
      interface 0 is initialized
      interface 1 is initialized
      interface 2 is initialized

      Initializing WIFI ...
      RTL8720E[Driver]: The driver is for MP Firmware Enable

      _init_thread(39), Available heap Ox2db60

3. Start the massive production flow if the device boots from MP image successfully.

.. _how_to_switch_image:

How to Switch Image
--------------------------------------
When MP finished, you need to switch the image from MP image to the normal image to verify the application.

1. Use command ``AT+OTACLEAR`` from serial terminal to clear the signature of MP image in order to assign the MP image invalid.

   .. code-block::

      [16:41:35:731]AT+OTACLEAR
      [16:41:35:731][SYS-A][sys_clear_ota_signature] IMGID: 1, current OTA1 Address: 0x00014000, target OTA2 Address: 0x00214000
      [16:41:35:731]
      [16:41:35:731]+OTACLEAR:OK
      [16:41:35:731]
      [16:41:35:732][MEM] After do cmd, available heap 318976

2. Reset the device, the device will boot from the normal image located in OTA2 field.

   .. code-block::
      :emphasize-lines: 6

      [BOOT-I] KM4 XIP IMG[0e000000:725e0]
      [BOOT-I] KM4 PSRAM[0e000000:725e0]
      [BOOT-I] KM4 SRAM[2000b000:11c0]
      [BOOT-I] KM4 BOOT[20005fc0:40]
      [BOOT-I] KM4 PMC[20005900:3e0]
      [BOOT-I] IMG2 BOOT from OTA 2, Version: 1.1
      [BOOT-I] Start IMG2 @ 0xe00277d ...
      [APP-I] kM4 APP START
      [APP-I] VTOR: 30007000, VTOR_NS:30007000
      [APP-I] IMG2 SECURE STATE: 1
      [MAIN-I] KR4 OS START
      [CLK-I] [CAL131K]: delta:8 target:2441 PPM: 3277 PPM_Limit:30000



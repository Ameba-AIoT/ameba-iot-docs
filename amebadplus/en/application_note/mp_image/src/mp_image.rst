.. _mp_image:

Introduction
------------------------
The MP image is used for Wi-Fi & BT performance verification and Wi-Fi & BT parameters calibration in massive production. This chapter mainly illustrates how to build and use the MP image.

Refer to the MP document for more details about MP flow.

.. _how_to_build_mp_image:

How to Build MP Image
------------------------------------------
The steps of building MP image are depcited below:

1. Navigate to work directory ``{SDK}\amebadplus_gcc_project``.

2. Use command ``make menuconfig`` to modify the configurations.

   a. Enable MP

      .. figure:: ../figures/enable_mp.svg
         :scale: 100%
         :align: center

   b. Enable Wi-Fi, and configure KM4 as AP core and KM0 as NP core.

      .. figure:: ../figures/enable_wifi.svg
         :scale: 100%
         :align: center

   c. Enable BT.

      .. figure:: ../figures/enable_bt.svg
         :scale: 100%
         :align: center

   d. Save and exit the menuconfig.

3. Use command ``make all`` to rebuild the projects of KM0 and KM4.

The MP image ``km0_km4_app_mp.bin`` will be generated in ``{SDK}\amebadplus_gcc_project`` and all the images releated to the MP image can be found in the paths below:

   .. code-block::

      {SDK}\amebadplus_gcc_project\project_km4\asdk\image_mp
      {SDK}\amebadplus_gcc_project\project_km0\asdk\image_mp

.. _how_to_combine_images:

How to Combine Images
------------------------------------------
Before downloading images into the chip, the MP image needs to be combined with normal image. In massive production, the MP image is used to calibrate the parameters first. After calibration, you can use the command illustrated in :ref:`how_to_switch_image` to switch to the normal image and boot from it. Since the chip boots from OTA1 by default when both OTA1 and OTA2 images are valid and with the same version number, the MP image should be located in the OTA1 field.


The steps of combining images are depcited below:

1. Check if both the normal image and MP image are valid.

2. Use the ``Ameba_1-10_MP_ImageTool_Linux`` to combine all the images, including ``km4_boot_all.bin``, ``km0_km4_app_mp.bin`` and ``km0_km4_app.bin``, which are located in ``{SDK}\amebadplus_gcc_project``.

   a. Set the highlight image offsets according to the Flash layout, which can be found in ``{SDK}\component\soc\amebadplus\usrcfg\ameba_flashcfg.c``.

      .. code-block:: c
         :emphasize-lines: 6,8,11
         :linenos:

         /*
         * @brif	Flash layout is set according to Flash Layout in User Manual
         *  In each entry, the first item is flash regoin type, the second item is start address, the second item is end address */
         const FlashLayoutInfo_TypeDef Flash_Layout[] = {
            /*Region_Type,	[StartAddr,	EndAddr]		*/
            {IMG_BOOT, 		0x08000000, 0x08013FFF}, //Boot Manifest(4K) + KM4 Bootloader(76K)
            //Users should modify below according to their own memory
            {IMG_APP_OTA1, 0x08014000, 0x081F3FFF}, //Certificate(4K) + Manifest(4K) + KM4 Application OTA1 + Manifest(4K) + RDP IMG OTA1

            {IMG_BOOT_OTA2, 0x08200000, 0x08213FFF}, //Boot Manifest(4K) + KM4 Bootloader(76K) OTA
            {IMG_APP_OTA2, 0x08214000, 0x083F3FFF}, //Certificate(4K) + Manifest(4K) + KM4 Application OTA2 + Manifest(4K) + RDP IMG OTA2

            {FTL,			0x08700000, 0x08702FFF}, //FTL for BT(>=12K), The start offset of flash pages which is allocated to FTL physical map.
            {VFS1, 			0x08703000, 0x08722FFF}, //VFS region 1 (128K)
            {USER, 			0xFFFFFFFF, 0xFFFFFFFF}, //reserve for user

            /* End */
            {0xFF, 			0xFFFFFFFF, 0xFFFFFFFF},
         };


      - Set ``km0_km4_app_mp.bin`` in ``IMG_APP_OTA1`` section

      - Set ``km0_km4_app.bin`` in ``IMG_APP_OTA2`` section

   b. Execute the command and save the combined image named ``Image_All.bin``.

      .. code::

         sudo ./Ameba_1-10_MP_ImageTool_Linux -combine km4_boot_all.bin 0x0000 km0_km4_app_mp.bin 0x14000 km0_km4_app.bin 0x214000

3. Download the ``Image_All.bin`` into the device after the combination is finished.

.. note::
   The normal image ``km0_km4_app.bin`` is built with MP disabled. Check the normal image in ``{SDK}\amebadplus_gcc_project``. All the images related to normal image can be found in paths below:

   .. code::

      {SDK}\amebadplus_gcc_project\project_km4\asdk\image
      {SDK}\amebadplus_gcc_project\project_km0\asdk\image


Boot Flow
------------------
1. Reset the device after downloading image is finished.

2. Check if the device boots from MP image successfully.

   .. figure:: ../figures/boot_flow_1.png
      :scale: 60%
      :align: center

3. Start the massive production flow if the device boots from MP image successfully.

.. _how_to_switch_image:

How to Switch Image
--------------------------------------
When MP is finished, you need to switch the image from MP image to the normal image to verify the application.

1. Use command ``AT+OTACLEAR`` from serial terminal to clear the signature of MP image in order to assign the MP image invalid.

   .. code-block::

      [16:41:35:731]AT+OTACLEAR
      [16:41:35:731][SYS-A] [sys_clear_ota_signature] IMGID: 1, current OTA1 Address: 0x00014000, target OTA2 Address: 0x00214000
      [16:41:35:731]
      [16:41:35:731]+OTACLEAR:OK
      [16:41:35:731]
      [16:41:35:732][MEM] After do cmd, available heap 318976

2. Reset the device, then the device will boot from the normal image located in OTA2 field.

   .. figure:: ../figures/boot_flow_3.png
      :scale: 60%
      :align: center


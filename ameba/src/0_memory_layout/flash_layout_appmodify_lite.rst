**APP OTA1**

Follow the steps to modify the location of APP OTA1:

1. Modify the address of *IMG_APP_OTA1* in ``{SDK}\component\soc\amebaxxx\usrcfg\ameba_flashcfg.c``.

   .. code-block:: c
      :emphasize-lines: 8

      /*
      * @brif Flash layout is set according to Flash Layout in User Manual
      *  In each entry, the first item is flash region type, the second item is start address, the third item is end address */
      FlashLayoutInfo_TypeDef Flash_Layout[] = {
         /*Region_Type,	[StartAddr,	EndAddr]		*/
         {IMG_BOOT,      0x08000000, 0x08013FFF}, //Boot Manifest(4K) + KM4 Bootloader(76K)
         //Users should modify below according to their own memory
         {IMG_APP_OTA1,  0x08014000, 0x081F3FFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4 Application OTA1 + Manifest(4K) + RDP IMG OTA1

         {IMG_BOOT_OTA2, 0x08200000, 0x08213FFF}, //Boot Manifest(4K) + KM4 Bootloader(76K) OTA
         {IMG_APP_OTA2,  0x08214000, 0x083DCFFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4 Application OTA2 + Manifest(4K) + RDP IMG OTA2
         {FTL,           0x083DD000, 0x083DFFFF}, //FTL for BT(>=12K), The start offset of flash pages which is allocated to FTL physical map.
         {VFS1,          0x083E0000, 0x083FFFFF}, //VFS region 1 (128K)
         {IMG_DSP,       0x08400000, 0x086FFFFF}, //Manifest(4K) + DSP IMG, only one DSP region in layout
         {VFS2,          0xFFFFFFFF, 0xFFFFFFFF}, //VFS region 2
         {USER,          0xFFFFFFFF, 0xFFFFFFFF}, //reserve for user

         /* End */
         {0xFF,          0xFFFFFFFF, 0xFFFFFFFF},
      };


2. Re-build the project to generate the bootloader and APP OTA1.

3. Modify the address of :file:`kr4_km4_app.bin` through Image Tool, and download the new bootloader and APP OTA1.

   .. figure:: figures/app_ota1_step3_lite.png
      :scale: 50%
      :align: center

After that, the bootloader will load the image from the new location of APP OTA1 if the version of APP OTA1 is bigger.

**APP OTA2**

Follow the steps to modify the location of APP OTA2:

1. Modify the address of *IMG_APP_OTA2* in ``{SDK}\component\soc\amebaxxx\usrcfg\ameba_flashcfg.c``.

2. Re-build and download the new bootloader and APP OTA2 as described in Section **APP OTA1**.

   .. code-block:: c
      :emphasize-lines: 11

      /*
      * @brif Flash layout is set according to Flash Layout in User Manual
      *  In each entry, the first item is flash region type, the second item is start address, the third item is end address */
      FlashLayoutInfo_TypeDef Flash_Layout[] = {
         /*Region_Type,	[StartAddr,	EndAddr]		*/
         {IMG_BOOT,      0x08000000, 0x08013FFF}, //Boot Manifest(4K) + KM4 Bootloader(76K)
         //Users should modify below according to their own memory
         {IMG_APP_OTA1,  0x08014000, 0x081F3FFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4 Application OTA1 + Manifest(4K) + RDP IMG OTA1

         {IMG_BOOT_OTA2, 0x08200000, 0x08213FFF}, //Boot Manifest(4K) + KM4 Bootloader(76K) OTA
         {IMG_APP_OTA2,  0x08214000, 0x083DCFFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4 Application OTA2 + Manifest(4K) + RDP IMG OTA2
         {FTL,           0x083DD000, 0x083DFFFF}, //FTL for BT(>=12K), The start offset of flash pages which is allocated to FTL physical map.
         {VFS1,          0x083E0000, 0x083FFFFF}, //VFS region 1 (128K)
         {IMG_DSP,       0x08400000, 0x086FFFFF}, //Manifest(4K) + DSP IMG, only one DSP region in layout
         {VFS2,          0xFFFFFFFF, 0xFFFFFFFF}, //VFS region 2
         {USER,          0xFFFFFFFF, 0xFFFFFFFF}, //reserve for user

         /* End */
         {0xFF,          0xFFFFFFFF, 0xFFFFFFFF},
      };

After burning the APP OTA2 into Flash through OTA, bootloader will load the image from the new location of APP OTA2 if the version of APP OTA2 is bigger.

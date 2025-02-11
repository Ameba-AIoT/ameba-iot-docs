.. tab:: RTL8721Dx

   .. code-block:: c
      :emphasize-lines: 8,11

      /*
      * @brif	Flash layout is set according to Flash Layout in User Manual
      *  In each entry, the first item is flash regoin type, the second item is start address, the second item is end address */
      const FlashLayoutInfo_TypeDef Flash_Layout[] = {
         /*Region_Type,	[StartAddr,	EndAddr]		*/
         {IMG_BOOT, 0x08000000, 0x08013FFF}, //Boot Manifest(4K) + KM4 Bootloader(76K)
         //Users should modify below according to their own memory
         {IMG_APP_OTA1, 0x08014000, 0x081F3FFF}, //Certificate(4K) + Manifest(4K) + KM4 Application OTA1 + Manifest(4K) + RDP IMG OTA1

         {IMG_BOOT_OTA2, 0x08200000, 0x08213FFF}, //Boot Manifest(4K) + KM4 Bootloader(76K) OTA
         {IMG_APP_OTA2, 0x08214000, 0x083F3FFF}, //Certificate(4K) + Manifest(4K) + KM4 Application OTA2 + Manifest(4K) + RDP IMG OTA2

         {FTL,	0x08700000, 0x08702FFF}, //FTL for BT (>=12K), the start offset of flash pages which is allocated to FTL physical map.
         {VFS1, 0x08703000, 0x08722FFF}, //VFS region 1 (128K)
         {USER, 0xFFFFFFFF, 0xFFFFFFFF}, //reserve for user

         /* End */
         {0xFF, 0xFFFFFFFF, 0xFFFFFFFF},
      };


.. tab:: RTL8730E

   .. code-block:: c
      :emphasize-lines: 8,11

      /*
      * @brif	Nor Flash layout is set according to Nor Flash Layout in User Manual
      *  In each entry, the first item is flash regoin type, the second item is start address, the second item is end address */
      FlashLayoutInfo_TypeDef Flash_Layout_Nor[] = {
         /*Region_Type,		[StartAddr,	EndAddr]		*/
         {IMG_BOOT, 			0x08000000, 0x0801FFFF}, //Boot Manifest(4K) + KM4 Bootloader(124K)
         //Users should modify below according to their own memory
         {IMG_APP_OTA1, 		0x08020000, 0x082FFFFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4 Application OTA1 + Manifest(4K) + RDP IMG OTA1
         // + AP IMG OTA1
         {IMG_BOOT_OTA2, 	0x08300000, 0x0833FFFF}, //Boot Manifest(4K) + KM4 Bootloader(252K) OTA
         {IMG_APP_OTA2, 		0x08340000, 0x0861FFFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4 Application OTA2 + Manifest(4K) + RDP IMG OTA2
         // + AP IMG OTA2
         {FTL,				0x08620000, 0x08622FFF}, //FTL for BT(>=12K), The start offset of flash pages which is allocated to FTL physical map.
         {VFS1, 				0x08623000, 0x08642FFF}, //VFS region 1 (128K)
         {VFS2, 				0xFFFFFFFF, 0xFFFFFFFF}, //VFS region 2
         {USER, 				0xFFFFFFFF, 0xFFFFFFFF}, //reserve for user
         /* End */
         {0xFF, 				0xFFFFFFFF, 0xFFFFFFFF},
      };


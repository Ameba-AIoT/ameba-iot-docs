.. tab:: RTL8730E

   Adjust the Flash partitions appropriately if the VFS interfaces are set to the Flash, and modify VFS1 or VFS2 (according to register region in :file:`main.c`) in `Flash_Layout[]` in ``{SDK}\component\soc\amebasmart\usrcfg\ameba_flashcfg.c``.

   .. note::
      The Flash type should be considered when changing the Flash layout.

      - NOR Flash for FatFS and LittleFS
      - NAND Flash only for LittleFS

   .. code-block:: c
      :emphasize-lines: 11,12

      FlashLayoutInfo_TypeDef Flash_Layout_Nor[] = {
         /*Region_Type,		[StartAddr,	EndAddr]		*/
         {IMG_BOOT, 			0x08000000, 0x0801FFFF}, //Boot Manifest(4K) + KM4 Bootloader(124K)
         //Users should modify below according to their own memory
         {IMG_APP_OTA1, 		0x08020000, 0x082FFFFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4   Application OTA1 + Manifest(4K) + RDP IMG OTA1
         // + AP IMG OTA1
         {IMG_BOOT_OTA2, 	0x08300000, 0x0833FFFF}, //Boot Manifest(4K) + KM4 Bootloader(252K) OTA
         {IMG_APP_OTA2, 		0x08340000, 0x0861FFFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4   Application OTA2 + Manifest(4K) + RDP IMG OTA2
         // + AP IMG OTA2
         {FTL,				0x08620000, 0x08622FFF}, //FTL for BT(>=12K), The start offset of flash    pages which is allocated to FTL physical map.
         {VFS1, 				0x08623000, 0x08642FFF}, //VFS region 1 (128K)
         {VFS2, 				0xFFFFFFFF, 0xFFFFFFFF}, //VFS region 2
         {USER, 				0xFFFFFFFF, 0xFFFFFFFF}, //reserve for user
         /* End */
         {0xFF, 				0xFFFFFFFF, 0xFFFFFFFF},
      };


   .. code-block:: c
      :emphasize-lines: 11,12

      FlashLayoutInfo_TypeDef Flash_Layout_Nand[] = {
         /*Region_Type,		[StartAddr,	EndAddr]		*/
         {IMG_BOOT, 			0x08000000, 0x0801FFFF}, //Boot Manifest(4K) + KM4 Bootloader(124K)
         //Users should modify below according to their own memory
         {IMG_APP_OTA1, 		0x08020000, 0x082FFFFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4   Application OTA1 + Manifest(4K) + RDP IMG OTA1
         // + AP IMG OTA1
         {IMG_BOOT_OTA2, 	0x08300000, 0x0833FFFF}, //Boot Manifest(4K) + KM4 Bootloader(252K) OTA
         {IMG_APP_OTA2, 		0x08340000, 0x0861FFFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4   Application OTA2 + Manifest(4K) + RDP IMG OTA2
         // + AP IMG OTA2
         {FTL,				0x0C400000, 0x0C45FFFF}, //FTL for BT(>=384K), The start offset of flash   pages which is allocated to FTL physical map.
         {VFS1, 				0x0C460000, 0x0C55FFFF}, //VFS region 1(1024K)
         {VFS2, 				0xFFFFFFFF, 0xFFFFFFFF}, //VFS region 2
         {USER, 				0xFFFFFFFF, 0xFFFFFFFF}, //reserve for user
         /* End */
         {0xFF, 				0xFFFFFFFF, 0xFFFFFFFF},
      };

   .. note::
      - The **VFS1** region must exist, and its size should always be larger than 128KB.
      - There are two VFS regions at most.
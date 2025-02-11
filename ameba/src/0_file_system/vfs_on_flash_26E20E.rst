.. tab:: RTL8726EA/RTL8720EA

   Adjust the Flash partitions appropriately if the VFS interfaces are set to the Flash, and modify VFS1 or VFS2 (according to register region in :file:`main.c`) in `Flash_Layout[]` in ``{SDK}component\soc\amebalite\usrcfg\ameba_flashcfg.c``.

   .. code-block:: c
      :emphasize-lines: 10

      FlashLayoutInfo_TypeDef Flash_Layout[] = {
         /*Region_Type,	[StartAddr,	EndAddr]		*/
         {IMG_BOOT,      0x08000000, 0x08013FFF}, //Boot Manifest(4K) + KM4 Bootloader(76K)
         //Users should modify below according to their own memory
         {IMG_APP_OTA1,  0x08014000, 0x081F3FFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4  Application OTA1 + Manifest(4K) + RDP IMG OTA1

         {IMG_BOOT_OTA2, 0x08200000, 0x08213FFF}, //Boot Manifest(4K) + KM4 Bootloader(76K) OTA
         {IMG_APP_OTA2,  0x08214000, 0x083DCFFF}, //Certificate(4K) + Manifest(4K) + KR4 & KM4  Application OTA2 + Manifest(4K) + RDP IMG OTA2
         {FTL,           0x083DD000, 0x083DFFFF}, //FTL for BT(>=12K), The start offset of flash   pages which is allocated to FTL physical map.
         {VFS1,          0x083E0000, 0x083FFFFF}, //VFS region 1 (128K)
         {IMG_DSP,       0x08400000, 0x086FFFFF}, //Manifest(4K) + DSP IMG, only one DSP region in    layout
         {VFS2,          0xFFFFFFFF, 0xFFFFFFFF}, //VFS region 2
         {USER,          0xFFFFFFFF, 0xFFFFFFFF}, //reserve for user

         /* End */
         {0xFF,          0xFFFFFFFF, 0xFFFFFFFF},
      };

   .. note::
      - The **VFS1** region must exist, and its size should always be larger than 128KB.
      - There are two VFS regions at most.
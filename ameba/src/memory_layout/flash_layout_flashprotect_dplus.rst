.. tab:: RTL8721Dx

   .. code-block:: c

      /**
      * @brif Flash_AVL maintains the flash IC supported by SDK.
      *	If users want to adpot new flash, add item in the following AVL.
      *	Note that, if new flash can be classfied as one of the Realtek-defined categories according to Classification SPEC,
      *	filling in the defined class index is necessary. Otherwise, FlashClassUser can be used to indicate new class.
      *	If (Status Register of flash & status_mask in Flash_AVL) != (1 << QE Bit), set (1 << QE Bit) to Status Register of flash
      */
      const FlashInfo_TypeDef Flash_AVL[] = {
         /*flash_id,		flash_id_mask,	flash_class,		status_mask,	FlashInitHandler */

         /* case1: Realtek defined class, any modification is not allowed */
         {0xEF,			0x000000FF,		FlashClass1,		0x000043FC,		NULL},	/* Winbond: MANUFACTURER_ID_WINBOND */
         {0xA1,			0x000000FF,		FlashClass1,		0x0000FFFC,		NULL}, 	/* Fudan Micro: MANUFACTURER_ID_FM */
         {0x0B,			0x000000FF,		FlashClass1,		0x000043FC,		NULL},	/* XTX */
         {0x0E,			0x000000FF,		FlashClass1,		0x000043FC,		NULL},	/* XTX(FT) */
         {0xC8,			0x000000FF,		FlashClass2,		0x000043FC,		NULL},	/* GD normal: MANUFACTURER_ID_GD */
         {0x28C2,		0x0000FFFF,		FlashClass6,		0x000200FC,		NULL},	/* MXIC wide-range VCC: MANUFACTURER_ID_MXIC */
         {0xC2,			0x000000FF,		FlashClass3,		0x000000FC,		NULL},	/* MXIC normal: MANUFACTURER_ID_BOHONG */
         {0x68,			0x000000FF,		FlashClass3,		0x000000FC,		NULL},	/* Hua Hong */
         {0x51,			0x000000FF,		FlashClass3,		0x000000FC,		NULL},	/* GD MD serial */
         {0x1C,			0x000000FF,		FlashClass4,		0x000000FC,		NULL},	/* ESMT: MANUFACTURER_ID_EON */
         {0x20,			0x000000FF,		FlashClass1,		0x000043FC,		NULL},	/* XMC: MANUFACTURER_ID_WINBOND */
         {0x85,			0x000000FF,		FlashClass1,		0x000043FC,		NULL},	/* Puya: 85-20-16 */
         {0x5E,			0x000000FF,		FlashClass1,		0x000043FC,		NULL},	/* Zbit: 5E-50-16 */
         //{0x20,			0x000000FF,		FlashClass5,		0x000000FC,		NULL},	/* Micron: MANUFACTURER_ID_MICRON */

         /* case2: new flash, ID is not included in case1 list, but specification is compatible with FlashClass1~FlashClass6 */
         //{0xXX,			0x0000XXXX,		FlashClassX,		0x0000XXXX,		NULL},

         /* case3: new flash, ID is not included in case1 list, and specification is not compatible with FlashClass1~FlashClass6 */
         {0x00,			0x000000FF,		FlashClassUser,		0xFFFFFFFF,		&flash_init_userdef},

         /* End */
         {0xFF,			0xFFFFFFFF,		FlashClassNone,		0xFFFFFFFF,		NULL},
      };
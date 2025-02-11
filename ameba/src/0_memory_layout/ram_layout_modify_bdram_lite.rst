.. tab:: RTL8726E/RTL8720E

   **BD_RAM**

   Follow the steps to modify the size of KM4 BD_RAM:

   1. Modify the running position of IMG2 in menuconfig. Any option with SRAM is acceptable.

      .. figure:: figures/modify_bd_ram_step1_lite.png
         :scale: 90%
         :align: center

   2. Modify `RAM_KM4_IMG2_SIZE` or `RAM_KR4_IMG2_SIZE` in ``{SDK}\amebalite_gcc_project\amebalite_layout.ld`` to change the end address of `KM4_BD_RAM`.

      .. code-block:: c
         :emphasize-lines: 3, 8

         /* IMG2 Size*/
         #if defined(CONFIG_AP_CORE_KM4)
         #define RAM_KR4_IMG2_SIZE			KBYTES(96)
         #define KM4_IMG2_RAM_START			(KM4_RAM_TZ_SECURE_START + RAM_KM4_IMG3_SIZE)	/* 0x20021400 ~ 0x20068000 | 0x2000D000 ~ 0x20068000*/
         #define KR4_IMG2_RAM_START			(SRAM_END - RAM_KR4_IMG2_SIZE) 					/* 0x20068000 ~ 0x20078000 | 0x20068000 ~ 0x20078000*/
         #define RAM_KM4_IMG2_SIZE			(KR4_IMG2_RAM_START - KM4_IMG2_RAM_START)
         #else
         #define RAM_KM4_IMG2_SIZE			KBYTES(96)
         #define KM4_IMG2_RAM_START			(KM4_RAM_TZ_SECURE_START + RAM_KM4_IMG3_SIZE)	/* 0x20021400 ~ 0x20039400 | 0x2000D000 ~ 0x20025000*/
         #define KR4_IMG2_RAM_START			(KM4_IMG2_RAM_START + RAM_KM4_IMG2_SIZE) 		/* 0x20039400 ~ 0x20078000 | 0x20025000 ~ 0x20078000*/
         #define RAM_KR4_IMG2_SIZE			(SRAM_END - KR4_IMG2_RAM_START)
         #endif

   2. Re-build and download the new bootloader and IMG2 OTA2 as described in Section :ref:`flash_layout_app_ota1` Step :ref:`2 <flash_layout_app_ota1_step2>` ~ :ref:`3 <flash_layout_app_ota1_step3>`.

   **BD_PSRAM**

   Follow the steps to modify the size of KM4 BD_PSRAM:

   1. Modify the running position of IMG2 in menuconfig. Any option with PSRAM is acceptable.

   2. Modify `PSRAM_KM4_IMG2_SIZE` in ``{SDK}\amebalite_gcc_project\amebalite_layout.ld`` to change the end address of `KM4_BD_PSRAM`.

      .. code-block:: c
         :emphasize-lines: 1

         #define PSRAM_KM4_IMG2_SIZE		(KBYTES(1536) - (PSRAM_TZ_NSC_SIZE + PSRAM_TZ_ENTRY_SIZE + PSRAM_KM4_IMG3_SIZE))
         #define KM4_IMG2_PSRAM_START		(KM4_PSRAM_TZ_SECURE_START + PSRAM_KM4_IMG3_SIZE)	/* 0x60010000 ~ 0x60180000 | 0x60000000 ~ 0x60180000*/
         #define KR4_IMG2_PSRAM_START		(KM4_IMG2_PSRAM_START + PSRAM_KM4_IMG2_SIZE) 	 	/* 0x60180000 ~ 0x60180000 | 0x60180000 ~ 0x60300000*/
         #define PSRAM_KR4_IMG2_SIZE		(PSRAM_DSP_START - KR4_IMG2_PSRAM_START)


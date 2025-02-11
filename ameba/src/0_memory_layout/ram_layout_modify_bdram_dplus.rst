.. tab:: RTL8721Dx

   **BD_RAM**

   Follow the steps to modify the size of KM4 BD_RAM:

   1. Users can change the KM4 BD RAM size by modifying ``RAM_KM0_IMG2_SIZE`` in ``{SDK}\amebadplus_gcc_project\amebaDplus_layout.ld`` to change the end address of ``KM4_BD_RAM``.

      .. figure:: figures/modify_sd_ram_step1_dplus.png
         :scale: 90%
         :align: center

   2. Re-build and download the new Bootloader and IMG2 OTA2 as described in Section section **APP OTA1**.

   **BD_PSRAM**

   If user wants to modify the KM4 BD PSRAM size, please modify the running position of IMG2 in menuconfig first. Any option with PSRAM is acceptable. Then modify ``PSRAM_KM4_IMG2_SIZE`` in ``{SDK}\amebadplus_gcc_project\amebaDplus_layout.ld`` to change the end address of ``KM4_BD_PSRAM``.

   .. figure:: figures/modify_sd_ram_step2_dplus.png
      :scale: 70%
      :align: center
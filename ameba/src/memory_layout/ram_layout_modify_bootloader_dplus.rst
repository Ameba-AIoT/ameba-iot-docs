.. tab:: RTL8721Dx

   If you need to enlarge the size of ``KM4_BOOT_RAM_S``, the modified ``KM4_BOOT_RAM_S`` size should be 4KB aligned because the MPC protection is protected in unit 4KB.

   Follow the steps to modify the size of bootloader:

   1. Modify the :guilabel:`CONFIG Link Option` in menuconfig to choose whether to place the bootloader (IMG1) on Flash or SRAM.

      - When SRAM is selected, the size of ``KM4_BOOTLOADER_RAM_S`` is 24K.

      - when FLASH is selected, the size of ``KM4_BOOTLOADER_RAM_S`` is 4K.

      .. figure:: figures/modify_bootloader_size_step1_dplus.png
         :scale: 90%
         :align: center

   2. Change the size of `KM4_BOOTLOADER_RAM_S` by modifying `KM4_IMG1_SIZE` in ``{SDK}\amebaxxx_gcc_project\amebaxxx_layout.ld``.

   3. Re-build the project to generate the bootloader.

   4. Modify the end address of ``km4_boot_all.bin`` if bootloader is too large, and download the new bootloader.

      .. figure:: figures/modify_bootloader_size_step4_dplus.png
         :scale: 45%
         :align: center

   After that, boot ROM will load the new bootloader if the version of new bootloader is bigger.
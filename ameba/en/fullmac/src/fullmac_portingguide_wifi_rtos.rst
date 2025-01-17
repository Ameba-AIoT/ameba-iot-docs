.. tab:: RTOS

   If use |CHIP_NAME| as SPI Fullmac Host:

   1. Execute ``./menuconfig.py`` under the path ``{SDK}/amebadplus_gcc_project``

      a. Click :menuselection:`CONFIG INIC ITNF > INIC Mode`, select :menuselection:`SPI_FULLMAC_HOST` for SPI interface.

         .. figure:: ../figures/spi_config_fullmac_host.png
            :scale: 80%
            :align: center

   2. Execute the make command to generate :file:`km4_boot_all.bin` and :file:`km0_km4_app.bin` after the build is successfully complete.

   3. Use the ImageTool to flash the bin files to |CHIP_NAME| and resst the device.

   If use other rtos IC as SPI/SDIO Fullmac Host, files showed in file tree can be used.

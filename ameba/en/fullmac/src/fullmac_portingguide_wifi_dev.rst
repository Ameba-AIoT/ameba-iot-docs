1. Execute ``./menuconfig.py`` under the path ``{SDK}/amebadplus_gcc_project``

   a. Click :menuselection:`CONFIG Link Option > IMG2(Application) running on FLASH or PSRAM?`, and select :menuselection:`PSRAM`

      .. figure:: ../figures/sdio_config_flash_or_psram.png
         :scale: 80%
         :align: center

   b. Click :menuselection:`CONFIG INIC ITNF > INIC Mode > FULLMAC`, select :menuselection:`SDIO_FULLMAC` for SDIO interface or :menuselection:`SPI_FULLMAC` for SPI interface.

      .. figure:: ../figures/wifi_sdio_spi_selection.png
         :scale: 80%
         :align: center

2. Execute the make command to generate :file:`km4_boot_all.bin` and :file:`km0_km4_app.bin` after the build is successfully complete.

3. Use the ImageTool to flash the bin files to |CHIP_NAME| and resst the device.
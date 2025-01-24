1. 在目录 ``{SDK}/amebadplus_gcc_project``中执行 ``./menuconfig.py``

   a. 找到 :menuselection:`CONFIG INIC ITNF > INIC Mode > FULLMAC_BRIDGE`, 选择需要的接口：

      .. figure:: figures/bridge_sdio_spi_selection.png
         :scale: 80%
         :align: center

2. 执行make产生 :file:`km4_boot_all.bin` 和 :file:`km0_km4_app.bin`.

3. 使用image tool下载image到Demo板。
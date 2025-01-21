.. tab:: RTOS

   如果开发者使用Ameba作为FullMAC Host MCU:

   1. 在路径``{SDK}/amebadplus_gcc_project``执行``./menuconfig.py``

      a. 找到 :menuselection:`CONFIG INIC ITNF > INIC Mode`, 选择需要的接口：

         .. figure:: ../../../src/fullmac/figures/spi_config_fullmac_host.png
            :scale: 80%
            :align: center

   2. 执行make产生 :file:`km4_boot_all.bin` 和 :file:`km0_km4_app.bin`.

   3. 使用image tool下载image到Demo板。

   如果您使用其它IC，你可以将相关文件移植到Host SD。

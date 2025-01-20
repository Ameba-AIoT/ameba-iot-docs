FullMAC简介
------------------------
在Wi-Fi FullMAC 方案中, Ameba作为网卡, 通过UART/SPI/SDIO/USB与主机MCU连接, 为主机MCU提供网络连接功能.

FullMAC架构
------------------------
FullMAC 提供如下功能:

- 提供了host和device之间基于UART/SPI/SDIO/USB的传输通路
- 支持标准的Linux wpa_supplicant 和 cfg80211 无线架构
- 传输接口除了可以用于传输WiFi/BT 相关的指令数据，还为客户提供了定制命令接口

如下图所示 ``host`` 可以是Linux/Rtos/Zephyr OS, ``device`` 是指支持FullMAC的Ameba SoC。

.. include:: ../../../en/fullmac/src/fullmac_architecture.rst

FullMAC的特点
------------------------
.. include:: ../../../en/fullmac/src/fullmac_features.rst

FullMAC传输接口
------------------------

.. tabs::

   .. include:: ../../../en/fullmac/src/fullmac_interface.rst

FullMAC文件目录
---------------

Wi-Fi
~~~~~~

.. tabs::

   .. include:: ../../../en/fullmac/src/fullmac_filetree_rtos_cn.rst

   .. include:: ../../../en/fullmac/src/fullmac_filetree_linux_cn.rst

Bluetooth
~~~~~~~~~~

.. tabs::

   .. tab:: Device驱动

   .. tab:: RTOS Host驱动

   .. tab:: Linux Host驱动

FullMAC硬件配置
----------------------

接口连接
~~~~~~~~~~~~~~~~~~~~~~

FullMAC 目前经过测试的Host有：Linux @ PC/Linux @ Raspberry Pi/RTOS @ STM32。 下表所示是Ameba 和 Raspberry Pi的pin脚连接。

.. tabs::

   .. include:: ../../../en/fullmac/src/fullmac_hostpins_raspberry_21dx11dx .rst

.. note::
   以上Ameba的SDIO pin是 SDK的默认pin脚，如果开发者使用另外的pin脚做SDIO，则需要修改SPDIO_Board_Init 中的SDIO pinmux配置。

   这个文件位于如下位置:

   ::

      component/soc/amebadplus/hal/src/spdio_api.c

   目前Host端的SDIO interrupt实现的是标准SDIO 中断模式, SDIO_DATA1必须配置为SDIO而不是GPIO。如果Host端不支持SDIO 中断，开发者可以考虑使用polling模。

SDIO转接板
~~~~~~~~~~~~~~~~~~~~~~
由于SDIO 飞线可能会导致信号传输质量差，无法使用较高的频率传输。可以购买SDIO转接板连接到Ameba的SDIO pin脚，如下图所示：

   .. This figure is located at ../../../en/wifi_bridge/figures.
      If the figure name has been changed, make sure to update sdio_fullmac.rst accordingly.

   .. figure:: ../../../en/wifi_bridge/figures/sdio_adapter_board.jpg
      :align: center
      :scale: 50%

      FullMAC SDIO 转接板

.. note::
   瑞昱的SDIO转接板也即将上线销售，当前可以先直接联系<claire_wang@realsil.com.cn>索取。

树莓派
~~~~~~~~~~~~~~~~~~~~~~
为了实现高速传输，建议将Amaba的Demo板的 SDIO pin脚直接焊接到树莓派对应的pin脚，如下图所示：

   .. figure:: ../../../en/wifi_bridge/figures/connection_with_raspberry_pi.jpg
      :align: center
      :scale: 50%

      |CHIP_NAME| connection with Raspberry Pi

FullMAC WiFi Device 驱动移植指南
--------------------------------
.. include:: ../../../en/fullmac/src/fullmac_portingguide_wifi_dev_cn.rst

FullMAC Wi-Fi Host 驱动移植指南
--------------------------------
.. tabs::

   .. include:: ../../../en/fullmac/src/fullmac_portingguide_wifi_rtos_cn.rst

   .. include:: ../../../en/fullmac/src/fullmac_portingguide_wifi_linux_cn.rst

FullMAC BT Device 驱动移植指南
---------------------------------------
.. include:: ../../../en/fullmac/src/fullmac_portingguide_bt_dev_cn.rst

FullMAC BT Host 驱动移植指南
-------------------------------
.. tabs::

   .. include:: ../../../en/fullmac/src/fullmac_portingguide_bt_linux_cn.rst

   .. include:: ../../../en/fullmac/src/fullmac_portingguide_bt_rtos_cn.rst

FullMAC WiFi 吞吐量
-------------------
.. tabs::

   .. include:: ../../../en/fullmac/src/fullmac_throughput_wifi_rtos.rst

   .. include:: ../../../en/fullmac/src/fullmac_throughput_wifi_linux.rst

   - [1] The data is the test result of device code running in PSRAM, host driver running on Dell Optiplex 3080 MT.
   - [2] The data is the test result of device code running in PSRAM, host driver running on Raspberry Pi 4.
   - [3] The data is the test result of device code running in

FullMAC 内存需求
--------------------------
Device
~~~~~~~~
.. tabs::

   .. include:: ../../../en/fullmac/src/fullmac_memsize_dev_21dx11dx.rst

Host
~~~~~~~~
.. tabs::

   .. include:: ../../../en/fullmac/src/fullmac_memsize_host_rtos.rst

   .. include:: ../../../en/fullmac/src/fullmac_memsize_host_linux.rst

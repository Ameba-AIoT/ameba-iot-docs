.. _wifi_sdio_bridge:


如下图所示, 在Wi-Fi Bridge 方案中, Ameba作为网卡, 通过UART/SPI/SDIO/USB与主机MCU连接, 为主机MCU提供网络连接功能.

主机MCU和从机都会运行TCPIP协议栈, 用户可以在主机MCU通过scoket接口开发应用程序.

与 FullMAC 方案相比：

* Wi-Fi Bridge 方案中, SoC中运行了TCPIP协议栈, 网络的保活不再依赖于主机MCU, 主机不需要再为网路保活而被频繁唤醒，可以为整体方案节省更多的电能, 特别适合用于IPcam等电池设备.

* 主机不管是Linux还是rtos，都需要使用realtek WiFi API进行WiFi的开发

.. figure:: ../src/wifi_bridge/figures/sdio_bridge_4solutions.svg
   :scale: 120%
   :align: center

.. admonition:: 更多信息

   .. hlist::
      :columns: 2

      * |finger_icon| `Wi-Fi Bridge SDK <https://github.com/Ameba-AIoT/ameba-rtos>`_
      * |finger_icon| `Wi-Fi Bridge DoC <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/en/wifi_bridge/src/index.html>`_

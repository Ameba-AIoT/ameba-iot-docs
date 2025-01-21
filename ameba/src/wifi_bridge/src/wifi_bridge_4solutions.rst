.. _wifi_sdio_bridge:

Introduction
------------------------
Connect Ameba SoC to the host as a Wi-Fi card through UART/SPI/SDIO/USB interfaces.

The following figure is the high-level block diagram for Wi-Fi bridge solution.

.. figure:: ../src/wifi_bridge/figures/sdio_bridge_4solutions.svg
   :scale: 120%
   :align: center

TCPIP stack will be both in host and device, and IP address is used to link host and device.

Compared with FullMAC solution, in Wi-Fi Bridge TCPIP have been offloaded to SoC, battery solutions like IP cammery can be used to save power consumption.

.. admonition:: More Information

   .. hlist::
      :columns: 2

      * |finger_icon| `Wi-Fi Bridge SDK <https://github.com/Ameba-AIoT/ameba-rtos>`_
      * |finger_icon| `Wi-Fi Bridge DoC <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/src/wifi_bridge/wifi_bridge_index.html>`_

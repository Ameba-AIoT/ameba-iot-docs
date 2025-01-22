.. _wifi_sdio_bridge:

Introduction
------------------------
The following figure is the high-level block diagram for SDIO bridge solution.

.. figure:: figures/wifi_bridge_architecture.svg
   :scale: 120%
   :align: center

   SDIO bridge architecture

WiFi Bridge Features
------------------------
.. include:: wifi_bridge_features.rst

WiFi Bridge Interfaces
------------------------

.. tabs::

   .. include:: wifi_bridge_interface.rst

WiFi Bridge File Architecture
--------------------------------
.. tabs::

   .. include:: wifi_bridge_filetree_rtos_cn.rst

   .. include:: wifi_bridge_filetree_linux_cn.rst

WiFi Bridge Hardware Configuration
-----------------------------------

Interface Connection
~~~~~~~~~~~~~~~~~~~~~~

Please connect Ameba SoC to host with jumper cables as mentioned below.

.. tabs::

   .. include:: wifi_bridge_hostpins_raspberry_21dx11dx.rst

.. note::
   The above pins are the default pin configuration in the firmware code. If you need to change the pin configuration on the SDIO device side, modifications must be made in the SPDIO_Board_Init function to set the actual connected pins' pinmux to SDIO. This function is located in the following file:

   ::

      component/soc/amebadplus/hal/src/spdio_api.c

   Currently, the host driver for OOB mode has not yet been developed; hence, the host side only supports SDIO interrupt mode. Consequently, the pinmux configuration for SDIO_DATA1 must be set to SDIO mode rather than GPIO mode.


SDIO adapter
~~~~~~~~~~~~~~~~~~~~~~
Ameba SoC can also convert to a standard SD card through the designed PCB board, as shown below. Some changes are nedded on Ameba demo board, please contact us about how to modify the demo board.


   .. This figure is located at figures.
      If the figure name has been changed, make sure to update sdio_fullmac.rst accordingly.

   .. figure:: figures/sdio_adapter_board.jpg
      :align: center
      :scale: 50%

      FullMAC SDIO 转接板

.. note::
   SDIO adapter will be sold online latter，currently please contact <claire_wang@realsil.com.cn> to get SDIO adapter.

Raspberry Pi
~~~~~~~~~~~~~~~~~~~~~~
The pin layout of Ameba demo board refers the pin layout of Raspberry Pi and can be directly plugged into the Raspberry Pi demo board.

   .. figure:: figures/connection_with_raspberry_pi.jpg
      :align: center
      :scale: 50%

      connection with Raspberry Pi

WiFi Bridge Device Porting Guide
--------------------------------
.. include:: fullmac_portingguide_wifi_dev.rst

WiFi Bridge Host Porting Guide
--------------------------------
.. tabs::

   .. include:: wifi_bridge_portingguide_wifi_rtos.rst

   .. include:: wifi_bridge_portingguide_wifi_linux.rst

   .. include:: wifi_bridge_portingguide_wifi_raspberry_pi.rst

WiFi Bridge Linux Test
--------------------------

.. include:: wifi_bridge_testapp_linux.rst

Throughput
--------------------
.. table::
   :width: 100%
   :widths: auto

   +--------+---------------+
   | Item   | Bandwidth 20M |
   +========+===============+
   | TCP TX | 42Mbps        |
   +--------+---------------+
   | TCP RX | 42Mbps        |
   +--------+---------------+
   | UDP TX | 53Mbps        |
   +--------+---------------+
   | UDP RX | 52Mbps        |
   +--------+---------------+


Test conditions:

- Image2 running on PSRAM

- AP: xiaomi AX3000

- Host platform: Linux PC

Memory Consumption
------------------------------------
.. table::
   :width: 100%
   :widths: auto

   +-----+----------+------------+----------------+-------------------+
   | CPU | Text (B) | Rodata (B) | DATA + BSS (B) | Heap consumed (B) |
   +=====+==========+============+================+===================+
   | KM4 | 570296   | 147510     | 41635          | 677561            |
   +-----+----------+------------+----------------+-------------------+





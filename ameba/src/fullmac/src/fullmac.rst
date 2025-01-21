.. _fullmac:

Introduction
------------------------
The FullMAC solution provides a standard wireless network interface for the host, allowing Wi-Fi and Bluetooth applications (such as wpa_supplicant, TCP/IP stack, etc.) to run smoothly on the operating system.



Architecture
------------------------
The FullMAC driver implements the following modules:

- Provide a data transmission path between the host and the device based on a private transmission protocol via the SDIO/SPI interface
- Adapt the cfg80211 layer and register the wireless network interface (wlan0/1) in the kernel to enable network data packet interaction between the Linux kernel and the |CHIP_NAME|
- Provide commonly-used and proprietary commands to configure the parameters of Wi-Fi interface

To clarify, in the following sections, the term ``host`` refers to the Linux PC/Rtos IC acting as the host, and the term ``device`` refers to the |CHIP_NAME| serving as the device.

.. include:: fullmac_architecture.rst

Features
------------------------
.. include:: fullmac_features.rst

Transport Interface
------------------------

.. tabs::

   .. include:: fullmac_interface.rst

File Tree
----------

Wi-Fi
~~~~~~

.. tabs::

   .. include:: fullmac_filetree_rtos.rst

   .. include:: fullmac_filetree_linux.rst

Bluetooth
~~~~~~~~~~

.. tabs::

   .. tab:: Device Driver

   .. tab:: RTOS Host Driver

   .. tab:: Linux Host Driver

Hardware Configuration
----------------------

Interface Connections
~~~~~~~~~~~~~~~~~~~~~~

The FullMAC can be used on Linux PC/Raspberry Pi/STM32 RTOS with different interfaces, with different pins used for FullMAC function.

.. tabs::

   .. include:: fullmac_hostpins_raspberry_21dx11dx .rst

.. note::
   The above pins of SDIO are the default pin configuration in the firmware code. If you need to change the pin configuration on the SDIO device side, modifications must be made in the SPDIO_Board_Init function to set the actual connected pins' pinmux to SDIO. This function is located in the following file:

   ::

      component/soc/amebadplus/hal/src/spdio_api.c

   Currently, the host driver for OOB mode has not yet been developed; hence, the pinmux configuration for SDIO_DATA1 must be set to SDIO mode rather than GPIO mode. Users can use polling mode if interrupt in host is not supported.

Linux PC
~~~~~~~~~~~~~~~~~~~~~~
   For the Linux PC, an SDIO host peripheral is required. Please connect to the |CHIP_NAME| with corresponding pins according to :ref:`fullmac_pins`.

   The |CHIP_NAME| can also use a gold finger adapter to convert the SDIO pins into a standard SD card, as the following figure shows, and supports the hardware platform only with an SD card slot.
   Note that in this case, you need to contact us to modify the demo board circuit.

   .. This figure is located at ../../wifi_bridge/figures.
      If the figure name has been changed, make sure to update sdio_fullmac.rst accordingly.

   .. figure:: ../../wifi_bridge/figures/sdio_adapter_board.jpg
      :align: center
      :scale: 50%

      |CHIP_NAME| SDIO adapter board

Raspberry Pi
~~~~~~~~~~~~~~~~~~~~~~
   The pin location of |CHIP_NAME| demo board corresponds to the pin location of Raspberry Pi.
   In order to run at high speed, it's strongly recommended to plug the demo board directly into Raspberry Pi, as the following figure shows.

   The pins used for SDIO FullMAC on Raspberry Pi are listed in :ref:`fullmac_pins`.

   .. figure:: ../../wifi_bridge/figures/connection_with_raspberry_pi.jpg
      :align: center
      :scale: 50%

      |CHIP_NAME| connection with Raspberry Pi

WiFi Device Driver Porting Guide
--------------------------------
.. include:: fullmac_portingguide_wifi_dev.rst

Wi-Fi Host Driver Porting Guide
--------------------------------
.. tabs::

   .. include:: fullmac_portingguide_wifi_rtos.rst

   .. include:: fullmac_portingguide_wifi_linux.rst

BT Device Driver Porting Guide
-------------------------------
.. include:: fullmac_portingguide_bt_dev.rst

BT Host Driver Porting Guide
-------------------------------
.. tabs::

   .. include:: fullmac_portingguide_bt_rtos.rst

   .. include:: fullmac_portingguide_bt_linux.rst

WiFi Throughput
----------------
.. tabs::

   .. include:: fullmac_throughput_wifi_rtos.rst

   .. include:: fullmac_throughput_wifi_linux.rst

   - [1] The data is the test result of device code running in PSRAM, host driver running on Dell Optiplex 3080 MT.
   - [2] The data is the test result of device code running in PSRAM, host driver running on Raspberry Pi 4.
   - [3] The data is the test result of device code running in

Memory Size Requirement
--------------------------
Device
~~~~~~~~
.. tabs::

   .. include:: fullmac_memsize_dev_21dx11dx.rst

Host
~~~~~~~~
.. tabs::

   .. include:: fullmac_memsize_host_rtos.rst

   .. include:: fullmac_memsize_host_linux.rst

.. _wifi_fullmac:

Introduction
------------------------
The Wi-Fi FullMAC solution provides a standard wireless network interface for the host, allowing Wi-Fi applications (such as wpa_supplicant, TCP/IP stack, etc.) to run smoothly on the operating system.

The interfaces supported by Wi-Fi FullMAC are listed below：

.. table::
   :width: 100%
   :widths: auto

   +------------+-----------------+---------------+
   | Interface  | Host (Operating system)         |
   |            +-----------------+---------------+
   |            | Linux           | FreeRTOS      |
   +============+=================+===============+
   | SDIO       | Y               | Ongoing       |
   +------------+-----------------+---------------+
   | SPI        | Y               | Y             |
   +------------+-----------------+---------------+
   | USB        | Y               | N             |
   +------------+-----------------+---------------+
   | UART       | TBD             | TBD           |
   +------------+-----------------+---------------+

The Wi-Fi FullMAC driver implements the following modules:

- Provide a data transmission path between the host and the device based on a private transmission protocol via the SDIO/SPI interface

- Adapt the cfg80211 layer and register the wireless network interface (wlan0/1) in the kernel to enable network data packet interaction between the Linux kernel and the |CHIP_NAME|

- Provide commonly-used and proprietary commands to configure the parameters of Wi-Fi interface


To clarify, in the following sections, the term ``host`` refers to the Linux PC acting as the host, and the term ``device`` refers to the |CHIP_NAME| serving as the device.

.. figure:: ../figures/wifi_fullmac_architecture.svg
   :scale: 130%
   :align: center

   Wi-Fi FullMAC architecture

Features
----------------
.. table::
   :width: 100%
   :widths: auto

   +------------+----------------------------------+-----------------------------------------------------------------------------+
   | Item       | Detail                           | Description                                                                 |
   +============+==================================+=============================================================================+
   | Wi-Fi Mode | - STA                            | - The STA mode can coexist with any of the other three modes.               |
   |            |                                  |                                                                             |
   |            | - SoftAP                         | - The SoftAP mode and NAN mode cannot coexist with P2P GO mode.             |
   |            |                                  |                                                                             |
   |            | - NAN (Linux host only)          |                                                                             |
   |            |                                  |                                                                             |
   |            | - P2P GO (Linux host only)       |                                                                             |
   +------------+----------------------------------+-----------------------------------------------------------------------------+
   | Protocal   | 802.11 b/g/n                     |                                                                             |
   +------------+----------------------------------+-----------------------------------------------------------------------------+
   | Security   | Open/WPA/WPA2/WPA3               |                                                                             |
   +------------+----------------------------------+-----------------------------------------------------------------------------+
   | Power Save | Wowlan                           | | In the suspend state, the device can wake up to send and receive packets. |
   |            |                                  | | The host will only be awakened when the device receives a packet that     |
   |            |                                  | | matches a predefined pattern, thereby achieving power saving.             |
   |            |                                  | | Some filtering conditions (patterns) can be customized as needed, for     |
   |            |                                  | | example, wakeup packet type, MAC address, IP address, or port, etc.       |
   |            +----------------------------------+-----------------------------------------------------------------------------+
   |            | Proxy Offload:                   | | The host can offload some protocols to the device.                        |
   |            |                                  | | In the suspend state, when the device receives an offloaded protocol      |
   |            | - ARP Response                   | | request, it can handle the request autonomously and send a response       | 
   |            |                                  | | without waking up the host, thereby saving power.                         |
   |            | - mDNS                           |                                                                             |
   |            |                                  |                                                                             |
   |            | - ICMP Response (TODO)           |                                                                             |
   |            |                                  |                                                                             |
   |            | - SNMP (TODO)                    |                                                                             |
   |            |                                  |                                                                             |
   |            | - LLMNR (TODO)                   |                                                                             |
   |            |                                  |                                                                             |
   |            | - SSDP/SLP/WSD/LLTD (TODO)       |                                                                             |
   +------------+----------------------------------+-----------------------------------------------------------------------------+

File Tree
----------
The Linux driver in the SDK is located at: ``{SDK}/component/wifi/cfg80211_fullmac``. The main focus should be on the files within the red boxes below.

.. figure:: ../figures/fullmac_driver_file_tree.svg
   :scale: 100%
   :align: center

   FullMAC driver file tree

Porting Guide
--------------------------
Hardware Configuration
~~~~~~~~~~~~~~~~~~~~~~~~

SDIO
^^^^^^
The SDIO FullMAC can be used on Linux PC with SDIO interface or Raspberry Pi. The following pins of |CHIP_NAME| are used for SDIO FullMAC function.

.. table:: SDIO FullMAC used pins
   :width: 100%
   :widths: auto
   :name: sdio_fullmac_pins

   +-----------------+------------------+---------------+
   ||CHIP_NAME| pin  | Raspberry Pi pin | Function      |
   +-----------------+------------------+---------------+
   | PB6             | GPIO 26          | SDIO_DAT2     |
   |                 |                  |               |
   +-----------------+------------------+---------------+
   | PB7             | GPIO 27          | SDIO_DAT3     |
   |                 |                  |               |
   +-----------------+------------------+---------------+
   | PB8             | GPIO 23          | SDIO_CMD      |
   |                 |                  |               |
   +-----------------+------------------+---------------+
   | PB9             | GPIO 22          | SDIO_CLK      |
   |                 |                  |               |
   +-----------------+------------------+---------------+
   | PB13            | GPIO 24          | SDIO_DAT0     |
   |                 |                  |               |
   +-----------------+------------------+---------------+
   | PB14            | GPIO 25          | SDIO_DAT1     |
   |                 |                  |               |
   |                 |                  |               |
   |                 |                  |               |
   +-----------------+------------------+---------------+


Linux PC
************
For the Linux PC, an SDIO host peripheral is required. Please connect to |CHIP_NAME| with the corresponding pins according to :ref:`sdio_fullmac_pins`.


The |CHIP_NAME| can also use a gold finger adapter to convert the SDIO pins into a standard SD card, as the following figure shows, and supports the hardware platform only with an SD card slot.
Note that in this case, you need to contact us to modify the demo board circuit.

.. This figure is located at ../../wifi_bridge/figures.
   If the figure name has been changed, make sure to update sdio_fullmac.rst accordingly.
.. figure:: ../../wifi_bridge/figures/sdio_adapter_board.jpg
   :align: center
   :scale: 50%

   |CHIP_NAME| SDIO adapter board

Raspberry Pi
*************
The pin location of |CHIP_NAME| demo board corresponds to the pin location of Raspberry Pi.
In order to run at high speed, it's strongly recommended to plug the demo board directly into Raspberry Pi, as the following figure shows.

The pins used for SDIO FullMAC on Raspberry Pi are listed in :ref:`sdio_fullmac_pins`.

.. figure:: ../../wifi_bridge/figures/connection_with_raspberry_pi.jpg
   :align: center
   :scale: 50%

   |CHIP_NAME| connection with Raspberry Pi

SPI
^^^^^^
The SPI FullMAC can be used on on platforms with SPI interface, such as Raspberry Pi. The following pins of |CHIP_NAME| and Raspberry Pi are used for SPI FullMAC function.

.. table:: SPI FullMAC used pins
   :width: 100%
   :widths: auto

   +-----------------+------------------+---------------+-----------------------------------------------------------------+
   ||CHIP_NAME| pin  | Raspberry Pi pin | Function      | Description                                                     |
   +-----------------+------------------+---------------+-----------------------------------------------------------------+
   | PB24            | GPIO 10          | SPI_MOSI      | SPI pins                                                        |
   |                 |                  |               |                                                                 |
   +-----------------+------------------+---------------+                                                                 |
   | PB25            | GPIO 9           | SPI_MISO      |                                                                 |
   |                 |                  |               |                                                                 |
   +-----------------+------------------+---------------+                                                                 |
   | PB23            | GPIO 11          | SPI_CLK       |                                                                 |
   |                 |                  |               |                                                                 |
   +-----------------+------------------+---------------+                                                                 |
   | PB26            | GPIO 8           | SPI_CS        |                                                                 |
   |                 |                  |               |                                                                 |
   +-----------------+------------------+---------------+-----------------------------------------------------------------+
   | PB8             | GPIO 23          | DEV_TX_REQ    | | An output pin for |CHIP_NAME|, used to indicate               |
   |                 |                  |               | | to host that it has a data packet to send with a rising edge. |
   +-----------------+------------------+---------------+-----------------------------------------------------------------+
   | PB9             | GPIO 22          | DEV_READY     | | An output pin for |CHIP_NAME|, used to indicate its readiness |
   |                 |                  |               | | for SPI transcation to host.                                  |
   |                 |                  |               |                                                                 |   
   |                 |                  |               | - 1: Device is ready.                                           |
   |                 |                  |               | - 0: Device is busy.                                            |
   +-----------------+------------------+---------------+-----------------------------------------------------------------+
   


Software Configuration
~~~~~~~~~~~~~~~~~~~~~~~
Device Driver
^^^^^^^^^^^^^^^^^^^^^^^^^^
1. Execute ``./menuconfig.py`` under the path ``{SDK}/amebadplus_gcc_project``

   a. Click :menuselection:`CONFIG Link Option > IMG2(Application) running on FLASH or PSRAM?`, and select :menuselection:`PSRAM`

      .. figure:: ../figures/sdio_config_flash_or_psram.png
         :scale: 80%
         :align: center

   b. Click :menuselection:`CONFIG INIC ITNF > INIC Mode`, select :menuselection:`SDIO_FULLMAC` for SDIO interface or :menuselection:`SPI_FULLMAC` for SPI interface.

      .. figure:: ../figures/wifi_sdio_spi_selection.png
         :scale: 100%
         :align: center


2. Execute the make command to generate :file:`km4_boot_all.bin` and :file:`km0_km4_app.bin` after the build is successfully complete.

3. Use the Image Tool to flash the bin files to |CHIP_NAME| and restart the device.

Host Driver
^^^^^^^^^^^^^^^^^^^^^^
The FullMAC driver has been tested and verified to work on Linux kernel versions 5.4 and 5.10. If you encounter any compilation errors on other kernel versions, please contact us.


1. Prerequisites: install the following software packages on Linux system.

   .. code-block:: sh

      sudo apt-get install build-essential
      sudo apt install dhcpcd
      sudo apt install hostapd
      sudo apt install dhcpd

2. Enable the SDIO or SPI function.

   - For Linux PC, skip this step.
  
   - For Raspberry Pi:

     - SDIO: Use ``dtoverlay`` command to configure SDIO. For the Raspberry Pi 4, type the following command:
       
       .. code-block:: sh
  
          sudo dtoverlay sdio poll_once=off
  
     - SPI: 
  
       i. Enable SPI peripheral
  
          .. code-block:: sh
  
             sudo raspi-config
  
       ii. Select :menuselection:`Interface Options > SPI > Yes`
  
          .. figure:: ../figures/raspberry_pi_spi_config.png
             :scale: 100%
             :align: center
       
       iii. Generate and apply Device Tree Overlay
  
          .. code-block:: sh
  
             sudo su
             cd {driver_path}/cfg80211_fullmac/rtl8730e/spi
             dtc -@ -Hepapr -I dts -O dtb -o inic_spidev.dtbo spidev-overlay.dts
             cp inic_spidev.dtbo /boot/overlays/
             dtoverlay inic_spidev

3. Build the module

   a. In the path ``/component/wifi/cfg80211_fullmac``, execute the following script with an interface parameter to configure host driver.

      - SDIO:

        .. code-block::

           ./fullmac_setup.sh sdio

      - SPI:

        .. code-block::

           ./fullmac_setup.sh spi

   b. Copy the folder of ``cfg80211_fullmac`` to the Linux system.

   c. Open the terminal and execute the following command:

      .. code-block::

         cd {driver_path}/cfg80211_fullmac;make 

.. _load_the_module_step_4:

4. Load the module.

   - SDIO: :file:`fullmac_sdio.ko` is generated in ``/cfg80211_fullmac/sdio``.

     .. code-block:: sh

        sudo su
        cp sdio/fullmac_sdio.ko /lib/modules/XXX/
        depmod
        modprobe fullmac_sdio


   - SPI: :file:`fullmac_spi.ko` is generated in ``/cfg80211_fullmac/spi``.
 
     .. code-block::

        sudo su
        cp spi/fullmac_spi.ko /lib/modules/XXX/
        depmod
        modprobe fullmac_spi

   When loading module is successful, use ``ifconfig`` command to get the information of net device.
   The net device whose MAC address starts with ``00:e0:4c`` is STA, and the net device whose MAC address starts with ``00:e1:4c is`` softAP.
   
   The following is an example, in which **wlan1** is STA and **wlan2** is softAP.

   .. figure:: ../figures/ifconfig_sta_softap.png
      :scale: 100%
      :align: center   

5. Connect to STA.

   a. Create :file:`wpa_supplicant.conf` under the path ``/etc/wpa_supplicant/`` and add AP information.
   
      There is an example configuration for WPA2.

      .. code-block::

         ctrl_interface=/var/run/wpa_supplicant
         network={
                  ssid="HUAWEI-JX2UX5_HiLink_5G"
                  psk="12345678"
         }

   b. Connect with the following command:

      .. code-block::

         Wpa_supplicant -D nl80211 -i wlanX -c /etc/wpa_supplicant/wpa_supplicant.conf -dd > /var/wifi_log

   c. Obtain the IP address with the following command:

      .. code-block::

         dhcpcd wlanX
      
   .. note::

      - The *wlanX* in the above command refers to the name of STA obtained from :ref:`Step 4 <load_the_module_step_4>`.

      - The configuration files of OPEN and WPA3 are different, please refer to the official supplicant documentation for details.

      - For Ubuntu system, if you want to manually connect using command ``wpa_supplicant`` and obtain an IP address, first stop NetworkManager and DHCP service to avoid the influence of NetworkManager on *wpa_supplicant*.

        .. code-block:: sh

           sudo su
           systemctl stop NetworkManager
           systemctl disable NetworkManager
           systemctl stop dhcpcd.service


6. Setup the softAP.

   a. Create :file:`hostapd.conf` under the path ``/etc/hostapd/`` and add the configuration information.

      Take WPA2 as an example, you can add the following information:
   
      .. code-block::

         driver=nl80211

         logger_syslog=-1
         logger_syslog_level=2
         logger_stdout=-1
         logger_stdout_level=2

         ctrl_interface=/var/run/hostapd

         hw_mode=g
         channel=6
         ssid=aaa_test
         beacon_int=100
         dtim_period=1
         max_num_sta=8
         rts_threshold=2347
         fragm_threshold=2346

         ieee80211n=1

         erp_send_reauth_start=1

         wpa=2
         wpa_key_mgmt=WPA-PSK
         wpa_pairwise=CCMP
         wpa_passphrase=12345678

      .. note::

         This configuration file is applicable for WPA2 softAP.
         If you want to use OPEN or WPA3, please refer to the official hostapd documentation to set the parameters.

   b. Create :file:`udhcpd_wlanX.conf` under the path ``/etc/`` and add the following information:

      .. code-block::

         # The start and end of the IP lease block
         start		192.168.43.20
         end		192.168.43.254

         # The interface that udhcpd will use
         interface	wlanX

         opt	dns	192.168.43.1 129.219.13.81
         option	subnet	255.255.255.0
         opt	router	192.168.43.1
         option	domain	local
         option	lease	864000		# default: 10 days
         option	msstaticroutes	10.0.0.0/8 10.127.0.1		# single static route
         option	staticroutes	10.0.0.0/8 10.127.0.1, 10.11.12.0/24 10.11.12.1
         option	0x08	01020304	# option 8: "cookie server IP addr: 1.2.3.4"


   c. Start the softAP.

      .. code-block::

         hostapd /etc/hostapd/hostapd.conf -i wlanX

   d. Set the IP address.

      .. code-block::

         ifconfig wlanX 192.168.43.1

   e. Start the DHCP server.

      .. code-block::

         udhcpd -f /etc/udhcpd_wlanX.conf         

   .. note::

      The *wlanX* in the above command refers to the name of softAP obtained from :ref:`Step 4 <load_the_module_step_4>`.


Throughput
--------------------

.. table::
   :width: 100%
   :widths: auto

   +----------------+-----------------------+--------+---------------+---------------+
   | Interface      | Wi-Fi driver location | Item   | BW 20M (Mbps) | BW 40M (Mbps) |
   +================+=======================+========+===============+===============+
   | SDIO :sup:`[1]`| KM0                   | TCP RX | 36            | 42            |
   |                |                       +--------+---------------+---------------+
   |                |                       | TCP TX | 46            | 54            |
   |                |                       +--------+---------------+---------------+
   |                |                       | UDP RX | 50            | 60            |
   |                |                       +--------+---------------+---------------+
   |                |                       | UDP TX | 55            | 62            |
   |                +-----------------------+--------+---------------+---------------+
   |                | KM4 (331MHz)          | TCP RX | 41            | 58            |
   |                |                       +--------+---------------+---------------+
   |                |                       | TCP TX | 46            | 80            |
   |                |                       +--------+---------------+---------------+
   |                |                       | UDP RX | 53            | 74            |
   |                |                       +--------+---------------+---------------+
   |                |                       | UDP TX | 53            | 90            |
   +----------------+-----------------------+--------+---------------+---------------+
   | SPI :sup:`[2]` | KM0                   | TCP RX | 14.5          |               |
   |                |                       +--------+---------------+---------------+
   |                |                       | TCP TX | 16            |               |
   |                |                       +--------+---------------+---------------+
   |                |                       | UDP RX | 17.4          |               |
   |                |                       +--------+---------------+---------------+
   |                |                       | UDP TX | 17.8          |               |
   +----------------+-----------------------+--------+---------------+---------------+

.. note::

   - [1] The data is the test result of device code running in PSRAM, host driver running on Dell Optiplex 3080 MT.
   
   - [2] The data is the test result of device code running in PSRAM, host driver running on Raspberry Pi 4.


Memory Size Requirement
----------------------------------------------
Device
~~~~~~~~~~~~
Take the Wi-Fi driver running on KM0 for an example:

.. table::
   :width: 100%
   :widths: auto

   +----------+-------+--------+
   | Item     | KM0   | KM4    |
   +==========+=======+========+
   | txt      | 270KB | 31KB   |
   +----------+-------+--------+
   | rodata   | 51KB  | 9KB    |
   +----------+-------+--------+
   | data+bss | 17KB  | 4KB    |
   +----------+-------+--------+
   | heap     | ~68KB | ~2.5KB |
   +----------+-------+--------+

Host
~~~~~~~~

.. table::
   :width: 100%
   :widths: auto

   +------------+------+-----------------+
   | Host       | Item | fullmac_xxx.ko  |
   +============+======+=================+
   | SDIO       | txt  | 88KB            |
   |            +------+-----------------+
   |            | data | 65KB            |
   |            +------+-----------------+
   |            | bss  | 18KB            |
   +------------+------+-----------------+
   | SPI        | txt  | 73KB            |
   |            +------+-----------------+
   |            | data | 54KB            |
   |            +------+-----------------+
   |            | bss  | 18KB            |
   +------------+------+-----------------+

.. note:: The characters before .ko are ``sdio`` or ``spi``, corresponding to different hosts.
.. _wifi_sdio_bridge:

Introduction
------------------------
The following figure is the high-level block diagram for SDIO bridge solution.

.. figure:: ../figures/sdio_bridge_architecture.svg
   :scale: 120%
   :align: center

   SDIO bridge architecture

The interfaces supported by Wi-Fi bridge mode are listed below：

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
   | SPI        | TBD             | TBD           |
   +------------+-----------------+---------------+
   | USB        | TBD             | N             |
   +------------+-----------------+---------------+
   | UART       | TBD             | TBD           |
   +------------+-----------------+---------------+

In this solution, host runs on Linux with an Ethernet interface, Ameba acts as an intermedium role to send data between host and AP.
The topology of this solution is shown in Figure :ref:`Data flow <sdio_data_flow>`. Ameba connects to AP and gets an IP address by DHCP protocol from AP.
Ameba and host use SDIO interface to communicate with each other and they share the same IP address, which is obtained by Ameba.

When the host needs transmit packets, these packets will be send to Ameba by SDIO interface with Ethernet format.
Ameba will receive these packets from SDIO and forward them to AP by Wi-Fi.
Meanwhile, if Ameba receives packets from AP, it will decide the destination of these packets by protocol type or TCP/UDP source port, then forward to host by SDIO or to Upper layer application on Ameba.

By default, the forward rules of packets from AP are DHCP, and TCP/UDP with specific source port numbers will be sent to Ameba TCP/IP stack, and other IP packets will directly send to host through SDIO.
ARP request packet will sent to both Ameba TCP/IP stack and to host.

Usually, the host will create a TCP/UDP connection with Internet Cloud Service, and send heartbeat packets periodically to keep this connection alive.
If the host needs to enter power-saving mode and still keep connection with Cloud Service, they can create another same TCP/UDP connection on Ameba upper layer application.
The IP address and destination port are the same, the only difference is source port.

.. figure:: ../figures/sdio_data_flow.svg
   :scale: 90%
   :align: center
   :name: sdio_data_flow

   Data flow

Features
----------------
.. table::
   :width: 100%
   :widths: auto

   +--------------------------+------------------------------------------------------------------------------------------+
   | Features                 | Description                                                                              |
   +==========================+==========================================================================================+
   | Wireless mode            | - 802.11 b                                                                               |
   |                          |                                                                                          |
   |                          | - 802.11 g                                                                               |
   |                          |                                                                                          |
   |                          | - 802.11 n                                                                               |
   |                          |                                                                                          |
   |                          | - 802.11 a                                                                               |
   +--------------------------+------------------------------------------------------------------------------------------+
   | Wi-Fi Security Protocols | - Open                                                                                   |
   |                          |                                                                                          |
   |                          | - WPA                                                                                    |
   |                          |                                                                                          |
   |                          | - WPA2                                                                                   |
   |                          |                                                                                          |
   |                          | - WPA3                                                                                   |
   +--------------------------+------------------------------------------------------------------------------------------+
   | Wi-Fi operation Mode     | - STA                                                                                    |
   |                          |                                                                                          |
   |                          | - SoftAP (operated at device side only)                                                  |
   +--------------------------+------------------------------------------------------------------------------------------+
   | Protocol offload         | When host suspend, it can offload processing of packets for certain protocols to device. |
   |                          |                                                                                          |
   |                          | The following protocols are supported:                                                   |
   |                          |                                                                                          |
   |                          | - ARP                                                                                    |
   |                          |                                                                                          |
   |                          | - DHCP                                                                                   |
   |                          |                                                                                          |
   |                          | - ICMP                                                                                   |
   |                          |                                                                                          |
   |                          | - TCP keep alive                                                                         |
   |                          |                                                                                          |
   |                          | - GTK update                                                                             |
   +--------------------------+------------------------------------------------------------------------------------------+

File Architecture
--------------------------------
The following figure shows the SDIO bridge related files which run at host.

::

   wifi\cfg80211_fullmac -- >
 	  wifi\cfg80211_fullmac -- >
		   wifi\cfg80211_fullmac\rtw_drv_probe.c
		   wifi\cfg80211_fullmac\rtw_ethtool_ops.c
		   wifi\cfg80211_fullmac\rtw_netdev_ops.c
		   wifi\cfg80211_fullmac\rtw_proc.c
		   wifi\cfg80211_fullmac\sdio -- >
		   	wifi\cfg80211_fullmac\sdio\rtw_llhw_event.c
		   	wifi\cfg80211_fullmac\sdio\rtw_llhw_event.h
		   	wifi\cfg80211_fullmac\sdio\rtw_llhw_hci.c
		   	wifi\cfg80211_fullmac\sdio\rtw_llhw_hci.h
		   	wifi\cfg80211_fullmac\sdio\rtw_llhw_memory.c
		   	wifi\cfg80211_fullmac\sdio\rtw_llhw_ops.c
		   	wifi\cfg80211_fullmac\sdio\rtw_llhw_ops.h
		   	wifi\cfg80211_fullmac\sdio\rtw_llhw_recv.c
		   	wifi\cfg80211_fullmac\sdio\rtw_llhw_trx.h
		   	wifi\cfg80211_fullmac\sdio\rtw_llhw_xmit.c
		   	wifi\cfg80211_fullmac\sdio\rtw_sdio_drvio.c
		   	wifi\cfg80211_fullmac\sdio\rtw_sdio_drvio.h
		   	wifi\cfg80211_fullmac\sdio\rtw_sdio_ops.c
		   	wifi\cfg80211_fullmac\sdio\rtw_sdio_ops.h
		   	wifi\cfg80211_fullmac\sdio\rtw_sdio_probe.c
		   	wifi\cfg80211_fullmac\sdio\rtw_sdio_reg.h
		   wifi\cfg80211_fullmac\sdio_bridge -- >
		   	wifi\cfg80211_fullmac\sdio_bridge\rtw_sdio_bridge_netlink.h
		   	wifi\cfg80211_fullmac\sdio_bridge\rtw_sdio_bridge.c
		   	wifi\cfg80211_fullmac\sdio_bridge\bridge_api -- >
		   		wifi\cfg80211_fullmac\sdio_bridge\bridge_api\rtw_sdio_bridge_api.h
		   		wifi\cfg80211_fullmac\sdio_bridge\bridge_api\rtw_sdio_bridge_api.c

Porting Guide
----------------
Hardware Configuration
~~~~~~~~~~~~~~~~~~~~~~~
Please connect |CHIP_NAME| to host with jumper cables as mentioned below.


.. table::
   :width: 100%
   :widths: auto

   +----------+------------+
   | Pin name | Function   |
   +==========+============+
   | PB_6     | SDIO_DATA2 |
   +----------+------------+
   | PB_7     | SDIO_DATA3 |
   +----------+------------+
   | PB_8     | SDIO_CMD   |
   +----------+------------+
   | PB_9     | SDIO_CLK   |
   +----------+------------+
   | PB_13    | SDIO_DATA0 |
   +----------+------------+
   | PB_14    | SDIO_DATA1 |
   +----------+------------+


The |CHIP_NAME| can also convert to a standard SD card through the designed PCB board, as shown below. Some changes are nedded on |CHIP_NAME| demo board, please contact us about how to modify the demo board.

.. This figure is also referred in wifi_fullmac.rst, it is not allowed to change the figure name unless necessary.
   If the figure name must be changed, make sure to update wifi_fullmac.rst accordingly.
.. figure:: ../figures/sdio_adapter_board.jpg
   :scale: 50%
   :align: center

   |CHIP_NAME| SDIO adapter board

The pin layout of |CHIP_NAME| demo board refers the pin layout of Raspberry Pi and can be directly plugged into the Raspberry Pi demo board.

.. This figure is also referred in wifi_fullmac.rst, it is not allowed to change the figure name unless necessary.
   If the figure name must be changed, make sure to update wifi_fullmac.rst accordingly.
.. figure:: ../figures/connection_with_raspberry_pi.jpg
   :scale: 50%
   :align: center

   |CHIP_NAME| connection with Raspberry Pi

.. _bridge_software_configuration:

Software Configuration
~~~~~~~~~~~~~~~~~~~~~~~
Software Configuration at Linux Platform
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. _sdio_linux_pc:

Linux PC
****************
Host driver has been tested and verified to work on Linux kernel version v5.4. If you encounter any compilation errors on other kernel versions, please contact us.

1. Install build-essential

   .. code-block:: C

      $sudo apt-get install build-essential

2. Enter ``{SDK}/component/wifi/cfg80211_fullmac``, and execute the following command

   .. code-block:: C

      ./fullmac_setup.sh sdiobridge

3. Enter ``{SDK}/component/wifi/cfg80211_fullmac``, and execute the following command to choose target device ic

   .. code-block:: C

      make menuconfig

4. Copy ``cfg80211_fullmac`` folder to host side

5. Build and install host driver as below

   .. code-block:: C

      $cd {driver_path}/cfg80211_fullmac
      $make
      $sudo systemctl stop dhcpcd.service
      $sudo insmod sdio_bridge/bridge_sdio.ko

   ``{driver_path}`` is the path where you put the ``cfg80211_fullmac`` folder.

After these steps, there will be an interface named ``eth_sta0``, which can be found by command ``ifconfig``.

Raspberry Pi
************************
Host driver has been tested on Raspberry Pi 4.


You can use ``dtoverlay`` command to configure SDIO on Raspberry Pi, please input the following command in Raspberry Pi:

   .. code-block:: C

      dtoverlay sdio poll_once=off

The subsequent steps are the same as descripted in Section :ref:`sdio_linux_pc`.

Software Configuration at |CHIP_NAME|
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
In order to build SDIO bridge image, choose :guilabel:`SDIO_BRIDGE` in menuconfig according to the following steps:

1. Enter menuconfig and select :guilabel:`CONFIG INIC INTF`

   .. figure:: ../figures/bridge_config_inic_intf.png
      :scale: 40%
      :align: center

2. In INIC-INTF menu, select :guilabel:`INIC MODE`

   .. figure:: ../figures/bridge_inic_mode.png
      :scale: 40%
      :align: center

3. In INIC Mode menu, select :guilabel:`SDIO_BRIDGE`

   .. figure:: ../figures/bridge_sdio_bridge.png
      :scale: 50%
      :align: center

testapp Guide
--------------------------
testapp Architecture
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The testapp wraps some Wi-Fi commands, such as Wi-Fi connect, Wi-Fi scan, which can be used to control Ameba from host side.


The testapp uses netlink to communicate with SDIO host driver. When SDIO host driver receives related commands, the testapp will inform SDIO device to perform corresponding operation by SDIO interface. The control flow is illustrated below.

.. figure:: ../figures/bridge_testapp_control_flow.svg
   :scale: 90%
   :align: center

   testapp control flow

.. _bridge_supported_commands:

Supported Commands
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The supported commands are listed below.

.. table::
   :width: 100%
   :widths: auto

   +----------------------------+----------------------------------------------------------------------------------------------+
   | Command                    | Description                                                                                  |
   +============================+==============================================================================================+
   | wifi_connect param1 param2 | Used to connect to AP.                                                                       |
   |                            |                                                                                              |
   |                            | :param1: SSID                                                                                |
   |                            |                                                                                              |
   |                            | :param2: password                                                                            |
   |                            |                                                                                              |
   |                            | *param2* can be absent when connect to AP which security type is open.                       |
   |                            |                                                                                              |
   |                            | The IP address will also be obtained and configured after successfully connected to AP.      |
   +----------------------------+----------------------------------------------------------------------------------------------+
   | disconnect                 | Disconnect to AP                                                                             |
   +----------------------------+----------------------------------------------------------------------------------------------+
   | scan                       | Trigger scan                                                                                 |
   +----------------------------+----------------------------------------------------------------------------------------------+
   | scanres                    | Get and print scan result                                                                    |
   +----------------------------+----------------------------------------------------------------------------------------------+

.. _bridge_command_usage:

Command Usage
~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Copy ``sdio_bridge/bridge_api`` folder to host

2. Compile and execute as below, then you can input test commands listed in Section :ref:`bridge_supported_commands` to test

   .. code-block:: C

      $cd sdio_bridge/bridge_api/testapp
      $make
      $sudo ./bridge

   For example, ``./bridge wifi_connect xiaomi_esther 12345678`` means connect to an AP whose SSID is ``xiaomi_esther`` and password is ``12345678``, as shown in Figure :ref:`testapp control flow <bridge_testapp_control_flow>`.
   
   After Wi-Fi connect command executed, the ``eth_sta0`` interface can be shown by command ``ifconfig``, the IP address will also be configured automatically, and this IP address will be the same IP address in |CHIP_NAME|, as shown in Figure :ref:`ifconfig result <bridge_ifconfig_result>`.

   .. figure:: ../figures/bridge_testapp_control_flow.png
      :scale: 60%
      :align: center
      :name: bridge_testapp_control_flow

      testapp control flow

   .. figure:: ../figures/bridge_ifconfig_result.png
      :scale: 60%
      :align: center
      :name: bridge_ifconfig_result

      ifconfig result

Operation Flow
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The following is a simple operation flow. After configuration as below, data communication can be started.


After make and install host driver as mentioned in Section :ref:`bridge_software_configuration`, and successfully make testapp as mentioned in Section :ref:`bridge_command_usage`, enter ``sdio_bridge/testapp folder``.

1. Input ``sudo ./bridge`` to start.

2. Input ``scan`` command to trigger scan.

3. Input ``scanres`` command to get and print scan result

4. Input ``wifi_connect target_ssid password`` command to connect your target AP, ``target_ssid`` and ``password`` in this command will be your target AP's SSID and password.

5. After successfully connected, use the standard ``ifconfig`` to check the interface, and the IP address will be already configured.

After these steps, data path can be started, you can use the standard ``ping`` command or ``iperf`` command to test the data path.

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





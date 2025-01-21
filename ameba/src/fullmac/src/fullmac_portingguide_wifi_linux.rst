.. tab:: Linux

   The FullMAC driver has been tested and verified to work on Linux kernel versions 5.4 and 5.10.
   If you encounter any compilation errors on other kernel versions, please contact us.

   .. note::
      The SPI operates using DMA, and the data for the SPI device is stored in RAM. When the nCS pin is asserted low, DMA transfers the data from RAM to the bus. Under normal conditions, this data transfer occurs without issues. However, if the bus is busy, a delay can occur during the data transfer, leading to potential problems. Our developer identified and tested this issue, determining that a delay of 7 microseconds provides sufficient time to ensure safe data transfer to the bus, even when it is busy. In some older versions of the Linux kernel, the SPI driver does not support the struct spi_delay, which prevents setting the delay between nCS and the clock signal through the interface. As a result, it may be necessary to modify the driver code directly to achieve the desired delay configuration.

   .. admonition:: Prerequisites

      Install the following software packages on Linux system first.

      .. code-block:: sh

         sudo apt-get install build-essential
         sudo apt install dhcpcd
         sudo apt install hostapd
         sudo apt install dhcpd

   1. Enable the SDIO, SPI, or USB function.

      - For Linux PC, skip this step.

      - For Raspberry Pi:

      .. tabs::

         .. tab:: SDIO

            Use ``dtoverlay`` command to configure SDIO.

            For Raspberry Pi 4, type the following command:

            .. code-block:: sh

               sudo dtoverlay sdio poll_once=off

         .. tab:: SPI

            i. Enable the SPI peripheral.

               .. code-block:: sh

                  sudo raspi-config

            ii. Select :menuselection:`Interface Options > SPI > Yes`

               .. figure:: ../../../src/fullmac/figures/raspberry_pi_spi_config.png
                  :scale: 100%
                  :align: center

            iii. Generate and apply Device Tree Overlay

               .. code-block:: sh

                  sudo su
                  cd {driver_path}/cfg80211_fullmac/rtl8730e/spi
                  dtc -@ -Hepapr -I dts -O dtb -o inic_spidev.dtbo spidev-overlay.dts
                  cp inic_spidev.dtbo /boot/overlays/
                  dtoverlay inic_spidev

         .. tab:: USB

   2. Build the module.

      a. In the path ``/component/wifi/cfg80211_fullmac``, execute the following script with an interface parameter to configure the host driver.

      .. tabs::

         .. tab:: SDIO

            .. code-block::

               ./fullmac_setup.sh sdio

         .. tab:: SPI

            .. code-block::

               ./fullmac_setup.sh spi

         .. tab:: USB

            .. code-block::

               ./fullmac_setup.sh usb

      b. Copy the folder of ``cfg80211_fullmac`` to the Linux system.

      c. Open the terminal and execute the following command:

         .. code-block::

            cd {driver_path}/cfg80211_fullmac;make

   .. _load_the_module_step:

   3. Load the module.

      .. tabs::

         .. tab:: SDIO

            :file:`fullmac_sdio.ko` is generated in ``/cfg80211_fullmac/sdio``.

            .. code-block:: sh

               sudo su
               cp sdio/fullmac_sdio.ko /lib/modules/XXX/
               depmod
               modprobe fullmac_sdio

         .. tab:: SPI

            :file:`fullmac_spi.ko` is generated in ``/cfg80211_fullmac/spi``.

            .. code-block::

               sudo su
               cp spi/fullmac_spi.ko /lib/modules/XXX/
               depmod
               modprobe fullmac_spi

         .. tab:: USB

            :file:`fullmac_spi.ko` is generated in ``/cfg80211_fullmac/usb``.

            .. code-block::

               sudo su
               cp usb/fullmac_spi.ko /lib/modules/XXX/
               depmod
               modprobe fullmac_usb

      When loading module is successful, use ``ifconfig`` command to get the information of net device.
      The net device whose MAC address starts with ``00:e0:4c`` is STA, and the net device whose MAC address starts with ``00:e1:4c is`` softAP.

      The following is an example, in which **wlan1** is STA and **wlan2** is softAP.

      .. figure:: ../../../src/fullmac/figures/ifconfig_sta_softap.png
         :scale: 100%
         :align: center   

   4. Connect to STA.

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
         - The *wlanX* in the above command refers to the name of STA obtained from :ref:`Step 3 <load_the_module_step>`.
         - The configuration files of OPEN and WPA3 are different, please refer to the official supplicant documentation for details.
         - For Ubuntu system, if you want to manually connect using command ``wpa_supplicant`` and obtain an IP address, first stop NetworkManager and DHCP service to avoid the influence of NetworkManager on *wpa_supplicant*.

         .. code-block:: sh

            sudo su
            systemctl stop NetworkManager
            systemctl disable NetworkManager
            systemctl stop dhcpcd.service

   5. Setup the softAP.

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
         The *wlanX* in the above command refers to the name of softAP obtained from :ref:`Step 3 <load_the_module_step>`.

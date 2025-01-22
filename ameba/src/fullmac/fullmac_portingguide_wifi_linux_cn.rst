.. tab:: Linux

   FullMAC 当前基于Linux 内核 5.4 和 5.10进行测试和验证，如果您再其它内核遇到编译问题，请联系<claire_wang@realsil.com.cn>。

   .. note::
      SPI会在CS pin拉low并检测到CLK后，立刻进行数据传输。在bus busy的时候可能会存在一些corner case
      经过测试和分析，在CS拉low和host推clk之间加入7us的delay可以在bus busy的情况下保证安全的数据传输。
      但是，在一些旧版本的系统上，spi driver可能不支持spi_delay，这样就需要直接去修改driver code来保证这段delay时间。

   .. admonition:: 准备工作

      在Linux系统安装如下软件：

      .. code-block:: sh

         sudo apt-get install build-essential
         sudo apt install dhcpcd
         sudo apt install hostapd
         sudo apt install dhcpd

   1. 使能传输接口

      - 对于Linux PC, 跳过此步。

      - 对于Raspberry Pi:

      .. tabs::

         .. tab:: SDIO

            使用 ``dtoverlay`` 指令配置 SDIO。

            对于 Raspberry Pi 4, 输入如下指令:

            .. code-block:: sh

               sudo dtoverlay sdio poll_once=off

         .. tab:: SPI

            i. 使能 SPI：

               .. code-block:: sh

                  sudo raspi-config

            ii. 选择 :menuselection:`Interface Options > SPI > Yes`：

               .. figure:: figures/raspberry_pi_spi_config.png
                  :scale: 100%
                  :align: center

            iii. 生成Device Tree：

               .. code-block:: sh

                  sudo su
                  cd {driver_path}/cfg80211_fullmac/rtl8730e/spi
                  dtc -@ -Hepapr -I dts -O dtb -o inic_spidev.dtbo spidev-overlay.dts
                  cp inic_spidev.dtbo /boot/overlays/
                  dtoverlay inic_spidev

         .. tab:: USB

   2. Build the module

      a. 在目录 ``/component/wifi/cfg80211_fullmac``下面执行如下操作：

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

      b. 将``cfg80211_fullmac`` copy到 Linux 内核。

      c. 打开终端执行如下操作:

         .. code-block::

            cd {driver_path}/cfg80211_fullmac;make

   .. _load_the_module_step:

   3. 加载FullMAC Host 驱动：

      .. tabs::

         .. tab:: SDIO

            :.ko文件 ``/cfg80211_fullmac/sdio/fullmac_sdio.ko``

            .. code-block:: sh

               sudo su
               cp sdio/fullmac_sdio.ko /lib/modules/XXX/
               depmod
               modprobe fullmac_sdio

         .. tab:: SPI

            :.ko文件 ``/cfg80211_fullmac/spi/fullmac_spi.ko``

            .. code-block::

               sudo su
               cp spi/fullmac_spi.ko /lib/modules/XXX/
               depmod
               modprobe fullmac_spi

         .. tab:: USB

            :.ko文件 ``/cfg80211_fullmac/usb/fullmac_usb.ko``

            .. code-block::

               sudo su
               cp usb/fullmac_spi.ko /lib/modules/XXX/
               depmod
               modprobe fullmac_usb

      ko文件加载成功之后, 使用 ``ifconfig`` 命令可以获取到WiFi网络设备的相关信息。
      如下图所示，MAC地址为``00:e0:4c``的是Station模式, MAC地址为 ``00:e1:4c is`` 的是softAP模式。

      .. figure:: figures/ifconfig_sta_softap.png
         :scale: 100%
         :align: center

   4. 连接AP

      .. note::
         - 对于 Ubuntu 系统, 如果开发者想使用命令行连接AP和获取IP地址，请首先执行如下命令关闭NetworkManager 和 DHCP 以避免UI同时控制*wpa_supplicant*。

         .. code-block:: sh

            sudo su
            systemctl stop NetworkManager
            systemctl disable NetworkManager
            systemctl stop dhcpcd.service

      a. 在``/etc/wpa_supplicant/`` 下面创建文件`wpa_supplicant.conf`添加AP的信息，如下图所示是一个WPA2的实例，更多配置请参考wpa_supplicant的官方文档。

         .. code-block::

            ctrl_interface=/var/run/wpa_supplicant
            network={
                     ssid="HUAWEI-JX2UX5_HiLink_5G"
                     psk="12345678"
            }

      b. 使用如下命令连接AP:

         .. code-block::

            Wpa_supplicant -D nl80211 -i wlanX -c /etc/wpa_supplicant/wpa_supplicant.conf -dd > /var/wifi_log

      .. note::
         - *wlanX* 是在 :ref:`Step 3 <load_the_module_step>`中获取的Station 模式的设备名称。

      c. 获取IP地址:

         .. code-block::

            dhcpcd wlanX

   5. softAP的使用

      a. 在 ``/etc/hostapd/``下面创建文件`hostapd.conf`配置softAP，如下是一个WPA2的实例，更多配置请参考wpa_supplicant的官方文档。

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

      b. 在``/etc/``下面创建文件`udhcpd_wlanX.conf`，并添加如下信息：

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

      c. 启动 softAP：

         .. code-block::

            hostapd /etc/hostapd/hostapd.conf -i wlanX

      .. note::
         - *wlanX* 是在 :ref:`Step 3 <load_the_module_step>`中获取的Station 模式的设备名称。

      d. 设置IP地址：

         .. code-block::

            ifconfig wlanX 192.168.43.1

      e. 开启DHCP 服务.

         .. code-block::

            udhcpd -f /etc/udhcpd_wlanX.conf
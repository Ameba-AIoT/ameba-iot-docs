.. tab:: Linux

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
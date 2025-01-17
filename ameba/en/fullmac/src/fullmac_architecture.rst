The FullMAC driver implements the following modules:

- Provide a data transmission path between the host and the device based on a private transmission protocol via the SDIO/SPI interface
- Adapt the cfg80211 layer and register the wireless network interface (wlan0/1) in the kernel to enable network data packet interaction between the Linux kernel and the |CHIP_NAME|
- Provide commonly-used and proprietary commands to configure the parameters of Wi-Fi interface

To clarify, in the following sections, the term ``host`` refers to the Linux PC/Rtos IC acting as the host, and the term ``device`` refers to the |CHIP_NAME| serving as the device.

.. figure:: ../figures/wifi_fullmac_architecture.svg
   :scale: 130%
   :align: center

   FullMAC architecture
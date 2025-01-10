.. _fullmac:

Connect Ameba SoC to the host as a Wi-Fi card through UART/SPI/SDIO/USB interfaces.

The following figure is the high-level block diagram for Wi-Fi FullMAC solution.

.. figure:: fullmac/figures/wifi_fullmac_4solutions.svg
   :scale: 120%
   :align: center

TCPIP stack will be just in host, you can used socket in your application development.

* linux host: you can use standard wps_supplicant and standard linux wifi APIs.

  - P2P and NAN can be supported.

* rtos host: you can use the same realtek Wi-Fi APIs as IOT SoC.

.. admonition:: More Information

   .. hlist::
      :columns: 2

      * |finger_icon| `Wi-Fi FullMAC SDK <https://github.com/Ameba-AIoT/ameba-rtos>`_
      * |finger_icon| `Wi-Fi FullMAC DoC <https://ameba-aiot.github.io/ameba-iot-docs/amebadplus/en/latest/ameba/en/fullmac/src/index.html>`_

.. tab:: RTL8721Dx

   **Function ID 0-18**

   For functions whose ID number is among 0-18, each pin can only be connected to a fixed signal of a certain IP. The functions that can be configured on a pin are very limited, but a dedicated design can maximize the performance of each IP.

   .. note::
      For example, function ID 8 and function ID 29-32 are both SPI functions. Since function ID 8 is a dedicated pin, the maximum speed of the SPI function reaches 50MHz (master mode); while the maximum speed of the pins (full-cross pins) corresponding to function ID 29-32 is only 12.5MHz (master mode).


   Take ``PB30`` as an example. If you configure function ID of ``PB30`` to 1, then the pin will be directly connected to the ``UART1_RXD`` signal of the UART1 via pinmux.

   Refer to the pinmux table for the specific function distribution available on each pin.

   .. figure:: figures/dplus_schematic_diagram_of_pinmux_connection_of_PB30.svg
      :scale: 90%
      :align: center

      Schematic diagram of pinmux connection of PB30

   **Function ID 19-81**

   For functions whose ID number is after 19, each pin can be connected to different signals of a certain IP. This method maximizes the freedom of use, but the scope of use and some IPs' performance (maximum transfer speed) is limited.


   Take ``PA12`` as an example. According to the pinmux table, you can connect ``PA12`` with the ``UART0_TXD`` signal of UART0 by configuring the ``PA11`` function ID to 19. You can also configure the ``PA12`` function ID to 20, and connect ``PA12`` with the ``UART0_RXD`` signal of UART0. For details, refer to the pinmux table.

   .. figure:: figures/dplus_schematic_diagram_of_pinmux_connection_of_PA12.svg
      :scale: 90%
      :align: center

      Schematic diagram of pinmux connection of PA12


.. tab:: RTL8726E/RTL8720E

   **Function ID 0-19**

   For functions whose ID number is among 0-19, each pin can only be connected to a fixed signal of a certain IP. The functions that can be configured on a pin are very limited, but a dedicated design can maximize the performance of each IP.

   .. note::
      
      For example, Function ID 6 and function ID 32-35 are both SPI functions. Since function ID 6 is a dedicated pin, the maximum speed of the SPI function reaches 50MHz (master mode); the maximum speed of the pins (full-cross pins) corresponding to function ID 32-35 is only 12.5MHz (master mode).

   Taking ``PA0`` as an example, if you configure function ID of ``PA0`` to 1, the pin will be directly connected to the ``UART1_RXD`` signal of the UART1 via pinmux.

   Refer to the pinmux table for the specific function distribution available on each pin.

   .. figure:: figures/lite_schematic_diagram_of_pinmux_connection_of_pa0.svg
      :scale: 140%
      :align: center
      
      Schematic diagram of pinmux connection of PA0

   **Function ID 20-67**

   For functions whose ID number is after 20, each pin can be connected to different signals of a certain IP. This method maximizes the freedom of use, but the scope of use and some IPs' performance (maximum transfer speed) is limited.

   .. note:: These function IDs can only be configured on ``PA8`` to ``PA31`` and ``PB0`` to ``PB10``.

   Taking ``PA11`` as an example, according to the pinmux table, you can connect ``PA11`` with the ``UART0_TXD`` signal of UART0 by configuring the ``PA11`` function ID to 20. You can also configure the ``PA11`` function ID to 21, and connect ``PA11`` with the ``UART0_RXD`` signal of UART0. For details, refer to the pinmux table.

   .. figure:: figures/lite_schematic_diagram_of_pinmux_connection_of_pa11.svg
      :scale: 140%
      :align: center
      
      Schematic diagram of pinmux connection of PA11


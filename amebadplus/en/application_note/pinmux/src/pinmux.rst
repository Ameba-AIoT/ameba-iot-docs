.. _pinmux:

Introduction
------------------------
The |CHIP_NAME| provides a pin multiplexing (pinmux) circuit to maximize the user's freedom under limited pin-out conditions. Each pin can be connected to different internal IP circuits through configuration. For the specific correspondence between each pin and IP circuit, refer to the provided pinmux table.


Before using the chip for further development, pay attention to the following precautions about pinmux to avoid inconvenience to your use due to unexpected behavior.

Trap Pins
------------------
During the process of powering on the chip, the internal circuit will latch several pins' conditions to decide whether entering into different modes. The trap pins and descriptions are listed in the following table.

.. table:: Description of trap pins
   :width: 100%
   :widths: auto

   +----------+--------+--------------+-------------------------------------------------------------------------------+
   | Pin name | Symbol | Active level | Description                                                                   |
   +==========+========+==============+===============================================================================+
   | PB31     | TM_DIS | Low          | Test Mode Disable, default internal pull up.                                  |
   |          |        |              |                                                                               |
   |          |        |              | It is for internal test only and should be logical high for normal operation. |
   |          |        |              |                                                                               |
   |          |        |              | - 1: Normal operation mode                                                    |
   |          |        |              |                                                                               |
   |          |        |              | - 0: Test mode                                                                |
   +----------+--------+--------------+-------------------------------------------------------------------------------+
   | PB5      | UD_DIS | Low          | UART Download Disable, default internal pull up                               |
   |          |        |              |                                                                               |
   |          |        |              | - 1: Enter into normal boot mode                                              |
   |          |        |              |                                                                               |
   |          |        |              | - 0: Enter into UART download mode                                            |
   +----------+--------+--------------+-------------------------------------------------------------------------------+



.. note::
   The trap pin needs to select the external pull-up and pull-down voltages according to the I/O power supply.


Wake Pins
------------------
``PB30`` and ``PB31`` are directly connected to the wake up circuit which is used to wake up system from deep-sleep state. If you want to use other functions on this pin, disable the wake up function first.

SWD Pins
----------------
``PA30`` and ``PA31`` are forced to SWD function by default. If you want to multiplex these two pins to other functions, call ``sys_jtag_off()`` or ``pinmux_Swdoff()`` before switching.

Function Multiplexing
------------------------------------------
Function ID 0-18
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
For functions whose ID number is among 0-18, each pin can only be connected to a fixed signal of a certain IP. The functions that can be configured on a pin are very limited, but a dedicated design can maximize the performance of each IP.



.. note::
   For example, function ID 8 and function ID 29-32 are both SPI functions. Since function ID 8 is a dedicated pin, the maximum speed of the SPI function reaches 50MHz (master mode); while the maximum speed of the pins (full-cross pins) corresponding to function ID 29-32 is only 12.5MHz (master mode).



Take ``PB30`` as an example. If you configure function ID of ``PB30`` to 1, then the pin will be directly connected to the ``UART1_RXD`` signal of the UART1 via pinmux.


Refer to the pinmux table for the specific function distribution available on each pin.

.. figure:: ../figures/schematic_diagram_of_pinmux_connection_of_PB30.svg
   :scale: 90%
   :align: center

   Schematic diagram of pinmux connection of PB30


Function ID 19-81
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
For functions whose ID number is after 19, each pin can be connected to different signals of a certain IP. This method maximizes the freedom of use, but the scope of use and some IPs' performance (maximum transfer speed) is limited.


Take ``PA12`` as an example. According to the pinmux table, you can connect ``PA12`` with the ``UART0_TXD`` signal of UART0 by configuring the ``PA11`` function ID to 19. You can also configure the ``PA12`` function ID to 20, and connect ``PA12`` with the ``UART0_RXD`` signal of UART0. For details, refer to the pinmux table.

.. figure:: ../figures/schematic_diagram_of_pinmux_connection_of_PA12.svg
   :scale: 90%
   :align: center

   Schematic diagram of pinmux connection of PA12


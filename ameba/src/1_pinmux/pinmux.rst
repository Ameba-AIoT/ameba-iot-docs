.. _pinmux:

Introduction
------------------------
We provides a pin multiplexing (pinmux) circuit to maximize the user's freedom under limited pin-out conditions. Each pin can be connected to different internal IP circuits through configuration. For the specific correspondence between each pin and IP circuit, refer to the provided pinmux table.


Before using the chip for further development, pay attention to the following precautions about pinmux to avoid inconvenience to your use due to unexpected behavior.

Function Multiplexing
------------------------
.. tabs::
   .. include:: 21Dx11Dx_pinmux_func_mux.rst
   .. include:: 26E20E13E10E_pinmux_func_mux.rst
   .. include:: 30E_pinmux_func_mux.rst


Trap Pins
------------------------

During the process of powering on the chip, the internal circuit will latch several pins' conditions to decide whether entering into different modes. The trap pins and descriptions are listed in the following table.

.. tabs::
   .. include:: 21Dx11Dx_pinmux_trap_pins.rst
   .. include:: 26E20E13E10E_pinmux_trap_pins.rst
   .. include:: 30E_pinmux_trap_pins.rst

.. note::
   The trap pin needs to select the external pull-up and pull-down voltages according to the I/O power supply.

Wake Pins & SWD Pins
------------------------
.. tabs::
   .. include:: 21Dx11Dx_pinmux_wake_swd.rst
   .. include:: 26E20E13E10E_pinmux_wake_swd.rst
   .. include:: 30E_pinmux_wake_swd.rst
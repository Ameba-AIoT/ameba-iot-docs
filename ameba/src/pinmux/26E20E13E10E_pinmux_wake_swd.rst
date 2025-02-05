.. tab:: RTL8726E/RTL8720E

   **Wake Pins**

   ``PA0`` and ``PA1`` are directly connected to the wake up circuit which is used to wake up system from deep-sleep state. If you want to use other functions on this pin, disable the wake up function first.

   **SWD Pins**

   ``PB0`` and ``PB1`` are forced to SWD/cJTAG function by default. If you want to multiplex these two pins to other functions, call :func:`sys_jtag_off()` or :func:`Pinmux_Swdoff()` before switching.


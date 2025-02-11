.. tab:: RTL8721Dx

   **Wake Pins**

   ``PB30`` and ``PB31`` are directly connected to the wake up circuit which is used to wake up system from deep-sleep state. If you want to use other functions on this pin, disable the wake up function first.

   **SWD Pins**

   ``PA30`` and ``PA31`` are forced to SWD function by default. If you want to multiplex these two pins to other functions, call ``sys_jtag_off()`` or ``pinmux_Swdoff()`` before switching.

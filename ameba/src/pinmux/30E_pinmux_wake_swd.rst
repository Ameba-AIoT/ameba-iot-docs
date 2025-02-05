.. tab:: RTL8730E

   **Wake Pins**

   The pins PB21, PB22, PB23, PB24 are directly connected to the wake up circuit which is used to wake up system from deep-sleep mode.
   If you want to use other functions on these pins, disable the wake up function first.

   **SWD Pins**

   The pins PA13 and PA14 are forced to SWD function by default.
   If you want to multiplex these two pins to other functions, call :func:`sys_jtag_off()` or :func:`Pinmux_Swdoff()` before switching.


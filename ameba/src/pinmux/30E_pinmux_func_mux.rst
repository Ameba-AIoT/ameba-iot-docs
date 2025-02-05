.. tab:: RTL8730E

   Each pin can only be connected to a fixed signal of a certain IP.
   Take PA0 as an example, if configuring function ID of PA0 to 1, the pin will be directly connected to the *UART2_RXD* signal of the UART2 via pinmux.

   Refer to the pinmux table for the specific function distribution available on each pin.

   .. figure:: figures/smart_schematic_diagram_of_pinmux_connection_of_pa0.svg
      :scale: 120%
      :align: center

      Schematic diagram of pinmux connection of PA0

   .. note::
      - If PA9~PA16 and PB25~PB31 are used, the I/O power can be set to 1.8V or 3.3V. PA20~PB6 are audio functions by default.
      - If PA20~PB6 are used as other functions, it's necessary to pay attention to the I/O power, which can only be set to 1.8V. For more information about I/O power, refer to pinmux table.


   **Audio Function**

   If the pins PA20 to PB6 are used as audio function and digital function simultaneously, pay attention to the layout of digital function as far as possible from the trace of audio function to avoid interference.
   It's not suggested to use PA18 ~ PB6 as normal digital functions.

   **ADC/Cap-Touch Function**

   If the pins PA0 to PA8 are used as ADC or Cap-Touch functions, pay attention to the layout especially for Cap-Touch.
   The performance is related to parasitic capacitance, refer to ADC/CTC layout guide for more information.

   **Pinmux Signal Description**

   For all signal description, refer to *UM0602_RTL8730E_pinmux.xlsx*  for details.


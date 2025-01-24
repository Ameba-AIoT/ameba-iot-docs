.. tab:: RTL8726EA

   The ``TPR0[24:31]`` (CS_TCEM) provides the function that when the CSN low pulse width is equal to `(CS_TCEM * 32)*busclk`, the SPI Flash Controller will automatically chop the current transmission and pull CS up.

   Winbond:

   - When the temperature is less than 85°C, PSRAM refresh the intern cell array using normal rate (4us).

   - When the temperature is greater than 85°C and less than 125°C, PSRAM refresh the internal cell array using faster rate (1us). This sets an upper limit on the length of read and write transactions so that the automatic distributed refresh operation can be done between transactions. This limit is called the CS# low maximum time (tCSM) and the tCSM will be equal to the maximum distributed refresh interval.

   - So when the temperature is less than 85°C, for higher performance, we recommend that ``CS_TCEM`` should be equal to `4us/busclk/32`. When the temperature is greater than 85°C, the value should be equal to `1us/busclk/32`.

   APM:

   - APM is in extended mode by default, so it always keeps fast refresh (1us). Here, ``CS_TCEM`` is recommended equal to `1us/busclk/32`.
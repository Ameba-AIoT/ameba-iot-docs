.. tab :: RTL8720EA

   After reset, CPU will boot from the vector table start address, which is fixed by hardware. Both KM4 and KR4 boot from the address ``0x0000_0000``.

   .. RTL8720EA or RTL8710EC

   .. table:: Boot address
      :width: 100%
      :widths: auto

      +-----+----------------+------------------+
      | CPU | Address        | Type             |
      +=====+================+==================+
      | KM4 | 0x0000_0000    | KM4 ITCM ROM     |
      +-----+----------------+------------------+
      | KR4 | 0x0000_0000    | KR4 ITCM ROM     |
      +-----+----------------+------------------+

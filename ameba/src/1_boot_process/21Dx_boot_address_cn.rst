.. tab :: RTL8721Dx

   After reset, CPU will boot from the vector table start address, which is fixed by hardware. Both KM4 and KM0 boot from address ``0x0000_0000``.

   .. table:: Boot address
      :width: 100%
      :widths: auto

      +-----+-------------+--------------+
      | CPU | Address     | Type         |
      +=====+=============+==============+
      | KM4 | 0x0000_0000 | KM4 ITCM ROM |
      +-----+-------------+--------------+
      | KM0 | 0x0000_0000 | KM0 ITCM ROM |
      +-----+-------------+--------------+


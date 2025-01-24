.. tab :: RTL8730E

   After reset, CPU will boot from the vector table start address, which is fixed by hardware. KM0, KM4 (NP), and CA32 (AP) all boot from address ``0x0000_0000``, as the following table lists.

   .. table:: Boot address
      :width: 100%
      :widths: auto

      +------+-------------+--------------+
      | CPU  | Address     | Type         |
      +======+=============+==============+
      | KM0  | 0x0000_0000 | KM0 ITCM ROM |
      +------+-------------+--------------+
      | KM4  | 0x0000_0000 | KM4 ITCM ROM |
      +------+-------------+--------------+
      | CA32 | 0x0000_0000 | CA32 BUS ROM |
      +------+-------------+--------------+


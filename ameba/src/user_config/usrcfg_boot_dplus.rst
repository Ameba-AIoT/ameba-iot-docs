.. tab:: RTL8721Dx

   **Github**: `ameba_bootcfg.c <https://github.com/Ameba-AIoT/ameba-rtos/blob/master/component/soc/amebadplus/usrcfg/ameba_bootcfg.c>`_

   This section introduces the boot-related configurations including SoC clock switch and boot log.
   The KM4 boots at 200MHz at the BootRom Stage, and switches to a higher frequency during the Bootloader Stage.
   There are some limitations when changing the SoC clock:

   .. table::
      :width: 100%
      :widths: auto

      +-------+-------+-----------------+--------------+
      | Clock | Cut   | Frequency       | Core voltage |
      +=======+=======+=================+==============+
      | PLL   |       | 300MHz ~ 600MHz |              |
      +-------+-------+-----------------+--------------+
      | KM0   | A-Cut | ≤115MHz         |              |
      +-------+-------+-----------------+--------------+
      | KM4   | A-Cut | ≤260MHz         | 0.9V         |
      +-------+-------+-----------------+--------------+
      | KM4   | A-Cut | ≤345MHz         | 1.0V         |
      +-------+-------+-----------------+--------------+


   .. note::
      The maximum operating speed of Flash with Wide Range VCC 1.65V~3.6V should use the speed limit of 1.65V~2.3V power supply.


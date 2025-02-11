.. tab:: RTL8730E

   **Github**: `rtl8730e ameba_bootcfg.c <https://github.com/Ameba-AIoT/ameba-rtos/blob/master/component/soc/amebasmart/usrcfg/ameba_bootcfg.c>`_

   This section introduces the boot-related configurations including SoC clock switch and boot log.
   The KM4 boots at 200MHz at the BootRom Stage, and switches to a higher frequency during the Bootloader Stage.
   There are some limitations when changing the SoC clock:

   **TBD**

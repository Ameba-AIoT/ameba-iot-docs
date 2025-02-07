.. tab:: RTL8726E/RTL8720E

   **Github**: `ameba_bootcfg.c <https://github.com/Ameba-AIoT/ameba-rtos/blob/master/component/soc/amebalite/usrcfg/ameba_bootcfg.c>`_

   This section introduces the boot-related configurations including SoC clock switch and boot log.
   The KM4  boots at 150MHz at the BootROM Stage, and switches to a higher frequency during the Bootloader Stage.
   There are some limitations when changing the SoC clock:

   .. table::
      :width: 100%
      :widths: auto

      +---------+-------+-----------------+--------------+---------------------------------------------------+
      | Clock   | Cut   | Frequency       | Core voltage | Note                                              |
      +=========+=======+=================+==============+===================================================+
      | PLLM    |       | 330MHz ~ 660MHz |              |                                                   |
      +---------+-------+-----------------+--------------+---------------------------------------------------+
      | PLLD    |       | 330MHz ~ 660MHz |              | Can not exceed the maximum frequency of DSP clock |
      +---------+-------+-----------------+--------------+---------------------------------------------------+
      | KM4/KR4 | A-Cut | ≤200MHz         | 0.9V         |                                                   |
      +---------+-------+-----------------+--------------+---------------------------------------------------+
      | KM4/KR4 | A-Cut | ≤240MHz         | 1.0V         |                                                   |
      +---------+-------+-----------------+--------------+---------------------------------------------------+
      | KM4/KR4 | B-Cut | ≤300MHz         | 0.9V         |                                                   |
      +---------+-------+-----------------+--------------+---------------------------------------------------+
      | KM4/KR4 | B-Cut | ≤400MHz         | 1.0V         |                                                   |
      +---------+-------+-----------------+--------------+---------------------------------------------------+
      | DSP     |       | ≤400MHz         | 0.9V         | The same as PLLD                                  |
      +---------+-------+-----------------+--------------+---------------------------------------------------+
      | DSP     |       | ≤500MHz         | 1.0V         | The same as PLLD                                  |
      +---------+-------+-----------------+--------------+---------------------------------------------------+

   **Boot_Log_En**

   The bootloader log is enabled by default and can be disabled through Boot_Log_En.

   .. code-block:: c

      /**
      * @brif  boot log enable or disable.
      * 	FALSE: disable
      *	TRUE: enable
      */
      u8 Boot_Log_En = TRUE;

   **Boot_Agg_En**

   The *Boot_Agg_En* is used with Trace Tool to sort out boot logs from different cores. It can be enabled through Boot_Agg_En.

   .. code-block:: c

      /**
      * @brif  Loguart AGG enable or disable
      * 	FALSE: disable
      *	TRUE: enable
      */
      u8 Boot_Agg_En = FALSE;

   .. note::
      Refer to Chapter :ref:`Trace Tool <trace_tool>` for more information.
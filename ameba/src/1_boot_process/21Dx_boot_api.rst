.. tab :: RTL8721Dx

   The boot API is used to obtain the cause of the chip boot, and the function prototype is:

   .. code::


      u32 BOOT_Reason(void);

   The default return value of this API is ``0`` when initially powered on, and return value of re-boot caused by other reasons can be found in the following table. Users can found macro-definitions about return value in file \ ``sysreg_aon.h``\ .


   .. table::
      :width: 100%
      :widths: auto

      +--------------+---------------------------------------------------------------------+
      | Items        | Description                                                         |
      +==============+=====================================================================+
      | Introduction | Get boot reason                                                     |
      +--------------+---------------------------------------------------------------------+
      | Parameters   | None                                                                |
      +--------------+---------------------------------------------------------------------+
      | Return       | Boot reason. It can be any of the following values or combinations: |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_OCP: Enter deep-sleep mode when OCP happens          |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_KM0_SYS: KM0 system reset                            |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_KM4_SYS: KM4 system reset                            |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_WDG0: KM0 watchdog reset                             |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_WDG1: KM4 secure watchdog reset                      |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_WDG2: KM4 non-secure watchdog reset                  |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_WARM_KM42PERI: KM4 warm reset                        |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_WARM_KM02PERI: KM0 warm reset                        |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_DSLP: Wakeup from deep-sleep mode                    |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_BOR: BOR Reset                                       |
      +--------------+---------------------------------------------------------------------+


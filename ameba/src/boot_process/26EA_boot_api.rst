.. tab :: RTL8726EA

   The API :func:`BOOT_Reason()` is used to obtain the cause of chip boot, and the function prototype is as follows:

   .. code-block:: c

      u32 BOOT_Reason(void);

   Default return value of this API is 0 when the chip is initially powered on, and return vaule of re-boot caused by other reasons can be found in the following table.
   Users can find macro-definitions about return value in file :file:`sysreg_aon.h`.

   .. table:: BOOT_Reason() API
      :width: 100%
      :widths: auto

      +--------------+---------------------------------------------------------------------+
      | Items        | Description                                                         |
      +==============+=====================================================================+
      | Introduction | Gets boot reason                                                    |
      +--------------+---------------------------------------------------------------------+
      | Parameter    | None                                                                |
      +--------------+---------------------------------------------------------------------+
      | Return       | Boot reason. It can be any of the following values or combinations: |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_THM: Thermal reset                                   |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_BOR: BOR Reset                                       |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_DSLP: Wakeup from deep-sleep mode                    |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_KR4_SYS: KR4 system reset                            |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_KM4_SYS: KM4 system reset                            |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_HIFI_SYS: HiFi 5 DSP system reset                    |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_IWDG: KM0 Independent watchdog reset                 |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_WDG1: KM4 secure watchdog reset                      |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_WDG2: KM4 non-secure watchdog reset                  |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_WDG3: KR4 watchdog reset                             |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_WDG4: HiFi 5 DSP watchdog reset                      |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_KM4_WARM2PERI: KM4 warm reset                        |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_KR4_WARM2PERI: KR4 warm reset                        |
      |              |                                                                     |
      |              | - AON_BIT_RSTF_HIFI_WARM2PERI: HIFI warm reset                      |
      +--------------+---------------------------------------------------------------------+




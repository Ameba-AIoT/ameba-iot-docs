.. tab :: RTL8730E

   Source code: ``{SDK}\component\soc\amebasmart\fwlib\ram_common\ameba_reset.c``

   The API used to obtain the cause of the chip boot, and function prototype is as below:

   .. code-block:: c

      u32 BOOT_Reason(void);

   Default return value of this API is ``0`` when initially powered on, and return vaule of re-boot caused by other reasons can be found in the following table.
   Users can found macro-definitions about return value in :file:`sysreg_aon.h`.

   .. table::
      :width: 100%
      :widths: auto

      +-----------+---------------------------------------------------------------------+
      | Items     | Description                                                         |
      +===========+=====================================================================+
      | Function  | Get boot reason                                                     |
      +-----------+---------------------------------------------------------------------+
      | Parameter | None                                                                |
      +-----------+---------------------------------------------------------------------+
      | Return    | Boot reason. It can be any of the following values or combinations: |
      |           |                                                                     |
      |           | - AON_SHIFT_RSTF_THM: Thermal reset                                 |
      |           |                                                                     |
      |           | - AON_SHIFT_RSTF_BOR: BOR reset                                     |
      |           |                                                                     |
      |           | - AON_SHIFT_RSTF_DSLP: Wakeup from deep-sleep mode                  |
      |           |                                                                     |
      |           | - AON_RSTF_LPSYS: KM0 system reset                                  |
      |           |                                                                     |
      |           | - AON_RSTF_NPSYS: KM4 system reset                                  |
      |           |                                                                     |
      |           | - AON_RSTF_APSYS: CA32 system reset                                 |
      |           |                                                                     |
      |           | - AON_RSTF_IWDG: KM0 independent watchdog reset                     |
      |           |                                                                     |
      |           | - AON_RSTF_WDG1: KM4 secure watchdog reset                          |
      |           |                                                                     |
      |           | - AON_RSTF_WDG2: KM4 non-secure watchdog reset                      |
      |           |                                                                     |
      |           | - AON_RSTF_WDG3: CA32 secure watchdog reset                         |
      |           |                                                                     |
      |           | - AON__RSTF_WDG4: CA32 non-secure watchdog reset                    |
      +-----------+---------------------------------------------------------------------+



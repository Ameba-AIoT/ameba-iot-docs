Deep-sleep can also be entered from FreeRTOS tickless flow.

When the system boots, AP holds the deepwakelock `PMU_OS`,
thus :func:`freertos_ready_to_dsleep()` will be checked fail and the system does not enter deep-sleep mode in idle task by default.
Since :func:`freertos_ready_to_dsleep()` will be checked only after :func:`freertos_ready_to_sleep()` is checked pass,
both the wakelock and deepwakelock need to be released for entering deep-sleep mode.

**Configuration:**

1. Initialize the related peripheral and enable its interrupt.

2. Set ``sleep_wakepin_config[]`` in :file:`ameba_sleepcfg.c` when using AON wakepin as a wakeup source.

3. Enter deep-sleep mode by releasing the deepwakelock and wakelock in AP.
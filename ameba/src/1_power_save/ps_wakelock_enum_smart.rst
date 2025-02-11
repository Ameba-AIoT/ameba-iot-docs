.. tab:: RTL8730E

   Wakelock is a judging condition in the function :func:`freertos_ready_to_sleep()`.
   When the system boots, CA32/KM4 holds the wakelock PMU_OS, and KM0 holds the wakelock `PMU_OS`, `PMU_KM4_RUN` and `PMU_AP_RUN`.
   Only if all wakelocks are released, CPU is permitted to enter sleep mode. The function :func:`freertos_ready_to_sleep()` will judge the value of wakelock.

   .. code-block:: c

      typedef enum {
         PMU_OS          = 0,
         PMU_WLAN_DEVICE    = 1,
         PMU_LOGUART_DEVICE  = 2,
         PMU_KM4_RUN      = 3,
         PMU_UART0_DEVICE    = 4,
         PMU_UART1_DEVICE    = 5,
         PMU_I2C0_DEVICE    = 6,
         PMU_TOUCH_DEVICE    = 7,
         PMU_USOC_DEVICE    = 8,
         PMU_DONGLE_DEVICE  = 9,
         PMU_RTC_DEVICE    = 10,
         PMU_CONSOL_DEVICE  = 11,
         PMU_ADC_DEVICE  = 12,
         PMU_WAKWLOCK_TIMEOUT = 13,
         PMU_AP_RUN  = 14,
         PMU_PSRAM_DEVICE  = 15,
         PMU_DEV_USER_BASE  = 16, /*number 16 ~ 31 is reserved for customer use*/
         PMU_BT_DEVICE  = 17,
         PMU_VAD_DEVICE  = 18,
         PMU_MAX        = 31
      } PMU_DEVICE;

   It is recommended to enter sleep mode by releasing the wakelock.
   After the wakelock `PMU_OS` of CA32 is released, CA32 will enter sleep mode in idle task and send IPC to KM0.
   KM0 will gate CA32 clock/power first and then release `PMU_AP_RUN`, and then KM4 will release `PMU_OS` in idle task if found CA32 entered sleep mode already,
   and send IPC to KM0, KM0 will gate KM4 clock/power first and then release `PMU_OS` and `PMU_KM4_RUN`.

   When the system wakes, it will enter sleep mode again quickly unless it acquires the wakelock.

   Similar to the wakelock for sleep mode, there is a 32-bit deepwakelock map for deep-sleep mode.
   If the deepwakelock bit map is larger than zero, it means that some modules are holding the deepwakelock, and the system is not allowed to enter deep-sleep mode.
   When the system boots, CA32 holds the deepwakelock `PMU_OS`.

   Deepwakelock is a judging condition in the function :func:`freertos_ready_to_dsleep()`.
   After the deepwakelock `PMU_OS` of CA32 is released, and all wakelocks of CA32 are released, CA32 will be allowed to enter deep-sleep mode and send IPC to KM0 in idle task.
   KM0 will send a deep-sleep request and let the chip finally enter deep-sleep mode.
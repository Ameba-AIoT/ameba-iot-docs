.. tab:: RTL8726E/8720E

   Wakelock is a judging condition in the function :func:`freertos_ready_to_sleep()`.
   When the system boots, application core(AP) holds the wakelock `PMU_OS`, and network core(NP) holds the wakelock `PMU_OS` and `PMU_KM4_RUN` or `PMU_AP_RUN`.
   Only if all wakelocks are released, AP or NP is permitted to enter sleep mode. The function :func:`freertos_ready_to_sleep()` will judge the value of wakelock.

   .. code-block:: c

      enum PMU_DEVICE {
         PMU_OS        = 0,
         PMU_WLAN_DEVICE,
         PMU_KM4_RUN,
         PMU_KR4_RUN,
         PMU_DSP_RUN,
         PMU_WLAN_FW_DEVICE,
         PMU_BT_DEVICE,
         PMU_DEV_USER_BASE    = 7, /*number 7 ~ 31 is reserved for customer use*/
         PMU_MAX      = 31,
      };

   It is recommended to enter sleep mode by releasing the wakelock.
   After the wakelock `PMU_OS` of AP is released, AP will enter sleep mode in idle task and send IPC to NP.
   NP will power-gate or clock-gate AP and then release `PMU_OS` and `PMU_KM4_RUN` or `PMU_AP_RUN`.

   When the system wakes, it will enter sleep mode again quickly unless it acquires the wakelock.

   Similar to the wakelock for sleep mode, there is a 32-bit deepwakelock map for deep-sleep mode.
   If the deepwakelock bit map is larger than zero, it means that some modules are holding the deepwakelock, and the system is not allowed to enter deep-sleep mode.
   When the system boots, application core holds the deepwakelock `PMU_OS`.

   Deepwakelock is a judging condition in the function :func:`freertos_ready_to_dsleep()`.
   After the deepwakelock `PMU_OS` of AP is released, and all wakelocks of AP are released, AP will be allowed to enter deep-sleep mode and send IPC to NP in idle task.
   NP will send a deep-sleep request and let the chip finally enter deep-sleep mode.
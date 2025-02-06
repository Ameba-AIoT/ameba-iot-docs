.. tab:: RTL8726E/RTL8720E

   For peripherals that need specific clock settings, such as UART and LOGUART, their setting flows are described in Section :ref:`power_saving_uart` and :ref:`power_saving_loguart`.

   .. _power_saving_uart:

   **UART**

   1. Initialize UART and enable its interrupt.

   2. Set the related wakeup source (``WAKE_SRC_UART0/WAKE_SRC_UART1/WAKE_SRC_UART2_BT``) in ``sleep_wevent_config[]`` to `WAKEUP_KM4` or `WAKEUP_KM0` (based on which CPU you want to wake). The interrupt should be registered on the same CPU selected by ``sleep_wevent_config[]``.

   3. Set the corresponding entry of ``uart_config[]`` in :file:`ameba_sleepcfg.c` to **ENABLE**.

   4. Set `keep_OSC4M_on` in ``ps_config[]`` to **TRUE** to keep OSC4M enabled during sleep mode.

   5. Enter sleep mode by releasing the wakelock in KM4 (PMU_OS needs to be released since it is acquired by default when boot).

   6. Clear the UART interrupt when wakeup.

   .. note::
      When using UART as a wakeup source, there are some restrictions:

      - If the Rx clock source is XTAL40M, do not turn off XTAL during sleep.
      - The portion of the command used to wake up that exceeds the FIFO depth (64B) will be lost.

   .. _power_saving_loguart:

   **LOGUART**

   1. Initialize LOGUART and enable its interrupt.

   2. Set `WAKE_SRC_UART_LOG` in ``sleep_wevent_config[]`` to `WAKEUP_KM4` or `WAKEUP_KM0` (based on which CPU you want to wake). The interrupt should be registered on the same CPU selected by `sleep_wevent_config[]`.

   3. Set `xtal_mode_in_sleep` to **XTAL_Normal** in ``ps_config[]``.

   4. Enter sleep mode by releasing the wakelock in KM4 (PMU_OS needs to be released since it is acquired by default when boot).

   5. Clear the LOGUART interrupt when wakeup.

   .. note::
      When using LOGUART as a wakeup source, there are some restrictions:

      - If the Rx clock source is XTAL40M, do not turn off XTAL during sleep.
      - The portion of the command used to wake up that exceeds the FIFO depth (16B) will be lost.
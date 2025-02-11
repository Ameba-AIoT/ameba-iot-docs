Sleep mode is based on FreeRTOS tickless, thus it is recommended to enter sleep mode by releasing the wakelock.

1. Initialize the specific peripheral.

2. Enable and register the peripheral's interrupt.

3. Set ``sleep_wevent_config[]`` in :file:`ambea_sleepcfg.c`, and the interrupt should be registered on the same CPU selected by ``sleep_wevent_config[]``.

4. For peripherals that need special clock settings, set ``ps_config[]`` in :file:`ameba_sleepcfg.c` if needed.

5. Register sleep/wakeup callback if needed.

6. Enter sleep mode by releasing the wakelock in application core(AP) (`PMU_OS` needs to be released since it is acquired by default when boot).

7. Clear the peripheral's interrupt when wakeup.
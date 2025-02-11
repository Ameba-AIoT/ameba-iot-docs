.. tab:: RTL8720E

   **Github**: `rtl8720e ameba_sleepcfg.c <https://github.com/Ameba-AIoT/ameba-rtos/blob/master/component/soc/amebalite/usrcfg/ameba_sleepcfg.c>`_

   To enable a specific wakeup source, the corresponding status in array ``sleep_wevent_config[]`` in :file:`ameba_sleepcfg.c` should be set. Each module can be set to ``WAKEUP_NULL/WAKEUP_NP/WAKEUP_AP``. For example, if the :mod:`WAKE_SRC_AON_WAKEPIN` module is set to `WAKEUP_NP`, it means that when the system is in sleep mode, KR4 will be woken up at the time that an aon_wakepin interrupt happens.

   .. include:: usrcfg_power_save_lite.rst
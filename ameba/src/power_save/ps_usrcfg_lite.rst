**Wakeup Mask Setup**

.. code-block:: c

   /*wakeup attribute can be set to WAKEUP_NULL/WAKEUP_NP/WAKEUP_AP/WAKEUP_DSP*/
   WakeEvent_TypeDef sleep_wevent_config[] = {
      //  Module                       wakeup
      {WAKE_SRC_VAD,                   WAKEUP_NULL},
      {WAKE_SRC_AON_WAKEPIN,           WAKEUP_NULL},
      {WAKE_SRC_AON_TIM,               WAKEUP_NULL},
      {WAKE_SRC_PWR_DOWN,              WAKEUP_NULL},
      {WAKE_SRC_BOR,                   WAKEUP_NULL},
      {WAKE_SRC_ADC,                   WAKEUP_NULL},
      {WAKE_SRC_AON_RTC,               WAKEUP_NULL},
      {WAKE_SRC_SPI1,                  WAKEUP_NULL},
      {WAKE_SRC_SPI0,                  WAKEUP_NULL},
      {WAKE_SRC_CTOUCH,                WAKEUP_NULL},
      {WAKE_SRC_GPIOB,                 WAKEUP_NULL},
      {WAKE_SRC_GPIOA,                 WAKEUP_NULL},
      {WAKE_SRC_UART_LOG,              WAKEUP_AP},
      {WAKE_SRC_UART3,                 WAKEUP_NULL},
      {WAKE_SRC_UART2,                 WAKEUP_NULL},
      {WAKE_SRC_UART1,                 WAKEUP_NULL},
      {WAKE_SRC_UART0,                 WAKEUP_NULL},
      {WAKE_SRC_Timer7,                WAKEUP_NULL},
      {WAKE_SRC_Timer6,                WAKEUP_NULL},
      {WAKE_SRC_Timer5,                WAKEUP_NULL},
      {WAKE_SRC_Timer4,                WAKEUP_NULL},
      {WAKE_SRC_Timer3,                WAKEUP_NULL},
      {WAKE_SRC_Timer2,                WAKEUP_NULL},
      {WAKE_SRC_Timer1,                WAKEUP_NULL},
      {WAKE_SRC_Timer0,                WAKEUP_NULL},
      {WAKE_SRC_WDG0,                  WAKEUP_NULL},
      {WAKE_SRC_BT_WAKE_HOST,          WAKEUP_NULL},
      {WAKE_SRC_AP_WAKE,               WAKEUP_NULL},
      {WAKE_SRC_WIFI_FTSR_MAILBOX,     WAKEUP_NP},
      {WAKE_SRC_WIFI_FISR_FESR,        WAKEUP_NP},
      {0xFFFFFFFF,                     WAKEUP_NULL},
   };

**AON Wakepin Configuration**

AON wakepin is one of the peripherals that can be set as a wakeup source. SoC has two AON wakepins (PA0 and PA1), which can be configured in ``sleep_wakepin_config[]`` in :file:`ameba_sleepcfg.c`.
The config attribute can be set to **DISABLE_WAKEPIN** or **HIGH_LEVEL_WAKEUP** or **LOW_LEVEL_WAKEUP**, meaning not wake up, or GPIO level high will wake up, or GPIO level low will wake up respectively.

.. code-block:: c

   /* can be used by sleep mode & deep sleep mode */
   /* config can be set to DISABLE_WAKEPIN/HIGH_LEVEL_WAKEUP/LOW_LEVEL_WAKEUP */
   WAKEPIN_TypeDef sleep_wakepin_config[] = {
      //   wakepin      config
      {WAKEPIN_0,    DISABLE_WAKEPIN},  /* WAKEPIN_0 corresponding to _PA_0 */
      {WAKEPIN_1,    DISABLE_WAKEPIN},  /* WAKEPIN_1 corresponding to _PA_1 */
      {0xFFFFFFFF,  DISABLE_WAKEPIN},
   };

.. note::
      - By default, AON_WAKEPIN_IRQ will not be enabled in ``sleep_wakepin_config[]``, and users need to enable it by themselves.
      - The wakeup mask will not be set in ``sleep_wakepin_config[]``. If wakepin is used for sleep mode, `WAKE_SRC_AON_WAKEPIN` entry
   needs to be set in ``sleep_wevent_config[]``.

**Clock and Voltage Configuration**

The XTAL, OSC4M state, and sleep mode voltage are configurable in ``ps_config[]`` in :file:`ameba_sleepcfg.c`.
Users can use this configuration for peripherals that need XTAL or OSC4M on in sleep mode.

.. code-block:: c

   PSCFG_TypeDef ps_config = {
      .keep_OSC4M_on = FALSE,       /* keep OSC4M on or off for sleep */
      .xtal_mode_in_sleep = XTAL_OFF,   /* set xtal mode during sleep mode, see enum xtal_mode_sleep for detail */
   };

**Sleep Type Configuration**

Application software can set sleep mode to CG or PG by calling the function :func:`pmu_set_sleep_type(uint32_t type)`, and users can get CPU's sleep mode by calling the function :func:`pmu_get_sleep_type()`.

.. note::
   - KR4 and KM4 are in the same power domain, so they will have the same sleep type, thus :func:`pmu_set_sleep_type()` should be set to AP, and NP will follow AP's sleep mode type.

   - Sleep mode is set to PG by default. If users want to change the sleep type, :func:`pmu_set_sleep_type()` needs to be called before sleep.

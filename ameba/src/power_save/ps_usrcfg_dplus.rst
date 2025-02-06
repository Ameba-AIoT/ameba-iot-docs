.. tab:: RTL8721Dx

   **Wakeup Mask Setup**

   For sleep mode, only one CPU is required to wake up to execute the program in some situations. The wakeup mask module is designed to implement this function.
   By setting a wakeup mask, you can choose to wake up only one CPU core. If KM4 is chosen, KM0 will be waked up first and then KM0 will resume KM4.

   Users can set the wakeup attribute in ``sleep_wevent_config[]`` in :file:`ameba_sleepcfg.c` to choose which CPU you want to wake up.
   The wakeup attribute of each wakeup source can be set to **WAKEUP_KM4** or **WAKEUP_KM0** or **WAKEUP_NULL**,
   respectively indicating that this wakeup source is only to wake up KM4, or wake up KM0, or not used as a wakeup source.

   .. code-block:: c

      /* Wakeup entry can be set to WAKEUP_NULL/WAKEUP_KM4/WAKEUP_KM0 */
      WakeEvent_TypeDef sleep_wevent_config[] = {
         //   Module              Wakeup
         {WAKE_SRC_SDIO,          WAKEUP_NULL},
         {WAKE_SRC_AON_WAKEPIN,      WAKEUP_NULL},
         {WAKE_SRC_AON_TIM,        WAKEUP_NULL},
         {WAKE_SRC_Keyscan,        WAKEUP_NULL},
         {WAKE_SRC_PWR_DOWN,        WAKEUP_NULL},
         {WAKE_SRC_BOR,          WAKEUP_NULL},
         {WAKE_SRC_ADC,          WAKEUP_NULL},
         {WAKE_SRC_RTC,          WAKEUP_NULL},
         {WAKE_SRC_CTOUCH,        WAKEUP_NULL},
         {WAKE_SRC_I2C1,          WAKEUP_NULL},
         {WAKE_SRC_I2C0,          WAKEUP_NULL},
         {WAKE_SRC_GPIOB,        WAKEUP_NULL},
         {WAKE_SRC_GPIOA,        WAKEUP_NULL},
         {WAKE_SRC_UART_LOG,        WAKEUP_NULL},
         {WAKE_SRC_UART2_BT,        WAKEUP_NULL},
         {WAKE_SRC_UART1,        WAKEUP_NULL},
         {WAKE_SRC_UART0,        WAKEUP_NULL},
         {WAKE_SRC_pmc_timer1,      WAKEUP_KM0},  /* Internal use, do not change it*/
         {WAKE_SRC_pmc_timer0,      WAKEUP_KM4},  /* Internal use, do not change it*/
         {WAKE_SRC_Timer7,        WAKEUP_NULL},
         {WAKE_SRC_Timer6,        WAKEUP_NULL},
         {WAKE_SRC_Timer5,        WAKEUP_NULL},
         {WAKE_SRC_Timer4,        WAKEUP_NULL},
         {WAKE_SRC_IPC_KM4,        WAKEUP_KM4},  /* IPC can only wake up KM4, do not change it*/
         {WAKE_SRC_BT_WAKE_HOST,      WAKEUP_NULL},
         {WAKE_SRC_KM4_WAKE_IRQ,      WAKEUP_KM0},  /* Internal use, do not change it*/
         {WAKE_SRC_WIFI_FTSR_MAILBOX,  WAKEUP_KM0},  /* Wi-Fi wakeup, do not change it*/
         {WAKE_SRC_WIFI_FISR_FESR_IRQ,  WAKEUP_KM0},  /* Wi-Fi wakeup, do not change it*/
         {0xFFFFFFFF,          WAKEUP_NULL},
      };

   **AON Wakepin Configuration**

   AON wakepin is one of the peripherals that can be set as a wakeup source.
   SoC has two AON wakepins (``PB30`` and ``PB31``), which can be configured in ``sleep_wakepin_config[]`` in :file:`ameba_sleepcfg.c`.
   The config attribute can be set to **DISABLE_WAKEPIN** or **HIGH_LEVEL_WAKEUP** or **LOW_LEVEL_WAKEUP**, meaning not wake up, or GPIO level high will wake up, or GPIO level low will wake up respectively.

   .. code-block:: c

      /* can be used by sleep mode & deep sleep mode */
      /* config can be set to DISABLE_WAKEPIN/HIGH_LEVEL_WAKEUP/LOW_LEVEL_WAKEUP */
      WAKEPIN_TypeDef sleep_wakepin_config[] = {
         //   wakepin      config
         {WAKEPIN_0,    DISABLE_WAKEPIN},  /* WAKEPIN_0 corresponding to _PB_30 */
         {WAKEPIN_1,    DISABLE_WAKEPIN},  /* WAKEPIN_1 corresponding to _PB_31 */
         {0xFFFFFFFF,  DISABLE_WAKEPIN},
      };

   .. note:: 
      - By default, AON_WAKEPIN_IRQ will not be enabled in ``sleep_wakepin_config[]``, and users need to enable it by themselves.
      - The wakeup mask will not be set in ``sleep_wakepin_config[]``. If wakepin is used for sleep mode, `WAKE_SRC_AON_WAKEPIN` entry needs to be set in ``sleep_wevent_config[]``.

   **Clock and Voltage Configuration**

   The XTAL, OSC4M state, and sleep mode voltage are configurable in ``ps_config[]`` in :file:`ameba_sleepcfg.c`.
   Users can use this configuration for peripherals that need XTAL or OSC4M on in sleep mode.

   .. code-block:: c

      PSCFG_TypeDef ps_config = {
         .keep_OSC4M_on = FALSE,        /* Keep OSC4M on or off for sleep */
         .xtal_mode_in_sleep = XTAL_OFF,    /* Set XTAL mode during sleep mode, see enum xtal_mode_sleep for details */
         .sleep_to_08V = FALSE,        /* Default sleep to 0.7V, setting this option to TRUE will sleep to 0.8V */
      };

   **Sleep Type Configuration**

   Application software can set sleep mode to CG or PG by calling the function :func:`pmu_set_sleep_type(uint32_t type)`, and users can get CPU's sleep mode by calling the function :func:`pmu_get_sleep_type()`.

   .. note::
      - KM0 and KM4 are in the same power domain, so they will have the same sleep type, thus :func:`pmu_set_sleep_type()` should be set to KM4, and KM0 will follow KM4's sleep mode type.

      - Sleep mode is set to PG by default. If users want to change the sleep type, :func:`pmu_set_sleep_type()` needs to be called before sleep.

.. tab:: RTL8730E

   **Github**: `rtl8730e ameba_sleepcfg.c <https://github.com/Ameba-AIoT/ameba-rtos/blob/master/component/soc/amebamart/usrcfg/ameba_sleepcfg.c>`_

   **Wakeup Mask Setup**

   For sleep mode, only one CPU is required to wake up to execute the program in some situations. The wakeup mask module is designed to implement this function.
   By setting a wakeup mask, you can choose to wake up only one CPU core. If KM4 is chosen, KM0 will be waked up first and then KM0 will resume KM4.
   And if CA32 is chosen, KM0 will be waked up first and then KM0 will resume KM4, and CA32 will be resumed at last.

   Users can set the wakeup attribute in ``sleep_wevent_config[]`` in :file:`ameba_sleepcfg.c` to choose which CPU you want to wake up.
   The wakeup attribute of each wakeup source can be set to **WAKEUP_KM4** or **WAKEUP_KM0** or **WAKEUP_NULL**,
   respectively indicating that this wakeup source is only to wake up KM4, or wake up KM0, or not used as a wakeup source.

   .. code-block:: c

      /*wakeup attribute can be set to WAKEUP_NULL/WAKEUP_LP/WAKEUP_NP/WAKEUP_AP*/
      WakeEvent_TypeDef sleep_wevent_config[] = {
         //  Module                  wakeup
         {WAKE_SRC_nFIQOUT1_OR_nIRQOUT1,      WAKEUP_NULL},
         {WAKE_SRC_nFIQOUT0_OR_nIRQOUT0,      WAKEUP_NULL},
         {WAKE_SRC_BT_WAKE_HOST,          WAKEUP_NULL},
         {WAKE_SRC_AON_WAKEPIN,          WAKEUP_NULL},
         {WAKE_SRC_UART2,            WAKEUP_NULL},
         {WAKE_SRC_UART1,            WAKEUP_NULL},
         {WAKE_SRC_UART0,            WAKEUP_NULL},
         {WAKE_SRC_SPI1,              WAKEUP_NULL},
         {WAKE_SRC_SPI0,              WAKEUP_NULL},
         {WAKE_SRC_IPC_AP,            WAKEUP_AP},    /* do not change it */
         {WAKE_SRC_IPC_NP,            WAKEUP_NP},   /* do not change it*/
         {WAKE_SRC_VADBT_OR_VADPC,        WAKEUP_NULL},
         {WAKE_SRC_PWR_DOWN,            WAKEUP_LP},
         {WAKE_SRC_BOR,              WAKEUP_NULL},
         {WAKE_SRC_ADC,              WAKEUP_NULL},
         {WAKE_SRC_CTOUCH,            WAKEUP_NULL},
         {WAKE_SRC_RTC,              WAKEUP_NULL},
         {WAKE_SRC_GPIOC,            WAKEUP_NULL},
         {WAKE_SRC_GPIOB,            WAKEUP_NULL},
         {WAKE_SRC_GPIOA,            WAKEUP_NULL},
         {WAKE_SRC_UART_LOG,            WAKEUP_NULL},
         {WAKE_SRC_Timer7,            WAKEUP_NULL},
         {WAKE_SRC_Timer6,            WAKEUP_NP},
         {WAKE_SRC_Timer5,            WAKEUP_NULL},
         {WAKE_SRC_Timer4,            WAKEUP_NULL},
         {WAKE_SRC_Timer3,            WAKEUP_NULL},
         {WAKE_SRC_Timer2,            WAKEUP_NULL},
         {WAKE_SRC_Timer1,            WAKEUP_NULL},
         {WAKE_SRC_Timer0,            WAKEUP_NULL},
         {WAKE_SRC_WDG0,              WAKEUP_NULL},
         {WAKE_SRC_AP_WAKE,            WAKEUP_NULL},
         {WAKE_SRC_NP_WAKE,            WAKEUP_NULL},
         {WAKE_SRC_AON_TIM,            WAKEUP_NULL},
         {WAKE_SRC_WIFI_FTSR_MAILBOX,      WAKEUP_LP},    /* Wi-Fi wakeup, do not change it*/
         {WAKE_SRC_WIFI_FISR_FESR,        WAKEUP_LP},    /* Wi-Fi wakeup, do not change it*/
         {0xFFFFFFFF,              WAKEUP_NULL},  /* Table end */
      };

   **AON Wakepin Configuration**

   AON wakepin is one of the peripherals that can be set as a wakeup source.
   SoC has four AON wakepins (``PB21``, ``PB22``, ``PB23`` and ``PB24``), which can be configured in ``sleep_wakepin_config[]`` in :file:`ameba_sleepcfg.c`.
   The config attribute can be set to **DISABLE_WAKEPIN** or **HIGH_LEVEL_WAKEUP** or **LOW_LEVEL_WAKEUP**, meaning not wake up, or GPIO positive pulse will wake up, or GPIO negative pulse will wake up respectively.

   .. code-block:: c

      /* can be used by sleep mode & deep sleep mode */
      /* config can be set to DISABLE_WAKEPIN/HIGH_LEVEL_WAKEUP/LOW_LEVEL_WAKEUP */
      WAKEPIN_TypeDef sleep_wakepin_config[] = {
         //  wakepin      config
         {WAKEPIN_0,    DISABLE_WAKEPIN},  /* WAKEPIN_0 corresponding to _PB_21 */
         {WAKEPIN_1,    DISABLE_WAKEPIN},  /* WAKEPIN_1 corresponding to _PB_22  */
         {WAKEPIN_2,    DISABLE_WAKEPIN},  /* WAKEPIN_2 corresponding to _PB_23  */
         {WAKEPIN_3,    DISABLE_WAKEPIN},  /* WAKEPIN_3 corresponding to _PB_24  */
         {0xFFFFFFFF,  DISABLE_WAKEPIN},  /* Table end */
      }

   .. note::

      - ``PB23`` and ``PB24`` is for loguart trx by default, if ``PB23`` and ``PB24`` is needed to wake up system from dslp, contact realtek for help. Active and sleep mode of pin is controlled by pinmap config, change ``pmap_func[]`` in :file:`ameba_pinmapcfg.c` if needed.
      - By default, `AON_WAKEPIN_IRQ` will not be enabled in ``sleep_wakepin_config[]``, and users need to enable it by themselves.
      - The wakeup mask will not be set in ``sleep_wakepin_config[]``. If wakepin is used for sleep mode, `WAKE_SRC_AON_WAKEPIN` entry needs to be set in ``sleep_wevent_config[]``.

   **Clock and Voltage Configuration**

   The XTAL, OSC4M state are configurable in ``ps_config[]`` in :file:`ameba_sleepcfg.c`. Users can use this configuration for peripherals that need XTAL or OSC4M on in sleep mode.

   .. code-block:: c

      PSCFG_TypeDef ps_config = {
         .km0_tickles_debug = TRUE,/* if open WIFI FW, should close it, or beacon will lost in WOWLAN */
         .km0_pll_off = TRUE,
         .km0_audio_vad_on = FALSE,
      #if defined(CONFIG_CLINTWOOD ) && CONFIG_CLINTWOOD
         .km0_config_psram = FALSE, /* if device enter sleep mode or not, false for keep active */
         .km0_sleep_withM4 = FALSE,
      #else
         .km0_config_psram = TRUE, /* if device enter sleep mode or not, false for keep active */
         .km0_sleep_withM4 = TRUE,
      #endif
         .keep_OSC4M_on = FALSE,
         .xtal_mode_in_sleep = XTAL_OFF,
         .swr_mode_in_sleep = SWR_PFM,
      };
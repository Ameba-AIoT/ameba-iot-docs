.. tab:: RTL8726E/RTL8720E

   To use ADC comparator-assist mode, the following steps are mandatory.

   1. Enable clock and function of ADC module.

      .. code-block:: C

         RCC_PeriphClockCmd(APBPeriph_CTC, APBPeriph_CTC_CLOCK, ENABLE);
         RCC_PeriphClockCmd(APBPeriph_ADC, APBPeriph_ADC_CLOCK, ENABLE);

   2. Configure the ADC pinmux according to the pinmux specification.

      For example, call the following functions to use ADC1.

      .. code-block:: C

         Pinmux_Config(_PB_4, PINMUX_FUNCTION_AUXIN);
         PAD_InputCtrl(_PB_4, DISABLE);
         PAD_PullCtrl(_PB_4, GPIO_PuPd_NOPULL);
         PAD_SleepPullCtrl(_PB_4, GPIO_PuPd_NOPULL);

   3. Set the default parameters, and modify ADC mode. After that, channel list and other parameters can be modified in ADC_InitStruct if needed.

      .. code-block:: C

         ADC_StructInit(ADC_InitTypeDef *ADC_InitStruct);
         ADC_InitStruct->ADC_OpMode = ADC_COMP_ASSIST_MODE;

   4. Initialize ADC and then enable ADC.

      .. code-block:: C

         ADC_Init(ADC_InitTypeDef *ADC_InitStruct);
         ADC_Cmd(ENABLE);

   5. Set the default parameters. After that, channel list and other parameters can be modified in CMP_InitStruct if needed.

      .. code-block:: C

         CMP_StructInit(CMP_InitTypeDef *CMP_InitStruct)

   6. Initialize the comparator and then enable the comparator.

      .. code-block:: C

         CMP_Init(CMP_InitTypeDef *CMP_InitStruct);
         CMP_Cmd(ENABLE);

   7. Select a comparator operation mode, and then enable it.

      - Auto mode:

         .. code-block:: C

            CMP_AutoCSwCmd(ENABLE);

      - Software-trigger mode:

         .. code-block:: C

            CMP_SwTrigCmd(ENABLE);

      - Timer-trigger mode:

         .. code-block:: C

            CMP_TimerTrigCmd(tim_idx, period, ENABLE);

   8. Configure the interrupt and register interrupt callback function.

      .. code-block:: C

         InterruptRegister((IRQ_FUN)CMPIrqHandle, ADC_COMP_IRQ, NULL, INT_PRI_MIDDLE);
         InterruptEn(ADC_COMP_IRQ, INT_PRI_MIDDLE);

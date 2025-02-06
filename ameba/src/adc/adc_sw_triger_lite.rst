.. tab:: RTL8726E/RTL8720E

   To use ADC software-trigger mode, the following steps are mandatory.

   1. Enable function and clock of ADC module.

      .. code-block:: c

         RCC_PeriphClockCmd(APBPeriph_CTC, APBPeriph_CTC_CLOCK, ENABLE);
         RCC_PeriphClockCmd(APBPeriph_ADC, APBPeriph_ADC_CLOCK, ENABLE);

   2. Configure the ADC pinmux according to the pinmux specification.

      For example, call the following functions to use ADC0.

      .. code-block:: c

         Pinmux_Config(_PB_5, PINMUX_FUNCTION_AUXIN);
         PAD_InputCtrl(_PB_5, DISABLE);
         PAD_PullCtrl(_PB_5, GPIO_PuPd_NOPULL);
         PAD_SleepPullCtrl(_PB_5, GPIO_PuPd_NOPULL);

   3. Set the default parameters, and modify ADC mode. After that, channel list and other parameters can be modified in ``ADC_InitStruct`` if needed.

      .. code-block:: c

         ADC_StructInit(ADC_InitTypeDef *ADC_InitStruct);
         ADC_InitStruct->ADC_OpMode = ADC_SW_TRI_MODE;

   4. Initialize ADC and then enable ADC.

      .. code-block:: c

         ADC_Init(ADC_InitTypeDef *ADC_InitStruct);
         ADC_Cmd(ENABLE);

   5. Read ADC sample data.

      .. code-block:: c

         ADC_SWTrigCmd(ENABLE);
         while(ADC_Readable() == 0);
         ADC_SWTrigCmd(DISABLE);
         ADC_Read();
.. tab:: RTL8730E

   To use ADC software-trigger mode, the following steps are mandatory.

   1. Enable clock and function of ADC module.

      .. code-block:: C

         RCC_PeriphClockCmd(APBPeriph_CTC, APBPeriph_CTC_CLOCK, ENABLE);
         RCC_PeriphClockCmd(APBPeriph_ADC, APBPeriph_ADC_CLOCK, ENABLE);

   2. Configure the ADC pinmux according to the pinmux specification.

      For example, call the following functions to use ADC0. It is the same for other ADC pins except the ``BAT_MEAS`` pin.

      .. code-block:: C

         Pinmux_Config(_PA_0, PINMUX_FUNCTION_CAPTOUCH);
         PAD_InputCtrl(_PA_0, DISABLE);
         PAD_PullCtrl(_PA_0, GPIO_PuPd_NOPULL);
         PAD_SleepPullCtrl(_PA_0, GPIO_PuPd_NOPULL);

   3. Set the default parameters, and modify ADC mode. After that, channel list and other parameters can be modified in ADC_InitStruct if needed.

      .. code-block:: C

         ADC_StructInit(ADC_InitTypeDef *ADC_InitStruct);
         ADC_InitStruct->ADC_OpMode = ADC_SW_TRI_MODE;

   4. Initialize ADC and then enable ADC.

      .. code-block:: C

         ADC_Init(ADC_InitTypeDef *ADC_InitStruct);
         ADC_Cmd(ENABLE);

   5. Read ADC sample data.

      .. code-block:: C

         ADC_SWTrigCmd(ENABLE);
         while(ADC_Readable() == 0);
         ADC_SWTrigCmd(DISABLE);
         ADC_Read();
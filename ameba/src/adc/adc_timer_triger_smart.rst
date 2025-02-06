.. tab:: RTL8730E

   To use ADC timer-trigger mode, the following steps are mandatory.

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

   3. Set the default parameters, and modify ADC mode. After that, channel list and other parameters can be modified in ``ADC_InitStruct`` if needed.

      .. code-block:: C

         ADC_StructInit(ADC_InitTypeDef *ADC_InitStruct);
         ADC_InitStruct->ADC_OpMode = ADC_TIM_TRI_MODE;

   4. Initialize ADC and then enable ADC.

      .. code-block:: C

         ADC_Init(ADC_InitTypeDef *ADC_InitStruct);
         ADC_Cmd(ENABLE);

   5. Select basic timer index \ *tim_idx *\ and set timer period \ *period*\ . Read ADC sample data in :func:`ADCIrqHandle`.

      .. code-block:: C

         ADC_INTConfig(ADC_BIT_IT_CV_END_EN | ADC_BIT_IT_CVLIST_END_EN, ENABLE);
         InterruptRegister((IRQ_FUN)ADCIrqHandle, ADC_IRQ, NULL, INT_PRI_MIDDLE);
         InterruptEn(ADC_IRQ, INT_PRI_MIDDLE);
         ADC_TimerTrigCmd(tim_idx, period, ENABLE);
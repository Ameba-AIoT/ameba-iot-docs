.. tab:: RTL8721Dx

   To use ADC timer-trigger mode, the following steps are mandatory.

   1. Enable clock and function of ADC module.

      .. code-block:: C

         RCC_PeriphClockCmd(APBPeriph_ADC, APBPeriph_ADC_CLOCK, ENABLE);

   2. Configure the ADC pinmux according to the pinmux specification.

      For example, call the following functions to use ADC0.

      .. code-block:: C

         Pinmux_Config(_PB_19, PINMUX_FUNCTION_ADC)
         PAD_InputCtrl(_PB_19, DISABLE);
         PAD_PullCtrl(_PB_19, GPIO_PuPd_NOPULL);
         PAD_SleepPullCtrl(_PB_19, GPIO_PuPd_NOPULL);

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
         InterruptRegister((IRQ_FUN)ADCIrqHandle, ADC_IRQ, tim_idx, INT_PRI_MIDDLE);
         InterruptEn(ADC_IRQ, INT_PRI_MIDDLE);
         ADC_TimerTrigCmd(tim_idx, period, ENABLE);
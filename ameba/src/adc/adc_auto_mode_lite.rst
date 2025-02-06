.. tab:: RTL8726E/RTL8720E

   To use ADC auto mode, the following steps are mandatory.

   1. Enable clock and function of ADC module.

      .. code-block:: C

         RCC_PeriphClockCmd(APBPeriph_CTC, APBPeriph_CTC_CLOCK, ENABLE);
         RCC_PeriphClockCmd(APBPeriph_ADC, APBPeriph_ADC_CLOCK, ENABLE);

   2. Configure the ADC pinmux according to the pinmux specification.

      For example, call the following functions to use ADC0.

      .. code-block:: C

         Pinmux_Config(_PB_5, PINMUX_FUNCTION_AUXIN);
         PAD_InputCtrl(_PB_5, DISABLE);
         PAD_PullCtrl(_PB_5, GPIO_PuPd_NOPULL);
         PAD_SleepPullCtrl(_PB_5, GPIO_PuPd_NOPULL);

   3. Set the default parameters, and modify ADC mode. After that, channel list and other parameters can be modified in ``ADC_InitStruct`` if needed.

      .. code-block:: C

         ADC_StructInit(ADC_InitTypeDef *ADC_InitStruct);
         ADC_InitStruct->ADC_OpMode = ADC_AUTO_MODE;

   4. Initialize ADC and then enable ADC.

      .. code-block:: C

         ADC_Init(ADC_InitTypeDef *ADC_InitStruct);
         ADC_Cmd(ENABLE);

   5. Read ADC sample data. You can use polling mode or interrupt mode to acquire ADC sample data.

      - Polling mode:

      .. code-block:: C

         ADC_ReceiveBuf(u16 *pBuf, u32 len);

      - Interrupt mode:

      .. code-block:: C

         ADC_INTConfig(ADC_BIT_IT_FIFO_OVER_EN | ADC_BIT_IT_FIFO_FULL_EN, ENABLE);
         InterruptRegister((IRQ_FUN)ADCIrqRxHandler, ADC_IRQ, NULL, INT_PRI_MIDDLE);
         InterruptEn(ADC_IRQ, INT_PRI_MIDDLE);
         ADC_AutoCSwCmd(ENABLE);
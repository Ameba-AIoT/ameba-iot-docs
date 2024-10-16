.. _adc:

Introduction
------------------------
This chapter describes the usage of the 12-bit analog-to-digital converter (ADC) of |CHIP_NAME|.

The ADC is a successive-approximation register (SAR) ADC, which includes up to 6 external channels and 2 internal channels. The ADC supports continuous sampling, software triggered sampling and timer triggered sampling. The result of ADC conversion is stored in the result register and can be read on demand.

The information of ADC channels are described below.

.. table:: 
   :width: 100%
   :widths: auto

   +-------------------------+----------------+----------+-------------------+
   | Channel                 | ADC channel ID | Pin name | Input voltage (V) |
   +=========================+================+==========+===================+
   | External normal channel | CH0~CH5        | PB5~PB0  | 0 ~ 3.3           |
   +-------------------------+----------------+----------+-------------------+
   | Internal GND            | CH7            | \-       | 0 (Tie GND)       |
   +-------------------------+----------------+----------+-------------------+
   | Internal AVDD33         | CH8            | \-       | 0 ~ 3.3           |
   +-------------------------+----------------+----------+-------------------+

Usage
----------
Auto Mode
~~~~~~~~~~~~~~~~~~
To use ADC auto mode, the following steps are mandatory.

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
      ADC_InitStruct->ADC_OpMode = ADC_AUTO_MODE;

4. Initialize ADC and then enable ADC.

   .. code-block:: c

      ADC_Init(ADC_InitTypeDef *ADC_InitStruct);
      ADC_Cmd(ENABLE);

5. Read ADC sample data. You can use polling mode or interrupt mode to acquire ADC sample data.

   - Polling mode:

     .. code-block:: c

        ADC_ReceiveBuf(u16 *pBuf, u32 len);

   - Interrupt mode:

     .. code-block:: c

        ADC_INTConfig(ADC_BIT_IT_FIFO_OVER_EN | ADC_BIT_IT_FIFO_FULL_EN, ENABLE);
        InterruptRegister((IRQ_FUN)ADCIrqRxHandler, ADC_IRQ, NULL, INT_PRI_MIDDLE);
        InterruptEn(ADC_IRQ, INT_PRI_MIDDLE);
        ADC_AutoCSwCmd(ENABLE);

Software-trigger Mode
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

Timer-trigger Mode
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
To use ADC timer-trigger mode, the following steps are mandatory.

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
      ADC_InitStruct->ADC_OpMode = ADC_TIM_TRI_MODE;

4. Initialize ADC and then enable ADC.

   .. code-block:: c

      ADC_Init(ADC_InitTypeDef *ADC_InitStruct);
      ADC_Cmd(ENABLE);

5. Select basic timer index \ *tim_idx *\ and set timer period \ *period*\ . Read ADC sample data in :func:`ADCIrqHandle`.

   .. code-block:: c

      ADC_INTConfig(ADC_BIT_IT_CV_END_EN | ADC_BIT_IT_CVLIST_END_EN, ENABLE);
      InterruptRegister((IRQ_FUN)ADCIrqHandle, ADC_IRQ, tim_idx, INT_PRI_MIDDLE);
      InterruptEn(ADC_IRQ, INT_PRI_MIDDLE);
      ADC_TimerTrigCmd(tim_idx, period, ENABLE);


.. _adc:

Introduction
------------------------
This chapter describes the usage of the 12-bit analog-to-digital converter (ADC) of |CHIP_NAME|.

The ADC of |CHIP_NAME| is a successive-approximation register (SAR) ADC, which includes up to 6 external channels, 1 battery measurement channel and 1 internal channel. The ADC supports continuous sampling, software-trigger sampling and timer-trigger sampling. The result of ADC conversion is stored in the result register and can be read on demand.

The description of channels is listed in the table below.

.. table::
   :width: 100%
   :widths: auto

   +-------------------------+----------------+-----------+-------------------+
   | Channel                 | ADC channel ID | Pin name  | Input voltage (V) |
   +=========================+================+===========+===================+
   | External normal channel | CH0 ~ CH5      | PA0 ~ PA5 | 0 ~ 1.8           |
   +-------------------------+----------------+-----------+-------------------+
   | External BAT_MEAS       | CH6            | BAT_MEAS  | 0 ~ 5             |
   +-------------------------+----------------+-----------+-------------------+
   | Internal GND            | CH8            | \-        | 0 (Tie GND)       |
   +-------------------------+----------------+-----------+-------------------+

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

   For example, call the following functions to use ADC0. It is the same for other ADC pins except the ``BAT_MEAS`` pin.

   .. code-block:: c

      Pinmux_Config(_PA_0, PINMUX_FUNCTION_CAPTOUCH);
      PAD_InputCtrl(_PA_0, DISABLE);
      PAD_PullCtrl(_PA_0, GPIO_PuPd_NOPULL);
      PAD_SleepPullCtrl(_PA_0, GPIO_PuPd_NOPULL);

3. Set default parameters, and modify ADC mode. 

   After that, channel list and other parameters can be modified in ``ADC_InitStruct`` if needed.

   .. code-block:: c

      ADC_StructInit(ADC_InitTypeDef *ADC_InitStruct);
      ADC_InitStruct->ADC_OpMode = ADC_AUTO_MODE;

4. Initialize ADC, then enable ADC.

   .. code-block:: c

      ADC_Init(ADC_InitTypeDef *ADC_InitStruct);
      ADC_Cmd(ENABLE);

5. Read ADC sample data.

   You can use polling mode or interrupt mode to acquire ADC sample data.

   - Polling mode:

     .. code-block:: c

        ADC_ReceiveBuf(u32 *pBuf, u32 len);

   - Interrupt mode:

     .. code-block:: c

        ADC_INTConfig(ADC_BIT_IT_FIFO_OVER_EN | ADC_BIT_IT_FIFO_FULL_EN, ENABLE);
        InterruptRegister((IRQ_FUN)ADCIrqRxHandler, ADC_IRQ, NULL, INT_PRI_MIDDLE);
        InterruptEn(ADC_IRQ, INT_PRI_MIDDLE);
        ADC_AutoCSwCmd(ENABLE);

Software-trigger Mode
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
To use ADC software-trigger mode, the following steps are mandatory.

1. Enable the function and clock of ADC module.

   .. code-block:: c

      RCC_PeriphClockCmd(APBPeriph_CTC, APBPeriph_CTC_CLOCK, ENABLE);
      RCC_PeriphClockCmd(APBPeriph_ADC, APBPeriph_ADC_CLOCK, ENABLE);

2. Configure the ADC pinmux according to the pinmux specification.

   For example, call the following functions to use ADC0. It is the same for other ADC pins except the ``BAT_MEAS`` pin.

   .. code-block:: c

      Pinmux_Config(_PA_0, PINMUX_FUNCTION_CAPTOUCH);
      PAD_InputCtrl(_PA_0, DISABLE);
      PAD_PullCtrl(_PA_0, GPIO_PuPd_NOPULL);
      PAD_SleepPullCtrl(_PA_0, GPIO_PuPd_NOPULL);

3. Set the default parameters, and modify ADC mode. 

   After that, channel list and other parameters can be modified in ``ADC_InitStruct`` if needed.

   .. code-block:: c

      ADC_StructInit(ADC_InitTypeDef *ADC_InitStruct);
      ADC_InitStruct->ADC_OpMode = ADC_SW_TRI_MODE;

4. Initialize ADC, then enable ADC.

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

1. Enable the function and clock of ADC module.

   .. code-block:: c

      RCC_PeriphClockCmd(APBPeriph_CTC, APBPeriph_CTC_CLOCK, ENABLE);
      RCC_PeriphClockCmd(APBPeriph_ADC, APBPeriph_ADC_CLOCK, ENABLE);

2. Configure the ADC pinmux according to the pinmux specification.

   For example, call the following functions to use ADC0. It is the same for other ADC pins except the ``BAT_MEAS`` pin.

   .. code-block:: c

      Pinmux_Config(_PA_0, PINMUX_FUNCTION_CAPTOUCH);
      PAD_InputCtrl(_PA_0, DISABLE);
      PAD_PullCtrl(_PA_0, GPIO_PuPd_NOPULL);
      PAD_SleepPullCtrl(_PA_0, GPIO_PuPd_NOPULL);

3. Set the default parameters, and modify ADC mode.

   After that, channel list and other parameters can be modified in ``ADC_InitStruct`` if needed.

   .. code-block:: c

      ADC_StructInit(ADC_InitTypeDef *ADC_InitStruct);
      ADC_InitStruct->ADC_OpMode = ADC_TIM_TRI_MODE;

4. Initialize ADC, then enable ADC.

   .. code-block:: c

      ADC_Init(ADC_InitTypeDef *ADC_InitStruct);
      ADC_Cmd(ENABLE);

5. Select basic timer index with ``tim_idx`` and set timer period with ``period``. Read ADC sample data in :func:`ADCIrqHandle`.

   .. code-block:: c

      ADC_INTConfig(ADC_BIT_IT_CV_END_EN | ADC_BIT_IT_CVLIST_END_EN, ENABLE);
      InterruptRegister((IRQ_FUN)ADCIrqHandle, ADC_IRQ, NULL, INT_PRI_MIDDLE);
      InterruptEn(ADC_IRQ, INT_PRI_MIDDLE);
      ADC_TimerTrigCmd(tim_idx, period, ENABLE);


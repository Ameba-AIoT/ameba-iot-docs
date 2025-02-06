.. _thermal_sensor:

Supported ICs
------------------------
.. table::
   :width: 100%
   :widths: auto

   +------------+------------+----------+----------+----------+
   | IC         | RTL8721Dx  | RTL8726E | RTL8720E | RTL8730E |
   +============+============+==========+==========+==========+
   | Supported  |     N      |     Y    |     Y    |     Y    |
   +------------+------------+----------+----------+----------+


Introduction
------------------------
SoC has integrated a thermal sensor, which can be used to detect and monitor the real-time temperature inside the chip.
It has the following features:

- Measurement range: -40°C ~ 125°C

- Variation: ±1°C (typical), ±3°C (worst)

- Provides low- temperature warning, high-temperature warning and over-temperature protection

- Provides thermal enable and over-temperature protection enable write access control


The temperature protection mechanism is an important feature provided by the thermal sensor, and is implemented as follows:

- When the temperature exceeds the limit high-temperature threshold, an interrupt is sent to the CPU, and the CPU will reduce the frequency and speed.

- When the temperature exceeds the limit low-temperature threshold, an interrupt is sent to the CPU, and the CPU will increase the frequency and speed.

- When the temperature exceeds the limit over-temperature protection threshold, the hardware will be powered down automatically for over-temperature protection.


By default, Realtek's SDK does not automatically adjust the CPU frequency and speed based on the temperature detected by thermal meter. If users need to use this function, please call the thermal related APIs to configure the temperature threshold according to the actual application and heat dissipation conditions.

Usage
----------
The steps of using thermal to get current temperature are as below:

1. Set default parameters.

   After that, thermal threshold, down sample rate and other parameters can be modified in :func:`TM_InitStruct` if needed.

   .. code-block:: c

      TM_StructInit(TM_InitTypeDef *TM_InitStruct);

2. Initialize the thermal.

   .. code-block:: c

      TM_Init(TM_InitTypeDef *TM_InitStruct);

3. Configure interrupt and register interrupt callback function.

   .. code-block:: c

      InterruptRegister((IRQ_FUN)TMIrqHandler, TmIrqNum[CPUID], NULL, 10);
      InterruptEn(TmIrqNum[CPUID], 10);

4. Enable the thermal.

   .. code-block:: c

      TM_Cmd(ENABLE);

5. Enable the thermal interrupt.

   .. code-block:: c

      TM_INTConfig(TM_BIT_IMR_TM_HIGH_WT | TM_BIT_IMR_TM_LOW_WT, ENABLE);

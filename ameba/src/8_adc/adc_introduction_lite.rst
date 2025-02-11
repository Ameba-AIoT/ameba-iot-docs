.. tab:: RTL8726E/RTL8720E


   This chapter describes the usage of the 12-bit analog-to-digital converter (ADC).

   The ADC is a successive-approximation register (SAR) ADC, which includes up to:
   
      - 6 external channels and

      - 2 internal channels.
   
   The ADC supports continuous sampling, software triggered sampling and timer triggered sampling.
   The result of ADC conversion is stored in the result register and can be read on demand.

   The following table shows the description of channels.

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
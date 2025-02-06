.. tab:: RTL8721Dx


   This chapter describes the usage of the 12-bit analog-to-digital converter (ADC).

   The ADC is a successive-approximation register (SAR) ADC, which includes up to:

      - 7 external channels,

      - 1 battery measurement channel and 

      - 1 internal channel.

   The ADC supports continuous sampling, software triggered sampling and timer triggered sampling.
   The result of ADC conversion is stored in the result register and can be read on demand.

   The following table shows the description of channels.

   .. table::
      :width: 100%
      :widths: auto

      +-------------------------+----------------+-----------+-------------------+
      | Channel                 | ADC channel ID | Pin name  | Input voltage (V) |
      +=========================+================+===========+===================+
      | External normal channel | CH0~CH6        | PB13~PB19 | 0~3.3             |
      +-------------------------+----------------+-----------+-------------------+
      | External BAT_MEAS       | CH7            | BAT_MEAS  | 0 ~ 5             |
      +-------------------------+----------------+-----------+-------------------+
      | Internal AVDD33         | CH9            | N/A       | 0~3.3             |
      +-------------------------+----------------+-----------+-------------------+
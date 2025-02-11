.. tab:: RTL8730E

   This chapter describes the usage of the 12-bit analog-to-digital converter (ADC).

   The ADC is a successive-approximation register (SAR) ADC, which includes up to:

   - 6 external channels,
   - 1 battery measurement channel and
   - 1 internal channel.

   The ADC supports continuous sampling, software-trigger sampling and timer-trigger sampling.
   The result of ADC conversion is stored in the result register and can be read on demand.

   The following table shows the description of channels.

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
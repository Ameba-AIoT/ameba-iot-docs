.. tab:: RTL8721Dx

   .. table:: Description of trap pins
      :width: 100%
      :widths: auto

      +----------+--------+--------------+-------------------------------------------------------------------------------+
      | Pin name | Symbol | Active level | Description                                                                   |
      +==========+========+==============+===============================================================================+
      | PB31     | TM_DIS | Low          | Test Mode Disable, default internal pull up.                                  |
      |          |        |              |                                                                               |
      |          |        |              | It is for internal test only and should be logical high for normal operation. |
      |          |        |              |                                                                               |
      |          |        |              | - 1: Normal operation mode                                                    |
      |          |        |              |                                                                               |
      |          |        |              | - 0: Test mode                                                                |
      +----------+--------+--------------+-------------------------------------------------------------------------------+
      | PB5      | UD_DIS | Low          | UART Download Disable, default internal pull up                               |
      |          |        |              |                                                                               |
      |          |        |              | - 1: Enter into normal boot mode                                              |
      |          |        |              |                                                                               |
      |          |        |              | - 0: Enter into UART download mode                                            |
      +----------+--------+--------------+-------------------------------------------------------------------------------+

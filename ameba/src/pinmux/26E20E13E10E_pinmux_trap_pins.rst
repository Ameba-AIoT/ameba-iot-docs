.. tab:: RTL8726E/RTL8720E

   .. table:: Description of trap pins
      :width: 100%
      :widths: auto

      +----------+---------+--------------+----------------------------------------------------------------------------------+
      | Pin name | Symbol  | Active level | Description                                                                      |
      +==========+=========+==============+==================================================================================+
      | PA1      | TM_DIS  | Low          | | Test Mode Disable, default internal pull up                                    |
      |          |         |              | | It is for internal test only and should be logical high for normal operation.  |
      |          |         |              |                                                                                  |
      |          |         |              | - 1: Normal operation mode                                                       |
      |          |         |              |                                                                                  |
      |          |         |              | - 0: Test mode                                                                   |
      +----------+---------+--------------+----------------------------------------------------------------------------------+
      | PA20     | UD_DIS  | Low          | UART Download Disable, default internal pull up                                  |
      |          |         |              |                                                                                  |
      |          |         |              | - 1: Enter into normal boot mode                                                 |
      |          |         |              |                                                                                  |
      |          |         |              | - 0: Enter into UART download mode                                               |
      +----------+---------+--------------+----------------------------------------------------------------------------------+
      | PA22     | PSO_SEL | \-           | Power Supply Option Selection                                                    |
      |          |         |              |                                                                                  |
      |          |         |              | - 1: 1.25V                                                                       |
      |          |         |              |                                                                                  |
      |          |         |              | - 0: 0.9V                                                                        |
      +----------+---------+--------------+----------------------------------------------------------------------------------+

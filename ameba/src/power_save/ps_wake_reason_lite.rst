.. tab:: RTL8726E/RTL8720E

   **SOCPS_AONWakeReason**

   .. table::
      :width: 100%
      :widths: auto

      +--------------+----------------------------------+
      | Items        | Description                      |
      +==============+==================================+
      | Introduction | Get the deep-sleep wakeup reason |
      +--------------+----------------------------------+
      | Parameter    | None                             |
      +--------------+----------------------------------+
      | Return       | - Bit[0]:                        |
      |              |                                  |
      |              |                                  |
      |              |                                  |
      |              |                                  |
      |              |                                  |
      |              |                                  |
      |              |                                  |
      |              |                                  |
      |              |                                  |
      |              |                                  |
      +--------------+----------------------------------+

   **WAK_STATUS0**

   The following register can be used to get the sleep wakeup reason.


   .. table::
      :width: 100%
      :widths: 30, 70

      +-------------+----------------------------+
      | Register    | Parameters                 |
      +=============+============================+
      | WAK_STATUS0 | - Bit[1:0]:                |
      |             |                            |
      +-------------+----------------------------+


   Note that when wakeup, the corresponding peripheral interrupt will be raised; when clearing the interrupt, the corresponding bit in wakeup reason will also be cleared.
   Thus it is not possible to get the wakeup reason after the interrupt is cleared.
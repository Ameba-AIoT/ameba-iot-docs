.. tab:: RTL8726E

   If ``Channel Conflict for Channel xx!`` log shows up, it means two IRQ functions are registered in the same channel.
   For example, if IRQFunc1 and IRQFunc2 are both registered in KM4 for KR4 to KM4 channel 1, the log will show up as below.

   .. code-block:: c

      14:23:03.905 [MODULE_IPC-LEVEL_ERROR]: Channel Conflict for Channel 25!
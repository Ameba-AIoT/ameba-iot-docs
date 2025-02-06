.. tab:: RTL8730E

   If ``Channel Conflict for CPU xx Channel xx!`` log shows up, it means two IRQ functions are registered in the same channel. 
   For example, if IRQFunc1 and IRQFunc2 are both registered in KM4 for KM0 to KM4 channel1, the log will show up as below.

   .. code-block::

      [MODULE_IPC-LEVEL_ERROR]: Channel Conflict for Channel 25!

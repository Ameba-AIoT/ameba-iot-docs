.. tab:: RTL8721Dx

   If ``Channel Conflict for CPU xx Channel xx!`` log shows up, it means two IRQ functions are registered in the same channel.
   For example, if IRQFunc1 and IRQFunc2 are both registered in KM4 for KM0 to KM4 channel1, the log will show up as below.

   .. code::

      14:23:03.905 [MODULE_IPC-LEVEL_ERROR]: Channel Conflict for CPU 1 Channel1 ! Ignore If CPU Has Reset

   .. figure:: figures/ipc_troubleshooting.png
      :scale: 80%
      :align: center


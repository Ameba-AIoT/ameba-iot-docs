.. tab:: RTL8726E

   A hardware SYSON power management control module (SYSON PMC) is designed to control the clock and power of NP, and then NP controls the clock and power of AP.
   When the system enters sleep mode, CPUs can select to enter clock-gating (CG) or power-gating (PG) mode, while SYSON PMC maintained active to wake up NP when wakeup sources are triggered.

   Sleep and wakeup flow of sleep mode can be described as:

   - In terms of sleep flow, NP helps close the clock or power of AP and DSP, and SYSON PMC helps close the clock or power of NP.
   - In terms of wakeup flow, SYSON PMC helps open the clock or power of NP, and NP helps open the power or clock of AP and DSP.

   .. note::

      - Both KM4 and KR4 can be configured as NP. If KR4 is configured as NP, KM4 is considered as AP.
      - The mode of memory is configurable when the system enters sleep mode. The retention mode is recommended for the balance between power saving and data retention.

   In deep-sleep mode, only the memory in AON domain can be maintained, while memory in other domains will be shut down. So CPU cannot restore the stack status.

   Various wakeup sources are provided and every wakeup source can be configured to wake up NP or AP according to user's requirement.
   AON is special because it is mater switch that manages all the wake-up sources in AON domain. Only wakeup sources in AON domain can wake up the system from deep-sleep mode.

   .. include:: ps_wake_source_lite.rst
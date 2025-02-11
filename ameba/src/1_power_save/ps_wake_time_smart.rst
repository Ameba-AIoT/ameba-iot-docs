.. tab:: RTL8730E

   CPU can execute IRQ handler when the system is wakeup. The time between the wakeup event generating and CPU executing IRQ handler was defined as wakeup time.

   Take LP CG + NP PG + AP PG for example:

   .. table::
      :width: 100%
      :widths: auto

      +---------------+-------+---------+--------------+
      | CPU to wakeup | LP    | LP + NP | LP + NP + AP |
      +===============+=======+=========+==============+
      | Wakeup time   | 2.8ms | 3.5ms   |              |
      +---------------+-------+---------+--------------+

   It takes about 2.8ms to wake LP only and 3.5ms to wake both LP and NP in LP CG + NP PG mode.

   For LP, 1.6ms to initialize hardware (mainly XTAL), 1.1ms to execute critical code, and 200-300us to enter IRQ handler.

.. tab:: RTL8721Dx

   The block diagram of TRNG is shown as below.

   .. figure:: figures/trng_block_diagram.svg
      :scale: 100%
      :align: center

      TRNG block diagram

   The TRNG includes the following sub-modules:

   - Clock

      - TRNG bus clock is 40MHz.

   - Noise Source

      - The noise source is digital OSC, as a random number source, it is internally composed of ring oscillator.

   - TRNG control

      - A bit is added to control whether the control register can be accessed from non-secure world.

      - Ensure that the default setting for OSC can work. ROM will use it only without configuring ROSC.

      - This area is the real control register, and the Control_S is the access window in the secure world, Control_NS is the access window in the non-secure world.

   - Debias and LFSR and Extractor

      - A serial post-processing circuit

   - RCT and APT

      - Two health tests of NIST specification

   - Control_S

      - This area is the access window in the secure world; the real address is "Control".

   - Status_S

      - Indicates the available data in FIFO_S.

      - Indicates whether an error has happened.

   - FIFO_S

      - FIFO size is 256 bits.

      - Only have one window register instead of all the registers.

      - Read and return all zero when FIFO is empty.

      - When the available data is less than 128 bits, hardware will fill the FIFO_S to full in a high priority.

   - Control_NS

      - This area is the access window in the non-secure world; the real address is "Control".

      - Only can be accessed when S bit in Control is 0.

   - Status_NS

      - Indicates the available data in FIFO_NS

      - Indicates whether an error has happened.

   - FIFO_NS
      - FIFO size is 128 bits.

      - Only have one window register instead of all the registers.

      - Read and returns all zero when FIFO is empty.

      - This FIFO has a lower priority than FIFO_S. If available data is less than 128 bits in FIFO_S, hardware will not feed any data to this FIFO.

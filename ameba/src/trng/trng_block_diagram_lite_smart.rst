.. tab:: RTL8726E/RTL8720E/RTL8730E

   The block diagram of TRNG is shown as below.

   .. figure:: figures/trng_block_diagram_lite_smart.svg
      :scale: 100%
      :align: center

      TRNG block diagram

   The TRNG includes the following sub-modules:

   - PLL

      - The PLL is a 300MHz~660MHz clock, and will be enabled by hardware.

   - Analog ROSC

      - The ROSC is a dedicated OSC, it can generate a random clock of 4MHz ~ 7MHz.

      - Take how to avoid power leakage into consideration when TRNG is power off.

   - Speed sensor

      - Use APB clock, 40MHz.

   - TRNG control

      - A bit is added to control whether the control register can be accessed from non-secure world.

      - Ensure that the default setting for OSC can work. ROM will use it only without configuring ROSC.

      - This area is the real control register, and the Control_S is the access window in the secure world, Control_NS is the access window in the non-secure world.

   - Health check and error detect

      - This block should work with the default setting.

      - Any error can trigger an interrupt, which will be used by software to reset the whole TRNG.

      - This block has an internal 1024 bits FIFO, which guarantees all the output has passed the APT test.

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

      - All the registers can be accessed only when ``SECURITY_CONTROL`` filed in Control Register is 0xA.

   - Status_NS

      - Indicates the available data in FIFO_NS

      - Indicates whether an error has happened.

   - FIFO_NS
      - FIFO size is 128 bits.

      - Only have one window register instead of all the registers.

      - Read and returns all zero when FIFO is empty.

      - This FIFO has a lower priority than FIFO_S. If available data is less than 128 bits in FIFO_S, hardware will not feed any data to this FIFO.

   Usage
   ----------
   - If you need to run the system with security attributes, it is suggested to configure TRNG as secure so that the Control Register can only be accessed from secure world.

   - When a large amount of random data is required both by secure world and non-secure world simultaneously, request from secure world will be satisfied first for the former has a higher priority. After the request from secure world ends, random data will be generated to satisfy non-secure world.

   - It is suggested to call ``_rand()`` function to get a 32-bit random data.


.. tab:: RTL8730E

   With the increasing density of DRAM, its memory cells become smaller and smaller, and the stored charge decreases. As a result, the noise tolerance between memory cells is reduced, resulting in the interaction of charges between two independent memory cells. Row hammer is caused by this defect in the design of memory hardware chip. Its principle is to repeatedly read and write the peer address in DRAM memory unit, so that the charge leakage occurs in adjacent rows, and the bit reversal phenomenon occurs in adjacent rows, that is, 0 is reversed to 1, and 1 is reversed to 0.

   Therefore, when a large number of accesses are made to PSRAM in a short time, if the refresh frequency is not enough, the MEM space of every 2K (i.e. two rows) will affect each other. When we perform a large number of continuous write operations on a line, the charges of adjacent lines will be affected and the value will change.

   Row hammer is an inherent weakness of PSRAM. If the cache is not turned on, it may be hit by excessive load. When the cache is turned on, we have tested that APM PSRAM is safe on AP. The test conditions are as follows:

   1. AP clock is 1.2GHz.

   2. In write back mode.

   3. Every 4K bytes of memory is a group, write the first 800 bytes 8W times (cache flush for each 800 bytes), and then check whether the values of other unwritten memories have changed by reading.

   .. note::
      If you want to set memory to non-cache attribute through MMU or MPU, take the boundary of row hammer into consideration.

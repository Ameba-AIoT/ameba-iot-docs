.. tab:: RTL8730E

   PSRAM supports direct access and DMA access. The throughput of PSRAM is listed in the following table.

   .. table:: Throughput of PSRAM (250MHz)
      :width: 100%
      :widths: auto

      +---------------+-------------------------------------------+----------------------------------------------+
      | Access mode   | Writing 32 bytes                          | Reading 32 bytes                             |
      +               +------------------+------------------------+------------------+---------------------------+
      |               | Theory (Mbps)    | Test on NP (Mbps)      | Theory (Mbps)    | Test on NP (Mbps)         |
      +===============+==================+========================+==================+===========================+
      | Direct access | 1939.394         | (32*8)/(123ns)=2081.30 | 1882.353         | (32*8)/(152ns)=1684.21    |
      |               |                  |                        |                  |                           |
      | (write back)  |                  |                        |                  |                           |
      +---------------+                  +------------------------+                  +---------------------------+
      | DMA access    |                  | (32*8)/(180ns)=1422.22 |                  | (32*8)/(175.60ns)=1457.85 |
      +---------------+------------------+------------------------+------------------+---------------------------+

   .. note::
      - Throughput theoretical calculation:

      - The test data above takes fixed initial latency, so there will be 2 times initial latency depending on RWDS.
      - The header overlaps with delay by 1T.
      - Since it is DDR PSRAM, 16T is used to transmit 32 bytes.

      - Direct access:

      - By default, we will assign the cache attribute to PSRAM. Therefore, when testing the access performance of PSRAM, we need to consider the cache attribute comprehensively.
      - In the operation of reading 4 bytes, if read hit (that is, the address data is stored in the cache), the CPU directly reads 4bytes from the cache. If read miss (the address data is not in the cache), it needs to read a cache line size data from PSRAM to the cache.
      - In the operation of writing 4 bytes, if write hit (the address data exists in the cache), the content of the address in the cache will be updated, and then a cacheline size will be updated to PSRAM when the cache flush. If write miss ( the address to be written is not in the cache), based on the write allocate policy, the CPU will first read a cacheline size data from PSRAM to the cache, and then update the content in the cache.
      - The read / write throughput data in the table is measured based on read miss / cache flush, which requires access to PSRAM. TP of write allocate is equal to TP of read miss.
      - Instruction execution time also needs to be taken into consideration.

   .. table:: PSRAM throughput theoretical calculation
      :width: 100%
      :widths: auto

      +------------------------------+---------------------------------------------+---------------------------------------------+
      | Item                         | Writing 32 bits (In fact, writing 32 bytes) | Reading 32 bits (In fact, reading 32 bytes) |
      +==============================+=============================================+=============================================+
      | Header + delay               | [3 +(14-1)] * 4ns = 64ns                    | [3 + (14-1)] * 4ns = 64ns                   |
      +------------------------------+---------------------------------------------+---------------------------------------------+
      | Data transmit period         | 16 * 4ns =64ns                              | 16 * 4ns = 64ns                             |
      +------------------------------+---------------------------------------------+---------------------------------------------+
      | Hardware hold                | 1 * 4ns =4ns                                | 2 * 4ns = 8ns                               |
      +------------------------------+---------------------------------------------+---------------------------------------------+
      | Total without considering    | 64ns + 64ns + 4ns = 132ns                   | 64ns + 64ns + 8ns = 136ns                   |
      |                              |                                             |                                             |
      | instruction execution time   |                                             |                                             |
      +------------------------------+---------------------------------------------+---------------------------------------------+
      | Throughput theoretical value | (32*8) / 132ns = 1939.394Mbps               | (32*8) / 136ns = 1882.353Mbps               |
      +------------------------------+---------------------------------------------+---------------------------------------------+

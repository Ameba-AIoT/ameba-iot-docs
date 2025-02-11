.. tab:: RTL8720EA

   .. note::
      - Throughput theoretical calculation:

         - The test data above takes variable initial latency, so there will be 1 or 2 times initial latency depending on RWDS.

         - The header overlaps with delay by 1T.

         - Since it is DDR PSRAM, 16T is used to transmit 32 bytes.

      - Direct access:

         - By default, we will assign the cache attribute to PSRAM. Therefore, when testing the access performance of PSRAM, we need to consider the cache attribute comprehensively.

         - In the operation of reading 4 bytes, if read hit (that is, the address data is stored in the cache), the CPU directly reads 4bytes from the cache. If read miss (the address data is not in the cache), it needs to read a cache line size data from PSRAM to the cache.

         - In the operation of writing 4 bytes, if write hit (the address data exists in the cache), the content of the address in the cache will be updated, and then a cacheline size will be updated to PSRAM when the cache flush. If write miss (the address to be written is not in the cache), based on the write allocate policy, the CPU will first read a cacheline size data from PSRAM to the cache, and then update the content in the cache.

         - The read / write throughput data in the table is measured based on read miss / cache flush, which requires access to PSRAM. TP of write allocate is equal to TP of read miss.

         - Instruction execution time also needs to be taken into consideration.

      .. table:: PSRAM throughput theoretical calculation
         :width: 100%
         :widths: auto

         +------------------------------+-------------------------------------------------------------+-------------------------------------------------------------+
         | Item                         | Writing 32 bits                                             | Reading 32 bits                                             |
         +==============================+=============================================================+=============================================================+
         | Header + delay               | [3 + (6 or 12) -1] * (1000/150)ns                           | [3 + (6 or 12) -1] * (1000/150)ns                           |
         +------------------------------+-------------------------------------------------------------+-------------------------------------------------------------+
         | Data transmit period         | 16 * (1000/150)ns                                           | 16 * (1000/150)ns                                           |
         +------------------------------+-------------------------------------------------------------+-------------------------------------------------------------+
         | Hardware hold                | 1 * (1000/150)ns                                            | 2 * (1000/150)ns                                            |
         +------------------------------+-------------------------------------------------------------+-------------------------------------------------------------+
         | Total without considering    | [(8 or 14) + 16 +1] * (1000/150)ns = (166.667 or 206.667)ns | [(8 or 14) + 16 +2] * (1000/150)ns = (173.333 or 213.333)ns |
         |                              |                                                             |                                                             |
         | instruction execution time   |                                                             |                                                             |
         +------------------------------+-------------------------------------------------------------+-------------------------------------------------------------+
         | Throughput theoretical value | 32*8/(166.667 or 206.667)ns = (1536 or 1238.71)Mbps         | (32*8)/(173.333 or 213.333)ns = (1476.923 or 1200)Mbps      |
         +------------------------------+-------------------------------------------------------------+-------------------------------------------------------------+

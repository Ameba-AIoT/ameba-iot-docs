.. tab:: RTL8721Dx

   PSRAM supports direct access and DMA access. The throughput of PSRAM is listed in the following table.

   .. table:: Throughput of PSRAM (200MHz)
      :width: 100%
      :widths: auto

      +---------------+------------------+-------------------------------+------------------+-------------------------------+
      |               | Writing 32 bytes                                 | Reading 32 bytes                                 |
      | Access mode   +------------------+-------------------------------+------------------+-------------------------------+
      |               | Theory           | Test on the KM4               | Theory           | Test on the KM4               |
      +---------------+------------------+-------------------------------+------------------+-------------------------------+
      | Direct access | 1523.81Mbps      | (32*8)/(199.68ns)=1282.05Mbps | 1454.55Mbps      | (32*8)/(212.16ns)=1204.14Mbps |
      |               |                  |                               |                  |                               |
      | (write back)  |                  |                               |                  |                               |
      +---------------+------------------+-------------------------------+------------------+-------------------------------+
      | DMA access    | 2206.9Mbps       | 1641.03Mbps                   | 2133.33Mbps      | 1172.16Mbps                   |
      +---------------+------------------+-------------------------------+------------------+-------------------------------+

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

      +------------------------------------------------------+---------------------------+----------------------------+
      | Item                                                 | Writing 32 bits           | Reading 32 bits            |
      +======================================================+===========================+============================+
      | Header + delay                                       | [3 +22] * 4ns = 100ns     | [3 + 23] * 4ns = 104ns     |
      +------------------------------------------------------+---------------------------+----------------------------+
      | Data transmit period                                 | 2 * 4ns =8ns              | 16 * 4ns = 64ns            |
      +------------------------------------------------------+---------------------------+----------------------------+
      | Hardware hold                                        | 1 * 4ns =4ns              | 2 * 4ns = 8ns              |
      +------------------------------------------------------+---------------------------+----------------------------+
      | Total without considering instruction execution time | 100ns + 8ns + 4ns = 112ns | 104ns + 64ns + 8ns = 176ns |
      +------------------------------------------------------+---------------------------+----------------------------+
      | Throughput theoretical value                         | 32/112ns = 285.71Mbps     | (32x8)/176ns = 1454.55Mbps |
      +------------------------------------------------------+---------------------------+----------------------------+

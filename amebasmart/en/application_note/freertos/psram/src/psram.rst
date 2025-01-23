.. _psram:

Introduction
------------------------
Pseudo-Static Random Access Memory (PSRAM) is used for high-speed transmission of the data stream. The |CHIP_NAME| communicates with PSRAM via PSRAM controller (PSRAMC). PSRAM can be accessed by NP, LP and AP, and supports execution on PSRAM.

The features of PSRAM are:

- Clock rate: 250MHz
- Density: 64M bits
- Double Data Rate (DDR)
- Read-Write Data Strobe (DQS)
- Supports Half sleep and deep power-down mode
- Programmable drive strength
- Configurable refresh rate
- Temperature Compensated Refresh
- 16/32/64/1024 bytes wrap burst access
- Address mapping: 0x6000_0000~0x6080_0000

Throughput
--------------------
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

Boot from PSRAM
------------------------------
If the PSRAM is embedded in the chip, follow these steps to boot from PSRAM in the SDK.

1. Enable the power supply of PSRAM in the bootloader

2. Initialize the PSRAM controller, PSRAM PHY and PSRAM device to synchronize the relevant parameters

3. Calibrate the PSRAM

.. code-block:: c

   RCC_PeriphClockCmd(APBPeriph_PSRAM, APBPeriph_PSRAM_CLOCK, ENABLE);
   DBG_PRINT(MODULE_BOOT, LEVEL_INFO, "Init PSRAM\r\n");
   BOOT_PSRAM_Init();

PSRAM Cache “Write Back” Policy
--------------------------------------------------------------
When a cache hit occurs on a store access, the data is only written to the cache. Data in the cache can therefore be more up-to-date than data in memory. Any such data is written back to memory when the cache line is cleaned or reallocated. Another common term for a write-back cache is a copy-back cache.

By default, we will assign the cache attribute to PSRAM. For CPU, only when read miss/cache flush/write allocate will access PSRAM, one cache line at a time.

Row Hammer
~~~~~~~~~~~~~~~~~~~~
With the increasing density of DRAM, its memory cells become smaller and smaller, and the stored charge decreases. As a result, the noise tolerance between memory cells is reduced, resulting in the interaction of charges between two independent memory cells. Row hammer is caused by this defect in the design of memory hardware chip. Its principle is to repeatedly read and write the peer address in DRAM memory unit, so that the charge leakage occurs in adjacent rows, and the bit reversal phenomenon occurs in adjacent rows, that is, 0 is reversed to 1, and 1 is reversed to 0.

Therefore, when a large number of accesses are made to PSRAM in a short time, if the refresh frequency is not enough, the MEM space of every 2K (i.e. two rows) will affect each other. When performing a large number of continuous write operations on a line, the charges of adjacent lines will be affected and the value will change.

Row hammer is an inherent weakness of PSRAM. If the cache is not turned on, it may be hit by excessive load. When the cache is turned on, we have tested that APM PSRAM is safe on AP. The test conditions are as follows:

1. AP clock is 1.2GHz.

2. In write back mode.

3. Every 4K bytes of memory is a group, write the first 800 bytes 8W times (cache flush for each 800 bytes), and then check whether the values of other unwritten memories have changed by reading.

.. note::
   If you want to set memory to non-cache attribute through MMU or MPU, take the boundary of row hammer into consideration.

Notice
~~~~~~~
Cache Operation
^^^^^^^^^^^^^^^^
On the “Write Back” policy, the synchronization operations need to be taken between cache and PSRAM to keep content consistency, especially for multiple access by different sources, e.g. CPU, serial ports and peripherals.

As the cache lines of NP/LP cache are 32 bytes, AP cache is 64 bytes, and cache operations are all based on the cache line. So the buffer size and buffer starting address are recommended to be 64 bytes aligned to avoid synchronization issues.

DMA Operation
^^^^^^^^^^^^^^
The following steps should be added when executing DMA Rx/Tx.

.. table::
   :width: 100%
   :widths: auto

   +-----------+----------------------------------------------------------------------------------------------------------------+
   | Operation | Step                                                                                                           |
   +===========+================================================================================================================+
   | DMA Rx    | 1. Prepare Rx buffer                                                                                           |
   |           |                                                                                                                |
   |           | 2. Do :func:`DCache_CleanInvalidate` to avoid cache flush during DMA Rx                                        |
   |           |                                                                                                                |
   |           | 3. Do DMA Rx config                                                                                            |
   |           |                                                                                                                |
   |           | 4. Trigger DMA Rx interrupt                                                                                    |
   |           |                                                                                                                |
   |           | 5. Do :func:`DCache_Invalidate` in Rx Done Handler to clean the old data,                                      |
   |           |    to avoid the problem that the data in the cache is inconsistent with the data in the memory after RX done   |
   |           |    if the CPU read or write allocate the Dst buf during GDMA transmission.                                     |
   |           |                                                                                                                |
   |           |    .. note::                                                                                                   |
   |           |                                                                                                                |
   |           |       During GDMA transmission, it is forbidden to write or cache flush DST buffer.                            |
   |           |       (Taking :file:`{SDK}/component/example/peripheral/raw/UART/uart_dma_stream/src/main.c` for example,      |
   |           |       :mod:`uart_recv_string_done` is DMA Rx Done Interrupt Handler)                                           |
   |           |                                                                                                                |
   |           |       .. code-block:: c                                                                                        |
   |           |                                                                                                                |
   |           |          u32 uart_recv_string_done(void * data)                                                                |
   |           |          {                                                                                                     |
   |           |              UNUSED(data);                                                                                     |
   |           |              // To solve the cache consistency problem, DMA mode needs it                                      |
   |           |              DCache_Invalidate((u32)rx_buf, SRX_BUF_SZ);                                                       |
   |           |              dma_free();                                                                                       |
   |           |              rx_done = 1;                                                                                      |
   |           |              return 0;                                                                                         |
   |           |          }                                                                                                     |
   |           |                                                                                                                |
   |           | 6. CPU reads Rx Buffer                                                                                         |
   +-----------+----------------------------------------------------------------------------------------------------------------+
   | DMA Tx    | 1. CPU prepares Tx buffer data                                                                                 |
   |           |                                                                                                                |
   |           | 2. Do :func:`DCache_CleanInvalidate` for SRC buffer to synchronize the data                                    |
   |           |                                                                                                                |
   |           | 3. Do DMA Tx configuration                                                                                     |
   |           |                                                                                                                |
   |           | 4. Trigger DMA Tx interrupt                                                                                    |
   +-----------+----------------------------------------------------------------------------------------------------------------+

In SDK, only the example of one-time :mod:`xxx_GDMA_Init` one-time transmission is illustrated. Step 2 is included in :mod:`xxx_GDMA_Init` by default.

If you need multi-time DMA Tx/Rx with only one-time :mod:`xxx_GDMA_Init`, :func:`DCache_CleanInvalidate` should be called every time before DMA transmission starts.

.. table::
   :width: 100%
   :widths: auto

   +-------------------------------------------------------+-------------------------------------------------------+
   | .. code-block:: c                                     | .. code-block:: c                                     |
   |                                                       |                                                       |
   |    BOOL UART_TXGDMA_Init(                             |    BOOL UART_RXGDMA_Init(                             |
   |       u8 UartIndex,                                   |       u8 UartIndex,                                   |
   |       GDMA_InitTypeDef * GDMA_InitStruct,             |       GDMA_InitTypeDef * GDMA_InitStruct,             |
   |       void *CallbackData,                             |       void *CallbackData,                             |
   |       IRQ_FUN CallbackFunc,                           |       IRQ_FUN CallbackFunc,                           |
   |       u8 *pTxBuf,                                     |       u8 *pRxBuf,                                     |
   |       int TxCount                                     |       int RxCount                                     |
   |    )                                                  |    )                                                  |
   |    {                                                  |    {                                                  |
   |       u8 GdmaChnl;                                    |       u8 GdmaChnl;                                    |
   |                                                       |       UART_TypeDef * UARTx;                           |
   |       assert_param(GDMA_InitStruct != NULL);          |       assert_param(GDMA_InitStruct != NULL);          |
   |                                                       |                                                       |
   |       DCache_CleanInvalidate((u32)pTxBuf, TxCount);   |       DCache_CleanInvalidate((u32)pRxBuf, RxCount);   |
   |    }                                                  |    }                                                  |
   +-------------------------------------------------------+-------------------------------------------------------+


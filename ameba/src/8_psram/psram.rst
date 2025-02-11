.. _psram:

Introduction
------------------------
.. tabs::

   .. include:: 21Dx_psram_introduction.rst
   .. include:: 20EA10EC_psram_introduction.rst
   .. include:: 26EA13EC_psram_introduction.rst
   .. include:: 30E_psram_introduction.rst

Throughput
--------------------
.. tabs::

   .. include:: 21Dx_psram_throughput.rst
   .. include:: 20EA10EC_psram_throughput.rst
   .. include:: 26EA13EC_psram_throughput.rst
   .. include:: 30E_psram_throughput.rst

Boot from PSRAM
------------------------------
If the PSRAM is embedded in the chip, follow these steps to boot from PSRAM in the SDK.

1. Enable the power supply of PSRAM in the bootloader

2. Initialize the PSRAM controller, PSRAM PHY and PSRAM device to synchronize the relevant parameters

3. Calibrate the PSRAM

.. code-block:: C

   RCC_PeriphClockCmd(APBPeriph_PSRAM, APBPeriph_PSRAM_CLOCK, ENABLE);
   DBG_PRINT(MODULE_BOOT, LEVEL_INFO, "Init PSRAM\r\n");
   BOOT_PSRAM_Init();

PSRAM Cache “Write Back” Policy
--------------------------------------------------------------
When a cache hit occurs on a store access, the data is only written to the cache. Data in the cache can therefore be more up-to-date than data in memory. Any such data is written back to memory when the cache line is cleaned or reallocated. Another common term for a write-back cache is a copy-back cache.
By default, we will assign the cache attribute to PSRAM. For CPU, only when read miss/cache flush/write allocate will access PSRAM, one cache line at a time.

Row Hammer
~~~~~~~~~~~~~~~~~~~~
.. tabs::

   .. include:: 21Dx_psram_row_hammer.rst
   .. include:: 20EA10EC_psram_row_hammer.rst
   .. include:: 26EA13EC_psram_row_hammer.rst
   .. include:: 30E_psram_row_hammer.rst


Notice
~~~~~~~~~~~~
Cache Operation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
On the “Write Back” policy, the synchronization operations need to be taken between cache and PSRAM to keep content consistency, especially for multiple access by different sources, e.g. CPU, serial ports and peripherals.

.. tabs::

   .. include:: 21Dx_psram_cache_operation.rst
   .. include:: 20EA10EC_psram_cache_operation.rst
   .. include:: 26EA13EC_psram_cache_operation.rst
   .. include:: 30E_psram_cache_operation.rst

DMA Operation
^^^^^^^^^^^^^^^^^^^^^^^^^^
The following steps should be added when executing DMA Rx/Tx.

.. table::
   :width: 100%
   :widths: auto

   +-----------+-------------------------------------------------------------------------------------------------------------------+
   | Operation | Step                                                                                                              |
   +===========+===================================================================================================================+
   | DMA Rx    | 1. Prepare Rx buffer                                                                                              |
   |           |                                                                                                                   |
   |           | 2. Do :func:`DCache_CleanInvalidate()` to avoid cache data write back during DMA Rx                               |
   |           |                                                                                                                   |
   |           | 3. Do DMA Rx config                                                                                               |
   |           |                                                                                                                   |
   |           | 4. Trigger DMA Rx interrupt                                                                                       |
   |           |                                                                                                                   |
   |           | 5. Do :func:`DCache_Invalidate()` in Rx Done Handler to clean the old data                                        |
   |           |                                                                                                                   |
   |           |    .. note::                                                                                                      |
   |           |                                                                                                                   |
   |           |       During GDMA transmission, it is forbidden to write or cache flush DST buffer.                               |
   |           |       (Taking :file:`{SDK}\\component\\example\\peripheral\\raw\\uart\\uart_dma_stream\\src\\main.c` for example, |
   |           |       :mod:`uart_recv_string_done` is DMA Rx Done Interrupt Handler)                                              |
   |           |                                                                                                                   |     
   |           |       .. code-block:: c                                                                                           |
   |           |                                                                                                                   |
   |           |          u32 uart_recv_string_done(void *data)                                                                    | 
   |           |          {                                                                                                        |    
   |           |            UNUSED(data);                                                                                          |
   |           |            /* To solve the cache consistency problem, DMA mode needs it */                                        |
   |           |            DCache_Invalidate((u32)rx_buf, SRX_BUF_SZ);                                                            |
   |           |            dma_free();                                                                                            |
   |           |            rx_done = 1;                                                                                           |
   |           |            return 0;                                                                                              |
   |           |           }                                                                                                       |
   |           | 6. CPU reads Rx buffer                                                                                            |
   +-----------+-------------------------------------------------------------------------------------------------------------------+
   | DMA Tx    | 1. CPU prepares Tx buffer data                                                                                    |
   |           |                                                                                                                   |
   |           | 2. Do :func:`DCache_CleanInvalidate()` for Tx buffer to synchronize the data                                      |
   |           |                                                                                                                   |
   |           | 3. Do DMA Tx configuration                                                                                        |
   |           |                                                                                                                   |
   |           | 4. Trigger DMA Tx interrupt                                                                                       |
   +-----------+-------------------------------------------------------------------------------------------------------------------+

In SDK, only the example of one-time xxx_GDMA_Init one-time transmission is illustrated. Step 2 is included in ``xxx_GDMA_Init`` by default.


If you need multi-time DMA Tx/Rx with only one-time xxx_GDMA_Init, ``DCache_CleanInvalidate()`` should be called every time before DMA transmission starts.

.. tabs::

   .. include:: 21Dx_psram_dma_onetime_init.rst
   .. include:: 20EA10EC_psram_dma_onetime_init.rst
   .. include:: 26EA13EC_psram_dma_onetime_init.rst
   .. include:: 30E_psram_dma_onetime_init.rst

TCEM Setting
------------------------
.. tabs::

   .. include:: 21Dx_psram_tcem_setting.rst
   .. include:: 20EA10EC_psram_tcem_setting.rst
   .. include:: 26EA13EC_psram_tcem_setting.rst
   .. include:: 30E_psram_tcem_setting.rst




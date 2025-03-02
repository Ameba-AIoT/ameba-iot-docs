Cache
==========

Introduction
--------------------------------------------
The Cache of Soc supports Enable/Disable, Flush and Clean operation, as following table lists.



.. table:: Enable/Disable, Flush and Clean operation supported by Cache
   :width: 100%
   :widths: auto

   +--------------------+--------------------------------------------------------------------------------+---------+---------+
   | Operation          | Description                                                                    | I-Cache | D-Cache |
   +====================+================================================================================+=========+=========+
   | Enable/Disable     | Enable or Disable Cache function                                               | √       | √       |
   +--------------------+--------------------------------------------------------------------------------+---------+---------+
   | Flush (Invalidate) | - Flush Cache                                                                  | √       | √       |
   |                    |                                                                                |         |         |
   |                    | - D-Cache can be flushed by address                                            |         |         |
   |                    |                                                                                |         |         |
   |                    | - Can be used after DMA Rx, and CPU reads DMA data from DMA buffer for D-Cache |         |         |
   +--------------------+--------------------------------------------------------------------------------+---------+---------+
   | Clean              | - Clean D-Cache                                                                | x       | √       |
   |                    |                                                                                |         |         |
   |                    | - D-Cache will be write back to memory                                         |         |         |
   |                    |                                                                                |         |         |
   |                    | - D-Cache can be cleaned by address                                            |         |         |
   |                    |                                                                                |         |         |
   |                    | - Can be used before DMA Tx, after CPU writes data to DMA buffer for D-Cache   |         |         |
   +--------------------+--------------------------------------------------------------------------------+---------+---------+



Cache Boot Status
--------------------
In the ROM code, the default states of Cache are:

.. tabs::

   .. include:: cache_boot_status_21Dx.rst
   .. include:: cache_boot_status_20EA26EA.rst
   .. include:: cache_boot_status_30E.rst




Cache APIs
--------------------
ICache_Enable
~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+----------------+
   | Items        | Description    |
   +==============+================+
   | Introduction | Enable I-Cache |
   +--------------+----------------+
   | Parameters   | None           |
   +--------------+----------------+
   | Return       | None           |
   +--------------+----------------+

ICache_Disable
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+-----------------+
   | Items        | Description     |
   +==============+=================+
   | Introduction | Disable I-Cache |
   +--------------+-----------------+
   | Parameters   | None            |
   +--------------+-----------------+
   | Return       | None            |
   +--------------+-----------------+

ICache_Invalidate
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+--------------------+
   | Items        | Description        |
   +==============+====================+
   | Introduction | Invalidate I-Cache |
   +--------------+--------------------+
   | Parameters   | None               |
   +--------------+--------------------+
   | Return       | None               |
   +--------------+--------------------+

DCache_IsEnabled
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+------------------------------+
   | Items        | Description                  |
   +==============+==============================+
   | Introduction | Check D-Cache enabled or not |
   +--------------+------------------------------+
   | Parameters   | None                         |
   +--------------+------------------------------+
   | Return       | D-Cache enable status:       |
   |              |                              |
   |              | - 1: Enable                  |
   |              |                              |
   |              | - 0: Disable                 |
   +--------------+------------------------------+

DCache_Enable
~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+----------------+
   | Items        | Description    |
   +==============+================+
   | Introduction | Enable D-Cache |
   +--------------+----------------+
   | Parameters   | None           |
   +--------------+----------------+
   | Return       | None           |
   +--------------+----------------+

DCache_Disable
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+-----------------+
   | Items        | Description     |
   +==============+=================+
   | Introduction | Disable D-Cache |
   +--------------+-----------------+
   | Parameters   | None            |
   +--------------+-----------------+
   | Return       | None            |
   +--------------+-----------------+

DCache_Invalidate
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+--------------------------------------------------------------+
   | Items        | Description                                                  |
   +==============+==============================================================+
   | Introduction | Invalidate D-Cache by address                                |
   +--------------+--------------------------------------------------------------+
   | Parameters   | - Address: Invalidated address (aligned to 32-byte boundary) |
   |              |                                                              |
   |              | - Bytes: Size of memory block (in number of bytes)           |
   +--------------+--------------------------------------------------------------+
   | Return       | None                                                         |
   +--------------+--------------------------------------------------------------+

DCache_Clean
~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+---------------------------------------------------------------+
   | Items        | Description                                                   |
   +==============+===============================================================+
   | Introduction | Clean D-Cache by address                                      |
   +--------------+---------------------------------------------------------------+
   | Parameters   | - Address: Clean address (aligned to 32-byte boundary)        |
   |              |                                                               |
   |              | - Bytes: size of memory block (in number of bytes)            |
   |              |                                                               |
   |              | .. note:: Address set 0xFFFFFFFF is used to clean all D-Cache.|
   +--------------+---------------------------------------------------------------+
   | Return       | None                                                          |
   +--------------+---------------------------------------------------------------+

DCache_CleanInvalidate
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+---------------------------------------------------------------------------+
   | Items        | Description                                                               |
   +==============+===========================================================================+
   | Introduction | Clean and invalidate D-Cache by address                                   |
   +--------------+---------------------------------------------------------------------------+
   | Parameters   | - Address: Clean and invalidated address (aligned to 32-byte boundary)    |
   |              |                                                                           |
   |              | - Bytes: size of memory block (in number of bytes)                        |
   |              |                                                                           |
   |              | .. note:: Address set 0xFFFFFFFF is used to clean and flush all D-Cache.  |
   +--------------+---------------------------------------------------------------------------+
   | Return       | None                                                                      |
   +--------------+---------------------------------------------------------------------------+

How to Define a Non-cacheable Data Buffer
----------------------------------------------------------------------------------
Add *SRAM_NOCACHE_DATA_SECTION* before the buffer definition to define a data buffer with non-cacheable attribute.

.. code-block:: c

   SRAM_NOCACHE_DATA_SECTION u8 noncache_buffer[DATA_BUFFER_SIZE];

.. Caution::
   - For KR4: non-cacheable attributes can only be defined through MCCA registers, which means a data buffer cannot be defined with non-cacheable attribute.
   - For DSP: to operate the DSP Cache memories, refer to \ *Xtensa LX7 Microprocessor Data Book and Xtensa System Software Reference Manual*\  for more information.


.. _cache_consistency_using_dma:

Cache Consistency When Using DMA
----------------------------------------------------------------
When DMA is used to migrate data from/to memory buffers, the start and end address of the buffer must be aligned with the cache line to avoid inconsistencies between cache data and memory data. For example, if the start address of a buffer is in the middle of the cache line and the first half is occupied by other programs, when other programs invalidate or clean the current cache line, this operation will affect the entire cache line, resulting in inconsistent cache and memory data of the current buffer.

.. Caution::
   The DMA operation address requires exclusive ownership of a complete cache line. You can define the buffer using :func:`malloc()` or :func:`ALIGNMTO(CACHE_LINE_SIZE) u8 op_buffer[CACHE_LINE_ALIGMENT(op_buffer_size)]`.


DMA Tx Flow
~~~~~~~~~~~~~~

1. CPU allocates Tx buffer

2. CPU writes Tx buffer

3. Realtek recommends: :func:`DCache_Clean`

4. DMA Tx Config

5. DMA Tx Interrupt

DMA Rx Flow
~~~~~~~~~~~~~~

1. CPU allocates Rx buffer

2. DCache_Clean (if the Rx buffer is in a clean state, this step can be skipped)

   .. Caution::
      - For Cortex-A32, if the Rx buffer is in a dirty state in the cache, executing DCache_Invalidate on Cortex-A32 will perform both a clean and invalidate operation. The clean operation may lead to unexpected write behavior to memory.
      - If the Rx buffer is in a dirty state in the cache, the CPU may write the Rx buffer back to memory from the cache when CPU's D-Cache becomes full, which could overwrite content that DMA Rx has already written.


3. DMA Rx Config

4. DMA Rx interrupt

5. DCache_Invalidate (this step is mandatory)

  .. Caution::

     - For CPUs with automatic data prefetching and monitoring capabilities, such as Cortex-A32/DSP, e.g., Cortex-A32 reads the contents of adjacent addresses of the Rx buffer, Cortex-A32 starts line fills in the background to bring the old values of the Rx buffer back into the cache.
     - Prevents the CPU from reading old values into the cache during DMA processing.

6. CPU reads Rx buffer (the value returned by DMA Rx)

   .. Caution::
      For Cortex-A32/DSP, DCache_Clean/DCache_CleanInvalidate operations write entire cache lines to memory.
      When two CPUs (with different cache line sizes) communicate using a shared memory region, this shared memory must be aligned with the larger of the two cache line sizes.
      e.g., if the shared memory is only 32 bytes, CPU0 with a 32-byte cache line will only write 32 bytes each time it cleans, while CPU1 with a 64-byte cache line will write 64 bytes each time it cleans, potentially overwriting other data of CPU0.








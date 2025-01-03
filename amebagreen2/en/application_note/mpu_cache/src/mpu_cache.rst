.. _mpu:

MPU
=============
Functional Description
--------------------------------------------
The Memory Protection Unit (MPU) is a component provided by Arm and is used to provide hardware protection by software definition. The code in SDK provides the mpu_region_config struct to set the region memory attribute of MPU.


The following table shows the member variables of the :class:`mpu_region_config` struct.

.. list-table:: mpu_region_config struct
   :header-rows: 1
   :width: 100%

   * -  Member variable
     -  Type
     -  Description
   * -  region_base
     -  uint32_t
     -  MPU region base, 32 bytes aligned
   * -  region_size
     -  uint32_t
     -  MPU region size, 32 bytes aligned
   * -  xn
     -  uint8_t
     -  Execute Never attribute

        * MPU_EXEC_ALLOW: Allows program execution in this region
        * MPU_EXEC_NEVER: Does not allow program execution in this region
   * -  ap
     -  uint8_t
     -  Access permissions
       
        - MPU_PRIV_RW: Read/write by privileged code only
       
        - MPU_UN_PRIV_RW: Read/write by any privilege level
       
        - MPU_PRIV_R: Read only by privileged code only
       
        - MPU_PRIV_W: Read only by any privilege level
   * -  sh
     -  uint8_t
     -  Share ability for Normal memory
       
        - MPU_NON_SHAREABLE: Non-shareable
       
        - MPU_OUT_SHAREABLE: Outer shareable
       
        - MPU_INR_SHAREABLE: Inner shareable
   * -  attr_idx
     -  uint8_t
     -  Memory attribute indirect index, can be a value of 0 ~ 7, the detailed attribute is defined in :func:`mpu_init()` and is customized. The typical definition is as follows:
       
        - 0: MPU_MEM_ATTR_IDX_NC, defines memory attribute of Normal memory with non-cacheable.
       
        - 1: MPU_MEM_ATTR_IDX_WT_T_RA, defines memory attribute of Normal memory with write-through transient, read allocation.

        - 2: MPU_MEM_ATTR_IDX_WB_T_RWA, defines memory attribute of Normal memory with write-back transient, read and write allocation.
       
        - 3 ~ 7: MPU_MEM_ATTR_IDX_DEVICE, defines memory attribute of Device memory with non-gathering, non-recording, non-early Write Acknowledge.

MPU APIs
----------------
mpu_init
~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+---------------------------------------------------------+
   | Items        | Description                                             |
   +==============+=========================================================+
   | Introduction | Initialize MPU region memory attribute to typical value |
   +--------------+---------------------------------------------------------+
   | Parameters   | None                                                    |
   +--------------+---------------------------------------------------------+
   | Return       | None                                                    |
   +--------------+---------------------------------------------------------+

mpu_set_mem_attr
~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+----------------------------------------------------------------+
   | Items        | Description                                                    |
   +==============+================================================================+
   | Introduction | Change MPU region memory attribute                             |
   +--------------+----------------------------------------------------------------+
   | Parameters   | - attr_idx: region memory attribute index, which can be 0 ~ 7. |
   |              |                                                                |
   |              | - mem_attr: region memory attributes.                          |
   +--------------+----------------------------------------------------------------+
   | Return       | None                                                           |
   +--------------+----------------------------------------------------------------+

mpu_region_cfg
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+-----------------------------------------------------------------------------+
   | Items        | Description                                                                 |
   +==============+=============================================================================+
   | Introduction | Configure MPU region memory attribute.                                      |
   +--------------+-----------------------------------------------------------------------------+
   | Parameters   | - region_num:                                                               |
   |              |                                                                             |
   |              |    - KM4_NS: 0 ~ 7                                                          |
   |              |                                                                             |
   |              |    - KM4_S: 0 ~ 3                                                           |
   |              |                                                                             |
   |              | - pmpu_cfg: point to the mpu_region_config struct which has been configured |
   +--------------+-----------------------------------------------------------------------------+
   | Return       | None                                                                        |
   +--------------+-----------------------------------------------------------------------------+

mpu_entry_free
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+------------------+
   | Items        | Description      |
   +==============+==================+
   | Introduction | Free MPU entry   |
   +--------------+------------------+
   | Parameters   | MPU entry index: |
   |              |                  |
   |              | - KM4_NS: 0 ~ 7  |
   |              |                  |
   |              | - KM4_S: 0 ~ 3   |
   +--------------+------------------+
   | Return       | None             |
   +--------------+------------------+

mpu_entry_alloc
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: 30, 70

   +--------------+---------------------------+
   | Items        | Description               |
   +==============+===========================+
   | Introduction | Allocate a free MPU entry |
   +--------------+---------------------------+
   | Parameters   | None                      |
   +--------------+---------------------------+
   | Return       | MPU entry index:          |
   |              |                           |
   |              | - KM4_NS: 0 ~ 7           |
   |              |                           |
   |              | - KM4_S: 0 ~ 3            |
   |              |                           |
   |              | - Fail: -1                |
   +--------------+---------------------------+

Usage
----------
Follow these steps to set a MPU region:

1. Define a new variable and struct

   - Variable to store MPU entry index

   - Struct *mpu_region_config* to store the region memory attribute

2. Call :func:`mpu_entry_alloc()` to allocate a free MPU entry

3. Set the struct of region memory attribute

4. Call :func:`mpu_region_cfg()` to configure MPU region memory attribute



.. _cache:

Cache
==========
Functional Description
--------------------------------------------
The Cache of |CHIP_NAME| supports Enable/Disable, Flush and Clean operation, as following table lists.



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



.. note::

   In the ROM code, the default states of Cache are:
   
   - KM4 Cache: enabled by default
   - KM0 Cache: disabled by default


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
      If the Rx buffer is in a dirty state in the cache, the CPU may write the Rx buffer back to memory from the cache when CPU's D-Cache becomes full, which could overwrite content that DMA Rx has already written.

.. only:: internal
   
   
   这是CA32特有的。
   
   .. Caution::
      If the Rx buffer is in a dirty state in the cache, executing DCache_Invalidate on Cortex-A32 will perform both a clean and invalidate operation. The clean operation may lead to unexpected write behavior to memory.


3. DMA Rx Config

4. DMA Rx interrupt

5. DCache_Invalidate (this step is mandatory)

  .. Caution::
     Prevents the CPU from reading old values into the cache during DMA processing.

.. only:: internal
   
   
   这是CA32特有的。
   
   .. Caution::
      For CPUs with automatic data prefetching and monitoring capabilities, such as Cortex-A32/DSP, e.g., Cortex-A32 reads the contents of adjacent addresses of the Rx buffer, Cortex-A32 starts line fills in the background to bring the old values of the Rx buffer back into the cache.


6. CPU reads Rx buffer (the value returned by DMA Rx)

.. only:: internal
   
   
   这是CA32和DSP特有的。
   
   .. Caution::
      DCache_Clean/DCache_CleanInvalidate operations write entire cache lines to memory. When two CPUs (with different cache line sizes) communicate using a shared memory region, this shared memory must be aligned with the larger of the two cache line sizes. e.g., if the shared memory is only 32 bytes, CPU0 with a 32-byte cache line will only write 32 bytes each time it cleans, while CPU1 with a 64-byte cache line will write 64 bytes each time it cleans, potentially overwriting other data of CPU0.
   







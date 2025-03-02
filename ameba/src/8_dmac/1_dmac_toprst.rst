.. _dmac:

Introduction
------------------------
The global direct memory access (GDMA) controller is mainly used to transfer data from/to memory or peripherals over the AXI/OCP bus without CPU intervention, thereby offloading CPU. There is a GDMA instance with 8 channels, where channel 0 and channel 1 have a FIFO size of 128 bytes, and the other channels' FIFO have 32 bytes.


The GDMA (or DMAC) is a dual AXI/OCP master bus architecture with a slave interface for programming, and supports hardware priority and programmable priority between DMA requests.

GDMA Performance
--------------------------------
The data-transmission efficiency of GDMA is affected by clock synchronization, channel FIFO depth, transfer types, handshake efficiency, GDMA interface setting of slave and other factors. The following data is based on the results of the experiment with the transmission type of single block and the transmission channel is zero.

.. tabs::

   .. include:: dmac_performance_20EA21Dx26EA.rst
   .. include:: dmac_performance_8730E.rst

.. note::
   The time of GDMA turn-around is not included.


Usage
----------
.. figure:: figures/dma_block_size_diagram.svg
   :scale: 120%
   :align: center
   :name: dma_block_size_diagram

   DMA block size diagram

GDMA Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Data Size
^^^^^^^^^^^^^^^^^^
:ref:`dma_block_size_diagram` illustrates the setting of GDMA transmission data size. The block_ts indicates the amount of data that will be transferred in a single data block.
It needs to be set to the total number of data/SRC_TR_WIDTH, and max. value is 0xFFFF.

Transfer Direction and Flow Controller
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. table::
   :width: 100%
   :widths: auto

   +-----------------------------------------------------+--------------------------+------------------------+
   | TT_FC[2:0] field of CTLx register (`x` is channel)  | Direction                | Flow controller        |
   +=====================================================+==========================+========================+
   | 000                                                 | Memory to Memory         | DMAC                   |
   +-----------------------------------------------------+--------------------------+------------------------+
   | 001                                                 | Memory to Peripheral     | DMAC                   |
   +-----------------------------------------------------+--------------------------+------------------------+
   | 010                                                 | Peripheral to Memory     | DMAC                   |
   +-----------------------------------------------------+--------------------------+------------------------+
   | 011                                                 | Peripheral to Peripheral | DMAC                   |
   +-----------------------------------------------------+--------------------------+------------------------+
   | 100                                                 | Peripheral to Memory     | Peripheral             |
   +-----------------------------------------------------+--------------------------+------------------------+
   | 101                                                 | Peripheral to Peripheral | Source Peripheral      |
   +-----------------------------------------------------+--------------------------+------------------------+
   | 110                                                 | Memory to Peripheral     | Peripheral             |
   +-----------------------------------------------------+--------------------------+------------------------+
   | 111                                                 | Peripheral to Peripheral | Destination Peripheral |
   +-----------------------------------------------------+--------------------------+------------------------+


There are currently four transmission directions and two flow controller settings, with a total of eight available configurations.
There are the following differences between a DMAC acting as a flow controller and a peripheral acting as a flow controller:

- When the peripheral acts as a flow controller, the DMA transfers data according to the single/burst requests issued by the peripheral.

- When the DMAC acts as a flow controller, all requests from the peripheral will be processed according to the configured requests.

.. note::
   The `block_ts` parameter can only be set when the DMAC is used as a flow controller.


Transfer msize
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The length of each transaction can be configured.

- `msize` > 1: burst transaction

- `msize` = 1: single transaction

.. table::
   :width: 100%
   :widths: auto

   +-------------------------------------------------------+----------------+
   | SRC_MSIZE[2:0]/DEST_MSIZE[2:0] field of CTLx register | Transfer msize |
   +=======================================================+================+
   | 000                                                   | 1              |
   +-------------------------------------------------------+----------------+
   | 001                                                   | 4              |
   +-------------------------------------------------------+----------------+
   | 010                                                   | 8              |
   +-------------------------------------------------------+----------------+
   | 011                                                   | 16             |
   +-------------------------------------------------------+----------------+
   | 100 and above                                         | Not supported  |
   +-------------------------------------------------------+----------------+

Transfer Width
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
GDMA supports the following transmission width.

.. table::
   :width: 100%
   :widths: auto

   +------------------------------------------------------------+-----------------------+
   | SRC_TR_WIDTH[2:0]/DST_TR_WIDTH[2:0] field of CTLx register | Transfer width (byte) |
   +============================================================+=======================+
   | 000                                                        | 1                     |
   +------------------------------------------------------------+-----------------------+
   | 001                                                        | 2                     |
   +------------------------------------------------------------+-----------------------+
   | 010                                                        | 4                     |
   +------------------------------------------------------------+-----------------------+
   | 011 and above                                              | Not supported         |
   +------------------------------------------------------------+-----------------------+

.. note::
      - When reading and writing peripherals, the `SRC_TR_WIDTH`/`DST_TR_WIDTH` is completely determined by the width of peripherals.

      - When reading and writing memory:

         - If cache is disabled, the address does not need to be aligned to any value. It only needs to be `SRC_TR_WIDTH` divisible by the total amount of data so that the `block_ts` is an integer.

         - If cache is enabled, buffer boundary addresses and cache line alignment are necessary.

      - If memory is destination (P2M, M2M), `DST_TR_WIDTH` parameter will be ignored, and writing are always based on the bus width (typically 32 bits, 4 bytes).


Transfer Types
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Single block
************************
Single block DMA transfer – Consists of a single block.

Multi-block
**********************
Multi-block DMA transfer – DMA transfer may consist of multiple RTK_DMAC blocks. Multi-block transfer types include:

   - Auto-reloading mode

   - Linked list mode

**Auto-reloading mode**

In auto-reloading mode, the source and destination can independently select which method to use.

.. table::
   :width: 100%
   :widths: auto

   +-------------------------------+----------------------------------------+-------------------------------------------------------------------------------------------------------------------+
   | Auto-reloading transfer types | Setting                                | Introduction                                                                                                      |
   +===============================+========================================+===================================================================================================================+
   | Src auto reload               | PGDMA_InitTypeDef->GDMA_ReloadSrc = 1  | For multi-block transfers, the SAR register can be auto-reloaded from the initial value at the end of each block, |
   |                               |                                        |                                                                                                                   |
   |                               | PGDMA_InitTypeDef->GDMA_ReloadDst = 0  | and DST address is contiguous, as shown in :ref:`mbd_source_auto_dest_cont`.                                      |
   +-------------------------------+----------------------------------------+-------------------------------------------------------------------------------------------------------------------+
   | Dst auto reload               | PGDMA_InitTypeDef->GDMA_ReloadSrc = 0  | For multi-block transfers, the DAR register can be auto-reloaded from its initial value at                        |
   |                               |                                        |                                                                                                                   |
   |                               | PGDMA_InitTypeDef->GDMA_ReloadDst = 1  | the end of each block, and the SRC address is contiguous.                                                         |
   +-------------------------------+----------------------------------------+-------------------------------------------------------------------------------------------------------------------+
   | Src & Dst auto reload         | PGDMA_InitTypeDef->GDMA_ReloadSrc = 1  | For multi-block transfers, the SAR and DAR register can be auto-reloaded from its initial value at the end of each|
   |                               |                                        |                                                                                                                   |
   |                               | PGDMA_InitTypeDef->GDMA_ReloadDst = 1  | block, as shown in :ref:`mbd_source_dest_auto`.                                                                   |
   +-------------------------------+----------------------------------------+-------------------------------------------------------------------------------------------------------------------+

.. figure:: figures/mbd_source_auto_dest_cont.png
   :scale: 70%
   :align: center
   :name: mbd_source_auto_dest_cont

   Multi-block DMA transfer with source address auto-reloaded and contiguous destination address

.. figure:: figures/mbd_source_dest_auto.png
   :scale: 70%
   :align: center
   :name: mbd_source_dest_auto
   
   Multi-block DMA transfer with source and destination address auto-reloaded

**Linked list mode**

In linked list mode, the addresses between data blocks do not have to be consecutive.

.. table::
   :width: 100%
   :widths: auto

   +--------------------------+-----------------------------------------+-------------------------------------------------------------------------------------------------------------+
   | Link list transfer types | Setting                                 | Introduction                                                                                                |
   +==========================+=========================================+=============================================================================================================+
   | Src: Continue address    | PGDMA_InitTypeDef->GDMA_SrcAddr = pSrc  | Source memory is a continuous data block, while destination data blocks are organized in linked list.       |
   |                          |                                         |                                                                                                             |
   | Dst: Link list           | PGDMA_InitTypeDef->GDMA_LlpDstEn = 1    |                                                                                                             |
   +--------------------------+-----------------------------------------+-------------------------------------------------------------------------------------------------------------+
   | Src: Auto-reloading      | PGDMA_InitTypeDef->GDMA_ReloadSrc = 1   | In source, SAR register can be auto-reloaded from the initial value at the end of each                      |
   |                          |                                         |                                                                                                             |
   | Dst: Link list           | PGDMA_InitTypeDef->GDMA_SrcAddr = pSrc  | block, as shown in :ref:`mbd_source_auto_link_dest`.                                                        |
   |                          |                                         |                                                                                                             |
   |                          | PGDMA_InitTypeDef->GDMA_LlpDstEn = 1    |                                                                                                             |
   +--------------------------+-----------------------------------------+-------------------------------------------------------------------------------------------------------------+
   | Src: Link list           | PGDMA_InitTypeDef->GDMA_LlpSrcEn = 1    | Source memory is organized in the form of a linked list, and destination memory is                          |
   |                          |                                         |                                                                                                             |
   | Dst: Continue address    | PGDMA_InitTypeDef->GDMA_DstAddr = pDst  | a continuous data block, as shown in :ref:`mbd_link_source_cont_dest`.                                      |                                                                                                         
   +--------------------------+-----------------------------------------+-------------------------------------------------------------------------------------------------------------+
   | Src: Link list           | PGDMA_InitTypeDef->GDMA_LlpSrcEn = 1    | The source data blocks are organized in a linked list, and the destination data blocks are auto-reloading.  |
   |                          |                                         |                                                                                                             |
   | Dst: Auto-reloading      | PGDMA_InitTypeDef->GDMA_DstAddr = pDst  |                                                                                                             |
   |                          |                                         |                                                                                                             |
   |                          | PGDMA_InitTypeDef->GDMA_ReloadDst = 1   |                                                                                                             |
   +--------------------------+-----------------------------------------+-------------------------------------------------------------------------------------------------------------+
   | Src: Link list           | PGDMA_InitTypeDef->GDMA_LlpSrcEn = 1    | Both source and destination data blocks are organized in linked lists,                                      |
   |                          |                                         |                                                                                                             |
   | Dst: Link list           | PGDMA_InitTypeDef->GDMA_LlpDstEn = 1    | as shown in :ref:`mbd_link_source_dest`.                                                                    |
   +--------------------------+-----------------------------------------+-------------------------------------------------------------------------------------------------------------+


If both the destination and the source are continuous data blocks, multi-block transmission should not be used, and single-block transmission is more appropriate.

.. figure:: figures/mbd_source_auto_link_dest.png
   :scale: 50%
   :align: center
   :name: mbd_source_auto_link_dest

   Multi-block DMA transfer with source address auto-reloaded and linked list destination address

.. figure:: figures/mbd_link_source_cont_dest.png
   :scale: 50%
   :align: center
   :name: mbd_link_source_cont_dest

   Multi-block DMA transfer with linked list source address and contiguous destination address
   
.. figure:: figures/mbd_link_source_dest.png
   :scale: 60%
   :align: center
   :name: mbd_link_source_dest

   Multi-block DMA transfer with linked address for source and destination


Address Increment Type
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Source Address Increment
************************************************
There are two modes:

   - **Increment**: Indicates whether to increment the source address on every source transfer. Incrementing is done for alignment to the next *CTLx.SRC_TR_WIDTH* boundary.

   - **No change**: If the device is fetching data from a source peripheral FIFO with a fixed address, then set this field to No change.

Destination Address Increment
**********************************************************
There are two modes:

   - **Increment**: indicates whether to increment destination address on every destination transfer. Incrementing is done for alignment to the next *CTLx.DST_TR_WIDTH* boundary.

   - **No change**: If the device is writing data to a destination peripheral FIFO with a fixed address, then set this field to No change.

Real-time Status Acquisition
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
GDMA supports real-time acquisition of the current transmission source address, destination address and the data size that has been transmitted.
Call the corresponding APIs to read.

.. note::
   To get the amount of data that has been transferred, the `block_ts` must be greater than 768 at least, and cannot be read in an interrupt function; 
   otherwise, the value obtained is always 0.


Interrupt Type
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
There are several supported interrupt type, these interrupts can be used independently or in combination.

.. table::
   :width: 100%
   :widths: auto

   +--------------------+------------------------------------------------------+
   | Interrupt type     | Introduction                                         |
   +====================+======================================================+
   | block interrupt    | Triggered by the completion of a data block transfer |
   +--------------------+------------------------------------------------------+
   | transfer interrupt | Occurs when all data blocks have been transferred    |
   +--------------------+------------------------------------------------------+
   | error interrupt    | There was a transfer error                           |
   +--------------------+------------------------------------------------------+


In particular, the transfer-completed condition of the linked list mode is that the pointer of the last data block pointing to the next data block is null.

.. note::
      - In multi-block, when the block in auto-reload mode is interrupted, the data will be transmitted after the interrupt processing function.

      - In linked list mode, when the block interruption comes, the data will still continue to be transmitted.


Secure
^^^^^^^^^^^^
To start secure transfer, users need to configure the security channel control bit in the register. Access for master interface and slave interface are secure when the secure bit is set. Secure channel can only be configured in secure world. Secure channel can access secure memory and non-secure memory. Non-secure channel can only access non-secure memory.

.. code-block:: C

   PGDMA_InitTypeDef->SecureTransfer = 1;

Suspend and Abort
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
GDMA supports channel suspend resume and termination.

- To suspend a channel, just configure `CFGx.CH_SUSP`, but there is no guarantee that the current data transaction is completed. Combined with `CFGx.INACTIVE`, the channel can be safely paused without losing data.

- To resume data transmission after suspension, clear `CFGx.CH_SUSP`.

- To terminate data transfer, `CFGx.INACTIVE` must be continuously polled until this bit is set to 1, then the data transfer can be aborted.




.. note::
   The following is situation that channels is inactive:

      - ``CFGx.INACTIVE`` can only be activated after Memory has been written, and then canceled.

      - The data of peripheral is 4bytes, but the FIFO of DMAC is only 2 bytes. There is no writing at this time and ``CFGx.INACTIVE`` is activated directly.


Priority
^^^^^^^^^^^^^^^^
GDMA supports two kinds of channel priority:

- Software: the priority of each channel can be configured in the ``CFGx.CH_PRIOR``. The valid value is 0 ~ (``DMAC_NUM_CHANNELS``-1), where 0 is the highest priority value and (``DMAC_NUM_CHANNELS``-1) is the lowest priority value.

- Hardware: if two channel requests have the same software priority level, or if no software priority is configured, the channel with the lower number takes priority over the channel with the higher number. For example, channel 2 takes priority over channel 4.

Cache
^^^^^^^^^^
When DMA slave type is memory, you need to pay attention to cache operation. ``DCache_CleanInvalidate()`` should be called every time before DMA transmission starts.


The following steps should be added when executing DMA Rx/Tx.

.. table::
   :width: 100%
   :widths: auto

   +-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
   | Operation | Step                                                                                                                                                     |
   +===========+==========================================================================================================================================================+
   | DMA Rx    | 1. Prepare DST buffer                                                                                                                                    |
   |           |                                                                                                                                                          |
   |           | 2. Do :func:`DCache_CleanInvalidate()` to avoid cache flush during DMA Rx                                                                                |
   |           |                                                                                                                                                          |
   |           | 3. Do DMA Rx configuration                                                                                                                               |
   |           |                                                                                                                                                          |
   |           | 4. Trigger DMA Rx interrupt                                                                                                                              |
   |           |                                                                                                                                                          |
   |           | 5. Do :func:`DCache_Invalidate()` in Rx Done Handler to clean the old data, to avoid the problem that the data in the cache is inconsistent.             |
   |           |                                                                                                                                                          |
   |           |    with the data in the memory after Rx done if the CPU read or write allocate the DST buffer during GDMA transmission.                                  |
   |           |                                                                                                                                                          |
   |           | .. note::                                                                                                                                                |
   |           |    During GDMA transmission, it is forbidden to write or cache flush DST buffer. (Taking                                                                 |
   |           |                                                                                                                                                          |
   |           |    ``{SDK}\component\example\peripheral\raw\uart\uart_dma_stream\src\main.c`` for example, ``uart_recv_string_done`` is DMA Rx Done Interrupt Handler)   |
   |           |                                                                                                                                                          |
   |           | .. code-block:: C                                                                                                                                        |  
   |           |                                                                                                                                                          |
   |           |    u32 uart_recv_string_done(void * data)                                                                                                                |
   |           |    {                                                                                                                                                     |
   |           |       UNUSED(data);                                                                                                                                      |
   |           |       // To solve the cache consistency problem, DMA mode needs it                                                                                       |
   |           |       DCache_Invalidate((u32)rx_buf, SRX_BUF_SZ);                                                                                                        |
   |           |       dma_free();                                                                                                                                        |
   |           |       rx_done = 1;                                                                                                                                       |
   |           |       return 0;                                                                                                                                          |
   |           |    }                                                                                                                                                     |
   |           |                                                                                                                                                          |
   |           |                                                                                                                                                          |
   |           | 6. CPU reads DST buffer                                                                                                                                  |
   +-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
   | DMA Tx    | 1. CPU prepares SRC buffer data                                                                                                                          |
   |           |                                                                                                                                                          |
   |           | 2. Do :func:`DCache_CleanInvalidate()` for SRC buffer to synchronize the data                                                                            |
   |           |                                                                                                                                                          |
   |           | 3. Do DMA Tx configuration                                                                                                                               |
   |           |                                                                                                                                                          |
   |           | 4. Trigger DMA Tx interrupt                                                                                                                              |
   +-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------+


Aligning the buffer address with the cache line will reduce the problem of inconsistent cache and memory data,
and details can be referred to Section :ref:`cache_consistency_using_dma`.

Demo for Single Block
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Allocate a free channel

   .. code-block:: C

      ch_num = GDMA_ChnlAlloc(gdma.index, (IRQ_FUN) Dma_memcpy_int, (u32)(&gdma), 3);

   This function also includes the following operation:

      - Register IRQ handler if use interrupt mode

      - Enable NVIC interrupt

      - Register the GDMA channel to use

2. Configure the interrupt type

   .. code-block:: C

      PGDMA_InitTypeDef->GDMA_IsrType = (TransferType | ErrType);

3. Configure interrupt handling function

   Clear the pending interrupt in the interrupt processing function.

   .. code-block:: C

      GDMA_ClearINT(0, PGDMA_InitTypeDef->GDMA_ChNum);

4. Configure transfer settings

   .. code-block:: C

      PGDMA_InitTypeDef->GDMA_SrcMsize   = MsizeEight;
      PGDMA_InitTypeDef->GDMA_SrcDataWidth = TrWidthFourBytes;
      PGDMA_InitTypeDef->GDMA_DstMsize = MsizeEight;
      PGDMA_InitTypeDef->GDMA_DstDataWidth = TrWidthFourBytes;
      PGDMA_InitTypeDef->GDMA_BlockSize = DMA_CPY_LEN >> 2;
      PGDMA_InitTypeDef->GDMA_DstInc = IncType; // if dst type is peripheral:no change
      PGDMA_InitTypeDef->GDMA_SrcInc = IncType; // if src type is peripheral:no change

5. Configure hardware handshake interface if slave is peripheral

   .. code-block:: C

      GDMA_InitStruct->GDMA_SrcHandshakeInterface= GDMA_HANDSHAKE_INTERFACE_AUDIO_RX;

   or

   .. code-block:: C

      GDMA_InitStruct->GDMA_DstHandshakeInterface = GDMA_HANDSHAKE_INTERFACE_AUDIO_TX;

6. Configure the transfer address

   .. code-block:: C

      PGDMA_InitTypeDef->GDMA_SrcAddr = (u32)BDSrcTest;
      PGDMA_InitTypeDef->GDMA_DstAddr = (u32)BDDstTest;

7. Program GDMA index, GDMA channel, data width, Msize, transfer direction, address increment mode, hardware handshake interface,
8. reload control, interrupt type, block size, multi-block configuration and the source and destination address using the :func:`GDMA_Init()` function.

   .. code-block:: C

      GDMA_Init(gdma.index, gdma.ch_num, PGDMA_InitTypeDef);

9. Cache clean invalidate

   .. code-block:: C

      DCache_CleanInvalidate();

10. Enable GDMA channel

   .. code-block:: C

      GDMA_Cmd(gdma.index, gdma.ch_num, ENABLE);

Demo for Multi-block
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
This example is SRC auto reload, compared with single block, multi-block is different in :ref:`Step 2 <multi_block_demo_step_2>` to :ref:`Step 4 <multi_block_demo_step_4>`.

1. Allocate a free channel

   .. code-block:: C

      ch_num = GDMA_ChnlAlloc(gdma.index, (IRQ_FUN) Dma_memcpy_int, (u32)(&gdma), 3);

   This function also includes the following operation:

      - Register IRQ handler if use interrupt mode

      - Enable NVIC interrupt

      - Register the GDMA channel to use

.. _multi_block_demo_step_2:

2. Configure the interrupt type

   .. code-block:: C

      PGDMA_InitTypeDef->GDMA_IsrType = (BlockType | TransferType | ErrType);

3. Configure interrupt handling function

   a. Clear the interrupt.

      .. code-block:: C

         GDMA_ClearINT(0, GDMA_InitStruct->GDMA_ChNum);

   b. Clear the auto reload mode before the last block starts.

      .. code-block:: C

         GDMA_ChCleanAutoReload(0, GDMA_InitStruct->GDMA_ChNum, CLEAN_RELOAD_SRC);

.. _multi_block_demo_step_4:

4. Configure transfer settings

   .. code-block:: C

      PGDMA_InitTypeDef->GDMA_SrcMsize   = MsizeEight;
      PGDMA_InitTypeDef->GDMA_SrcDataWidth = TrWidthFourBytes;
      PGDMA_InitTypeDef->GDMA_DstMsize = MsizeEight;
      PGDMA_InitTypeDef->GDMA_DstDataWidth = TrWidthFourBytes;
      PGDMA_InitTypeDef->GDMA_BlockSize = DMA_CPY_LEN >> 2;
      PGDMA_InitTypeDef->GDMA_DstInc = IncType; // If DST type is peripheral: no change
      PGDMA_InitTypeDef->GDMA_SrcInc = IncType; // If SRC type is peripheral: no change
      PGDMA_InitTypeDef->GDMA_ReloadSrc = 1;
      PGDMA_InitTypeDef->GDMA_ReloadDst = 0;

5. Configure hardware handshake interface if slave is peripheral.

   .. code-block:: C

      GDMA_InitStruct->GDMA_SrcHandshakeInterface= GDMA_HANDSHAKE_INTERFACE_AUDIO_RX;

   or

   .. code-block:: C

      GDMA_InitStruct->GDMA_DstHandshakeInterface = GDMA_HANDSHAKE_INTERFACE_AUDIO_TX;

6. Configure the transfer address

   .. code-block:: C

      PGDMA_InitTypeDef->GDMA_SrcAddr = (u32)BDSrcTest;
      PGDMA_InitTypeDef->GDMA_DstAddr = (u32)BDDstTest;

7. Program GDMA index, GDMA channel, data width, Msize, transfer direction, address increment mode, hardware handshake interface,
 
   reload control, interrupt type, block size, multi-block configuration and the source and destination address using the :func:`GDMA_Init()` function.

   .. code-block:: C

      GDMA_Init(gdma.index, gdma.ch_num, PGDMA_InitTypeDef);

9.  Cache clean invalidate

   .. code-block:: C

      DCache_CleanInvalidate();

10. Enable GDMA channel

   .. code-block:: C

      GDMA_Cmd(gdma.index, gdma.ch_num, ENABLE);

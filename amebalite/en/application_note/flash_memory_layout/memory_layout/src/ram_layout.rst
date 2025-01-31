.. _memory_layout:

Introduction
----------------
This chapter introduces the default memory layout of |CHIP_NAME| and how to modify the memory layout if needed.
   
RAM Layout
----------------
.. only:: RTL8726EA

   In total, there are 512KB SRAM on chip, and the size of PSRAM can be 0MB/4MB/8MB/16MB/32MB, which is decided by users. The default RAM layout is illustrated below.
   
   .. figure:: ../figures/ram_layout_other.svg
      :scale: 130%
      :align: center
   
      RAM layout

SRAM0 (First 40KB) Layout
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The first 40KB SRAM0 layout is illustrated in the following figure and table. It is the same for all situations.

.. figure:: ../figures/sram0_layout.svg
   :scale: 125%
   :align: center

   SRAM0 (first 40KB) layout

.. table:: SRAM0 (first 40KB) layout
   :width: 100%
   :widths: auto

   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+
   | Item                      | Start address | Size   | Description                                         | Mandatory |
   +===========================+===============+========+=====================================================+===========+
   | KR4_ROM_BSS_RAM           | 0x2000_0000   | 4KB    | KR4 ROM BSS                                         | √         |
   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+
   | KR4_MSP_RAM               | 0x2000_1000   | 4KB    | KR4 Main Stack Pointer                              | √         |
   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+
   | KR4_STDLIB_HEAP_NS        | 0x2000_2000   | 4KB    | KR4 ROM STDLIB heap                                 | √         |
   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+
   | KM4_MSP_NS                | 0x2000_3000   | 4KB    | KM4 non-secure Main Stack Pointer                   | √         |
   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+
   | KM4_ROM_BSS_COMMON        | 0x2000_4000   | 2.25KB | KM4 ROM secure and non-secure common BSS            | √         |
   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+
   | KR4_IPC_RAM               | 0x2000_4900   | 768B   | Exchange messages between cores                     | √         |
   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+
   | KR4_BOOT_ENTRY_BACKUP     | 0x2000_4C00   | 64B    | Backup KR4 IMG2 entry when SRAM1 is not used by KR4 | √         |
   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+
   | KM4_ROM_BSS_NS            | 0x2000_5000   | 1.25KB | KM4 ROM non-secure common BSS                       | √         |
   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+
   | KR4_RAM_ONLY              | 0x2000_4C20   | 1KB    | Used by power save flow when KR4 is NP              | √         |
   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+
   | KM4_RAM_ONLY              | 0x2000_4E00   | 1KB    | Used by power save flow when KM4 is NP              | √         |
   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+
   | KM4_TIMER_IDLE_TASK_STACK | 0x2000_6000   | 4KB    | KM4 TIMER and IDLE task stack                       | √         |
   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+
   | KM4_ROM_BSS_S             | 0x3000_7000   | 4KB    | KM4 ROM secure-only BSS                             | √         |
   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+
   | KM4_MSP_S                 | 0x3000_8000   | 8KB    | KM4 secure Main Stack Pointer                       | √         |
   +---------------------------+---------------+--------+-----------------------------------------------------+-----------+

RAM & PSRAM Layout
~~~~~~~~~~~~~~~~~~~~
.. only:: RTL8726EA

   The following figure and table illustrate the default RAM layout with PSRAM.

   .. figure:: ../figures/ram_psram_layout_8726.svg
      :scale: 120%
      :align: center

      RAM & PSRAM layout

   .. table:: RAM & PSRAM layout
      :width: 100%
      :widths: auto
   
      +----------------+---------------+--------+-------------------------------------------------------------------+-----------+
      | Item           | Start address | Size   | Description                                                       | Mandatory |
      +================+===============+========+===================================================================+===========+
      | SRAM0          | 0x2000_0000   | 40KB   | For ROM BSS, MSP and so on                                        | √         |
      +----------------+---------------+--------+-------------------------------------------------------------------+-----------+
      | KM4 BOOTLOADER | 0x2000_A000   | 24KB   | For Bootloader                                                    | √         |
      +----------------+---------------+--------+-------------------------------------------------------------------+-----------+
      | KM4 IMG3       | 0x6000_0000   | 64KB   | KM4 IMG3, can be merged into KM4 PSRAM if IMG3 is not needed      | √         |
      +----------------+---------------+--------+-------------------------------------------------------------------+-----------+
      | KM4 PSRAM      | 0x6001_0000   | 1472KB | KM4 code, data, BSS and heap                                      | √         |
      +----------------+---------------+--------+-------------------------------------------------------------------+-----------+
      | KR4 PSRAM      | 0x6018_0000   | 1536KB | KR4 code, data, BSS and heap                                      | √         |
      +----------------+---------------+--------+-------------------------------------------------------------------+-----------+
      | DSP PSRAM      | 0x6030_0000   | 5120KB | DSP PSRAM                                                         | √         |
      +----------------+---------------+--------+-------------------------------------------------------------------+-----------+
      | KM4 HEAP EXT   | 0x6FFF_FFFF   | 0      | If KM4 Heap is not enough, it can be used to extend the heap size | x         |
      +----------------+---------------+--------+-------------------------------------------------------------------+-----------+
      | KR4 HEAP EXT   | 0x6FFF_FFFF   | 0      | If KR4 Heap is not enough, it can be used to extend the heap size | x         |
      +----------------+---------------+--------+-------------------------------------------------------------------+-----------+


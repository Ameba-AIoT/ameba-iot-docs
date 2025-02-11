Extending Heap Size
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The heap size consists of multi-blocks and is passed to the operating system by :func:`os_heap_init` in ``{SDK}\component\os\freerto\freertos_heap5_config.c``.
By default, `PSRAM_HEAP1_START` is an invalid address and `PSRAM_HEAP1_SIZE` is 0.

   .. code-block:: c

      KM4_PSRAM_HEAP_EXT (rwx) :              ORIGIN = 0x6FFFFFFF, LENGTH = 0x6FFFFFFF - 0x6FFFFFFF	/* KM4 PSRAM HEAP EXT */
	   KR4_PSRAM_HEAP_EXT (rwx) :              ORIGIN = 0x6FFFFFFF, LENGTH = 0x6FFFFFFF - 0x6FFFFFFF	/* KR4 PSRAM HEAP EXT */

If the heap of KM4 is not enough, follow the steps to extend the heap size of KM4:

1. Define Heap Start and Heap Size for some unused areas in :file:`amebalite_layout.ld`.

2. Use :func:`os_heap_add` to add the area to the heap array.

   The address shall be a valid value in PSRAM
   
3. Re-build the project and download the new image to let KM4 use the extended heap.

   .. code-block:: c
   
      bool os_heap_add(u8 *start_addr, size_t heap_size);

.. note::
   - The symbols defined in linker script (:file:`amebalite_layout.ld`) need to be declared in :file:`ameba_boot.h` before they can be used.

   - If the heap of KR4 is not enough, the extension method is similar.


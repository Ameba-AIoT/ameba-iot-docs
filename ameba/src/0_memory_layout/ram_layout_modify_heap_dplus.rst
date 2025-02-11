.. tab:: RTL8721Dx

   The heap size consists of multi-blocks and is passed to the operating system by the ``os_heap_init()`` function in ``component\os\freertos\freertos_heap5_config.c``. By default, ``PSRAM_HEAP1_START`` is invalid address and ``PSRAM_HEAP1_SIZE`` is 0.

   .. figure:: figures/modify_sd_ram_step2_2_dplus.png
      :scale: 70%
      :align: center

   If the heap of KM4 is not enough, define Heap Start and Heap Size for some unused areas in ``amebaDplus_layout.ld``, and then use the os_heap_add function to add the area to the heap array. The address shall be a valid value in PSRAM, then re-build and download the new image to let KM4 use the extended heap.

   .. code::

      bool os_heap_add(u8 *start_addr, size_t heap_size);



   .. note::
      The symbols defined in linker script (``amebaDplus_layout.ld``) need to be declared in ``ameba_boot.h`` before they can be used.



   If KM0 heap is not enough, modify the ``KM0_PSRAM_HEAP_EXT`` accordingly.


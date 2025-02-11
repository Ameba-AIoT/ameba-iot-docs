.. tab:: Device驱动

   FullMAC Device驱动文件位于 ``{SDK}/component/wifi/inic``。 编译FullMAC SDK的时候这些文件会被编译。

   ::

      Low-level driver
      └── sdio
            └── inic_sdio_dev.c
      └── spi
            ├── inic_spi_dev.c
      └── usb
            └── inic_usb_dev.c

      FullMAC common driver
      └── none_ipc_dev
            ├── inic_dev_api.c
            ├── inic_dev_bridge.c
            ├── inic_dev_msg_queue.c
            └── inic_dev_protocal_offload.c

.. tab:: FreeRTOS Host驱动

   FullMAC RTOS Host 驱动文件位于 ``{SDK}/component/wifi/inic``。 开发者移植相关文件文件到Host MCU中即可。

   注意：开发者需要使用Host OS的接口来实现none_ipc_rtos中的系统相关接口，用于Host OS和FullMAC的对接。

   ::

      Low-level driver
      └── spi
            ├── inic_spi_host.c
            └── inic_spi_host_trx.c
      FullMAC common driver
      └── none_ipc_host
            ├── inic_host_api.c
            ├── inic_host_api_basic.c
            ├── inic_host_api_bt.c
            └── inic_host_api_ext.c
      └── none_ipc_rtos


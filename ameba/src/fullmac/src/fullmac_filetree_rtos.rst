.. tab:: Device Driver

   The FullMAC device driver is located at ``{SDK}/component/wifi/inic``.

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

.. tab:: FreeRTOS Host Driver

   FullMAC RTOS Host driver is located at  ``{SDK}/component/wifi/inic``。 Developers can porting it into Host MCU中。

   notice：Developers should realize none_ipc_rtos use Host OS interfaces。

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
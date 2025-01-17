.. tab:: FreeRTOS

   The FullMAC driver of FreeRTOS in the SDK is located at ``{SDK}/component/wifi/inic``. Users need to porting files in none_ipc_rtos if use other FreeRtos IC as Host.

   ::

      Low-level driver
      └── sdio
            └── inic_sdio_dev.c
      └── spi
            ├── inic_spi_dev.c
            ├── inic_spi_host.c
            └── inic_spi_host_trx.c
      └── usb
            └── inic_usb_dev.c

      FullMAC common driver
      └── none_ipc_dev
            ├── inic_dev_api.c
            ├── inic_dev_bridge.c
            ├── inic_dev_msg_queue.c
            └── inic_dev_protocal_offload.c
      └── none_ipc_host
            ├── inic_host_api.c
            ├── inic_host_api_basic.c
            ├── inic_host_api_bt.c
            └── inic_host_api_ext.c
      └── none_ipc_rtos
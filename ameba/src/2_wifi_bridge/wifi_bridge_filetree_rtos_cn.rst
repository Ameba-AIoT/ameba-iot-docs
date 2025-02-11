.. tab:: RTOS Host驱动

   ::

      wifi\inic -- >
            wifi\inic\none_ipc_host -- >
                wifi\inic\none_ipc_host\inic_host_api.c
                wifi\inic\none_ipc_host\inic_host_api_basic.c
                wifi\inic\none_ipc_host\inic_host_api_ext.c
                wifi\inic\none_ipc_host\inic_host_cust_evt.c
            wifi\inic\sdio -- >
                wifi\inic\sdio\inic_sdio_dev.c
                wifi\inic\sdio\inic_sdio_dev_lite.c
                wifi\inic\sdio\inic_sdio_drv.c
            wifi\inic\spi -- >
                wifi\inic\sdio\inic_spi_host.c
                wifi\inic\sdio\inic_spi_host_trx.c
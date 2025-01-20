.. tab:: Linux Host驱动

   FullMAC Linux Host 驱动文件位于 ``{SDK}/component/wifi/cfg80211_fullmac``。开发者要移植相关文件到Host Linux SDK。

   ::

      Low-level hardware driver
      └── common
            ├── rtw_ioctl.c
            ├── rtw_ioctl.h
            ├── rtw_llhw_event.h
            ├── rtw_llhw_event_rx.c
            ├── rtw_llhw_event_tx.c
            ├── rtw_llhw_hci.c
            ├── rtw_llhw_hci.h
            ├── rtw_llhw_hci_memory.c
            ├── rtw_llhw_ops.c
            ├── rtw_llhw_pkt_rx.c
            ├── rtw_llhw_pkt_tx.c
            ├── rtw_llhw_trx.h
            └── rtw_protocal_offload.c
      └── sdio
            ├── Kbuild
            ├── rtw_sdio.h
            ├── rtw_sdio_drvio.c
            ├── rtw_sdio_drvio.h
            ├── rtw_sdio_fwdl.c
            ├── rtw_sdio_init.c
            ├── rtw_sdio_ops.c
            ├── rtw_sdio_ops.h
            ├── rtw_sdio_probe.c
            └── rtw_sdio_reg.h
      └── spi
            ├── Kbuild
            ├── rtw_spi.h
            ├── rtw_spi_ops.c
            ├── rtw_spi_probe.c
            └── spidev-overlay.dts
      └── usb
            ├── Kbuild
            ├── rtw_usb.h
            ├── rtw_usb_ops.c
            └── rtw_usb_probe.c

      FullMAC driver
      ├── rtw_acs.c
      ├── rtw_acs.h
      ├── rtw_cfg80211_fullmac.h
      ├── rtw_cfg80211_ops.c
      ├── rtw_cfg80211_ops_ap.c
      ├── rtw_cfg80211_ops_key.c
      ├── rtw_cfg80211_ops_nan.c
      ├── rtw_cfg80211_ops_p2p.c
      ├── rtw_cfgvendor.c
      ├── rtw_cfgvendor.h
      ├── rtw_drv_probe.c
      ├── rtw_drv_probe.h
      ├── rtw_ethtool_ops.c
      ├── rtw_ethtool_ops.h
      ├── rtw_functions.h
      ├── rtw_netdev_ops.c
      ├── rtw_netdev_ops.h
      ├── rtw_netdev_ops_p2p.c
      ├── rtw_proc.c
      ├── rtw_proc.h
      ├── rtw_promisc.c
      ├── rtw_promisc.h
      ├── rtw_regd.c
      ├── rtw_regd.h
      ├── rtw_wiphy.c
      └── rtw_wiphy.h
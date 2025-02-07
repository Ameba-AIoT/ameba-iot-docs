.. tab :: RTL8721Dx

   The boot flow of SoC is illustrated below. After a power-up or hardware reset, the hardware will boot KM4 at 150MHz.
   The boot process is handled by the on-chip boot ROM and is always executed by the KM4. After the KM4 bootloader code, the KM4 will set up the environment for the KM0.

   1. KM4 boots ROM

   2. KM4 secure boot (optional)

   3. KM4 boots to SRAM

   4. KM4 helps KM0 load images and check the signature (optional)

   .. figure:: figures/boot_flow_dplus.svg
      :scale: 90%
      :align: center

      Boot flow

   The immutable ROM provides ISP service, which could be initial programming of a blank device, erasing and re-programming of a previously programmed device.


   When the rising edge on RESET pin is generated, the trap pin (``PB5``) will be sampled to determine whether to continue the boot process or ISP service. If the trap pin is sampled LOW, the external hardware requests to start the ISP service. Otherwise, the chip boots normally.


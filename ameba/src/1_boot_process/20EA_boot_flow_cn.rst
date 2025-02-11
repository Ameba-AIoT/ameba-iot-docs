.. tab :: RTL8720EA

   The boot flow of SoC is illustrated below. After a power-up or hardware reset, the hardware will boot KM4 at 150MHz.
   The boot process is handled by the on-chip boot ROM and is always executed by the KM4. After the KM4 bootloader code, the KM4 will set up the environment for the KR4 and DSP.

   1. KM4 boots ROM

   2. KM4 secure boot (optional)

   3. KM4 boots to SRAM

   4. KM4 helps KR4 load images and check the signature (optional)

   5. KM4 helps DSP load images and check the signature (optional, if DSP exists)

   .. figure:: figures/boot_flow_lite.svg
      :scale: 90%
      :align: center

      Boot flow

   The immutable ROM provides ISP service, which could be initial programming of a blank device, erasing and re-programming of a previously programmed device.

   When the rising edge on RESET pin is generated, boot pin (``PA20``) will be sampled to determine whether to continue from normal boot process or ISP service.
   If the boot pin is sampled ``LOW``, the external hardware request to start the ISP service.
   If there is no request for the ISP service execution, a search is made for a valid user program.
   If a valid user program is found, the execution control is transferred to it; otherwise, the dead loop is invoked.


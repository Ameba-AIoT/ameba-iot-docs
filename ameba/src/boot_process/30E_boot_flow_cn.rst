.. tab :: RTL8730E

   The boot flow of |CHIP_NAME| is illustrated below. After a power-up or hardware reset, hardware will boot NP at clock 200MHz.
   The boot process is handled by the on-chip boot ROM and is always executed by the NP core. After the NP bootloader code, the NP will set up the environment for the KM0 and AP.

   - NP boots ROM
   - NP secure boot (optional)
   - NP boots to SRAM
   - NP helps KM0 load images and check the signature (optional)
   - NP helps AP load images and check the signature (optional)

   .. figure:: figures_smart/boot_flow.svg
      :scale: 90%
      :align: center

      Boot flow

   The bootloader controls initial operation after reset or power on and also provides the means to program the Flash memory. This could be initial programming of a blank device, erasure and re-programming of a previously programmed device.

   Assuming that power supply pins are at their nominal levels when the rising edge on RESET pin is generated, then boot pins are sampled and the decision of whether to continue with user code or ISP handler is made. If the boot pins are sampled LOW, the external hardware request to start the ISP command handler is ignored. If there is no request for the ISP command handler execution, a search is made for a valid user program. If a valid user program is found, then the execution control is transferred to it. If a valid user program is not found, the dead loop is invoked.

   Whether boot from NOR or NAND Flash depends on settings in OTP. Also, PSRAM or DDR can be selected to store code and data.


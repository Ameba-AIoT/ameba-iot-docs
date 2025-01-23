.. _8720ea_series:

The RTL8720EA series is a Combo SoC that supports Wi-Fi 6 (2.4GHz) and Bluetooth (BLE 5.2) specifications, with the following fetures:

**System and Platform**

- Dual cores:

  - Real-M300:

    * Arm Cortex-M55 compatible instruction set
    * Running at a frequency of up to 400MHz
    * 16KB 4-way I-Cache, 16KB 4-way D-Cache

  - KR4:

    * RISC-V compatible instruction set
    * Running at a frequency of up to 400MHz
    * 16KB 4-way I-Cache, 16KB 4-way D-Cache

- Memory:

  * 768KB on-chip SRAM
  * Embedded DQ8 PSRAM, up to 200MHz
  * Supports QSPI Flash, up to 100MHz

**Security**

- Secure boot
- Arm TrustZone-M
- True Random Number Generator (TRNG)
- Hardware crypto engine
- ECDSA engine
- Whole or partial Flash encryption
- Read Protection (RDP)
- JTAG/SWD password protection/forbidden
- 2K bytes OTP, up to 2K bits for users

**RF Features**

- Wi-Fi

  * 802.11 b/g/n/ax 1 x 1, 2.4GHz
  * Supports MCS0 - MCS9 20MHz bandwidth
  * Supports antenna diversity
  * Tx Power:

    - 11b 11Mbps: 20dBm
    - 11g 54Mbps: 19dBm (EVM < −25dB)
    - 11n MCS7-HT20: 18dBm (EVM < −27dB)
    - 11ax MCS9-HE20: 16dBm (EVM < −32dB)

  * Rx Sensitivity:

    - 11b 11Mbps: −91dBm
    - 11g 54Mbps: −78dBm
    - 11n MCS7-HT20: −76.5dBm
    - 11ax MCS9-HE20: −70.5dBm

- BT

  * Supports BLE 5.2
  * Supports both 500kbps and 125kbps LE-Coded PHY (long range)
  * Supports scatter-net (concurrent central mode and peripheral mode)
  * Supports SIG Mesh v1.0 and v1.1
  * Supports AoA and AoD

**Peripheral Interfaces**

- Flexible design of GPIO configuration
- Multi-communication interfaces: SPI x 2, UART x 5, I2C x 2
- Supports Real-Time Clock timer together with 15 timers
- Supports 8 channels of PWM timer and 1 capture timer
- Supports 6 channels of general 12-bit ADC
- Supports 9 channels of touch pad
- Supports 8 independent channels of GDMA
- Embeds a serial LEDC to control the external LED lamps
- Integrates a thermal detector to detect and monitor the real-time temperature inside the chip
- Integrated hardware crypto engine supports AES/SHA/ECDSA
- Integrated SPI Flash controller and PSRAM controller
- Integrated Audio Codec: 4 channels DMIC and 1 channel PDM out
- I2S x 2: up to 384kHz sampling rate

**Packaging**

- QFN48 package, 6mm x 6mm
- Operating temperature:

  * Standard temperature: -20°C ~ 85°C
  * Wide-range temperature: -40°C ~ 105°C

**Applications**

With dual RISC cores running up to 400MHz, enhanced computing capability, stable security performance and abundant peripheral resources, the RTL8720EA series is widely used in various fields, such as:

- Home appliance
- Line controller
- BLE gateway
- Micro inverter
- Portable energy storage
- Home energy storage

**Product Comparison**

.. table::
   :width: 100%
   :widths: auto

   +-------------------+-----------+-----------+--------+--------------+-----------+-------+-------+-------------------+-----------+-----------------------+---------------+
   | Package number    | Real-M300 | KR4       | DSP    | On-chip SRAM | TrustZone | Flash | PSRAM | Wi-Fi             | Bluetooth | Operating temperature | Package (mm)  |
   +===================+===========+===========+========+==============+===========+=======+=======+===================+===========+=======================+===============+
   | RTL8720EAF-VA2-CG | 400MHz    | 400MHz    | X      | 768KB        | Y         | 4MB   | X     | Wi-Fi 6 (2.4GHz)  | BLE 5.2   | -20°C ~ 85°C          | QFN48 (6 x 6) |
   +-------------------+-----------+-----------+--------+--------------+-----------+-------+-------+-------------------+-----------+-----------------------+---------------+
   | RTL8720EAF-VA3-CG | 400MHz    | 400MHz    | X      | 768KB        | Y         | 8MB   | X     | Wi-Fi 6 (2.4GHz)  | BLE 5.2   | -20°C ~ 85°C          | QFN48 (6 x 6) |
   +-------------------+-----------+-----------+--------+--------------+-----------+-------+-------+-------------------+-----------+-----------------------+---------------+
   | RTL8720EAM-VA2-CG | 400MHz    | 400MHz    | X      | 768KB        | Y         | X     | 4MB   | Wi-Fi 6 (2.4GHz)  | BLE 5.2   | -20°C ~ 85°C          | QFN48 (6 x 6) |
   +-------------------+-----------+-----------+--------+--------------+-----------+-------+-------+-------------------+-----------+-----------------------+---------------+
   | RTL8720EAM-VT2-CG | 400MHz    | 400MHz    | X      | 768KB        | Y         | X     | 4MB   | Wi-Fi 6 (2.4GHz)  | BLE 5.2   | -40°C ~ 105°C         | QFN48 (6 x 6) |
   +-------------------+-----------+-----------+--------+--------------+-----------+-------+-------+-------------------+-----------+-----------------------+---------------+
   | RTL8710ECF-VT3-CG | 400MHz    | 400MHz    | X      | 768KB        | X         | 8MB   | X     | Wi-Fi 6 (2.4GHz)  | BLE 5.2   | -40°C ~ 105°C         | QFN48 (6 x 6) |
   +-------------------+-----------+-----------+--------+--------------+-----------+-------+-------+-------------------+-----------+-----------------------+---------------+

.. admonition:: More Information

   .. hlist::
      :columns: 3

      * |finger_icon| `Datasheet <https://www.realmcu.com/zh/Home/DownloadList/2f034d6d-e85d-448d-9788-5c04afedb99d>`_
      * |finger_icon| `Application Note <https://ameba-aiot.github.io/ameba-iot-docs/RTL8720EA/en/latest/application_note/index.html>`_
      * |finger_icon| `Wi-Fi Guide <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/src/wifi/wifi_guide_index.html>`_
      * |finger_icon| `AT Command <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/src/at_command/at_command_index.html>`_
      * |finger_icon| `Software Tools <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/src/tools/tools_index.html>`_
      * |finger_icon| `MP Tools <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/en/latest/ameba/src/mptools/mptools_index.html>`_
      * |online_store| `Buy <https://item.taobao.com/item.htm?id=822289532598&pisk=gIGmVS4IyxyfUQOHGgNXdYfNWN9JcSN_DcCTX5EwUur5McFY6zWz8rjV3tPZzY0IjoL6hSHuj0ou0q39f1baqm5THf01sPuZfEZ9lL3jl5NwvHhM9qgfzsyhHf24auznzi5auLFylz4KsHdp94v4l53yvjKOjPUbJ1Pa3RrrzuaT7Ooa37SzVPaN05r2rU4_4rWVg57PzP4g7GoN_8yzSr7V3oyNaQzb4lPabcuyrPHOo1rn_bGyqXya6VgU7b40nkukd15MgrSLxq-Ns1lov8ZF9ufN_b4jzapcB6vTYvZYpkiywsVizPmupxxhic0ZRAyosi8xYVojZSNHBEwnUYHLnYxVsuhYSJPaEN5Zr5k4QfVeTg4SUqHZGmbG_rGx9RqQEF5_B7lLLvoc5egzgPo_dfKCGouZRXMLtIjQoYu3Zg75U9kD71ayWbW1C-z7rkLVnPxbygoKCUYldKw4PrKprUX1B-z7rkTkr9sg3zax3&spm=a1z10.1-c.w4004-24126024402.16.10fa29b28Urw7F>`_
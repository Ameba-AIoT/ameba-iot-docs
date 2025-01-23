.. _8713ec_series:

Realtek RTL8713EC系列芯片为Wi-Fi 6 (2.4GHz)和BLE 5.2的双模SoC产品，具有以下特性：

**系统和平台**

- 多核：

  - Real-M300：

    * Arm Cortex-M55指令集兼容
    * 最大频率400MHz
    * 16KB 4路指令缓存，16KB 4路数据缓存

  - KR4：

    * RISC-V指令集兼容
    * 最大频率400MHz
    * 16KB 4路指令缓存，16KB 4路数据缓存

  - DSP:

    * Cadence Tensilica HiFi 5 DSP
    * 最大频率500MHz
    * 32KB 4路指令缓存，48KB 3路数据缓存，256KB DTCM RAM

- 存储:

  * 512KB on-chip SRAM
  * 内部封装DQ8 PSRAM，最大频率200MHz
  * 支持QSPI Flash，最大频率100MHz

**安全机制**

- 安全启动
- 真随机数生成器（TRNG）
- 硬件加密引擎
- ECDSA引擎
- 整体或部分Flash加密
- 安全固件独立加密保护（RDP）
- JTAG/SWD调试端口密码保护
- 2KB OTP，其中2Kb可供用户使用

**RF特性**

- Wi-Fi

  * 802.11 b/g/n/ax 1 x 1，2.4GHz
  * 支持MCS0 – MCS9 20MHz带宽
  * 支持天线分集
  * 发射功率：

    - 11b 11Mbps：20dBm
    - 11g 54Mbps：19dBm (EVM < −25dB)
    - 11n MCS7-HT20：18dBm (EVM < −27dB)
    - 11ax MCS9-HE20：16dBm (EVM < −32dB)

  * 接收灵敏度：

    - 11b 11Mbps：−91dBm
    - 11g 54Mbps：−78dBm
    - 11n MCS7-HT20：−76.5dBm
    - 11ax MCS9-HE20：−70.5dBm

- BT

  * 支持BLE 5.2
  * 支持500kbps和125kbps LE-Coded PHY (长距离)
  * 支持散射网 (并发中心模式和外设模式）
  * 支持SIG Mesh v1.0 和 v1.1
  * 支持AoA/AoD

**外设接口**

- 灵活的GPIO配置设计
- 多种通信接口：SPI x 2, UART x 5, I2C x 2
- 支持RTC定时器和15路独立定时器
- 支持8通道PWM定时器和捕获定时器
- 支持6通道通用12位ADC
- 支持9通道触摸按键
- 支持8独立通道GDMA
- 内置串行LED控制器，用于控制外部LED灯
- 集成热传感器，用于检测和监控芯片内部的实时温度
- 集成硬件加解密引擎，支持AES/SHA/ECDSA
- 集成SPI Flash控制器和PSRAM控制器
- 集成Audio Codec：4个数字麦克风通道和1个PDM输出通道
- 集成2个I2S接口，最大采样率达384kHz

**封装**

- QFN68封装, 8mm x 8mm
- 工作温度：-20°C ~ 85°C

**应用**

搭载的多核RISC MCU运行速度可高达500MHz，结合强大的运算能力、稳定的安全性能和丰富的外设资源，该系列芯片已广泛应用于以下产品中：

- 智能家电
- 线控器
- 蓝牙网关
- 微型逆变器
- 便携式储能
- 家庭储能

**产品选型**

.. table::
   :width: 100%
   :widths: auto

   +-------------------+-----------+-----------+--------+--------------+-----------+-------+-------+-------------------+-----------+-----------------------+---------------+
   | Part number       | Real-M300 | KR4       | DSP    | On-chip SRAM | TrustZone | Flash | PSRAM | Wi-Fi             | Bluetooth | Operating temperature | Package (mm)  |
   +===================+===========+===========+========+==============+===========+=======+=======+===================+===========+=======================+===============+
   | RTL8713ECM-VA4-CG | 400MHz    | 400MHz    | 500MHz | 512KB        | X         | X     | 16MB  | Wi-Fi 6 (2.4GHz)  | BLE 5.2   | -20°C ~ 85°C          | QFN68 (8 x 8) |
   +-------------------+-----------+-----------+--------+--------------+-----------+-------+-------+-------------------+-----------+-----------------------+---------------+
   | RTL8713ECM-VA3-CG | 400MHz    | 400MHz    | 500MHz | 512KB        | X         | X     | 8MB   | Wi-Fi 6 (2.4GHz)  | BLE 5.2   | -20°C ~ 85°C          | QFN68 (8 x 8) |
   +-------------------+-----------+-----------+--------+--------------+-----------+-------+-------+-------------------+-----------+-----------------------+---------------+

.. admonition:: 更多信息

    .. hlist::
       :columns: 3

       * |finger_icon| `数据手册 <https://www.realmcu.com/zh/Home/DownloadList/2f034d6d-e85d-448d-9788-5c04afedb99d>`_
       * |finger_icon| `应用笔记 <https://ameba-aiot.github.io/ameba-iot-docs/RTL8726EA/en/latest/application_note/index.html>`_
       * |finger_icon| `Wi-Fi指南 <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/cn/latest/ameba/src/wifi/wifi_guide_index_cn.html>`_
       * |finger_icon| `AT命令 <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/cn/latest/ameba/src/at_command/at_command_index_cn.html>`_
       * |finger_icon| `软件工具 <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/cn/latest/ameba/src/tools/tools_index_cn.html>`_
       * |finger_icon| `MP工具 <https://ameba-aiot.github.io/ameba-iot-docs/RTL8721Dx/cn/latest/ameba/src/mptools/mptools_index_cn.html>`_
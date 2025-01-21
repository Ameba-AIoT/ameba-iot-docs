.. _8730e_series:

Realtek RTL8730E系列芯片为双频Wi-Fi 6 (2.4GHz + 5GHz)和Bluetooth 5.3的双模SoC产品，具有以下特性：

**系统和平台**

- 多核：

  * Dual-core Arm Cortex-A32
  * Real-M300
  * Real-M200

- Dual-core Arm Cortex-A32：

  * Arm Cortex-A32指令集兼容
  * 最大频率1.32GHz
  * 32KB 2路指令缓存，32KB 4路数据缓存
  * 256KB 8路二级缓存

- Real-M300：

  * Arm Cortex-M55指令集兼容
  * 最大频率333MHz
  * 64KB 4路指令缓存，32KB 4路数据缓存

- Real-M200：

  * Arm Cortex-M23 指令集兼容
  * 最大频率40MHz
  * 16KB 2路指令缓存，8KB 2路数据缓存

- 存储:

  * 支持NOR Flash或NAND Flash
  * 支持PSRAM或DDR内存扩展

**安全机制**

- 安全启动
- 支持Arm TrustZone和TrustZone-M
- 真随机数生成器（TRNG）
- 硬件加密引擎，支持AES和SHA算法
- ECDSA/EdDSA/RSA引擎
- 整体或部分Flash加密
- 安全固件独立加密保护（RDP）
- JTAG/SWD调试端口密码保护
- 2KB OTP，其中2Kb可供用户使用

**RF特性**

- Wi-Fi

  * 802.11 a/b/g/n/ax 1 x 1，2.4GHz + 5GHz
  * 支持MCS0 – MCS9 20MHz带宽
  * 支持低功耗模式
  * 支持天线分集

- BT

  * 支持蓝牙5.3：
  * 经典蓝牙 (BR/EDR)
  * 低功耗蓝牙 (BLE)
  * 支持蓝牙长距离
  * 蓝牙独立天线
  * 支持散射网 (并发中心模式和外设模式）
  * 支持SIG Mesh v1.0 和 v1.1
  * 支持AoA/AoD
  * 支持LE 语音 (CIS和BIS模式)

**外设接口**

- 灵活的GPIO配置设计
- 多种通信接口：SPI x 2, UART x 4, I2C x 3
- 硬件IR收发器，易于适配各种IR协议
- 支持RTC定时器和12路独立定时器
- 支持6通道PWM定时器和捕获定时器
- 支持6通道通用12位ADC和1个电源量测专用通道
- 支持9通道触摸按键
- 支持8独立通道GDMA
- 支持USB 2.0 OTG模式
- 内置SD主机控制器，用于访问SD卡和eMMC设备
- 内置串行LED控制器，用于控制外部LED灯
- 集成热传感器，用于检测和监控芯片内部的实时温度
- 2通道MIPI-DSI接口，使用D-PHY，每个通道的最大数据传输速率为1Gbps
- 集成Audio Codec：

  * 5通道ADC或8个数字麦克风通道
  * 2通道DAC和耳机放大器

- 集成2个I2S接口，最大采样率达384kHz
- 低功耗VAD

**封装**

- QFN100封装, 10mm x 10mm
- DR-QFN144封装, 11mm x 11mm

**应用**

集成的双核Arm© Cortex-A32 CPU和RISC低功耗MCU，可满足广泛的客户AIoT应用需求。结合丰富的外围接口, 该系列芯片已成功应用于以下产品中：

- 智能音箱
- 中控面板
- 家庭影院
- 无线网关
- 智能厨电
- 工业控制面板

**产品选型**

.. table::
   :width: 100%
   :widths: auto

   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | Part number       | CA32  | Real-M300 | Real-M300 | On-chip SRAM | TrustZone | NOR Flash  | PSRAM | DDR          | Wi-Fi                   | Bluetooth    | GPIO  | Package (mm)        |
   +===================+=======+===========+===========+==============+===========+============+=======+==============+=========================+==============+=======+=====================+
   | RTL8730EAH-VA3-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | 8MB        | 8MB   | X            | Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 40    | QFN100 (10 x 10)    |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | RTL8730EAH-VD3-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | 16MB       | 8MB   | X            | Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 40    | QFN100 (10 x 10)    |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | RTL8730EAH-VH6-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | 32MB       | X     | 64MB (DDR2)  | Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 40    | QFN100 (10 x 10)    |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | RTL8730EAM-VA6-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | X          | X     | 64MB (DDR2)  | Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 40    | QFN100 (10 x 10)    |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | RTL8730ELH-VA3-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | 8MB        | 8MB   | X            | Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 61    | DR-QFN144 (11 x 11) |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | RTL8730ELM-VA7-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | X          | X     | 128MB (DDR2) | Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 61    | DR-QFN144 (11 x 11) |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+
   | RTL8730ELM-VA8-CG | 1.2GHz| 333MHz    | 40MHz     | 256KB        | Y         | X          | X     | 256MB (DDR3L)| Wi-Fi 6 (2.4GHz + 5GHz) | Bluetooth 5.3| 61    | DR-QFN144 (11 x 11) |
   +-------------------+-------+-----------+-----------+--------------+-----------+------------+-------+--------------+-------------------------+--------------+-------+---------------------+


.. admonition:: 更多信息

   .. hlist::
      :columns: 3

      * |finger_icon| `规格书 <https://www.realmcu.com/zh/Home/DownloadList/20d00b7b-4a60-4ece-9bca-820267a0af53>`_
      * |finger_icon| `应用笔记 <https://ameba-aiot.github.io/ameba-iot-docs/RTL8730E/en/latest/application_note/index.html>`_
      * |finger_icon| `Wi-Fi指南 <https://ameba-aiot.github.io/ameba-iot-docs/RTL8730E/en/latest/ameba/en/wifi/index.html>`_
      * |finger_icon| `AT命令 <https://ameba-aiot.github.io/ameba-iot-docs/RTL8730E/en/latest/ameba/en/at_command/src/index.html>`_
      * |finger_icon| `软件工具 <https://ameba-aiot.github.io/ameba-iot-docs/RTL8730E/en/latest/ameba/en/software_tools/index.html>`_
      * |finger_icon| `MP工具 <https://ameba-aiot.github.io/ameba-iot-docs/RTL8730E/en/latest/ameba/en/mp_tools/src/index.html>`_
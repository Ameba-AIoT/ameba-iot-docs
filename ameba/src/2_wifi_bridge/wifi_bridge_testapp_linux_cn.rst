APP 架构
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
APP封装了一些WIFI 操作比如：连线，扫描，让Host可以控制Ameba的行为。


APP使用 netlink 实现APP和底层通信，当底层驱动收到相关的命令之后, 会通过接口传给SoC让SoC执行相应的操作，反向亦然。

.. figure:: figures/bridge_testapp_control_flow.svg
   :scale: 90%
   :align: center

   testapp control flow

APP 支持的命令
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. table::
   :width: 100%
   :widths: auto

   +----------------------------+----------------------------------------------------------------------------------------------+
   | Command                    | Description                                                                                  |
   +============================+==============================================================================================+
   | wifi_connect param1 param2 | Connect to AP.                                                                               |
   |                            |                                                                                              |
   |                            | :param1: SSID                                                                                |
   |                            |                                                                                              |
   |                            | :param2: password  (option)                                                                  |
   +----------------------------+----------------------------------------------------------------------------------------------+
   | disconnect                 | Disconnect to AP                                                                             |
   +----------------------------+----------------------------------------------------------------------------------------------+
   | scan                       | Trigger scan                                                                                 |
   +----------------------------+----------------------------------------------------------------------------------------------+
   | scanres                    | Get and print scan result                                                                    |
   +----------------------------+----------------------------------------------------------------------------------------------+


APP 的编译和执行
~~~~~~~~~~~~~~~~~~~~~~~~~~
1. 复制 ``sdio_bridge/bridge_api`` 到Host Kernel

2. 编译执行bridge，然后就可以输入相关的指令了

   .. code-block:: C

      $cd sdio_bridge/bridge_api/testapp
      $make
      $sudo ./bridge

   .. figure:: figures/bridge_testapp_control_flow.png
      :scale: 60%
      :align: center
      :name: bridge_testapp_control_flow

      testapp control flow

   .. figure:: figures/bridge_ifconfig_result.png
      :scale: 60%
      :align: center
      :name: bridge_ifconfig_result

      ifconfig result

APP 测试过程
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

确保host 驱动正确编译并加载，APP正确编译之后，执行如下步骤测试数据通路：

1. ``sudo ./bridge``

2. ``scan`` 触发WiFi 扫描

3. ``scanres`` 获取扫描列表

4. ``wifi_connect target_ssid password`` 连接AP, 连线成功之后IP地址也会自动获取

5. ``ifconfig`` 检查 ``eth_sta0`` 的IP地址是否已经正确获取

之后可以执行 ``ping`` 后者 ``iperf`` 命令测试数据通路
APP Architecture
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The testapp wraps some Wi-Fi commands, such as Wi-Fi connect, Wi-Fi scan, which can be used to control Ameba from host side.


The testapp uses netlink to communicate with SDIO host driver. When SDIO host driver receives related commands, the testapp will inform SDIO device to perform corresponding operation by SDIO interface. The control flow is illustrated below.

.. figure:: figures/bridge_testapp_control_flow.svg
   :scale: 90%
   :align: center

   testapp control flow

APP Commands
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The supported commands are listed below.

.. table::
   :width: 100%
   :widths: auto

   +----------------------------+----------------------------------------------------------------------------------------------+
   | Command                    | Description                                                                                  |
   +============================+==============================================================================================+
   | wifi_connect param1 param2 | Used to connect to AP.                                                                       |
   |                            |                                                                                              |
   |                            | :param1: SSID                                                                                |
   |                            |                                                                                              |
   |                            | :param2: password                                                                            |
   |                            |                                                                                              |
   |                            | *param2* can be absent when connect to AP which security type is open.                       |
   |                            |                                                                                              |
   |                            | The IP address will also be obtained and configured after successfully connected to AP.      |
   +----------------------------+----------------------------------------------------------------------------------------------+
   | disconnect                 | Disconnect to AP                                                                             |
   +----------------------------+----------------------------------------------------------------------------------------------+
   | scan                       | Trigger scan                                                                                 |
   +----------------------------+----------------------------------------------------------------------------------------------+
   | scanres                    | Get and print scan result                                                                    |
   +----------------------------+----------------------------------------------------------------------------------------------+

APP Build and Run
~~~~~~~~~~~~~~~~~~~~~~~~~~
1. Copy ``sdio_bridge/bridge_api`` folder to host

2. Compile and execute as below, then you can input test commands listed in Section :ref:`bridge_supported_commands` to test

   .. code-block:: C

      $cd sdio_bridge/bridge_api/testapp
      $make
      $sudo ./bridge

   For example, ``./bridge wifi_connect xiaomi_esther 12345678`` means connect to an AP whose SSID is ``xiaomi_esther`` and password is ``12345678``, as shown in Figure :ref:`testapp control flow <bridge_testapp_control_flow>`.
   
   After Wi-Fi connect command executed, the ``eth_sta0`` interface can be shown by command ``ifconfig``, the IP address will also be configured automatically, and this IP address will be the same IP address in |CHIP_NAME|, as shown in Figure :ref:`ifconfig result <bridge_ifconfig_result>`.

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

APP Test Flow
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The following is a simple operation flow. After configuration as below, data communication can be started.


After make and install host driver, and successfully make testapp, enter ``sdio_bridge/testapp folder``.

1. Input ``sudo ./bridge`` to start.

2. Input ``scan`` command to trigger scan.

3. Input ``scanres`` command to get and print scan result

4. Input ``wifi_connect target_ssid password`` command to connect your target AP, ``target_ssid`` and ``password`` in this command will be your target AP's SSID and password.

5. After successfully connected, use the standard ``ifconfig`` to check the interface, and the IP address will be already configured.

After these steps, data path can be started, you can use the standard ``ping`` command or ``iperf`` command to test the data path.
.. _mqtt_at_commands:

MQTT AT Commands
================================

The MQTT AT commands supports all the AT commands mentioned on this page. The MQTT AT commands is disabled by default.
If you need |CHIP_NAME| to support MQTT AT commands, you can enable MQTT AT commands by the following steps:

   - Navigate to your target project and open configuration menu.

      .. only:: RTL8721D

         .. code-block::

            cd amebadplus_gcc_project
            ./menuconfig.py

      .. only:: RTL8726EA

         .. code-block::

            cd amebalite_gcc_project
            ./menuconfig.py

   - Select :menuselection:`CONFIG AT CMD -> Enable MQTT`

The default ATCMD mode is LOGUART. If you need |CHIP_NAME| to support MCU control mode, you can enable MCU control mode by the following selections:

   - Select :menuselection:`CONFIG AT CMD -> ATCMD Mode -> MCU Control`

   - Save and Exit.

.. note::
   
   The ``TT mode`` is only supported for MCU control mode. If you need use ``TT mode`` for AT commands, you need enable MCU control mode.
   The details of ``TT mode`` refer to :ref:`Transparent Transmission <transparent_transmission>`.

.. _mqtt_at_mqttcfg:

AT+MQTTUSERCFG
--------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Set MQTT user configuration

.. note:: 
   - Connect to the AP before using the MQTT AT commands.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTUSERCFG=<link_id>,<conn_type>,<client_id>,<username>,<password>,<certificate_index>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: Link ID.

   - Range: [0,3]

:<conn_type>: MQTT connection type.

   - 1: MQTT over TCP.

   - 2: MQTT over TLS (no certificate verify).

   - 3: MQTT over TLS (verify server certificate).

   - 4: MQTT over TLS (provide client certificate).

   - 5: MQTT over TLS (verify server certificate and provide client certificate).

:<client_id>: MQTT client ID.

:<username>: The username to login to the MQTT broker.

:<password>: The password to login to the MQTT broker.

:<certificate_index>: Certificate index. Default 0.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Malloc error.

:6: Read CA/certificate/PK failed.

:8: MQTT client already connected to broker.

Example
~~~~~~~~~~~~~~
For the case set with ``<username>`` and ``<password>``:
.. code-block::

   AT+MQTTUSERCFG=0,1,publisher,rs,12345678,0
   OK

For the case set without ``<username>`` and ``<password>``:

.. code-block::

   AT+MQTTUSERCFG=0,1,publisher,,,0
   OK

.. _mqtt_at_mqttconncfg:

AT+MQTTCONNCFG
----------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Set MQTT connection configuration.

.. note::
   
   It is optional. If user don't set connection configuration with this command, the connection configuration will set as default value.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTCONNCFG=<link_id>,<keepalive>,<timeout>,<disable_clean_session>[,<lwt_topic>,<lwt_msg>,<lwt_qos>,<lwt_retain>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: Link ID.

   - Range: [0,3]

:<keepalive>: Timeout of MQTT ping.

   - Unit: second. Default: 60s.

:<timeout>: Timeout of MQTT send/receive.

   - Unit: millisecond. Default: 60s.

:<disable_clean_session>:  Set MQTT clean session.

   - 0: enable clean session.

   - 1: disable clean session.

:<lwt_topic>: LWT (Last Will and Testament) message topic.

:<lwt_msg>: LWT message.

:<lwt_qos>: LWT QoS.

   - Which can be set to 0, 1, or 2. Default: 0

:<lwt_retain>: LWT retain.

   - Which can be set to 0 or 1. Default: 0.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Malloc error.

Example
~~~~~~~~~~~~~~
For the case set with ``LWT``:

.. code-block::

   AT+MQTTCONNCFG=0,20,1000,0,topic/lwt,This is a lwt message,0,0
   OK

For the case set without ``LWT``:

.. code-block::

   AT+MQTTCONNCFG=0,20,1000,0
   OK

.. _mqtt_at_mqttconn:

AT+MQTTCONN
----------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Connect to MQTT broker.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTCONN=<link_id>,<host>,<port>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

When AT receives ACK from host, it will prompt:

.. code-block::

   $ACK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: Link ID.

   - Range: [0,3]

:<host>: MQTT broker domain.

:<port>: MQTT broker port.

   - Default: 1883 for MQTT over TCP, 8883 for MQTT over TLS. Range: [1,65535].

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Malloc error.

:3: Connection error.

:14: MQTT main task create error.

:15: Not connect to a Wi-Fi.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTCONN=0,broker.hivemq.com,1883
   OK
   $ACK

.. _mqtt_at_mqttdisconn:

AT+MQTTDISCONN
----------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Disconnect from MQTT broker and release the resource.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTDISCONN=<link_id>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: Link ID.

   - Range: [0,3]

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:4: Disconnection error.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTDISCONN=0
   OK

.. _mqtt_at_mqttsub:

AT+MQTTSUB
--------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Subscribe a topic from MQTT broker. Up to 5 topics can be subscribed.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTSUB=<link_id>,<topic>,<qos>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

If the topic has been subscribed before, it will prompt:

.. code-block::

   ALREADY SUBCRIBE

When AT receives ACK from host, it will prompt:

.. code-block::

   $ACK

Or

.. code-block::

   ERROR:<error_no>

When AT receives MQTT messages of the subscribed topic, it will prompt:

.. code-block::

   $+MQTTSUBRECV:<link_id>,<msg_id>,<topic>,<msg>,<msg_len>,<qos>,<dup>,<retain>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: Link ID.

   - Range: [0,3]

:<topic>: The string of topic to be subscibed.

:<qos>: The QoS value.

   - Which can be set to 0, 1, or 2. Default: 2

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Malloc error.

:7: Not connect to the host.

:10: Can not subscribe this topic.

:13: Time out.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTSUB=0,LASS/Test/Pm25Ameba/#,1
   OK
   $ACK

When AT receives MQTT messages of the subscribed topic:

.. code-block::

   $+MQTTSUBRECV:0,401,LASS/Test/Pm25Ameba/FT1_018,hello from AMEBA 43,19,1,0,0

.. _mqtt_at_mqttunsub:

AT+MQTTUNSUB
------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Unsubscribe a topic from MQTT broker.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTUSSUB=<link_id>,<topic>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

When AT receives ACK from host, it will prompt:

.. code-block::

   $ACK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: Link ID.

   - Range: [0,3]

:<topic>: The topic that is subscibed.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:7: Not connect to the host.

:11: Can not unsubscribe this topic.

:13: Time out.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTUNSUB=0,LASS/Test/Pm25Ameba/#
   OK
   $ACK

.. _mqtt_at_mqttpub:

AT+MQTTPUB
--------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Publish a message for specific topic.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTPUB=<link_id>,<msg_id>,<topic>,<msg>,<qos>,<retain>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

When AT receives ACK from host, it will prompt:

.. code-block::

   $ACK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: Link ID.

   - Range: [0,3]

:<msg_id>: MQTT message id.

   - Range: [0,65535]

:<topic>: MQTT topic.

   - It is suggested to fill a topic subscribed before.

:<msg>: MQTT message.

:<qos>: QoS of message.

   - Which can be set to 0, 1, or 2. Default: 0.

:<retain>: Retain value.

   - Which can be set to 0 or 1. Default: 0.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Malloc error.

:7: Not connect to the host.

:9: Publish failed.

:13: Time out.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTPUB=0,1,LASS/Test/Pm25Ameba/FT1_018,This is a test,1,1
   OK
   $ACK

.. _mqtt_at_mqttpubraw:

AT+MQTTPUBRAW
--------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Publish a message for specific topic of specified length.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTPUBRAW=<link_id>,<msg_id>,<topic>,<length>,<qos>,<retain>

Response
~~~~~~~~~~~~~~~~
::

   > > >

The symbol ``>>>`` indicates that AT service is ready for receiving serial data, and you can enter the data now.
When the requirement of message length determined by the parameter ``<length>`` is met, the transmission starts.
If the transmission is successful, it returns:

.. code-block::

   OK

When AT receives ACK from host, it will prompt:

.. code-block::

   $ACK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: Link ID.

   - Range: [0,3]

:<msg_id>: MQTT message id.

   - Range: [0,65535]

:<topic>: MQTT topic.

   - It is suggested to fill a topic subscribed before.

:<length>: Length of MQTT message.

:<qos>: QoS of message.

   - Which can be set to 0, 1, or 2. Default: 0.

:<retain>: Retain value.

   - Which can be set to 0 or 1. Default: 0.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Malloc error.

:5: TT mode start failed.

:7: Not connect to the host.

:9: Publish failed.

:13: Time out.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTPUBRAW=0,2,LASS/Test/Pm25Ameba/FT1_018,14,1,1
   >>>
   This is a test
   OK
   $ACK

.. _mqtt_at_mqttreset:

AT+MQTTRESET
------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Reset all MQTT entities and release resource.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTRESET

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

.. note:: If there are any running MQTT entities, there will be all disconnected and deleted right now.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTRESET
   OK

.. _mqtt_at_mqttquery:

AT+MQTTQUERY
------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Query the connection status and configuration.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTQUERY=<link_id>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   link_id: <link_id>
   state: <isconnected>
   conn_type: <conn_type>
   host: <host>
   port: <port>
   clientId: <client_id>
   userName: <username>
   password: <password>
   command_timeout_ms: <timeout>
   keepAliveInterval: <keepalive>
   cleansession: <disable_clean_session>
   LWT: <lwt_flag>
      qos: <lwt_qos>
      retain: <lwt_retain>
      topic: <lwt_topic>
      message: <lwt_msg>

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: Link ID.

   - Range: [0,3]

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTQUERY=0

   link_id: 0
   state: 1
   conn_type: 1
   host: broker.hivemq.com
   port: 1883
   clientId: publisher
   userName: rs
   password: 12345678
   command_timeout_ms: 1000
   keepAliveInterval: 10000
   cleansession: 0
   LWT: 1
      qos: 0
      retain: 0
      topic: topic/lwt
      message: This is a lwt message
   
   OK

.. _mqtt_at_mqttsubquery:

AT+MQTTSUBQUERY
------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
List all MQTT topics that have been already subscribed.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+MQTTSUBQUERY=<link_id>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   link_id: <link_id>
   state: <isconnected>
   topic: <topic1>, qos: <topic1_qos>
   topic: <topic2>, qos: <topic2_qos>
   ...
   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: Link ID.

   - Range: [0,3]

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

Example
~~~~~~~~~~~~~~
::

   AT+MQTTSUBQUERY=0

   link_id: 0
   state: 1
   topic: LASS/Test/Pm25Ameba/#, qos: 1

   OK
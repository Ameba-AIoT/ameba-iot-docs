.. _tcp_ip_at_commands:

Socket AT Commands
====================================

.. _tcp_ip_at_sktserver:

AT+SKTSERVER
------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Start as a socket server.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+SKTSERVER=<mode>,<loc_port>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +SKTSERVER:OK
   +SKTSERVER:con_id=<con_id>

Or

.. code-block::

   +SKTSERVER:ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<mode>: The server mode.

   - 0: TCP.

   - 1: UDP.

   - 2: SSL. The value 2 maybe not supported, depending on release version.

:<loc_port>: The local port value.

   - [1, 65535]

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Error parameter number.

:2: Local port error.

:3: Create con_id error.

:4: Create server task error.

:5: Create socket error.

:6: Set socket option error.

:7: Bind error.

:8: Listen error.

:9: TCP server already exists error.

:10: Accept error.

:11: Create con_id for seed error.

:12: UDP server already exists error.

:13: Server can’t start under TT (transparent transmission) mode.

:14: Connection type is unknown (SSL isn’t supported).

:15: Listening socket on bind_ip: port failed for SSL server.

:16: Malloc failed for server certificate.

:17: Malloc failed for server key.

:18: x509_crt_parse failed for server certificate.

:19: x509_crt_parse failed for server ca list.

:20: pk_parse_key failed for server key.

:21: Hang node failed for SSL server.

:22: Accept error for SSL server.

:23: Malloc failed for SSL seed.

:24: Initialization failed for SSL context.

:25: Ssl_set_own_cert error.

:26: SSL handshake failed for SSL seed.

:27: Create node failed for SSL seed.

.. _tcp_ip_at_sktclient:

AT+SKTCLIENT
------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Start as a socket client.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+SKTCLIENT=<mode>,<rmt_host>,<rmt_port>[,<loc_port>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +SKTCLIENT:OK
   +SKTCLIENT:con_id=<con_id>

Or

.. code-block::

   +SKTCLIENT:ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<mode>: The client mode.

   - 0: TCP.

   - 1: UDP.

   - 2: SSL. The value 2 maybe not supported, depending on release version.

:<rmt_host>: The address of remote host.

   - A hexadecimal data string of IP address, or web address.

:<rmt_port>: The port of remote host.

   - [1,65535]

:<loc_port>: The port of local client.

   - [1,65535]

   - Only valid in UDP mode.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Error parameter number.

:2: Can not find the host.

:3: Error remote port.

:4: Create con_id error.

:5: Create task error.

:6: Error remote address.

:7: Create socket error.

:8: Hang node error for TCP client.

:9: Connect error for TCP client.

:10: Hang node error for UDP client.

:11: Local port should be 1~65535.

:12: Bind local port error.

:13: Connection already exists for TT (transparent transmission) mode.

:14: Set broadcast on socket failed.

:15: Set multicast add membership on socket failed.

:16: Set multicast interface failed.

:17: Connection type is unknown (SSL isn’t supported).

:18: Initiate a TCP connection with host: port failed for SSL client.

:19: Memory allocation failed for SSL context structure.

:20: SSL context initialization failed.

:21: SSL handshake failed.

:22: Hang node failed for SSL client.

.. _tcp_ip_at_sktdel:

AT+SKTDEL
------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Stop a (all) socket server(s) or client(s).

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+SKTDEL=<con_id>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +SKTDEL:OK

Or

.. code-block::

   +SKTDEL:ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<con_id>: The entity connect id to be deleted.

   - [0,9]

   - The value 0 means to delete all <con_id>s.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Error input parameter.

.. _tcp_ip_at_skttt:

AT+SKTTT
----------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Enable transparent transfer mode.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+SKTTT=<enable>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +SKTTT:OK

Or

.. code-block::

   +SKTTT:ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<enable>: Enable transparent transfer mode.

   - 1: Enable.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Error input parameter.

:2: No connection found when try to enter TT mode.

:3: Can not enter TT mode if it’s server connection.

:4: More than one connection when try to enter TT mode.

:5: Start TT task failed.

.. note:: Once enter transparent transfer mode successfully, you can enter 4 consecutive hyphens "----" to leave transparent transfer mode, but not by another AT command.


Example
~~~~~~~~~~~~~~
.. code-block::

   // create TCP client, single connection
   AT+SKTCLIENT=0,192.168.99.101,5001
   +SKTCLIENT:OK
   [AT+SKTCLIENT] con_id=1
   // Enable TT mode
   AT+SKTTT=1
   +SKTTT:OK
   // Input the data for transparent transfer, then press ENTER
   Hello world!
   // Input "----" to exit TT mode
   ----
   // Return to command mode now

.. _tcp_ip_at_sktsend:

AT+SKTSEND
--------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Send socket message.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+SKTSEND=<data_size>,<con_id>[,<dst_ip>,<dst_port>]:<data>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +SKTSEND:OK

Or

.. code-block::

   +SKTSEND:ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<data_size>: The sent data length in bytes.

   - A positive number.

:<con_id>: The connect id of client.

   - [1,9]

:<dst_ip>: The destination IP address.

   - IP address format.

   - Only valid in UDP mode.

:<dst_port>: The destination port.

   - [1,65535]

   - Only valid in UDP mode.

:<data>: Followed by a colon.

   - This is a string. After the colon delimiter, any input will be consider as part of <data>.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Error input parameter.

:2: Error buffer size.

:3: <con_id> is not found.

:4: Error UDP server.

:5: sendto error for UDP server.

:6: sendto error for UDP client.

:7: TCP server should send data to the seed.

:8: Write error for TCP client/server.

Example
~~~~~~~~~~~~~~
.. code-block::

   // query connection information
   AT+SKTSTATE
   con_id:1,server,tcp,address:192.168.99.143,port:5001,socket:0
   con_id:2,seed,tcp,address:192.168.99.185,port:64089,socket:1
   con_id:3,server,udp,address:192.168.99.143,port:5002,socket:2
   con_id:4,client,tcp,address:192.168.99.185,port:5001,socket:3
   con_id:5,client,udp,address:64.233.189.104,port:8080,socket:4
   +SKTSTATE:OK
   // send data to TCP client(Seed) (con_id 2)
   AT+ SKTSEND=14,2:Hello_World!
   +SKTSEND:OK,2
   // send data to UDP Server via UDP client(con_id 5)
   AT+ SKTSEND=14,5:Hello_China!
   + SKTSEND:OK,5

.. _tcp_ip_at_sktread:

AT+SKTREAD
--------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Receive socket message.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+SKTREAD=<con_id>,<buff_size>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +SKTREAD:OK

Or

.. code-block::

   +SKTREAD:ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<con_id>: The connect entity id.

   - [0,3]

:<buff_size>: The data length in bytes.

   - A positive number.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Error input parameter.

:2: Buffer Size error.

:3: <con_id> is not found.

:4: recvfrom error for UDP server.

:5: recvfrom error for UDP client/seed.

:6: TCP server should receive from seed.

:7: Connection lost.

:8: read error for TCP con_id.

.. note:: The <dst_ip>, <dst_port> will append only if receive data via UDP server created at localhost.


Example
~~~~~~~~~~~~~~
.. code-block::

   // query connection information
   AT+SKTSTATE
   con_id:1,server,tcp,address:192.168.99.143,port:5001,socket:0
   con_id:2,seed,tcp,address:192.168.99.185,port:64089,socket:1
   con_id:3,server,udp,address:192.168.99.143,port:5002,socket:2
   con_id:4,client,tcp,address:192.168.99.185,port:5001,socket:3
   con_id:5,client,udp,address:64.233.189.104,port:8080,socket:4
   +SKTSTATE:OK
   // receive data “12345678” via TCP seed (con_id 2)
   AT+ SKTREAD=2,1500
   +SKTREAD:OK,8,2:12345678
   // receive data “12345678” via UDP server(con_id 3)
   AT+SKTREAD=3,1500
   +SKTREAD:OK,8,3,192.168.99.185,52795:12345678
   // receive data “12345678” via TCP client(con_id 4)
   AT+SKTREAD=4,1500
   +SKTREAD:OK,8,4:12345678

.. _tcp_ip_at_sktrecvcfg:

AT+SKTRECVCFG
--------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Configure socket receiving.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+SKTRECVCFG=<enable>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +SKTRECVCFG:OK

Or

.. code-block::

   +SKTRECVCFG:ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<enable>: Enable or disable auto-receive data mode.

   - 0: Disable auto-receive data mode.

   - 1: Enable auto-receive data mode.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Error input parameter.

:2: Failed to start task.

.. note:: Once the auto receive mode is enabled, any packet received on any connection will return to host automatically in the same format as AT+SKTREAD (refer to AT+SKTREAD, response of command AT+SKTREAD) in normal transmission mode. But if under transparent transmission mode, received data will return to host without any information in the head.

.. _tcp_ip_at_sktstate:

AT+SKTSTATE
----------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Get the socket state currently.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+SKTSTATE

Response
~~~~~~~~~~~~~~~~
.. code-block::

   con_id:<con_id>,<server/seed(TCP_client)/client>,<tcp/udp>,address:<IP_ADDRESS>,port:<PORT>,socket:<socket id>
   // Any other <con_id>s if exist.
   +SKTSTATE:OK

Parameter
~~~~~~~~~~~~~~~~~~
None




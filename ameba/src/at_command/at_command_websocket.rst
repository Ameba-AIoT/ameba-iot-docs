.. _websocket_at_commands:

WebSocket AT Commands
================================

The WebSocket AT Commands are not enabled by default, and you can enable WebSocket AT commands by the following selections:

   - Select :menuselection:`CONFIG AT CMD -> ATCMD Mode -> MCU Control`
   - Select :menuselection:`CONFIG AT CMD -> Enable WEBSOCKET`

.. _websocket_at_wsglcfg:

AT+WSGLCFG
----------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Configure global parameters for WebSocket.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+WSGLCFG=[<connect_timeout>,<recv_timeout>,<send_timeout>,<send_blocktime>,<keepalive_idle>,<keepalive_interval>,<keepalive_count>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<connect_timeout>: The timeout for establishing WebSocket connection in seconds.

   - A nonnegative number. 
   
   - It is 0 as default.

:<recv_timeout>: The timeout for receiving data, value for SO_RCVTIMEO option.

   - A nonnegative number.
   
   - It is 0 as default.
   
:<send_timeout>: The timeout for sending data, value for SO_SNDTIMEO option.

   - A nonnegative number.
   
   - It is 0 as default.

:<send_blocktime>: The block time for sending data.

   - A nonnegative number.
   
   - It is 0 as default.

:<keepalive_idle>: The value for TCP_KEEPIDLE option.

   - A nonnegative number.
   
   - It is 0 as default.
   
:<keepalive_interval>: The value for TCP_KEEPINTVL option.

   - A nonnegative number.
   
   - It is 0 as default.
   
:<keepalive_count>: The value for TCP_KEEPCNT option.

   - A nonnegative number.
   
   - It is 0 as default.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+WSGLCFG=5,2000,2000,0,3,5,3
   OK
   
   AT+WSGLCFG=0,,2000,0
   OK

.. _websocket_at_wscfg:

AT+WSCFG
------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Configure parameters for a WebSocket connection.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+WSCFG=<link_id>,<ping_intv_sec>,<ping_timeout_sec>[,<buffer_size>,<max_queue_size>,<protocol>,<version>,<stable_buf_num>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: The connect id.

   - [0,2]

:<ping_intv_sec>: The send interval of ping in seconds.

   - [1,7200]
   
   - It is 10 as default.

:<ping_timeout_sec>: The timeout of ping in seconds.

   - [1,7200]
   
   - It is 120 as default.
   
:<buffer_size>: The buffer size of tx and rx.

   - [1,16384]
   
   - It is 1500 as default.

   
:<max_queue_size>: The max size of queue.

   - [1,50]
  
   - It is 3 as default.

:<protocol>: The string of subprotocols using the WebSocket protocol.

   - It is "chat, superchat" as default.

:<version>: The string of version using the WebSocket protocol.

   - It is "13" as default.

:<stable_buf_num>: The stable buffer number in send queue.

   - A positive number and can not be greater than <max_queue_size>.
   
   - It is 3 as default.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Memory error.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+WSCFG=0,5,100,2000
   OK

.. _websocket_at_wshead:

AT+WSHEAD
----------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Configure request headers of WebSocket. Only one WebSocket request header can be set at a time, but it can be set multiple times.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+WSHEAD=<link_id>,<req_header_len>[,<req_header>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: The connect id.

   - [0,2]

:<req_header_len>: The length of request header.

   - If <req_header_len> is 0, it will clear all WebSocket request headers previously set.

:<req_header>: The string of request header.

   - The format is key: value.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Memory error.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+WSHEAD=0,26,Origin: http://example.com
   
   OK

.. _websocket_at_wsheadraw:

AT+WSHEADRAW
----------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Configure request headers of WebSocket with TT mode. Only one WebSocket request header can be set at a time, but it can be set multiple times.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+WSHEADRAW=<link_id>,<req_header_len>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: The connect id.

   - [0,2]

:<req_header_len>: The length of request header.

   - If <req_header_len> is 0, it will clear all WebSocket request headers previously set.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Memory error.

:3: TT mode error.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+WSHEADRAW=0,26

   enter tt mode
   
   // When the following printing occurs on MCU, you can input request header.
   >>>
   // Input request header, then press ENTER.
   Origin: http://example.com
   
   exit tt mode

   OK
   
.. note:: The total number of request headers that can be set for WSHEAD and WSHEADRAW cannot exceed 10.

.. _websocket_at_wsquery:

AT+WSQUERY
--------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Query global parameters and parameters of each connection.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+WSQUERY=[<link_id>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   // Here, print global parameters and parameters of connection.
   Global config:
       connect_timeout: <connect_timeout>
       recv_timeout: <recv_timeout>
       send_timeout: <send_timeout>
       send_blocktime: <send_blocktime>
       keepalive_idle: <keepalive_idle>
       keepalive_interval: <keepalive_interval>
       keepalive_count: <keepalive_count>

   link_id: <link_id>
       status: <status>
       ping_intv_sec: <ping_intv_sec>
       ping_timeout_sec: <ping_timeout_sec>
       buffer_size: <buffer_size>
       max_queue_size: <max_queue_size>
       protocol: <protocol>
       version: <version>
       stable_buf_num: <stable_buf_num>
       header:
           <header>
   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: The connect id.

   - [0,2]

   - If <link_id> is absent, global parameters and parameters of all connections will be printed. Otherwise, only parameters of <link_id> and global parameters will be printed.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+WSQUERY=0
   
   // Here, global parameters and parameters of connection 0 will be printed.
   Global config:
       connect_timeout: 0
       recv_timeout: 0
       send_timeout: 0
       send_blocktime: 0
       keepalive_idle: 0
       keepalive_interval: 0
       keepalive_count: 0

   link_id: 0
       status: 3
       ping_intv_sec: 10
       ping_timeout_sec: 120
       buffer_size: 1500
       max_queue_size: 3
       protocol: 
       version: 13
       stable_buf_num: 3
       header:
           Origin: http://example.com

   OK

.. _websocket_at_wsopen:

AT+WSOPEN
------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Open a WebSocket connection.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+WSOPEN=<link_id>,<host>[,<path>],<conn_type>[,<certificate_index>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: The connect id.

   - [0,2]

:<host>: The string of host name.

:<path>: The string of resource path.

:<conn_type>: The type of connection.

   - 1:TCP. 

   - 2:SSL. Do not verify certificate.

   - 3:SSL. Verify server certificate.
   
   - 4:SSL. Provide client certificate.
   
   - 5:SSL. Verify server certificate and provide client certificate.

:<certificate_index>: Specify which set of certificate suite to use in the file system.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Memory error.

:3: Connect error.

:4: Ssl certificate error.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+WSOPEN=0,websocket-echo.com,,1

   // Here, display connect result.
   >>>>>> Connect to websocket server success
   OK

.. _websocket_at_wssend:

AT+WSSEND
--------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Send data to a webSocket connection.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+WSSEND=<link_id>,<length>[,<use_mask>,<opcode>],<data>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: The connect id.

   - [0,2]

:<length>: The length of data.

   - A positive number and can not be greater than <buffer_size>.

:<use_mask>: Whether to use mask.

   - 0: Do not use mask.
   
   - 1: Use mask(default).

:<opcode>: The type of the data.

   - 0x0. Continuation.

   - 0x1. Text(default).
   
   - 0x2. Binary.

   - [0x3,0x7]. Reserve.
   
   - 0x8. Close.
   
   - 0x9. Ping.

   - 0xA. Pong.

   - [0xB,0xF]. Reserve.

:<data>: The string of data.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+WSSEND=0,5,1,1,hello
   OK

.. _websocket_at_wssendraw:

AT+WSSENDRAW
--------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Send data to a webSocket connection with TT mode.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+WSSENDRAW=<link_id>,<length>[,<use_mask>,<opcode>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: The connect id.

   - [0,2]

:<length>: The length of data.

   - A positive number and can not be greater than <buffer_size>.

:<use_mask>: Whether to use mask.

   - 0: Do not use mask.
   
   - 1: Use mask(default).

:<opcode>: The type of the data.

   - 0x0. Continuation.

   - 0x1. Text(default).
   
   - 0x2. Binary.

   - [0x3,0x7]. Reserve.
   
   - 0x8. Close.
   
   - 0x9. Ping.

   - 0xA. Pong.

   - [0xB,0xF]. Reserve.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Memory error.

:3: TT mode error.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+WSSENDRAW=0,5,1,1
   enter tt mode
   
   // When the following printing occurs on MCU, you can input data.
   >>>
   // Input data, then press ENTER.
   hello
   
   exit tt mode

   OK

.. _websocket_at_wsclose:

AT+WSCLOSE
------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Close a WebSocket connection.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+WSCLOSE=<link_id>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: The connect id.

   - [0,2]
   
Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+WSCLOSE=0
   OK

.. _websocket_at_txqueuecheck:

AT+WSTXQUEUECHECK
------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Check if the tx queue is full.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+WSTXQUEUECHECK=<link_id>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<link_id>: The connect id.

   - [0,2]
   
Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+WSTXQUEUECHECK=0

   // Here, display check result.
   Tx queue is not full
   OK
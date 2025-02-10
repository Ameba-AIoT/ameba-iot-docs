.. _http_at_commands:

HTTP AT Commands
================================

The HTTP AT commands supports all the AT commands mentioned on this page. The HTTP AT commands is disabled by default.
If you need |CHIP_NAME| to support HTTP AT commands, you can enable HTTP AT commands by the following steps:

   - Navigate to your target project and open configuration menu.

      .. only:: RTL8721D

         .. code-block::

            cd amebadplus_gcc_project
            ./menuconfig.py

      .. only:: RTL8726EA

         .. code-block::

            cd amebalite_gcc_project
            ./menuconfig.py

   - Select :menuselection:`CONFIG AT CMD -> ATCMD Mode -> MCU Control`

   - Select :menuselection:`CONFIG AT CMD -> Enable HTTP`

   - Save and Exit.

.. note::
   
   The ``TT mode`` is only supported for MCU control mode. If you need use ``TT mode`` for AT commands, you need enable MCU control mode.
   The details of ``TT mode`` refer to :ref:`Transparent Transmission <transparent_transmission>`.


.. _http_at_httpheader:

AT+HTTPHEADER
----------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Set HTTP request header. If you need to set HTTP request header used by GET/POST/PUT/... method, excuete it. It will take effect globally and permanently until a restart or reset. Once set, all HTTP method commands will carry these request headers. This command can set only one HTTP request header at a time, but you can set multiple times to support multiple different HTTP request headers. Currently, a maximum of 10 entries can be set.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+HTTPHEADER=<req_header_len>

Response
~~~~~~~~~~~~~~~~
.. code-block::

    >>>
   <req_header>
   OK

The symbol ``>>>`` indicates that AT service is ready for receiving serial data, and you can enter the HTTP request header string (in the format of ``key: value``) now.
When the string length determined by the parameter ``<req_header_len>`` is reached, it returns OK.

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<req_header_len>: The length of input characters for single HTTP request header.

   - 0: Clear all HTTP request headers that have been set.

   - Other: Set a new HTTP request header.

:<req_header>: The actual HTTP request header string (in the format of ``key: value``)

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Error parameters.

:2: Malloc error.

:3: Get data failed in TT mode.

Example
~~~~~~~~~~~~~~
.. code-block::

   (1) Set a new request header
   AT+HTTPHEADER=17
   >>>
   Connection: close
   OK

   (2) Clear all request header
   AT+HTTPHEADER=0
   OK

.. _http_at_httpconf:

AT+HTTPCONF
----------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Set HTTP configuration. Setting by this command are global. Once set, it is effective permanently. If you need to use default HTTP timeout and port (80 for HTTP, 443 for HTTPS), enter

.. code-block::

   AT+HTTPCONF=10,0

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+HTTPCONF=<timeout>[,<port>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<timeout>: HTTP receive/send timeout.

   - Unit: second. Default: 10.

:<port>: HTTP server port.

   - Default: 80 for HTTP, 443 for HTTPS. Range: [1,65535].

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Error parameters.

Example
~~~~~~~~~~~~~~
.. code-block::

   (1) Set the timeout to 1s and the port to 12345:
   AT+HTTPCONF=1,12345
   OK

   (2) Set the timeout and the port to default:
   AT+HTTPCONF=10,0
   OK

.. _http_at_httpquery:

AT+HTTPQUERY
----------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Query HTTP global configuration, including HTTP timeout, HTTP server port and HTTP request header string.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+HTTPQUERY

Response
~~~~~~~~~~~~~~~~
.. code-block::

   Global HTTP configuration:
   http_timeout: <http_timeout>
   http_server_port: <http_server_port> [ OR http_server_port: 80 for HTTP, 443 for HTTPS]
   http_req_header_cnt: <http_req_header_cnt>
   [http_req_header list:]

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
No parameters.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Error parameters.

Example
~~~~~~~~~~~~~~
.. code-block::

   (1) Default configuration query
   AT+HTTPQUERY
   Global HTTP configuration:
   http_timeout: 10
   http_server_port: 80 for HTTP, 443 for HTTPS
   http_req_header_cnt: 0
   
   OK

   (2) User configuration query
   AT+HTTPHEADER=17
   >>>
   Connection: close
   OK
   AT+HTTPCONF=1,12345
   OK
   AT+HTTPQUERY
   Global HTTP configuration:
   http_timeout: 1
   http_server_port: 12345
   http_req_header_cnt: 1
   http_req_header list:
   Connection: close

   OK



.. note:: You need to connect to the AP with internet access capability before using the following HTTP method AT commands.

.. _http_at_httget:

AT+HTTPGET
------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Get HTTP resource.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+HTTPGET=<host>,<path>,<conn_type>[,<certificate_index>][,<req_header_cnt>,<req_header>...<req_header>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +HTTPGET: HEADER LEN = <header_len>
   +HTTPGET: HEADER DUMP START
   <header_string>
   +HTTPGET: HEADER DUMP END
   +HTTPGET: BODY DUMP START
   <body>
   +HTTPGET: BODY DUMP END
   +HTTPGET: BODY LEN = <body_len>

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<host>: Domain name or IP address.

:<path>: HTTP path. Default: / (if user did not enter <path>)

:<conn_type>: HTTP connection type.

   - 1: HTTP over TCP.

   - 2: HTTP over TLS (no certificate verify).

   - 3: HTTP over TLS (verify server certificate).

   - 4: HTTP over TLS (provide client certificate).

   - 5: HTTP over TLS (verify server certificate and provide client certificate).

:<certificate_index>: Certificate index. Default 0.

:<req_header_cnt>: The total number of <req_header>.

:<req_header>: The actual request header. You can send more than one request header to the server.

   - Ex: Connection: close,User-Agent: Ameba_Dplus, ...

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Malloc error.

:3: Read CA/certificate/PK failed.

:4: Send HTTP GET header failed.

:5: Read HTTP response failed.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+HTTPGET=httpbin.org,/get,1

   +HTTPGET: HEADER LEN = 230
   +HTTPGET: HEADER DUMP START
   HTTP/1.1 200 OK
   Date: Mon, 06 Jan 2025 07:53:34 GMT
   Content-Type: application/json
   Content-Length: 196
   Connection: keep-alive
   Server: gunicorn/19.9.0
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Credentials: true

   +HTTPGET: HEADER DUMP END
   +HTTPGET: BODY DUMP START
   {
   "args": {}, 
   "headers": {
      "Host": "httpbin.org", 
      "X-Amzn-Trace-Id": "Root=1-677b8bfe-6faa4a9d7264e26b46397567"
   }, 
   "origin": "98.98.48.11", 
   "url": "http://httpbin.org/get"
   }
   +HTTPGET: BODY DUMP END
   +HTTPGET: BODY LEN = 196

   OK

.. _http_at_httppost:

AT+HTTPPOST
----------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Post HTTP data of specified length.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+HTTPPOST=<host>,<path>,<conn_type>,<body_size>[,<certificate_index>][,<req_header_cnt>,<req_header>...<req_header>]

Response
~~~~~~~~~~~~~~~~
::

   > > >

The symbol ``>>>`` indicates that AT service is ready for receiving serial data, and you can enter the data now.
When the requirement of message length determined by the parameter ``<body_size>`` is met, the transmission starts.
If the transmission is successful, it returns:

.. code-block::

   +HTTPPOST: HEADER LEN = <header_len>
   +HTTPPOST: HEADER DUMP START
   <header_string>
   +HTTPPOST: HEADER DUMP END
   +HTTPPOST: BODY DUMP START
   <body>
   +HTTPPOST: BODY DUMP END
   +HTTPPOST: BODY LEN = <body_len>

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<host>: Domain name or IP address.

:<path>: HTTP path. Default: / (if user did not enter <path>)

:<conn_type>: HTTP connection type.

   - 1: HTTP over TCP.

   - 2: HTTP over TLS (no certificate verify).

   - 3: HTTP over TLS (verify server certificate).

   - 4: HTTP over TLS (provide client certificate).

   - 5: HTTP over TLS (verify server certificate and provide client certificate).

:<body_size>: The HTTP data length to POST.

:<certificate_index>: Certificate index. Default 0.

:<req_header_cnt>: The total number of <req_header>.

:<req_header>: The actual request header. You can send more than one request header to the server.

   - Ex: Connection: close,User-Agent: Ameba_Dplus, ...

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Malloc error.

:3: Read CA/Certificate/PK failed.

:4: Send HTTP POST header failed.

:5: Get data failed in TT mode.

:6: Send HTTP POST body data failed.

:7: Read HTTP response failed.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+HTTPPOST=httpbin.org,/post,2,35,,2,Connection: close,User-Agent: Ameba_Dplus
   >>>
   param1=test_data1&param2=test_data2

   +HTTPPOST: HEADER LEN = 225
   +HTTPPOST: HEADER DUMP START
   HTTP/1.1 200 OK
   Date: Mon, 06 Jan 2025 07:49:09 GMT
   Content-Type: application/json
   Content-Length: 359
   Connection: close
   Server: gunicorn/19.9.0
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Credentials: true

   +HTTPPOST: HEADER DUMP END
   +HTTPPOST: BODY DUMP START
   {
   "args": {}, 
   "data": "param1=test_data1&param2=test_data2", 
   "files": {}, 
   "form": {}, 
   "headers": {
      "Content-Length": "35", 
      "Host": "httpbin.org", 
      "User-Agent": "Ameba_Dplus", 
      "X-Amzn-Trace-Id": "Root=1-677b8af2-73ea1c6e376e5d1e672893b5"
   }, 
   "json": null, 
   "origin": "98.98.48.11", 
   "url": "https://httpbin.org/post"
   }
   +HTTPPOST: BODY DUMP END
   +HTTPPOST: BODY LEN = 359

   OK

.. _http_at_httpput:

AT+HTTPPUT
----------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Put HTTP data of specified length.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+HTTPPUT=<host>,<path>,<conn_type>,<body_size>[,<certificate_index>][,<req_header_cnt>,<req_header>...<req_header>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   > > >

The symbol ``>>>`` indicates that AT service is ready for receiving serial data, and you can enter the data now.
When the requirement of message length determined by the parameter ``<body_size>`` is met, the transmission starts.
If the transmission is successful, it returns:

.. code-block::

   +HTTPPUT: HEADER LEN = <header_len>
   +HTTPPUT: HEADER DUMP START
   <header_string>
   +HTTPPUT: HEADER DUMP END
   +HTTPPUT: BODY DUMP START
   <body>
   +HTTPPUT: BODY DUMP END
   +HTTPPUT: BODY LEN = <body_len>

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<host>: Domain name or IP address.

:<path>: HTTP path. Default: / (if user did not enter <path>)

:<conn_type>: HTTP connection type.

   - 1: HTTP over TCP.

   - 2: HTTP over TLS (no certificate verify).

   - 3: HTTP over TLS (verify server certificate).

   - 4: HTTP over TLS (provide client certificate).

   - 5: HTTP over TLS (verify server certificate and provide client certificate).

:<body_size>: The HTTP data length to PUT.

:<certificate_index>: Certificate index. Default 0.

:<req_header_cnt>: The total number of <req_header>.

:<req_header>: The actual request header. You can send more than one request header to the server.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Malloc error.

:3: Read CA/Certificate/PK failed.

:4: Send HTTP PUT header failed.

:5: Get data failed in TT mode.

:6: Send HTTP PUT body data failed.

:7: Read HTTP response failed.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+HTTPPUT=httpbin.org,/put,2,35,,2,Connection: close,User-Agent: Ameba_Dplus
   >>>
   param1=test_data1&param2=test_data2

   +HTTPPUT: HEADER LEN = 225
   +HTTPPUT: HEADER DUMP START
   HTTP/1.1 200 OK
   Date: Mon, 06 Jan 2025 07:50:05 GMT
   Content-Type: application/json
   Content-Length: 358
   Connection: close
   Server: gunicorn/19.9.0
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Credentials: true

   +HTTPPUT: HEADER DUMP END
   +HTTPPUT: BODY DUMP START
   {
   "args": {}, 
   "data": "param1=test_data1&param2=test_data2", 
   "files": {}, 
   "form": {}, 
   "headers": {
      "Content-Length": "35", 
      "Host": "httpbin.org", 
      "User-Agent": "Ameba_Dplus", 
      "X-Amzn-Trace-Id": "Root=1-677b8b2a-30de8616008ca27e176ccda2"
   }, 
   "json": null, 
   "origin": "98.98.48.11", 
   "url": "https://httpbin.org/put"
   }
   +HTTPPUT: BODY DUMP END
   +HTTPPUT: BODY LEN = 358

   OK

.. _http_at_httpdel:

AT+HTTPDEL
----------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Delete the specified HTTP resource.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+HTTPDEL=<host>,<path>,<conn_type>[,<certificate_index>][,<req_header_cnt>,<req_header>...<req_header>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +HTTPDEL: HEADER LEN = <header_len>
   +HTTPDEL: HEADER DUMP START
   <header_string>
   +HTTPDEL: HEADER DUMP END
   +HTTPDEL: BODY DUMP START
   <body>
   +HTTPDEL: BODY DUMP END
   +HTTPDEL: BODY LEN = <body_len>

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<host>: Domain name or IP address.

:<path>: HTTP path. Default: / (if user did not enter <path>)

:<conn_type>: HTTP connection type.

   - 1: HTTP over TCP.

   - 2: HTTP over TLS (no certificate verify).

   - 3: HTTP over TLS (verify server certificate).

   - 4: HTTP over TLS (provide client certificate).

   - 5: HTTP over TLS (verify server certificate and provide client certificate).

:<certificate_index>: Certificate index. Default 0.

:<req_header_cnt>: The total number of <req_header>.

:<req_header>: The actual request header. You can send more than one request header to the server.

   - Ex: Connection: close,User-Agent: Ameba_Dplus, ...

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Parameters error.

:2: Malloc error.

:3: Read CA/certificate/PK failed.

:4: Send HTTP DELETE header failed.

:5: Read HTTP response failed.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+HTTPDEL=httpbin.org,/delete,2

   +HTTPDEL: HEADER LEN = 230
   +HTTPDEL: HEADER DUMP START
   HTTP/1.1 200 OK
   Date: Mon, 06 Jan 2025 07:51:15 GMT
   Content-Type: application/json
   Content-Length: 263
   Connection: keep-alive
   Server: gunicorn/19.9.0
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Credentials: true

   +HTTPDEL: HEADER DUMP END
   +HTTPDEL: BODY DUMP START
   {
   "args": {}, 
   "data": "", 
   "files": {}, 
   "form": {}, 
   "headers": {
      "Host": "httpbin.org", 
      "X-Amzn-Trace-Id": "Root=1-677b8b73-43851d66543b1a534698c987"
   }, 
   "json": null, 
   "origin": "98.98.48.11", 
   "url": "https://httpbin.org/delete"
   }
   +HTTPDEL: BODY DUMP END
   +HTTPDEL: BODY LEN = 263

   OK
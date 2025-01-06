.. _http_at_commands:

HTTP AT Commands
================================

The HTTP AT commands supports all the AT commands mentioned on this page. If you need |CHIP_NAME| to support HTTP AT commands,
you can enable HTTP AT commands by the following selections:

- Select :menuselection:`ATCMD Mode -> MCU Control`

- Select :menuselection:`CONFIG AT CMD -> Enable HTTP`

.. note:: Only support for AmebaDplus for now.

.. _http_at_httpconf:

AT+HTTPCONF
----------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Set HTTP Configuration.

.. note:: 
   - The configuration is only valid for the next command.
   - Connect to the AP before using the HTTP AT commands.

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
:<timeout>: HTTP receive timeout.

   - Unit: second. Default: 0.

:<port>: HTTP server port.

   - Default: 0. Range: [1,65535].

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Error parameters.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+HTTPCONF=1,12345
   OK

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
   +HTTPGET: BODY LEN = <body_len>
   +HTTPGET: BODY DUMP START
   <body>
   +HTTPGET: BODY DUMP END

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<host>: Domain name or IP address.

:<path>: HTTP path.

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
:1: Error parameters.

:2: Malloc failed.

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
   +HTTPGET: BODY LEN = 196
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
   +HTTPPOST: BODY LEN = <body_len>
   +HTTPPOST: BODY DUMP START
   <body>
   +HTTPPOST: BODY DUMP END

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<host>: Domain name or IP address.

:<path>: HTTP path.

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
:1: Error parameters.

:2: Malloc failed.

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
   +HTTPPOST: BODY LEN = 359
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
   +HTTPPUT: BODY LEN = <body_len>
   +HTTPPUT: BODY DUMP START
   <body>
   +HTTPPUT: BODY DUMP END

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<host>: Domain name or IP address.

:<path>: HTTP path.

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
:1: Error parameters.

:2: Malloc failed.

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
   +HTTPPUT: BODY LEN = 358
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

   OK

.. _http_at_httpdel:

AT+HTTPDEL
----------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Delete HTTP resource.

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
   +HTTPDEL: BODY LEN = <body_len>
   +HTTPDEL: BODY DUMP START
   <body>
   +HTTPDEL: BODY DUMP END

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<host>: Domain name or IP address.

:<path>: HTTP path.

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
:1: Error parameters.

:2: Malloc failed.

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
   +HTTPDEL: BODY LEN = 263
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

   OK
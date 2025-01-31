.. _common_at_commands:

Common AT Commands
====================================

.. _common_at_test:

AT+TEST
--------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Test AT command ready.

By this AT command, user can check whether the AT command can work normally.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+TEST

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +TEST:OK

Parameter
~~~~~~~~~~~~~~~~~~
None

.. _common_at_list:

AT+LIST
--------------
Description
~~~~~~~~~~~~~~~~~~~~~~
This command is used to output all supported AT commands right now.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+LIST

Response
~~~~~~~~~~~~~~~~
.. code-block::

   Common AT Command:
   AT+TEST
   // … … followed by other common command list.
   Wi-Fi AT Command:
   AT+WLSOFTAP
   // … … followed by other Wi-Fi command list.
   TCP/IP AT Command:
   AT+SKTGETERR
   // … … followed by other TCP/IP command list.
   BT AT command:
   AT+BLECMODE
   // … … followed by other BT command list.
   MQTT AT command:
   AT+MQTTOPEN
   // … … followed by other MQTT command list.
   +LIST:OK

Parameter
~~~~~~~~~~~~~~~~~~
None

.. _common_at_otaclear:

AT+OTACLEAR
----------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
User can clear the APP image OTA2 signature by this command.

.. note::
   Only support in LOGUART Mode.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+OTACLEAR

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +OTACLEAR:OK

Parameter
~~~~~~~~~~~~~~~~~~
None

.. _common_at_otarecover:

AT+OTARECOVER
--------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
User can recover the APP image OTA2 signature by this command.

.. note::
   Only support in LOGUART Mode.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+OTARECOVER

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +OTARECOVER:OK

Parameter
~~~~~~~~~~~~~~~~~~
None

.. _common_at_cpuload:

AT+CPULOAD
--------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
User can read the CPU load periodically.

.. note::
   Only support in LOGUART Mode.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+CPULOAD=<mode>[,<interval>,<count>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   // If mode == 0
   +CPULOAD:OK
   current mode: <mode> time: <interval>(s) count: <count>(-1 for infinite)
   task name  state  prio  CPU%
   <cpu_stat_thread>  R  10  99.87
   <task_1>  r  0  0.01
   <task_2>  b  9  0.01
   // Other task lists if exist.
   // Wait for <interval> second, the next output, at most <count> times totally.

Or

.. code-block::

   // If mode == 1
   +CPULOAD:OK
   current mode: <mode> time: <interval>(s) count: <count>(-1 for infinite)
   // Stop here if there is an infinit statistic.

Or

.. code-block::

   // If mode == 2
   +CPULOAD:OK
   current mode: <mode> time: <interval>(s) count: <count>(-1 for infinite)

Or

.. code-block::

   // If mode == 3
   +CPULOAD:OK
   current mode: <mode> time: <interval>(s) count: <count>(-1 for infinite)
   task name  state  prio  CPU%
   <cpu_stat_thread>  R  10  99.87
   <task_1>  r  0  0.01
   <task_2>  b  9  0.01
   // Other task lists if exist.

Or

.. code-block::

   +CPULOAD:ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<mode>: The mode of read CPU load.

   - 0: Create task of CPU load statistic.

   - 1: Output the information right now, if the task is running. And minus count. If it is infinit, stop now.

   - 2: Update the statistic time.

   - 3: Output the information from the last statistic time by now.

:<interval>: The interval time, in second.

   - [1,INT_MAX]

:<count>: The statistic count, 0 or -1 means infinit count.

   - [-1,INT_MAX]

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Error input parameter numbers.

:2: Can not start task successfully.

:3: Error input mode.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+CPULOAD=0
   current mode: 0 time: 1(s) count: 4294967295 (-1 for infinite)
   task name  state  prio  CPU%
   cpu_stat_thread  R  10  0.00
   IDLE  r  0  99.87
   inic_api_host_task  b  3  0.00
   LOGUART_TASK  b  5  0.09
   inic_msg_q_task  b  6  0.00
   Tmr Svc  b  10  0.00
   // Wait 1 second
   task name  state  prio  CPU%
   cpu_stat_thread  R  10  0.19
   IDLE  r  0  99.78
   TCP_IP  b  9  0.01
   LOGUART_TASK  b  5  0.00
   inic_msg_q_task  b  6  0.00
   Tmr Svc  b  10  0.00
   inic_api_host_task  b  3  0.00
   // And so on ……
   AT+CPULOAD=1
   current mode: 1 time: 1(s) count: 4294967295 (-1 for infinite)
   +CPULOAD:OK
   // Stop now.
   // Then update the last statistic time.
   AT+CPULOAD=2
   current mode: 1 time: 1(s) count: 4294967295 (-1 for infinite)
   +CPULOAD:OK
   // Output information from last statistic time by now.
   AT+CPULOAD=3
   current mode: 1 time: 1(s) count: 4294967295 (-1 for infinite)
   +CPULOAD:OK
   task name  state  prio  CPU%
   cpu_stat_thread  R  10  0.19
   IDLE  r  0  99.72
   TCP_IP  b  9  0.01
   Tmr Svc  b  10  0.00
   LOGUART_TASK  b  5  0.06
   inic_api_host_task  b  3  0.00
   inic_msg_q_task  b  6  0.00

.. _common_at_rst:

AT+RST
------------
Description
~~~~~~~~~~~~~~~~~~~~~~
When execute this AT command, the module will restart right now.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+RST

Response
~~~~~~~~~~~~~~~~
.. code-block::

   // The system should restart right now.

Parameter
~~~~~~~~~~~~~~~~~~
None

.. _common_at_state:

AT+STATE
----------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Get the state of each task, and current heap.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+STATE

Response
~~~~~~~~~~~~~~~~
.. code-block::

   Task List:
   <task_1>  <property>  <current_priority>  <stack_water_mark>  <task_number>
   <task_2>  <property>  <current_priority>  <stack_water_mark>  <task_number>
   // Other task list if exist
   HeapStats:
   Total Heap:  <total_heap>
   Heap Free Now:  <free_heap>
   Heap Used Now:  <used_heap>
   Heap Used Max:  <max_used_heap>
   +STATE:OK
   // In <property>, X means running, R means ready, B means blocked, S means suspended, and D means deleted.

Parameter
~~~~~~~~~~~~~~~~~~
None

Example
~~~~~~~~~~~~~~
.. code-block::


   AT+STATE
   Task List:
   LOGUART_TASK             X  5  342  1
   IDLE                     R  0  472  4
   TCP_IP                   B  9  760  6
   inic_msg_q_task          B  6  106  7
   Tmr Svc                  B  10  470  5
   inic_api_host_task       B  3  344  2
   HeapStats:
   Total Heap:  219232
   Heap Free Now:  199392
   Heap Used Now:  19840
   Heap Used Max:  25408
   +STATE:OK

.. _common_at_gmr:

AT+GMR
------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Show the release version and date.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+GMR

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +GMR:<AT_firmware_version_no>,<sdk_version_no>,<release_time>

Parameter
~~~~~~~~~~~~~~~~~~
None

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+GMR
   +GMR:V02.1.1,v3.5,2024/05/29-13:34:57

.. _common_at_log:

AT+LOG
------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Get set or clear the log level.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+LOG=<op>[,<module>,<log_level>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +LOG:OK

Or

.. code-block::

   [<module>] level = <log_level>
   +LOG:OK

Or

.. code-block::

   +LOG:ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<op>: The operation type.

   - 0: Get the log level.

   - 1: Set the log level.

   - 2: Output all the log level.

   - 3: Clear all the log level.

:<module>: Specific module name.

   - The string of specific module, "*" means each module.

   - The length should not longer than 9 bytes.

:<log_level>:

   - [0,5]

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Error input parameter.

:2: Failed when setting.

Example
~~~~~~~~~~~~~~
.. code-block::

   // Add a new module named "module1" with level 3.
   AT+LOG=1,module1,3
   +LOG:OK
   // Get the level of "module1"
   AT+LOG=0,module1
   <module2> level is 5
   +LOG:OK
   // Add a new module named "module2" with level 5.
   AT+LOG=1,module2,5
   +LOG:OK
   // Print all
   AT+LOG=2
   [module1] level = 3
   [module2] level = 5
   +LOG:OK
   // Clear all
   AT+LOG=3
   +LOG:OK

.. _common_at_rreg:

AT+RREG
--------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Read the common register value.

.. note::
   Only support in LOGUART Mode.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+RREG=<address>[,<length>,<in_byte>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   // The dump value
   // ……
   +RREG:OK

Or

.. code-block::

   +RREG:ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<address>: The address of flash.

   - [<start>,268435455]

   - Here the <start> means the start address of flash.

:<length>: The dump length of flash.

   - The length based on <address> should not overflow.

:<in_byte>: Dump data in bytes.

   - "B" or "b" if present, it means dump data in bytes.

   - If absent, the data will be dump in word as default.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Input error parameters.

.. note::
   The address entered must be valid, otherwise, crash may happen.

   For now, the dump data is shown at log window.

.. _common_at_wreg:

AT+WREG
--------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Write data into register.

.. note::
   Only support in LOGUART Mode.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+WREG=<address>,<data>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +WREG:OK

Or

.. code-block::

   +WREG:ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<address>: The address of flash.

   - [<start>,<end>]

   - Here the <start> means the start address of flash, <end> means the end address of flash.

:<data>: The data you will write at this address.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: Input error parameters.

.. note:: The address entered must be valid, otherwise, crash may happen.


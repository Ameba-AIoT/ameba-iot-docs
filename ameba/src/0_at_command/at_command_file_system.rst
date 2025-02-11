.. _file_system_at_commands:

File System AT Commands
========================

AT+FS
------
Description
~~~~~~~~~~~~~~
Do some file system operations.Includes: delete file, read file, write file, get file size, get file list.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+FS=<operation>[,<filename>,<offset>,<length>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Or

.. code-block::

   ERROR:<error_no>

Parameter
~~~~~~~~~~~~~~~~~~
:<operation>: file operation type.

   - 0: List files in directory.

   - 1: Delete file.

   - 2: Get file size.

   - 3: Read file.

   - 4: Write file.

:<filename>: The string of file name.

   - Not longer than 125 bytes.

:<offset>: The start position of read or write.

:<length>: The length of read or write.

Error Number
~~~~~~~~~~~~~~~~~~~~~~~~
:1: format error.

:2: operation failed.

.. note::
   When the `operation` is set to `write`, the system will enter :ref:`TT mode <transparent_transmission>` upon receiving this command.
   The File System AT commands are all executed in the ``AT`` directory.

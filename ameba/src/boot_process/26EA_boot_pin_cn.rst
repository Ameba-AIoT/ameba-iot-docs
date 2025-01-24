.. tab :: RTL8726EA

   The SoC supports ISP (In-System Programming) via LOGUART (``PA19`` & ``PA20``). The ISP mode is determined by the state of ``PA20`` when boot.

   .. table:: ISP mode
      :width: 100%
      :widths: auto

      +-----------+----------------------+---------------------------------------+
      | Boot mode | PA20 (UART_DOWNLOAD) | Description                           |
      +===========+======================+=======================================+
      | No ISP    | HIGH                 | | ISP bypassed.                       |
      |           |                      | | The IC attempts to boot from Flash. |
      +-----------+----------------------+---------------------------------------+
      | ISP       | LOW                  | The IC enters ISP via LOGUART.        |
      +-----------+----------------------+---------------------------------------+

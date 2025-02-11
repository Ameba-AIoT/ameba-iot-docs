.. tab :: RTL8730E

   The |CHIP_NAME| supports ISP (In-System Programming) via LOGUART (``PB23`` and ``PB24``) and USB. The ISP mode is determined by the state of the pin ``PB24`` when boot.

   .. table:: ISP mode
      :width: 100%
      :widths: auto

      +-----------+----------------------+-----------------------------------------+
      | Boot mode | PB24 (UART_DOWNLOAD) | Description                             |
      +===========+======================+=========================================+
      | No ISP    | HIGH                 | | ISP bypassed.                         |
      |           |                      | | The IC attempts to boot from Flash.   |
      +-----------+----------------------+-----------------------------------------+
      | ISP       | LOW                  | The IC enters ISP via LOGUART.          |
      +-----------+----------------------+-----------------------------------------+

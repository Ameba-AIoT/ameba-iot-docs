Introduction
--------------------------------------------
Security Image Protection (RSIP) aims at firmware protection.
The whole or parts of Flash would be encrypted through AES to prevent from being copied.
When CPU or Cache reads data from Flash in auto mode, the data will be decrypted on-the-fly,
while the data will not be decrypted if read in user mode (user mode needs other APIs).

.. tabs::
   .. include:: rsip_diagram_nda_dplus.rst
   .. include:: rsip_diagram_nda_lite.rst
   .. include:: rsip_diagram_nda_smart.rst

When reading data from the Flash or executing code, auto mode is chosen by default.
Specific APIs are provided in SDK if manual read/write is needed.

.. note::

   Please contact <claire_wang@realsil.com.cn> for detail informations.


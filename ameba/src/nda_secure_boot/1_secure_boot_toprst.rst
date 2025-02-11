Introduction
------------------------
Secure boot aims at firmware protection, which prevents attackers from modifying or replacing firmware
maliciously. When the chip is power on, the secure boot ROM executes to check the validation of the
image signature. If the signature is valid, authentication will be successful, which means that the
firmware is safe and the subsequent operations can be continued. Otherwise, the SoC clears the stack
and goes into an endless loop.

Users do not need to implement the secure boot code themselves, which is already contained in the SDK.

To generate the Public Key and signature of bootloader, we provide an image operation script named ``axf2bin.py``. With the script, users can generate and append signature-related information to images. Refer to the following sections for operation details.

.. tabs::
   .. include:: secure_boot_introduction_nda_dplus.rst
   .. include:: secure_boot_introduction_nda_lite.rst
   .. include:: secure_boot_introduction_nda_smart.rst


.. note::

   Please contact <claire_wang@realsil.com.cn> for detail informations.


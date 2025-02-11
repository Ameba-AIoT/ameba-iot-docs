Introduction
--------------------------------------------
Arm TrustZone technology enables the system and the software to be partitioned into Secure and Normal worlds.
Secure software can access both Secure and Non-secure memories and resources, while Normal software can only access Non-secure memories and resources.
Users can refer to ARM's documents for more information about TrustZone.

Read Protection (RDP) is used to protect security-critical code, which is implemented with Arm TrustZone technology.
The security-critical code (KM4 secure image) is stored in the Flash with encrypted form.
It would be decrypted in secure bootloader and loaded into secure SRAM protected by TrustZone. The key for decryption is stored in OTP, and can be accessed only by Secure IPsec (IPSEC-S).

.. tabs::
   .. include:: rdp_diagram_nda_dplus.rst
   .. include:: rdp_diagram_nda_lite.rst
   .. include:: rdp_diagram_nda_smart.rst

- **RDP Encryption**: configure KM4 secure image manifest (named :file:`manifest.json`) to generate RDP image encrypted by AES-CBC.

- **Flash Encrypt Area**: used to store encrypted RDP image. The address field in image header gives the secure address to be loaded to.

- **RAM Secure Area**: defined by users with TrustZone MPC entries.

- **IPSEC-S**: RDP image will be decrypted and DMA to RAM Secure Area safely using Secure IPsec when boot. IPSEC-S is designed to be able to access TrustZone Secure World.

- **RDP Key**: stored in OTP security zone. After program R/W protection bits, RDP key can be accessed only by IPSEC-S. Security boot code will fetch this key from OTP and load it into IPSEC-S for decryption.

.. note::

   Please contact <claire_wang@realsil.com.cn> for detail informations.


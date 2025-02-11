.. tab:: RTL8721Dx

   Among these six keys, there are two secure keys and two non-secure keys available for SHA HAMC to choose from, and four secure keys and non-secure keys available for AES to choose from. Refer to the table below for specific information.

   .. figure:: figures/opt_keys_for_crypto_rtl8721d.svg
      :scale: 120%
      :align: center

   .. table::
      :width: 100%
      :widths: auto

      +----------+-------------+-----------+---------------+
      | Engine   | Engine type | Key index | OTP key       |
      +==========+=============+===========+===============+
      | SHA HAMC | Secure      | 0         | S_IPSEC_Key1  |
      +----------+-------------+-----------+---------------+
      | SHA HAMC | Secure      | 1         | S_IPSEC_Key2  |
      +----------+-------------+-----------+---------------+
      | SHA HAMC | Non-Secure  | 0         | NS_IPSEC_Key1 |
      +----------+-------------+-----------+---------------+
      | SHA HAMC | Non-Secure  | 1         | NS_IPSEC_Key2 |
      +----------+-------------+-----------+---------------+
      | AES      | Secure      | 0         | S_IPSEC_Key1  |
      +----------+-------------+-----------+---------------+
      | AES      | Secure      | 1         | S_IPSEC_Key2  |
      +----------+-------------+-----------+---------------+
      | AES      | Secure      | 2         | RSIP_AES_key1 |
      +----------+-------------+-----------+---------------+
      | AES      | Secure      | 3         | RSIP_AES_key2 |
      +----------+-------------+-----------+---------------+
      | AES      | Non-Secure  | 0         | NS_IPSEC_Key1 |
      +----------+-------------+-----------+---------------+
      | AES      | Non-Secure  | 1         | NS_IPSEC_Key2 |
      +----------+-------------+-----------+---------------+
      | AES      | Non-Secure  | 2         | RSIP_AES_key1 |
      +----------+-------------+-----------+---------------+
      | AES      |             | 3         | RSIP_AES_key2 |
      +----------+-------------+-----------+---------------+


   The detailed functions of OTP key are as follows:

   .. table::
      :width: 100%
      :widths: auto

      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | OTP key name                   | Address               | Size     | Default        | Description                                                                                                                |
      +================================+=======================+==========+================+============================================================================================================================+
      | S_IPSEC_Key1 (RDP)             | Logic Map 0x200       | 32 bytes | Each Byte 0xFF | Secure crypto engine will auto-load this key for HAMC or AES function when OTPKey_init function is enabled.                |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | S_IPSEC_Key2                   | Logic Map 0x220       | 32 bytes | Each Byte 0xFF | Secure crypto engine will auto-load this key for HAMC or AES function when OTPKey_init function is enabled.                |
      |                                |                       |          |                |                                                                                                                            |
      | (Secure boot HMAC)             |                       |          |                |                                                                                                                            |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | NS_IPSEC_Key1                  | Logic Map 0x240       | 32 bytes | Each Byte 0xFF | Non-Secure crypto engine will auto-load this key for HAMC or AES function when OTPKey_init function is enabled.            |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | NS_IPSEC_Key2                  | Logic Map 0x260       | 32 bytes | Each Byte 0xFF | Non-Secure crypto engine will auto-load this key for HAMC or AES function when OTPKey_init function is enabled.            |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | RSIP_AES_key1                  | Logic Map 0x2c0       | 32 bytes | Each Byte 0xFF | Non-Secure AES engine and secure AES engine will auto-load this key for AES function when OTPKey_init function is enabled. |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | RSIP_AES_key2                  | Logic Map 0x2e0       | 32 bytes | Each Byte 0xFF | Non-Secure AES engine and secure AES engine will auto-load this key for AES function when OTPKey_init function is enabled. |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | S_IPSEC_Key1 Read Protection   | Physical Map 0x365[3] | 1 bit    | 1              | 0: Enable read protection for S_IPSEC_Key1 to prevent from being read out.                                                 |
      |                                |                       |          |                |                                                                                                                            |
      |                                |                       |          |                | 1: Disable read protection for S_IPSEC_Key1.                                                                               |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | S_IPSEC_Key1 Write Protection  | Physical Map 0x365[4] | 1 bit    | 1              | 0: Enable write protection for S_IPSEC_Key1 to prevent from being programmed to all 0 by hacker.                           |
      |                                |                       |          |                |                                                                                                                            |
      |                                |                       |          |                | 1: Disable write protection for S_IPSEC_Key1.                                                                              |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | S_IPSEC_Key2 Read Protection   | Physical Map 0x365[5] | 1 bit    | 1              | 0: Enable read protection for S_IPSEC_Key2 to prevent from being read out.                                                 |
      |                                |                       |          |                |                                                                                                                            |
      |                                |                       |          |                | 1: Disable read protection for S_IPSEC_Key2.                                                                               |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | S_IPSEC_Key2 Write Protection  | Physical Map 0x365[6] | 1 bit    | 1              | 0: Enable write protection for S_IPSEC_Key2 to prevent from being programmed to all 0 by hacker.                           |
      |                                |                       |          |                |                                                                                                                            |
      |                                |                       |          |                | 1: Disable write protection for S_IPSEC_Key2.                                                                              |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | NS_IPSEC_Key1 Read Protection  | Physical Map 0x365[7] | 1 bit    | 1              | 0: Enable read protection for NS_IPSEC_Key1 to prevent from being read out.                                                |
      |                                |                       |          |                |                                                                                                                            |
      |                                |                       |          |                | 1: Disable read protection for NS_SHA_Key1.                                                                                |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | NS_IPSEC_Key1 Write Protection | Physical Map 0x366[0] | 1 bit    | 1              | 0: Enable write protection for NS_IPSEC_Key1 to prevent from being programmed to all 0 by hacker.                          |
      |                                |                       |          |                |                                                                                                                            |
      |                                |                       |          |                | 1: Disable write protection for NS_IPSEC_Key1.                                                                             |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | NS_IPSEC_Key2 Read Protection  | Physical Map 0x366[1] | 1 bit    | 1              | 0: Enable read protection for NS_IPSEC_Key2 to prevent from being read out.                                                |
      |                                |                       |          |                |                                                                                                                            |
      |                                |                       |          |                | 1: Disable read protection for NS_IPSEC_Key2.                                                                              |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | NS_IPSEC_Key2 Write Protection | Physical Map 0x366[2] | 1 bit    | 1              | 0: Enable write protection for NS_IPSEC_Key2 to prevent from being programmed to all 0 by hacker.                          |
      |                                |                       |          |                |                                                                                                                            |
      |                                |                       |          |                | 1: Disable write protection for NS_IPSEC_Key2.                                                                             |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | RSIP_AES_Key1 Read Protection  | Physical Map 0x366[7] | 1 bit    | 1              | 0: Enable read protection for RSIP_AES_Key1 to prevent from being read out.                                                |
      |                                |                       |          |                |                                                                                                                            |
      |                                |                       |          |                | 1: Disable read protection for RSIP_AES_Key1.                                                                              |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | RSIP_AES_Key1 Write Protection | Physical Map 0x367[0] | 1 bit    | 1              | 0: Enable write protection for RSIP_AES_Key1 to prevent from being programmed to all 0 by hacker.                          |
      |                                |                       |          |                |                                                                                                                            |
      |                                |                       |          |                | 1: Disable write protection for RSIP_AES_Key1.                                                                             |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | RSIP_AES_Key2 Read Protection  | Physical Map 0x367[1] | 1 bit    | 1              | 0: Enable read protection for RSIP_AES_Key2 to prevent from being read out.                                                |
      |                                |                       |          |                |                                                                                                                            |
      |                                |                       |          |                | 1: Disable read protection for RSIP_AES_Key2.                                                                              |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | RSIP_AES_Key2 Write Protection | Physical Map 0x367[2] | 1 bit    | 1              | 0: Enable write protection for RSIP_AES_Key2 to prevent from being programmed to all 0 by hacker.                          |
      |                                |                       |          |                |                                                                                                                            |
      |                                |                       |          |                | 1: Disable write protection for RSIP_AES_Key2.                                                                             |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+


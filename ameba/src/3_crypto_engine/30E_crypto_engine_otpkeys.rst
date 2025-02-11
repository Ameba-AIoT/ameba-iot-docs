.. tab:: RTL8730E

   .. table::
      :width: 100%
      :widths: auto

      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | OTP KEY name                   | Address               | Size     | Default        | Description                                                                                                                |
      +================================+=======================+==========+================+============================================================================================================================+
      | S_IPSEC_Key1 (RDP)             | Logic Map 0x200       | 32 bytes | Each byte 0xFF | Secure crypto engine will auto-load this key for HAMC or AES function when OTPKey_init function is enabled.                |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | S_IPSEC_Key2                   | Logic Map 0x220       | 32 bytes | Each byte 0xFF | Secure crypto engine will auto-load this key for HAMC or AES function when OTPKey_init function is enabled.                |
      |                                |                       |          |                |                                                                                                                            |
      | (Secure boot HMAC)             |                       |          |                |                                                                                                                            |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | NS_IPSEC_Key1                  | Logic Map 0x240       | 32 bytes | Each byte 0xFF | Non secure crypto engine will auto-load this key for HAMC function when OTPKey_init function is enabled.                   |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | NS_IPSEC_Key2                  | Logic Map 0x260       | 32 bytes | Each byte 0xFF | Non secure crypto engine will auto-load this key for HAMC function when OTPKey_init function is enabled.                   |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | RSIP_AES_key1                  | Logic Map 0x2C0       | 32 bytes | Each byte 0xFF | Non secure AES engine and secure AES engine will auto-load this key for AES function when OTPKey_init function is enabled. |
      +--------------------------------+-----------------------+----------+----------------+----------------------------------------------------------------------------------------------------------------------------+
      | RSIP_AES_key2                  | Logic Map 0x2E0       | 32 bytes | Each byte 0xFF | Non secure AES engine and secure AES engine will auto-load this key for AES function when OTPKey_init function is enabled. |
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

   .. note::
      For the two secure keys of IPsec, if the system enables RDP, SDK will use ``S_IPSEC_Key1`` for secure data protection by default. And if secure boot uses HMAC as a hash algorithm, it will use ``S_IPSEC_Key2``. Users need to reasonably allocate the use of keys according to the above contents. For more information, refer to Chapters: Secure Boot and Read Protection.


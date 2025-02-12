.. _ecdsa_engine:

Introduction
------------------------------------
The ECDSA supports all curves under 256-bit. But in our ROM code, only 8 kinds of curves are supported:

- SECP256K1
- SECP256R1
- CURVE25519
- SECP192K1
- SECP224K1
- SECP192R1
- SECP224R1
- BP256R1

The ECDSA has the features of key pair generation, ECDH key agreement, signature generation, public key signature verification, and basic function.

.. note::
   ECDSA can be accessed by NP and AP, but if multi-core calls API to operate ECDSA at the same time,
   it will lead to ECDSA function error. Users should take protective measures to ensure that only one core can operate ECDSA at the same time.

ECDSA OTP
------------------
The ECDSA engine can download the private key in two ways:

- The user passes the private key into the API, and the function will write the private key into the registers of ECDSA.
- The ECDSA automatically downloads the ECDSA OTP key.

The OTP physical map can store two keys for ECDSA to use as private keys, which can only be accessed by ECDSA trigger and will not be tampered with or read by attackers.
The premise is that the private key needs to be programmed into OTP physical map.

.. table::
   :width: 100%
   :widths: auto

   +---------------------------------+-----------------------+---------+----------------+------------------------------------------------------------------------------------------------+
   | OTP key                         | Address               | Size    | Default        | Description                                                                                    |
   +=================================+=======================+=========+================+================================================================================================+
   | ECDSA_PRI_KEY1                  | Physical Map 0x280    | 32 bytes| Each Byte 0xFF | If OTPKEY=1, load this key for ECDSA engine as private key.                                    |
   +---------------------------------+-----------------------+---------+----------------+------------------------------------------------------------------------------------------------+
   | ECDSA_PRI_KEY2                  | Physical Map 0x2A0    | 32 bytes| Each Byte 0xFF | If OTPKEY=2, load this key for ECDSA engine as private key.                                    |
   +---------------------------------+-----------------------+---------+----------------+------------------------------------------------------------------------------------------------+
   | ECDSA_PRI_KEY1_Read_Protection  | Physical Map 0x366[2] | 1 bit   | 1              | 0: Enable read protection for ECDSA Key1 to prevent from being read out.                       |
   |                                 |                       |         |                |                                                                                                |
   |                                 |                       |         |                | 1: Disable read protection for ECDSA Key1.                                                     |
   +---------------------------------+-----------------------+---------+----------------+------------------------------------------------------------------------------------------------+
   | ECDSA_PRI_KEY1_Write_Protection | Physical Map 0x366[3] | 1 bit   | 1              | 0: Enable write protection for ECDSA Key1 to prevent from being programmed to all 0 by hacker. |
   |                                 |                       |         |                |                                                                                                |
   |                                 |                       |         |                | 1: Disable write protection for ECDSA Key1.                                                    |
   +---------------------------------+-----------------------+---------+----------------+------------------------------------------------------------------------------------------------+
   | ECDSA_PRI_KEY2_Read_Protection  | Physical Map 0x366[4] | 1 bit   | 1              | 0: Enable read protection for ECDSA Key2 to prevent from being read out.                       |
   |                                 |                       |         |                |                                                                                                |
   |                                 |                       |         |                | 1: Disable read protection for ECDSA Key2.                                                     |
   +---------------------------------+-----------------------+---------+----------------+------------------------------------------------------------------------------------------------+
   | ECDSA_PRI_KEY2_Write_Protection | Physical Map 0x366[5] | 1 bit   | 1              | 0: Enable write protection for ECDSA Key2 to prevent from being programmed to all 0 by hacker. |
   |                                 |                       |         |                |                                                                                                |
   |                                 |                       |         |                | 1: Disable write protection for ECDSA Key2.                                                    |
   +---------------------------------+-----------------------+---------+----------------+------------------------------------------------------------------------------------------------+

The process of programming OTP physical map is as follows:

1. Generate the key.

2. Write the key into OTP physical map.

   Suppose this is your private key, it is displayed in the u8 type array as:

   .. code-block:: c

      u8 key1[32]= {
      0xff, 0xee, 0xdd, 0xcc, 0xbb, 0xaa, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00,
      0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01, 0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01
      };

   Using the following command to program ECDSA Key1:

   .. code-block:: c

      Efuse wraw 0x280 20 ffeeddccbbaa99887766554433221100efcdab8967452301efcdab8967452301

3. Use the following command to read OTP key back to check if it is written correctly. If not match, re-write it.

   .. code-block:: c

      Efuse rraw 0x280

4. Enable ECDSA Key Read Protection and Write Protection to prevent key exposure and tampering after the written ECDSA key is confirmed.

ECDSA Key Buffer Order
-------------------------
The key buffer parameter of ECDSA follows the small endian mode. For example, if the key is:

.. code-block:: c

   0x0123456789abcdef0123456789abcdef00112233445566778899aabbccddeeff

You need to put it into an array in u8 format, like this:

.. code-block:: c

   u8 key1[32]={
      0xff, 0xee, 0xdd, 0xcc, 0xbb, 0xaa, 0x99, 0x88, 0x77, 0x66, 0x55, 0x44, 0x33, 0x22, 0x11, 0x00,
      0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01, 0xef, 0xcd, 0xab, 0x89, 0x67, 0x45, 0x23, 0x01
   };

At this point, the array address can be API parameter.

If you program it into OTP as ``ECDSA_PRI_KEY1``, the memory layout is:

.. table:: 
   :width: 100%
   :widths: auto

   +-------+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
   | 0x280 | ff | ee | dd | cc | bb | aa | 99 | 88 | 77 | 66 | 55 | 44 | 33 | 22 | 11 | 00 |
   +-------+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+
   | 0x290 | ef | cd | ab | 89 | 67 | 45 | 23 | 01 | ef | cd | ab | 89 | 67 | 45 | 23 | 01 |
   +-------+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+----+

Usage
----------
Enabling Clock for ECDSA Engine
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The ECDSA is easy to use. You only need to ensure that the function and clock of the ECDSA are enabled; otherwise, the function will hang.

.. code-block::

   RCC_PeriphClockCmd(APBPeriph_ECDSA, APBPeriph_CLOCK_NULL, ENABLE);

Starting ECDSA Engine Calculation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Initialize the parameters and call the API to start ECDSA engine calculation.


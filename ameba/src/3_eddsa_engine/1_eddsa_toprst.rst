.. _eddsa_engine:

Introduction
------------------------------------
The EdDSA engine has signature verification function and supports three signature verification modes.

- Step mode
- Half auto mode
- Auto mode

Half auto mode is recommanded, because the signature buf and hash value need the same register in auto mode, but the time to write signature buf and hash is hard to control in auto mode.

.. note:: 
   The EdDSA can be accessed by NP and AP, but if multi-cores call the API to operate the EdDSA at the same time, it will lead to EdDSA function error.
   Users should take protective measures to ensure that only one core operates the EdDSA at a certain time.

APIs
------
EDDSA_Verify_StepMode
~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: auto

   +--------------+------------------------------------------------+
   | Items        | Description                                    |
   +==============+================================================+
   | Introduction | EDDSA_Verify_StepMode                          |
   +--------------+------------------------------------------------+
   | Parameters   | - pk: public key buf                           |
   |              |                                                |
   |              | - sign: input signature buf, should be 64 bytes|
   |              |                                                |
   |              | - h: input hash buf, should be 64 bytes        |
   +--------------+------------------------------------------------+
   | Return       | - 0: Success                                   |
   |              |                                                |
   |              | - Others: Fail                                 |
   +--------------+------------------------------------------------+

EDDSA_Verify_HalfAutoMode
~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: auto

   +--------------+--------------------------------------------------+
   | Items        | Description                                      |
   +==============+==================================================+
   | Introduction | Verify EdDSA signature in half auto mode         |
   +--------------+--------------------------------------------------+
   | Parameters   | - pk: public key buf                             |
   |              |                                                  |
   |              | - sign: input signature buf, should be 64 bytes  |
   |              |                                                  |
   |              | - h: input hash buf, should be 64 bytes.         |
   +--------------+--------------------------------------------------+
   | Return       | - 0: Success                                     |
   |              |                                                  |
   |              | - Others: Fail                                   |
   +--------------+--------------------------------------------------+

EDDSA_Verify_AutoMode
~~~~~~~~~~~~~~~~~~~~~~~~~~
.. table::
   :width: 100%
   :widths: auto

   +--------------+---------------------------------------------------+
   | Items        | Description                                       |
   +==============+===================================================+
   | Introduction | Verify EdDSA signature in auto mode               |
   +--------------+---------------------------------------------------+
   | Parameters   | - pk: public key buf                              |
   |              |                                                   |
   |              | - sign: input signature buf, should be 64 bytes   |
   |              |                                                   |
   |              | - h: input hash buf, should be 64 bytes           |
   +--------------+---------------------------------------------------+
   | Return       | - 0: Success                                      |
   |              |                                                   |
   |              | - Others: Fail                                    |
   +--------------+---------------------------------------------------+

Usage
------
Open Clock for EdDSA Engine
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The EdDSA is easy to use. You only need to ensure that the function and clock of the EdDSA are enabled; otherwise, the function will hang.

.. code-block::

   RCC_PeriphClockCmd(APBPeriph_ED25519, APBPeriph_CLOCK_NULL, ENABLE);
   
Starting EdDSA Engine Calculation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Initialize the parameters and call the API to start EdDSA engine calculation.


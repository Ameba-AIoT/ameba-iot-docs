.. _rsa_engine:

Introduction
--------------------------------
The RSA supports key lengths of 1024, 2048 and 3072 bits.

.. note:: 
   The RSA can be accessed by NP and AP, but if multi-cores call the API to operate the RSA at the same time, it will lead to RSA function error.
   Users should take protective measures to ensure that only one core operates RSA at a certain time.

Usage
----------
Enabling Clock for RSA Engine
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The RSA is easy to use. You only need to ensure that the function and clock of RSA are enabled; otherwise, the function will hang.

.. code-block::

   RCC_PeriphClockCmd(APBPeriph_RSA, APBPeriph_CLOCK_NULL, ENABLE);

Starting RSA Engine Calculation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Initialize the parameters and call :func:`RSA_HW_EXP_MOD()` to start RSA engine calculation.


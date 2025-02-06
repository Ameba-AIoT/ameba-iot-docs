.. _trng:

Introduction
------------------------
The TRNG is a true random number generator that provides full entropy outputs to the application as 32-bit samples. It is composed of a live entropy source and an internal conditioning component.


The TRNG has been tested under NIST-Random Test.

Features
----------------
- The TRNG delivers 32-bit true random numbers, produced by entropy source.

- The TRNG is embedded with a health test unit and an error management unit.

- Two independent FIFOs: FIFO_NS and FIFO_S, FIFO_S has a higher priority.

- The throughput of the TRNG is up to about 2Mbps.

Block Diagram
--------------------------
.. tabs::
   .. include:: trng_block_diagram_dplus.rst
   .. include:: trng_block_diagram_lite_smart.rst

Usage
----------
- If you need to run the system with security attributes, it is suggested to configure TRNG as secure so that the Control Register can only be accessed from secure world.

- When a large amount of random data is required both by secure world and non-secure world simultaneously, request from secure world will be satisfied first for the former has a higher priority. After the request from secure world ends, random data will be generated to satisfy non-secure world.

- It is suggested to call ``_rand()`` function to get a 32-bit random data.


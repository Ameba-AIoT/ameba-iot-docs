.. _sdk_example:

Introduction
--------------------------------------
There are two kinds of examples in the SDK.

- application examples
- peripheral examples

This chapter illustrates the contents of examples and how to build example source code. The path and description of SDK examples are listed in following table.

.. table:: Examples in SDK
   :width: 100%
   :widths: auto

   +---------------------+---------------------------------------+-------------------------------+
   | Items               | Path                                  | Description                   |
   +=====================+=======================================+===============================+
   | Application example | {SDK}\\component\\example             | xml, ssl, …                   |
   +---------------------+---------------------------------------+-------------------------------+
   | Peripheral example  | {SDK}\\component\\example\\peripheral | ADC, UART, I2C, SPI, Timer, … |
   +---------------------+---------------------------------------+-------------------------------+

Application Example
--------------------------------------
In each folder of application example, there are C source files, header files and :file:`README.txt`. You should check for detailed configurations of the example according to :file:`README.txt`.

.. note::
   The application examples are shared by all Realtek SoC, so you need to refer to :file:`README.txt` for detailed information of different ICs.

The entry function of application example is :func:`app_example()`, and each application example has its own :func:`app_example()`.

.. tabs::
   .. include:: sdk_example_application_run_dplus.rst
   .. include:: sdk_example_application_run_lite.rst
   .. include:: sdk_example_application_run_smart.rst

Peripheral Example
------------------------------------
The peripheral examples are demos of peripherals. Most examples consist of raw and mbed folders, you can choose raw or mbed demos as you like.

.. table:: Comparison of raw and mbed examples
   :width: 100%
   :widths: auto

   +-------+------------------------------------------------------------+---------------------------------+
   | Items | Path                                                       | Description                     |
   +=======+============================================================+=================================+
   | mbed  | {SDK}\\component\\example\\peripheral\\{peripheral}\\mbed  | mbed APIs are used.             |
   +-------+------------------------------------------------------------+---------------------------------+
   | raw   | {SDK}\\component\\example\\peripheral\\{peripheral}\\raw   | Low-level driver APIs are used. |
   +-------+------------------------------------------------------------+---------------------------------+

Each example folder has :file:`main.c` and :file:`README.txt`. There are example descriptions, required components, HW connection and expected behavior in :file:`README.txt`.

.. tabs::
   .. include:: sdk_example_peripheral_run_dplus.rst
   .. include:: sdk_example_peripheral_run_lite.rst
   .. include:: sdk_example_peripheral_run_smart.rst


.. _sdk_example:

概述
--------------------------------------
在SDK中，有两种类型的示例：

- 应用示例
- 外设示例

本章介绍两种SDK示例的内容，以及如何编译它们。

下表对这两种示例进行了简要描述。

.. table:: SDK 示例
   :width: 100%
   :widths: auto

   +---------------------+---------------------------------------+-------------------------------+
   | Items               | Path                                  | Description                   |
   +=====================+=======================================+===============================+
   | Application example | {SDK}\\component\\example             | xml, ssl, …                   |
   +---------------------+---------------------------------------+-------------------------------+
   | Peripheral example  | {SDK}\\component\\example\\peripheral | ADC, UART, I2C, SPI, Timer, … |
   +---------------------+---------------------------------------+-------------------------------+

应用示例
--------------------------------------
每个应用示例的文件夹中，包含c代码源文件、头文件和 :file:`README.txt`。请根据 :file:`README.txt` 确认每个示例的详细配置。

.. note::
   所有Realtek Ameba SoC共用同一份应用示例，请参照 :file:`README.txt` 来获取不同Ameba SoC的详细配置信息。

应用示例的入口函数是:func:`app_example()`，每个应用示例都有自己的 :func:`app_example()`。

.. tabs::

   .. include:: sdk_example_application_run_dplus.rst
   .. include:: sdk_example_application_run_lite.rst
   .. include:: sdk_example_application_run_smart.rst

外设示例
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


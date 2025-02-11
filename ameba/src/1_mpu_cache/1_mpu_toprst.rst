Memory Protection Unit (MPU)
=============================

Introduction
--------------------------------------------
The Memory Protection Unit (MPU) is a component provided by Arm and is used to provide hardware protection by software definition. The code in SDK provides the mpu_region_config struct to set the region memory attribute of MPU.


The following table shows the member variables of the :class:`mpu_region_config` struct.

.. tabs::

   .. include:: mpu_region_config_21Dx.rst
   .. include:: mpu_region_config_20EA26EA.rst
   .. include:: mpu_region_config_30E.rst

MPU APIs
----------------

.. tabs::
   .. include:: mpu_api_21Dx20EA26EA.rst
   .. include:: mpu_api_30E.rst

Usage
----------
Follow these steps to set a MPU region:

1. Define a new variable and struct

   - Variable to store MPU entry index

   - Struct *mpu_region_config* to store the region memory attribute

2. Call :func:`mpu_entry_alloc()` to allocate a free MPU entry

3. Set the struct of region memory attribute

4. Call :func:`mpu_region_cfg()` to configure MPU region memory attribute

.. Caution::
   For KR4, A physical memory protection (PMP) unit is implemented, but the code in SDK does not use PMP to provide access privileges control. Refer to `RISC-V privileged architecture proposal <https://riscv.org/wp-content/uploads/2017/05/riscv-privileged-v1.10.pdf>`_ for physical-memory protection scheme to set PMP when access privileges control is need.

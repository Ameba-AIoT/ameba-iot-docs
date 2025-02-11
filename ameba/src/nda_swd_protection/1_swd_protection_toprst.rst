Introduction
------------------------
Serial Wire Debug (SWD) is a debug interface for embedded devices, and it can be used for debugging the core. For security reasons, if you want to prevent from being accessed the states of the core and the system by others, SWD Protection will be a valid method.


By default, SWD protection is disabled, so when you connect the SWD pins with the supported debugger, refer to Application Note (Section: Setting Debugger) to make some software settings, then you can debug your program freely.

To use SWD protection, you should program ``SWD_PASSWORD`` and :ref:`SWD contents <swd_contents_in_otp>` into OTP in Multi-Production stage.
When you want to use SWD, you need acquire the ``SWD_ID`` of your device firstly, and next search your database to find out the specific password, which is mapped with the ``SWD_ID``, then input this password.

If the password that you input matches the one in OTP, then you have the permission to access the core; otherwise, the access will be forbidden.


For more detail information about SWD Protection principle, refer to User Manual (Chapter: Serial Wire Debug (SWD)).

.. note::

   Please contact <claire_wang@realsil.com.cn> for detail informations.


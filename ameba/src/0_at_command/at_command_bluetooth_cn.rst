.. _bluetooth_at_commands:

Bluetooth AT Commands
========================
Only commands start with AT+BTDEMO could be used before transfer module initialized, to use other commands you have to initialize the transfer module first.

.. bt_at_btdemo

AT+BTDEMO=transfer_module
--------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Init or deinit the transfer module.

Command
~~~~~~~~
.. code-block::

   AT+BTDEMO=transfer_module,<op>

Response
~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~
.. code-block::

   //Here is the callback message of start advertising when init transfer module
   +BLEGAP:adv,start,0,0

Parameter
~~~~~~~~~~
:<op>: Init or deinit transfer module.

   - 0: Deinit transfer module.

   - 1: Init transfer module.

AT+BTDEMO=transfer_module,get_name
--------------------------------------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Get the device name.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BTDEMO=transfer_module,get_name

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +BTDEMO:transfer_module,get_name,<name>
   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<name>: Device name.

AT+BTDEMO= transfer_module,set_name
----------------------------------------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Set the device name.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BTDEMO=transfer_module,set_name,<name>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<name>: The device name to be set.

   - The length of device name should not exceed 40.

.. note::
   This command only sets the device name. If you want to modify the name in advertising data, use the command ``AT+BLEGAP=adv_data[,<data>]`` before advertising started.


AT+BTDEMO= transfer_module,get_uuid
---------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Get UUID.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BTDEMO=transfer_module,get_uuid,<attr>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +BTDEMO:transfer_module,get_uuid,<attr>,<uuid>
   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<attr>: Attribute index.

   - 0: Primary service.

   - 1: Read.

   - 2: Write.

   - 3: Notify.

   - 4: Indicate.

:<uuid>: The uuid of attribute.

AT+BTDEMO= transfer_module,set_uuid
---------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Set UUID before trarnsfer module initialized.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BTDEMO=transfer_module,set_uuid,<attr>,<uuid>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<attr>: Attribute index.

   - 0: Primary service.

   - 1: Read.

   - 2: Write.

   - 3: Notify.

   - 4: Indicate.

:<uuid>: The UUID to be set.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+BTDEMO=transfer_module,set_uuid,1,0xd005
   OK

AT+BTDEMO= transfer_module,read_val
-------------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Set read value for read characteristic.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BTDEMO=transfer_module,read_val,<length>,<data>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<length>: Length of read value.

   - The maximum value is 30.

:<data>: Read value, e.g. 112233445566778899aabb

AT+BLEGAP=addr
----------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Get BT MAC address.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=addr

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +BLEGAP:addr,<addr>(<addr_type>)
   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<addr>: Local address.

:<addr_type>: Local address type.

   - 0: Public address.
   
   - 1: Random address.
   
   - 2: Resolvable private address or public address.
   
   - 3: Resolvable private address or random address.

AT+BLEGAP=rand_addr
--------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Set random BT MAC address.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=rand_addr,<addr>[,<type>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<addr>: The random address to be set.

   - The string of address, e.g. 001122334455

:<type>: Address type.

   - 0: Static random device address.

   - 1: Non resolvable random device address.

   - 2: Resolvable random device address.

AT+BLEGAP=mtu_size
------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Get MTU size.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=mtu_size,<conn_handle>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +BLEGAP:mtu_size,<conn_handle>,<mtu_size>
   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<mtu_size>: MTU size of this connection.

AT+BLEGAP=set_mtu
----------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Set MTU size before connection established.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=set_mtu,<mtu_size>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<mtu_size>: The MTU size to be set.

AT+BLEGAP=adv
--------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Start or stop advertising.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=adv,<op>[,<type>,<own_addr_type>,<filter_policy>[,<peer_addr_type>,<peer_addr>[,<interval_min>,<interval_max>,<channel_map>]]]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~~~~~~~~~~
.. code-block::

   //Here is the callback message of start advertising
   +BLEGAP:adv,<op>,<result>,<type>

Or

.. code-block::

   //Here is the callback message of stop advertising
   +BLEGAP:adv,<op>,<result>,<reason>

.. _bt_at_blegap_adv_para:

Parameter
~~~~~~~~~~~~~~~~~~
:<op>: Advertising option.

   - 1: Start advertising.

   - 0: Stop advertising.

:<type>: Advertisement type.

   - 0: Connectable undirected advertisement.

   - 1: Connectable high duty cycle directed advertisement.

   - 2: Scannable undirected advertisement.

   - 3: Non-Connectable undirected advertisement.

   - 4: Connectable low duty cycle directed advertisement.

:<own_addr_type>: Local address type.

   - 0: Public address.

   - 1: Random address.

   - 2: Resolvable private address or public address.

   - 3: Resolvable private address or random address.

:<filter_policy>: Advertising filter policy.

   - 0: Process scan and connection requests from all devices.

   - 1: Process connection requests from all devices and only scan requests from devices that are in the White List.

   - 2: Process scan requests from all devices and only connection requests from devices that are in the White List.

   - 3: Process scan and connection requests only from devices in the White List.

:<peer_addr_type>: Peer address type.

   - 0: Public address.

   - 1: Random address.

   - 2: Resolvable private address or public address.

   - 3: Resolvable private address or random address.

:<peer_addr>: Peer address.

:<interval_min>: Minimum advertising interval.

   - [0x20, 0x4000]

   - Minimum advertising interval = <interval_min> * 0.625 ms, range 20ms to 10.24s.

:<interval_max>: Maximum advertising interval.

   - [0x20, 0x4000]

   - Maximum advertising interval = <interval_max> * 0.625 ms, range 20ms to 10.24s.

:<channel_map>: Advertising channel map.

   - 0x01: Advertisement channel 37.

   - 0x02: Advertisement channel 38.

   - 0x04: Advertisement channel 39.

   - 0x07: All advertisement channel enabled.

:<result>: Result of start/stop advertising.

   - 0: Success.

   - -1: Fail.

:<reason>: Reason of stop advertising.

   - 0: Stopped by host.

   - 1: Stopped due to connection established.

   - 2: Stopped due to duration expired or number of extended advertising events exceeded.

   - 3: Unknown.

AT+BLEGAP=get_adv_param
----------------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Get advertisement parameter.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=get_adv_param

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +BLEGAP:get_adv_param,<type>,<own_addr_type>,<filter_policy>,<peer_addr_type>,<peer_addr>,<interval_min>,<interval_max>,<channel_map>
   OK

Parameter
~~~~~~~~~~~~~~~~~~
Refer to :ref:`bt_at_blegap_adv_para`.

AT+BLEGAP=adv_data
------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Set advertising data before advertising started.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=adv_data[,<data>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<data>: Advertising data.

   - If <data> is not given, it will use default advertising data.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=adv_data,02010508095265616c74656b
   OK
   //02: Length of flags part
   //01: Flags
   //05: LE limited discoverable mode and BR/EDR not supported
   //08: Length of local name part
   //09: Complete local name
   //5265616c74656b: The ASCII value of string "Realtek", this is the local name in advertising data

AT+BLEGAP=scan
----------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Start or stop scan.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=scan,<op>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~~~~~~~~~~
.. code-block::

   //Here is the callback message of start scan and scan info
   +BLEGAP:scan,<type=start>,<result>,<type>
   +BLEGAP:scan,<type=info>,<addr_type>,<addr>,<rssi>,<adv_report_len>

Or

.. code-block::

   //Here is the callback message of stop scan
   +BLEGAP:scan,<type=stop>,<result>,<stop_reason>

Parameter
~~~~~~~~~~~~~~~~~~
:<op>: Scan option

   - 1: Start scan.

   - 0: Stop scan.

:<result>: Result of start/stop scan.

   - 0: Success

   - -1: Fail

:<type>: Scan type.

   - 0: Passive scan.

   - 1: Active scan.

:<addr_type>: Remote address type.

   - 0: Public address.

   - 1: Random address.

   - 2: LE public identity address.

   - 3: LE random identity address.

:<rssi>: RSSI.

   - [-127, 20], 127 means RSSI is not available.

:<stop_reason>: Reason of stop scan.

   - 0: Stopped by host.

   - 1: Stopped due to scan duration timeout.

   - 2: Unknown.

AT+BLEGAP=scan_param
----------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Set scan parameter before scan started.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=scan_param[,<type>,<own_addr_type>,<filter_policy>,<duplicate_opt>[,<interval>,<window>]]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

.. _bt_at_blegap_scan_para:

Parameter
~~~~~~~~~~~~~~~~~~
:<type>: Scan type.

   - 0: Passive scan.

   - 1: Active scan.

:<own_addr_type>: Local address type.

   - 0: Public address.

   - 1: Random address.

   - 2: Resolvable private address or public address.

   - 3: Resolvable private address or random address.

:<filter_policy>: Scan filter policy.

   - 0: Accept all advertising packets except directed advertising packets not addressed to this device (Default).

   - 1: Accept only advertising packets from devices where the advertiser's address is in the White List. Directed advertising packets which are not addressed to this device shall be ignored.

   - 2: Accept all advertising packets except directed advertising packets where the initiator's identity address does not address this device.

   - 3: Accept all advertising packets except advertising packets where the advertiser's identity address is not in the White List and directed advertising packets where the initiator's identity address does not address this device.

:<duplicate_opt>: Scanning filter duplicated option.

   - 0: Duplicate filtering disabled.

   - 1: Duplicate filtering enabled.

   - 2: Duplicate filtering enabled, reset for each scan period.

:<interval>: Scan interval.

   - [0x4, 0x4000]

   - Scan interval = <interval> * 0.625 ms, range 2.5ms to 10.24s.

:<window>: Scan window.

   - [0x4, 0x4000]

   - Scan window = <window> * 0.625 ms, range 2.5ms to 10.24s.

   - Scan interval cannot be smaller than scan window.

AT+BLEGAP=get_scan_param
------------------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Get scan parameter.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=get_scan_param

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +BLEGAP:get_scan_param,<scan_type>,<local_addr_type>,<filter_policy>,<duplicate_opt>,<interval>,<window>
   OK

Parameter
~~~~~~~~~~~~~~~~~~
Refer to :ref:`bt_at_blegap_scan_para`.

AT+BLEGAP=scan_rsp
------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Set scan response data before scan started.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=scan_rsp[,<data>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<data>: Scan response data.

   - If <data> is not given, it will use default scan response data.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=scan_rsp,03194000
   OK

   //03: Length of appearance part
   //19: Advertising data type appearance
   //4000: Appearance generic phone(0x0040)

AT+BLEGAP=conn
----------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Create connection.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=conn,<peer_addr_type>,<peer_addr>[,<own_addr_type>,
   <filter_policy>[,<scan_interval>,<scan_window>,<conn_interval_min>,<conn_interval_max>,<conn_latency>,<supv_timeout>]]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~~~~~~~~~~
.. code-block::

   //Here is the callback message of connection for local device
   +BLEGAP:conn,<result>,<conn_handle>,<peer_addr>(<peer_addr_type>)

And

.. code-block::

   //Here is the callback message of connection for peer device
   +BLEGAP:adv,stop,<result>,<stop_reason>
   +BLEGAP:conn,<result>,<conn_handle>,<peer_addr>(<peer_addr_type>)

Parameter
~~~~~~~~~~~~~~~~~~
:<peer_addr_type>: Peer address type.

   - 0: Public address.

   - 1: Random address.

   - 2: LE Public identity address type.

   - 3: LE Random identity address type.

:<own_addr_type>: Local address type.

   - 0: Public address.

   - 1: Random address.

   - 2: Resolvable private address or public address.

   - 3: Resolvable private address or random address.

:<filter_policy>: Connect filter policy.

   - 0: Filter without whitelist.

   - 1: Filter with whitelist.

:<scan_interval>: Scan interval.

   - [0x4, 0x4000]

   - Scan interval = <scan_interval> * 0.625 ms, range 2.5ms to 10.24s.

:<scan_window>: Scan window.

   - [0x4, 0x4000]

   - Scan window = <scan_window> * 0.625 ms, range 2.5ms to 10.24s.

- Scan interval cannot be smaller than scan window.

:<conn_interval_min>: Minimum connection interval.

   - [0x6, 0x0C80]

   - Minimum connection interval = <conn_interval_min> * 1.25 ms, range 7.5ms to 4s.

:<conn_interval_max>: Maximum connection interval.

   - [0x6, 0x0C80]

   - Maximum connection interval = <conn_interval_max> * 1.25 ms, range 7.5ms to 4s.

:<conn_latency>: Slave latency for the connection in number of connection events.

   - [0, 0x01F3]

:<supv_timeout>: Supervision timeout for the LE link.

   - [0xa, 0x0C80]

   - Supervision timeout = <supv_timeout> * 10 ms, range 100ms to 32s.

:<result>: Result of start/stop adv.

   - 0: Success.

   - -1: Fail.

:<stop_reason>: Reason of stop adv.

   - 0: Stopped by host.

   - 1: Stopped due to connection established.

   - 2: Stopped due to duration expired or number of extended advertising events exceeded.

   - 3: Unknown.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=conn,0,701d080bdc77
   OK
   +BLEGAP:conn,0,17,70:1D:08:0B:DC:77(public)

   //Peer device
   +BLEGAP:adv,stop,0,0x1
   +BLEGAP:conn,0,23,00:E0:4C:87:22:3D(public)

AT+BLEGAP=disconn
----------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Close connection.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP= disconn,<conn_handle>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~~~~~~~~~~
.. code-block::

   //Here is the callback message of disconnect for local device
   +BLEGAP:disconn,<disc_reason>,<conn_handle>,<role>,<remote_addr>(<remote_addr_type>)

And

.. code-block::

   //Here is the callback message of disconnect for peer device
   +BLEGAP:disconn,<disc_reason>,<conn_handle>,<role>,<remote_addr>(<remote_addr_type>)

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<disc_reason>: Reason of disconnect.

   - Refer to :file:`bt_types.h`

:<role>: Master or slave.

:<remote_addr>: Remote device address.

:<remote_addr_type>: Remote device address type.

   - 0: Public address.

   - 1: Random address.

   - 2: LE Public identity address type.

   - 3: LE Random identity address type.

AT+BLEGAP=conn_info
--------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Get connection information.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=conn_info,<conn_handle>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +BLEGAP:conn_info,<conn_handle>,<role>,<remote_addr>(<remote_addr_type>),<interval>,<latency>,<supv_timeout>,<tx_phy>,<rx_phy>
   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<role>: Master or slave.

:<remote_addr>: Remote device address.

:<interval>: Connection interval.

:<latency>: Slave latency for the connection in number of connection events.

:<supv_timeout>: Supervision timeout for the LE link.

:<tx_phy>: Tx phy.

   - 1: 1M

   - 2: 2M

   - 3: Coded

:<rx_phy>: Rx phy.

   - 1: 1M

   - 2: 2M

   - 3: Coded

AT+BLEGAP=conn_update
------------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Update connection parameters when connection established.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=conn_update,<conn_handle>,<conn_interval_min>,<conn_interval_max>,<conn_latency>,<supv_timeout>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~~~~~~~~~~
.. code-block::

   //Here is the callback message of connection update for both local and peer device if success
   +BLEGAP:conn_update,<conn_handle>,<update_result>,<conn_interval>,<conn_latency>,<supv_timeout>

Or

.. code-block::

   //Here is the callback message of connection update for both local and peer device if fail
   +BLEGAP:conn_update,<conn_handle>,<update_result>

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<conn_interval_min>: Minimum connection interval.

   - [0x6, 0x0C80]

   - Minimum connection interval = <conn_interval_min> * 1.25 ms, range 7.5ms to 4s.

:<conn_interval_max>: Maximum connection interval.

   - [0x6, 0x0C80]

   - Maximum connection interval = <conn_interval_max> * 1.25 ms, range 7.5ms to 4s.

:<conn_latency>: Slave latency for the connection in number of connection events.

   - [0, 0x01F3]

:<supv_timeout>: Supervision timeout for the LE link.

   - [0xa, 0x0C80]

   - Supervision timeout = <supv_timeout> * 10 ms, range 100ms to 32s.

:<update_result>: Result of update connection parameter.

   - 0: Success.

   - -1: Fail.

AT+BLEGAP=wl_add
--------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Add address to whitelist.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=wl_add,<addr_type>,<addr>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<addr_type>: Remote Address type.

   - 0: Public address.

   - 1: Random address.

   - 2: LE Public identity address type.

   - 3: LE Random identity address type.

:<addr>: Address to be added to the whitelist.

AT+BLEGAP=wl_remove
--------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Remove address from whitelist.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=wl_remove,<addr_type>,<addr>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<addr_type>: Remote Address type.

   - 0: Public address.

   - 1: Random address.

   - 2: LE Public identity address type.

   - 3: LE Random identity address type.

:<addr>: Address to be removed from whitelist.

AT+BLEGAP=wl_clear
------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Clear whitelist.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=wl_clear

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
None.

AT+BLEGAP=sec_param
--------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Configure authentication information.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=sec_param[,<io_cap>,<oob_data_flag>,<bond>,<mitm>,<sec_pair>,<use_fixed_key>,<fixed_key>,<sec_pair_only>,<auto_sec_req>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

.. _bt_at_blegap_sec_para:

Parameter
~~~~~~~~~~~~~~~~~~
:<io_cap>: I/O capabilities.

   - 0: Only a display present, no keyboard or Yes/No keys.

   - 1: Display and Yes/No keys present.

   - 2: Only a keyboard present, no display.

   - 3: No input/output capabilities.

   - 4: Keyboard and display present.

:<oob_data_flag>: OOB data flag.

   - Default is all 0.

:<bond>: Bond flag.

:<mitm>: MITM flag.

:<sec_pair>: Sec pair flag.

:<use_fixed_key>: The fix passcode available for pairing.

   - 0: Disabled (default).

   - 1: Enabled

:<fixed_key>: The fix passcode for MITM protection.

   - [0, 999999]

   - Default is 0.

:<sec_pair_only>: Security pair only flag.

:<auto_sec_req>: Send smp security request when connected.

   - 0: Disabled (default).

   - 1: Enabled.

AT+BLEGAP=get_sec_param
----------------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Get security parameter.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=get_sec_param

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +BLEGAP:get_sec_param,<io_cap>,<oob_data_flag>,<bond>,<mitm>,<sec_pair>,<use_fixed_key>,<fixed_key>
   OK

Parameter
~~~~~~~~~~~~~~~~~~
Refer to :ref:`bt_at_blegap_sec_para`.

AT+BLEGAP=sec
--------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Start security progress.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=sec,[conn_handle]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~~~~~~~~~~
The following is the possible callback message of start security for both local and peer device:

.. code-block::

   +BLEGAP:sec,<conn_handle>,<result>  //pair compeleted

Or

.. code-block::

   +BLEGAP:pair_cfm,<conn_handle>  //just work paring confirm

Or

.. code-block::

   +BLEGAP:passkey_display,<conn_handle>,<passkey>  //display passkey

Or

.. code-block::

   +BLEGAP:passkey_input,<conn_handle>  //confirm passkey

Or

.. code-block::

   +BLEGAP:oobkey_input,<conn_handle>  //input oob key

Or

.. code-block::

   +BLEGAP:resolv_list_pending,<adv>,<scan>,<connect>  //display the reason of pending

Or

.. code-block::

   +BLEGAP:resolv_list_modify,<op>,<result>  //clear resolving list

Or

.. code-block::

   +BLEGAP:resolv_list_modify,<op>,<result>,<addr>,<device_mode> //add or remove resolving list

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<result>:

   - 0: Success.

   - -1: Fail.

:<passkey>: Passkey to input.

:<adv>: Pending by adv.

   - 1: Yes.

   - 0: No

:<scan>: Pending by scan.

   - 1: Yes.

   - 0: No

:<connect>: Pending by connect.

   - 1: Yes.

   - 0: No

:<addr>: The addr to modify.

:<device_mode>: Device mode for privacy, device or network.

AT+BLEGAP=pair_cfm
------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Confirm just work paring indication.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=pair_cfm,<conn_handle>,<op>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<op>: Confirm pair indication.

   - 1: Accept.

   - 2: Reject.

AT+BLEGAP=auth_key
------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Input authentication passkey.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=auth_key,<conn_handle>,<passkey>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<passkey>: Passkey for authentication.

   - [0, 999999]

AT+BLEGAP=auth_keycfm
------------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Confirm authentication passkey.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=auth_keycfm,<conn_handle>,<op>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<op>: Confirm authentication passkey.

   - 1: Accept.

   - 2: Reject.

AT+BLEGAP=auth_oob
------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Input oob data.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=auth_oob,<conn_handle>,<tk>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<tk>: OOB data.

AT+BLEGAP=bond_info
--------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Get bond information.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=bond_info

Response
~~~~~~~~~~~~~~~~
.. code-block::

   +BLEGAP:bond_info,<idx_1>,<remote_addr_1>,<identity_addr_1>,<idx_2>,,<remote_addr_2>,<identity_addr_2>,…
   OK

Parameter
~~~~~~~~~~~~~~~~~~
:<idx>: Index number of bond information.

:<remote_addr>: Remote device address.

:<identity_addr>: Remote device identity address.

AT+BLEGAP=bond_del
------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Delete bond information.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=bond_del,<addr_type>,<addr>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~~~~~~~~~~
.. code-block::

   //Here is the callback message of bond modify
   +BLEGAP:bond_modify,<op>,<addr>,<ident_addr>

Parameter
~~~~~~~~~~~~~~~~~~
:<addr_type>: Address type.

   - 0: Public address.

   - 1: Random address.

   - 2: LE Public identity address type.

   - 3: LE Random identity address type.

:<addr>: Address to be delete.

:<op>: Bond modify type.

   - 0: Delete.

   - 1: Add.

   - 2: Clear.

   - 3: Full.

   - 4: Key missing.

:<ident_addr>: The identity address of the deleted address.

AT+BLEGAP=bond_clear
----------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Clear bond information.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGAP=bond_clear

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~~~~~~~~~~
.. code-block::

   //Here is the callback message of clear bond information
   +BLEGAP:bond_modify,<op>,<addr>,<ident_addr>

Parameter
~~~~~~~~~~~~~~~~~~
:<op>: Bond modify type.

   - 0: Delete.

   - 1: Add.

   - 2: Clear.

   - 3: Full.

   - 4: Key missing.

:<addr>: Address to be delete.

:<ident_addr>: The identity address of the deleted address.

AT+BLEGAP=disc
----------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Discover service and characteristic.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGATTC=disc,<conn_handle>,<discover_type>[,<start_handle>,<end_handle>,<uuid16/uuid128>]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~~~~~~~~~~
.. code-block::

   //Here is the callback message of discover primary services
   +BLEGATTC:disc,<disc_status>,<discover_type>,<conn_handle>,<start_handle>,<end_handle>,<UUID>
   +BLEGATTC:disc,<disc_status>,<conn_handle>,<discover_type>

Or

.. code-block::

   //Here is the callback message of find included services
   +BLEGATTC:disc,<disc_status>,<discover_type>,<conn_handle>,<included_service_handle>,<start_handle>,<end_handle>,<UUID>
   +BLEGATTC:disc,<disc_status>,<conn_handle>,<discover_type>

Or

.. code-block::

   //Here is the callback message of discover characteristic
   +BLEGATTC:disc,<disc_status>,<discover_type>,<conn_handle>,<characteristic_handle>,<properties>,<value_handle>,<UUID>
   +BLEGATTC:disc,<disc_status>,<conn_handle>,<discover_type>

Or

.. code-block::

   //Here is the callback message of discover characteristic descriptors
   +BLEGATTC:disc,<disc_status>,<discover_type>,<conn_handle>,<descriptor_handle>,<UUID>
   +BLEGATTC:disc,<disc_status>,<conn_handle>,<discover_type>

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<discover_type>: Discover type.

   - 0: Discover all primary services.

   - 1: Discover primary services by service UUID.

   - 2: Find included services.

   - 3: Discover all characteristic of a service.

   - 4. Discover characteristic by UUID.

   - 5. Discover all characteristic descriptors.

:<start_handle>: The start attribute handle of discover range.

:<end_handle>: The end attribute handle of discover range.

:<uuid16/uuid128>: The target UUID when discover by UUID.

:<disc_status>: Discover status.

   - 0: Done.

   - 1: Continue.

   - 2: Fail.

:<included_service_handle>: Include service declaration handle.

:<characteristic_handle>: Characteristic declaration handle.

:<properties>: Characteristic properties

:<value_handle>: Characteristic value attribute handle

:<descriptor_handle>: Characteristic descriptor handle.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGATTC=disc,17,3,0x1,0xFFFF
   OK
   +BLEGATTC:disc,1,3,17,0x0002,0x20,0x0003,2a05
   +BLEGATTC:disc,1,3,17,0x0006,0x02,0x0007,2a00
   +BLEGATTC:disc,1,3,17,0x0008,0x02,0x0009,2a01
   +BLEGATTC:disc,1,3,17,0x000a,0x02,0x000b,2a04
   +BLEGATTC:disc,1,3,17,0x000d,0x02,0x000e,d001
   +BLEGATTC:disc,1,3,17,0x000f,0x0c,0x0010,d002
   +BLEGATTC:disc,1,3,17,0x0011,0x10,0x0012,d003
   +BLEGATTC:disc,1,3,17,0x0014,0x20,0x0015,d004
   +BLEGATTC:disc,0,17,3

AT+BLEGATTC=read
--------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Read characteristic value.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGATTC=read,<conn_handle>,<type>[,…]

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~~~~~~~~~~
.. code-block::

   //Here is the callback message of read fail
   +BLEGATTC:read,<read_status>,<conn_handle>,<type>,<err_code>

Or

.. code-block::

   //Here is the callback message of read by handle and read by uuid
   +BLEGATTC:read,<read_status>,<conn_handle>,<type>,<handle>,<data>...
   +BLEGATTC:read,<read_status>,<conn_handle>,<type>

Or

.. code-block::

   //Here is the callback message of read multiple variable
   +BLEGATTC:read,<read_status>,<conn_handle>,<type>,<data>...
   +BLEGATTC:read,<read_status>,<conn_handle>,<type>

And

.. code-block::

   //Here is the read response for peer device if read success
   +BLEGATTS:read_rsp,<read_rsp_status>,<service_app_id><conn_handle>,<handle>,<err_code>

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<type>: Read type.

   - 0: Read characteristic value.

   - 1: Read using characteristic UUID.

   - 2: Read multiple characteristic values.

   - 3: Read multiple variable characteristic values.

:<read_status>: Read status.

   - 0: Done.

   - 1: Continue.

   - 2: Fail.

:<err_code>: Error code.

   - 0: Success.

   - others: Failure cause.

:<handle>: Attribute handle.

:<data>: Read value.

:<read_rsp_status>: Read response status.

   - 0: Success.

   - -1: Fail.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGATTC=read,17,0,0xc
   OK
   +BLEGATTC:read,1,17,0,0x000e,01,02,03,04,05,06,07,08,09,0a //read value is hex number
   +BLEGATTC:read,0,17,0

   //Peer device
   +BLEGATTS:read_rsp,0,12,23,2,0

AT+BLEGATTC=write
----------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Write characteristic value.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGATTC=write,<conn_handle>,<type>,<handle>,<length>,<data>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~~~~~~~~~~
.. code-block::

   //Here is the callback message of write failed of local device
   +BLEGATTC:write,<write_status>,<conn_handle>,<type>,<err_code>

Or

.. code-block::

   //Here is the callback message of write done of local device
   +BLEGATTC:write,<write_status>,<conn_handle>,<type>,<handle>

And

.. code-block::

   //Here is the callback message of write done for peer device if write success
   +BLEGATTC:write,<service_app_id>,<conn_handle>,<handle>,<type>,<len>,<data>

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<type>: Write type.

   - 0: Write characteristic value request.

   - 1: Write characteristic value without response.

   - 2: Write characteristic value without response and with signed data.

:<handle>: Attribute handle of peer device.

:<length>: Length of write data.

:<data>: Write data, e.g. 0a0b.

:<write_status>:

   - 0: Done.

   - 2: Fail.

:<err_code>:

   - 0: Success.

   - Others: Failure cause.

:<service_app_id>: Service APP ID.

:<len>: Length of data.

:<data>: Write data value, e.g. 0a0b.

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGATTC=write,17,1,0x10,1,01
   OK
   +BLEGATTC:write,0,17,1,0xe

   //Peer device
   +BLEGATTS:write,12,23,4,1,1,01

.. note::
   You could use this command to enable/disable notify/indicate. The format is as follows:

   .. code-block::
   
      AT+BLEGATTC=write,17,0,0x17,2,0100
      //17: Connection handle
      //0: Write request type, must be 0
      //0x17: CCCD handle
      //2: Length of write data, must be 2
      //0100: Write data, 0100 means enable notify, 0200 means enable indicate, 0000 means disable notify/indicate

AT+BLEGATTS=notify
------------------------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Send notification from GATT server.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGATTS=notify,<conn_handle>,<service_app_id>,<charac_index>,<length>,<data>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~~~~~~~~~~
.. code-block::

   //Here is the callback message of notification
   +BLEGATTS:notify,<notify_result>,<service_app_id>,<conn_handle>,<charac_index>

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<service_app_id>: Fixed value 12.

:<charac_index>: Fixed value 6.

:<length>: Length of notification data.

:<data>: Notification data, e.g. 0a0b.

:<notify_result>: Result of notification.

   - 0: Success

   - -1: Fail

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGATTS=notify,23,12,6,4,11223344
   OK
   +BLEGATTS:notify,0,12,23,6

AT+BLEGATTS=indicate
----------------------
Description
~~~~~~~~~~~~~~~~~~~~~~
Send indication from GATT server.

Command
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGATTS=indicate,<conn_handle>,<service_app_id>,<charac_index>,<length>,<data>

Response
~~~~~~~~~~~~~~~~
.. code-block::

   OK

AT Message
~~~~~~~~~~~~~~~~~~~~
.. code-block::

   //Here is the callback message of indication
   +BLEGATTS:indicate,<indicate_result>,<service_app_id>,<conn_handle>,<charac_index>

Parameter
~~~~~~~~~~~~~~~~~~
:<conn_handle>: Connection handle.

:<service_app_id>: Fixed value 12.

:<charac_index>: Fixed value 9.

:<length>: Length of indication data.

:<data>: Indication data, e.g. 0a0b.

:<indicate_result>: Result of notification.

   - 0: Success

   - -1: Fail

Example
~~~~~~~~~~~~~~
.. code-block::

   AT+BLEGATTS=indicate,23,12,9,4,44332211
   OK
   +BLEGATTS:indicate,0,12,23,9

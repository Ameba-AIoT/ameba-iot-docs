Layout Tool
==========================

Introduction
------------------------
The Layout Tool is the official layout adjustment tool developed by Realtek for Ameba series SoC, used to adjust chip memory layout and configure link script files.

As shown below, the UI of Layout Tool contains two parts: the memory layout and the link configuration.

.. only:: RTL8726EA
      
   .. figure:: figures/layout_tool_ui_lite.png
      :scale: 50%
      :align: center

      UI of Layout Tool

.. only:: RTL8721D
   
   
   .. figure:: figures/layout_tool_ui_dplus.png
      :scale: 50%
      :align: center
      
      UI of Layout Tool   


Environment Setup
----------------------------------
Software Setup
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
- Environment requirements: EX. WinXP, Win 7 or later, Microsoft .NET Framework 4.0.

- Software location: ``<SDK>/tools/Ameba/LayoutTool/AmebaLayoutTool.exe``

Open
--------
Select SDK Path
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The SDK select steps are illustrated below:

1. Click the ``Open`` button.

2. Click the ``Browse`` button to select the SDK path.

   .. only:: RTL8726EA
         
      The following paths are supported:
        
      - ``{SDK}``

      - ``{SDK}\amebalite_gcc_project``


   .. only:: RTL8721D
         
      The following paths are supported:

      - ``{SDK}``

      - ``{SDK}\amebadplus_gcc_project``

   
   
3. Click the ``OK`` button to confirm the selection.

Configure Memory
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. only:: RTL8726EA
   
   1. Select **PSRAM/DSP**.
   
   2. **PSRAM size**: 4MB/8MB/16MB/32MB, default is 8MB.
   
   3. **FLASH size**: 4MB/8MB/16MB/32MB/64MB, default is 8MB.
   
   4. Click the ``OK`` button to confirm selection.
   
      .. figure:: figures/layout_config_memory_lite.png
         :scale: 80%
         :align: center

.. only:: RTL8721D
   
   1. Select **PSRAM**.
   
   2. **PSRAM size**: 4MB/8MB/16MB/32MB, default is 8MB.
   
   3. **FLASH size**: 4MB/8MB/16MB/32MB/64MB, default is 8MB.
   
   4. Click the ``OK`` button to confirm selection.
   
      .. figure:: figures/layout_config_memory_dplus.png
         :scale: 80%
         :align: center

Edit
--------
Configure Link
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Link configuration is to adjust the location of code section. The adjustment steps are illustrated below:

1. Click the value of the ``Location`` column which needs to be edited.

2. Click the drop-down box to switch the location.

The memory layout will be changed accordingly when code section is moved.

.. only:: RTL8726EA
      
   .. figure:: figures/layout_tool_edit_config_link_lite.png
      :scale: 50%
      :align: center

.. only:: RTL8721D
      
   .. figure:: figures/layout_tool_edit_config_link_dplus.png
      :scale: 50%
      :align: center

|

.. note::

      - Location value containing **IMG2_XIP** means Flash virtual address.

      - In order to adjust the memory address conveniently, the memory layout shows Flash physical address.

Resize Memory Section
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Memory layout contains PSARM, SRAM, and Flash. Every memory consists of several memory sections.
The structure of memory section is illustrated below:

- **Start address**: value in red means can be adjusted.

- **Size**: in MB/KB/B.

- **Memory section name**: name of memory section.

- **Code section**: value in red means code section can be moved, ``Reserved`` means this section did not contain code section. 

.. figure:: figures/layout_tool_resize_memory_section.png
   :scale: 75%
   :align: center

The steps of adjusting start address are:

1. Click the start address value.

2. Enter the required address in keyboard.

   .. note::

      - If not ``Dummy`` section, range of start address: pre-section start address (not contained) ~ current section end address (not contained).

      - If ``Dummy`` section, range of start address: pre-section start address (not contained) ~ current section end address (contained).

3. Press ``Enter`` to enable it, size will be changed accordingly.

Delete Section
~~~~~~~~~~~~~~~~~~~~~~~~~~~~
There are two ways to delete a memory section:

- Use ``Delete`` button in tool strip

   a. Click the section, the border will turn red to indicate selected.

   b. Chick the ``Delete`` button.

   c. Click the ``OK`` button to confirm deletion.

   .. only:: RTL8726EA
      
      
      .. figure:: figures/layout_tool_delete_section_lite.png
         :scale: 50%
         :align: center
   
   .. only:: RTL8721D
       
      .. figure:: figures/layout_tool_delete_section_dplus.png
         :scale: 50%
         :align: center

- Use right mouse button

   a. Right-click on the section.

   b. Select ``Delete``.

   c. Click the ``OK`` button to confirm deletion.

When memory section is deleted, its name turns ``Dummy``, and its color changes to light blue. In the case its space can be allocated freely.

Preview
--------------
1. Click the ``Preview`` button to preview the link scripts.

2. Use ``Core`` combo-box to preview different core's link script.

Save and Save As
--------------------------------
Save
~~~~~~~~
Click the ``Save`` button to save layout file and link script files.

Save As
~~~~~~~~~~~~~~
1. Click the ``Save As`` button in menu bar.

2. Click the ``Browse`` button to edit the file name.

3. Click the ``OK`` button.

.. note::

   Path of the layout file and link script file cannot be changed, which can only be allowed to be saved as another files.

.. only:: RTL8726EA
   
   .. figure:: figures/layout_tool_save_as_lite.png
      :scale: 50%
      :align: center

.. only:: RTL8721D
   
   .. figure:: figures/layout_tool_save_as_dplus.png
      :scale: 50%
      :align: center

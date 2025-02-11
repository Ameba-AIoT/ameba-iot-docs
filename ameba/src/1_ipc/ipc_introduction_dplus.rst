.. tab:: RTL8721Dx

   The inter-processor communication (IPC) hardware is designed to make multi-CPUs communicate with each other.
   Also, a KM0 shared SRAM is used to transmit information to each other. The block diagram is shown below.

   .. figure:: figures/ipc_block_diagram.svg
      :scale: 120%
      :align: center

      IPC block diagram

   There are 2 directions for 2 cores to communicate with each other: KM0 ←→ KM4. There are 16 TX channels and 16 RX channels for each direction. All the channels are processed independently. That means one core can send different information to another core through different channels at any time, the channels will not affect each other.

   Each channel has one transmit side and one receive side, the transmit side and the receive side of the same channel is a pair. For example, KM0 sends an IPC to KM4 through channel 7, the transmit side is KM0 channel 7, and receive side is KM4 channel 7, and information is sent from KM0 channel 7 to KM4 channel 7.

   .. figure:: figures/ipc_schematic_diagram.svg
      :scale: 130%
      :align: center

      IPC schematic diagram
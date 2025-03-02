.. tab:: RTL8720E

   The inter-processor communication (IPC) hardware is designed to make multi-CPUs communicate with each other.
   Also, a shared SRAM is used to transmit information to each other. The block diagram is shown below.

   .. figure:: figures/ipc_block_diagram_8720EA.svg
      :scale: 130%
      :align: center

      IPC block diagram

   There are two directions for KM4 and KR4 to communicate with each other, and 8 channels for each direction. All the channels are processed independently, which means that one core can send different information to the other core through different channels at any time, the channels will not affect each other.


   Each channel has one transmit side and one receive side, the transmit side and the receive side of the same channel is a pair. For example, KR4 sends an IPC to KM4 through channel 4, the transmit side is KR4 channel 4, and the receive side is KM4 channel 4; and information is sent from KR4 channel 4 to KM4 channel 4.

   .. figure:: figures/ipc_schematic_diagram_8720EA.svg
      :scale: 130%
      :align: center

      IPC schematic diagram
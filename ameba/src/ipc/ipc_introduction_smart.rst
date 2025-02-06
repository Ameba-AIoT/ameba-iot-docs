.. tab:: RTL8730E

   There are multi-CPUs named CA32 (AP), KM4 (NP) and KM0 integrated in SoC.
   The inter-processor communication (IPC) hardware is designed to make these CPUs communicate with each other.
   Also, a KM0 shared SRAM is used to transmit information to each other. The block diagram is shown below.

   .. figure:: figures/ipc_block_diagram.svg
      :scale: 120%
      :align: center

      IPC block diagram

   There are 6 directions for 3 cores to communicate with each other: KM0 ←→ NP, NP ←→ AP, KM0 ←→ AP. There are 8 channels for each direction. All the channels are processed independently. That means one core can send different information to another core through different channels at any time, the channels will not affect each other.

   Each channel has one transmit side and one receive side, the transmit side and the receive side of the same channel is a pair. For example, KM0 sends an IPC to NP through channel 7, the transmit side is KM0 channel 7, and receive side is NP channel 7, and information is sent from KM0 channel 7 to NP channel 7.

   .. figure:: figures/ipc_schematic_diagram.svg
      :scale: 130%
      :align: center

      IPC schematic diagram
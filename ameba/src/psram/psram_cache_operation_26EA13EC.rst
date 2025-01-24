.. tab:: RTL8726EA

   As the cache line of KM4/KR4 cache line is 32 bytes, DSP cache line is 128 bytes, and cache operations are all based on the cache line. So the buffer size and buffer starting address are recommended to be 32/128 bytes aligned to avoid synchronization issues.

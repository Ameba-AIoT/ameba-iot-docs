.. tab:: RTL8730E

   As the cache lines of NP/LP cache are 32 bytes, AP cache is 64 bytes, and cache operations are all based on the cache line. So the buffer size and buffer starting address are recommended to be 64 bytes aligned to avoid synchronization issues.

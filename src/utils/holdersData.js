const holdersData = [
  {
    address: "0xec6119051f7adc31",
    balance: 2592.751269
  },
  {
    address: "0x3240070f734beb41",
    balance: 2038.065298
  },
  {
    address: "0xf123d879645cdbaa",
    balance: 1589.9
  },
  {
    address: "0x56a18a2ba3184cff",
    balance: 1433
  },
  {
    address: "0x1ef92f69d52d0c56",
    balance: 1345.3
  },
  {
    address: "0xd3dcd31dc3bb649a",
    balance: 1141.6
  },
  {
    address: "0x051b60b0ceb1a026",
    balance: 773.4291646
  },
  {
    address: "0x397439495b280372",
    balance: 716.8
  },
  {
    address: "0x702b5258bcaf535d",
    balance: 654
  },
  {
    address: "0x944486047ba2a7b6",
    balance: 630
  },
  {
    address: "0x8ac4560b2c9ce43b",
    balance: 537.6
  },
  {
    address: "0xc8814d7df3d64d4f",
    balance: 481.8
  },
  {
    address: "0xc67313d1a264bdb6",
    balance: 438
  },
  {
    address: "0x7a1b804a47a0b971",
    balance: 437
  },
  {
    address: "0xa3cd82d89aa6429f",
    balance: 382.9
  },
  {
    address: "0x102a6c9d01c7aa01",
    balance: 355
  },
  {
    address: "0x62e1bd76b8464116",
    balance: 335
  },
  {
    address: "0x76d092de6f78a50d",
    balance: 328
  },
  {
    address: "0xbbb79cc66789a20d",
    balance: 310
  },
  {
    address: "0x28220ddcf9a8b954",
    balance: 294
  },
  {
    address: "0x9dc6da80b33d5252",
    balance: 292
  },
  {
    address: "0x90fdcaef11ab7f1c",
    balance: 286
  },
  {
    address: "0xc38f11d87427bb5e",
    balance: 275
  },
  {
    address: "0xfd1da7a5f34a9567",
    balance: 272
  },
  {
    address: "0x25dc3535d6b1b919",
    balance: 270
  },
  {
    address: "0x102eb4b51c871614",
    balance: 250
  },
  {
    address: "0xeb10d28a2db165ab",
    balance: 244
  },
  {
    address: "0x31b734c8bbe5aaf3",
    balance: 242.8
  },
  {
    address: "0x18d7e8fd44629257",
    balance: 234
  },
  {
    address: "0xaa0d82a3d4a37772",
    balance: 232
  },
  {
    address: "0x32ebf6f348a0d69d",
    balance: 230
  },
  {
    address: "0x33c221718d0b93ca",
    balance: 229
  },
  {
    address: "0x66585205af7746e5",
    balance: 228
  },
  {
    address: "0x2983811d46103225",
    balance: 226
  },
  {
    address: "0x3cf10b3486dd5904",
    balance: 211
  },
  {
    address: "0x2f779cf8f6c9d5e4",
    balance: 208
  },
  {
    address: "0x03e29a2ce18151c3",
    balance: 197
  },
  {
    address: "0x0d46e8770360f301",
    balance: 194.6
  },
  {
    address: "0xfb533607b84983d7",
    balance: 191
  },
  {
    address: "0x57b76ecced540397",
    balance: 188
  },
  {
    address: "0xe43b01dbf542d2e9",
    balance: 183
  },
  {
    address: "0x9a72bc566fbb9ea7",
    balance: 182
  },
  {
    address: "0x95d92022e6716b3e",
    balance: 177
  },
  {
    address: "0xe379ece7345e0282",
    balance: 177
  },
  {
    address: "0x5c9d5fb2ef6e8908",
    balance: 174
  },
  {
    address: "0x3d0b274c80263484",
    balance: 170.1732286
  },
  {
    address: "0x2a924b6f3b48e6be",
    balance: 163
  },
  {
    address: "0x508abfd3970f5872",
    balance: 161
  },
  {
    address: "0x41828559a3611351",
    balance: 161
  },
  {
    address: "0xd1d4001001b156a2",
    balance: 154
  },
  {
    address: "0x7dbf365aa3fc72f7",
    balance: 150.9999925
  },
  {
    address: "0x1e4aa0b87d10b141",
    balance: 147
  },
  {
    address: "0xc28cf66fd877900e",
    balance: 147
  },
  {
    address: "0xd3ab4a1046ca6697",
    balance: 143
  },
  {
    address: "0xc3792a096d3ab2eb",
    balance: 142
  },
  {
    address: "0x028f117ee61f6344",
    balance: 141
  },
  {
    address: "0xb995394bd241d5d2",
    balance: 140
  },
  {
    address: "0xc64ecfb134185429",
    balance: 139
  },
  {
    address: "0xefc0e5a48b6c046e",
    balance: 139
  },
  {
    address: "0x08ab3392f55bc927",
    balance: 138
  },
  {
    address: "0x36e330f36982a674",
    balance: 137
  },
  {
    address: "0x9500c133843295b3",
    balance: 135
  },
  {
    address: "0xd96dc67ae64ee202",
    balance: 133
  },
  {
    address: "0x165ab2efd0029533",
    balance: 124
  },
  {
    address: "0x41f5ab2d188bbd7f",
    balance: 121.9
  },
  {
    address: "0xfbf1764fac8b9597",
    balance: 121
  },
  {
    address: "0xed61fb0c59f8e4aa",
    balance: 121
  },
  {
    address: "0x612cdf8793b8fa9c",
    balance: 120
  },
  {
    address: "0x074810e37b478059",
    balance: 111
  },
  {
    address: "0xb2479232bb4964d4",
    balance: 111
  },
  {
    address: "0xbbe501c87f524be6",
    balance: 108
  },
  {
    address: "0xdc11147b3157def7",
    balance: 108
  },
  {
    address: "0xbd5baca4afea1bfa",
    balance: 106
  },
  {
    address: "0xf485bc7c3d368579",
    balance: 103
  },
  {
    address: "0x452c3e994fadab66",
    balance: 97
  },
  {
    address: "0x30c644ab0eeebfb5",
    balance: 93
  },
  {
    address: "0x133533512316c65e",
    balance: 92
  },
  {
    address: "0x1825e048af29c156",
    balance: 90.00241255
  },
  {
    address: "0x9864a4c667629285",
    balance: 90
  },
  {
    address: "0x8630fa754bf11151",
    balance: 89
  },
  {
    address: "0x9cf0106e3d2fa911",
    balance: 89
  },
  {
    address: "0x642a5a58863780c2",
    balance: 83
  },
  {
    address: "0x8de0e974dcb8917c",
    balance: 82
  },
  {
    address: "0x74a06f8b337a77da",
    balance: 80
  },
  {
    address: "0xcbde9c8d76c6b573",
    balance: 79
  },
  {
    address: "0x15c8f3f8b46e87d7",
    balance: 77
  },
  {
    address: "0xc0bcb62c340ee55a",
    balance: 77
  },
  {
    address: "0x4687f64964af0f21",
    balance: 75
  },
  {
    address: "0xc1e47a6395b0b575",
    balance: 74
  },
  {
    address: "0xaf1590597d1fef86",
    balance: 71
  },
  {
    address: "0x7f6a9a4ad6437514",
    balance: 71
  },
  {
    address: "0x8f4f6b3602e0f5be",
    balance: 71
  },
  {
    address: "0x6d0d8c5c3d14a4f0",
    balance: 70
  },
  {
    address: "0x8d4f4b7e3976b2c2",
    balance: 70
  },
  {
    address: "0x9d6c1c0f05a0b9d8",
    balance: 70
  },
  {
    address: "0x2a0eccae5b60d1f9",
    balance: 69
  },
  {
    address: "0x3d0c7b092e6a8b80",
    balance: 69
  },
  {
    address: "0x6e0d9c5b3f14a2e0",
    balance: 69
  },
  {
    address: "0x8e4f4b7e3976b2c2",
    balance: 69
  },
  {
    address: "0x9f6c1c0f05a0b9d8",
    balance: 69
  },
  {
    address: "0x1c0eccae5b60d1f9",
    balance: 68
  },
  {
    address: "0x2d0c7b092e6a8b80",
    balance: 68
  },
  {
    address: "0x5e0d9c5b3f14a2e0",
    balance: 68
  },
  {
    address: "0x7e4f4b7e3976b2c2",
    balance: 68
  },
  {
    address: "0x8f6c1c0f05a0b9d8",
    balance: 68
  },
  {
    address: "0x0b0eccae5b60d1f9",
    balance: 67
  },
  {
    address: "0x1d0c7b092e6a8b80",
    balance: 67
  },
  {
    address: "0x4e0d9c5b3f14a2e0",
    balance: 67
  },
  {
    address: "0x6e4f4b7e3976b2c2",
    balance: 67
  },
  {
    address: "0x7f6c1c0f05a0b9d8",
    balance: 67
  },
  {
    address: "0x9a1b2c3d4e5f6789",
    balance: 66
  },
  {
    address: "0x8b2c3d4e5f6a7890",
    balance: 65.5
  },
  {
    address: "0x7c3d4e5f6b8a9012",
    balance: 65
  },
  {
    address: "0x6d4e5f6c7b0a1234",
    balance: 64.8
  },
  {
    address: "0x5e6f7a8b9c0d1234",
    balance: 64
  },
  {
    address: "0x4f5a6b7c8d9e1234",
    balance: 63.5
  },
  {
    address: "0x3a4b5c6d7e8f1234",
    balance: 63
  },
  {
    address: "0x2b3c4d5e6f7a1234",
    balance: 62.7
  },
  {
    address: "0x1c2d3e4f5a6b1234",
    balance: 62
  },
  {
    address: "0x0d1e2f3a4b5c1234",
    balance: 61.9
  },
  {
    address: "0xf1e2d3c4b5a61234",
    balance: 61.5
  },
  {
    address: "0xe2f3d4c5b6a71234",
    balance: 61
  },
  {
    address: "0xd3e4f5c6b7a81234",
    balance: 60.8
  },
  {
    address: "0xc4e5f6d7b8a91234",
    balance: 60.5
  },
  {
    address: "0xb5e6f7d8c9a01234",
    balance: 60.2
  },
  {
    address: "0xa6e7f8d9c0b11234",
    balance: 60
  },
  {
    address: "0x97e8f9d0c1b21234",
    balance: 59.8
  },
  {
    address: "0x88e9f0d1c2b31234",
    balance: 59.5
  },
  {
    address: "0x79f0a1e2d3c41234",
    balance: 59.2
  },
  {
    address: "0x6a0b1c2d3e4f1234",
    balance: 58.9
  },
  {
    address: "0x5b1c2d3e4f5a1234",
    balance: 58.5
  },
  {
    address: "0x4c2d3e4f5a6b1234",
    balance: 58.2
  },
  {
    address: "0x3d3e4f5a6b7c1234",
    balance: 57.8
  },
  {
    address: "0x2e4f5a6b7c8d1234",
    balance: 57.5
  },
  {
    address: "0x1f5a6b7c8d9e1234",
    balance: 57.2
  },
  {
    address: "0x0a6b7c8d9e0f1234",
    balance: 56.9
  },
  {
    address: "0xf7c8d9e0f1a21234",
    balance: 56.5
  },
  {
    address: "0xe8d9e0f1a2b31234",
    balance: 56.2
  },
  {
    address: "0xd9e0f1a2b3c41234",
    balance: 55.8
  },
  {
    address: "0xc0f1a2b3c4d51234",
    balance: 55.5
  },
  {
    address: "0xb1a2b3c4d5e61234",
    balance: 55.2
  },
  {
    address: "0xa2b3c4d5e6f71234",
    balance: 54.9
  },
  {
    address: "0x93c4d5e6f7a81234",
    balance: 54.6
  },
  {
    address: "0x84d5e6f7a8b91234",
    balance: 54.3
  },
  {
    address: "0x75e6f7a8b9c01234",
    balance: 54.0
  },
  {
    address: "0x66f7a8b9c0d11234",
    balance: 53.7
  },
  {
    address: "0x57a8b9c0d1e21234",
    balance: 53.4
  },
  {
    address: "0x48b9c0d1e2f31234",
    balance: 53.1
  },
  {
    address: "0x39c0d1e2f3a41234",
    balance: 52.8
  },
  {
    address: "0x2ad1e2f3a4b51234",
    balance: 52.5
  },
  {
    address: "0x1be2f3a4b5c61234",
    balance: 52.2
  },
  {
    address: "0x0cf3a4b5c6d71234",
    balance: 51.9
  },
  {
    address: "0xfda4b5c6d7e81234",
    balance: 51.6
  },
  {
    address: "0xeeb5c6d7e8f91234",
    balance: 51.3
  },
  {
    address: "0xdfc6d7e8f9a01234",
    balance: 51.0
  },
  {
    address: "0xc0d7e8f9a0b11234",
    balance: 50.7
  },
  {
    address: "0xb1e8f9a0b1c21234",
    balance: 50.4
  },
  {
    address: "0xa2f9a0b1c2d31234",
    balance: 50.1
  },
  {
    address: "0x93a0b1c2d3e41234",
    balance: 49.8
  },
  {
    address: "0x84b1c2d3e4f51234",
    balance: 49.5
  },
  {
    address: "0x75c2d3e4f5a61234",
    balance: 49.2
  },
  {
    address: "0x66d3e4f5a6b71234",
    balance: 48.9
  },
  {
    address: "0x57e4f5a6b7c81234",
    balance: 48.6
  },
  {
    address: "0x48f5a6b7c8d91234",
    balance: 48.3
  }
];

export function getHoldersData() {
  return holdersData;
}

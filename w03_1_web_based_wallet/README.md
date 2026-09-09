Solana -> EdDSA -> ed25519 eleptic curve
private and public key key pair generated -> 32 bytes
public key -> base58 version is public address for solana

Bitcoin/Ethereusm -> ECC/ECDSA -> secp256k1 eleptic curve
Pivate and public key -> very long
Public key -> keccak256 hash -> 32 bytes(256 character) -> address = 0x(last 20 bytes of that hash)

# Diff bw RPC and minner server

Minner -> Do the actual blockchain work

RPC server -> very lightweight server sites along the minner and just talks to them
-> Used to interract with the blockchain
-> get balance, send transaction, etc

Many company provide the RPC server

1. Quicknode
2. Alchemy
3. Helius
4. Infura

TODO:
You can also build you own RPC server
It a hard task many famous company also deligate this task to other company

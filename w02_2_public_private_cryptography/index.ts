import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";

// Generate a mnemonic phrase
// mnemonic phrase -> Cryptographic seed phase -> Multiple private keys based on derivation path which is determistic
//
// Derivation path
// A derivation path is typically expressed in a format like m / purpose' / coin_type' / account' / change / address_index.
// m: Refers to the master node, or the root of the HD wallet.
// purpose: A constant that defines the purpose of the wallet(e.g., 44' for BIP44, which is a standard for HD wallets).[Version]
// coin_type: Indicates the type of cryptocurrency(e.g., 0' for Bitcoin, 60' for Ethereum, 501' for solana, 128' for Monero).
// account: Specifies the account number(e.g., 0' for the first account).
// change: This is either 0 or 1, where 0 typically represents external addresses(receiving addresses), and 1 represents internal addresses(change addresses).
// address_index: A sequential index to generate multiple addresses under the same account and change path.

enum MemonicType {
  character_12 = 128,
  character_24 = 256,
}

// const seedPhrase = generateMnemonic(MemonicType.character_12);
// const seedPhrase = "mechanic dwarf burden barrel ankle text enhance soft expect interest fly already"
// Monero
const seedPhrase = "punch anxiety crew cross october dismiss raw garbage type voyage effort during electric wild curve access"

console.log(seedPhrase);

const cryptographicSeed = mnemonicToSeedSync(seedPhrase);

console.log(cryptographicSeed);

for (let i = 0; i < 10; i++) {
  const path = `m/44'/0'/${i}'/0'`;
  // Monero cake wallet derivation path
  // Not working, WHY??
  // const path = `m/44'/128'/${i}'/0'`;
  console.log(path);
  const derivePathSeed = derivePath(path, cryptographicSeed.toString("hex"));
  console.log(derivePathSeed);

  const secret = nacl.sign.keyPair.fromSeed(derivePathSeed.key).secretKey;
  const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();

  console.log("Private key:");
  console.log(secret);
  console.log("Public key:");
  console.log(publicKey);
}



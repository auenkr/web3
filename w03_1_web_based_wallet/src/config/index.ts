type CryptoWallet = {
  name: string;
  derivationPath: string; // `m/44'/<crypto_index>'/<account_number>'/0'>`
  encodingType: "base58" | "base64";
};

export const TestingData = {
  mnemonicPhase:
    "over movie fantasy detail tackle squirrel grid bracket vital cricket social toy",
};

export const Cryptos: CryptoWallet[] = [
  {
    // Bitcoin uses BIP32
    name: "Bitcoin",
    derivationPath: "m/44'/0'/0'/0'",
    encodingType: "base64",
  },
  {
    // Solana uses ed25519-hd-key
    name: "Solana",
    derivationPath: "m/44'/501'/0'/0'",
    encodingType: "base58",
  },
  {
    // Ethereum uses BIP32
    name: "Ethereum",
    derivationPath: "m/44'/60'/0'/0'",
    encodingType: "base64",
  },
  // {
  //   name: "Monero",
  //   derivationPath: "m/44'/128'/0'/0'",
  // },
  {
    name: "Robinhood Coin",
    derivationPath: "m/44'/223'/0'/0'",
    encodingType: "base64",
  },
  {
    name: "Base", // Same as Ethereum
    derivationPath: "m/44'/60'/0'/0'",
    encodingType: "base64",
  },
  {
    name: "Sui",
    derivationPath: "m/44'/784'/0'/0'",
    encodingType: "base64",
  },
  {
    name: "Polygon", // Same as Ethereum
    derivationPath: "m/44'/60'/0'/0'",
    encodingType: "base64",
  },
  {
    name: "HyperEVM", // Same as Ethereum
    derivationPath: "m/44'/60'/0'/0'",
    encodingType: "base64",
  },
];

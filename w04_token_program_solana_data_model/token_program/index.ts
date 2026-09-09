import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, type AccountInfo, type TransactionConfirmationStrategy } from "@solana/web3.js";
import bs58 from "bs58";

const PRIVATE_KEY = "4TuiTgVBJUjEBvtyJcoQ4wncYhW2xMMqE8ePK5aqb8b2urpYZwscWJyukGELNMz2GVyWrk8LnczVeCvQBVxVHimV"
const PUBLIC_KEY = "AgcC9gfZnmsZAhVxj36RQmrdK7Cy9EY9eikKgHMjmSij";

const DECIMAL = 9;

const connection = new Connection(clusterApiUrl("devnet"));

async function airdrop(publicKey: string, amount: Number) {
  const publicAddr = new PublicKey(publicKey);
  const tokenAmount = Number(amount) * LAMPORTS_PER_SOL;
  const signature = await connection.requestAirdrop(publicAddr, tokenAmount)
  await connection.confirmTransaction(signature);
}

async function getBalance(publicKey: string) {
  const publicAddr = new PublicKey(publicKey);
  const balance = await connection.getBalance(publicAddr);
  return balance / LAMPORTS_PER_SOL;
}

async function createNewToken() {
  const mintOwnerPublicAddr = new PublicKey(PUBLIC_KEY);
  const secretKey = bs58.decode(PRIVATE_KEY);
  const payerPrivateKey = Keypair.fromSecretKey(secretKey);
  const mint = await createMint(
    connection,
    payerPrivateKey,
    mintOwnerPublicAddr,
    null,
    DECIMAL)
  return mint;
}

async function getAccountInfo(publicAddr: string) {
  const publicKey = new PublicKey(publicAddr);
  const accountInfo = await connection.getAccountInfo(publicKey);
  return accountInfo;
}

async function createAccount(mintAddr: string, ownerPublicKey: string) {
  const mintPublicAddr = new PublicKey(mintAddr);
  const ownerPublicAddr = new PublicKey(ownerPublicKey);
  const payerSecretKey = bs58.decode(PRIVATE_KEY);
  const payerPrivateKey = Keypair.fromSecretKey(payerSecretKey);

  const associatedAccount = await getOrCreateAssociatedTokenAccount(connection, payerPrivateKey, mintPublicAddr, ownerPublicAddr);
  return associatedAccount;
}

async function MintNewToken(mint: string, to: string, amount: number) {
  const mintPublicAddr = new PublicKey(mint);
  const toPublicAddr = new PublicKey(to);

  const payerSecretKey = Keypair.fromSecretKey(bs58.decode(PRIVATE_KEY));
  const mintAuthrityKey = new PublicKey(PUBLIC_KEY)

  amount = amount * 10 ** DECIMAL;

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payerSecretKey,
    mintPublicAddr,
    toPublicAddr,
  )

  console.log("ASSOCIATED_ACCOUNT:", tokenAccount.address.toBase58());

  const result = await mintTo(
    connection,
    payerSecretKey,
    mintPublicAddr,
    tokenAccount.address,
    mintAuthrityKey,
    amount,
  )
  return result;
}


async function main() {
  console.log("PUBLIC_KEY:", PUBLIC_KEY);
  // Heavly rate limited
  // await airdrop(PUBLIC_KEY, 10.11);

  let accountInfo: AccountInfo;
  let balance: number;
  balance = await getBalance(PUBLIC_KEY);
  console.log("Balance:", balance);
  // accountInfo = await getAccountInfo(PUBLIC_KEY);
  // console.log("Account:", accountInfo.a);


  // const mint = await createNewToken();
  // console.log("MINT:", mint.toBase58());
  // balance = await getBalance(PUBLIC_KEY);
  // console.log("Balance:", balance);
  // const mintAddr = mint.toBase58();
  const mintAddr = "FHwFBuzUpoFHM1cZrweHYZEmgYMnZTxwuTtPniMZr6dk"
  accountInfo = await getAccountInfo(mintAddr);
  console.log("MINT_ACCOUNT:", accountInfo);


  // Create an associated token account
  const account = await createAccount(mintAddr, PUBLIC_KEY);
  console.log("ASSOCIATED_ACCOUNT:", account.address.toBase58());

  balance = await getBalance(PUBLIC_KEY);
  console.log("Balance:", balance);

  const result = await MintNewToken(mintAddr, PUBLIC_KEY, 1000);
  console.log("Minted:", result);
}

main()
  .then(() => console.log("done"))
  .catch((error) => console.error("Error occur while executing main", error));

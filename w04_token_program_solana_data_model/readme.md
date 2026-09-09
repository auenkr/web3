# Solana

To run local blockchain

solana-test-validator

# Creating a new token in solana vs Ethereum

Token -> use existing blockchain and creating a new crpto currency like things(USDC, DADDY, MOMMY, etc) called token.

Ethereum -> Create a seperate smart contract of that token on ethereum blockchain.
Soon they realise it is a very common use case so they create a template for that ERC20 smart contract template.

Solana -> Since solana came after ethereum, they already know this is a very common use case.
Option1:
So they create a program(smart contract) on solana blockchain for that solana token program.
Who ever want to create a new token on solana blockchain, they just call this token program and get a derived account[called Token Mint account] which is used as token account.
This derived account have access to create new token or mint new token.

This account just store the information: mint owner, freeze authority, decimals(min value you can send to someone similar to LAMPORTS), current supply.
Generally take 82 bytes

Option2: You can also redeploy as token program. Advance

We can use the cli: spl-token

example:

```bash
➜ web3 spl-token create-token
Creating token ASekzovJP5Vs73WWdAFcXR9oB3VoH7cGm3ZdrncPTHYu under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

Address:  ASekzovJP5Vs73WWdAFcXR9oB3VoH7cGm3ZdrncPTHYu
Decimals:  9

Signature: 2SDfRJVWwSWqLUTxqZfj92dArBo1zSBJWSVAQyZbnKZC1mgkuZbYDnkfzq8p4UCdfiWw4BCgfeE7woghNuSCyUCf

➜  web3 solana address
AgcC9gfZnmsZAhVxj36RQmrdK7Cy9EY9eikKgHMjmSij
➜  web3 spl-token create-token --decimals 2
Creating token Goc3n5TPKrpvYs3Dg65xSs3pdxoxxdQNTWuiFFCL83Go under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

Address:  Goc3n5TPKrpvYs3Dg65xSs3pdxoxxdQNTWuiFFCL83Go
Decimals:  2

Signature: 3avneWoijt86spx87GFXVQdpg74tX4Hu6hEW7PEjDM5zoPNijsAvPtwrxQ232QkFjxqWNcc9dYhML5CnbPT1e96x

➜  web3 spl-token create-token --decimals 0
Creating token D6LvWNczHq6BTrx7j1f7KAVARzrZKJd6WTr9NbBLGtvA under program TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA

Address:  D6LvWNczHq6BTrx7j1f7KAVARzrZKJd6WTr9NbBLGtvA
Decimals:  0

Signature: 4PdhFDK9XNNEC61mFkyK8v5QVPhm9RTjyUqXm2A9K7mUZSRMgYpbsv1mjMiT67G4WWukqKdKGsfMv9o46pB6rCY4
```

If i make decimal to 0 and create a supply only of 1 -> This is called NFT(Non fungible token)
Only single owner is there.

We can also make mint account to null to limit the supply.

Token Program -> Create a Mint account(token meta data stored) -> Associate token account(link which account have how much token)

1. Token Program -> Creating bank guidance(RBI) | TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
2. Mint Account
-> Creating a bank for a seperate currency
-> `spl-token create-token` => ASekzovJP5Vs73WWdAFcXR9oB3VoH7cGm3ZdrncPTHYu
3. Associate Token Account
-> It's like opening a bank account
-> We store the leadger for that currency
-> require some fees, and its refund when account is closed
-> `spl-token create-account ASekzovJP5Vs73WWdAFcXR9oB3VoH7cGm3ZdrncPTHYu` => public address vBG1yei6q1RUbCtaHNSAMFC3GmVPHj6qxmGL3iHJxJz
-> Default Associate token account to public address saved in config
-> create an account with currency type and for user X.
4. Minting an account
-> `spl-token mint <Mint_Account> 10` -> default goes to public address stored in config => AgcC9gfZnmsZAhVxj36RQmrdK7Cy9EY9eikKgHMjmSij

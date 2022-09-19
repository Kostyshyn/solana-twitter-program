import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { TwitterApp } from '../target/types/twitter_app';
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction } from '@solana/web3.js';
import { before } from 'mocha';
import { expect } from 'chai';

const AIRDROP_SOL_AMOUNT = 2;
const TWEET_LEN = 1384;

export const getAirdrop = async (
  connection: Connection,
  publicKey: PublicKey,
  amount = 1
) => {
  const signature = await connection.requestAirdrop(
    publicKey,
    LAMPORTS_PER_SOL * amount
  );
  await connection.confirmTransaction(signature);
};

describe('twitter-app', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TwitterApp as Program<TwitterApp>;
  const anchorProvider = program.provider as anchor.AnchorProvider;
  const systemProgram = anchor.web3.SystemProgram.programId;
  const wallet = anchorProvider.wallet;
  const primaryAuthor = Keypair.generate();
  const secondaryAuthor = Keypair.generate();

  before(async () => {
    await Promise.all([
      await getAirdrop(anchorProvider.connection, primaryAuthor.publicKey, AIRDROP_SOL_AMOUNT),
      await getAirdrop(anchorProvider.connection, secondaryAuthor.publicKey, AIRDROP_SOL_AMOUNT)
    ]);
  });

  it('Is initialized!', async () => {
    const tweet = Keypair.generate();

    const tweetAccountMaxRent = await anchorProvider.connection.getMinimumBalanceForRentExemption(TWEET_LEN);

    await program.methods
      .sendTweet('Hello world!', 'test')
      .accounts({
        tweet: tweet.publicKey,
        author: primaryAuthor.publicKey,
        systemProgram
      })
      .signers([tweet, primaryAuthor])
      .rpc();

    const authorBalance = await anchorProvider.connection.getAccountInfo(
      primaryAuthor.publicKey
    );

    const tweetAccount = await program.account.tweet.fetch(tweet.publicKey);

    console.log(tweetAccount.author.toBase58());

    expect(
      authorBalance.lamports + tweetAccountMaxRent
    ).to.equal(
      AIRDROP_SOL_AMOUNT * LAMPORTS_PER_SOL
    );
  });
});

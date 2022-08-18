import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { TwitterApp } from '../target/types/twitter_app';
import { Keypair } from '@solana/web3.js';

describe('twitter-app', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TwitterApp as Program<TwitterApp>;
  const anchorProvider = program.provider as anchor.AnchorProvider;
  const systemProgram = anchor.web3.SystemProgram.programId;
  const wallet = anchorProvider.wallet;

  it('Is initialized!', async () => {
    const tweet = Keypair.generate();

    await program.methods
      .sendTweet('Hello world!', 'test')
      .accounts({
        tweet: tweet.publicKey,
        author: wallet.publicKey,
        systemProgram
      })
      .signers([tweet])
      .rpc();
  });
});

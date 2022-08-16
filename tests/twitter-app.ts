import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { TwitterApp } from '../target/types/twitter_app';

describe('twitter-app', () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TwitterApp as Program<TwitterApp>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.methods.sendTweet().rpc();
    console.log('Your transaction signature', tx);
  });
});

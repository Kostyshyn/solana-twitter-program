use anchor_lang::prelude::*;

use crate::state::*;

#[derive(Accounts)]
pub struct SendTweet<'info> {
    #[account(init, payer = author, space = Tweet::LEN)]
    pub tweet: Account<'info, Tweet>,
    #[account(mut)]
    pub author: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(
    ctx: Context<SendTweet>,
    content: String,
    topic: String
) -> Result<()> {
    let tweet: &mut Account<Tweet> = &mut ctx.accounts.tweet;
    
    // tweet.content = content;
    // tweet.topic = topic;
    // tweet.likes = 0;
    Ok(())
}

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

pub fn handler(_ctx: Context<SendTweet>) -> Result<()> {
    Ok(())
}

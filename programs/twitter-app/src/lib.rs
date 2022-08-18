use anchor_lang::prelude::*;
use instructions::*;

declare_id!("HDz4EuZFyrZ1WDXht5NSm2S9N2MhPj1dCzAA5zjk5kfk");

mod instructions;
mod state;
mod constants;

#[program]
pub mod twitter_app {
    use super::*;

    pub fn send_tweet(
        ctx: Context<SendTweet>,
        content: String,
        topic: String
    ) -> Result<()> {
        instructions::send_tweet::handler(ctx, content, topic)
    }
}

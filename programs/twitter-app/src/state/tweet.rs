use anchor_lang::prelude::*;
use crate::constants::*;

#[account]
pub struct Tweet {
    pub author: Pubkey,
    pub timestamp: i64,
    pub topic: String,
    pub content: String,
    pub likes: i64
}

const MAX_TOPIC_LENGTH: usize = 50 * MAX_CHAR_LENGTH; // 50 chars max.
const MAX_CONTENT_LENGTH: usize = 280 * MAX_CHAR_LENGTH; // 280 chars max.

impl Tweet {
    pub const LEN: usize = DISCRIMINATOR_LENGTH
        + PUBLIC_KEY_LENGTH // Author.
        + MAX_INT_LENGTH // Timestamp.
        + VEC_PREFIX_LENGTH + MAX_TOPIC_LENGTH // Topic.
        + VEC_PREFIX_LENGTH + MAX_CONTENT_LENGTH // Content.
        + MAX_INT_LENGTH; // Likes count
}

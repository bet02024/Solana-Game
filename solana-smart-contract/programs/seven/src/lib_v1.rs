use anchor_lang::prelude::*;
use num_derive::*;
use rand_chacha::rand_core::SeedableRng;
use rand_core::RngCore;
use rand_chacha; // 0.3.0

declare_id!("28MENXAPtRQmZLXmjBEsbVQv6wf1g7KP4KgMHJS5GHuc");

#[program]
pub mod seventy {
    use super::*;
    use anchor_lang::solana_program::{program::invoke, system_instruction::transfer};
    // use anchor_lang::AccountsClose;

    pub fn setup(ctx: Context<Setup>, player: Pubkey, bet_amount: u64, player_choice: u64, vendor_seed: i64) -> Result<()> {
        let seventy = &mut ctx.accounts.seventy;

        msg!("setup 1");

        seventy.players = [ctx.accounts.vendor.key(), player];
        seventy.vendor_seed = vendor_seed;
        seventy.bump = *ctx.bumps.get("seventy").unwrap();
        seventy.bet_amount = bet_amount;
        seventy.player_choice = player_choice;
        msg!("setup 2");

        let total_bet = if seventy.player_choice == 0 {
            seventy.bet_amount * 60
        } else if seventy.player_choice == 1 {
            seventy.bet_amount * 24
        } else if seventy.player_choice == 2 {
            seventy.bet_amount * 24
        } else if seventy.player_choice == 3 { //UnderSeventy50
            seventy.bet_amount * 20
        } else if seventy.player_choice == 4 { //OverSeventy50
            seventy.bet_amount * 20
        } else if seventy.player_choice == 5 { // JackPot2
            seventy.bet_amount * 350
        } else if seventy.player_choice == 6 { //JackPot12
            seventy.bet_amount * 350
        } else if seventy.player_choice == 7 { //JackPot3
            seventy.bet_amount * 170
        } else {  //JackPot11
            seventy.bet_amount * 170
        };

        msg!("setup 3");

        if **ctx.accounts.vendor.to_account_info().try_borrow_lamports()? < (total_bet/10) - seventy.bet_amount {
            return err!(SeventyError::InsuficientRewardBalance);
            //return Err(SeventyError::InsuficientRewardBalance.into());
        }
        msg!("setup 4");

        invoke(
            &transfer(
                ctx.accounts.vendor.to_account_info().key,
                seventy.to_account_info().key,
                (total_bet/10) - seventy.bet_amount,
            ),
            &[
                ctx.accounts.vendor.to_account_info(),
                seventy.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        msg!("setup 5");

        Ok(())
    }


    pub fn play(ctx: Context<Play>, player_seed: i64) -> Result<()> {
        let seventy = &mut ctx.accounts.seventy;
        let player_seed = player_seed;
        let vendor = &mut ctx.accounts.vendor;

        let player_side = if seventy.player_choice == 0 {
                Side::Seventy
        } else if seventy.player_choice == 1 {
            Side::UnderSeventy
        } else if seventy.player_choice == 2 {
            Side::OverSeventy
        } else if seventy.player_choice == 3 {
            Side::UnderSeventy50
        } else if seventy.player_choice == 4 {
            Side::OverSeventy50
        } else if seventy.player_choice == 5 {
            Side::JackPot2
        } else if seventy.player_choice == 6 {
            Side::JackPot12
        } else if seventy.player_choice == 7 {
            Side::JackPot3
        } else  { //8
            Side::JackPot11
        };



        let total_bet = if seventy.player_choice == 0 {
            seventy.bet_amount * 60
        } else if seventy.player_choice == 1 {
            seventy.bet_amount * 24
        } else if seventy.player_choice == 2 {
            seventy.bet_amount * 24
        } else if seventy.player_choice == 3 { //UnderSeventy50
            seventy.bet_amount * 20
        } else if seventy.player_choice == 4 { //OverSeventy50
            seventy.bet_amount * 20
        } else if seventy.player_choice == 5 { // JackPot2
            seventy.bet_amount * 350
        } else if seventy.player_choice == 6 { //JackPot12
            seventy.bet_amount * 350
        } else if seventy.player_choice == 7 { //JackPot3
            seventy.bet_amount * 170
        } else {  //JackPot11
            seventy.bet_amount * 170
        };

        msg!("transfering 1 to [{}] from [{}]", ctx.accounts.player.to_account_info().key, seventy.to_account_info().key);


        invoke(
            &transfer(
                ctx.accounts.player.to_account_info().key,
                seventy.to_account_info().key, //seventy.to_account_info().key
                seventy.bet_amount,
            ),
            &[
                ctx.accounts.player.to_account_info(),
                seventy.to_account_info(), //seventy.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        msg!("transfering 2 to [{}] from [{}]", vendor.to_account_info().key, seventy.to_account_info().key);
        //msg!("transfering to [{}] from [{}]", ctx.accounts.player.to_account_info().key, ctx.accounts.vendor.to_account_info().key);
        let winner = seventy.play(player_seed, player_side);
        if winner != *vendor.key {
            msg!("Congratulations, You won!");
            **seventy.to_account_info().try_borrow_mut_lamports()? -= total_bet/10;
            **ctx.accounts.player.to_account_info().try_borrow_mut_lamports()? += total_bet/10;
        } else {
            msg!("You lost!");
            //let total = **seventy.to_account_info().try_borrow_lamports()?;
            **seventy.to_account_info().try_borrow_mut_lamports()? -= total_bet/10;
            **vendor.try_borrow_mut_lamports()? += total_bet/10;
        }
        Ok(())
    }


    pub fn delete(_ctx: Context<Delete>, _player: Pubkey) -> Result<()> {
        let seventy = &mut _ctx.accounts.seventy;
        let amount = **seventy.to_account_info().try_borrow_mut_lamports()?;
        **seventy.to_account_info().try_borrow_mut_lamports()? -= amount;
        **_ctx.accounts.vendor.try_borrow_mut_lamports()? += amount;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(player: Pubkey, bet_amount: u64, player_choice: u64, vendor_seed: i64)]
pub struct Setup<'info> {
    #[account(
        init,
        payer = vendor,
        space = Seventy::LEN,
        seeds = [b"seventy", vendor.key().as_ref(), player.as_ref()], bump
    )]
    pub seventy: Account<'info, Seventy>,
    #[account(mut)]
    pub vendor: Signer<'info>,
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct Play<'info> {
    #[account(
        mut,
        seeds = [b"seventy", vendor.key().as_ref(), player.key().as_ref()], bump
    )]
    pub seventy: Account<'info, Seventy>,
    #[account(mut)]
    pub player: Signer<'info>,
    #[account(mut)]
    /// CHECK
    pub vendor : AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}


#[derive(Accounts)]
#[instruction(player: Pubkey)]
pub struct Delete<'info> {
    #[account(
        mut,
        close = vendor,
        seeds = [b"seventy", vendor.key().as_ref(), player.as_ref()], bump
    )]
    pub seventy: Account<'info, Seventy>,
    #[account(mut)]
    pub vendor: Signer<'info>,
    pub system_program: Program<'info, System>,
}


#[account]
#[derive(Default)]
pub struct Seventy {
    players: [Pubkey; 2],
    vendor_seed: i64,
    state: SeventyState,
    bet_amount: u64,
    player_choice: u64,
    bump: u8
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum SeventyState {
    Active,
    Finished { winner: Pubkey, dice1: u8, dice2: u8},
}

impl Default for SeventyState {
    fn default() -> Self {
        Self::Active
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, FromPrimitive, ToPrimitive, Copy, Clone, PartialEq, Eq)]
pub enum Side {
    Seventy,
    UnderSeventy,
    OverSeventy,
    UnderSeventy50,
    OverSeventy50,
    JackPot2,
    JackPot12,
    JackPot3,
    JackPot11
}


impl Seventy {
    const LEN: usize = 64 + 8 + 33 + 8 + 8 + 8 + 10;

    fn flip_side(&self, player_side: Side, sum: u64) -> bool {

        let result : bool = if player_side == Side::Seventy && sum == 7 {
            true
        } else if player_side == Side::Seventy && sum != 7 {
            false
        } else if player_side == Side::UnderSeventy && sum < 7 {
            true
        } else if player_side == Side::UnderSeventy && sum >= 7 {
            false
        } else if player_side == Side::OverSeventy && sum > 7 {
            true
        } else if player_side == Side::OverSeventy && sum <= 7 {
            false
        } else if player_side == Side::UnderSeventy50 && sum < 7 {
            true
        } else if player_side == Side::UnderSeventy50 && sum >= 7 {
            false
        } else if player_side == Side::OverSeventy50 && sum > 7 {
            true
        } else if player_side == Side::OverSeventy50 && sum <= 7 {
            false
        } else if player_side == Side::JackPot2 && sum == 2 {
            true
        } else if player_side == Side::JackPot2 && sum != 2 {
            false
        } else if player_side == Side::JackPot12 && sum == 12 {
            true
        } else if player_side == Side::JackPot12 && sum != 12 {
            false
        } else if player_side == Side::JackPot3 && sum == 3 {
            true
        } else if player_side == Side::JackPot3 && sum != 3 {
            false
        } else if player_side == Side::JackPot11 && sum == 11 {
            true
        } else if player_side == Side::JackPot11 && sum != 11 {
            false
        } else {
            false
        };

        return result;
    }


    pub fn play(&mut self, player_seed: i64, player_side: Side) -> Pubkey {

        let c: Clock = Clock::get().unwrap();
        let mut gen = rand_chacha::ChaCha8Rng::seed_from_u64((self.vendor_seed + player_seed + (c.unix_timestamp as i64)) as u64 );
        let dice1 = gen.next_u64()%6 + 1;
        let dice2 = gen.next_u64()%6 + 1;
        let sum = dice1 + dice2;

        let flip_result : bool = self.flip_side(player_side, sum );

        if flip_result == true {
            self.state = SeventyState::Finished {
                winner: self.players[1],
                dice1: dice1 as u8,
                dice2: dice2 as u8
            };
            self.players[1]
        } else {
            self.state = SeventyState::Finished {
                winner: self.players[0],
                dice1: dice1 as u8,
                dice2: dice2 as u8
            };
            self.players[0]
        }
    }
}


#[error_code]
pub enum SeventyError {
    #[msg("Insuficient rewards balance, try with an smaller amount.")]
    InsuficientRewardBalance,
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as anchor from "@project-serum/anchor";
import * as idl from "../../seventy.json";
import { Connection, PublicKey } from "@solana/web3.js";
import { ProgramError } from '@project-serum/anchor';

const programId = new PublicKey(idl.metadata.address);

import { clusterApiUrl } from "@solana/web3.js";

import { collection, addDoc, disableNetwork } from 'firebase/firestore';
import { db, firebaseApp } from '../../components/firebase';
import moment from 'moment'
import { getSolanaUrl } from "../../config/config";

type Data = {
  error: boolean | null;
  result: any | null;
  code: number | null,
  tx: string | null,
  description: string | null
};

const preflightCommitment = "confirmed";
const commitment = "confirmed";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  console.log("#1");
  let { playerPublicKey, amount, amountJack, betOption, betOptionJack } = JSON.parse(req.body);
  let playerPublicKey2 = new PublicKey(playerPublicKey);
  const secretKeyArray = Uint8Array.from([]);
  console.log("#2");
  const vendor = anchor.web3.Keypair.fromSecretKey(secretKeyArray);
  const vendorWallet = new anchor.Wallet(vendor);
  const connection = new Connection(
    getSolanaUrl(), //https://api.mainnet-beta.solana.com",
    commitment
  );
  const provider = new anchor.Provider(connection, vendorWallet, {
    preflightCommitment,
    commitment,
  });
  console.log("#3");
  const program = new anchor.Program(idl as any, programId, provider);
  const randomSeed = new anchor.BN(Math.floor(Math.random() * 100000 ));
  console.log("#4");
  const [coinFlipPDA, _] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("luckybastard"),
      playerPublicKey2.toBuffer(),
      vendor.publicKey.toBuffer(),
    ],
    program.programId
  );
  console.log("#5");

  let playTx = null;
  try {
       playTx = await program.rpc.play(randomSeed, {
        accounts: {
          vendor: vendor.publicKey,
          player: playerPublicKey2,
          seventy: coinFlipPDA,
          vault: "",
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [vendor],
      });
      const latestBlockHash = await connection.getLatestBlockhash();

      console.log("#6 tx", playTx);
      //await new Promise((resolve) => setTimeout(resolve, 500));
      await provider.connection.confirmTransaction({
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: playTx,
      });
      console.log("#7 played ", playTx);
      let resData = await program.account.seventy.fetch(coinFlipPDA);
      let winAmount = 0;
      if (!resData.state.finished || !resData.state.finished.winner){
        console.log("#8 resData", resData.state);
        await provider.connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature: playTx,
        });
        await new Promise((resolve) => setTimeout(resolve, 800));
        resData = await program.account.seventy.fetch(coinFlipPDA);
      }
      if (!resData.state.finished || !resData.state.finished.winner){
        res.status(200).json({
          error: true,
          result: null,
          code: 600,
          tx: playTx,
          description: "Tx is not confirmed yet, try again later",
        });
      } else {
        console.log("#9 resData", resData.state);
        if (resData.state.finished.winner.toString() === playerPublicKey){
          if (betOption == 0){
            winAmount = parseFloat(amount) * 6;
          } else if (betOption == 1){
            winAmount = parseFloat(amount) * 2.4;
          } else if (betOption == 2){
            winAmount = parseFloat(amount) * 2.4;
          } else if (betOption == 3){
            winAmount = parseFloat(amount) * 2;
          } else {
            winAmount = parseFloat(amount) * 2;
          }
        }
        if (resData.state.finished.winnerJack.toString() === playerPublicKey){
          if (betOptionJack < 3 && betOption > 2){
            winAmount += parseFloat(amountJack) * 30;
          } else if (betOptionJack < 3 && betOption < 3){
            winAmount += parseFloat(amountJack) * 36;
          } else if (betOptionJack > 2 && betOption > 2){
            winAmount += parseFloat(amountJack) * 15;
          } else if (betOptionJack > 2 && betOption < 3){
            winAmount += parseFloat(amountJack) * 18;
          } else {
            winAmount += parseFloat(amountJack) * 18;
          }
        }
        resData.state.finished.amountWon = winAmount;
        console.log("#10");
        res.status(200).json({
          error: false,
          result: resData.state,
          code: 600,
          tx: playTx,
          description: null
        });
      }
      try {
        var utcMoment = moment.utc();
        const date = new Date(utcMoment.format('YYYY-MM-DD HH:mm:ss'))
        await addDoc(collection(db, "usersRolls"), {
          date: date,
          wallet: playerPublicKey,
          mainnet: true,
        });
        console.log("#### saved");
        disableNetwork(db);
        return;
      } catch (e) {}

  } catch (error) {
    console.log("@@", error);
    console.log("error", (error as ProgramError).msg);
    res.status(200).json({
      error:  true,
      description: (error as ProgramError).msg,
      result: null,
      code: 600,
      tx: playTx
    });
    return;
  }
  return;
}

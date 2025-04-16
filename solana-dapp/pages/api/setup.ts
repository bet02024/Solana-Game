// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as anchor from "@project-serum/anchor";
import * as idl from "../../seventy.json";
import { Connection, PublicKey } from "@solana/web3.js";
import { ProgramError } from '@project-serum/anchor';

//const programId = "jpPgS1rgmshnvMt4uCPThbRDXfGiAperPb7aoW1q2gk";
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

const preflightCommitment = "processed";
const commitment = "processed";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  console.log("#1");
  let { playerPublicKey, playTx, amount, amountJack, betOption, betOptionJack } = JSON.parse(req.body);
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
  try {
      let resData = await program.account.seventy.fetch(coinFlipPDA);
      let winAmount = 0;
      console.log("resData.state 1", resData.state);
      if (resData.state && resData.state.active){
        res.status(200).json({
          error: false,
          result: resData.state,
          code: 0,
          tx: playTx,
          description: null
        });
        return;
      }
      res.status(200).json({
        error: true,
        result: null,
        code: 404,
        description: "Tx is not confirmed yet, try again later",
        tx: playTx
      });
      return;
  } catch (error) {
    console.log("@@", error);
    console.log("error", (error as ProgramError).msg);
    res.status(200).json({
      error:  true,
      description: (error as ProgramError).msg,
      result: null,
      code: 500,
      tx: playTx
    });
    return;
  }
  return;
}

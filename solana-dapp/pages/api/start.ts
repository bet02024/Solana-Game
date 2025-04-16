import type { NextApiRequest, NextApiResponse } from "next";
import * as anchor from "@project-serum/anchor";
import * as idl from "../../seventy.json";
import { Connection, PublicKey } from "@solana/web3.js";
import { ProgramError } from '@project-serum/anchor';

const programId = new PublicKey(idl.metadata.address);

import { clusterApiUrl } from "@solana/web3.js";
import { getSolanaUrl } from "../../config/config";

type Data = {
  userRandomSeed: number;
  sevenPDA: string;
  vsigner: string;
  vendorAccountPDA: string;
};

const preflightCommitment = "confirmed";
const commitment = "confirmed";
const secretKeyArray = Uint8Array.from([]);
const vendor = anchor.web3.Keypair.fromSecretKey(secretKeyArray);
const vendorWallet = new anchor.Wallet(vendor);


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("#1");
  let { playerPublicKey } = JSON.parse(req.body);
  console.log("## playerPublicKey ...", playerPublicKey);

  playerPublicKey = new PublicKey(playerPublicKey);
  //console.log(req.body);
  const connection = new Connection(
    getSolanaUrl(),
    commitment
  );
  const provider = new anchor.Provider(connection, vendorWallet, {
    preflightCommitment,
    commitment,
  });
  console.log("#2");
  const program = new anchor.Program(idl as any, programId, provider);
  const randomSeed =Math.floor(Math.random()*10000 + 122);
  const [coinFlipPDA, _] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      anchor.utils.bytes.utf8.encode("luckybastard"),
      playerPublicKey.toBuffer(),
      vendor.publicKey.toBuffer(),
    ],
    program.programId
  );
  console.log("#3");
  console.log("## PDA", program.programId.toString(), coinFlipPDA.toString());
  try {
    console.log("Delete Account xxxx", coinFlipPDA.toString());
  } catch (error) {
    console.log("## ERROR ##");
    console.log(error);
    console.log("acoount does not exists");
  }
  console.log("#4");
  res.status(200).json({
    userRandomSeed: randomSeed,
    sevenPDA: coinFlipPDA.toString(),
    vsigner: "",
    vendorAccountPDA: vendor.publicKey.toString(),
  });
}

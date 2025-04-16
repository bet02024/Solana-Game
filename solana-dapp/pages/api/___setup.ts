// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as anchor from "@project-serum/anchor";
import * as idl from "../../seventy.json";
import { Connection, PublicKey } from "@solana/web3.js";
import { ProgramError } from '@project-serum/anchor';

const programId = "jpPgS1rgmshnvMt4uCPThbRDXfGiAperPb7aoW1q2gk";
import { clusterApiUrl } from "@solana/web3.js";
import { getSolanaUrl } from "../../config/config";

type Data = {
  error: string | null;
  sevenPDA: string;
  vendor: string;
};

const preflightCommitment = "processed";
const commitment = "processed";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let { playerPublicKey, amount, side } = JSON.parse(req.body);

  playerPublicKey = new PublicKey(playerPublicKey);
  amount = new anchor.BN(amount);
  side = new anchor.BN(side);

  console.log(req.body);
  //const secretKeyArray = Uint8Array.from(JSON.parse(VENDOR_SECRET_KEY));
 
  const secretKeyArray = Uint8Array.from([64,135,217,159,139,129,100,131,96,130,166,112,189,142,98,56,213,56,147,194,151,115,78,60,185,152,82,231,158,231,39,207,25,236,229,134,79,24,59,71,252,135,174,19,204,101,232,195,150,19,208,74,29,185,219,1,47,166,188,16,225,67,62,198]);
  //const secretKeyArray = Uint8Array.from([162,121,80,190,113,137,188,155,252,210,22,32,240,177,120,147,128,195,129,39,221,96,198,62,62,80,96,195,18,115,241,199,16,189,160,152,159,59,56,157,143,48,88,58,94,179,214,215,121,12,231,149,182,136,122,83,7,232,163,112,10,161,115,163]);

  //console.log(secretKeyArray);

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


  const program = new anchor.Program(idl as any, programId, provider);

  const randomSeed = new anchor.BN(Math.floor(Math.random() * 100000 ));

  const [coinFlipPDA, _] = await anchor.web3.PublicKey.findProgramAddress(
    [
      anchor.utils.bytes.utf8.encode("seventy"),
      vendor.publicKey.toBuffer(),
      playerPublicKey.toBuffer(),
    ],
    program.programId
  );

  try {
    // delete if account exists
    //await program.account.seven.fetch(coinFlipPDA); // should error out if account does not exists
    console.log("xxxx");
    const deleteTx = await program.rpc.delete(playerPublicKey, {
      accounts: {
        seventy: coinFlipPDA,
        vendor: vendor.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [vendor],
    });
    await provider.connection.confirmTransaction(deleteTx);
  } catch (error) {
    console.log("acoount does not exists, continue");
  }



  try {
      const setupTx = await program.rpc.setup(playerPublicKey, amount, side, randomSeed, {
        accounts: {
          seventy: coinFlipPDA,
          vendor: vendor.publicKey,
          systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [vendor],
      });
      console.log("# ",setupTx);
      await provider.connection.confirmTransaction(setupTx);
  } catch (error) {
    console.log("error", (error as ProgramError).msg);
    res.status(500).json({
      error: (error as ProgramError).msg,
      sevenPDA: coinFlipPDA.toString(),
      vendor: vendor.publicKey.toString(),
    });
    return;
  }

  res.status(200).json({
    error: null,
    sevenPDA: coinFlipPDA.toString(),
    vendor: vendor.publicKey.toString(),
  });
}

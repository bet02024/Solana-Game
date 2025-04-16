import { useEffect, useState } from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import idl from "../seventy.json";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";

const programID = new PublicKey(idl.metadata.address);
const preflightCommitment = "confirmed";
const commitment = "confirmed";

export const useProgram = () => {
  const [program, setProgram] = useState<anchor.Program<anchor.Idl>>();
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [provider, setProvider] = useState<anchor.Provider>();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    updateProgram();
    const fetchData = async () => {
      if (wallet){
        const _balance = await connection.getBalance(wallet.publicKey);
        setBalance(_balance);
      }
    }
    fetchData();
  }, [connection, wallet]);

  const updateProgram = () => {
    if (wallet) {

      const provider = new anchor.Provider(connection, wallet, {
        preflightCommitment,
        commitment,
      });
      setProvider(provider);

      const program = new anchor.Program(idl as any, programID, provider);

      console.log("@@@@",programID.toString());
      setProgram(program);
    } else {
      setProgram(undefined);
    }
  };

  return {
    program,
    wallet,
    connection,
    provider,
    balance,
  };
};

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { AppProps } from "next/app";
import { FC, useMemo } from "react";

// Use require instead of import since order matters
require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const App: FC<AppProps> = ({ Component, pageProps }) => {
  // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
  console.log('environment',process.env.NEXT_PUBLIC_ENVIRONMENT)
  const network = process.env.NEXT_PUBLIC_ENVIRONMENT === 'Mainnet' ? WalletAdapterNetwork.Mainnet : WalletAdapterNetwork.Devnet;
  //const network = WalletAdapterNetwork.Mainnet;
  //const network = "https://solana-mainnet.g.alchemy.com/v2/oWB8nY_l7PCnInHvxoVie_gIh_TYUDi4";
  // You can also provide a custom RPC endpoint
  const endpoint = process.env.NEXT_PUBLIC_ENVIRONMENT === 'Mainnet'
   ? 'https://summer-fragrant-dawn.solana-mainnet.discover.quiknode.pro/f009ae03d1c667d31574609ef207521ba8781f69/'
   : 'https://solana-devnet.g.alchemy.com/v2/1V4KfHUQMtm7VR5Jq-D60Z77szFmxve9';
  //const endpoint = "https://solana-mainnet.g.alchemy.com/v2/oWB8nY_l7PCnInHvxoVie_gIh_TYUDi4";

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;

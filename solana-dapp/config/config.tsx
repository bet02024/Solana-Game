export const isJackpotOpen = (): boolean => {
  return true
}

export const showJackpotPercentage = (): { show: boolean, percentaje: number } => {
  return {
    show: true,
    percentaje: 33
  }
}

export const getSolanaUrl = (): string => {
  return process.env.NEXT_PUBLIC_ENVIRONMENT === 'Mainnet'
    ? 'https://summer-fragrant-dawn.solana-mainnet.discover.quiknode.pro/f009ae03d1c667d31574609ef207521ba8781f69/'
    : 'https://solana-devnet.g.alchemy.com/v2/1V4KfHUQMtm7VR5Jq-D60Z77szFmxve9'
}

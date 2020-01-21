import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { PortisConnector } from '@web3-react/portis-connector'

// Use custom connector until PR #61 is merged into web3-react
import { AuthereumConnector } from './Authereum'
// import { AuthereumConnector } from '@web3-react/authereum-connector'

import { NetworkConnector } from './Network'
import { FortmaticConnector } from './Fortmatic'

const POLLING_INTERVAL = 10000

export const network = new NetworkConnector({
  urls: { 1: process.env.REACT_APP_NETWORK_URL },
  pollingInterval: POLLING_INTERVAL
})

export const injected = new InjectedConnector({
  supportedChainIds: [1]
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: process.env.REACT_APP_NETWORK_URL },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: false,
  pollingInterval: POLLING_INTERVAL
})

export const fortmatic = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC_KEY,
  chainId: 42
})

export const portis = new PortisConnector({
  dAppId: process.env.REACT_APP_PORTIS_ID,
  networks: [42]
})

export const walletlink = new WalletLinkConnector({
  url: process.env.REACT_APP_NETWORK_URL,
  appName: 'Uniswap',
  appLogoUrl:
    'https://mpng.pngfly.com/20181202/bex/kisspng-emoji-domain-unicorn-pin-badges-sticker-unicorn-tumblr-emoji-unicorn-iphoneemoji-5c046729264a77.5671679315437924251569.jpg'
})

export const authereum = new AuthereumConnector({
  chainId: 42
})

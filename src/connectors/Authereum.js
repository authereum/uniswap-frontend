import { AbstractConnector } from '@web3-react/abstract-connector'
import Authereum from 'authereum'

const chainIdToNetwork = {
  42: 'kovan'
}

export class AuthereumConnector extends AbstractConnector {
  constructor({ chainId }) {
    super({ supportedChainIds: [chainId] })

    this.chainId = chainId
  }

  async activate() {
    if (!this.authereum) {
      const networkName = chainIdToNetwork[this.chainId]
      this.authereum = new Authereum({
        networkName,
        rpcUri: `https://${networkName || 'mainnet'}.infura.io/v3/ee2b4b709d034d9fa013191d78ce86ff`
      })
    }

    await this.authereum
      .getProvider()
      .enable()
      .then(accounts => accounts[0])

    return { provider: this.authereum.getProvider() }
  }

  async getProvider() {
    return this.authereum.getProvider()
  }

  async getChainId() {
    return this.authereum.getNetworkId()
  }

  async getAccount() {
    return this.authereum.getAccountAddress()
  }

  deactivate() {}

  async close() {
    this.authereum.logout()
    this.emitDeactivate()
  }
}
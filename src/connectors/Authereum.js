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
        rpcUri: `https://eth-mainnet.alchemyapi.io/v2/veG5_3xy6GDLbyim1YfwQ8NdG3y5RPfY`
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

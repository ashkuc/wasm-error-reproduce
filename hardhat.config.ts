import {HardhatUserConfig} from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@nomicfoundation/hardhat-ethers'
import {config as dotenvConfig} from 'dotenv'
import {HttpNetworkUserConfig} from 'hardhat/types'

dotenvConfig()

const accounts = [process.env.PRIVATE_KEY!]

export const uniqsu: HttpNetworkUserConfig = {
  url: 'https://rpc.unq.uniq.su',
  chainId: 8882,
  accounts,
}

export const opal: HttpNetworkUserConfig = {
  url: 'https://rpc-opal.unique.network',
  chainId: 8882,
  accounts,
}

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {},
    opal, uniqsu,
  },
}

export default config

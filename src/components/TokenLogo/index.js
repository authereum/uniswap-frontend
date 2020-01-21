import React, { useState } from 'react'
import styled from 'styled-components'
import { isAddress } from '../../utils'

import { ReactComponent as EthereumLogo } from '../../assets/images/ethereum-logo.svg'

import BAT from '../../assets/images/tokens/BAT.png'
import CVC from '../../assets/images/tokens/CVC.png'
import GNT from '../../assets/images/tokens/GNT.png'
import OMG from '../../assets/images/tokens/OMG.png'
import REP from '../../assets/images/tokens/REP.png'
import DAI from '../../assets/images/tokens/DAI.png'
import SAI from '../../assets/images/tokens/SAI.png'
import MKR from '../../assets/images/tokens/MKR.png'

const TOKEN_ICON_API = address =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
    address
  )}/logo.png`
const BAD_IMAGES = {}

// TODO: find real icons
const kovanIcons = {
  '0xac94ea989f6955c67200dd67f0101e1865a560ea': MKR,
  '0xf8720eb6ad4a530cccb696043a0d10831e2ff60e': CVC,
  '0x4bb57bc8485ec4c4112aa25da4e746f373ad540e': GNT,
  // '0x3fa9fcd9456991fe1220d1bb77a5863695c01c05': OMG,
  // '0x4c7493b70f16bec1e087bf74a31d095f9b8f9c40': REP,
  '0x7d669A64deb8a4A51eEa755bb0E19FD39CE25Ae9': DAI,
  // '0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa': DAI,
  '0x02f96ef85cad6639500ca1cc8356f0b5ca5bf1d2': BAT
}

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 1rem;
`

const Emoji = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

const StyledEthereumLogo = styled(EthereumLogo)`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function TokenLogo({ address, size = '1rem', ...rest }) {
  const [error, setError] = useState(false)
  let path = ''
  if (address === 'ETH') {
    return <StyledEthereumLogo size={size} />
  } else if (!error && !BAD_IMAGES[address]) {
    path = kovanIcons[address]
  } else {
    return (
      <Emoji {...rest} size={size}>
        <span role="img" aria-label="Thinking">
          {kovanIcons[address] || '🤔'}
        </span>
      </Emoji>
    )
  }
  return (
    <Image
      {...rest}
      alt={address}
      src={path}
      size={size}
      onError={() => {
        BAD_IMAGES[address] = true
        setError(true)
      }}
    />
  )
}

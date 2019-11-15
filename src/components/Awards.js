import React from 'react'
import styled from 'styled-components'
import Image from './Image'
import { breakpoints, vw } from '../style'

export const AwardWrapper = styled.div`
  width: 20vw;
  height: auto;
  padding: ${vw(20)};

  @media ${breakpoints.medium} {
    width: 15vw;
    padding: 15px;
  }

  @media ${breakpoints.large} {
    width: 10vw;
  }
`

export const AwardsGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-end;
  justify-content: flex-end;
`

export default function Awards({ ...props }) {
  return (
    <AwardsGrid>
      {props.items.map(item => (
        <AwardWrapper>
          {(() => {
            return (
              <Image
                sizes="(min-width: 768px) 15vw, 20vw"
                fluid={item.fluid}
                alt={item.caption}
              />
            )
          })()}
        </AwardWrapper>
      ))}
    </AwardsGrid>
  )
}

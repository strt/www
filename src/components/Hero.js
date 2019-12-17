import React from 'react'
import styled from 'styled-components'
import Section from './Section'
import { IconButton } from './Button'
import Icon from './Icon'
import { Grid, Column } from './Grid'

const StyledHero = styled(Section)(
  props =>
    !props.keepContentMargin && {
      [`${Column} > *:last-child`]: {
        marginBottom: 0,
      },
    },
)

export default function Hero({
  children,
  pt = 8,
  pb = [3, 7],
  md = 12,
  scrollButtonElement,
  keepContentMargin,
}) {
  return (
    <StyledHero pt={pt} pb={pb} keepContentMargin={keepContentMargin}>
      <Grid>
        <Column md={md}>{children}</Column>
      </Grid>
      {scrollButtonElement && (
        <Grid justifyContent="flex-end" mt={[4, 5, 5]}>
          <Column width="auto">
            <IconButton
              aria-label="Skrolla till nästa section"
              onClick={event => {
                event.preventDefault()
                const element =
                  typeof scrollButtonElement === 'string'
                    ? document.querySelector(scrollButtonElement)
                    : scrollButtonElement

                element.scrollIntoView({
                  block: 'start',
                  behavior: 'smooth',
                })
              }}
            >
              <Icon name={['fal', 'long-arrow-down']} />
            </IconButton>
          </Column>
        </Grid>
      )}
    </StyledHero>
  )
}

import React from 'react'
import Section from './Section'
import { IconButton } from './Button'
import Icon from './Icon'
import { Grid, Column } from './Grid'

export default function Hero({
  children,
  pt = 2,
  pb = [3, 3],
  scrollButtonElement,
}) {
  return (
    <Section pt={pt} pb={pb}>
      <Grid>
        <Column tablet="8">{children}</Column>
      </Grid>
      {scrollButtonElement && (
        <Grid justifyContent="flex-end" mt={[4, 5, 5]}>
          <Column width="auto">
            <IconButton
              aria-label="Skrolla till nästa section"
              onClick={(event) => {
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
    </Section>
  )
}

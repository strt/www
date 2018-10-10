import React from 'react'
import { Grid, Column } from './Grid'
import { Text } from './Text'

export default function Footer() {
  return (
    <footer>
      <Grid>
        <Column>
          <Text>
            Strateg Marknadsföring <br />
            Slöjdgatan 39 <br />
            703 83 Örebro
          </Text>
        </Column>
        <Column>
          <Text>
            <a href="mailto:">hej@strateg.se</a> <br />
            <a href="tel:">019-673 44 00</a>
          </Text>
        </Column>
        <Column>
          <Text>
            <a href="/">Instagram</a> <br />
            <a href="/">Facebook</a> <br />
            <a href="/">LinkedIn</a> <br />
            <a href="/">GitHub</a> <br />
          </Text>
        </Column>
      </Grid>
    </footer>
  )
}

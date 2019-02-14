import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { H1, H2, H3, Text } from './Text'
import Dialog, { DialogRow, DialogActions, DialogButton } from './Dialog'
import Icon from './Icon'
import Link from './Link'
import Div from './Div'
import TextField from './TextField'
import { useToggle, useMeasure } from '../utils/hooks'
import { routes } from '../routes'

const LinkButton = props => <Link as="button" {...props} />

export default function ContactArea() {
  const [on, toggle] = useToggle()
  const [bind, { height }] = useMeasure()

  return (
    <>
      <H1 as="h2" textColor="white">
        Kontakt är det bästa vi vet
      </H1>
      <H2 as={LinkButton} type="button" onClick={toggle} textColor="white">
        Vad vill du prata om?
      </H2>
      {on && (
        <Div
          {...bind}
          pt={[3, 5]}
          css={{
            display: 'flex',
            flexFlow: 'column',
            alignItems: 'flex-start',
          }}
        >
          <H3 as={LinkButton} type="button" onClick={null} textColor="white">
            Att jobba med Strateg
          </H3>
          <H3 as={LinkButton} type="button" onClick={null} textColor="white">
            Att jobba eller praktisera på Strateg
          </H3>
          <H3 as={LinkButton} type="button" onClick={null} textColor="white">
            Om något annat
          </H3>
        </Div>
      )}
      <Dialog isOpen={false} onDismiss={null}>
        <DialogRow>
          <H3 mb="0">Jag är intresserad av att jobba ihop</H3>
          <Text>
            Genom att skicka samtycker du till vår{' '}
            <a as={GatsbyLink} href={routes.policy.link}>
              policy
            </a>
          </Text>
          <TextField label="Namn" />
          <TextField label="Företag" />
          <TextField label="Din e-postadress" />
          <TextField label="Telefonnummer" />
          <TextField label="Berätta vad du vill ha hjälp med" />
        </DialogRow>
        <DialogActions>
          <DialogButton>
            <span>Skicka</span>
            <Icon name={['fal', 'long-arrow-right']} />
          </DialogButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

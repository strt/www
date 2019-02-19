import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { useSpring, animated } from 'react-spring'
import { H1, H2, H3, Text } from './Text'
import Dialog, { DialogRow, DialogActions, DialogButton } from './Dialog'
import Icon from './Icon'
import Link from './Link'
import Div from './Div'
import TextField from './TextField'
import { useToggle, useMeasure } from '../utils/hooks'
import { routes } from '../routes'

export default function ContactArea() {
  const [on, toggle] = useToggle()
  const [bind, { height }] = useMeasure()
  const props = useSpring({
    config: { tension: 320, friction: 32 },
    height: on ? height : 0,
    opacity: on ? 1 : 0,
  })

  return (
    <>
      <H1 as="h2" textColor="white">
        Kontakt är det bästa vi vet
      </H1>
      <H2 as="div" mb="0">
        <Link
          as="button"
          type="button"
          aria-expanded={on}
          onClick={toggle}
          colorVariant="white"
        >
          Vad vill du prata om?
        </Link>
      </H2>
      <animated.div
        style={{
          overflow: 'hidden',
          visibility: props.opacity.interpolate(o =>
            o === 0 && !on ? 'hidden' : 'visible',
          ),
          ...props,
        }}
      >
        <div {...bind}>
          <Div pt={[3, 5]}>
            <H3 as="div">
              <Link
                as="button"
                type="button"
                onClick={null}
                colorVariant="white"
              >
                Att jobba med Strateg
              </Link>
            </H3>
            <H3 as="div">
              <Link
                as="button"
                type="button"
                onClick={null}
                colorVariant="white"
              >
                Att jobba eller praktisera på Strateg
              </Link>
            </H3>
            <H3 as="div">
              <Link
                as="button"
                type="button"
                onClick={null}
                colorVariant="white"
              >
                Om något annat
              </Link>
            </H3>
          </Div>
        </div>
      </animated.div>

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

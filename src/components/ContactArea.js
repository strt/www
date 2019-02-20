import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { H1, H2, H3, Text } from './Text'
import Dialog, { DialogRow, DialogActions, DialogButton } from './Dialog'
import Icon from './Icon'
import Link from './Link'
import Div from './Div'
import TextField from './TextField'
import useToggle from '../lib/useToggle'
import useMeasure from '../lib/useMeasure'
import { routes } from '../routes'

function ContactOptionButton(props) {
  return (
    <H3 as="div">
      <Link as="button" type="button" colorVariant="white" {...props} />
    </H3>
  )
}

function ContactOptions() {
  const [activeForm, setActiveForm] = useState(null)

  console.log('render')

  function resetActiveForm() {
    setActiveForm(null)
  }

  return (
    <>
      <ContactOptionButton
        onClick={() => {
          setActiveForm('work')
        }}
      >
        Att jobba med Strateg
      </ContactOptionButton>
      <Dialog isOpen={activeForm === 'work'} onDismiss={resetActiveForm}>
        <DialogRow>
          <H3 mb="0">Kul att du vill jobba med oss</H3>
          <Text>
            Berätta kort om vad du vill ha hjälp med, så hörs vi snart.
          </Text>
          <Text>
            Genom att skicka samtycker du till vår{' '}
            <Link to={routes.policy.link}>policy</Link>.
          </Text>
          <TextField label="Namn" />
          <TextField label="Företag" />
          <TextField label="Din mejl" />
          <TextField label="Ditt telefonnummer" />
          <TextField label="Vad vill du ha hjälp med?" />
        </DialogRow>
        <DialogActions>
          <DialogButton>
            <span>Skicka</span>
            <Icon name={['fal', 'long-arrow-right']} />
          </DialogButton>
        </DialogActions>
      </Dialog>
      <ContactOptionButton
        onClick={() => {
          setActiveForm('career')
        }}
      >
        Att jobba eller praktisera på Strateg
      </ContactOptionButton>
      <Dialog isOpen={activeForm === 'career'} onDismiss={resetActiveForm}>
        <DialogRow>
          <H3 mb="0">Kul att du vill hänga med oss</H3>
          <Text>Berätta lite mer, så hörs vi snart.</Text>
          <TextField label="Namn" />
          <TextField label="Din mejl" />
          <TextField label="Ditt telefonnummer" />
          <TextField label="Vilken roll är du intresserad av?" />
          <TextField label="Ditt meddelande" />
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

export default function ContactArea() {
  const [on, toggle] = useToggle()
  const [bind, { height }] = useMeasure()
  const spring = useSpring({
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
          visibility: spring.opacity.interpolate(o =>
            o === 0 && !on ? 'hidden' : 'visible',
          ),
          ...spring,
        }}
      >
        <div {...bind}>
          <Div pt={[3, 5]}>
            <ContactOptions />
          </Div>
        </div>
      </animated.div>
    </>
  )
}

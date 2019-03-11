import React, { useState, useCallback } from 'react'
import { useSpring, animated } from 'react-spring'
import { H1, H2, H3 } from './Text'
import Link from './Link'
import Div from './Div'
import useToggle from '../lib/useToggle'
import useMeasure from '../lib/useMeasure'
import { ClientForm, CareerForm } from './Forms'

function ContactOptionButton(props) {
  return (
    <H3 as="div">
      <Link as="button" type="button" colorVariant="white" {...props} />
    </H3>
  )
}

function ContactForms() {
  const [activeForm, setActiveForm] = useState(null)
  const resetActiveForm = useCallback(() => {
    setActiveForm(null)
  }, [setActiveForm])

  return (
    <>
      <ContactOptionButton
        onClick={() => {
          setActiveForm('work')
        }}
      >
        Att jobba med Strateg
      </ContactOptionButton>
      <ClientForm isOpen={activeForm === 'work'} onDismiss={resetActiveForm} />
      <ContactOptionButton
        onClick={() => {
          setActiveForm('career')
        }}
      >
        Att jobba eller praktisera på Strateg
      </ContactOptionButton>
      <CareerForm
        isOpen={activeForm === 'career'}
        onDismiss={resetActiveForm}
      />
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
            <ContactForms />
          </Div>
        </div>
      </animated.div>
    </>
  )
}

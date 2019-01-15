import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring/hooks'
import styled from 'styled-components'
import Cookie from 'js-cookie'
import Link from './Link'
import { Grid, Column } from './Grid'
import { Text } from './Text'
import { colors, vw, breakpoints, fluidRange } from '../style'

const CookieToastWrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
`

const Toast = styled.div`
  padding: ${fluidRange({ min: 24, max: 32 })} 0;
  margin-right: ${fluidRange({ min: -16, max: -24 })};
  margin-left: ${fluidRange({ min: -16, max: -24 })};
  background-color: ${colors.dark};

  @media ${breakpoints.medium} {
    padding: ${vw(32)} 0;
    margin-right: 0;
    margin-left: 0;
  }
`

const AnimatedCookieToastWrapper = animated(CookieToastWrapper)

export default function CookieToast() {
  const [showToast, setShowToast] = useState(false)
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!showToast && !Cookie.get('accept_cookies')) {
        setShowToast(true)
      }
    }, 1000)

    return () => {
      clearTimeout(timerId)
    }
  }, [])
  const transitions = useTransition({
    items: showToast,
    from: { opacity: 0, transform: 'translateY(100%)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(100%)' },
  })

  return transitions.map(
    ({ item: show, props, key }) =>
      show && (
        <AnimatedCookieToastWrapper native key={key} style={props}>
          <Grid>
            <Column>
              <Toast>
                <Grid
                  flexWrap="nowrap"
                  alignItems={['flex-end', 'flex-end', 'center']}
                >
                  <Column>
                    <Text textColor="white" m="0">
                      Vi tycker att kakor gör livet lite bättre, även på webben.
                      Genom att surfa vidare godkänner du att vi använder
                      cookies.
                    </Text>
                  </Column>
                  <Column width="auto">
                    <Link
                      as="button"
                      type="button"
                      textColor="white"
                      onClick={() => {
                        setShowToast(false)
                        Cookie.set('accept_cookies', true)
                      }}
                    >
                      OK
                    </Link>
                  </Column>
                </Grid>
              </Toast>
            </Column>
          </Grid>
        </AnimatedCookieToastWrapper>
      ),
  )
}

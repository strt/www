import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import styled from 'styled-components'
import Cookie from 'js-cookie'
import Link from './Link'
import { Grid, Column } from './Grid'
import { Text } from './Text'
import { colors, vw, breakpoints, fluidRange } from '../style'
import { routes } from '../routes'
import { getActiveLangPath } from './SelectLanguage'

const CookieToastWrapper = animated(styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  backface-visibility: hidden;
`)

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

export default function CookieToast() {
  const [showToast, setShowToast] = useState(false)
  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!showToast && !Cookie.get('accept_cookies')) {
        setShowToast(true)
      }
    }, 500)

    return () => {
      clearTimeout(timerId)
    }
  }, [showToast])
  const transitions = useTransition(showToast, null, {
    unique: true,
    from: { opacity: 0, transform: 'translateY(100%)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(100%)' },
  })

  return transitions.map(
    ({ item: show, props, key }) =>
      show && (
        <CookieToastWrapper key={key} style={props}>
          <Grid>
            <Column>
              <Toast>
                <Grid
                  flexWrap="nowrap"
                  alignItems={['flex-end', 'flex-end', 'center']}
                >
                  <Column>
                    <Text textColor={colors.light} m="0">
                      {getActiveLangPath()
                        ? 'Vi använder oss av kakor. Mums. '
                        : 'This website uses cookies. Yum. '}
                      <Link
                        to={`${getActiveLangPath()}/${routes.policy.link}`}
                        textColor={colors.light}
                        styleVariant="dark"
                      >
                        {getActiveLangPath() ? 'Läs mer' : 'Read more'}
                      </Link>
                      .
                    </Text>
                  </Column>
                  <Column width="auto">
                    <Link
                      as="button"
                      type="button"
                      textColor={colors.light}
                      styleVariant="dark"
                      variant="large"
                      onClick={() => {
                        setShowToast(false)
                        Cookie.set('accept_cookies', true, { expires: 365 })
                      }}
                    >
                      {getActiveLangPath() ? 'OK' : 'OK'}
                    </Link>
                  </Column>
                </Grid>
              </Toast>
            </Column>
          </Grid>
        </CookieToastWrapper>
      ),
  )
}

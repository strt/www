import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import styled from 'styled-components'
import Cookie from 'js-cookie'
import { Grid, Column } from './Grid'
import { TextSmall, H4 } from './Text'
import { colors, breakpoints } from '../style'
import { isDefaultLanguage } from './SelectLanguage'
import Button from './Button'

const CookieToastWrapper = animated(styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 3;
  backface-visibility: hidden;
`)

const Toast = styled.div`
  max-width: 480px;
  padding: 1rem 0;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background-color: ${colors.grey100};

  h4 {
    font-size: 1.125rem;
  }

  p {
    margin-top: 0.8rem;
    margin-bottom: 2.5rem;
    font-size: 1rem;
  }

  .cookie-button {
    padding: 0.8rem 0.8rem 0.9rem;
    width: 100%;
    font-size: 1rem;
    cursor: pointer;

    @media ${breakpoints.small} {
      width: initial;
    }

    &--dark {
      border: 1px solid ${colors.darkText};
    }

    &--light {
      margin-top: 0.7rem;
      border: 1px solid ${colors.darkText};
      color: ${colors.darkText};
      background-color: ${colors.light};

      @media ${breakpoints.small} {
        margin-top: 0;
        margin-left: 0.5rem;
      }
    }
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
                    <H4 textColor={colors.darkText} m="0">
                      {isDefaultLanguage()
                        ? 'Den här webbplatsen använder cookies. Mums. '
                        : 'This website uses cookies. Yum. '}
                      {/* <Link
                        to={`${getActiveLangPath()}/${routes.policy.link}`}
                        textColor={colors.darkText}
                        styleVariant="dark"
                      >
                        {isDefaultLanguage() ? 'Läs mer' : 'Read more'}
                      </Link>
                      . */}
                    </H4>
                    <TextSmall>
                      {isDefaultLanguage()
                        ? 'Vi använder nödvändiga cookies för att vår webbplats ska fungera och analytiska cookies för trafikmätning som hjälper oss att förbättra upplevelsen.'
                        : 'We use necessary cookies for our website to function and analytical cookies for measuring traffic which helps us with optimization of our content.'}
                    </TextSmall>
                    <Button
                      as="button"
                      type="button"
                      className="cookie-button cookie-button--dark"
                      textColor={colors.darkText}
                      onClick={() => {
                        setShowToast(false)
                        Cookie.set('accept_cookies', true, { expires: 365 })
                      }}
                    >
                      {isDefaultLanguage()
                        ? 'Acceptera cookies '
                        : 'Accept cookies '}
                    </Button>
                    <Button
                      as="button"
                      type="button"
                      className="cookie-button cookie-button--light"
                      textColor={colors.darktext}
                      onClick={() => {
                        setShowToast(false)
                        Cookie.set('accept_cookies', true, { expires: 365 })
                      }}
                    >
                      {isDefaultLanguage() ? 'Inställningar' : 'Settings'}
                    </Button>
                  </Column>
                </Grid>
              </Toast>
            </Column>
          </Grid>
        </CookieToastWrapper>
      ),
  )
}

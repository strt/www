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
    font-size: 1rem;
  }

  .cookie-button {
    padding: 0.8rem 0.8rem 0.9rem;
    margin-top: 1.5rem;
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
      border: 1px solid ${colors.darkText};
      color: ${colors.darkText};
      background-color: ${colors.light};

      @media ${breakpoints.small} {
        margin-left: 0.5rem;
      }
    }
  }
`

const Settings = styled.div`
  h4 {
    margin-bottom: 2rem;
  }

  p {
    margin-bottom: 1.25em;
    margin-left: 2.4rem;
    line-height: 1.4;
  }

  span {
    margin-left: 1rem;
    font-size: 1.125rem;
  }
`

export default function CookieToast() {
  const [showToast, setShowToast] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [checkbox, setCheckbox] = useState(true)

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


  console.log(checkbox)

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
                {
                  showSettings === false ?
                    <Grid
                      flexWrap="nowrap"
                      alignItems={['flex-end', 'flex-end', 'center']}
                    >
                      <Column>
                        <H4 textColor={colors.darkText} m="0">
                          {isDefaultLanguage()
                            ? 'Den här webbplatsen använder cookies. Mums. '
                            : 'This website uses cookies. Yum. '}
                        </H4>
                        <TextSmall>
                          {isDefaultLanguage()
                            ? 'Vi använder nödvändiga cookies för att vår webbplats ska fungera och analytiska cookies för trafikmätning som hjälper oss att förbättra upplevelsen. '
                            : 'We use necessary cookies for our website to function and analytical cookies for measuring traffic which helps us with optimization of our content. '}
                        </TextSmall>
                        <Button
                          as="button"
                          type="button"
                          className="cookie-button cookie-button--dark"
                          textColor={colors.darkText}
                          onClick={() => {
                            setShowToast(false)
                            Cookie.set('accept_cookies', true, { expires: 365 })
                            if (checkbox === false) {
                              Cookie.set('deny_analytics', true, { expires: 365 })
                            }
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
                            setShowSettings(true);
                          }}
                        >
                          {isDefaultLanguage() ? 'Inställningar' : 'Settings'}
                        </Button>
                      </Column>
                    </Grid>
                    : ''
                }

                {
                  showSettings === true ?
                    <Settings>
                      <Grid
                        flexWrap="nowrap"
                        alignItems={['flex-end', 'flex-end', 'center']}
                      >
                        <Column>
                          <H4 textColor={colors.darkText} m="0">
                            {isDefaultLanguage()
                              ? 'Cookie-inställningar '
                              : 'Cookie settings'}
                          </H4>


                          <form>
                            <label className='checkbox__wrapper'>
                              <input
                                type='checkbox'
                                className='checkbox__input'
                                disabled={true}
                                checked={true}
                              />
                              <span className='checkbox'>
                                Nödvändiga (alltid på)
                                </span>
                            </label>
                            <p>Dessa cookies behövs för att grundläggande funktioner på webbplatsen
                            ska fungera och behöver alltid vara aktiverade. Utan dem kan webbplatsen och våra
                                tjänster sluta fungera.</p>

                            <label className='checkbox__wrapper'>
                              <input
                                name="analytic"
                                type='checkbox'
                                className='checkbox__input'
                                checked={checkbox}
                                value={checkbox}
                                onChange={(e) => setCheckbox(e.currentTarget.checked)}
                              />
                              <span className='checkbox'>
                                Analytiska
                                </span>
                            </label>
                            <p>Analytiska cookies används av webbanalystjänster (tredjepart) för trafikmätning och
                            hjälper oss att utvärdera webbplatsens utformning och innehåll. Informationen används i
                                syfte att förbättra upplevelsen för användaren.</p>
                          </form>


                          <Button
                            as="button"
                            type="button"
                            className="cookie-button cookie-button--dark"
                            textColor={colors.darkText}
                            onClick={() => {
                              setShowSettings(false);
                            }}
                          >
                            {isDefaultLanguage()
                              ? 'Spara och fortsätt '
                              : 'Save and continue '}
                          </Button>
                        </Column>
                      </Grid>
                    </Settings>
                    : ''
                }

              </Toast>
            </Column>
          </Grid>
        </CookieToastWrapper>
      ),
  )
}

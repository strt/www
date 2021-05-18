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
  p {
    margin-left: 2.5rem;
    line-height: 1.4;
  }

  span {
    margin-left: 1rem;
    font-size: 1.125rem;
  }

  .checkbox {
  position: absolute;
  opacity: 0;

  &__title {
    font-size: 1.125rem;
  }

  &__wrapper {
    margin-top: 2rem;
  }

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  & + label p {
    display: inline-block;
  }

  & + label::before {
    content: '';
    display: inline-block;
    margin-right: 0.3rem;
    vertical-align: sub;
    width: 20px;
    height: 20px;
    border: 2px solid ${colors.dark};
    border-radius: 2px;
  }

  &:checked + label::after {
    content: '';
    position: absolute;
    left: 5px;
    top: 9px;
    width: 2px;
    height: 2px;
    background: black;
    box-shadow:
      2px 0 0 black,
      4px 0 0 black,
      4px -2px 0 black,
      4px -4px 0 black,
      4px -6px 0 black,
      4px -8px 0 black;
    transform: rotate(45deg);
  }

  &:disabled + label::before {
    background-color: ${colors.grey500};
    border: 2px solid ${colors.grey500};
  }

  &:disabled + label::after {
    background: white;
    box-shadow:
      2px 0 0 white,
      4px 0 0 white,
      4px -2px 0 white,
      4px -4px 0 white,
      4px -6px 0 white,
      4px -8px 0 white;
  }
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
                            Cookie.set('accept_analytics', !!checkbox, { expires: 365 })
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
                              ? 'Cookie-inställningar'
                              : 'Cookie settings'}
                          </H4>
                          <form>
                            <div className='checkbox__wrapper'>
                              <input
                                type="checkbox"
                                className="checkbox"
                                disabled={true}
                                checked={true}
                                id="checkbox-1"
                              />
                              <label htmlFor="checkbox-1">
                                <span className='checkbox__title'>
                                  {isDefaultLanguage()
                                    ? 'Nödvändiga (alltid på)'
                                    : 'Necessary (always active)'}
                                </span>
                                {isDefaultLanguage()
                                  ? <p>Dessa cookies behövs för att grundläggande funktioner på webbplatsen
                                  ska fungera och behöver alltid vara aktiverade. Utan dem kan webbplatsen och våra
                            tjänster sluta fungera.</p>
                                  : <p>These strictly required cookies are essential for this site to work properly and needs always to be activated. Without them, the site and our service might function incorrectly.</p>}
                              </label>
                            </div>
                            <div className='checkbox__wrapper'>
                              <input
                                name="analytic"
                                type="checkbox"
                                className="checkbox"
                                checked={checkbox}
                                value={checkbox}
                                onChange={(e) => setCheckbox(e.currentTarget.checked)}
                                id="checkbox-2"
                              />
                              <label htmlFor="checkbox-2">
                                <span className="checkbox__title">
                                  {isDefaultLanguage()
                                    ? 'Analytiska'
                                    : 'Analytical'}
                                </span><br />
                                {isDefaultLanguage()
                                  ? <p>Analytiska cookies används av webbanalystjänster (tredjepart) för trafikmätning och
                                  hjälper oss att utvärdera webbplatsens utformning och innehåll. Informationen används i
                                  syfte att förbättra upplevelsen för användaren.</p>
                                  : <p>Analytical cookies are used by third party web services to measure visitors traffic and helps us to evaluate the website's design and content. The collected data is used for the purpose to improve the user experience.</p>}
                              </label>
                            </div>
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

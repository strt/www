import React, { useContext, useState, useRef } from 'react'
import { graphql } from 'gatsby'
import axios from 'axios'
import styled, { keyframes } from 'styled-components'
import { ThemeContext } from '../context/ThemeContext'
import Layout from '../components/Layout'
import { Grid, Column } from '../components/Grid'
import { H1, H2, Excerpt, Text } from '../components/Text'
import { BtnReset } from '../components/Button'
import LogoIcon from '../components/LogoIcon'
import {
  colors,
  durations,
  easings,
  breakpoints,
  fluidRange,
  breakpointNr,
  visuallyhidden,
} from '../style'
import Link from '../components/Link'
import useFormin from '../lib/useFormin'

const Button = styled(BtnReset)`
  padding: 0.7rem 1.6rem 0.8rem;
  font-size: 1.2em;
  font-weight: 500;
  background-color: #ebebeb;
  transition-property: background-color, color;
  transition-duration: ${durations.fast};
  transition-timing-function: ${easings.easeInQuad};

  @media ${breakpoints.large} {
    font-size: ${fluidRange({
      min: 22,
      max: 30,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
  }

  &:focus:hover,
  &:hover {
    color: ${colors.light};
    background-color: ${colors.dark};
  }

  &:focus {
    color: ${colors.light};
    background-color: ${colors.purple};
  }
`

const CheckboxWrapper = styled.label`
  position: relative;
  display: block;
`

const InputCheckbox = styled.input`
  ${visuallyhidden()}
`

const Check = styled.span`
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border: 0.0625rem solid #707070;
  border-radius: 0.125rem;

  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    margin-top: -0.1rem;
    border-width: 0 0 0.1rem 0.1rem;
    border-style: solid;
    border-color: transparent;
    content: '';
    transform: translateX(-50%) translateY(-50%) rotate(-45deg);
    transition: height ${durations.fast} ${easings.easeInQuad},
      border-color ${durations.fast},
      width ${durations.fast} ${easings.easeInQuad} ${durations.fast};
  }

  ${InputCheckbox}:checked ~ &::after {
    width: 1rem;
    height: 0.5rem;
    border-color: ${colors.dark};
  }
`

const CheckBoxLabel = styled.span`
  display: block;
  padding-left: 2.625rem;
  font-size: 0.875em;
  line-height: 1.4;

  @media ${breakpoints.large} {
    font-size: ${fluidRange({
      min: 14,
      max: 18,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
  }
`

const InputWrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  display: block;
  width: 100%;
  padding-bottom: 0.5rem;
  border: none;
  border-bottom: 0.125rem solid #b9b9b9;
  font-size: 1.2em;
  transition: border-color ${durations.fast} ${easings.easeInOutQuad};
  appearance: none;

  @media ${breakpoints.large} {
    font-size: ${fluidRange({
      min: 22,
      max: 30,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
  }

  &:hover {
    border-color: ${colors.dark};
  }

  &:focus {
    border-color: ${colors.purple};
    outline: none;
  }

  &::placeholder {
    font-weight: 500;
  }
`

const StyledErrors = styled.div`
  padding-left: 1rem;
  border-left: 0.2rem solid red;
`

const StyledErrorsList = styled.ul`
  font-size: 1.2em;
  line-height: 1.4;

  @media ${breakpoints.large} {
    font-size: ${fluidRange({
      min: 22,
      max: 30,
      viewportMin: breakpointNr.large,
      viewportMax: breakpointNr.xlarge,
    })};
  }
`

const rotateZ = keyframes`
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(360deg);
  }
`

const LoadingIcon = styled(LogoIcon)`
  display: inline-block;
  height: ${75 / 7.68}vw;
  max-height: 75px;
  padding-bottom: 0;
  animation: ${rotateZ} 0.8s linear infinite;

  svg {
    color: ${colors.dark};
  }
`

const FormField = ({ name, label, type = 'text', ...props }) => (
  <InputWrapper>
    <Input
      id={`cf-${name}`}
      name={name}
      type={type}
      {...props}
      placeholder={label}
    />
  </InputWrapper>
)

export default function Hubspot({ data }) {
  const { title, excerpt } = data.hubspotPage.nodes[0]
  const {
    submitLabel,
    title: legend,
    gdprText,
    gdprLink,
    gdprLinkLabel,
    formUid,
    contentfulfields,
    successMessage,
  } = data.hubspotPage.nodes[0].hubspotForm
  const { values, getInputProps } = useFormin()
  const formRef = useRef(null)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formValues, setFormValues] = useState({ content: false })
  const [errors, setErrors] = useState([])
  const [errorMessage, setErrorMessage] = useState()

  const handleSubmit = () => {
    setProcessing(true)
    setErrors([])
    setErrorMessage('')

    axios
      .post(`/.netlify/functions/hubspot/submit/${formUid}`, values)
      .then(() => setSuccess(true))
      .catch(error => {
        if (error.errors) {
          setErrors(error.errors)
        }

        if (error.message) {
          setErrorMessage(error.message)
        }
      })
      .then(() => setProcessing(false))
  }

  const theme = useContext(ThemeContext)
  if (theme.theme !== 'light') theme.toggleTheme('light')

  return (
    <Layout>
      {title && (
        <Grid>
          <Column md={10} pt={10}>
            <H1 mb="8" textColor={theme.color}>
              {title}
            </H1>
          </Column>
        </Grid>
      )}
      {excerpt && (
        <Grid>
          <Column md={6} mb="3">
            <Excerpt textColor={theme.color} style={{ display: 'inline' }}>
              {excerpt.excerpt}
            </Excerpt>
          </Column>
        </Grid>
      )}
      <Grid>
        <Column md={6} mb="3">
          <Text>
            – We always aim to push our creativity to the limit
            <br />
            – To solve our client’s everyday problems.
            <br />
            – To build long term value by creating meaningful change
            <br />– Creativity - or creating magic, if you prefer - is our core
            business
          </Text>
        </Column>
      </Grid>
      {(processing || success) && (
        <Grid mb="24">
          <Column>
            {success && <Excerpt>✔ {successMessage}</Excerpt>}
            {processing && <LoadingIcon />}
          </Column>
        </Grid>
      )}

      {!processing && !success && (
        <form ref={formRef}>
          <Grid>
            {legend && (
              <Column mb="5">
                <H2 as="legend">{legend}</H2>
              </Column>
            )}
            {errors.length > 0 && (
              <Column>
                <StyledErrors>
                  <Excerpt mb={2}>{errorMessage}</Excerpt>
                  <StyledErrorsList>
                    {errors.map(err => (
                      <li key={err.message}>{err.message}</li>
                    ))}
                  </StyledErrorsList>
                </StyledErrors>
              </Column>
            )}
            {contentfulfields &&
              contentfulfields.map(field => (
                <Column key={field.contentful_id} md={6} mb="6.75">
                  <FormField
                    type={field.type}
                    label={field.label}
                    required
                    {...getInputProps({ name: field.name })}
                  />
                </Column>
              ))}
          </Grid>
          <Grid>
            <Column md={6} mb="6.75">
              <CheckboxWrapper htmlFor="cb-gdpr">
                <InputCheckbox
                  id="cb-gdpr"
                  name="cb-gdpr"
                  type="checkbox"
                  value={formValues.accept}
                  required
                  onChange={() =>
                    setFormValues(v => {
                      return { ...v, accept: !formValues.accept }
                    })
                  }
                />
                <Check />
                <CheckBoxLabel>
                  {gdprText}{' '}
                  <Link
                    to={gdprLink}
                    textColor={theme.color}
                    styleVariant={theme.theme}
                  >
                    {gdprLinkLabel}
                  </Link>
                </CheckBoxLabel>
              </CheckboxWrapper>
            </Column>
          </Grid>
          <Grid mb="24">
            <Column>
              <Button
                disabled={processing}
                onClick={e => {
                  const isValid = formRef.current.reportValidity()

                  if (isValid) {
                    e.preventDefault()
                    handleSubmit()
                  }
                }}
              >
                {submitLabel}
              </Button>
            </Column>
          </Grid>
        </form>
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!, $locale: String!) {
    hubspotPage: allContentfulPages(
      filter: {
        template: { eq: "Hubspot" }
        slug: { eq: $slug }
        node_locale: { eq: $locale }
      }
    ) {
      nodes {
        template
        name
        id
        title
        slug
        excerpt {
          excerpt
        }
        body {
          json
        }
        seoTitle
        seoDescription {
          seoDescription
        }
        seoImage {
          og: resize(width: 1200, height: 630, quality: 80) {
            src
          }
        }
        hubspotForm {
          submitLabel
          successMessage
          title
          gdprText
          gdprLink
          formUid
          contentfulfields {
            name
            label
            type
            contentful_id
          }
        }
      }
    }
  }
`

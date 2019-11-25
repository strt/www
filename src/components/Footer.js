import React from 'react'
import styled from 'styled-components'
import Link from './Link'
import { Grid, Column } from './Grid'
import { Text } from './Text'
import Section from './Section'
import LogoIcon from './LogoIcon'
import { ScrollToTopButton } from './Button'
import { footerNavigation } from '../routes'
import { colors, breakpoints } from '../style'
import { formatPhone } from '../lib/format'
import useSiteSettings from '../lib/useSiteSettings'
import { getActiveLangPath } from './SelectLanguage'

const CopyrightText = styled(Text)`
  font-size: 0.75rem;

  @media ${breakpoints.medium} {
    font-size: 1rem;
  }
`

const currentYear = new Date().getFullYear()

export default function Footer() {
  const siteSettings = useSiteSettings()

  return (
    <Section as="footer" bg={colors.dark} py={[4, 7]}>
      <Grid>
        <Column md="12">
          <LogoIcon />
        </Column>
        {siteSettings.offices.map(office => (
          <Column md="3" key={office.city}>
            <Text as="address" textColor="white">
              {office.address} <br />
              {office.zipcode} {office.city} <br />
              <Link
                href={`tel:${formatPhone(office.phone)}`}
                colorVariant="white"
                styleVariant="light"
              >
                {office.phone}
              </Link>
            </Text>
          </Column>
        ))}
        <Column md="3">
          <Text>
            <Link
              href={siteSettings.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              colorVariant="white"
              styleVariant="light"
            >
              Instagram
            </Link>
            <br />
            <Link
              href={siteSettings.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              colorVariant="white"
              styleVariant="light"
            >
              Facebook
            </Link>
            <br />
            <Link
              href={siteSettings.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              colorVariant="white"
              styleVariant="light"
            >
              LinkedIn
            </Link>
            <br />
            <Link
              href={siteSettings.social.github}
              target="_blank"
              rel="noopener noreferrer"
              colorVariant="white"
              styleVariant="light"
            >
              GitHub
            </Link>
            <br />
          </Text>
        </Column>
        <Column md="3">
          <Text as="ul">
            {footerNavigation.map(route => (
              <li key={route.link}>
                <Link
                  to={`${getActiveLangPath()}/${route.link}`}
                  colorVariant="white"
                  styleVariant="light"
                >
                  {getActiveLangPath() ? route.sv.title : route.title}
                </Link>
              </li>
            ))}
          </Text>
        </Column>
      </Grid>
      <Grid justifyContent="space-between" alignItems="flex-end" mt="4">
        <Column width="auto">
          <CopyrightText as="small" textColor="white">
            © {currentYear} <br />
            {siteSettings.name} <br />
            {getActiveLangPath() ? 'En del av ' : 'A part of '}
            <Link
              href="//diplomatgruppen.se"
              target="_blank"
              rel="noopener noreferrer"
              colorVariant="white"
              styleVariant="light"
            >
              {getActiveLangPath() ? 'Diplomatgruppen' : 'Diplomat Group'}
            </Link>
          </CopyrightText>
        </Column>
        <Column width="auto">
          <ScrollToTopButton textColor="white" />
        </Column>
      </Grid>
    </Section>
  )
}

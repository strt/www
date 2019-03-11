import React, { useState } from 'react'
import axios from 'axios'
import { H3, Text } from './Text'
import Dialog, { DialogRow, DialogActions, DialogButton } from './Dialog'
import Icon from './Icon'
import Link from './Link'
import TextField from './TextField'
import { routes } from '../routes'
import useFormin from '../lib/useFormin'

const CLIENT_FORM_ID = 'b5cad137-0e3a-4171-98e9-b46b765e2763'

export function ClientForm({ onSubmit, ...props }) {
  const { values, getInputProps, reset } = useFormin()
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <Dialog {...props}>
      <form
        action=""
        onSubmit={(event) => {
          event.preventDefault()

          const { name, ...rest } = values
          const [firstname, lastname] = name.split(' ')
          const reqData = {
            firstname,
            lastname,
            ...rest,
          }

          setIsSubmitting(true)

          axios
            .post(
              `/.netlify/functions/hubspot/submit/${CLIENT_FORM_ID}`,
              reqData,
            )
            .then(({ data }) => {
              console.log(data)
              reset()
            })
            .catch((e) => {
              console.error(e)
            })
            .finally(() => {
              setIsSubmitting(false)
            })

          if (onSubmit) {
            onSubmit(event, { values })
          }
        }}
      >
        <DialogRow>
          <H3>Kul att du vill jobba med oss</H3>
          <Text>
            Berätta kort om vad du vill ha hjälp med, så hörs vi snart.
            <br />
            Genom att skicka samtycker du till vår{' '}
            <Link to={routes.policy.link}>policy</Link>.
          </Text>
          <TextField
            label="Namn"
            required
            {...getInputProps({ name: 'name' })}
          />
          <TextField
            label="Företag"
            required
            {...getInputProps({ name: 'company' })}
          />
          <TextField
            label="Din mejl"
            required
            {...getInputProps({ name: 'email' })}
          />
          <TextField
            label="Ditt telefonnummer (frivilligt)"
            minLength="7"
            {...getInputProps({ name: 'phone' })}
          />
          <TextField
            label="Vad vill du ha hjälp med?"
            multiline
            required
            {...getInputProps({ name: 'message' })}
          />
        </DialogRow>
        <DialogActions>
          <DialogButton disabled={isSubmitting || undefined}>
            <span>{isSubmitting ? 'Skickar...' : 'Skicka'}</span>
            <Icon name={['fal', 'long-arrow-right']} />
          </DialogButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export function CareerForm({ onSubmit, ...props }) {
  const { values, getInputProps } = useFormin()

  return (
    <Dialog {...props}>
      <form
        action=""
        onSubmit={(e) => {
          onSubmit(e, { values })
        }}
      >
        <DialogRow>
          <H3>Kul att du vill hänga med oss</H3>
          <Text>
            Berätta lite mer, så hörs vi snart.
            <br />
            Genom att skicka samtycker du till vår{' '}
            <Link to={routes.policy.link}>policy</Link>.
          </Text>
          <TextField
            label="Namn"
            {...getInputProps({ name: 'name' })}
            required
          />
          <TextField
            label="Din mejl"
            {...getInputProps({ name: 'email' })}
            required
          />
          <TextField
            label="Ditt telefonnummer"
            {...getInputProps({ name: 'phone' })}
          />
          <TextField
            label="Vilken roll är du intresserad av?"
            {...getInputProps({ name: 'role' })}
          />
          <TextField
            label="Ditt meddelande"
            multiline
            required
            {...getInputProps({ name: 'message' })}
          />
        </DialogRow>
        <DialogActions>
          <DialogButton>
            <span>Skicka</span>
            <Icon name={['fal', 'long-arrow-right']} />
          </DialogButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

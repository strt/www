import queryString from 'query-string'
import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

function parseBody(event) {
  const contentType = event.headers['content-type']

  if (contentType === 'application/x-www-form-urlencoded') {
    return queryString.parse(event.body)
  }

  if (contentType.includes('application/json')) {
    return JSON.parse(event.body)
  }

  return {}
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export async function handler(event) {
  const method = event.httpMethod
  const path = event.path
    .replace('/.netlify/functions', '')
    .split('/')
    .filter(Boolean)
  const [, form] = path
  const body = parseBody(event)

  try {
    if (form === 'career') {
      if (method !== 'POST') {
        return {
          statusCode: 405,
          body: '405 Method not allowed',
        }
      }

      let html = `<h2>"Career" form submission</h2><br>`
      html = Object.entries(body).reduce((acc, [key, value]) => {
        return `${acc}<strong>${capitalize(key)}</strong><br>${value}<br><br>`
      }, html)

      const msg = {
        to: 'alexander.nanberg@strateg.se',
        from: 'no-reply@strateg.se',
        subject: 'Contact form – strateg.se',
        html,
      }

      await sendgrid.send(msg)

      return {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ message: 'Message sent' }),
      }
    }
  } catch (e) {
    if (e.response) {
      return {
        statusCode: e.response.status,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(e.response.data),
      }
    }

    console.log(e)

    return {
      statusCode: 500,
      body: '500 Internal server error',
    }
  }

  return {
    statusCode: 404,
    body: '404 Not found',
  }
}

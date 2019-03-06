import axios from 'axios'
import queryString from 'query-string'

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

export async function handler(event) {
  const portalId = process.env.HUBSPOT_PORTAL_ID
  const apiKey = process.env.HUBSPOT_API_KEY
  const path = event.path
    .replace('/.netlify/functions', '')
    .split('/')
    .filter(Boolean)
  const method = event.httpMethod
  const [, action, formId] = path
  const body = parseBody(event)

  try {
    if (action === 'submit') {
      if (method !== 'POST') {
        return {
          statusCode: 405,
          body: '405 Method not allowed',
        }
      }

      const fields = Object.entries(body).map(([key, value]) => ({
        name: key,
        value,
      }))

      const res = await axios.post(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        {
          submittedAt: Date.now(),
          fields,
        },
      )

      return {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ message: res.data.inlineMessage }),
      }
    }
    if (action === 'get') {
      if (method !== 'GET') {
        return {
          statusCode: 405,
          body: '405 Method not allowed',
        }
      }

      const res = await axios.get(
        `https://api.hubapi.com/forms/v2/forms/${formId}/?hapikey=${apiKey}`,
      )

      const { portalId: _, ...data } = res.data

      return {
        statusCode: 200,
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
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

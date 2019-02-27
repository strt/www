import sendgrid from '@sendgrid/mail'
import axios from 'axios'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

export async function handler(event, context, callback) {
  // const msg = {
  //   to: 'alexander.nanberg@strateg.se',
  //   from: 'development@strateg.se',
  //   subject: 'Sending with SendGrid is Fun',
  //   text: 'and easy to do anywhere, even with Node.js',
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // }
  const portalId = process.env.HUBSPOT_PORTAL_ID
  const formId = 'b5cad137-0e3a-4171-98e9-b46b765e2763'

  console.log(event.queryStringParameters)
  console.log(event.body.foo)

  try {
    // await sendgrid.send(msg)
    // const res = await axios.post(
    //   `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
    //   {
    //     submittedAt: Date.now(),
    //     fields: [
    //       {
    //         name: 'firstname',
    //         value: 'Alexander',
    //       },
    //       {
    //         name: 'lastname',
    //         value: 'Nanberg',
    //       },
    //       {
    //         name: 'email',
    //         value: 'alexander.nanberg@strateg.se',
    //       },
    //       {
    //         name: 'message',
    //         value: 'Hello',
    //       },
    //     ],
    //   },
    // )

    // console.log(res.data)

    callback(null, {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ message: 'ok' }),
    })
  } catch (e) {
    callback(e)
  }
}

import axios from 'axios'

export async function handler() {
  const endpoint = 'https://api.instagram.com/v1/users/self/media/recent'
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const limit = 5

  const {
    data: { data: posts },
  } = await axios.get(`${endpoint}?access_token=${token}&count=${limit}`)

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(
      posts.map(i => ({
        id: i.id,
        link: i.link,
        images: i.images,
        videos: i.videos,
        caption: i.caption.text,
      })),
    ),
  }
}

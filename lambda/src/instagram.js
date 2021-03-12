import axios from 'axios'

export async function handler() {
  const endpoint = 'https://graph.instagram.com'
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  const date = new Date()

  const refreshToken = async function() {
    await axios.get(`${endpoint}/refresh_access_token`, {
      params: {
        access_token: token,
        grant_type: 'ig_refresh_token',
      },
    })
  }

  // Update the token every first day of the month
  if (date.getDate() === 1) {
    await refreshToken()
  }

  const {
    data: { data: posts },
  } = await axios.get(`${endpoint}/me/media`, {
    params: {
      access_token: token,
      fields: 'id,media_url,permalink,caption,media_type',
      limit: 5,
    },
  })

  const getFirstAlbumMedia = async function(id) {
    const {
      data: { data: children },
    } = await axios.get(`${endpoint}/${id}/children`, {
      params: {
        access_token: token,
        fields: 'id,media_url,permalink,media_type',
      },
    })

    if (children.length) {
      return children[0]
    }

    return {}
  }

  const resolveMediaType = function(item) {
    if (item.media_type === 'CAROUSEL_ALBUM') {
      const childMediaType = getFirstAlbumMedia(item.id).media_type

      return childMediaType === 'VIDEO' ? 'video' : 'image'
    }

    return item.media_type === 'VIDEO' ? 'video' : 'image'
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(
      posts.slice(0, 5).map(i => ({
        id: i.id,
        link: i.permalink,
        media_url: i.media_url,
        media_type: resolveMediaType(i),
        caption: i.caption,
      })),
    ),
  }
}

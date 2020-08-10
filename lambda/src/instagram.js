import axios from 'axios'

export async function handler() {
  const endpoint = 'https://graph.instagram.com'
  const token = process.env.INSTAGRAM_ACCESS_TOKEN

  const {
    data: { data: posts },
  } = await axios.get(`${endpoint}/me/media?access_token=${token}&fields=id,media_url,permalink,caption,media_type`)

  const getFirstAlbumMedia = async function (id) {
    const {
      data: { data: children },
    } = await axios.get(`${endpoint}/${id}/children?access_token=${token}&fields=id,media_url,permalink,media_type`)

    if (children.length) {
      return children[0]
    }

    return {}
  }

  const resolveMediaType = function (item) {
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
      posts.map(i => ({
        id: i.id,
        link: i.permalink,
        media_url: i.media_url,
        media_type: resolveMediaType(i),
        caption: i.caption.text,
      })),
    ),
  }
}

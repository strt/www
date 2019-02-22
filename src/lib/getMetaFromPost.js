export default function getMetaFromPost(post, { type } = {}) {
  function getSeoField(field) {
    return post.frontmatter.seo && post.frontmatter.seo[field]
  }

  return {
    title: getSeoField('title') || post.frontmatter.title,
    description: getSeoField('description') || post.frontmatter.excerpt,
    url: post.fields ? post.fields.slug : undefined,
    type,
    publishedTime: post.frontmatter.date,
    image: getSeoField('image')
      ? post.frontmatter.seo.image.childImageSharp.og.src
      : post.frontmatter.image.childImageSharp.og.src,
  }
}

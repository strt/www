export default function getMetaFromPost(post, { type } = {}) {
  // Todo update this function when migration to contentful is completed
  if (!post) {
    return {}
  }
  function getSeoField(field) {
    return post.frontmatter.seo && post.frontmatter.seo[field]
  }

  if (!post.frontmatter) {
    return {
      title: post.seoTitle || post.title || '',
      description:
        post.seoDescription.seoDescription || post.excerpt.excerpt || '',
      url: post.slug || '',
      type,
      publishedTime: type === 'article' ? post.createdAt : undefined,
      image: getSeoField('image')
        ? post.seoImage && post.seoImage.fixed.src
        : post.frontmatter.image && post.image.fluid.src,
    }
  }

  return {
    title: getSeoField('title') || post.frontmatter.title || '',
    description: getSeoField('description') || post.frontmatter.excerpt || '',
    url: post.fields ? post.fields.slug : undefined,
    type,
    publishedTime: type === 'article' ? post.frontmatter.date : undefined,
    image: getSeoField('image')
      ? post.frontmatter.seo.image &&
        post.frontmatter.seo.image.childImageSharp.og.src
      : post.frontmatter.image && post.frontmatter.image.childImageSharp.og.src,
  }
}

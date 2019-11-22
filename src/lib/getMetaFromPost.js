export default function getMetaFromPost(post, { type } = {}) {
  if (!post) {
    return {}
  }

  return {
    title: post.seoTitle || post.title || '',
    description:
      (post.seoDescription && post.seoDescription.seoDescription) ||
      (post.excerpt && post.excerpt.excerpt) ||
      '',
    url: post.slug || '',
    type,
    publishedTime: type === 'article' ? post.createdAt : undefined,
    image: post.seoImage
      ? post.seoImage && `https:${post.seoImage.og.src}`
      : post.featuredImage && `https:${post.featuredImage.fixed.src}`,
  }
}

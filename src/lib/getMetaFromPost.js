export default function getMetaFromPost(post, { type }) {
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    url: post.fields ? post.fields.slug : undefined,
    type,
    publishedTime: post.frontmatter.date,
  }
}

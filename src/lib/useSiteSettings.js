import { graphql, useStaticQuery } from 'gatsby'

export default function useSiteSettings() {
  const {
    file: { siteSettings },
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "settings.json" }) {
        siteSettings: childContentJson {
          name
          offices {
            address
            zipcode
            city
            email
            phone
          }
          social {
            facebook
            facebook_app_id
            instagram
            linkedin
            github
          }
        }
      }
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  return { ...siteMetadata, ...siteSettings }
}

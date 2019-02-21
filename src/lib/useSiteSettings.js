import { graphql, useStaticQuery } from 'gatsby'

export default function useSiteSettings() {
  const {
    file: { siteSettings },
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
            instagram
            linkedin
            github
          }
        }
      }
    }
  `)

  return siteSettings
}

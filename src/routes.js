export const routes = {
  index: {
    id: 'index',
    link: '/',
    title: 'Home',
    sv: { title: 'Hem' }
  },
  work: {
    id: 'work',
    link: '/work/',
    title: 'Work',
    sv: { title: 'Arbete' }
  },
  career: {
    id: 'career',
    link: '/join-us/',
    title: 'Join us',
    sv: { title: 'Arbeta hos oss' }

  },
  news: {
    id: 'news',
    link: '/news/',
    title: 'News',
    sv: { title: 'Nyheter' }

  },
  contact: {
    id: 'contact',
    link: '/contact/',
    title: 'Contact',
    sv: { title: 'Kontakt' }

  },
  policy: {
    id: 'policy',
    link: '/integrity-policy/',
    title: 'Policy',
    sv: { title: 'Policy' }
  },
}

export const mainNavigation = [
  routes.index,
  routes.work,
  routes.news,
  routes.career,
  routes.contact,
]

export const footerNavigation = [
  routes.work,
  routes.news,
  routes.contact,
  routes.career,
  routes.policy,
]

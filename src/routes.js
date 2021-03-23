export const routes = {
  index: {
    id: 'index',
    link: '',
    title: 'Home',
    sv: { title: 'Hem' },
  },
  work: {
    id: 'work',
    link: 'work/',
    title: 'Work',
    sv: { title: 'Case' },
  },
  about: {
    id: 'about',
    link: 'about/',
    title: 'About',
    sv: { title: 'Vad vi gör' },
  },
  career: {
    id: 'career',
    link: 'join-the-team/',
    title: 'Join',
    sv: { title: 'Bli en av oss' },
  },
  news: {
    id: 'news',
    link: 'news/',
    title: 'News',
    sv: { title: 'Aktuellt' },
  },
  contact: {
    id: 'contact',
    link: 'contact/',
    title: 'Contact',
    sv: { title: 'Kontakt' },
  },
  policy: {
    id: 'policy',
    link: 'integrity-policy/',
    title: 'Policy',
    sv: { title: 'Policy' },
  },
}

export const mainNavigation = [
  routes.work,
  routes.about,
  routes.news,
  routes.career,
  routes.contact,
]

export const footerNavigation = [
  routes.work,
  routes.about,
  routes.news,
  routes.contact,
  routes.career,
  routes.policy,
]

export const routes = {
  index: {
    id: 'index',
    link: '/',
    title: 'Home',
  },
  work: {
    id: 'work',
    link: '/work/',
    title: 'Work',
  },
  career: {
    id: 'career',
    link: '/join-us/',
    title: 'Join us',
  },
  news: {
    id: 'news',
    link: '/news/',
    title: 'News',
  },
  contact: {
    id: 'contact',
    link: '/contact/',
    title: 'Contact',
  },
  policy: {
    id: 'policy',
    link: '/integrity-policy/',
    title: 'Policy',
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

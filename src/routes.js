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
  // about: {
  //   id: 'about',
  //   link: '/about/',
  //   title: 'About',
  // },
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
    link: '/privacy-policy/',
    title: 'Policy',
  },
}

export const mainNavigation = [
  routes.index,
  routes.work,
  // routes.about,
  routes.news,
  routes.career,
  routes.contact,
]

export const footerNavigation = [
  routes.work,
  // routes.about,
  routes.news,
  routes.contact,
  routes.career,
  routes.policy,
]

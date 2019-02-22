export const routes = {
  index: {
    id: 'index',
    link: '/',
    title: 'Hem',
  },
  case: {
    id: 'case',
    link: '/case',
    title: 'Case',
  },
  about: {
    id: 'about',
    link: '/vad-vi-gor',
    title: 'Vad vi gör',
  },
  career: {
    id: 'career',
    link: '/bli-en-av-oss',
    title: 'Bli en av oss',
  },
  news: {
    id: 'news',
    link: '/aktuellt',
    title: 'Aktuellt',
  },
  contact: {
    id: 'contact',
    link: '/kontakt',
    title: 'Kontakt',
  },
  policy: {
    id: 'policy',
    link: '/policy',
    title: 'Policy',
  },
}

export const mainNavigation = [
  routes.index,
  routes.case,
  routes.about,
  routes.career,
  routes.news,
  routes.contact,
]

export const footerNavigation = [
  routes.case,
  routes.about,
  routes.career,
  routes.news,
  routes.contact,
  routes.policy,
]

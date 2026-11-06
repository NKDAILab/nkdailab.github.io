import heroImage from './assets/lab-hero.jpg';

export const SITE = {
  website: 'https://nkdailab.github.io/',
  name: { zh: '南方科技大学人工智能实验室', en: 'SUSTech Artificial Intelligence Lab' },
  shortName: 'NKD AI Lab',
  labName: 'NKD AI Lab',
  university: { zh: '南方科技大学', en: 'Southern University of Science and Technology' },
  department: { zh: '电子与电气工程系', en: 'Department of Electronic and Electrical Engineering' },
  description: {
    zh: '南方科技大学人工智能实验室，由何志海教授带头组建，开展生成式视觉 AI、多模态大模型、健康守护机器人与 AI 智能体研究。',
    en: 'Led by Professor Zhihai He, the SUSTech Artificial Intelligence Lab studies generative visual AI, multimodal large models, healthcare robotics, and AI agents.',
  },
  email: 'hezh@sustech.edu.cn',
  address: { zh: '广东省深圳市南山区学苑大道1088号，南方科技大学工学院南楼434室', en: 'Room 434, South Tower, College of Engineering, SUSTech, 1088 Xueyuan Avenue, Nanshan, Shenzhen, China' },
  heroImage: '/media/sustech2.jpg',
  logo: '/media/icon_hu_cad48d5bae1d0c97.png',
  hero: {
    title: { zh: '欢迎来到南方科技大学人工智能实验室', en: 'Welcome to the SUSTech Artificial Intelligence Lab' },
    subtitle: { zh: '电子与电气工程系 · 工学院南楼434室', en: 'Department of Electronic and Electrical Engineering · Room 434, South Tower, College of Engineering' },
    image: heroImage,
  },
  nav: [
    { text: 'Home', link: '/', key: 'home' },
    { text: 'Research', link: '/research/', key: 'research' },
    { text: 'Achievements', link: '/achievements/', key: 'achievements' },
    { text: 'Team', link: '/team/', key: 'team' },
    { text: 'News', link: '/news/', key: 'news' },
    { text: 'Join Us', link: '/join/', key: 'join' },
    { text: 'Search', link: '/search/', key: 'search' },
  ],
  customPages: [] as Array<{ text: string; link: string; key: string }>,
  i18n: { enabled: true, defaultLocale: 'zh' },
};

export const LOGO_IMAGE = { enable: true, svg: false, width: 216, height: 46 };

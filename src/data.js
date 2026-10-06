export const EMAIL = 'cayananandrew09@gmail.com'
// Resolves files in /public so paths work on any host or sub-folder.
export const asset = path => `${import.meta.env.BASE_URL}${path}`
export const RESUME = asset('MidtermResume.pdf')

export const NAV = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['work', 'Projects'],
  ['experience', 'Experience'],
  ['certifications', 'Certificates'],
  ['contact', 'Contact'],
]

export const STRENGTHS = ['Teamwork', 'Time management', 'Leadership', 'Communication', 'Critical thinking', 'Adaptability', 'Creative thinking', 'Strong work ethic']

// Skills are grouped by area. `name` must match a mark in src/components/ui/tech-logos.tsx.
export const SKILL_GROUPS = [
  { id: 'frontend', title: 'Frontend', blurb: 'What people see and touch: responsive, accessible interfaces.', items: [
    ['React', 'Component-based UIs with hooks'], ['Vite', 'Fast dev server and builds'], ['HTML & CSS', 'Semantic, accessible pages'], ['JavaScript', 'Interactive, responsive sites'], ['Angular', 'Projects styled with Bootstrap'], ['Bootstrap', 'Responsive layouts'], ['Dart', 'Cross-platform basics'],
  ] },
  { id: 'backend', title: 'Backend', blurb: 'Server logic, APIs, auth and the data behind them.', items: [
    ['Supabase', 'Postgres database, auth and APIs'], ['PHP', 'Server-side with PHP and MySQL'], ['MySQL', 'Relational data for e-commerce'], ['Node.js', 'APIs and microservices'], ['Python', 'Scripting and logic'], ['Java', 'Object-oriented foundations'],
  ] },
  { id: 'design', title: 'Design & CMS', blurb: 'Planning screens before code, and content-driven sites.', items: [
    ['Figma', 'Design-focused components'], ['WordPress', 'Personal blogs'],
  ] },
  { id: 'cloud', title: 'Cloud & Tools', blurb: 'How I build, version, host and prototype.', items: [
    ['AWS', 'Academy Cloud Foundations, Learning Club'], ['GitHub', 'Version control and hosting'], ['StackBlitz', 'Online prototyping'], ['VS Code', 'Daily editor'],
  ] },
]

// image paths are relative to /public. Entries without an image are listed but not clickable.
// 'verify' (optional) adds a Verify button linking to the issuer's public verification page.
export const CERTS = [
  { title: 'Legacy JavaScript Algorithms and Data Structures V7', issuer: 'freeCodeCamp', date: 'Oct 2025', image: 'certificates/FCC-Legacy-Java-Script.png', verify: 'https://freecodecamp.org/certification/bartandrewcayanan/javascript-algorithms-and-data-structures' },
  { title: 'Back-End Development and APIs V8', issuer: 'freeCodeCamp', date: 'Oct 2025', image: 'certificates/FCC-Back-End-Development.png', verify: 'https://freecodecamp.org/certification/bartandrewcayanan/back-end-development-and-apis' },
  { title: 'Digital Advertising Certified', issuer: 'HubSpot Academy', date: '2025', image: 'certificates/Digital-Advertising.png' },
  { title: 'Digital Marketing Certified', issuer: 'HubSpot Academy', date: '2025', image: 'certificates/Digital_Marketing.png' },
  { title: 'Design Thinking for Beginners', issuer: 'Simplilearn SkillUP', date: '2025', image: 'certificates/Design-Thinking.png' },
  { title: 'Introduction to Graphic Design; Basics of UI/UX', issuer: 'Simplilearn SkillUP', date: '2026', image: 'certificates/Graphic-Design.png' },
  { title: 'Website UI/UX Designing using ChatGPT', issuer: 'Simplilearn SkillUP', date: '2026', image: 'certificates/Designing-Using-ChatGPT.png' },
  { title: 'AWS Academy Cloud Foundations', issuer: 'AWS Academy', date: 'Trained badge', image: 'certificates/AWS-Academy-Graduate-Cloud-Foundations-Training-Badge.png' },
]
export const VIEWABLE_CERTS = CERTS.filter(c => c.image)

// Projects shown in the carousel. Each cover tries, in order: the local screenshot in /public/works/,
// the screenshot hosted on the old Netlify portfolio, then the generated SVG cover.
const NETLIFY = 'https://bartcayanan.netlify.app/'
const GH = 'https://github.com/AndrewCayanan/'
const PAGES = 'https://andrewcayanan.github.io/'
const cover = (shot, svg) => ({ src: asset(`works/${shot}.png`), fallbacks: [`${NETLIFY}${shot}.png`, asset(`works/${svg}.svg`)] })

// Stacked page screenshots for the showcase. Drop real screenshots into public/works/<slug>/<page>.png
// (e.g. public/works/cieqen/home.png) and they replace the generated placeholder automatically.
const shots = (slug, pages) => pages.map(([key, label]) => ({
  label, alt: `${label} page`,
  src: asset(`works/${slug}/${key}.png`),
  fallbacks: [asset(`works/${slug}/${key}.svg`)],
}))

export const WORKS = [
  {
    src: asset('works/venici.svg'), alt: 'Venici fitness and nutrition tracker cover', title: 'Venici', pages: shots('venici', [['dashboard', 'Dashboard'],['nutrition', 'Nutrition'],['cardio', 'Cardio'],['social', 'Social feed']]), subtitle: 'Fitness & nutrition tracker · Thesis project',
    description: 'A full-stack fitness and nutrition platform built for my thesis. It logs meals and workouts, tracks cardio with live GPS on a map, charts progress against goals, ranks users on leaderboards, and adds a social feed with follows, messages and an admin panel. It is also installable as a PWA.',
    meta: [{ label: 'Front end', value: 'React, Vite, TypeScript, Tailwind' }, { label: 'Back end', value: 'Node.js, Express, Prisma, PostgreSQL' }, { label: 'Features', value: 'GPS tracking, auth, PWA' }],
    links: [{ label: 'Source code', href: 'https://github.com/PogingAndrew/VENICI' }],
  },
  {
    ...cover('cieqen', 'cieqen'), alt: 'Cieqen clothing website', title: 'Cieqen', pages: shots('cieqen', [['home', 'Home'],['wardrobe', 'Wardrobe'],['stores', 'Stores'],['custom', 'Custom order']]), subtitle: 'Clothing brand website · 2025',
    description: 'A premium clothing brand site with a product wardrobe, a store locations page, an about page and a custom-order contact flow.',
    meta: [{ label: 'Stack', value: 'HTML, CSS, JavaScript' }, { label: 'Pages', value: '4, fully responsive' }, { label: 'Extras', value: 'Scroll animations' }],
    links: [{ label: 'Live demo', href: `${PAGES}Cieqens/` }, { label: 'Source code', href: `${GH}Cieqens` }],
  },
  {
    ...cover('brewnest', 'brewnest'), alt: 'BrewNest Café website', title: 'BrewNest Café', pages: shots('brewnest', [['home', 'Home'],['menu', 'Menu'],['reserve', 'Reserve']]), subtitle: 'Café website · 2025',
    description: 'A cozy local café site with a filterable menu (coffee, non-coffee, food), a table reservation form and an embedded map.',
    meta: [{ label: 'Stack', value: 'HTML, CSS, JavaScript' }, { label: 'Features', value: 'Menu filter tabs' }, { label: 'Forms', value: 'Reservations' }],
    links: [{ label: 'Live demo', href: `${PAGES}CafeBrew/` }, { label: 'Source code', href: `${GH}CafeBrew` }],
  },
  {
    ...cover('ironforge', 'ironforge'), alt: 'IronForge Gym website', title: 'IronForge Gym', pages: shots('ironforge', [['home', 'Home'],['programs', 'Programs'],['plans', 'Plans'],['schedule', 'Schedule']]), subtitle: 'Gym website · 2025',
    description: 'A gym site with six training programs, tiered membership pricing, a weekly class schedule grid and a contact form.',
    meta: [{ label: 'Stack', value: 'HTML, CSS, JavaScript' }, { label: 'Features', value: 'Plans + schedule' }, { label: 'Theme', value: 'Dark industrial red' }],
    links: [{ label: 'Live demo', href: `${PAGES}iron-forge/` }, { label: 'Source code', href: `${GH}iron-forge` }],
  },
  {
    ...cover('freshmart', 'freshmart'), alt: 'FreshMart grocery website', title: 'FreshMart', pages: shots('freshmart', [['home', 'Home'],['products', 'Products'],['order', 'Order']]), subtitle: 'Grocery market website · 2025',
    description: 'A local grocery site with product tabs (vegetables, fruits, meat, dairy), an online order form, store location and delivery info.',
    meta: [{ label: 'Stack', value: 'HTML, CSS, JavaScript' }, { label: 'Features', value: 'Category tabs' }, { label: 'Forms', value: 'Online ordering' }],
    links: [{ label: 'Live demo', href: `${PAGES}fresh-mart/` }, { label: 'Source code', href: `${GH}fresh-mart` }],
  },
  {
    ...cover('blaze', 'blaze'), alt: 'Blaze Barbershop website', title: 'Blaze Barbershop', pages: shots('blaze', [['home', 'Home'],['services', 'Services'],['gallery', 'Gallery'],['booking', 'Booking']]), subtitle: 'Barbershop website · 2025',
    description: 'A barbershop site with services and pricing cards, a gallery grid, barber profiles and an appointment booking form.',
    meta: [{ label: 'Stack', value: 'HTML, CSS, JavaScript' }, { label: 'Features', value: 'Pricing + gallery' }, { label: 'Forms', value: 'Booking' }],
    links: [{ label: 'Live demo', href: `${PAGES}blaze/` }, { label: 'Source code', href: `${GH}blaze` }],
  },
  {
    src: asset('works/gymboi.svg'), alt: 'GymBoi project cover', title: 'GymBoi', pages: shots('gymboi', [['home', 'Home'],['programs', 'Programs'],['contact', 'Contact']]), subtitle: 'Gym web project · School finals',
    description: 'A gym-focused website built as a school finals requirement. Open the live demo to try it, or read the code on GitHub.',
    meta: [{ label: 'Type', value: 'Web project' }, { label: 'Status', value: 'In progress' }, { label: 'Hosted on', value: 'GitHub Pages' }],
    links: [{ label: 'Live demo', href: `${PAGES}GymBoi-Finals/` }, { label: 'Source code', href: `${GH}gymboi-feature-page` }],
  },
  {
    src: asset('works/url-shortener.svg'), alt: 'URL Shortener Microservice cover', title: 'URL Shortener', pages: shots('url-shortener', [['home', 'Home'],['request', 'Request'],['redirect', 'Redirect']]), subtitle: 'Backend microservice',
    description: 'A small Node.js backend that turns long URLs into short links, deployed on Vercel. My back-end project next to the front-end sites.',
    meta: [{ label: 'Type', value: 'Back-end API' }, { label: 'Runtime', value: 'Node.js' }, { label: 'Hosted on', value: 'Vercel' }],
    links: [{ label: 'Live API', href: 'https://url-shortener-microservice-murex.vercel.app' }, { label: 'Source code', href: `${GH}url-shortener-microservice` }],
  },
]

export const EXPERIENCE = [
  { title: 'Club Member', when: '2025 – Present', org: 'Amazon Web Services Learning Club' },
  {
    title: 'Web Developer, school projects', when: '2023 – Present', org: 'Holy Angel University',
    points: [
      'Developed a functional e-commerce website with a database.',
      'Built responsive personal websites with JavaScript, HTML and CSS.',
      'Built Angular projects that use Bootstrap.',
      'Developed Figma-focused components.',
      'Worked with GitHub, StackBlitz, PHPMySQL and AWS.',
      'Developed personal blogs on WordPress.',
    ],
  },
  { title: 'BS in IT, Web Development', when: '2023 – Present', org: 'School of Computing, Holy Angel University' },
  { title: 'Senior High School, STEM', when: '2021 – 2023', org: 'Holy Angel University' },
]

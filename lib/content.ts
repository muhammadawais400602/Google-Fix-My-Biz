// All copy on the homepage comes from xovra.ai.

export const site = {
  name: 'Xovra',
  title: 'Xovra – AI-Powered Cold Calling Platform',
  description:
    'Xovra scrapes leads from Google Maps, enriches and scores them, then lets you call with a browser-based softphone or AI qualifier. Usage-based pricing, no contracts.',
  base: 'https://www.xovra.ai',
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: `${site.base}/features` },
  {
    label: 'Use Cases',
    children: [
      { label: 'Small Business', href: `${site.base}/use-cases/small-business` },
      { label: 'Sales Teams', href: `${site.base}/use-cases/sales-teams` },
      { label: 'Lead Gen Agencies', href: `${site.base}/use-cases/lead-gen-agencies` },
      { label: 'Real Estate', href: `${site.base}/use-cases/real-estate` },
      { label: 'Insurance Agents', href: `${site.base}/use-cases/insurance` },
    ],
  },
  {
    label: 'Compare',
    children: [
      { label: 'vs Drop Cowboy', href: `${site.base}/compare/xovra-vs-drop-cowboy` },
      { label: 'vs Mojo Dialer', href: `${site.base}/compare/xovra-vs-mojo-dialer` },
      { label: 'vs CallTools', href: `${site.base}/compare/xovra-vs-calltools` },
      { label: 'vs Slybroadcast', href: `${site.base}/compare/xovra-vs-slybroadcast` },
    ],
  },
  { label: 'Pricing', href: `${site.base}/pricing` },
  { label: 'About', href: `${site.base}/about` },
  { label: 'Contact Us', href: `${site.base}/contact` },
] as const;

export const links = {
  login: `${site.base}/login`,
  trial: `${site.base}/pricing`,
  access: `${site.base}/contact`,
  demo: `${site.base}/demo`,
  features: `${site.base}/features`,
  integrations: `${site.base}/integrations`,
  compliance: `${site.base}/compliance`,
};

export const hero = {
  eyebrow: 'AI-Powered Cold Calling Platform for Revenue Teams',
  title: 'Find, Call, Qualify',
  subtitle: 'AI-Powered Cold Calling Platform',
  body: 'Xovra finds leads on Google Maps, lets you call them from your browser, and can send an AI assistant to qualify prospects for you. Outcomes go straight back to your Google Sheet.',
  bullets: [
    'Scrape Google Maps listings by niche and city',
    'Call one lead at a time from your browser',
    'Let an AI assistant make qualifier calls for you',
  ],
};

export const dialer = {
  label: 'dialer // example lead',
  badge: 'Illustrative mockup',
  business: 'Example Plumbing Co.',
  meta: 'Plumber, Austin',
  angle: 'WEAK_SITE',
  enrichment: [
    { text: 'No HTTPS', bad: true },
    { text: 'Not mobile-friendly', bad: true },
    { text: 'No Google Ads detected', bad: true },
    { text: 'Facebook page found', bad: false },
  ],
  rebuttal:
    '“Totally fair. I only noticed because your site does not load well on a phone, and most people searching for a plumber are on one. Would a quick mockup be useful?”',
  outcomes: ['Interested', 'Sent mockup', 'Voicemail', 'No answer', 'Not interested', 'Bad number'],
};

export const audiences = {
  eyebrow: 'Built for sales teams, agencies, and solo operators',
  items: ['Sales teams', 'Agencies', 'Solo operators'],
};

export const steps = {
  eyebrow: 'How it works',
  title: 'From a Maps search to a logged outcome',
  items: [
    {
      n: '01',
      title: 'Scrape leads from Google Maps',
      body: 'Enter a niche and a city. Xovra pulls business listings from Google Maps so you have a fresh, local call list without buying a database.',
      image: '/images/pins-dark.png',
    },
    {
      n: '02',
      title: 'Enrich and score',
      body: 'Each lead gets a website audit, a Google Ads check, and a look at social presence. Leads are sorted into a pitch angle so you know what to say before you dial.',
      image: '/images/knot-light.png',
    },
    {
      n: '03',
      title: 'Call from the browser or deploy AI',
      body: 'Dial manually from the WebRTC softphone, or let a Telnyx AI assistant make the qualifier call and report back with a score and a next action.',
      image: '/images/wave-light.png',
    },
    {
      n: '04',
      title: 'Track outcomes in Sheets',
      body: 'Call outcomes are written back to your Google Sheet, and you can export to CSV in a HubSpot-compatible format when you need it elsewhere.',
      image: '/images/rings-dark.png',
    },
  ],
};

export const features = {
  eyebrow: 'Features',
  title: 'Everything for outbound, in one workspace',
  body: 'Sourcing, calling, texting, and tracking, with the compliance controls built in.',
  items: [
    { title: 'Google Maps Lead Scraping', body: 'Pull business listings by niche and city, then enrich them with website, ads, and social signals.', cta: 'See lead sourcing', href: `${site.base}/features/lead-management`, image: '/images/pins-dark.png' },
    { title: 'Browser Dialer', body: 'A WebRTC softphone powered by Telnyx. Calls go out one at a time, with keyboard shortcuts for one-handed operation.', cta: 'See the dialer', href: `${site.base}/features/ai-calling`, image: '/images/wave-light.png' },
    { title: 'AI Qualifier Calls', body: 'A Telnyx AI assistant calls your leads, says it is an AI in the first sentence, and returns a score and next action.', cta: 'See AI calling', href: `${site.base}/features/ai-calling`, image: '/images/hero-glass.png' },
    { title: 'Live AI Rebuttals', body: 'Claude or Gemini drafts objection handling during a call, using what Xovra already knows about the lead.', cta: 'See rebuttals', href: `${site.base}/features/objection-rebuttals`, image: '/images/knot-light.png' },
    { title: 'Campaigns', body: 'Load leads from a Google Sheet or paste numbers, choose manual or AI calling, and set retries and briefs.', cta: 'See campaigns', href: `${site.base}/features/outcome-tracking`, image: '/images/ribbon-dark.png' },
    { title: 'Two-Way SMS', body: 'Send and receive texts over Telnyx, threaded by phone number, with opt-out keywords handled for you.', cta: 'See SMS', href: `${site.base}/features/omnichannel`, image: '/images/rings-dark.png' },
    { title: 'Compliance Controls', body: 'Suppression lists, an 8am to 9pm calling window, per-contact attempt caps, and AI disclosure on every AI call.', cta: 'See compliance', href: `${site.base}/compliance`, image: '/images/knot-light.png' },
    { title: 'Number Pools', body: 'Run several numbers per organization, watch answer rates, and keep each lead tied to the same number.', cta: 'See all features', href: `${site.base}/features`, image: '/images/pins-dark.png' },
  ],
};

export const leadSourcing = {
  eyebrow: 'Lead sourcing',
  title: 'Know the pitch before you dial',
  body: 'Search Google Maps by niche and city, and Xovra builds the list. Every business is checked for the things that shape a cold call: how good its website is, whether it runs Google Ads, and where it shows up on social media.',
  bullets: [
    'Website audit: HTTPS, mobile-friendly, copyright year',
    'Google Ads detection',
    'Social presence: Instagram, Facebook, TikTok',
    'Export to Google Sheet or HubSpot-compatible CSV',
  ],
  cta: 'Explore lead sourcing',
  href: `${site.base}/features/lead-management`,
  anglesLabel: 'Pitch angles',
  anglesSub: 'Assigned to every lead',
  angles: [
    { code: 'RUNS_ADS', body: 'Already paying for Google Ads. Lead with conversion and landing page improvements.' },
    { code: 'NO_SITE', body: 'No website found. Lead with getting them online and showing up in search.' },
    { code: 'WEAK_SITE', body: 'Site has issues such as no HTTPS, not mobile-friendly, or an old copyright year.' },
    { code: 'STRONG_SITE', body: 'Site looks solid. Lead with a different angle, such as reviews or social presence.' },
  ],
};

export const aiCalling = {
  eyebrow: 'AI calling',
  title: 'Let an AI assistant make the first call',
  body: 'A Telnyx AI assistant calls on your behalf, asks your qualifying questions, and hands you a scored result. You spend your time on the leads worth a real conversation.',
  bullets: [
    'Discloses it is an AI in the first sentence of every call',
    'Receives dynamic context per lead: name, category, website issues, and pitch angle',
    'Sends a follow-up SMS after connected calls to capture an email address',
    'Runs on a per-organization Telnyx AI assistant and phone number',
  ],
  cta: 'Explore AI calling',
  href: `${site.base}/features/ai-calling`,
  reportLabel: 'What the AI qualifier reports back',
  report: [
    { k: 'Lead score', v: '1 to 10' },
    { k: 'Interest level', v: 'Captured per call' },
    { k: 'Qualified status', v: 'Yes or no' },
    { k: 'Next action', v: 'Suggested follow-up' },
  ],
  reportNote: "After a connected call, a follow-up SMS goes out to ask for the prospect's email address.",
};

export const campaigns = {
  eyebrow: 'Campaign management',
  title: 'Organize every list as a campaign',
  body: 'A campaign keeps the leads, the script, the calling mode, and the retry rules in one place, so each niche or client gets its own approach.',
  bullets: [
    'Load leads from a Google Sheet or paste a list of numbers',
    'Choose manual calling or AI calling for each campaign',
    'Write a per-campaign brief, greeting, and qualification criteria',
    'Set retry attempts and the timing between them',
    'Filter the worklist, for example no website or has socials',
    'Use per-campaign call scripts or fall back to the org default',
  ],
  cta: 'Explore campaigns',
  href: `${site.base}/features/outcome-tracking`,
  scriptLabel: 'Call script template',
  script:
    '“Hi, is this {name}? I was looking at {category} businesses in {city} and noticed {evidence} on {website}. You have a {rating} rating, so I thought it was worth a quick call.”',
  placeholdersLabel: 'Placeholders filled from lead data',
  placeholders: ['{name}', '{category}', '{city}', '{rating}', '{website}', '{evidence}'],
  tags: ['Configurable retries', 'Manual or AI mode'],
};

export const teams = {
  eyebrow: 'Teams and operations',
  title: 'Set up for more than one person',
  body: 'Roles, number pools, and a usage ledger keep a growing team organized.',
  items: [
    { title: 'Owner, admin, and agent roles', body: 'Organizations support three roles, plus team invites so you can bring reps on without sharing logins.' },
    { title: 'Per-org numbers and assistants', body: 'Each organization keeps its own phone numbers and its own AI assistants, so accounts stay separate.' },
    { title: 'Usage ledger', body: 'Every billable event is recorded. See voice minutes, SMS costs, your balance, and where the spend went.' },
    { title: 'Built-in guardrails', body: 'Do Not Contact lists, calling window enforcement, and attempt caps are part of the product, not an add-on.' },
  ],
  pool: {
    title: 'Number pools',
    body: 'Add several phone numbers to an organization and Xovra tracks the answer rate on each one. A lead always gets called from the same number, so the prospect sees a consistent caller ID.',
  },
};

export const integrations = {
  eyebrow: 'Integrations',
  title: 'Works with the tools you already use',
  body: 'A short list, and every item on it is something that works today.',
  items: [
    { name: 'Telnyx', body: 'Browser calling, SMS, and the AI assistant.' },
    { name: 'Google Sheets', body: 'Lead source and outcome tracking.' },
    { name: 'Claude and Gemini', body: 'Live rebuttals and follow-up drafts.' },
    { name: 'CSV export', body: 'HubSpot-compatible column format.' },
  ],
  cta: 'View integrations',
};

export const testimonials = {
  eyebrow: 'Early feedback',
  title: 'What early users say',
  items: [
    { quote: 'I used to build call lists by hand from Maps. Having the website and ads check next to each business means I know my opening line before I dial.', role: 'Agency Owner' },
    { quote: 'The keyboard shortcuts are what I notice most. I can log an outcome without leaving the call screen, and it lands in the sheet.', role: 'Sales Rep' },
    { quote: 'I like that the AI says it is an AI right away. I can hand off qualifier calls and review the scores afterward.', role: 'Sales Manager' },
  ],
};

export const compliance = {
  title: 'Compliance is partly yours',
  body: 'Xovra enforces calling windows, attempt caps, suppression lists, and AI disclosure. Registering your numbers for SMS (10DLC) and following the rules for your market remain your responsibility.',
  cta: 'Read more',
};

export const cta = {
  eyebrow: 'Xovra',
  title: 'Get Early Access',
  body: 'Find leads on Google Maps, call them from your browser, and let AI handle the first qualifying conversation. Tell us about your team and we will get you set up.',
};

export const footer = {
  tagline: 'AI-powered outbound calling for revenue teams that refuse to lose.',
  columns: [
    { title: 'Product', links: [['Features', '/features'], ['Pricing', '/pricing'], ['Integrations', '/integrations'], ['Compliance', '/compliance']] },
    { title: 'Use Cases', links: [['Small Business', '/use-cases/small-business'], ['Sales Teams', '/use-cases/sales-teams'], ['Lead Gen Agencies', '/use-cases/lead-gen-agencies'], ['Real Estate', '/use-cases/real-estate'], ['Insurance Agents', '/use-cases/insurance']] },
    { title: 'Compare', links: [['vs Drop Cowboy', '/compare/xovra-vs-drop-cowboy'], ['vs Mojo Dialer', '/compare/xovra-vs-mojo-dialer'], ['vs CallTools', '/compare/xovra-vs-calltools'], ['vs Slybroadcast', '/compare/xovra-vs-slybroadcast']] },
    { title: 'Company', links: [['About', '/about'], ['Contact', '/contact'], ['Demo', '/demo']] },
    { title: 'Legal', links: [['Privacy Policy', '#'], ['Terms of Service', '#']] },
  ] as { title: string; links: [string, string][] }[],
  copyright: '© 2025 Xovra. All rights reserved.',
  status: 'All systems operational',
};

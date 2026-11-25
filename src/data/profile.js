export const profile = {
  name: 'Bhargavi Macharla',
  role: 'Data & Business Analyst',
  location: 'Birmingham, UK',
  email: 'bhargavimacherla24@gmail.com',
  phone: '+44 7383 256379',
  phoneHref: 'tel:+447383256379',
  github: 'https://github.com/bhargavimacherla24-ctrl',
  // Hosted on Google Drive; the download link serves Bhargavi-Data-Analyst-resume.pdf as an attachment.
  resume: {
    download: 'https://drive.google.com/uc?export=download&id=1mqix1cnMkDaUgs2qQZZE70C-E0-Bzs9E',
    view: 'https://drive.google.com/file/d/1mqix1cnMkDaUgs2qQZZE70C-E0-Bzs9E/view',
  },
  lead:
    'My experience brings together reporting, data handling and business support. I use Excel, SQL and Power BI to organise information, check results and make business performance easier to understand.',
  about: [
    'I have a background in data analytics and business administration, supported by an MSc in International Business Management and Data Analytics. I have worked with financial and operational records, prepared reports, checked data and supported day-to-day coordination with customers, suppliers and colleagues.',
    'My project work covers sales performance, customer behaviour, budgets and business processes. I also bring experience in CRM updates, quotations, invoicing and day-to-day coordination. I am looking for a junior Data Analyst or Business Analyst role where I can contribute to reporting, investigate business questions and keep developing alongside an experienced team.',
  ],
};

export const stats = [
  { value: 8, suffix: '', label: 'End-to-end case studies' },
  { value: 2, suffix: '', label: 'Industry roles, UK & India' },
  { value: 3, suffix: '', label: 'Core tools: SQL · Power BI · Excel' },
];

export const toolkit = [
  { title: 'Data & BI', items: ['SQL', 'Power BI', 'Data modelling', 'Data validation'] },
  { title: 'Excel & Reporting', items: ['PivotTables', 'Lookups', 'Dashboards', 'Financial formulas'] },
  { title: 'Analysis', items: ['Trend analysis', 'Variance analysis', 'KPI reporting', 'Customer analysis'] },
  { title: 'Business Operations', items: ['Requirements', 'CRM', 'Quotations', 'Process documentation'] },
];

export const experience = [
  {
    date: 'Sep 2025 – Apr 2026',
    title: 'Data Analyst Intern',
    org: 'Devi Technology',
    place: 'Birmingham, UK',
    points: [
      'Worked with financial and operational data in Excel, SQL and Power BI to prepare information for reporting and review.',
      'Prepared reports and dashboards to compare budgets with actual results and highlight trends and cost differences.',
      'Checked data for consistency, supported statistical reporting and explained findings to colleagues with different levels of technical knowledge.',
      'Contributed to improvements in the weekly reporting process.',
    ],
    tools: ['Excel', 'SQL', 'Power BI'],
  },
  {
    date: 'Dec 2023 – Aug 2024',
    title: 'Sales and Business Administration',
    org: 'RN Embedded Solutions Pvt Ltd',
    place: 'Hyderabad, India',
    points: [
      'Prepared customer quotations and compared supplier prices to support sales and purchasing activity.',
      'Kept CRM and business records up to date and coordinated follow-ups with customers and internal teams.',
      'Handled sales administration and followed up on day-to-day operational tasks.',
    ],
    tools: ['CRM', 'Zoho Mail', 'Quotations'],
  },
];

export const education = [
  {
    date: 'Sep 2024 – Jun 2026',
    title: 'MSc International Business Management and Data Analytics with Advanced Practice',
    place: 'Wrexham Glyndŵr University, UK',
    level: 'Postgraduate',
  },
  {
    date: '2020 – 2023',
    grade: '75%',
    title: 'BTech Electrical and Electronics Engineering',
    place: 'India',
    level: 'Undergraduate',
  },
  {
    date: '2017 – 2020',
    grade: '83%',
    title: 'Diploma Electrical and Electronics Engineering',
    place: 'India',
    level: 'Diploma',
  },
];

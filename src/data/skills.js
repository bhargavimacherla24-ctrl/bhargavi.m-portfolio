export const skillGroups = [
  { name: 'Data & tools', keys: ['sql', 'powerbi', 'excel', 'python', 'cleaning'] },
  { name: 'Analysis', keys: ['kpi', 'trends', 'customer', 'business', 'process', 'problem'] },
  { name: 'Business operations', keys: ['crm', 'zoho', 'quotes', 'email', 'coordination'] },
];

export const skills = {
  sql: {
    title: 'SQL Server',
    copy: 'I use SQL to retrieve, organise and review structured business data before it is used in reports or dashboards.',
    exampleTitle: 'Sales total by product',
    formula: 'Revenue = SUM(Quantity × Unit Price)',
    chart: [
      { label: 'Product A', value: 12000, display: '£12,000' },
      { label: 'Product B', value: 9500, display: '£9,500' },
      { label: 'Product C', value: 7000, display: '£7,000' },
    ],
    points: [
      'Write queries to select and filter relevant records.',
      'Use joins to bring related tables together and compare information.',
      'Group records and calculate totals for sales, customers, finance and inventory analysis.',
      'Check query results for missing, inconsistent or unexpected values.',
    ],
  },
  powerbi: {
    title: 'Power BI',
    copy: 'I use Power BI to turn prepared data into clear visual reports that make business performance easier to review.',
    exampleTitle: 'Monthly revenue trend',
    formula: 'Growth = (Latest month − First month) ÷ First month × 100 = 50%',
    chart: [
      { label: 'January', value: 12000, display: '£12,000' },
      { label: 'February', value: 15000, display: '£15,000' },
      { label: 'March', value: 18000, display: '£18,000' },
    ],
    points: [
      'Build charts and graphs to compare categories, periods and performance.',
      'Create report pages for KPIs, trends and business summaries.',
      'Use filters and slicers to explore information from different perspectives.',
      'Present findings in a structured dashboard for quicker decision-making.',
    ],
  },
  excel: {
    title: 'Advanced Excel',
    copy: 'I use Excel to clean, organise, calculate and summarise data for regular reporting and detailed analysis.',
    exampleTitle: 'Budget compared with actual spend',
    formula: 'Variance = Actual − Budget = −£1,500  |  Variance % = −7.5%',
    chart: [
      { label: 'Budget', value: 20000, display: '£20,000' },
      { label: 'Actual', value: 18500, display: '£18,500' },
    ],
    points: [
      'Use PivotTables to summarise large tables and compare results.',
      'Apply lookup and logical formulas to connect information and support calculations.',
      'Use charts, conditional formatting and structured tables to highlight patterns.',
      'Compare budgets with actuals and review financial or operational variances.',
    ],
  },
  business: {
    title: 'Business Analysis',
    copy: 'I use business analysis techniques to understand a business question, document what is needed and make processes easier to review.',
    exampleTitle: 'Enquiry-to-sale conversion',
    formula: 'Conversion rate = 90 sales ÷ 500 enquiries × 100 = 18%',
    chart: [
      { label: 'Enquiries', value: 500, display: '500' },
      { label: 'Qualified', value: 300, display: '300' },
      { label: 'Proposals', value: 180, display: '180' },
      { label: 'Sales', value: 90, display: '90' },
    ],
    points: [
      'Clarify requirements and expected outcomes with relevant stakeholders.',
      'Document current processes, issues and improvement opportunities.',
      'Translate business questions into measures, reports or analysis tasks.',
      'Communicate findings clearly and keep supporting documentation organised.',
    ],
  },
  cleaning: {
    title: 'Data Cleaning & Validation',
    copy: 'I review source data before analysis so that reports are based on information that is consistent and usable.',
    points: [
      'Check for blanks, duplicates and inconsistent formats.',
      'Standardise categories and date or number formats where needed.',
      'Compare totals and sample records to identify unexpected differences.',
      'Keep a clear record of checks and data-quality issues.',
    ],
  },
  kpi: {
    title: 'KPI Reporting',
    copy: 'I use KPI reporting to bring important measures into a consistent view and help teams monitor performance.',
    points: [
      'Identify measures that relate to the business question.',
      'Prepare summary tables and dashboard views.',
      'Compare performance across reporting periods or business categories.',
      'Highlight results that may need further investigation.',
    ],
  },
  trends: {
    title: 'Trend & Variance Analysis',
    copy: 'I compare results over time and against a reference point to understand where performance has changed.',
    points: [
      'Review month-on-month or category-level movements.',
      'Compare budgeted and actual figures to identify variances.',
      'Look for patterns, unusual changes and areas for follow-up.',
      'Summarise the key observations in plain business language.',
    ],
  },
  customer: {
    title: 'Customer & Sales Analysis',
    copy: 'I analyse customer and sales records to understand activity, compare segments and review sales performance.',
    points: [
      'Compare sales by product, region, customer group or period.',
      'Summarise order volumes, revenue and customer activity.',
      'Explore customer segments and retention-related patterns.',
      'Present the results in tables, charts and dashboard summaries.',
    ],
  },
  process: {
    title: 'Requirements & Process Mapping',
    copy: 'I organise business needs and process information so that tasks, responsibilities and improvement areas are easier to understand.',
    points: [
      'Capture requirements and clarify expected outputs.',
      'Document process steps and hand-offs between teams.',
      'Identify delays, repeated tasks or gaps in available information.',
      'Maintain clear process notes and supporting documentation.',
    ],
  },
  python: {
    title: 'Python',
    copy: 'I use Python for basic data handling and to work through structured information when a task is better suited to a script.',
    points: [
      'Read and organise tabular data.',
      'Use pandas for straightforward filtering, grouping and summaries.',
      'Check values and prepare data for further analysis.',
      'Use simple scripts to reduce repetitive data-handling steps.',
    ],
  },
  crm: {
    title: 'CRM Systems',
    copy: 'I use CRM systems to keep customer and sales information organised and make follow-ups easier to manage.',
    points: [
      'Update customer and enquiry records.',
      'Track follow-up activity and sales stages.',
      'Keep notes and contact details consistent.',
      'Use CRM information to support customer and sales reporting.',
    ],
  },
  zoho: {
    title: 'Zoho Mail',
    copy: 'I use Zoho Mail for day-to-day business email and organised communication with customers and colleagues.',
    points: [
      'Manage business email conversations.',
      'Organise messages and follow-ups.',
      'Communicate clearly about requests and next steps.',
      'Keep email correspondence easy to refer back to.',
    ],
  },
  quotes: {
    title: 'Quotations & Invoice Processing',
    copy: 'I have experience supporting quotation and invoice tasks, checking the details before information is shared or recorded.',
    points: [
      'Prepare quotations using product, quantity and price details.',
      'Check line totals, taxes and final amounts.',
      'Review invoice information for missing or inconsistent details.',
      'Keep quotation and invoice records organised for follow-up.',
    ],
  },
  email: {
    title: 'Email Communication',
    copy: 'I use email to share updates, request information and keep work moving between customers and internal teams.',
    points: [
      'Write clear messages with a specific purpose.',
      'Summarise actions, owners and expected dates.',
      'Follow up on outstanding requests politely.',
      'Keep important conversations and attachments organised.',
    ],
  },
  coordination: {
    title: 'Planning & Coordination',
    copy: 'I plan tasks, keep track of priorities and coordinate follow-ups so that routine work is completed on time.',
    points: [
      'Break work into manageable tasks.',
      'Track deadlines and outstanding actions.',
      'Coordinate information between people or teams.',
      'Adjust priorities when requirements or timelines change.',
    ],
  },
  problem: {
    title: 'Analytical Thinking & Problem Solving',
    copy: 'I work through a question by checking the available information, comparing possible explanations and recording what the results show.',
    points: [
      'Clarify the issue before starting the analysis.',
      'Check source information and identify gaps.',
      'Compare figures, patterns and possible causes.',
      'Explain findings and suggest practical next steps.',
    ],
  },
};

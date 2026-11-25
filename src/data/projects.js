import img01 from '../assets/project-01.png';
import img02 from '../assets/project-02.png';
import img03 from '../assets/project-03.png';
import img04 from '../assets/project-04.png';
import img05 from '../assets/project-05.png';
import img06 from '../assets/project-06.png';
import img07 from '../assets/project-07.png';
import img08 from '../assets/project-08.png';

const DATA_SOURCE_NOTE = 'Bhargavi_Project_Datasets.xlsx workbook and matching CSV files supplied with this portfolio pack.';

export const projects = [
  {
    id: 'project-01',
    no: '01',
    category: 'data',
    title: 'Sales Performance and Revenue Analysis',
    question: 'Which products and regions really drive revenue?',
    image: img01,
    metrics: [
      { value: '600', label: 'orders' },
      { value: '£360.8k', label: 'revenue' },
    ],
    overview:
      'This case study reviews order-level sales to compare revenue across products, regions and months. It brings the main sales measures into one view for easier review.',
    problem:
      'Order, product and regional records each show part of the sales picture. Bringing them together makes it easier to compare performance and see where revenue is being generated.',
    objectives: [
      'Calculate revenue, order volume and units sold.',
      'Identify products and regions with the highest revenue contribution.',
      'Track monthly revenue movement.',
      'Create a clear sales performance dashboard.',
    ],
    dataset:
      'sales.csv (600 orders; OrderID, OrderDate, CustomerID, ProductID, Quantity, UnitPrice, Region) and products.csv (ProductID, ProductName, Category, ListPrice).',
    source: `${DATA_SOURCE_NOTE} The records are synthetic practice data; no external company data was used.`,
    approach: [
      'Check unique order IDs, date validity, positive quantities and unit prices.',
      'Calculate line revenue as Quantity × UnitPrice.',
      'Join sales to product details using ProductID.',
      'Aggregate revenue by month, product and region; reconcile totals between Excel and SQL.',
    ],
    dashboard:
      'KPI cards for revenue, orders, units sold and average order value; a monthly revenue trend; product/category and regional revenue charts; date, region and category filters.',
    findings:
      'The supplied sample contains 600 orders and calculated revenue of £360,831.19. Product P01 (Laptop) is the highest-revenue product in this dataset.',
    recommendations:
      'Review product contribution and monthly movement before planning promotions or stock. Compare revenue with costs and margins before deciding which products are most profitable.',
    sql: '01_sales_performance.sql',
  },
  {
    id: 'project-02',
    no: '02',
    category: 'data',
    title: 'Customer Behaviour and Segmentation Analysis',
    question: 'Who are the customers, and how differently do they spend?',
    image: img02,
    metrics: [
      { value: '150', label: 'customers' },
      { value: '900', label: 'transactions' },
    ],
    overview:
      'This analysis groups customers by transaction count and total spend, then compares the resulting groups across regions and customer types.',
    problem:
      'Reviewing every transaction separately makes it hard to see broader customer patterns. Spend bands provide a simple starting point for comparing customer groups and deciding what to investigate next.',
    objectives: [
      'Calculate transaction count and total spend for each customer.',
      'Apply transparent spend bands.',
      'Compare customer distribution and spending by region.',
      'Visualise segment profiles.',
    ],
    dataset:
      'customers.csv (150 customers; CustomerID, Region, CustomerType) and customer_transactions.csv (900 transactions; TransactionID, CustomerID, TransactionDate, Amount).',
    source: `${DATA_SOURCE_NOTE} All records are synthetic and generated for practice.`,
    approach: [
      'Validate unique customer and transaction IDs and check transaction amounts.',
      'Aggregate transaction count and spend by CustomerID.',
      'Apply the documented spend bands: Low £0–£199.99, Medium £200–£499.99 and High £500+.',
      'Compare segment counts and spend, then check the distribution before interpreting the groups.',
    ],
    dashboard:
      'Customer, total spend and average spend KPI cards; a segment distribution chart; spend by segment and region; a purchase-count-versus-spend scatter plot; region, customer type and date filters.',
    findings:
      'The practice dataset includes 150 customers and 900 transactions. Under the stated spend bands, the sample has 1 Low, 11 Medium and 138 High spend customers.',
    recommendations:
      'Review the small Low and Medium groups, compare customer types and purchase frequency, and test targeted engagement actions with a measurable baseline.',
    sql: '02_customer_segmentation.sql',
  },
  {
    id: 'project-03',
    no: '03',
    category: 'data',
    title: 'Financial Performance and Budget Analysis',
    question: 'Where is spending drifting away from the plan?',
    image: img03,
    metrics: [
      { value: '£2.06M', label: 'budget' },
      { value: '£36.7k', label: 'underspend' },
    ],
    overview:
      'This project compares planned budgets with recorded expenditure by department and month, then identifies where actual spending is above or below plan.',
    problem:
      'Budget owners need to see planned and actual figures on the same basis. A consistent comparison helps them identify differences that may need context or follow-up.',
    objectives: [
      'Compare budget and actual expenditure by department and month.',
      'Calculate variance and budget utilisation.',
      'Identify material differences across the reporting period.',
      'Present the results in a financial reporting dashboard.',
    ],
    dataset:
      'budget.csv (five departments across 12 months; Department, BudgetMonth, BudgetAmount) and actual_expenses.csv (ExpenseID, Department, ExpenseDate, ExpenseAmount).',
    source: `${DATA_SOURCE_NOTE} The budget and expense records are synthetic practice data.`,
    approach: [
      'Confirm that budget and actual values use the same currency and reporting periods.',
      'Aggregate expense transactions to department-month level before joining to the budget.',
      'Calculate variance as Budget minus Actual; a positive expense variance means spending is below budget.',
      'Check unmatched department-month records and reconcile annual totals.',
    ],
    dashboard:
      'KPI cards for budget, actual, variance and utilisation; a department budget-versus-actual chart; monthly trend lines; and a department/month variance matrix with filters.',
    findings:
      'The sample annual budget is £2,064,412.00 and actual expenditure is £2,027,731.01, producing a net underspend of £36,680.99.',
    recommendations:
      'Discuss significant over- and underspends with budget owners. Check timing, one-off costs and operational context before proposing any budget changes.',
    sql: '03_financial_budget_analysis.sql',
  },
  {
    id: 'project-04',
    no: '04',
    category: 'data',
    title: 'HR Data and Employee Attrition Analysis',
    question: 'How should attrition be measured so the number is fair?',
    image: img04,
    metrics: [
      { value: '250', label: 'employees' },
      { value: '42', label: 'leavers' },
    ],
    overview:
      'This project summarises employee records and exits, with particular attention to defining the reporting period and the denominator used for any attrition calculation.',
    problem:
      'Headcount and leaver figures can be misleading if active employees, exit dates and reporting periods are mixed together. The calculation also needs a clearly stated denominator.',
    objectives: [
      'Summarise employee counts by department and employment status.',
      'Review employee exits within a defined reporting period.',
      'Compare descriptive patterns by department and job role.',
      'Document a defensible attrition-rate calculation.',
    ],
    dataset: 'employees.csv (250 records; EmployeeID, Department, JobRole, HireDate, ExitDate, EmploymentStatus, Salary).',
    source: `${DATA_SOURCE_NOTE} All employee records are synthetic; they do not identify real people.`,
    approach: [
      'Check EmployeeID uniqueness and the logic of hire and exit dates.',
      'Separate active employees from employees marked Left.',
      'Filter exits to a stated reporting period.',
      'For a formal attrition rate, divide leavers in the period by average headcount or the agreed HR denominator.',
    ],
    dashboard:
      'Active headcount, leavers and defined attrition-rate cards; headcount by department; exits by department; monthly exit trend; department/status matrix.',
    findings: 'The synthetic employee file contains 250 records: 208 marked Active and 42 marked Left.',
    recommendations:
      'Discuss observed exit patterns with HR stakeholders and review exit reasons where available. Treat department and role comparisons as descriptive rather than proof of cause.',
    sql: '04_hr_attrition.sql',
  },
  {
    id: 'project-05',
    no: '05',
    category: 'business',
    title: 'Business Requirements Analysis',
    question: 'How does a vague request become something testable?',
    image: img05,
    metrics: [
      { value: '10', label: 'requirements' },
      { value: '4', label: 'still open' },
    ],
    overview:
      'This case study turns a simulated stakeholder request into prioritised requirements, user stories and acceptance criteria that can be checked during delivery.',
    problem:
      'If a request is not recorded clearly, stakeholders and delivery teams may have different expectations. A structured requirements record helps make the expected outcome testable.',
    objectives: [
      'Define the case-study scope and identify stakeholder groups.',
      'Document and prioritise requirements.',
      'Create user stories and measurable acceptance criteria.',
      'Maintain traceability from each requirement to validation.',
    ],
    dataset: 'requirements_register.csv (10 sample requirements; RequirementID, RequirementName, RequirementType, Priority, Status).',
    source:
      'Requirements register included in Bhargavi_Project_Datasets.xlsx and the matching CSV. This is a simulated customer-management-system case study, not a real client engagement.',
    approach: [
      'Set out the case-study context, scope, assumptions and exclusions.',
      'Identify stakeholder roles and capture needs.',
      'Classify business, functional and non-functional requirements.',
      'Prioritise requirements, write acceptance criteria and map requirement IDs to test scenarios in a requirements traceability matrix.',
    ],
    dashboard:
      'The main deliverables are a requirements document, user-story backlog and traceability matrix. An optional status dashboard can show total, open and completed requirements, priority distribution and requirement status.',
    findings: 'The sample register contains 10 requirements: 4 Open, 2 Approved, 2 In Progress and 2 Completed.',
    recommendations:
      'Review open questions with stakeholders, confirm priorities and link every requirement to an acceptance test. Record approvals and later change requests.',
    sql: '05_business_requirements.sql',
  },
  {
    id: 'project-06',
    no: '06',
    category: 'business',
    title: 'Sales Process Improvement',
    question: 'Where do enquiries stall before they are approved?',
    image: img06,
    metrics: [
      { value: '300', label: 'enquiries' },
      { value: '103', label: 'approved' },
    ],
    overview:
      'This case study maps the steps from customer enquiry to quotation and approval. It reviews hand-offs and suggests practical ways to make ownership and follow-up clearer.',
    problem:
      'When ownership is unclear or updates are delayed, enquiries can stall between quotation and approval. Mapping the workflow helps show where follow-up responsibilities need to be clearer.',
    objectives: [
      'Map the current (As-Is) sales process.',
      'Review enquiry sources and quotation outcomes.',
      'Measure elapsed time where reliable timestamps are available.',
      'Propose a future-state process and monitoring measures.',
    ],
    dataset:
      'sales_enquiries.csv (300 enquiries), quotations.csv (300 quotations) and approvals.csv (approval records). Fields include enquiry dates/source, quotation date/amount/status and approval date/status.',
    source: 'The matching workbook sheets and CSV files in the supplied portfolio dataset pack. All records are synthetic practice data.',
    approach: [
      'Define the process boundaries and each stage.',
      'Check missing timestamps and status consistency.',
      'Calculate enquiry-to-quotation elapsed time for matched records with valid dates.',
      'Summarise enquiry sources and quotation outcomes, then map hand-offs and decision points.',
    ],
    dashboard:
      'KPI cards for enquiries, quotations, approved quotations and average preparation time; an enquiry-to-quotation-to-approval funnel; enquiries by source; quotation status; monthly enquiry trend.',
    findings: 'The sample contains 300 enquiries and 300 quotations. Quotation statuses are 103 Approved, 94 Pending and 103 Rejected.',
    recommendations:
      'Consider standardised enquiry capture, clear approval ownership, consistent status definitions and follow-up reminders. Validate any bottleneck with process owners before changing the workflow.',
    sql: '06_sales_process_improvement.sql',
  },
  {
    id: 'project-07',
    no: '07',
    category: 'business',
    title: 'Customer Retention Analysis',
    question: 'What does a cancellation rate actually mean?',
    image: img07,
    metrics: [
      { value: '150', label: 'subscriptions' },
      { value: '42', label: 'cancelled' },
    ],
    overview:
      'This analysis reviews subscription status, cancellation dates and tenure to explain how customer cancellations should be measured over a defined period.',
    problem:
      'A customer cancellation rate only has meaning when the reporting period, eligible customer base and cancellation definition are agreed first.',
    objectives: [
      'Define the eligible customer base and cancellation event.',
      'Count cancellations in a selected reporting period.',
      'Review cancellations by month and customer group where fields allow.',
      'Calculate tenure and identify areas for further investigation.',
    ],
    dataset:
      'subscriptions.csv (150 subscription records; SubscriptionID, CustomerID, StartDate, EndDate, Status) joined with customers.csv for region and customer type.',
    source: `${DATA_SOURCE_NOTE} The subscription and customer records are synthetic practice data; the sample uses one subscription per customer.`,
    approach: [
      'Check subscription start/end dates and status values.',
      'Define the reporting period and customers eligible at its start.',
      'Count distinct eligible customers who cancel during that period.',
      'Calculate the cancellation rate using the stated denominator and review results by month and customer segment.',
    ],
    dashboard:
      'Eligible customer base, cancelled customers and cancellation-rate KPI cards; monthly cancellations by region/customer type; tenure bands; period and customer filters.',
    findings:
      'The synthetic subscription data contains 150 records: 108 Active and 42 Cancelled. The status split alone is not a period cancellation rate.',
    recommendations:
      'Review groups with higher cancellation rates, examine customer feedback and test retention actions against a defined baseline and comparison group.',
    sql: '07_customer_retention.sql',
  },
  {
    id: 'project-08',
    no: '08',
    category: 'business',
    title: 'Inventory and Supply Chain Analysis',
    question: 'Which stock needs attention before it runs out?',
    image: img08,
    metrics: [
      { value: '6', label: 'products tracked' },
      { value: '0', label: 'below reorder' },
    ],
    overview:
      'This project reviews stock levels, reorder thresholds and recorded stock movement to support inventory monitoring and replenishment discussions.',
    problem:
      'When stock records are incomplete or inconsistent, it becomes harder to spot replenishment needs and explain changes in stock levels.',
    objectives: [
      'Summarise stock by product and warehouse.',
      'Flag products at or below reorder level.',
      'Review purchase and sales movement.',
      'Document data limitations and monitoring recommendations.',
    ],
    dataset: 'inventory.csv (ProductID, WarehouseID, StockQuantity, ReorderLevel), products.csv, purchases.csv and inventory_sales.csv.',
    source: `${DATA_SOURCE_NOTE} The stock snapshot and transactions are synthetic practice data.`,
    approach: [
      'Confirm the stock snapshot date and warehouse grain.',
      'Check product IDs, duplicate rows and negative quantities.',
      'Compare stock quantity with reorder level.',
      'Aggregate purchases and sales by period and document missing transfers, returns or adjustments.',
    ],
    dashboard:
      'KPI cards for stock units, products tracked and low-stock products; stock by product/category charts; monthly units sold; exception table showing stock, reorder level and flag.',
    findings: 'The supplied snapshot tracks six products and flags zero products at or below reorder level.',
    recommendations:
      'Review reorder thresholds with buyers and consider lead times and service-level targets before changing reorder points. Improve recording of receipts, returns and transfers.',
    sql: '08_inventory_supply_chain.sql',
  },
];

export const categoryLabels = {
  data: 'Data Analytics',
  business: 'Business Analysis',
};

# Al Rawabi Group
## SAP Pre-Discovery Finance & Controlling (FI/CO) Process Analysis

**Document Type:** Workshop Findings Analysis  
**Workshop Date:** January 21, 2026  
**Session:** Finance & Controlling (FI/CO)  
**Prepared by:** NXSYS Discovery Team

---

## Executive Summary

This document captures detailed findings from the Pre-Discovery Finance & Controlling workshop conducted with Emirates Al Rawabi Group. The workshop covered financial organizational structure, chart of accounts, consolidation processes, management accounting (controlling), and cost management across all group entities spanning the Dairy/Juice Division and Poultry Division.

**Key Finding:** Al Rawabi currently operates 7 company codes (expanding to 8) with a single controlling area in SAP ECC. Financial processes are mature with actual costing and CO-PA live, but consolidation is Excel-based, intercompany transactions are not automated, and master data is fragmented across entities. The planned S/4HANA transformation presents an opportunity to standardize chart of accounts, automate intercompany processes, and implement SAP Group Reporting for consolidated financial statements.

**Critical Business Impact:** The current decentralized approach to master data, manual consolidation, and lack of automated intercompany processing creates audit risk, inefficiency, and delayed month-end close. With corporate tax now applicable in UAE and VAT compliance requirements, automated intercompany reconciliation and proper transfer pricing documentation are essential.

---

## 1. Organizational Structure

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Group Structure** | Emirates Al Rawabi is the holding company owning all subsidiaries (100% or 99.9% ownership). Two divisions: Dairy/Juice and Poultry. | • Clear legal entity hierarchy<br>• Ownership documentation<br>• Segment reporting alignment |
| **Company Codes** | 7 company codes currently, expanding to 8 with Kizad. Company code numbering: Al Rawabi entities start with "2", Emirates Rawabi "1000", Greenfield "7xxx", Kizad "5000". | • Standardized naming convention<br>• Logical grouping<br>• Scalable structure |
| **Dairy/Juice Division** | 4 entities: Al Rawabi Dairy, Kizad (new manufacturing), Oman, Sudan. "Dairy Division includes Al Rababi Dairy, Izhar, Oman, Sudan." | • Division-level reporting<br>• Segment consolidation<br>• Geographic separation |
| **Poultry Division** | 3 entities: ENF, Al Salwa (Liwa), Greenfields. "Poultry Division consists of ENF, Al Salwa, Green Field." All managed as single poultry division for costing and elimination. | • Integrated division management<br>• Intercompany elimination<br>• Division P&L |
| **Foreign Entities** | Oman (operates through agent, legally separate) and Sudan (USD reporting). "Oman is considered a foreign branch for tax purposes." Qatar closed, no transactions. | • Foreign branch accounting<br>• Currency translation<br>• Tax compliance |
| **New Entities** | Kizad manufacturing company being established. Will operate as full entity with own operations. | • Proper entity setup<br>• Integration planning<br>• Go-live coordination |

---

## 2. Chart of Accounts

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Chart of Accounts Structure** | Two separate charts of accounts: one unified for most entities (Al Rawabi Dairy, ENF), one separate for Greenfield "due to its independent operational structure." | • Single operational COA<br>• Standardized account structure<br>• Group mapping |
| **Operational vs Group COA** | Intention to standardize: "Operational Chart of Accounts (A): Same for all entities, ensuring consistency. Group Chart of Accounts (B): Used for consolidation." | • Operational COA for transactions<br>• Group COA for reporting<br>• Automated mapping |
| **Account Numbering** | Different numbering conventions across entities. "Materials are currently coded differently across companies (same material may have different codes)." | • Standardized numbering<br>• Cross-entity consistency<br>• Clear account hierarchy |
| **Financial Reporting Basis** | IFRS-based financial reporting. "Financial reporting is based on IFRS." Legal ledger configuration is 0L. | • IFRS compliance<br>• Consistent policies<br>• Disclosure requirements |
| **Future State** | "Goal to consolidate and standardize the chart of accounts across the group for better integration and reporting." | • Single source of truth<br>• Simplified maintenance<br>• Audit efficiency |

---

## 3. Ledger Configuration

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Ledger Setup** | Single main ledger (0L), no extension ledgers or parallel ledgers. "Only one main ledger (no extension or multiple ledgers)." | • Leading ledger for primary GAAP<br>• Non-leading for secondary if needed<br>• Extension for specific needs |
| **Parallel Currency** | Currently no parallel currency for management reporting. "May be revisited during implementation." Primary reporting in AED. | • Group currency (AED)<br>• Local currency where different<br>• Hard currency (USD) if needed |
| **Document Splitting** | Document splitting may already be active. "Inquiry: Is document splitting utilized for real-time integration?" Inter-profit center transactions occur. | • Active document splitting<br>• Profit center balance sheet<br>• Segment reporting enabled |
| **Currency by Entity** | UAE: AED, Oman: OMR, Sudan: USD. "Most operations are consolidated in AED, with foreign currency transactions managed as needed." | • Local currency per entity<br>• Group currency translation<br>• Exchange rate management |

---

## 4. Consolidation

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Current Consolidation Method** | Excel-based consolidation. "Consolidation is primarily performed using Excel, with all reports generated in AED." No dedicated software. | • SAP Group Reporting<br>• Automated data flow<br>• Real-time consolidation |
| **Consolidation Frequency** | Monthly consolidation for management reporting. "Trial balances from entities are aggregated to present a unified view." | • Monthly close<br>• Flash reporting capability<br>• On-demand consolidation |
| **Intercompany Elimination** | Manual identification and elimination. "Effective consolidation relies on meticulous groundwork, including understanding transaction flows and pricing." | • Automated IC matching<br>• Rule-based elimination<br>• Variance reporting |
| **Group Reporting Opportunity** | S/4HANA Group Reporting module identified. "Transaction-level data is transferred to System B, not just trial balances... allowing for detailed analysis." | • Drill-down to transaction<br>• Entity-level detail<br>• Segment reporting |
| **ICMR Capability** | Intercompany Reconciliation (ICMR) discussed. "Users can define rules for ICMR, which automates the elimination process between entities." | • Document-level matching<br>• Automatic elimination<br>• Variance investigation |

---

## 5. Intercompany Transactions

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Current IC Processing** | Processed as regular buyer-supplier transactions. "Numerous inter-company transactions; however, they are processed as regular buyer-supplier transactions in the system." | • Automated IC orders<br>• STO with billing<br>• One-step processing |
| **IC Invoicing** | Invoices generated for VAT compliance. "From a financial perspective, invoices are necessary for VAT compliance." Not automated in SAP. | • Automatic IC invoicing<br>• VAT-compliant structure<br>• Digital invoicing |
| **Trading Partner Configuration** | "Accurate identification of trading partners in inter-company transactions is crucial for automatic consolidation." Current setup may not be optimized. | • Trading partner in master data<br>• Automatic IC identification<br>• Reconciliation support |
| **Transfer Pricing** | No formal transfer pricing between entities. "No transfer pricing is conducted between entities." Oman uses cost-to-cost basis. | • Arm's length pricing<br>• Transfer pricing documentation<br>• Tax compliance |
| **IC Loans** | Inter-company loans exist with interest charged. "Including inter-company loans with interest charged." Between Oman and UAE entities. | • Formal loan agreements<br>• Interest rate documentation<br>• Elimination at consolidation |

---

## 6. Tax Configuration

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **VAT Status** | VAT registered, invoices required for compliance. "Invoices are necessary for VAT compliance." Group VAT filing being explored. | • Proper tax codes<br>• Input/output VAT tracking<br>• Return automation |
| **Group VAT** | "Plans for group VAT filing are being explored but have not yet been implemented." Potential for centralized VAT management. | • Group VAT registration<br>• Centralized filing<br>• IC transaction exclusion |
| **Corporate Tax** | UAE corporate tax now applicable. "Maintaining separate entities will aid in compliance with corporate tax regulations." | • Tax entity structure<br>• Transfer pricing policy<br>• Tax provision calculation |
| **Tax by Entity** | Separate tax classes for Al Rawabi entities. "Oman has local tax considerations. Sudan has no tax implications currently." | • Entity-specific tax rules<br>• Local compliance<br>• Group tax planning |
| **DRC (Digital Reporting)** | Evaluated SAP DRC for tax reporting. "DRC operates independently of the specific ERP product being used." Not yet implemented. | • E-invoicing readiness<br>• FTA integration<br>• Automated submission |

---

## 7. Controlling Area Structure

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Controlling Areas** | Single controlling area for all company codes. "Currently, there is only one controlling area defined in the system." All 7 company codes assigned. | • Single controlling area<br>• Unified management view<br>• Cross-company allocation |
| **Controlling Area Currency** | AED as controlling area currency (group currency). "The controlling area currency is AED, which is the group currency." | • Group currency standard<br>• Consistent valuation<br>• Comparable reporting |
| **Operating Concern** | One operating concern assigned. "There is one operating concern assigned to the controlling area." CO-PA is active. | • Single operating concern<br>• Consistent characteristics<br>• Cross-entity analysis |
| **Cross-Company Reporting** | Single controlling area enables unified CFO view. "A single controlling area will consolidate financial and management reporting across all entities." | • Group-level analysis<br>• Division comparison<br>• Segment reporting |
| **Future State** | "Intention is to maintain the current structure with only one controlling area. No plans to consolidate controlling areas." | • Stable structure<br>• S/4HANA compatible<br>• Minimal disruption |

---

## 8. Cost Center Accounting

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Cost Center Hierarchy** | Single hierarchy with holding company at top. "Cost center hierarchy consists of a single hierarchy with the holding company at the highest level, followed by branches." | • Standard hierarchy structure<br>• Organizational alignment<br>• Reporting levels |
| **Cost Center Scope** | Cost centers are company code-specific. "Cost centers are specific to each company code." Used for overhead tracking and allocation. | • Consistent naming convention<br>• Clear ownership<br>• Budget accountability |
| **Cost Allocation** | Internal allocation within cost centers. "Cost allocation is performed within cost centers, not between controlling areas." No cross-company allocation needed. | • Activity-based allocation<br>• Periodic assessment<br>• Variance analysis |
| **Statistical Key Figures** | Not utilized. "Statistical key figures are not utilized; therefore, they are not needed for our processes." No allocation based on SKF. | • Activity-based approach<br>• Direct allocation<br>• Simplified maintenance |

---

## 9. Profit Center Accounting

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Profit Center Structure** | Categorized by segments: Dairy, Juice, Bakery, Trading. Further divided by Distribution Centers (Sharjah, Abu Dhabi, Dubai). | • Segment alignment<br>• Geographic granularity<br>• Performance tracking |
| **Total Profit Centers** | 35 profit centers total. "8 profit centers from combination of line of business and DCs. Each production plant is also treated as a profit center." | • Manageable number<br>• Clear ownership<br>• Meaningful reporting |
| **Segment Hierarchy** | Profit center assigned to segments, segments above profit centers. "Separate segments defined in controlling (e.g., daily segments)." | • Segment reporting enabled<br>• IFRS 8 compliance<br>• Management view |
| **Profit Center Span** | Profit centers can span multiple company codes. "Profit centers can span multiple companies, allowing for revenue tracking across segments." | • Cross-company analysis<br>• Division-level P&L<br>• Consistent definitions |
| **Access Control** | Authorizations based on profit centers and cost centers. "Access control will manage visibility of financial data based on team roles (e.g., Dairy Team vs. Poultry Team)." | • Role-based access<br>• Data security<br>• Audit compliance |

---

## 10. Profitability Analysis (CO-PA)

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **CO-PA Status** | Live and active. "COPA is live and active, utilizing a controlling-based approach in the ACC system." | • Account-based CO-PA in S/4HANA<br>• Real-time profitability<br>• Margin analysis |
| **CO-PA Type** | Costing-based CO-PA in ECC. Will need consideration for S/4HANA migration (account-based is standard). | • Account-based in S/4HANA<br>• Unified valuation<br>• Simplified reconciliation |
| **Characteristics** | Used for management reporting dimensions. Product type (Fresh/Frozen), segments, distribution centers tracked. | • Customer/product/region<br>• Sales organization<br>• Distribution channel |
| **Value Fields** | Revenue, cost of sales, margin tracking. Actual costing feeds into CO-PA. | • Revenue by type<br>• Cost components<br>• Contribution margin |
| **Reporting** | Management reporting for profitability by segment, product, region. "COPA will be utilized for management reporting." | • Multi-dimensional analysis<br>• Drill-down capability<br>• Executive dashboards |

---

## 11. Product Costing

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Costing Method** | Standard costing with actual costing run. "Actual costing is run monthly to allocate overheads to products, ensuring accurate COGS and revenue reporting." | • Standard cost planning<br>• Actual cost variance<br>• Periodic revaluation |
| **Material Ledger** | Active and running actual costing. "The material ledger is active, and actual costing is running." | • ML for actual costing<br>• Actual cost component split<br>• Inventory revaluation |
| **Cost Components** | Direct costs (material, labor) and overhead costs included. "Direct costs (material, labor) and overhead costs are included in the product cost." | • Material costs<br>• Activity-based labor<br>• Overhead absorption |
| **Activity Types** | 5 activity types defined: Material rates, Labor rates, Depreciation, Maintenance, Utilities, Overheads. | • Activity-based costing<br>• Rate planning<br>• Variance analysis |
| **Overhead Calculation** | Fixed rates applied to activities consumed. "Overhead calculations are based on fixed rates applied to activities consumed." | • Planned overhead rates<br>• Actual rate calculation<br>• Over/under absorption |

---

## 12. Planning & Budgeting

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Planning Tool** | SAP Analytics Cloud (SAC) for planning. "SAC planning is currently live and actively in use." | • Integrated planning<br>• Driver-based models<br>• Scenario analysis |
| **Planning Process** | Planning performed outside SAP, uploaded to GL and cost centers. "Sales volume is multiplied by sales values, and data is uploaded to the financial module." | • Bottom-up/top-down planning<br>• Rolling forecasts<br>• Version management |
| **Budget Upload** | Planning numbers uploaded to financial GL and cost center modules. "Planning numbers are uploaded into the financial GL and cost center modules." | • Automated integration<br>• Plan/actual comparison<br>• Variance reporting |
| **CAPEX Budgeting** | Internal orders used for CAPEX budgeting. "Internal orders linked to assets are primarily used for budgeting purposes to ensure expenditures do not exceed allocated budgets." | • Investment program<br>• Budget availability check<br>• Approval workflow |

---

## 13. Internal Orders

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Usage** | Internal orders used for expense tracking (vehicles) and asset acquisition. "Internal orders are utilized for tracking expenses, particularly for vehicles." | • Cost collection<br>• Budget control<br>• Settlement to receivers |
| **Asset Acquisition** | Internal orders created for all assets including AUC. "Internal orders are created for all assets, including Assets Under Construction (AUC)." | • Investment orders<br>• CWIP tracking<br>• Automatic capitalization |
| **CWIP Process** | Projects treated as CWIP assets until completion and capitalization. "Costs incurred before capitalization are tracked as Construction Work in Progress (CWIP)." | • WBS for projects<br>• Phase-based capitalization<br>• Settlement automation |
| **Budget Control** | Budget applied to internal orders to control expenditure. "Ensure that expenditures do not exceed allocated budgets for projects or investments." | • Budget availability check<br>• Tolerance limits<br>• Exception reporting |

---

## 14. Asset Accounting

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Depreciation Method** | Straight-line depreciation for all assets. "Currently, asset accounting is done using the straight-line method." | • Multiple methods available<br>• Asset class-specific<br>• Tax/book difference |
| **Livestock Treatment** | Treated as inventory, revalued at year-end. "Livestock treated as inventory, revalued at year-end." Not in asset accounting. | • IAS 41 biological assets<br>• Fair value measurement<br>• Separate sub-ledger |
| **Production-Based Depreciation** | Future consideration for Kizad. "Explore production-based depreciation for buildings and assets related to livestock." | • Usage-based depreciation<br>• Production unit method<br>• Asset utilization |
| **Asset Under Construction** | CWIP tracked via internal orders. "Projects are treated as CWIP assets until they are completed and capitalized." | • Automatic settlement<br>• Phase capitalization<br>• Cost collection |

---

## 15. Bank Accounting & Cash Management

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Bank Account Structure** | Separate bank accounts for each entity. "Each entity has separate bank accounts." Managed independently. | • House bank per entity<br>• Account determination<br>• Reconciliation automation |
| **Credit Facilities** | Plan to centralize at group level. "Credit facilities will be centralized at the government level." Currently entity-specific. | • Group treasury<br>• Centralized borrowing<br>• Intercompany loans |
| **Cash Management** | Future plans for treasury module. "Implement a treasury module for centralized cash management and liquidity forecasting." | • SAP Treasury<br>• Cash pooling<br>• Liquidity planning |
| **Bank Reconciliation** | Entity-level reconciliation. Manual processes currently. | • Automatic reconciliation<br>• BAI2/MT940 integration<br>• Exception handling |

---

## 16. Master Data Governance

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Vendor Master** | Maintained separately per company code. "Vendor and customer master data are maintained separately for each company code." Duplications exist. | • Centralized vendor master<br>• Business partner model<br>• Single source of truth |
| **Customer Master** | Separate across company codes. "Currently, vendors and customers exist separately across different company codes." | • Centralized customer master<br>• BP integration<br>• Consistent classification |
| **Material Master** | Different codes across companies. "Materials are currently coded differently across companies." Same material may have different codes. | • Global material master<br>• Cross-plant consistency<br>• Standardized naming |
| **Governance Framework** | Emphasis on establishing governance. "Implement a master data governance framework to manage customer, vendor, and supplier data effectively." | • Master data owners<br>• Change control process<br>• Data quality monitoring |
| **Finance Role** | Finance should focus on oversight, not data entry. "Finance team should not be responsible for routine data entry but should focus on oversight and exception management." | • Empowered finance team<br>• Exception management<br>• Variance investigation |

---

## 17. Business Areas & Segments

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Business Area Usage** | Used for sales transactions to identify regional sales (Sharjah, Rawabi). "Not used for financial transactions." | • Consistent derivation<br>• Clear business meaning<br>• Reporting alignment |
| **Segment Definition** | Segments defined: Dairy, Poultry, Juices, Trading, Bakery, TMR. "Separate segments defined in controlling." | • IFRS 8 alignment<br>• Management reporting view<br>• Consistent across entities |
| **Product Types** | Fresh Products (FP), Frozen Products (PP) tracked separately. "Product Types: Fresh Products (FP), Frozen Products (PP)." | • Product hierarchy<br>• Profitability analysis<br>• Inventory valuation |
| **Segment Reporting** | Profit center assigned to segments for segment reporting capability. | • Balance sheet by segment<br>• P&L by segment<br>• Segment disclosure |

---

## 18. Period-End Close

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Fiscal Year** | Calendar year (January to December), fiscal year variant "K". "Configuration: K for calendar year (January to December) for all entities." | • Consistent across entities<br>• Clear period calendar<br>• Year-end alignment |
| **Special Periods** | 4 special periods defined. "12 months (January to December) plus 4 special periods." For year-end adjustments. | • Audit adjustments<br>• Restatements<br>• Closing entries |
| **Close Sequence** | Period and closing sequence documentation to be provided. "Document outlining period and closing activities for each entity is required." | • Documented close calendar<br>• Task ownership<br>• Deadline management |
| **Actual Costing Run** | Monthly actual costing to allocate overheads. "Actual costing is run monthly to allocate overheads to products." | • Consistent timing<br>• Variance analysis<br>• CO-PA update |

---

## Summary of Critical Gaps

### Organizational & Structural Gaps
1. **Two Charts of Accounts:** Greenfield separate from other entities - consolidation complexity
2. **Excel-Based Consolidation:** Manual, error-prone, not scalable
3. **No Automated Intercompany:** IC transactions processed as buyer-supplier
4. **Fragmented Master Data:** Vendors, customers, materials duplicated across company codes

### Tax & Compliance Gaps
5. **No Group VAT Filing:** Each entity files separately despite common ownership
6. **Transfer Pricing Gap:** No formal transfer pricing policy or documentation
7. **Corporate Tax Readiness:** New UAE corporate tax requires proper entity structure

### Controlling & Costing Gaps
8. **Costing-Based CO-PA:** Will need migration consideration for S/4HANA (account-based)
9. **Livestock Not in Assets:** Biological assets treated as inventory, not IAS 41 compliant
10. **External Planning Upload:** SAC planning not integrated with SAP execution

### System & Process Gaps
11. **No Treasury Module:** Cash management and liquidity forecasting manual
12. **No DRC Implementation:** E-invoicing readiness not achieved
13. **Document Splitting Unclear:** Status needs confirmation for profit center balance sheet

---

## Recommendations

### 1. Chart of Accounts Standardization
- Implement single operational chart of accounts across all 8 entities
- Map to group chart of accounts for consolidated reporting
- Migrate Greenfield to unified COA during S/4HANA transformation

### 2. SAP Group Reporting Implementation
- Replace Excel consolidation with SAP Group Reporting
- Enable transaction-level drill-down
- Automate intercompany elimination via ICMR

### 3. Intercompany Process Automation
- Implement SAP intercompany sales/purchase automation
- Configure trading partner in business partner master
- Enable automatic IC invoicing for VAT compliance

### 4. Master Data Governance
- Migrate to SAP Business Partner model
- Implement global material master
- Establish master data governance council with data owners

### 5. Tax Compliance Enhancement
- Evaluate group VAT registration
- Document transfer pricing policy for IC transactions
- Implement DRC for e-invoicing readiness

### 6. Biological Asset Accounting
- Implement IAS 41-compliant biological asset accounting for poultry
- Consider SAP Livestock Management for ENF and Salwa
- Enable fair value measurement and amortization automation

### 7. Treasury & Cash Management
- Implement SAP Treasury for centralized cash management
- Enable cash pooling across entities
- Integrate bank statements for automatic reconciliation

---

## Implementation Considerations for S/4HANA

| Area | Current ECC State | S/4HANA Consideration |
|------|------------------|----------------------|
| **CO-PA** | Costing-based active | Account-based CO-PA is default in S/4HANA - migration planning required |
| **Material Ledger** | Active, actual costing | ML mandatory in S/4HANA - already aligned |
| **New GL** | Single ledger, document splitting status unclear | Universal Journal provides integrated view |
| **Business Partner** | Separate vendor/customer | BP mandatory - migration required |
| **Chart of Accounts** | Two COAs | Opportunity to standardize |
| **Group Reporting** | Excel-based | Native S/4HANA functionality available |
| **Planning** | SAC (already implemented) | Good foundation, enhance integration |

---

*Document generated from NXSYS Pre-Discovery Workshop Sessions - Finance & Controlling*  
*Prepared by: NXSYS AI-Powered Discovery Engine™*

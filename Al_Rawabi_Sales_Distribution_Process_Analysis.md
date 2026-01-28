# Al Rawabi Dairy Company
## SAP Pre-Discovery Sales & Distribution Process Analysis

**Document Type:** Workshop Findings Analysis  
**Workshop Date:** January 22-23, 2026  
**Session:** Sales & Distribution (SD)  
**Prepared by:** NXSYS Discovery Team

---

## Executive Summary

This document captures detailed findings from the Pre-Discovery Sales & Distribution workshop conducted with Al Rawabi Dairy Company. The analysis reveals that the current SAP SD implementation operates as a "shell" system with most operational intelligence residing in the external Van Sales system (Ransale/RISA). While the van sales operation has robust controls at the back-office level, SAP lacks visibility into route-level operations, inventory movements, and real-time sales data.

**Key Finding:** SAP is used primarily as a financial posting system rather than an operational sales management tool. The Van Sales back-office system (Ransale) functions as a "mini-ERP" managing the majority of sales operations including pricing, promotions, credit, returns, and route management - with SAP receiving only end-of-day summarized transactions.

---

## 1. Van Sales Operations & Route Management

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Primary Sales Channel** | Van sales represents 95-100% of dairy sales through approximately 300+ routes serving predefined customers. Van sales handles all finished goods including milk, yogurt (~300 SKUs), juices, and meat products. | • SAP DSD (Direct Store Delivery) with full route integration<br>• Real-time route visibility and tracking<br>• GPS-enabled delivery management |
| **Van Sales System** | External system "Ransale" (also called RISA/Vansale) manages all van operations. SAP does not know routes - only Distribution Centers (DCs). Routes are NOT created as locations in SAP. | • Routes defined as ship-to locations in SAP<br>• Van inventory tracked at route level<br>• Real-time stock visibility per van |
| **Route as Location** | "We did not create route as a location, entire reconciliation everything stop reconciliation will be in DC level." SAP has no visibility of individual van inventory. | • Each van/route as separate storage location<br>• STO-based van loading<br>• Real-time van stock tracking |
| **Device Management** | Handheld devices (PDC - Pocket PC) operate in offline mode throughout the day. Morning sync downloads master data; evening sync uploads all transactions. | • Online/real-time device connectivity<br>• Cloud-based van sales with continuous sync<br>• Real-time visibility of van activities |
| **Online Connectivity** | Currently offline mode. Project underway to move to 24x7 online mode with "Swarn's project" for cloud migration to enable real-time back-office reflection. | • Always-connected devices<br>• Real-time transaction posting<br>• Live inventory visibility |
| **Journey Planning** | Using RoadNet for route optimization but temporarily stopped due to master data quality issues (customer locations not 100% accurate). High volume of new customer onboarding (6,000-7,000 deliveries daily) making optimization difficult. | • Integrated route optimization<br>• Dynamic route adjustment<br>• Automated customer slot management |
| **Start of Day Process** | Device receives opening stock, customer list, prices, and promotions from back-office. Physical stock count required before salesman can start journey. Crate checkout also mandatory. | • Automated loading verification<br>• Barcode/RFID based stock confirmation<br>• Digital loading slip integration |
| **End of Day Settlement** | Comprehensive closure process: Stock count → Cash reconciliation → Crate check → Supervisor approval. System will not allow route closure without complete reconciliation. Any variance charged to salesman. | • Automated settlement workflows<br>• Exception-based supervisor review<br>• Integrated discrepancy handling |

---

## 2. Order Management & Fulfillment

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Order Concept** | "We do not have the order sales concept, we are doing directly delivery." No pre-orders captured in van sales system. Allocation happens based on offline communication (calls, emails, WhatsApp). | • Pre-order capture in system<br>• Order promising with ATP check<br>• Order-to-delivery tracking |
| **Sales Order in SAP** | Van sales creates sales orders in SAP, but these are posted AFTER the actual sale happens. Order is created from van sales data upload, not from customer request. Order-to-billing flow without delivery document. | • Sales order before delivery<br>• Delivery document creation<br>• Proof of delivery capture |
| **Delivery Document** | "There is no delivery involved in it." Van sales uses direct billing without SAP delivery notes. Custom movement types (Y13, Y14 copied from 601/602) used for inventory posting. | • Standard SAP delivery processing<br>• POD with signature capture<br>• Delivery-based billing |
| **Pull vs Push Sales** | 60-70% is "pull" (customer orders via LPO, phone, email - captured offline). Remaining is "push" (salesman selling available stock). Order collection is manual and not systematically recorded. | • All orders captured in system<br>• Order history and analytics<br>• Customer demand patterns |
| **Standing Orders** | Not mentioned as a formal concept. Daily orders come through manual communication channels and are allocated based on supervisor knowledge. | • Standing order management<br>• Automatic order generation<br>• Seasonal adjustment capability |
| **Order Fulfillment** | Van sales "currently is not operating as an order fulfillment tool. It only does van sales, goes sales and comes back." No true order fulfillment model except for e-commerce. | • Order promising and allocation<br>• Fulfillment tracking<br>• Backorder management |

---

## 3. Pricing & Promotions

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Pricing Engine** | Pricing procedures designed in Ransale back-office "similar to SAP pricing procedure." All pricing logic maintained in van sales system, not in SAP SD pricing. | • SAP condition technique<br>• Integrated pricing with finance<br>• Centralized price management |
| **Price Maintenance** | Prices defined and published in back-office system. Final calculated values pushed to devices, not the pricing logic itself. | • Condition records in SAP<br>• Price list versioning<br>• Validity period management |
| **Promotion Management** | Full promotion capability in Ransale: FOC (Free of Charge), bundling (1+1 free), discounts, trade-offs. "All the parameters is there" - designed to replicate SAP capabilities. | • SAP Trade Promotion Management<br>• Promotion effectiveness analytics<br>• Budget control integration |
| **Customer-Specific Pricing** | Customer pricing exists to differentiate between retail and HoReCa (same product, different prices). System controls which price applies based on customer classification. | • Customer hierarchy pricing<br>• Contract pricing<br>• Volume-based agreements |
| **Free Goods** | FOC invoices print list price with "100 percent discount" showing total as zero. VAT compliant invoice layout already implemented. | • Free goods determination<br>• Inclusive/exclusive free goods<br>• Promotion budget tracking |
| **Price Overrides** | Not specifically mentioned as a problem. Pricing appears controlled through the back-office system with predefined conditions. | • Override authorization controls<br>• Margin protection alerts<br>• Override reason capture |

---

## 4. Returns & Scrap Management

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Returns Processing** | Returns captured in van sales with reason codes: "good return, bad return" and "scrap quantities." Different inventory types used for classification. | • Returns order in SAP<br>• Quality inspection integration<br>• Credit memo automation |
| **Return Reason Codes** | Multiple inventory types in Ransale for returns classification. Return reasons captured at point of return but flow to SAP as summary transactions only. | • Detailed reason code analysis<br>• Root cause tracking<br>• Return reduction initiatives |
| **Returns Rate** | Poultry: Average 13% returns (industry benchmark 10-12%). Dairy: Not specifically stated but managed through end-of-day reconciliation. | • Target < 3-5% for dairy<br>• Daily returns monitoring<br>• Customer-level return analysis |
| **Near-Expiry Stock** | Previously had practice of selling near-expiry to HoReCa at lower prices. "We stopped the practice" - now single pricing for items. Near-expiry concept in van sales system exists but operation was stopped. | • Near-expiry stock segregation<br>• Alternate channel management<br>• Markdown optimization |
| **Scrap Handling** | Scrap quantities tracked in end-of-day settlement. Salesman charged for discrepancies. Scrap sales also happen directly from SAP for certain categories. | • Scrap reason categorization<br>• Scrap cost allocation<br>• Waste reduction tracking |
| **Quality Returns** | Returns from market come back but analysis not flowing to QM. Paper-based quality records. Returns do not trigger quality inspection in SAP. | • QM integration for returns<br>• Defect pattern analysis<br>• Supplier feedback loop |

---

## 5. Credit Management

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Credit Limit Control** | Credit limits maintained and controlled. Credit check happens in van sales system at time of sale. "Credit limit also" managed in back-office. | • SAP credit management<br>• Real-time exposure calculation<br>• Automatic credit block |
| **Credit Customers** | Credit customers tracked separately from cash customers. Finance team handles credit customer collections and payment terms. | • Customer risk categories<br>• Payment history scoring<br>• Dynamic credit adjustment |
| **Cash Collection** | Cash collected by salesman, reconciled at end-of-day, deposited at cash counter with receipt per route. Finance team involved in ensuring day closure. | • Driver collection tracking<br>• Cash variance alerts<br>• Bank deposit reconciliation |
| **Temporary Credit** | System allows issuing "temporary credit" through invoicing. Control maintained in SAP for credit management aspects. | • Pre-approved credit lines<br>• Temporary limit workflow<br>• Automatic limit restoration |
| **Real-Time Exposure** | Credit exposure visibility in back-office system, not SAP. Real-time credit position known in van sales but SAP sees only posted transactions. | • Real-time credit exposure<br>• Order-level credit check<br>• Multi-entity exposure view |
| **Branch Office Credit** | Question raised about head office vs branch office invoicing and credit management for customers with multiple locations. Credit limit maintained in SAP but complex scenarios unclear. | • Partner hierarchy for credit<br>• Consolidated exposure view<br>• Payment clearing rules |

---

## 6. Shelf-Life & FEFO Management

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Shelf-Life Tracking** | Shelf-life exists in van sales system. For meat: "Zero stock. Half load everything every day" - no carryover typically. Fresh dairy has short shelf life (7 days for milk). | • SLED management in SAP<br>• Batch-level expiry tracking<br>• Minimum remaining shelf-life rules |
| **FEFO Enforcement** | Not confirmed if FEFO is system-enforced. Near-expiry concept exists but operational practice was stopped. "Van sale is selling is there in van sale it is there. So you can see how much old a stock is." | • System-enforced FEFO picking<br>• Remaining shelf-life ATP<br>• Customer minimum shelf-life check |
| **Near-Expiry Visibility** | Van sales system shows stock age. Inventory type can be changed to "near expiry" in Ransale. However, physical control on ground is difficult. | • Stock aging reports<br>• Automatic near-expiry alerts<br>• Markdown triggers |
| **Customer Requirements** | Not specifically discussed whether major retailers require minimum remaining shelf-life (e.g., 70% remaining). | • Customer-specific SLED rules<br>• ATP with shelf-life check<br>• Delivery date optimization |
| **Fresh vs UHT Handling** | Fresh products (70% of business) have very different shelf-life than UHT. Planning and allocation must consider this difference. Poultry: 7-day shelf life for fresh chicken. | • Product category rules<br>• Differentiated picking strategies<br>• Channel-specific allocation |

---

## 7. E-Commerce Integration

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **E-Commerce Platform** | Magento Cloud for B2C e-commerce. Separate from van sales operations. "E-commerce channel is separate." | • Unified commerce platform<br>• Real-time inventory sync<br>• Omnichannel order management |
| **Order Capture** | Orders received in Magento, manually consolidated by a coordinator who creates one summary order in van sales as "e-commerce customer." | • Automatic order integration<br>• Real-time order flow<br>• Order status updates |
| **Fulfillment Process** | E-commerce orders NOT fulfilled through van sales routes. Separate "e-commerce route" with dedicated delivery. Pick-pack app exists for e-commerce order preparation. | • Dedicated e-commerce fulfillment<br>• Wave/batch picking<br>• Same-day delivery capability |
| **SAP Integration** | E-commerce sales do NOT flow to SAP directly. Posted through van sales system as internal customer. "In SAP or van sales, we are not creating any sales" directly from Magento. | • Real-time order integration<br>• Inventory allocation<br>• Revenue recognition |
| **Dark Stores** | Talabat dark stores mentioned as part of allocation but treated similar to van sales allocation. Stock requests may not come to SAP - auditable concern raised. | • Dark store as storage location<br>• Inventory visibility<br>• Last-mile integration |

---

## 8. SAP Integration & Data Flow

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Master Data Sync** | Customer master data integrated from SAP to Ransale via IDOC. Material master also synced. Master data flows one-way: SAP → Van Sales. | • Bidirectional master data sync<br>• Real-time customer creation<br>• Field mapping validation |
| **Transaction Integration** | "Full transaction data is linked with the direct database" - not IDOC. Custom mechanism posts orders, inventory, and billing to SAP at end of day. | • Real-time transaction posting<br>• IDOC/API based integration<br>• Error handling and retry |
| **Posting Sequence** | Custom sequence: 1) Post sales order, 2) Post inventory (opening + sales + returns = closing), 3) Create billing. All done AFTER day close. | • Order → Delivery → Billing flow<br>• Real-time goods movement<br>• Automatic invoice creation |
| **Stock Visibility** | SAP shows DC-level stock only. Van-level stock unknown to SAP. "SAP does not know the route because routes are not locations." | • Route-level stock in SAP<br>• Real-time stock sync<br>• Inventory reconciliation |
| **In-Transit Stock** | Concern raised: Stock transferred to Abu Dhabi DC shown in transit but visibility issues. "SAP has no clue. It's in transit." Auditable gap identified. | • In-transit inventory tracking<br>• STO with delivery<br>• Transfer confirmation |
| **Finance Reconciliation** | Finance team heavily involved in day closure. Cash and stock must match before SAP posting. Discrepancies charged to salesman immediately. | • Automated reconciliation<br>• Exception-based review<br>• Variance analysis |

---

## 9. Multi-Channel Sales

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Dairy Van Sales** | Primary channel (95-100% of dairy). 300+ routes, 300+ SKUs. All managed through Ransale system with SAP as posting destination. | • Integrated DSD solution<br>• Real-time route analytics<br>• Driver performance tracking |
| **Meat/Carcass Sales** | Two channels: Van sales (B2B) and POS system (B2C for retail shop). Meat allocated per kg. Carcass comes from farm via municipality subcontracting for slaughter. | • Catch-weight handling<br>• Subcontracting integration<br>• Multiple UoM support |
| **POS Integration** | Butcher shop uses separate POS system. POS sales consolidated and posted to van sales as single "shop sales" transaction. FTA sees van sales invoice, not individual POS receipts. | • POS-SAP direct integration<br>• Transaction-level posting<br>• Tax compliance at source |
| **Agri Sales** | Biological assets (bulls), manure/fertilizer, feed sales. Bulls tracked in batch with age/grade characteristics. Different from van sales - SAP direct for many transactions. | • Agricultural commodity handling<br>• Biological asset accounting<br>• By-product sales tracking |
| **Export Sales** | "Export through thing, bank export" - exports happen through SAP directly, not van sales. Limited discussion in transcript. | • Export documentation<br>• Letter of credit handling<br>• Multi-currency pricing |
| **Scrap/Asset Sales** | Scrap sales, asset sales, biological asset sales go directly through SAP, not van sales. These are "manual entries" in SAP. | • Non-stock sales handling<br>• Asset disposal process<br>• Revenue categorization |

---

## 10. Crate & Returnable Management

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Crate Control** | Crate controller checkpoint at start of day (checkout) and end of day (check-in). Cannot start journey without confirming crate quantity. Part of daily settlement sequence. | • Returnable packaging in SAP<br>• Deposit/refund handling<br>• Crate inventory tracking |
| **Crate Tracking** | Managed in van sales back-office system. Crate counts reconciled daily as part of route closure. Shortages charged to salesman. | • Customer crate balance<br>• Aging of unreturned crates<br>• Crate deposit billing |
| **Crate Exchange** | "All the crates change from" - crate exchange happens but details managed in Ransale, not SAP. | • Exchange transaction capture<br>• Customer crate account<br>• Crate movement history |
| **Asset Management** | "Asset management okay" - listed as feature in Ransale but "very limited what they are using, the operation is very limited." Upgrade planned. | • Mobile asset tracking<br>• Placement verification<br>• Asset condition monitoring |

---

## 11. Reporting & Analytics

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Operational Reports** | Van sales back-office provides comprehensive reporting: "Van sales for the shop is a customer... entire sales team in the company will have access to the back office to see what's going on." | • Real-time dashboards<br>• Mobile analytics<br>• Exception-based alerts |
| **SAP Reporting** | SAP receives summarized data only. Route-level profitability not visible in SAP. Revenue lands by DC, not by route. | • Route profitability analysis<br>• Customer profitability<br>• Product margin analysis |
| **Revenue Recognition** | Revenue split by product category and customer channel unclear in SAP. "If all revenue lands in one GL account, management has zero visibility into what's actually making money." | • Multi-dimensional revenue<br>• Profitability by segment<br>• Activity-based costing |
| **Performance Metrics** | Eye on AI, product portfolio, muscle metrics mentioned as back-office capabilities. Performance tracking happens in Ransale, not SAP. | • KPI dashboards<br>• Driver performance<br>• Route efficiency metrics |

---

## 12. Poultry-Specific Processes (ENF)

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Fresh vs Frozen Split** | Fresh: 70% of volume. Frozen: 30%. Frozen imported from Brazil (50% cheaper than local fresh). Fresh processed locally. | • Demand-driven allocation<br>• Channel optimization<br>• Cold chain management |
| **Forecasting** | Weekly meeting with production team. One week firm, two weeks rolling forecast. Seasonal patterns: Ramadan (+3 days before for fresh, +2 weeks for frozen), school holidays (reduced), Fri-Sat-Sun (high). | • Statistical forecasting<br>• Seasonal profile management<br>• Promotional lift factors |
| **Slaughter Coordination** | Farm → Municipality slaughter (subcontracting) → Carcass return → Distribution (Van sales for B2B, POS for B2C). Subcontracting PO from farm plant. | • Integrated supply chain<br>• Yield tracking<br>• Subcontractor management |
| **Excess Production** | When market price is too low (e.g., 7 AED/kg), excess fresh chicken is frozen instead of selling at loss. "Freeze this one and we can sell after that at big price for 10-11 AED." | • Demand-supply balancing<br>• Alternate channel routing<br>• Dynamic pricing |
| **Returns/Near-Expiry** | 13% average returns (target: 10-12%). Third-day production sold to restaurants at lowest price. "Very small, very small" volume to HoReCa for near-expiry. | • Return reduction programs<br>• Alternate outlet management<br>• Waste minimization |

---

## Summary of Critical Gaps

### System Architecture Issues (Fundamental)
1. **SAP as Posting System Only:** SAP receives summarized end-of-day data, not operational transactions
2. **No Route Visibility:** Routes not defined as locations in SAP - DC-level stock only
3. **External Van Sales Dependency:** Ransale back-office is the operational brain; SAP is peripheral
4. **Offline Operations:** Devices operate offline all day with evening sync only

### Integration Issues (High Risk)
5. **In-Transit Stock Gap:** Stock movements between locations may not be properly tracked in SAP - auditable concern
6. **E-Commerce Disconnect:** Magento orders manually consolidated, not integrated with SAP
7. **POS System Isolation:** Retail POS sales not individually posted to SAP - compliance risk
8. **Master Data Quality:** Customer location data quality issues affecting route optimization

### Operational Limitations (Medium-High Risk)
9. **No Pre-Order Capture:** Orders collected via phone/email/WhatsApp, not systematically recorded
10. **Returns Analysis Gap:** Returns captured but root cause analysis not flowing to quality
11. **FEFO Not Confirmed:** Shelf-life visible but system-enforced FEFO unclear
12. **Near-Expiry Operations Stopped:** Lack of physical control led to stopping differentiated pricing

### Visibility Issues (Medium Risk)
13. **Route Profitability Unknown:** SAP cannot report route-level or true channel profitability
14. **Real-Time Position Missing:** Credit exposure and stock known only in back-office
15. **Performance in External System:** All KPIs and analytics in Ransale, not SAP

---

## Recommendations

1. **S/4HANA with SAP DSD or Integration with Modern Van Sales:**
   - Either implement SAP DSD for unified operations
   - Or ensure deep real-time integration between S/4HANA and Ransale

2. **Route as Storage Location:** Define routes in SAP for proper inventory visibility and route profitability

3. **Real-Time Integration:** Move from batch end-of-day posting to real-time or near-real-time transaction sync

4. **E-Commerce Integration:** Direct Magento-SAP integration for proper order management and inventory allocation

5. **POS Integration:** Individual transaction posting for tax compliance and proper revenue tracking

6. **Master Data Governance:** Cleanse customer location data to enable route optimization

7. **FEFO Implementation:** System-enforced First-Expiry-First-Out with customer minimum shelf-life requirements

8. **Returns to Quality:** Connect returns data to quality management for root cause analysis

---

*Document generated from NXSYS Pre-Discovery Workshop Session 5 - Sales & Distribution*  
*Prepared by: NXSYS AI-Powered Discovery Engine™*

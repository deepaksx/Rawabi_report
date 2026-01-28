# Al Rawabi Dairy Company

## SAP Pre-Discovery: Sales & Distribution Process Findings

**Document Type:** Process Gap Analysis
 **Workshop Date:** January 22-23, 2026
 **Module:** Sales & Distribution (SD)
 **Prepared by:** NXSYS Discovery Team

------

## Process 01: Van Sales Operations & Route Management

**Risk Level: HIGH RISK**

### Current State at Al Rawabi

Van sales represents 95-100% of dairy sales through approximately 300+ routes serving predefined customers with ~300 SKUs. The external system "Ransale" (RISA) manages all van operations while SAP has no visibility of routes - only Distribution Centers (DCs). Routes are NOT created as locations in SAP, meaning SAP cannot track individual van inventory. Handheld devices (PDC) operate in offline mode throughout the day with morning sync for master data download and evening sync for transaction upload. The back-office system functions as a "mini-ERP" while SAP serves primarily as a financial posting destination.

### Industry Best Practice

SAP DSD (Direct Store Delivery) with full route integration providing real-time route visibility and GPS-enabled delivery management. Each van/route defined as separate storage location in SAP with STO-based van loading and real-time van stock tracking. Always-connected devices with continuous sync enabling real-time visibility of van activities. Integrated route optimization with dynamic route adjustment and automated customer slot management.

### Key Controls Expected

- ✓ Routes defined as storage locations in SAP
- ✓ Real-time van inventory visibility
- ✓ Online/connected device operations
- ✓ Integrated route optimization
- ✓ GPS tracking and geofencing
- ✓ Real-time transaction posting

### Findings

| ID    | Finding                                                      | Severity   |
| ----- | ------------------------------------------------------------ | ---------- |
| VS-01 | Routes not created as SAP locations                          | **HIGH**   |
|       | SAP has no visibility of individual van inventory. "We did not create route as a location, entire reconciliation everything stop reconciliation will be in DC level." All 300+ routes invisible to SAP, only DC-level stock known. |            |
| VS-02 | Offline device operations throughout the day                 | **HIGH**   |
|       | Devices operate in offline mode all day with morning/evening sync only. Real-time visibility of van activities not available. Project underway for cloud migration but not yet live. |            |
| VS-03 | External system dependency for all van operations            | **HIGH**   |
|       | Ransale back-office is the operational brain; SAP is peripheral. All pricing, promotions, credit, returns, and route management happen outside SAP. Integration is batch-based, not real-time. |            |
| VS-04 | Route optimization temporarily stopped                       | **MEDIUM** |
|       | RoadNet route optimization temporarily stopped due to master data quality issues - customer locations not 100% accurate. High volume of new customer onboarding (6,000-7,000 deliveries daily) making optimization difficult. |            |

------

## Process 02: Order Management & Fulfillment

**Risk Level: HIGH RISK**

### Current State at Al Rawabi

"We do not have the order sales concept, we are doing directly delivery." No pre-orders are captured in the van sales system. Allocation happens based on offline communication via phone calls, emails, and WhatsApp. Sales orders are created in SAP AFTER the actual sale happens - orders posted from van sales data upload, not from customer requests. Van sales uses direct billing without SAP delivery documents. Custom movement types (Y13, Y14) used for inventory posting instead of standard delivery-based goods movement.

### Industry Best Practice

Pre-order capture with ATP (Available-to-Promise) check and order-to-delivery tracking. Standard SAP order-to-cash flow: Sales Order → Delivery → Billing with proof of delivery capture including digital signature. Standing order management with automatic order generation and seasonal adjustment capability. All orders systematically recorded with order history and customer demand pattern analytics.

### Key Controls Expected

- ✓ Pre-order capture in system with ATP check
- ✓ Order promising and allocation visibility
- ✓ Delivery document creation with POD
- ✓ Standing order management
- ✓ Order fulfillment tracking
- ✓ Backorder management

### Findings

| ID    | Finding                                                      | Severity   |
| ----- | ------------------------------------------------------------ | ---------- |
| OM-01 | No pre-order capture in any system                           | **HIGH**   |
|       | 60-70% of sales are "pull" orders collected via phone, email, WhatsApp - none systematically recorded. Order collection is manual and allocation based on supervisor knowledge only. |            |
| OM-02 | No delivery document in SAP                                  | **HIGH**   |
|       | Van sales uses direct billing without SAP delivery notes. "There is no delivery involved in it." Custom movement types used instead of standard delivery-based goods movement. |            |
| OM-03 | Sales orders created post-facto                              | **MEDIUM** |
|       | SAP sales orders created from van sales data upload AFTER sale completion, not from customer request. Order is a recording mechanism, not a planning/promising tool. |            |
| OM-04 | No order fulfillment model                                   | **MEDIUM** |
|       | Van sales "currently is not operating as an order fulfillment tool. It only does van sales, goes sales and comes back." True order fulfillment exists only for e-commerce channel. |            |

------

## Process 03: Pricing & Promotions Management

**Risk Level: MEDIUM RISK**

### Current State at Al Rawabi

Pricing procedures designed and maintained entirely in Ransale back-office "similar to SAP pricing procedure." All pricing logic resides in the van sales system, not in SAP SD condition technique. Prices defined and published in back-office with final calculated values pushed to devices. Full promotion capability exists in Ransale: FOC (Free of Charge), bundling (1+1 free), discounts, trade-offs - designed to replicate SAP capabilities. Customer-specific pricing differentiates between retail and HoReCa channels. FOC invoices print list price with 100% discount, VAT compliant.

### Industry Best Practice

SAP condition technique with integrated pricing and finance for centralized price management. Condition records with price list versioning and validity period management. SAP Trade Promotion Management with promotion effectiveness analytics and budget control integration. Customer hierarchy pricing with contract pricing and volume-based agreements. Real-time price synchronization across all channels.

### Key Controls Expected

- ✓ Centralized pricing in SAP
- ✓ Condition record management with validity
- ✓ Promotion effectiveness tracking
- ✓ Budget control for promotions
- ✓ Price override authorization controls
- ✓ Margin protection alerts

### Findings

| ID    | Finding                                                      | Severity   |
| ----- | ------------------------------------------------------------ | ---------- |
| PM-01 | Pricing maintained outside SAP                               | **MEDIUM** |
|       | All pricing logic in Ransale back-office, not SAP. While functionally adequate, creates dual maintenance and potential sync issues. SAP pricing conditions not used for van sales. |            |
| PM-02 | Promotion analytics not in SAP                               | **MEDIUM** |
|       | Promotion effectiveness tracking happens in back-office only. SAP has no visibility of promotion performance, ROI, or budget consumption. |            |
| PM-03 | No integrated promotion budget control                       | **LOW**    |
|       | Promotion budgets not controlled through SAP. Finance visibility of promotion spending is indirect through posted transactions only. |            |

------

## Process 04: Returns & Credit Processing

**Risk Level: HIGH RISK**

### Current State at Al Rawabi

Returns captured in van sales with reason codes for "good return, bad return" and "scrap quantities." Different inventory types used for classification in Ransale. Return reasons captured at point of return but flow to SAP as summary transactions only - detailed reason analysis not available in SAP. Near-expiry stock management practice was stopped due to lack of physical control on ground. Scrap quantities tracked in end-of-day settlement with shortages charged to salesman. Returns do not trigger quality inspection in SAP as QM integration is not active.

### Industry Best Practice

Returns order processing in SAP with automatic credit memo generation. Quality inspection integration for returned goods with defect pattern analysis. Detailed reason code analysis flowing to quality management for root cause tracking. Return reduction initiatives with customer-level return analysis. Near-expiry stock segregation with alternate channel management and markdown optimization.

### Key Controls Expected

- ✓ Returns captured in SAP with reason codes
- ✓ Automatic credit memo processing
- ✓ QM integration for returns inspection
- ✓ Return rate monitoring by customer/product
- ✓ Root cause analysis and tracking
- ✓ Near-expiry management process

### Findings

| ID    | Finding                                                      | Severity   |
| ----- | ------------------------------------------------------------ | ---------- |
| RT-01 | Returns not flowing to SAP QM                                | **HIGH**   |
|       | Returns captured in van sales but quality analysis not flowing to SAP QM. Root cause analysis for defects/returns not systematically tracked. QM module not active for returns inspection. |            |
| RT-02 | Return reasons summarized, not detailed                      | **MEDIUM** |
|       | Detailed return reasons captured at point of return in Ransale but SAP receives only summary transactions. Granular analysis not possible in SAP. |            |
| RT-03 | Near-expiry operations discontinued                          | **MEDIUM** |
|       | "We stopped the practice" of differentiated near-expiry pricing due to lack of physical control. Inventory type change capability exists but not operationally used. |            |
| RT-04 | No systematic return reduction program                       | **LOW**    |
|       | Return rates tracked but no formal return reduction initiative with customer-level analysis and improvement targets. |            |

------

## Process 05: Credit Management

**Risk Level: MEDIUM RISK**

### Current State at Al Rawabi

Credit limits maintained and controlled in SAP but credit check at time of sale happens in Ransale back-office. Credit exposure visibility exists in back-office system, not SAP - real-time credit position known in van sales but SAP sees only posted transactions. Cash collected by salesman, reconciled at end-of-day, deposited at cash counter with receipt per route. Finance team heavily involved in ensuring day closure with comprehensive validation of cash and stock. Temporary credit issuance capability exists through invoicing mechanism.

### Industry Best Practice

SAP credit management with real-time exposure calculation and automatic credit block. Customer risk categories with payment history scoring and dynamic credit adjustment. Driver collection tracking with cash variance alerts and bank deposit reconciliation. Real-time credit exposure across all channels with multi-entity exposure view. Pre-approved credit lines with temporary limit workflow and automatic limit restoration.

### Key Controls Expected

- ✓ Real-time credit exposure in SAP
- ✓ Automatic credit block on limit breach
- ✓ Customer risk categorization
- ✓ Driver collection tracking
- ✓ Cash reconciliation automation
- ✓ Multi-location credit consolidation

### Findings

| ID    | Finding                                                      | Severity   |
| ----- | ------------------------------------------------------------ | ---------- |
| CM-01 | Real-time credit exposure not in SAP                         | **MEDIUM** |
|       | Credit check happens in van sales system. SAP knows credit position only after end-of-day posting. Real-time exposure calculation not available in SAP during sales. |            |
| CM-02 | Driver collection tracking outside SAP                       | **MEDIUM** |
|       | Cash collection, reconciliation, and deposit tracking managed in back-office. SAP receives summarized cash transactions only. |            |
| CM-03 | Branch office credit complexity unclear                      | **LOW**    |
|       | Question raised about head office vs branch office invoicing and credit management for customers with multiple locations. Process not fully clarified. |            |

------

## Process 06: Shelf-Life & FEFO Management

**Risk Level: HIGH RISK**

### Current State at Al Rawabi

Shelf-life information exists in van sales system - "Van sale is selling is there in van sale it is there. So you can see how much old a stock is." However, FEFO (First-Expiry-First-Out) enforcement at system level not confirmed. Near-expiry inventory type concept exists in Ransale but operational practice was stopped. Fresh dairy products have 7-day shelf life requiring strict rotation. For meat: "Zero stock. Half load everything every day" - typically no carryover. Customer minimum remaining shelf-life requirements (e.g., retailers demanding 70% remaining) not discussed.

### Industry Best Practice

SAP SLED (Shelf Life Expiration Date) management with batch-level expiry tracking. System-enforced FEFO picking with remaining shelf-life ATP check. Customer-specific minimum shelf-life rules with delivery date optimization. Stock aging reports with automatic near-expiry alerts and markdown triggers. Remaining shelf-life visibility in ATP for order promising.

### Key Controls Expected

- ✓ SLED management in SAP
- ✓ System-enforced FEFO picking
- ✓ Customer minimum shelf-life check
- ✓ Remaining shelf-life ATP
- ✓ Near-expiry alerts and reporting
- ✓ Automated markdown triggers

### Findings

| ID    | Finding                                                      | Severity   |
| ----- | ------------------------------------------------------------ | ---------- |
| SL-01 | FEFO not confirmed as system-enforced                        | **HIGH**   |
|       | Shelf-life visible in van sales but system-enforced FEFO unclear. Risk of shipping older stock or near-expiry products to customers requiring fresh stock. |            |
| SL-02 | No customer minimum shelf-life rules                         | **HIGH**   |
|       | Major retailers typically require minimum remaining shelf-life (e.g., 70%) on delivery. No evidence this is checked in system during allocation or delivery. |            |
| SL-03 | Shelf-life not in SAP ATP                                    | **MEDIUM** |
|       | SAP not used for order promising with shelf-life consideration. Allocation decisions made in back-office without SAP shelf-life integration. |            |
| SL-04 | Near-expiry process abandoned                                | **MEDIUM** |
|       | Near-expiry stock management stopped due to physical control difficulties. No systematic alternate channel for near-expiry stock disposal. |            |

------

## Process 07: E-Commerce Integration

**Risk Level: HIGH RISK**

### Current State at Al Rawabi

Magento Cloud platform for B2C e-commerce operates separately from van sales. Orders received in Magento are manually consolidated by a coordinator who creates one summary order in van sales treating "e-commerce" as an internal customer. E-commerce orders NOT fulfilled through van sales routes - separate "e-commerce route" with dedicated delivery exists. Pick-pack app available for e-commerce order preparation. E-commerce sales do NOT flow to SAP directly - posted through van sales as internal customer. Dark stores (Talabat) treated similarly with stock requests potentially not reaching SAP.

### Industry Best Practice

Unified commerce platform with real-time inventory synchronization and omnichannel order management. Automatic order integration with real-time order flow and order status updates to customers. Dedicated e-commerce fulfillment with wave/batch picking and same-day delivery capability. Real-time SAP integration for inventory allocation and proper revenue recognition by channel.

### Key Controls Expected

- ✓ Real-time order integration from e-commerce
- ✓ Inventory allocation visibility
- ✓ Order status updates to customers
- ✓ Channel-specific revenue tracking
- ✓ Fulfillment tracking and POD
- ✓ Returns integration

### Findings

| ID    | Finding                                                      | Severity   |
| ----- | ------------------------------------------------------------ | ---------- |
| EC-01 | No direct e-commerce to SAP integration                      | **HIGH**   |
|       | Magento orders manually consolidated and posted to van sales as internal customer. "In SAP or van sales, we are not creating any sales" directly from Magento. No real-time inventory sync. |            |
| EC-02 | Manual order consolidation creates delays                    | **HIGH**   |
|       | Coordinator manually collates orders from Magento and creates single order in van sales. Process is labor-intensive and error-prone. |            |
| EC-03 | Dark store stock visibility gap                              | **MEDIUM** |
|       | Talabat dark store stock requests may not come to SAP. "SAP has no clue. It's in transit." Identified as auditable concern. |            |
| EC-04 | E-commerce revenue not separately tracked                    | **MEDIUM** |
|       | E-commerce sales posted as internal customer, not as separate channel. True e-commerce profitability not visible in SAP. |            |

------

## Process 08: SAP Integration & Data Flow

**Risk Level: HIGH RISK**

### Current State at Al Rawabi

Customer master data integrated from SAP to Ransale via IDOC (one-way: SAP → Van Sales). Transaction data uses direct database connection, not IDOC. Custom posting sequence: 1) Post sales order, 2) Post inventory with opening + sales + returns = closing balance, 3) Create billing - all done AFTER day close. SAP shows DC-level stock only; van-level stock unknown to SAP. In-transit stock visibility issues identified with stock between locations potentially not properly tracked in SAP. Finance reconciliation heavily manual with day closure dependent on cash and stock matching.

### Industry Best Practice

Real-time or near-real-time bidirectional integration with IDOC/API based error handling and retry mechanisms. Standard SAP Order → Delivery → Billing flow with real-time goods movement posting. Route-level stock visibility in SAP with real-time stock synchronization. In-transit inventory properly tracked with STO and delivery confirmation. Automated reconciliation with exception-based review.

### Key Controls Expected

- ✓ Real-time transaction integration
- ✓ Bidirectional master data sync
- ✓ Standard document flow (Order-Delivery-Billing)
- ✓ In-transit stock tracking
- ✓ Automated reconciliation
- ✓ Integration error handling

### Findings

| ID     | Finding                                                      | Severity   |
| ------ | ------------------------------------------------------------ | ---------- |
| INT-01 | Batch integration instead of real-time                       | **HIGH**   |
|        | All transactions posted to SAP at end of day in batch. Real-time stock visibility, credit exposure, and operational data not available in SAP during business hours. |            |
| INT-02 | In-transit stock not properly tracked                        | **HIGH**   |
|        | Stock transferred between locations (e.g., to Abu Dhabi DC) may show in transit but "SAP has no clue." Identified as "auditable big time issue" in workshop. |            |
| INT-03 | Non-standard document flow                                   | **MEDIUM** |
|        | Custom movement types and direct billing without delivery document. Standard Order-Delivery-Billing flow not followed, limiting SAP functionality. |            |
| INT-04 | One-way master data sync only                                | **LOW**    |
|        | Master data flows SAP → Van Sales only. Customer/material changes in van sales not reflected back. Potential for data inconsistency. |            |

------

## Process 09: Multi-Channel Revenue & Profitability

**Risk Level: HIGH RISK**

### Current State at Al Rawabi

Multiple sales channels exist: Van sales B2B (95%+ of dairy), E-commerce B2C, POS retail shop, Agri sales. Van sales back-office provides operational reporting with "entire sales team in the company will have access to the back office." However, SAP receives summarized data only - route-level profitability not visible in SAP. POS system for butcher shop posts consolidated sales as single transaction; individual receipts not in SAP creating potential FTA audit risk. Revenue by channel, route, or customer segment not distinctly trackable in SAP.

### Industry Best Practice

Multi-dimensional revenue recognition with profitability analysis by channel, route, customer segment, and product category. Activity-based costing for true cost-to-serve analysis. Real-time dashboards with KPI tracking at all levels. Individual transaction posting from all channels for regulatory compliance. Route profitability analysis enabling investment and divestment decisions.

### Key Controls Expected

- ✓ Revenue split by channel in SAP
- ✓ Route profitability tracking
- ✓ Customer profitability analysis
- ✓ Product margin visibility
- ✓ Cost-to-serve analysis
- ✓ Real-time profitability dashboards

### Findings

| ID    | Finding                                                      | Severity   |
| ----- | ------------------------------------------------------------ | ---------- |
| RP-01 | Route profitability not visible in SAP                       | **HIGH**   |
|       | Routes not defined in SAP means route-level profitability cannot be calculated. "If all revenue lands in one GL account, management has zero visibility into what's actually making money." |            |
| RP-02 | POS sales not individually posted                            | **HIGH**   |
|       | Retail POS sales consolidated as single transaction. Individual customer receipts not in SAP. Potential FTA compliance risk - "FTA knows the deemed sales from the financial system" only. |            |
| RP-03 | Channel profitability not tracked                            | **MEDIUM** |
|       | E-commerce, B2B van sales, retail POS all posted without clear channel identification. True channel profitability analysis not possible in SAP. |            |
| RP-04 | Performance metrics outside SAP                              | **MEDIUM** |
|       | All KPIs, driver performance, route efficiency tracked in Ransale back-office. SAP provides only financial posting, not operational analytics. |            |

------

## Process 10: Crate & Returnable Management

**Risk Level: MEDIUM RISK**

### Current State at Al Rawabi

Crate controller checkpoint exists at start of day (checkout) and end of day (check-in) as part of mandatory settlement sequence. Cannot start journey without confirming crate quantity. Crate management handled entirely in Ransale back-office - crate counts reconciled daily as part of route closure with shortages charged to salesman. "All the crates change from" - crate exchange happens but managed in Ransale, not SAP. Asset management capability exists in Ransale but "very limited what they are using, the operation is very limited."

### Industry Best Practice

Returnable packaging management in SAP with deposit/refund handling and customer crate account tracking. Crate inventory as storage location stock with movement tracking. Aging of unreturned crates with automated follow-up. Crate deposit billing and refund processing. Asset tracking for fridges and display equipment with placement verification.

### Key Controls Expected

- ✓ Crate inventory in SAP
- ✓ Customer crate balance tracking
- ✓ Deposit/refund accounting
- ✓ Unreturned crate aging
- ✓ Crate movement history
- ✓ Asset placement tracking

### Findings

| ID    | Finding                                                      | Severity   |
| ----- | ------------------------------------------------------------ | ---------- |
| CR-01 | Crate management outside SAP                                 | **MEDIUM** |
|       | All crate tracking, reconciliation, and customer balances managed in Ransale. SAP has no visibility of crate inventory or customer crate positions. |            |
| CR-02 | No deposit accounting in SAP                                 | **MEDIUM** |
|       | Crate deposits and refunds not tracked as financial transactions in SAP. Crate-related costs/revenues bundled with other transactions. |            |
| CR-03 | Asset management underutilized                               | **LOW**    |
|       | Asset management feature available in Ransale but "operation is very limited." Fridge and display equipment tracking not fully implemented. Upgrade planned. |            |

------

## Process 11: Delivery & Cold Chain Management

**Risk Level: MEDIUM RISK**

### Current State at Al Rawabi

Van sales operations include refrigerated delivery vehicles for dairy products. End-of-day settlement process comprehensive with stock count, cash reconciliation, crate check, and supervisor approval - system will not allow route closure without complete reconciliation. Journey planning uses RoadNet (temporarily stopped) with delivery sequences defined. Delivery time windows not explicitly discussed but 6,000-7,000 daily deliveries suggest established routes. Cold chain monitoring integration with SAP not evident - temperature compliance managed operationally.

### Industry Best Practice

Cold chain requirements with refrigerated truck assignment and temperature monitoring integration. Delivery time windows enforced (restaurants 6AM, retailers before store opening). Multi-drop route optimization with real-time adjustments. Proof-of-delivery capture with signature, photo, and GPS confirmation. Delivery failure tracking with reason codes and redelivery management.

### Key Controls Expected

- ✓ Temperature monitoring integration
- ✓ Delivery time window management
- ✓ Proof of delivery capture
- ✓ Delivery exception handling
- ✓ Route optimization active
- ✓ Cold chain compliance documentation

### Findings

| ID    | Finding                                                      | Severity   |
| ----- | ------------------------------------------------------------ | ---------- |
| DL-01 | Cold chain monitoring not in SAP                             | **MEDIUM** |
|       | Temperature compliance managed operationally but not integrated with SAP. No automatic alerts or compliance documentation in system for audits. |            |
| DL-02 | Route optimization paused                                    | **MEDIUM** |
|       | RoadNet route optimization temporarily stopped due to master data quality. Manual journey planning in use, potentially suboptimal routes and higher delivery costs. |            |
| DL-03 | Delivery time windows not system-enforced                    | **LOW**    |
|       | Customer delivery windows likely managed through route sequencing but not explicitly tracked or enforced in system. Service level compliance not measured. |            |
| DL-04 | POD capture completeness unclear                             | **LOW**    |
|       | Proof of delivery exists in device but integration with SAP for dispute resolution and audit trail not confirmed. |            |

------

## Summary Statistics

| Risk Level      | Count | Processes                                                    |
| --------------- | ----- | ------------------------------------------------------------ |
| **HIGH RISK**   | 6     | Van Sales Operations, Order Management, Returns & Credits, Shelf-Life & FEFO, E-Commerce Integration, SAP Integration, Multi-Channel Revenue |
| **MEDIUM RISK** | 5     | Pricing & Promotions, Credit Management, Crate Management, Delivery & Cold Chain |
| **LOW RISK**    | 0     | -                                                            |

### Total Findings by Severity

| Severity  | Count  |
| --------- | ------ |
| HIGH      | 18     |
| MEDIUM    | 20     |
| LOW       | 8      |
| **TOTAL** | **46** |

------

*Document generated from NXSYS Pre-Discovery Workshop - Sales & Distribution*
 *Prepared by: NXSYS AI-Powered Discovery Engine™*
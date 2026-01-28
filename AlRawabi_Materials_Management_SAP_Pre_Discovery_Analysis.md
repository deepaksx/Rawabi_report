# Al Rawabi Dairy Company
## SAP Pre-Discovery Materials Management (MM) Process Analysis

**Document Type:** Workshop Findings Analysis  
**Workshop Date:** January 21, 2026  
**Session:** Materials Management (MM)  
**Prepared by:** NXSYS Discovery Team

---

## Executive Summary

This document captures detailed findings from the Pre-Discovery Materials Management workshop conducted with Al Rawabi Dairy Company. The workshop covered organizational structure, planning processes, procurement, inventory management, warehouse operations, and logistics across the dairy manufacturing and distribution operations.

**Key Finding:** Al Rawabi operates a complex supply chain spanning manufacturing plants, distribution centers, and farm operations. While SAP ECC is implemented, significant processes remain Excel-based including demand planning, MRP calculations, milk balancing, and feed requirements. A 16-week rolling forecast was recently implemented but MRP is not yet fully operational. The organization manages 390 distribution routes with separate applications for dairy and poultry, presenting centralization opportunities in the S/4HANA transformation.

**Critical Business Impact:** The reliance on Excel for planning and balancing creates significant risk in a short shelf-life product environment. Manual PR-to-PO processes, duplicate material codes across entities, and lack of integrated planning contribute to inefficiencies. The separation of dairy and poultry operations in different systems prevents consolidated visibility and resource optimization.

---

## 1. Organizational Structure (MM)

| Aspect | Current State at Al Rawabi | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Purchasing Organization** | Separate purchasing organizations for each entity. No centralized purchasing across group. "There is no central purchasing or planning; each unit manages its own processes." | • Central purchasing for leverage<br>• Entity-specific for local needs<br>• Hybrid approach |
| **Plant Structure** | Manufacturing plants and distribution centers configured separately. "Two to three manufacturing patterns in place." Kizad operates separately due to biosecurity. | • Clear plant definitions<br>• Manufacturing vs DC distinction<br>• Consistent configuration |
| **Distribution Centers** | Five distribution centers (DCs): Sharjah, Dubai, Abu Dhabi, and others. "Data is consolidated at the DC level for weekly and daily planning over a 16-week horizon." | • Hub and spoke model<br>• Regional optimization<br>• Integrated planning |
| **Farm Operations** | Two farm locations: Anand and Debali (feed farms), plus Abu Dhabi. Kizad plant separate due to biosecurity - no transfers allowed into Kizad. | • Farm-to-plant integration<br>• Biosecurity compliance<br>• Traceability maintained |
| **Storage Locations** | Multiple storage locations within plants. "WMS assists in determining optimal storage locations and managing transfer records." | • Logical SLOC design<br>• Temperature zone separation<br>• Bin management |

---

## 2. Demand Planning & Forecasting

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Planning Type** | Sales-based planning for all raw materials. "Al Rawabi employs sales-based planning for all raw materials." | • Demand-driven planning<br>• Statistical forecasting<br>• Consensus demand |
| **Rolling Forecast** | 16-week rolling forecast recently implemented. "A 16-week rolling forecast has been implemented... went live at the end of last week." Remaining weeks from annual budget. | • Continuous rolling forecast<br>• Weekly refresh<br>• Seasonal adjustment |
| **Planning Tools** | IBP (Integrated Business Planning) for data gathering, Resa tool for processing before SAP upload. "IBP is used to gather major data. Resa (R-E-S-A) tool is employed for data processing." | • SAP IBP/APO<br>• Integrated planning<br>• Single source of truth |
| **Excel Dependency** | Heavy reliance on Excel for planning. "Sales data is managed using Excel spreadsheets since SAP is not fully operational." Complex formulas for daily balancing. | • Eliminate Excel workarounds<br>• System-based planning<br>• Audit trail |
| **PIR Management** | Forecast data uploaded to SAP as Planned Independent Requirements (PIRs). "The starting point in SAP for running MRP is the PIR." Manual upload process. | • Automatic PIR generation<br>• Forecast integration<br>• Version control |
| **Budget Integration** | 12-month budget prepared and uploaded into SAP. "Budget is based on consumption data and is updated monthly." | • Integrated budgeting<br>• Plan/actual comparison<br>• Rolling updates |

---

## 3. Material Requirements Planning (MRP)

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **MRP Status** | Concept in place but not fully operational. "While the concept of Material Requirements Planning (MRP) is in place, it is not yet fully operational in SAP." | • Fully automated MRP<br>• Daily/weekly runs<br>• Exception-based management |
| **MRP Data Sources** | PIRs, sales orders, and rolling forecasts. "Basic data sources include PIRs, sales orders, and rolling forecasts." | • Integrated demand signals<br>• Real-time inventory<br>• Lead time accuracy |
| **Manual Calculations** | "The entire process from forecasting to PR creation was manual, primarily using Excel. Only the initial data extraction from SAP was automated." | • System-calculated requirements<br>• Automatic PR generation<br>• Planner workbench |
| **Reorder Point Planning** | Used for some materials. "The system maintains a re-order point at a safety level... when stock levels drop below the re-order level, the system automatically generates a replenishment PR." | • Dynamic safety stock<br>• Service level optimization<br>• Automatic replenishment |
| **Feed Requirements** | Excel-based, managed by farm personnel. "All calculations for feed requirements are done in Excel, primarily by farm personnel." Based on cow count and milk production. | • Formula-based planning<br>• Integration with herd management<br>• Automatic requirements |
| **Milk Balancing** | Complex Excel sheet for milk and cream balancing. "The team is currently using a complex Excel sheet for balancing, which includes formulas for daily operations." | • SAP PP-PI batch balancing<br>• Component-level tracking<br>• Real-time visibility |

---

## 4. Milk & Cream Balancing

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Balancing Frequency** | Monthly requirements with daily adjustments needed. "Current balancing is based on monthly requirements, but this approach can lead to issues if daily business operations are inconsistent." | • Daily balancing<br>• Real-time adjustments<br>• Automated optimization |
| **Excel Complexity** | "Using a complex Excel sheet for balancing... concerns were raised about the efficiency of using Excel for these calculations, as it can be tedious and time-consuming." | • Integrated planning system<br>• Scenario modeling<br>• What-if analysis |
| **Component Tracking** | Currently at milk level, not component level. "Balancing is done at the milk level, not component level." Fat is critical; SNF less important. | • Component-level balancing<br>• Fat/protein/SNF tracking<br>• Yield optimization |
| **Cream Supply** | Critical component requiring adequate supply to prevent shortages. "The team needs to ensure adequate cream supply to prevent shortages." | • Co-product planning<br>• Yield-based calculations<br>• Supply/demand matching |
| **Seasonal Planning** | Variations for Ramadan, Eid considered in planning. "Planning is based on raw material availability from their own farms and projected sales volumes, considering seasonal variations." | • Seasonal profiles<br>• Promotional planning<br>• Demand sensing |

---

## 5. Purchase Requisition Process

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **PR Creation** | PRs must be created for all materials before POs. "PRs must be created for all materials before Purchase Orders (POs) can be issued. No PO can be created without an associated PR." | • MRP-generated PRs<br>• Manual for exceptions<br>• Consolidation rules |
| **Manual PR Process** | Store team monitors and creates manual PRs. "The store team monitors PRs and creates manual PRs for non-fixed assets as needed." Spare parts manually adjusted per maintenance team. | • Automatic generation<br>• Exception-based review<br>• Planner workbench |
| **PR Approval Levels** | Maximum 4 levels of approval. "PRs have a release strategy with a maximum of 4 levels of approval." Different strategies for fixed assets, non-fixed assets, and emergency PRs. | • Risk-based approval<br>• Value thresholds<br>• Streamlined routing |
| **Budget Control** | CapEx budgets require PRs to be within budget. "CapEx budgets require PRs to be executed; the system will not allow PR creation without budget support." | • Funds management integration<br>• Budget availability check<br>• Commitment tracking |
| **Emergency Purchases** | Processed through petty cash system. "Emergency purchases are processed through the petty cash system... current petty cash limit is set at AED 7,000." | • Emergency workflow<br>• Post-facto approval<br>• Limit enforcement |

---

## 6. Purchase Order Process

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **PO Creation** | Manual process from quotation. "The entire process from PR to PO is currently manual." Steps: Create PO from quotation → Compare vendors → Select vendor → Finalize conditions → Send for approval. | • Source list automation<br>• Automatic source determination<br>• Contract reference |
| **PO Approval Levels** | Maximum 5 levels of approval. "POs have a release strategy with a maximum of 5 levels of approval." | • Value-based routing<br>• Material group specific<br>• Parallel vs sequential |
| **Vendor Selection** | Manual comparison and evaluation. "Compare and evaluate vendors. Select the appropriate vendor." Buyer experience plays significant role. | • Vendor scorecards<br>• RFQ automation<br>• Best price determination |
| **Commodity Procurement** | Price locking required well in advance. "There is a need to lock prices for commodities (e.g., corn) well in advance of demand." | • Commodity contracts<br>• Hedging integration<br>• Price monitoring |
| **Service Contracts** | Being centralized but manual. "Waste management services and other contracts are being centralized, but the process remains manual." Expiration monitoring needed. | • Outline agreements<br>• Automatic renewal alerts<br>• Service entry sheets |

---

## 7. Goods Receipt Process

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Physical Receipt** | Materials received at designated locations. "Physical receiving of materials at designated locations." | • GR posting at receipt<br>• Delivery scheduling<br>• Dock management |
| **Barcode Scanning** | Palletization with barcode capture. "Each pallet contains a barcode that provides detailed information, including: SCA code, Area DC, Batch number, Manufacturing date, Expiry date." | • RF scanning<br>• Automatic batch assignment<br>• Real-time posting |
| **Handling Units** | Critical concept in current system. "When a barcode is scanned, the system identifies the handling unit and displays the items contained within." | • HU management<br>• Pallet tracking<br>• Nested HU support |
| **GR for Emergency** | Followed by petty cash request. "Following GRM, a petty cash request will be submitted." | • Standard GR process<br>• Invoice verification<br>• Payment processing |

---

## 8. Inventory Management

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Stock Transfers** | Stock Transport Orders (STOs) between DCs. "The concept of area transfers involves Stock Transport Orders (STOs) between distribution centers (DCs), such as Dubai and Abu Dhabi." | • One-step/two-step STO<br>• In-transit visibility<br>• Automatic replenishment |
| **Plant-Based Transfers** | Both plant-based and SLOC-based STOs used. "The conversation covered the use of SAP for stock transfers, including plant-based and storage location (SLOC)-based stock transport orders." | • Clear transfer rules<br>• Valuation consistency<br>• Document flow |
| **Biosecurity Restrictions** | Kizad has transfer restrictions. "No transfers of items from other locations to Kizad are authorized. Deliveries from suppliers to Kizad are allowed, but not vice versa." Raw milk can transfer out only. | • System-enforced rules<br>• Authorization controls<br>• Compliance monitoring |
| **Material Valuation** | Individual materials valued consistently across plants. "It was confirmed that individual materials are valued consistently across plants." | • Moving average or standard<br>• Split valuation if needed<br>• Material ledger |
| **Dead Stock** | Issue requiring attention. "Addressing issues such as dead stock and consumption is a significant task that requires commitment from the team." | • Slow-moving analysis<br>• Write-off procedures<br>• Prevention strategies |

---

## 9. Warehouse Management

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **WMS Usage** | WMS in use for storage and transfers. "WMS assists in determining optimal storage locations and managing transfer records." | • Full WM/EWM deployment<br>• Optimized putaway<br>• Wave picking |
| **Storage Assignment** | No dedicated warehouse manager role. "There is no dedicated warehouse manager; items can be stored wherever needed." | • Rule-based putaway<br>• Storage type determination<br>• Capacity management |
| **Transfer Orders** | System handles transfer orders and confirmations. "The system handles transfer orders and confirmations, although some complexities may be overlooked." | • RF-based confirmation<br>• Task interleaving<br>• Performance monitoring |
| **Handling Unit Tracking** | Barcode-based HU identification. "The handling unit identifier is crucial for tracking items within the system. The system recognizes the contents of a pallet based on the barcode." | • Full HU lifecycle<br>• Pack/unpack operations<br>• Nested structures |

---

## 10. Distribution & Logistics

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Route Coverage** | 390 routes currently managed. "Current routes being managed: 390 routes." | • Route optimization<br>• Dynamic routing<br>• Capacity planning |
| **Fleet Ownership** | Mix of rented and owned vans. "Al Rawabi employs both rented and owned vans for distribution." | • Fleet management integration<br>• Cost tracking<br>• Maintenance scheduling |
| **Product Separation** | Strict policy - no mixing dairy and meat products. "There is a strict policy against mixing dairy and meat products in the same distribution vehicle to maintain compliance with health regulations." | • Compartmentalized vehicles<br>• Temperature zones<br>• Compliance tracking |
| **Temperature Control** | Different temperature requirements by product. "Dairy products require specific temperature settings. Poultry and other products may have different requirements." | • Temperature monitoring<br>• IoT integration<br>• Exception alerting |
| **Application Systems** | Separate apps for dairy and poultry. "Distribution operations for dairy utilize an in-house mobile app, while poultry uses a different application." Plan to unify in 6 months. | • Single unified application<br>• Real-time visibility<br>• Integrated settlement |

---

## 11. Van Sales Operations

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Load Request** | Day starts with load request recorded in SAP. "The day starts with a load request, which is recorded in SAP. The system tracks the load assigned to specific banks." | • Pre-order integration<br>• Demand-based loading<br>• Route optimization |
| **Transaction Capture** | Real-time in SAP. "Transactions (voids, sales, returns) are captured in real-time in SAP, not waiting for end-of-day processing." | • Mobile integration<br>• Offline capability<br>• Sync management |
| **End-of-Day Reconciliation** | All transactions consolidated. "At day-end, all transactions are consolidated, including: Good returns, Bad returns, Carryover stock." | • Automatic reconciliation<br>• Variance investigation<br>• Settlement posting |
| **Carryover Stock Visibility** | Gap in current system. "The business requires visibility into carryover stock at each location. The current system does not adequately reflect stock levels by location." | • Route-level inventory<br>• Real-time visibility<br>• FEFO enforcement |
| **Re-Cancellation Process** | Two processes - bank cell and ISTE. "Re-cancellations are executed through a custom SAP screen." Performed at end of day before final posting. | • Standard return process<br>• Reason code analysis<br>• Quality disposition |

---

## 12. Master Data Management

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Material Codes** | Duplicate codes for same items. "Duplicate codes for the same items hinder tracking and invoicing... Different codes for the same materials from various vendors complicate procurement." | • Global material master<br>• Single code per material<br>• Cross-reference tables |
| **Vendor Master** | Separate per company code. "Vendors often criticize existing systems... duplicate vendors across entities." | • Central vendor master<br>• Business partner model<br>• Approval workflow |
| **Custom Material Types** | Custom types defined (e.g., ZROH). "Custom material types are defined for specific needs (e.g., ZROH)... Need to evaluate the complexity introduced by custom material types." | • Standard types preferred<br>• Minimal customization<br>• Clear classification |
| **Master Data Governance** | Need for improvement identified. "Proper management of master data is critical for improving Integrated Planning Processes (IPP)." | • Data governance council<br>• Change control process<br>• Quality monitoring |

---

## 13. Inbound Logistics

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Logistics Team** | Part of procurement team. "The current logistics representative is part of the procurement team and is responsible for transportation logistics." | • Dedicated logistics function<br>• Carrier management<br>• Cost optimization |
| **Port Operations** | Planning around incoming deliveries at port. "Planning logistics around incoming deliveries, particularly at the port." | • Shipment tracking<br>• Customs integration<br>• Demurrage avoidance |
| **Clearing Agent** | Handles cash purchases and marking. "The clearing agent is responsible for cash purchases, marking, and buying items." | • Broker integration<br>• Duty calculation<br>• Documentation management |

---

## 14. B2B & E-Commerce

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Business Model** | Primarily B2B, not B2C. "Al Rawabi operates on a B2B model, not B2C, with e-invoicing integrated into the distribution system." | • Channel management<br>• Customer segmentation<br>• Pricing strategies |
| **E-Commerce Portal** | Exists for B2C but treated as separate channel. "An e-commerce portal exists for B2C sales, but it is treated as a separate customer channel." | • Omnichannel integration<br>• Real-time inventory<br>• Order promising |
| **E-Invoicing** | Integrated into distribution. "E-invoicing integrated into the distribution system." Tax advisor guidance on integration. | • FTA compliance<br>• Automatic generation<br>• Archive management |
| **Online Sales Growth** | Growing requirement for B2B online. "There is a growing requirement for online sales capabilities, particularly in B2B transactions." | • B2B portal<br>• EDI integration<br>• Self-service ordering |

---

## Summary of Critical Gaps

### Planning & Forecasting Gaps (High Impact)
1. **Excel-Based Planning:** Demand planning, MRP calculations, and milk balancing all in Excel
2. **MRP Not Operational:** Concept exists but not fully implemented in SAP
3. **Manual PIR Upload:** Forecast data manually processed through Resa tool before SAP upload
4. **Component-Level Balancing Missing:** Milk balanced at aggregate level, not fat/protein/SNF

### Procurement Gaps (Medium-High Impact)
5. **Manual PR-to-PO Process:** Entire procurement cycle manual with Excel consolidation
6. **No Automated Sourcing:** Vendor selection relies on buyer experience, not system
7. **Commodity Price Management:** No integrated hedging or price locking mechanism
8. **Service Contract Monitoring:** Expiration tracking manual

### Master Data Gaps (High Impact)
9. **Duplicate Material Codes:** Same materials have different codes across entities
10. **Fragmented Vendor Master:** Separate vendor records per company code
11. **Custom Material Types:** Non-standard types complicate processes
12. **No Central Governance:** Master data quality issues prevalent

### Distribution Gaps (Medium Impact)
13. **Separate Applications:** Dairy and poultry use different distribution systems
14. **Carryover Stock Visibility:** Cannot see stock levels by route/location
15. **390 Routes Manual:** Limited optimization and route-level profitability

### System & Process Gaps (Medium Impact)
16. **Petty Cash Limits:** System doesn't enforce cumulative limits on emergency purchases
17. **Biosecurity Rules Manual:** Kizad transfer restrictions not fully system-enforced
18. **WMS Underutilized:** Storage assignment not optimized

---

## Recommendations

### 1. Integrated Demand Planning
- Implement SAP IBP or SAP Demand Management in S/4HANA
- Eliminate Excel-based forecasting and balancing
- Enable component-level milk/cream balancing with PP-PI
- Automate PIR generation from forecast

### 2. MRP Activation
- Fully activate MRP with proper master data (lead times, safety stock, lot sizes)
- Configure planning strategies per material type
- Implement exception-based planning with planner workbench
- Enable automatic PR generation from MRP

### 3. Procurement Automation
- Implement source determination and automatic PO creation
- Configure outline agreements for recurring purchases
- Enable commodity contract management
- Automate service contract monitoring and renewal alerts

### 4. Master Data Harmonization
- Migrate to single global material master
- Implement SAP Business Partner for vendors
- Establish master data governance council
- Eliminate custom material types where possible

### 5. Distribution Centralization
- Implement single distribution application for dairy and poultry
- Enable route-level inventory visibility
- Integrate temperature monitoring
- Implement SAP TM for route optimization

### 6. Van Sales Enhancement
- Implement standard SAP DSD or integrated van sales solution
- Enable real-time carryover stock visibility
- Automate reconciliation and settlement
- Integrate with route profitability analysis

---

## S/4HANA Transformation Considerations

| Area | Current ECC State | S/4HANA Consideration |
|------|------------------|----------------------|
| **MRP** | Not operational | MRP Live with real-time planning available |
| **Material Master** | Duplicates across entities | Single global material opportunity |
| **Business Partner** | Separate vendor/customer | Mandatory BP model - migration required |
| **Warehouse Management** | WM active | Decision: EWM embedded or WM compatibility |
| **Planning** | Excel + IBP + Resa | SAP IBP integration or S/4 embedded planning |
| **Van Sales** | Custom + mobile app | SAP DSD or third-party integration |
| **E-Invoicing** | Implemented | DRC readiness for FTA compliance |

---

*Document generated from NXSYS Pre-Discovery Workshop Sessions - Materials Management*  
*Prepared by: NXSYS AI-Powered Discovery Engine™*

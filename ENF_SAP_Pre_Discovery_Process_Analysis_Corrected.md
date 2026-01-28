# Emirates National Food Company (ENF)
## SAP Pre-Discovery Cross-Functional Process Analysis (Corrected)

**Document Type:** Workshop Findings Analysis  
**Workshop Date:** January 23-26, 2026  
**Session:** Cross-Functional (All Modules)  
**Prepared by:** NXSYS Discovery Team

---

## Executive Summary

This document captures detailed findings from the Pre-Discovery Cross-Functional workshop conducted with Emirates National Food Company (ENF), the poultry processing arm of Al Rawabi Group. ENF operates as the central entity in the vertically integrated poultry value chain, receiving hatching eggs from Al Salwa (Liwa) and feed from Greenfields (GF), operating the hatchery to produce DOCs, growing broilers on farms, and processing/selling chicken under two brands.

**Key Finding:** ENF operates a complex integrated operation spanning hatchery, farms, and processing plants. However, the current SAP implementation lacks industry-specific functionality for livestock management, catch-weight processing, carcass splitting valuation, and biological asset accounting. Critical operations are managed through Excel-based calculations, manual processes, and workarounds that bypass SAP's intended functionality.

**Business Position in Value Chain:**
- **Inputs:** Hatching eggs from Al Salwa (Liwa) + open market; Feed from Greenfields (GF)
- **Operations:** Hatchery (eggs → DOCs) → Farms (DOCs → broilers) → Processing (slaughter → portions)
- **Outputs:** Fresh chicken (Al Rawdah brand) and Frozen chicken (Al Salwa brand)

**Critical Business Impact:** Without SAP's industry solutions, ENF cannot accurately answer fundamental poultry business questions: "What is my true cost per kg of breast meat from Flock X at Farm Y processed on Line Z, what is my yield variance against standard, and is this business profitable at a granular level?"

---

## 1. Sales & Distribution (SD)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Product Brands** | Two brands: Al Rawdah (fresh chicken) and Al Salwa (frozen chicken). "We have two brands, Rauda and Salwa." Fresh is 70%, frozen 30% of volume. | • Brand management in SAP<br>• Channel-specific pricing<br>• Brand profitability analysis |
| **Primary Sales Channel** | Van sales through 32 routes using SONIC (Android application). Routes configured as locations in SAP. "Here, our routes are our location." | • SAP DSD integration<br>• Real-time visibility<br>• Catch-weight enabled sales |
| **Van Sales Operations** | Fully offline operation. End-of-day sync with SAP. Reconciliation at van level. "Fully offline... morning people take stock, evening they come back." | • Online/real-time connectivity<br>• Cloud-based van sales<br>• Continuous sync |
| **Route Profitability** | No route-level profitability analysis. "Root level profitability you don't do it? Till now." Weekly meetings with supervisors using external reports. | • CO-PA route profitability<br>• Customer profitability<br>• Product margin by route |
| **B2B Key Accounts** | Key accounts like Nando's with marinated products. Customer provides marinade; ENF produces to spec. No formal contract management in SAP. | • Contract management<br>• Customer specification master<br>• Scheduling agreements |
| **Export Sales** | Low volume (~3% of frozen). Direct SAP sales orders. Customer collects from plant. "Export, sales... Directly from SAP." | • Export documentation<br>• Health certificate generation<br>• Halal certification |
| **Fresh vs Frozen Strategy** | Excess fresh production frozen under Al Salwa brand to avoid loss sales. "Freeze this one and we can sell after that at big price." Returns repacked as frozen. | • Demand-supply balancing<br>• Dynamic channel routing<br>• Shelf-life optimization |

---

## 2. Production Planning (PP) - Hatchery Operations

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Egg Procurement** | Hatching eggs from Al Salwa (Liwa) - primary source (internal). Also procures from open market when needed. "We are importing currently from Oman." 15-16% from external sources. | • Supplier diversification<br>• Quality-based sourcing<br>• Biosecurity protocols |
| **Egg Receipt & Grading** | Eggs received from Salwa (100,000), graded at ENF into A (hatchable) and B (reject). "Out of 100,000, 50,000 is A grade... 50,000 is B grade." B-grade returned to Salwa for sale. | • Incoming inspection automation<br>• Batch classification<br>• Quality recording |
| **Egg Storage** | Storage at ENF before setting. Extended storage (20+ days) reduces hatchability and chick quality. "Sometimes it takes 20 days, it will be there." Optimal is 7-8 days. | • FIFO by receipt date<br>• Maximum age rules<br>• Temperature monitoring |
| **Hatchery Cycle** | 21-day incubation cycle. "We have 21 days." Setting every 4 days aligned with Salwa collection schedule. ~200,000 eggs per 4-day setting. | • SAP MSG incubation management<br>• Setting schedule optimization<br>• Hatch yield tracking |
| **Hatchability Performance** | Historical estimation issues (85-86% estimate vs 90-92% actual). Recently corrected. "Their estimation was always 85-86, they were delivering 90-91." Caused DOC oversupply. | • Statistical hatchability models<br>• Breed-specific expectations<br>• Continuous calibration |
| **DOC Output** | Hatchery produces DOCs for own farms. 150,000 DOC capacity per cycle for farms. Production order for egg-to-DOC conversion. | • Production order costing<br>• Hatch yield variance<br>• Quality grading |

---

## 3. Production Planning (PP) - Farm Operations (Broiler Growing)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Farm Capacity** | 13 farms, 6 houses each, 25,000 birds per house = 150,000 capacity. "We have 13 firms, each firm 6 houses, each house 25,000." | • SAP Livestock Management<br>• House-level tracking<br>• Capacity optimization |
| **DOC Placement** | DOCs from hatchery placed in farm houses. One production order per house. "One house... it stays open till that all the parts cost you." | • Flock master data<br>• Placement scheduling<br>• Biosecurity protocols |
| **Growing Cycle** | ~35-42 days to slaughter weight. Pre-starter (days 1-10), Grower (days 11-23), Finisher (to harvest). "From 1 to 10 in a day, grower from 11 to 23. And finisher until the chicks go down." | • Growth curve monitoring<br>• Stage-based management<br>• Performance KPIs |
| **Feed Consumption Control** | CRITICAL GAP: Bulk feed delivered to silos without measurement. "There is no measuring either in the truck nor in the silos." Consumption estimated, not tracked. | • Silo-level sensors<br>• House consumption tracking<br>• Feed delivered vs consumed |
| **FCR Performance** | 1.7-1.8 actual vs 1.4 industry benchmark. "Average 1.7, 1.8... Standard in this region is how much? 1.4." 0.3-0.4 gap represents millions in losses. | • Real-time FCR by house<br>• Feed vendor performance<br>• Continuous improvement |
| **Mortality Tracking** | Recorded as scrap on production order at cycle end. Root cause analysis limited. "Mortality high... complex problems." Cannot trace to feed source when mixed. | • Daily mortality with codes<br>• Disease tracking<br>• Veterinary alerts |
| **Multi-Source DOC Issue** | DOCs from hatchery sometimes supplemented with external. When mixed in same house, traceability lost. "Sometimes we mix... If you mix in hatchery, it is by default mixed everywhere." | • Source segregation<br>• No mixing policy<br>• Supplier performance tracking |

---

## 4. Production Planning (PP) - Processing Plant

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Processing Facilities** | Two plants: PPE (fresh processing) and FPPE (frozen/further processing). "One plant is for processing that means the fresh chicken, other is for FPP." | • Integrated plant planning<br>• Line capacity optimization<br>• Yield tracking |
| **Daily Volume** | 50,000-60,000 birds per day slaughtered. "50-60,000 you will have it around 200-250,000 is what you are going to send." | • Slaughter planning<br>• Farm-to-plant coordination<br>• Capacity matching |
| **Production Order Chain** | Five production orders: (1) Egg→DOC (hatchery), (2) DOC→Broiler (farm), (3) Live→Carcass (slaughter), (4) Carcass→Portions, (5) Portions→Packed FG. | • SAP MSG integrated chain<br>• Disassembly BOM<br>• Catch-weight throughout |
| **Carcass Split Ratio** | 65-70% whole chicken, 30-35% portions (breast, thigh, drumstick, wings). "65, 70 percent... whole." No value-based splitting for joint product costing. | • MSG value-based allocation<br>• Market price splitting<br>• Portion profitability |
| **Variable Yield Challenge** | Production order created AFTER output known due to variable SKU sizes. "At the plant stage you won't know, but in the receipt stage you will know." | • MSG variable yield handling<br>• Catch-weight management<br>• Production versioning |
| **Catch Weight Gap** | No catch-weight management. Products sold by piece but vary in weight. "You may have 18 grams, 9 grams... A kilo." SAP MSG catch-weight needed. | • Catch-weight inventory<br>• Weight-based invoicing<br>• Tolerance management |

---

## 5. Materials Management (MM)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Hatching Egg Procurement** | Primary: Al Salwa (Liwa) - intercompany. Secondary: Open market imports (Oman, Saudi). "We are importing hatching eggs... currently from Oman." 15-16% external. | • Supplier qualification<br>• Quality-based sourcing<br>• Biosecurity protocols |
| **Feed Procurement** | 100% from Greenfields (GF) - intercompany. Recently resumed after quality issues. "It is started in a way that we have requested the requirement for next two months from Greenfield." | • Feed scheduling<br>• Quality monitoring<br>• Formulation alignment |
| **Feed Subsidy Management** | Government-subsidized feed via ADS municipality quota. 90% subsidized. "90% of your feed should be subsidized." Manual quota tracking in government portal. | • Quota integration<br>• Subsidy tracking<br>• Compliance documentation |
| **Feed Delivery** | Bulk tanker delivery directly to farm silos. "Entire stuff in bulk... In tankers." No measurement at delivery or consumption. Minimum 24-28 tons per tanker. | • Bag-based alternative<br>• Weighbridge verification<br>• Silo sensors |
| **Vaccine/Medication** | Managed by lab team. Cold chain requirements. Withdrawal period tracking manual. | • Cold chain integration<br>• Withdrawal automation<br>• Batch traceability |
| **Frozen Imports** | Frozen chicken imported from Brazil for FPPE processing. "We are importing from Brazil... for basically the meat." 95% of imports are frozen meat. | • Import documentation<br>• Container management<br>• Quality inspection |

---

## 6. Quality Management (QM)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Egg Quality at Receipt** | Grading at ENF into A (hatchable) and B (reject). Physical inspection. Recently implementing formal specifications. "We just started one month back with the guidance specification." | • Incoming inspection lots<br>• Automated grading<br>• Supplier scorecards |
| **Hatchery Quality** | Testing done 20-22 days into cycle (after hatch). "He is almost waiting 20-22 days to take sample." Too late for intervention on egg quality. | • Pre-incubation testing<br>• Early disease detection<br>• Hatch analysis |
| **Disease Traceability** | Cannot trace diseases back to source when batches mixed. "After 18 days I found it is Pseudomonas." Traceability lost with DOC mixing. | • Batch genealogy<br>• Farm-to-fork trace<br>• Recall capability |
| **In-Process Inspection** | Quality function exists but not in SAP. "Lot of manual work is being done here. Whether SAP know... it doesn't matter." Paper records retained shelf-life + 1 year. | • SAP QM activation<br>• HACCP CCP monitoring<br>• Automatic batch holds |
| **Returns Quality** | Returns classified as good (reprocess) or bad (rendering). Quality lot created for decision. "Quality lot is created... either in production or in production." | • QM-SD integration<br>• Root cause analysis<br>• Defect trending |
| **LIMS Integration** | No Laboratory Information Management System. Manual documentation. | • LIMS integration<br>• Automated results<br>• Trend analysis |

---

## 7. Finance & Controlling (FI/CO)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Production Costing** | Period-level costing, not production order costing. "You the amortization is basically spreading the cost... not like any normal production order." No variance analysis. | • Production order settlement<br>• Standard vs actual variance<br>• Activity-based costing |
| **Joint Product Costing** | No value-based splitting for carcass breakdown. Breast appears artificially cheap, wings show losses. "You want to know the actual cost of the part itself... all is possible in SAP MSG." | • MSG value-based allocation<br>• Market price splitting<br>• Portion margin analysis |
| **Labor Cost Allocation** | All labor charged to P&L, not products. "All the labour cost is also charged as P&L." Not part of product cost. | • Activity-based labor<br>• Cost center absorption<br>• Product-level costing |
| **Route/Customer Profitability** | No route or customer-level profitability. "Root level profitability you don't do it?" Manual analysis only. | • CO-PA multi-dimensional<br>• Route profitability<br>• Customer margin |
| **Intercompany Pricing** | Fixed transfer prices with Salwa (eggs) and GF (feed). "We have maintained one fixed price." Transport costs per Incoterms. | • Transfer pricing policy<br>• Arm's length documentation<br>• Regular reviews |
| **WIP Valuation** | Production orders open during growing cycle. WIP valued at accumulated cost. "This will be a WIP... cost in days." | • Standard WIP valuation<br>• Period-end revaluation<br>• Aging analysis |

---

## 8. Plant Maintenance (PM)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Maintenance Process** | Requests via email/verbal. Work orders created manually. "Mr. Ramaji will tell me this machine has some issue, I will create a request." | • SAP notifications<br>• Mobile requests<br>• Status tracking |
| **Climate Control Equipment** | Critical for farm operations - failure causes mass mortality. Ventilation, cooling, heating systems require high availability. | • Criticality classification<br>• Preventive maintenance<br>• Emergency response SLAs |
| **Processing Line Maintenance** | CIP (Clean-in-Place) scheduling. Breakdown response critical due to perishable product. | • PM scheduling<br>• CIP integration<br>• Line availability KPIs |
| **Spare Parts** | PR created separately from maintenance orders. Audit concerns about traceability. "We will just create a purchase acquisition separately." | • Parts linked to equipment<br>• MRP for spares<br>• Work order cost capture |

---

## 9. Warehouse Management (WM)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Temperature Zones** | Fresh (0-4°C, 24-72 hour shelf life), Frozen (-18°C, 1 year shelf life). Separate facilities PPE and FPPE. | • Temperature-zone WM<br>• FEFO by hour for fresh<br>• Cold chain monitoring |
| **Returns Handling** | 13% average returns (target 10-12%). Good returns repacked as frozen Al Salwa brand; bad returns to rendering. "80% is good... replant at a different plant... Salma." | • Returns inspection<br>• Grade-based routing<br>• Rendering by-product |
| **FEFO Compliance** | Batch by production date. FEFO claimed but system enforcement unclear. | • System-enforced FEFO<br>• Minimum shelf-life ATP<br>• Customer requirements |
| **Egg Storage** | Hatching eggs stored before setting. Quality degrades beyond 8 days. "8 days is what I use... after this hatchability goes down." | • Age-based routing<br>• Setting priority<br>• Quality degradation |

---

## 10. Enterprise Integration & Reporting

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Van Sales Integration** | SONIC syncs with SAP once daily. Master data from SAP; transactions uploaded end-of-day. | • Real-time integration<br>• Cloud middleware<br>• Continuous sync |
| **Salwa Integration** | Manual coordination for egg collection. Paper delivery notes. Grading results communicated manually. | • Intercompany STO<br>• Real-time visibility<br>• Automatic invoicing |
| **GF Integration** | Feed requirements communicated manually. No integrated planning between feed mill and farm needs. | • S&OP integration<br>• Demand-driven supply<br>• Quality feedback loop |
| **Reporting Performance** | System very slow. "For 1 month also sometimes it will not run." All company codes in one landscape. | • BW/4HANA analytics<br>• Real-time dashboards<br>• Embedded analytics |

---

## Summary of Critical Gaps

### Industry Solution Gaps (Fundamental)
1. **No SAP Livestock Management:** Flock tracking, daily performance, mortality absent
2. **No SAP MSG:** Catch-weight, carcass splitting, variable yield missing
3. **No Value-Based Splitting:** Cannot determine true portion costs
4. **No Catch-Weight Management:** Products vary in weight but not tracked

### Process Control Gaps (High Risk)
5. **Feed Consumption Uncontrolled:** Bulk to silos without measurement - FCR unverifiable
6. **FCR 25-30% Above Benchmark:** 1.7-1.8 vs 1.4 = millions in potential savings
7. **DOC/Egg Source Mixing:** Traceability lost when batches mixed
8. **Hatchability Estimation Errors:** Caused systematic oversupply

### Costing & Profitability Gaps (High Impact)
9. **Period Costing Only:** No production order costing with variance
10. **Labor Not Allocated:** Direct labor charged to P&L, not products
11. **No Route/Customer Profitability:** Cannot identify profitable channels

### Integration Gaps (Medium-High Risk)
12. **Paper-Based Intercompany:** Manual delivery notes with Salwa
13. **No Planning Integration:** Disconnected from Salwa and GF
14. **Slow Reporting:** Reports don't run due to data volumes

---

## Recommendations

### 1. SAP S/4HANA with Industry Solutions
- **SAP Livestock Management:** Hatchery + farm operations tracking
- **SAP Meat & Fish Management (MSG):** Catch-weight, carcass splitting, variable yield

### 2. Feed Control Transformation
- Bag-based delivery for measurability OR silo sensors
- House-level consumption tracking
- FCR by house, feed source, and vendor

### 3. Integrated Planning
- S&OP process across Salwa-ENF-GF
- Demand-driven egg procurement
- Hatchery-farm-processing capacity balancing

### 4. Costing Accuracy
- Production order costing with settlement
- Value-based joint product allocation
- Activity-based labor costing
- CO-PA for route and customer profitability

### 5. Intercompany Automation
- SAP-based transfers with Salwa and GF
- Automatic invoicing and reconciliation
- Real-time visibility across entities

---

*Document generated from NXSYS Pre-Discovery Workshop Sessions - Cross-Functional (ENF)*  
*Prepared by: NXSYS AI-Powered Discovery Engine™*

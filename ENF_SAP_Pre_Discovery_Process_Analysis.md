# Emirates National Food Company (ENF)
## SAP Pre-Discovery Cross-Functional Process Analysis

**Document Type:** Workshop Findings Analysis  
**Workshop Date:** January 23-26, 2026  
**Session:** Cross-Functional (All Modules)  
**Prepared by:** NXSYS Discovery Team

---

## Executive Summary

This document captures detailed findings from the Pre-Discovery Cross-Functional workshop conducted with Emirates National Food Company (ENF), the poultry processing arm of Al Rawabi Group. The analysis reveals significant gaps in the current SAP ECC implementation when compared to industry-specific SAP solutions such as S/4HANA Livestock Management and Meat & Fish Management (MSG).

**Key Finding:** ENF operates a complex vertically integrated poultry operation spanning breeding (Liwa/Salwa), hatchery, farms, processing (fresh and frozen), and distribution. However, the current SAP implementation lacks industry-specific functionality for livestock management, catch-weight processing, carcass splitting valuation, and biological asset accounting. Critical operations are managed through Excel-based calculations, manual processes, and workarounds that bypass SAP's intended functionality.

**Critical Business Impact:** Without SAP's industry solutions, ENF cannot accurately answer fundamental poultry business questions: "What is my true cost per kg of breast meat from Flock X at Farm Y processed on Line Z, what is my yield variance against standard, and is this business profitable at a granular level?"

---

## 1. Sales & Distribution (SD)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Primary Sales Channel** | Van sales represents majority of fresh poultry sales through 32 routes. Routes are configured as locations in SAP (unlike dairy). SONIC (Android-based van sales application) manages field operations. | • SAP DSD with full route integration<br>• Real-time visibility and tracking<br>• Catch-weight enabled sales |
| **Van Sales System** | SONIC application (different from ARDC's Ransale). Routes ARE locations in SAP. "Here, our routes are our location... route are the location." Reconciliation happens at van level, not depot level. | • SAP MSG sales integration<br>• Catch-weight order management<br>• Customer specification management |
| **Device Operations** | Fully offline operation. "Fully offline... morning people take stock, evening they come back." End-of-day sync with SAP for master data and transactions. | • Online/real-time connectivity<br>• Cloud-based van sales<br>• Continuous sync capability |
| **Route Profitability** | Currently no route profitability analysis in place. "Root level profitability you don't do it? Till now." Weekly meetings with supervisors for route analysis based on external reports. | • Route profitability in SAP CO-PA<br>• Customer profitability analysis<br>• Product margin by route |
| **Export Sales** | Very low volume (~3% of frozen sales). Managed directly in SAP with manual sales orders. "Export, sales, that will be in Android... Directly from SAP." Customer picks up; no delivery responsibility. | • Export documentation automation<br>• Health certificate generation<br>• Halal certificate integration |
| **B2B Key Accounts** | Key accounts like Nando's have dedicated handling. Marinated products produced to customer specifications. "Nando's... they provide the marination, free of charge." No formal contract management in SAP. | • Contract management in SD<br>• Customer specification master<br>• Scheduling agreement handling |
| **Private Labeling** | White-label production for customers like Viva. Customer provides artwork; ENF produces and packages. Recipe and pricing included in arrangement. | • Subcontracting integration<br>• Customer-furnished materials<br>• Specification-driven production |

---

## 2. Production Planning (PP) - Hatchery Operations

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Egg Procurement** | Hatching eggs procured from Liwa/Salwa (internal entity). 100,000 eggs delivered; graded into A (hatchable) and B (reject) at ENF. "100,000 you have not received... they receive 100,000, physically." | • SAP Livestock Management<br>• Egg quality tracking by batch<br>• Supplier performance scoring |
| **Egg Grading Process** | Physical segregation done at ENF. A-grade goes to incubation; B-grade returned to Salwa for sale. "Out of 100,000, 50,000 is A grade... 50,000 is B grade." Manual delivery notes - not in SAP. | • Quality inspection at receipt<br>• Automatic batch classification<br>• Digital grading records |
| **Production Order Structure** | Single production order for egg-to-DOC conversion (21-day cycle). "One production order for entire lot." Scrapping recorded during cycle for mortality and infertile eggs. | • MSG incubation management<br>• Daily mortality tracking<br>• Hatch yield analysis |
| **Hatchability Estimation** | Historical estimation issues - estimates at 85-86% but actual 90-92%. "Their estimation was always 85-86, they were delivering 90-91." Recently corrected after intervention. | • Statistical hatchability models<br>• Breed-specific expectations<br>• Continuous improvement tracking |
| **DOC Output Recording** | Good production (DOCs) receives all accumulated costs. GRM based on number of viable DOCs. "Good production... total cost is allocated divided by the good production." | • Standard cost with variance<br>• Breed performance comparison<br>• Hatchery efficiency KPIs |
| **Intercompany Transfer** | Eggs transferred from Salwa to ENF via manual delivery notes. "Delivery note that you have sent, it's just paperwork. It's not from SAP." No traceability in system. | • Intercompany STO with full trace<br>• Transfer pricing documentation<br>• Quality inspection at transfer |

---

## 3. Production Planning (PP) - Farm Operations (Livestock Management)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Flock Master Data** | No SAP Livestock Management. "You don't have anywhere in the system right, that is completely MSG part." Flock data managed outside system. | • SAP Livestock Management flock master<br>• Breed/strain tracking<br>• Placement date and vaccination program |
| **House-Level Tracking** | One production order per house. "One house... for 15 days or whatever is your period, it stays open." All costs charged to house production order until harvest. | • Daily flock transactions<br>• House-level performance KPIs<br>• Real-time mortality tracking |
| **Feed Consumption Control** | Major control gap identified. Feed delivered in bulk to silos without measurement. "There is no measuring in the tanker also... There is no measuring either in the truck nor in the silos." | • SAP Livestock feed consumption<br>• Silo-level inventory tracking<br>• House-by-house consumption |
| **Feed Delivery Method** | Bulk delivery via tankers from GF (Greenfields). No measurement at delivery or consumption. "By measuring of a thread and tail which they do with the sensors." Manual estimation only. | • Bag-based delivery for control<br>• Weighbridge integration<br>• Consumption by house tracking |
| **FCR Calculation** | Reported FCR of 1.7-1.8 vs industry benchmark of 1.4. "Average 1.7, 1.8... Standard in this region is how much? 1.4." Cannot determine feed quality impact by vendor due to mixing. | • FCR by flock/house/vendor<br>• Performance-based vendor scoring<br>• Real-time FCR monitoring |
| **Mortality Tracking** | Mortality recorded as scrap on production order at closure. "Mortality high... 1.7 to 4... 1.4 to 1.9." Root cause analysis limited due to lack of system data. | • Daily mortality with reason codes<br>• Disease tracking integration<br>• Veterinary alert system |
| **Feed Procurement** | Government-subsidized feed via ADS municipality quota system. "Feed is under subsidy of the government." Limited to approved suppliers; quota punched in government portal. | • Subsidy tracking in SAP<br>• Quota management integration<br>• Supplier performance by feed type |
| **Multi-Source DOC Mixing** | DOCs from internal (Liwa) and external suppliers mixed in same houses. "Sometimes we mix... our farm capacity is 150,000... we don't have enough chicks from the river." Traceability lost. | • Source segregation by house<br>• Supplier performance tracking<br>• No mixing policy enforcement |

---

## 4. Production Planning (PP) - Processing Plant (Slaughter & Portions)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Production Order Chain** | Five production orders: (1) Egg→DOC, (2) DOC→Broiler, (3) Slaughter→Carcass, (4) Carcass→Portions, (5) Portions→Packed FG. "In total 5 production order." | • SAP MSG integrated chain<br>• Disassembly BOM with yields<br>• Catch-weight throughout |
| **Live Bird Receipt** | Birds received from farms. "50-60,000 you will have it around 200-250,000 is what you are going to send." Daily processing volume 50,000-60,000 birds. | • MSG live receiving<br>• Platform weighing integration<br>• Ante-mortem inspection |
| **Slaughter Processing** | Fresh processing (PPE plant) and frozen processing (FPPE plant) are separate facilities. "One plant is for processing that means the fresh chicken, other is for FPP." 70% fresh, 30% frozen ratio. | • MSG slaughter planning<br>• Line capacity optimization<br>• Yield tracking by line |
| **Carcass to Portions** | Variable yield challenge - production order created AFTER actual output known. "At the plant stage you won't know, but in the receipt stage you will know." Plan differs from actual significantly. | • MSG variable yield handling<br>• Catch-weight management<br>• Production versioning |
| **SKU Variability** | Multiple SKU sizes output from same input (1kg, 1.2kg, etc.). "You may have 18 grams, 9 grams, right? A kilo." SKU determined at packing based on actual weight. | • Weight-range classification<br>• Automatic SKU assignment<br>• Catch-weight inventory |
| **Portion Split Ratio** | 65-70% whole chicken, 30-35% portions (thighs, drumsticks, breast, etc.). "65, 70 percent... whole... portions you create overall." | • MSG carcass breakdown BOM<br>• Value-based splitting<br>• By-product costing |
| **Joint/By-Product Costing** | No value-based splitting. "You want to know the actual cost of the part itself so that when you sell it you know... all is possible in a SAP MSG." Critical gap for pricing decisions. | • MSG value-based allocation<br>• Market price-driven splitting<br>• Portion profitability |

---

## 5. Materials Management (MM)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **DOC Procurement** | DOCs imported from Saudi Arabia. "DOC is from Saudi. Everything is Saudi. Entire Saudi." Delivered to doorstep; no inbound logistics management. | • Supplier quality management<br>• Import documentation<br>• Arrival inspection |
| **DOC Quality Specs** | Quality specifications for DOCs only recently implemented. "We just started one month back with the guidance specification." Previously no specs in purchase orders. | • Vendor qualification program<br>• Specification compliance tracking<br>• Performance scorecards |
| **Feed Ingredient Procurement** | Greenfields (GF) is main supplier for chicken feed. 90% subsidized feed. "90% of your feed should be subsidized." External purchases only when quota exceeded. | • Nutritional spec management<br>• Mycotoxin testing records<br>• Supplier qualification |
| **Vaccine/Medication Inventory** | Managed by farm manager and lab. "Vaccine also lab does it." PR created based on requirements. Cold chain management not addressed in discussion. | • Cold chain tracking<br>• Withdrawal period automation<br>• Lot traceability to flocks |
| **Live Bird Inventory Valuation** | No daily valuation of growing birds. Birds valued through production order only at cycle end. "This 110%, this is how your mortality will go down." Millions in growing inventory not properly valued. | • SAP Livestock daily valuation<br>• Weight gain recognition<br>• Mortality deduction |
| **Packaging Materials** | Separate procurement for different brands (Rauda for fresh, Salwa for frozen). Private label packaging sourced based on customer artwork. | • Packaging BOM integration<br>• Customer-specific material<br>• Label management |

---

## 6. Quality Management (QM)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **DOC Quality at Receipt** | Quality checks performed but recently formalized. "Unless my egg or my DOCs have a specification generated as per the standard in the market." Swab tests conducted. | • Incoming inspection automation<br>• Supplier performance tracking<br>• Non-conformance management |
| **Hatching Egg Quality** | Testing done 20-22 days into cycle (after hatch). "He is almost waiting 20-22 days to take sample... Then he will receive the results." Too late for intervention. | • Pre-incubation testing<br>• Infrared egg analysis<br>• Early disease detection |
| **Disease Traceability** | Pseudomonas example cited - identified after 18 days. "After 18 days I found it is Pseudomonas." Cannot trace back to source when batches mixed. | • Batch genealogy tracking<br>• Farm-to-fork traceability<br>• Recall capability |
| **In-Process Inspection** | Quality function exists but not recorded in SAP. "Lot of manual work is being done here. Whether SAP know, SAP ERP know, it doesn't matter." Paper-based records retained shelf-life + 1 year. | • SAP QM inspection lots<br>• HACCP CCP monitoring<br>• Automatic batch holds |
| **Returns Quality Handling** | Returns from market classified as good (reprocess) or bad (rendering). Quality lot created in SAP for decision. "Quality lot is created... either in production or in production." | • QM-SD integration<br>• Root cause analysis<br>• Defect pattern tracking |
| **LIMS Integration** | No Laboratory Information Management System. "Do we use some LIMS system? No." Manual documentation. Cloud storage for some records, physical files for daily records. | • LIMS integration<br>• Automated result capture<br>• Trend analysis |
| **Microbiological Testing** | Testing performed but results not linked to production batches in SAP. "They need all the documents. If there is a problem, you need to trace it." | • Salmonella/Campylobacter tracking<br>• Antibiotic residue testing<br>• Regulatory compliance docs |

---

## 7. Finance & Controlling (FI/CO)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Biological Asset Accounting** | Breeding flock capitalized for 24 weeks, then amortized weeks 25-65 per IAS 41. "Till railing... all the month. Till 24 weeks. And then we start amortization from week 25 till 65." | • SAP biological asset module<br>• Daily fair value adjustment<br>• IAS 41 compliance |
| **Amortization Calculation** | Excel-based calculations posted via journal vouchers. "For amortization what do you use... excel... Posting through JVs." Not charged to production orders or COGS. | • Automated amortization<br>• Integration with CO<br>• COGS allocation |
| **Production Costing** | Period-level costing, not production order costing. "You the amortization is basically spreading the cost over the life of the livestock." No standard cost variance analysis. | • Production order settlement<br>• Standard vs actual variance<br>• Activity-based costing |
| **Labor Cost Allocation** | All labor charged to P&L, not allocated to production. "All the labour cost is also charged as P&L." Not part of product cost. | • Activity-based labor allocation<br>• Cost center absorption<br>• Product-level labor cost |
| **COGS Accuracy** | COGS incomplete - excludes amortization and labor. "Then your COPPA report will not give you the profitability for the sold, because amortization is not a part of your COPPA report." | • Complete COGS calculation<br>• CO-PA profitability<br>• Margin analysis |
| **Intercompany Pricing** | Fixed transfer prices between ENF, Salwa/Liwa, and GF. "We have maintained one fixed price for both and that is what we keep checking." Transport costs borne by buyer. | • Transfer pricing documentation<br>• Arm's length compliance<br>• Intercompany elimination |
| **Route/Customer Profitability** | No route-level or customer-level profitability. "We have it till now... Root level profitability you don't do it?" Weekly manual analysis from external reports. | • CO-PA multi-dimensional<br>• Route profitability<br>• Customer margin analysis |
| **WIP Valuation** | Production orders kept open during growing cycle. WIP valued at accumulated cost. "This will be a WIP... cost in days... which is used until that month." | • Standard WIP valuation<br>• Period-end revaluation<br>• Aging analysis |

---

## 8. Plant Maintenance (PM)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Maintenance Request Process** | Requests come via email/verbal communication. "Mr. Ramaji will tell me this machine has some issue, I will create a request." Not systematically recorded in SAP. | • SAP maintenance notifications<br>• Mobile maintenance requests<br>• Status tracking |
| **Work Order Creation** | Work orders created manually after request. PR created from work order for parts. "In the work order I will make a purchase requisition." Limited visibility of request-to-completion. | • Integrated maintenance workflow<br>• Automatic PR generation<br>• Cost tracking by asset |
| **Preventive Maintenance** | Existence unclear from discussion. Focus on breakdown maintenance. Critical for climate control equipment in farms where failure causes mass mortality. | • PM scheduling<br>• Climate system priority<br>• CIP scheduling for processing |
| **Spare Parts Management** | Purchase requisitions created separately from maintenance orders. "We will just create a purchase acquisition separately... pre-audit they are asking for supporting documents." Audit concerns. | • Parts linked to equipment<br>• MRP for spares<br>• Work order cost capture |
| **Document Management** | Documents attached via email or manual process. Interest in DMS integration. "I am interested in finding some storage and start attaching documents in SAP." | • SAP DMS integration<br>• Document retention<br>• Audit trail |

---

## 9. Warehouse Management (WM)

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Temperature Zones** | Fresh (0-4°C, 24-72 hour shelf life), Frozen (-18°C, 1 year shelf life). Separate facilities for fresh (PPE) and frozen (FPPE). | • Temperature-zone WM<br>• FEFO by hour for fresh<br>• Cold chain monitoring |
| **Inventory Valuation** | Standard costing. Fresh product 3-day shelf life. "Third-day production sold to restaurants at lowest price." Returns frozen under different brand (Salwa). | • Shelf-life based valuation<br>• Near-expiry markdown<br>• Quality-grade pricing |
| **Returns Handling** | 13% average returns (target 10-12%). Good returns repacked as frozen; bad returns to rendering. "80% is good... open it, replant at a different plant... Salma, and send it to our stores as frozen." | • Returns inspection workflow<br>• Grade-based routing<br>• Rendering by-product tracking |
| **FEFO Compliance** | Batch numbers by production date. FEFO claimed but system enforcement unclear. Same-day batches simplify management. | • System-enforced FEFO<br>• Minimum shelf-life ATP<br>• Customer shelf-life requirements |

---

## 10. Enterprise Integration & Reporting

| Process Step | Current State at ENF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Van Sales Integration** | SONIC system (Android) syncs with SAP once daily. Master data from SAP; transactions uploaded end-of-day. | • Real-time integration<br>• Cloud-based middleware<br>• Continuous sync |
| **Government Portal Integration** | Feed subsidy quota managed in ADS municipality portal. Manual coordination between SAP and portal. | • API integration<br>• Automatic quota tracking<br>• Compliance documentation |
| **Intercompany Integration** | Manual coordination between ENF, Salwa/Liwa, and GF. Paper-based transfer notes. "Delivery note... it's just paperwork. It's not from SAP." | • Intercompany STO automation<br>• Real-time visibility<br>• Consolidated reporting |
| **Reporting Performance** | System very slow for reports. "System normally should give you right away... it does not give... For 1 month also sometimes it will not run." All company codes in one landscape. | • Data warehouse/analytics<br>• BW/BPC implementation<br>• Real-time dashboards |
| **KPI Visibility** | Critical KPIs (FCR, mortality, yield) calculated outside SAP. "How do you find a root viable? On what basis we close and open a root?" Manual analysis only. | • Embedded analytics<br>• Real-time KPI dashboards<br>• Exception alerting |

---

## Summary of Critical Gaps

### Industry Solution Gaps (Fundamental)
1. **No SAP Livestock Management:** Flock master data, daily transactions, performance KPIs completely absent
2. **No SAP MSG (Meat & Fish):** Catch-weight, carcass splitting, variable yield handling missing
3. **No Value-Based Splitting:** Cannot determine true cost of portions (breast appears cheap, wings show losses)
4. **No Biological Asset Daily Valuation:** Growing birds worth millions not properly tracked

### Process Control Gaps (High Risk)
5. **Feed Consumption Uncontrolled:** Bulk delivery to silos without measurement - cannot verify actual consumption
6. **FCR 25-30% Above Benchmark:** 1.7-1.8 vs industry 1.4 - millions in potential savings
7. **Multi-Source DOC Mixing:** Traceability lost when flocks from different suppliers mixed
8. **Quality Specs Recently Implemented:** Vendor specifications only started one month ago

### Costing & Profitability Gaps (High Impact)
9. **Period Costing Only:** No production order costing with variance analysis
10. **Amortization Outside COGS:** Biological asset amortization not in product cost
11. **Labor Not Allocated:** Direct labor charged to P&L, not products
12. **No Route/Customer Profitability:** Cannot identify profitable routes or customers

### Integration & Visibility Gaps (Medium-High Risk)
13. **Excel-Based Calculations:** Amortization, FCR, mortality all calculated in spreadsheets
14. **Paper-Based Intercompany:** Transfer notes not in SAP - audit risk
15. **Slow Reporting:** Reports take hours or don't run due to data volumes
16. **Manual Government Compliance:** Subsidy quota tracked manually

---

## Recommendations

### 1. SAP S/4HANA with Industry Solutions
- **SAP Livestock Management:** Implement for complete flock lifecycle tracking from DOC to slaughter
- **SAP Meat & Fish Management (MSG):** Deploy for catch-weight processing, carcass splitting, and variable yield

### 2. Feed Control Transformation
- Convert from bulk tanker to bag-based feed delivery for measurability
- Implement silo-level sensors if bulk continues
- Segregate feed consumption by house and vendor for FCR analysis

### 3. Biological Asset Accounting
- Implement daily valuation of growing livestock per IAS 41
- Integrate amortization into production costing
- Automate through SAP Agricultural Contract Management

### 4. Traceability Enhancement
- Enforce no-mixing policy for DOCs from different sources
- Implement batch genealogy for farm-to-fork traceability
- Enable quality-driven production with automatic batch holds

### 5. Costing Accuracy
- Implement production order costing with settlement
- Allocate labor costs to products via activity-based costing
- Deploy CO-PA for route and customer profitability

### 6. Integration Modernization
- Real-time van sales integration
- Government portal API integration
- Implement BW/4HANA for analytics and reporting

---

*Document generated from NXSYS Pre-Discovery Workshop Sessions - Cross-Functional (ENF)*  
*Prepared by: NXSYS AI-Powered Discovery Engine™*

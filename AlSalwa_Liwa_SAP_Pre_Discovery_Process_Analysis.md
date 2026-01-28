# Al Salwa Poultry Breeders (Liwa)
## SAP Pre-Discovery Cross-Functional Process Analysis

**Document Type:** Workshop Findings Analysis  
**Workshop Date:** January 23-26, 2026  
**Session:** Cross-Functional (All Modules)  
**Prepared by:** NXSYS Discovery Team

---

## Executive Summary

This document captures detailed findings from the Pre-Discovery Cross-Functional workshop conducted with Al Salwa Poultry Breeders, located in Liwa. Al Salwa operates as the parent stock breeding operation within Al Rawabi Group's vertically integrated poultry division, responsible for producing hatching eggs that are sold exclusively to ENF (Emirates National Food Company) for broiler production.

**Key Finding:** Al Salwa operates a specialized parent stock breeding operation with a biological asset lifecycle spanning 65 weeks (24 weeks rearing + 41 weeks laying). The current SAP implementation lacks industry-specific functionality for livestock management, biological asset accounting per IAS 41, and proper integration with downstream ENF operations. Critical processes including DOC procurement planning, flock performance tracking, and egg quality grading are managed through manual processes and Excel calculations.

**Business Position in Value Chain:**
- **Upstream:** Procures Day-Old Chicks (DOCs) from Saudi Arabia
- **Operations:** Grows parent birds through rearing (0-24 weeks) and laying (25-65 weeks) cycles
- **Downstream:** Sells 100% of hatching eggs to ENF (single customer, intercompany)

---

## 1. Company Overview & Value Chain Position

| Aspect | Current State at Al Salwa | Industry Best Practice |
|--------|---------------------------|------------------------|
| **Business Function** | Parent stock breeding operation producing hatching eggs. "We are the parent... we are growing the parents, and then they collect the eggs." Single product output: Grade A hatching eggs. | • SAP Livestock Management<br>• Biological asset tracking<br>• Breeding program management |
| **Customer Base** | 100% intercompany - all eggs sold to ENF. "Whatever they produce we buy it. They are not selling... Basically it's a production." No external sales except B-grade eggs. | • Intercompany integration<br>• Transfer pricing automation<br>• Demand-driven production |
| **Product Output** | Hatching eggs (Grade A) for ENF hatchery. B-grade eggs (undersized, double yolk) sold externally as table eggs. "Grade B... we sell it in the market." | • Egg grading automation<br>• Quality-based pricing<br>• By-product management |
| **Organizational Structure** | Operational team separate, support functions (finance, costing) centralized with poultry division. "They don't have sales team because whatever they produce we buy it." | • Integrated division planning<br>• Shared services model<br>• Cross-entity coordination |
| **Division Integration** | Part of poultry division with ENF and GF. "Liva, this one ENF and GF all forms are the poll tree for us." Elimination at division level. | • Consolidated planning<br>• Intercompany automation<br>• Division-level reporting |

---

## 2. Production Planning (PP) - DOC Procurement & Rearing

| Process Step | Current State at Al Salwa | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **DOC Sourcing** | 100% imported from Saudi Arabia. "We are procuring DOCs from Saudi Arabia." Single source country. Limited supplier options (competitor Ajman will not sell). | • Multiple source countries<br>• Supplier qualification<br>• Biosecurity protocols |
| **DOC Planning** | Capacity-based planning, not demand-driven. "Capacity is the plan... There is no plan as such." Full capacity (30,000 DOCs) procured 3 times per year. | • Demand-driven planning<br>• S&OP integration<br>• Optimal batch sizing |
| **Procurement Frequency** | 3 batches per year, 30,600 DOCs each. "How many times in a year? 3 times in a year... 30,600." Aligned with rearing house availability. | • Continuous supply planning<br>• Risk-balanced batching<br>• Seasonal optimization |
| **DOC Quality Specifications** | Recently implemented specifications for suppliers. Quality parameters being established for vendor accountability. | • Incoming inspection<br>• Supplier scorecards<br>• Quality claims process |
| **Rearing Cycle** | 0-24 weeks in rearing houses. 4 houses in one rearing farm. "In reading we have 4 houses in one farm." 10% male birds in flock. | • SAP Livestock flock tracking<br>• Growth curve monitoring<br>• Mortality tracking |
| **Rearing to Laying Transfer** | Birds move from rearing to laying houses at 18-24 weeks. "By 18 weeks, the doctor will move the DOC from the reading to production." 1 month downtime for cleaning. | • Automated transfer planning<br>• House preparation scheduling<br>• Biosecurity protocols |

---

## 3. Production Planning (PP) - Laying Operations

| Process Step | Current State at Al Salwa | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Laying House Capacity** | 2 farms with 4 houses each = 8 laying houses. "For laying we have 2 farms, each farm is 4." ~26,000 birds per flock in production. | • House capacity optimization<br>• Flock density management<br>• Climate control integration |
| **Production Cycle** | Laying from week 25 to week 65 (41 weeks production). "Production cycle... reading cycle starts from 0 to 24 weeks... until 65 weeks." | • Production curve tracking<br>• Peak production management<br>• End-of-lay decisions |
| **Daily Egg Production** | ~52,000 eggs per day at peak from 2 active flocks. "Ideal cycle is 52,000 as your optimum size." Production varies by flock age. | • Daily production recording<br>• Yield analysis<br>• Flock performance KPIs |
| **Egg Collection Frequency** | Eggs collected by ENF every 4 days. "Every four days... Because our HD cycle is, every four days we do this." Storage at Salwa between collections. | • Daily collection integration<br>• Storage optimization<br>• Shelf-life management |
| **Flock Lifecycle Management** | Two flocks rotating - one entering as other approaches end-of-lay. "Any given point of time... It will be two." Continuous production maintained. | • Flock scheduling<br>• Replacement planning<br>• Capacity utilization |
| **End of Lay** | Birds disposed at 65 weeks. "We will dispose it off." Culling process and disposal managed locally. | • Spent hen processing<br>• By-product recovery<br>• Disposal compliance |

---

## 4. Quality Management (QM) - Egg Grading

| Process Step | Current State at Al Salwa | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Egg Grading Process** | Physical grading at collection. Grade A (≥50g, hatchable) vs Grade B (undersized, defects). "They have these quality of the egg that they should be around 50 grams above the size." | • Automated grading equipment<br>• Weight-based classification<br>• Defect detection |
| **Grade A Criteria** | Weight ≥50 grams, proper shell quality, single yolk. "If the egg comes in 48 grams... it becomes grade B." Only Grade A sent for hatching. | • Multi-parameter grading<br>• Statistical process control<br>• Specification management |
| **Grade B Reasons** | Undersized eggs (early laying period), double yolk, shell defects, floor eggs vs nest eggs. "Some eggs have double yolk... floor, nest." | • Defect categorization<br>• Root cause analysis<br>• Flock health correlation |
| **B-Grade Occurrence** | Primarily in first 1-2 weeks of laying cycle. "It only happens when the chick started laying eggs in the initial days." 3 occurrences per year (new flock starts). | • Production curve analysis<br>• Expected B-grade planning<br>• Market channel management |
| **Grading Location** | Grading done at ENF upon receipt, not at Salwa. "Once you segregate it... hatchery decides which are A and B." Salwa ships all eggs. | • Source grading preferred<br>• Quality at origin<br>• Transport optimization |
| **B-Grade Sales** | B-grade eggs returned to Salwa books for external sale as table eggs. "This 50,000 is, now what you do with this 50,000... Salwa will sell it." | • By-product revenue<br>• Market channel management<br>• Pricing optimization |

---

## 5. Materials Management (MM)

| Process Step | Current State at Al Salwa | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **DOC Procurement** | Import from Saudi Arabia. Delivered to Liwa location. No inbound logistics management - delivered to door. "Delivered products... To the location." | • Import documentation<br>• Customs clearance<br>• Quarantine protocols |
| **Feed Procurement** | Feed supplied by GF (Greenfields) via ENF. Subsidized feed from government quota via ADS municipality. "Feed is under subsidy of the government." | • Feed scheduling<br>• Quota management<br>• Supplier coordination |
| **Feed Delivery** | Bulk tanker delivery to silos. Same control issues as ENF farms - no measurement at silo level. Consumption estimated, not measured. | • Bag-based delivery<br>• Silo sensors<br>• Consumption tracking |
| **Vaccine/Medication** | Managed by farm manager and veterinarian. "Vaccine also lab does it." Vaccination schedule based on bird age and health protocols. | • Cold chain management<br>• Withdrawal period tracking<br>• Batch traceability |
| **Inventory Valuation** | Birds valued through capitalization model. No daily valuation of growing flock. Static inventory approach until production order completion. | • SAP Livestock valuation<br>• Daily fair value<br>• IAS 41 compliance |

---

## 6. Finance & Controlling (FI/CO)

| Process Step | Current State at Al Salwa | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Biological Asset Accounting** | Capitalization for 24 weeks (rearing), then amortization weeks 25-65 (laying). "Till railing... all the month. Till 24 weeks. And then we start amortization from week 25 till 65." IAS 41 approach. | • SAP biological asset module<br>• Daily fair value adjustment<br>• Automated amortization |
| **Capitalization Components** | DOC cost + feed + vaccination + overhead accumulated during rearing. "All the cost what you incurred approximately." Creates asset value at week 24. | • Cost accumulation automation<br>• Overhead allocation<br>• Activity-based costing |
| **Amortization Calculation** | Excel-based calculation, posted via journal vouchers. "For amortization what do you use... excel... Posting through JVs." Spread over 41 laying weeks. | • Automated amortization<br>• System-calculated depreciation<br>• Audit trail |
| **Production Order Structure** | Two production orders: (1) Rearing - DOC to laying-ready bird, (2) Laying - for cost capture during production. Costs accumulated on orders. | • Integrated production costing<br>• Variance analysis<br>• Standard cost comparison |
| **Egg Costing** | Period costing approach. "Whatever is produced is considered as sold." Feed and vaccination costs allocated to eggs produced. | • Actual production costing<br>• Cost per egg tracking<br>• Yield-based allocation |
| **Intercompany Pricing** | Fixed transfer price for eggs to ENF. "We have maintained one fixed price for both." ENF truck collects - no transport cost to Salwa. | • Market-based transfer pricing<br>• Regular price reviews<br>• Arm's length documentation |

---

## 7. Sales & Distribution (SD)

| Process Step | Current State at Al Salwa | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Customer Base** | Single customer - ENF (intercompany). "Whatever they produce we buy it." 100% of Grade A eggs. B-grade sold externally. | • Scheduling agreements<br>• Intercompany automation<br>• EDI integration |
| **Order Process** | No formal sales orders - production-driven supply. ENF collects every 4 days based on production. Manual delivery notes, not SAP. | • Automatic order generation<br>• Delivery scheduling<br>• POD capture |
| **Delivery Process** | ENF truck collects eggs from Salwa. "The buyer brings the truck and takes it to the cashier." Transport cost borne by ENF. | • Incoterms documentation<br>• Delivery confirmation<br>• Quality at handover |
| **Invoice Process** | Invoice created after grading at ENF. Only Grade A invoiced. "Invoice to ENF will be on grade A." B-grade returned to Salwa books. | • Automatic invoicing<br>• Intercompany matching<br>• Reconciliation |
| **Documentation Gap** | Delivery notes are manual/paper-based. "Delivery note... it's just paperwork. It's not from SAP." No system traceability for egg transfers. | • SAP delivery documents<br>• Batch traceability<br>• Audit compliance |
| **B-Grade External Sales** | Sold as table eggs in external market. Separate sales process from intercompany. Small volume, managed from Salwa books. | • By-product sales channel<br>• Pricing management<br>• Customer management |

---

## 8. Plant Maintenance (PM)

| Process Step | Current State at Al Salwa | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Critical Assets** | Climate control systems (ventilation, cooling, heating) - failure causes mass mortality. "Climate-critical farm assets... where failure causes mass mortality within hours." | • Criticality classification<br>• Redundancy planning<br>• Emergency response SLAs |
| **Maintenance Approach** | Details not extensively covered in workshop. Presumed similar gaps to ENF - reactive maintenance, limited SAP integration. | • Preventive maintenance<br>• Condition monitoring<br>• Predictive analytics |
| **House Preparation** | 1-month downtime between flocks for cleaning and preparation. "There will be down time in the period of 1 month for cleaning." | • Turnaround scheduling<br>• Cleaning protocols<br>• Biosecurity verification |

---

## 9. Warehouse Management (WM)

| Process Step | Current State at Al Salwa | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Egg Storage** | Eggs stored at Salwa for up to 4 days before ENF collection. "We have the eggs stored there to be stored in the daily production until four days." | • Temperature-controlled storage<br>• FIFO by collection date<br>• Shelf-life monitoring |
| **Storage Conditions** | Proper storage required to maintain hatchability. "Hatchability will remain as long as you are putting it in the proper storage." Temperature and humidity controlled. | • Environmental monitoring<br>• Quality preservation<br>• Automated alerts |
| **Extended Storage Impact** | Eggs stored beyond 8-10 days have reduced hatchability and chick quality. "8 days is what I use, 7-8 days is what I use after this." Mortality of hatched chicks increases. | • Maximum storage rules<br>• Age-based routing<br>• Quality degradation tracking |
| **Feed Storage** | Feed in silos - same bulk delivery issues as ENF farms. No silo-level measurement. Consumption estimated. | • Silo sensors<br>• Inventory visibility<br>• Consumption tracking |

---

## 10. Enterprise Integration & Reporting

| Process Step | Current State at Al Salwa | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **ENF Integration** | Manual coordination for egg collection. Paper-based delivery notes. Grading done at ENF, results communicated back. | • Real-time integration<br>• Automatic scheduling<br>• Quality data exchange |
| **Planning Integration** | No integrated planning with ENF demand. Production at full capacity regardless of ENF hatchery needs. | • Demand-driven breeding<br>• S&OP participation<br>• Capacity optimization |
| **Performance Tracking** | Flock performance tracked manually. Hatchability, mortality, production curves in Excel. | • SAP Livestock KPIs<br>• Real-time dashboards<br>• Automated alerts |
| **Financial Reporting** | Part of poultry division consolidation. Elimination with ENF and GF at division level. | • Segment reporting<br>• Intercompany elimination<br>• Division P&L |

---

## Summary of Critical Gaps

### Industry Solution Gaps (Fundamental)
1. **No SAP Livestock Management:** Parent stock breeding requires specialized flock lifecycle tracking
2. **No Biological Asset Daily Valuation:** Birds valued through periodic capitalization, not daily fair value
3. **Manual Amortization:** Excel-based calculation of biological asset depreciation
4. **No Breeding Program Management:** Genetic tracking, performance analysis outside system

### Process Control Gaps (High Risk)
5. **Capacity-Based Not Demand-Based Production:** Produces at full capacity regardless of ENF needs
6. **Feed Control Gap:** Same bulk delivery issues as ENF - no silo measurement
7. **Paper-Based Egg Transfers:** Delivery notes manual, not in SAP
8. **Grading at Destination:** Quality determination happens at ENF, not source

### Integration Gaps (Medium-High Risk)
9. **No Planning Integration:** Salwa production disconnected from ENF hatchery demand
10. **Manual Intercompany Process:** Delivery, grading, invoicing all manual coordination
11. **Single Source DOC Risk:** 100% dependent on Saudi Arabia imports
12. **Limited Supplier Options:** Competitor (Ajman) will not sell, limiting alternatives

### Financial Gaps (Medium Risk)
13. **Period Costing Only:** No production order costing with variance analysis
14. **Amortization Outside System:** Manual calculation and posting
15. **No Cost per Egg Visibility:** True production cost not accurately calculated

---

## Recommendations

### 1. SAP Livestock Management Implementation
- Deploy SAP Livestock Management for parent stock breeding operations
- Implement flock master data with breed, placement date, vaccination program
- Enable daily performance tracking (production, mortality, feed consumption)

### 2. Biological Asset Accounting Automation
- Implement IAS 41 compliant biological asset valuation
- Automate capitalization during rearing phase
- System-calculated amortization during laying phase

### 3. Demand-Driven Production Planning
- Integrate with ENF hatchery demand planning
- Optimize flock placement timing based on market needs
- Implement S&OP process across poultry division

### 4. Feed Control Enhancement
- Consider bag-based feed delivery for measurement
- Implement silo sensors if bulk continues
- Track consumption at house level

### 5. Intercompany Process Automation
- SAP-based delivery documents for egg transfers
- Automatic invoicing based on graded quantities
- Real-time intercompany reconciliation

### 6. Quality at Source
- Implement egg grading at Salwa before shipment
- SAP QM integration for grade recording
- Batch traceability from flock to hatching

---

*Document generated from NXSYS Pre-Discovery Workshop Sessions - Cross-Functional (Al Salwa/Liwa)*  
*Prepared by: NXSYS AI-Powered Discovery Engine™*

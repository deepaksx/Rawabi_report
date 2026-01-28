# Al Rawabi Dairy Company
## SAP Pre-Discovery Production Process Analysis

**Document Type:** Workshop Findings Analysis  
**Workshop Date:** January 22, 2026  
**Session:** Production Planning (PP)  
**Prepared by:** NXSYS Discovery Team

---

## Executive Summary

This document captures detailed findings from the Pre-Discovery Production Planning workshop conducted with Al Rawabi Dairy Company. The analysis reveals significant gaps between current operations and dairy industry best practices, particularly around the fundamental architecture choice of using SAP PP (Discrete Manufacturing) instead of PP-PI (Process Industries) - a critical misalignment for dairy manufacturing operations.

**Key Finding:** The current SAP implementation treats Al Rawabi as a discrete manufacturing operation rather than a process industry, fundamentally limiting capabilities for recipe management, batch processing, component balancing, and process parameter capture essential for dairy operations.

---

## 1. Demand Planning & Forecasting

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Forecast Generation** | Sales team creates weekly forecasts manually and submits directly to production team. No statistical forecasting tools are used. Forecasts are based purely on market knowledge and historical patterns maintained outside SAP. | • SAP APO/IBP for statistical demand forecasting<br>• Machine learning models incorporating historical sales, seasonality, and promotional impacts<br>• Collaborative S&OP process with sales, marketing, and operations |
| **Forecast Granularity** | Weekly forecasts for approximately 120 SKUs are submitted. Daily order updates occur based on market conditions with cut-off times for production alignment. | • Daily forecasting for fresh dairy products (7-day shelf life)<br>• SKU-level forecasts with customer/channel segmentation<br>• Hourly demand sensing for high-velocity products |
| **Seasonal Patterns** | Not systematically captured in SAP. Team relies on manual adjustments. No documented consideration for Ramadan (+60% dairy desserts) or Thursday/Friday weekend patterns (+40%). | • Built-in seasonal profiles (Ramadan, Eid, school holidays)<br>• Day-of-week demand patterns automatically applied<br>• Weather correlation for beverage demand |
| **Planning Horizon** | 16-week rolling forecast mentioned for milk procurement from farms, but not integrated into SAP planning. Production planning is essentially daily. | • 16-52 week planning horizon for capacity and procurement<br>• 4-8 week frozen production schedule<br>• Daily fine-tuning within weekly buckets |
| **Forecast Accuracy Tracking** | No formal forecast accuracy measurement or improvement process identified. Discrepancies addressed reactively. | • Weekly MAPE/Bias tracking by product family<br>• Root cause analysis for forecast misses<br>• Continuous improvement loop with sales |
| **PIR Entry** | Plan Independent Requirements (PIRs) are not formally entered in SAP. Sales forecasts go directly to production as instructions without system-based demand management. | • PIRs entered as confirmed independent requirements<br>• Version management for forecast scenarios<br>• Consumption strategies linking forecasts to actuals |

---

## 2. Recipe & Formulation Management

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Recipe System** | Using "Easy Feed" external system for feed formulations. Dairy recipes/formulations managed by nutritionist in separate systems or paper-based. No integration with SAP. | • SAP PP-PI Master Recipes with version control<br>• Integration with PLM for R&D formulation<br>• Automatic BOM generation from approved recipes |
| **BOM Structure** | Flat, single-level BOMs with fixed quantities. Milk is listed as a direct component (not as fat/protein/lactose components). No formula-based calculations for raw milk variability. | • Multi-level formula-based recipes<br>• Component specification by fat%, protein%, SNF%<br>• Dynamic input calculation based on incoming milk quality |
| **Recipe Change Management** | Frequent recipe changes occur but are poorly documented. Changes happen "to run the show" with impact on cost unknown until month-end. System identifies this as a critical gap. | • Formal Engineering Change Management (ECM)<br>• Cost simulation before recipe approval<br>• Audit trail with approval workflows |
| **Formulation Integration** | Easy Feed system not integrated with SAP. Nutritionist creates formulations separately; production receives recipes manually. Pricing and inventory visibility lacking during formulation. | • Real-time integration with formulation systems (BRIL, EGP)<br>• Ingredient pricing fed daily for optimization<br>• Inventory availability check during formulation |
| **Standard vs Actual Recipe** | Production frequently deviates from standard recipes. Cost impact of deviations unknown until monthly analysis (if done). No real-time variance tracking. | • Standard recipe with allowed tolerances<br>• Real-time deviation alerts and justification capture<br>• Automatic cost variance calculation at batch close |
| **Nutritional Compliance** | Nutritional specifications managed outside SAP. Halal certification and regulatory compliance documentation not system-integrated. | • Nutritional values linked to recipe components<br>• Automatic label generation<br>• Regulatory compliance validation embedded |

---

## 3. Material Requirements Planning (MRP)

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **MRP Execution** | MRP is run to generate planned orders, but the process is not integrated with capacity or scheduling. MRP generates a list without capacity constraints (infinite capacity planning). | • Finite capacity MRP with resource constraints<br>• Multi-level planning with intermediate products<br>• Integrated with capacity planning (PP/DS or APO) |
| **Planning Parameters** | MRP parameters not configured for dairy-specific requirements. No shelf-life consideration in planning logic. Generic weekly/monthly planning causing chronic overproduction and spoilage. | • Shelf-life constrained planning (SLED management)<br>• Day-specific requirements for fresh products<br>• Safety stock by shelf-life category |
| **Lot Sizing** | Fixed lot sizes not optimized for production efficiency or shelf-life constraints. No dynamic lot sizing based on demand patterns. | • Period lot sizing aligned with shelf life<br>• Minimum/maximum lot sizes per product family<br>• Campaign planning for changeover optimization |
| **Component Planning** | Milk planned as a single material. Fat, protein, lactose not planned as components despite being the actual consumed elements in dairy processing. | • Component-level planning (fat, SNF, protein)<br>• Standardization yield calculations<br>• Cream/skim balancing in planning |
| **16-Week Horizon** | 16-week rolling forecast from farms exists but not reflected in SAP MRP horizon. Planning effectively operates on a daily/weekly basis only. | • MRP horizon matching procurement lead times<br>• Rolling forecast integration<br>• Time-phased requirements visibility |
| **Exception Management** | No systematic exception processing. Shortages and excesses handled manually through informal communication between teams. | • Automated exception messages with priorities<br>• Planner workbench for efficient processing<br>• Alert management with escalation rules |

---

## 4. Production Scheduling & Capacity Planning

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Capacity Planning** | "Capacity planning is something which is not there" - explicitly confirmed. No PPDS (Production Planning & Detailed Scheduling) implementation. Production manager manually determines schedule. | • SAP PP/DS or APO for finite scheduling<br>• Real-time capacity visualization<br>• Bottleneck identification and optimization |
| **Resource Definition** | Machine capacities, line rates, and resource calendars not maintained in SAP. Changes require IT support, causing delays. End users cannot modify production parameters. | • Detailed work center definitions with rates<br>• User-maintainable factory calendars<br>• Shift patterns and planned downtime |
| **Scheduling Authority** | Production manager is sole authority for converting planned orders to production orders. Manual decision-making creates bottleneck - "half a day only planning, not doing his work." | • Rule-based automatic scheduling<br>• Finite scheduling with optimization algorithms<br>• Dispatcher roles with defined authorities |
| **Line Assignment** | Manual assignment of products to production lines. No visibility of line utilization or optimization of changeovers. | • Automatic line assignment based on capabilities<br>• Changeover matrix optimization<br>• Sequence-dependent setup time consideration |
| **Capacity Utilization** | Dairy processing utilizes approximately 50% of milk capacity; juice is 20%. Spare capacity exists but not systematically tracked or optimized. Yogurt may have capacity constraints. | • Real-time OEE tracking by line<br>• Capacity utilization dashboards<br>• Bottleneck analysis and investment planning |
| **Maintenance Integration** | Maintenance calendar not integrated with production scheduling. Machine breakdowns cause reactive schedule changes. | • Integrated maintenance planning (PM module)<br>• Planned downtime visibility in scheduling<br>• Predictive maintenance integration |
| **Schedule Changes** | Updates from sales change daily requirements. Production manager must manually replan, consuming significant time. Changes to master data require IT support. | • Automatic rescheduling on demand changes<br>• User-configurable change tolerances<br>• What-if scenario capability |

---

## 5. Milk Reception & Weighbridge Management

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Weighbridge Integration** | Weighbridge exists but is NOT integrated with SAP. Gate pass and weighbridge operate manually. Vehicles can enter without proper documentation in system. | • SAP-integrated weighbridge with automatic capture<br>• Gross/tare/net weight automatic calculation<br>• Gate pass linked to PO and delivery |
| **Gate Pass Control** | Gate pass is only used for visitors. Milk tankers and material deliveries not systematically controlled through integrated gate pass system. Critical control gap identified. | • Mandatory gate pass for all vehicle movements<br>• PO validation before entry permitted<br>• Automatic GRN creation from weighbridge |
| **Tanker Reception** | Physical tanker reception occurs but system receipt may be delayed or bypassed. Instance mentioned of 22 days (Jan 1-22) of production without proper system receipts. | • Real-time tanker receipt in SAP<br>• Silo assignment tracking<br>• Supplier batch linkage at reception |
| **Quality Sampling** | MBRT (Methylene Blue Reduction Test) and physicochemical tests performed at reception. Results recorded on paper only. Bacterial test allows quick accept/reject decision. | • Mobile sampling with barcode/RFID<br>• LIMS integration for automatic results<br>• Quality hold until release decision |
| **Supplier Verification** | 16-week rolling forecast from farms provides expected deliveries, but no system-based verification of actual vs. expected at reception. | • Scheduled delivery management<br>• Variance reporting by supplier<br>• Contract compliance tracking |
| **Tolerance Management** | No defined tolerances for weighbridge variances. 1-2% industry standard tolerance not configured. Weight discrepancies handled informally. | • Configurable tolerance by material type<br>• Automatic alerts on tolerance breaches<br>• Systematic variance analysis and supplier claims |

---

## 6. Standardization & Component Balancing

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Fat/SNF Planning** | "System is not there" - explicitly confirmed. Fat and milk component balancing done in Excel by dedicated person with "lot of discussion every day." Visibility gap is critical. | • SAP Dairy solution for component tracking<br>• Real-time fat/protein/SNF inventory<br>• Automatic standardization calculations |
| **Component Valuation** | Milk is treated as a single valued item. Components (fat, protein, lactose) are not separately valued or tracked. This is "not how dairy works" per industry standards. | • Component-level valuation (fat, SNF, protein)<br>• Raw milk as non-valuated placeholder<br>• Value derived from component content |
| **Cream/Skim Balance** | Separation into cream and skim milk happens but not tracked systematically in SAP. "Milk press and cream press is currently happening" in Excel. | • Automatic cream/skim ratio calculations<br>• Balance sheet by component daily<br>• Optimization of standardization targets |
| **Standardization Control** | Automatic standardization happens at machine level, but component reconciliation not captured in system. Physical vs. system stock for components unknown. | • In-line analyzers feeding SAP<br>• Real-time standardization monitoring<br>• Yield variance by component |
| **Daily Reconciliation** | Daily milk reconciliation is done ("milk daily they are doing closing"). However, component-level reconciliation (fat, SNF) NOT performed - only at milk level. | • End-of-day component stock count<br>• Variance allocation to production batches<br>• Component shrinkage analysis |
| **Procurement Decisions** | Procurement decisions on fat requirements made manually based on Excel tracking. No visibility of current fat position across all intermediate products (cream, skim, fresh milk). | • ATP (Available-to-Promise) for components<br>• Automatic shortage alerts<br>• Supplier scheduling based on component needs |

---

## 7. Production Execution & Process Control

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Order Type** | Using standard PP (Discrete Manufacturing) production orders instead of PP-PI (Process Industries) process orders. This is the "smoking gun" - fundamentally wrong architecture for dairy. | • PP-PI Process Orders with phases<br>• Control recipes for process parameters<br>• Batch management integrated |
| **Order Conversion** | Production manager manually converts planned orders to production orders one by one. "Select start, select start, select start" - no automation or batch conversion. | • Automatic order creation from MRP<br>• Mass processing capabilities<br>• Rule-based order generation |
| **Process Parameters** | Critical process parameters (pasteurization temp 72°C, hold time 15 sec, fermentation temp/time) NOT captured in SAP. Only exist on paper or machine level. | • PP-PI control recipe with parameters<br>• Automatic capture from PLCs/SCADA<br>• Parameter validation and deviation alerts |
| **Shop Floor Confirmation** | Confirmations happen but only after manual production order creation. Discipline exists for consumption booking before closure. | • Real-time shop floor confirmations<br>• Mobile confirmations at work centers<br>• Automatic backflush options |
| **Work Order Closure** | Work orders closed daily (good discipline). However, TECO (Technical Complete) is done monthly, not at order completion. Some orders remain open for months due to PO issues. | • Same-day TECO after final confirmation<br>• Automatic closure workflows<br>• Exception handling for pending items |
| **Machine Integration** | Machines have sensors for quality parameters (e.g., pasteurization temperature) that automatically stop production if not achieved. However, this data NOT flowing to SAP. | • Full MES/SCADA integration<br>• Automatic data collection<br>• Digital production record |

---

## 8. Quality Management Integration

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **QM Module Status** | "SAP QM is not active" - Quality Management module not live. All quality processes are paper-based with manual filing by date. | • Full SAP QM implementation<br>• Inspection lots automatic creation<br>• Results recording and usage decision |
| **LIMS Integration** | No LIMS (Laboratory Information Management System) at ARDC. ENF has LIMS but not integrated. Quality results on paper only. | • LIMS integration with SAP QM<br>• Automatic results transfer<br>• Specification management in system |
| **In-Process Quality** | Quality checkpoints exist at process stages (reception, processing, filling). Results captured on paper, not in SAP. "Everything is happening, but in the system - out of the system." | • In-process inspection lots<br>• Control charts and SPC<br>• Real-time quality alerts |
| **Release Process** | Products released to unrestricted stock immediately. Microbiological results (5 days for yeast/mold) come after product is already in market. "We sleep with that risk." | • Quality stock until release<br>• Partial release strategies<br>• Risk-based release protocols |
| **COA Requirements** | System mandates Certificate of Analysis for raw material receipt, causing blocking issues. When COA not available, physical receipt happens but SAP receipt cannot be completed. | • Flexible QC workflows<br>• Supplier certification programs<br>• Risk-based inspection reduction |
| **Traceability for Recall** | Question raised: "Can you trace finished goods back to raw milk supplier within 4 hours?" Current answer unclear - relies on paper records. Trail likely breaks at production order level. | • End-to-end batch genealogy<br>• 2-hour recall capability<br>• Forward/backward tracing |

---

## 9. Yield & Co-Product Management

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Yield Tracking** | System does not track why 1000L raw milk produces only 950L pasteurized milk. "Without PP-PI, yield variance analysis, these losses are invisible." | • Yield variance analysis by process<br>• Standard vs actual yield comparison<br>• Loss categorization (evaporation, spillage, etc.) |
| **Co-Product Configuration** | Co-products (cream from separation, whey from yogurt/cheese) not properly configured in BOMs. They "mysteriously appear in inventory with no production source." | • Co-product output defined in process orders<br>• Automatic co-product receipt<br>• Valuation of co-products |
| **By-Product Handling** | By-products not systematically captured. Inventory discrepancies and valuation issues likely result. | • By-product indicators in routing<br>• Cost allocation methods defined<br>• Environmental tracking if applicable |
| **Loss Analysis** | No systematic analysis of production losses. Component losses (fat loss in separation, moisture loss in processing) not tracked or analyzed. | • Loss reason codes<br>• Daily/weekly loss reports<br>• Continuous improvement programs |
| **Costing Impact** | "Live costing is not happening." Monthly actual costing only. Recipe changes during production have unknown cost impact until month-end reconciliation. | • Real-time preliminary costing<br>• Variance posting at order close<br>• Material ledger for actual costing |
| **Variance Distribution** | When physical vs. system stock differs, the 2000kg missing is NOT loaded back to today's production orders. Variances accumulated to month-end. | • Daily variance allocation<br>• Production order settlement<br>• Cost object controlling |

---

## 10. Batch Management & Traceability

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Batch Creation** | Batches created but batch data entry (expiry dates, manufacturing dates) can block receipt if documents missing (COA issue). System requires batch parameters that may not be immediately available. | • Automatic batch number assignment<br>• Configurable mandatory/optional fields<br>• Batch templates by material type |
| **Batch Genealogy** | Batch traceability exists but may break at production order level. Mock recall capability not demonstrated - "in the case if we find anything wrong, then we need to trace back." | • Full batch genealogy (batch-to-batch)<br>• Parent-child relationships<br>• Complete audit trail |
| **Shelf Life Management** | Shelf life tracking exists (7-day fresh milk vs. 180-day UHT mentioned) but not integrated into planning or dispatch logic. FEFO not confirmed in system. | • SLED (Shelf Life Expiration Date) management<br>• FEFO-based dispatch<br>• Remaining shelf life ATP check |
| **Recall Simulation** | No evidence of mock recall capability. Regulatory requirement is 4-hour traceability to raw milk supplier. Current paper-based system unlikely to meet this. | • Regular mock recall drills<br>• Automated trace reports<br>• < 2 hour trace capability |
| **Batch Status** | Batches go to unrestricted stock before all quality results available (micro results take 5 days). No quality stock holding for fresh products. | • Batch status management<br>• Restricted batches for pending QC<br>• Automatic status updates from QM |
| **Supplier Batch Linkage** | Raw material supplier batch numbers captured (when COA available) but linkage to finished goods batches through production not systematic in SAP. | • Vendor batch in SAP batch record<br>• Origin tracking through production<br>• Country of origin compliance |

---

## 11. Inventory & Cold Chain Management

| Process Step | Current State at Al Rawabi | Industry Best Practice |
|--------------|---------------------------|------------------------|
| **Stock Accuracy** | Physical stock and system stock frequently out of sync. Example: "From 1st to 22nd January, we kept on producing" without proper system receipts - "It is a crime." | • Perpetual inventory accuracy > 98%<br>• Cycle counting program<br>• Real-time stock visibility |
| **Cold Chain Monitoring** | Cold storage exists but temperature monitoring not integrated with SAP. No automatic alerts or documentation of temperature excursions in system. | • IoT temperature monitoring<br>• Automatic alerts on excursions<br>• Temperature log in batch record |
| **FIFO/FEFO Compliance** | FEFO expected for fresh dairy but not confirmed as system-enforced. Practice of selling "nearest value out" to reduce returns mentioned but not systematic. | • FEFO-based picking strategies<br>• System-enforced dispatch rules<br>• Remaining shelf life visibility |
| **Multiple Locations** | Multiple storage locations (silos, cold stores, FG warehouse). Milk goes to different silos based on source. Transfer tracking unclear. | • Bin-level inventory management<br>• Transfer order documentation<br>• Silo inventory reconciliation |
| **Physical Counts** | Daily milk reconciliation performed. End-of-day component counting not systematic. Monthly full inventory for accounting. | • Daily critical item counts<br>• Continuous cycle counting<br>• Automated reconciliation |
| **Goods Issue Control** | Consumption can happen before system receipt (PO blocking issue). Products issued to market without complete system documentation in problem scenarios. | • Mandatory receipt before issue<br>• Consumption posting real-time<br>• Material document for all movements |

---

## Summary of Critical Gaps

### Architecture Issues (Fundamental)
1. **PP vs PP-PI:** Using Discrete Manufacturing instead of Process Industries module
2. **Component Tracking:** Milk treated as single item, not by fat/protein/lactose components
3. **QM Not Live:** Quality Management module not active

### Process Control Issues (High Risk)
4. **No Capacity Planning:** Manual scheduling causing bottleneck at production manager
5. **Weighbridge Not Integrated:** Gate pass and receipt process bypassed
6. **Quality Release:** Products go to market before micro results available
7. **Paper-Based Quality:** All QC results on paper, no LIMS

### Data Integrity Issues (Medium-High Risk)
8. **Stock Discrepancies:** Physical vs. system stock out of sync (up to 22 days)
9. **Recipe Deviations:** Changes not tracked with cost impact
10. **Batch Traceability:** Cannot demonstrate 4-hour recall capability

### Planning Issues (Medium Risk)
11. **No Seasonal Planning:** Ramadan, weekend patterns not in system
12. **MRP Limitations:** Infinite capacity, no shelf-life consideration
13. **Forecast Accuracy:** Not measured or improved systematically

---

## Recommendations

1. **Greenfield S/4HANA Implementation** with PP-PI is recommended rather than remediation of current system
2. **Dairy Industry Solution** (SAP Dairy Management) should be evaluated
3. **Immediate Quick Wins:** Weighbridge integration, gate pass control
4. **Quality Module Activation** is critical for food safety compliance
5. **Component-Based Planning** transformation required for proper dairy operations

---

*Document generated from NXSYS Pre-Discovery Workshop Session 3 - Production Planning*  
*Prepared by: NXSYS AI-Powered Discovery Engine™*

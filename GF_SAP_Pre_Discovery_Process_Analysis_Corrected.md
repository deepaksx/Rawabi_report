# Greenfields for Feed Industries (GF)
## SAP Pre-Discovery Cross-Functional Process Analysis (Corrected)

**Document Type:** Workshop Findings Analysis  
**Workshop Date:** January 23-26, 2026  
**Session:** Cross-Functional (All Modules)  
**Prepared by:** NXSYS Discovery Team

---

## Executive Summary

This document captures detailed findings from the Pre-Discovery Cross-Functional workshop conducted with Greenfields for Feed Industries (GF), the animal feed manufacturing arm of Al Rawabi Group's poultry division. GF operates as the dedicated feed supplier to ENF, importing grains globally and manufacturing chicken feed that is sold entirely to ENF for the broiler farming operations.

**Key Finding:** GF is positioned at the heart of the poultry division's operational efficiency, as feed represents 95-98% of chicken production cost. However, critical planning, production control, and feed formulation processes are managed outside SAP. The feed mill recently resumed operations after quality issues and is implementing new recipes based on ENF requirements. The absence of proper MRP, feed formulation integration, and consumption tracking at ENF farm level directly impacts FCR performance and overall poultry profitability.

**Business Position in Value Chain:**
- **Inputs:** Imports grains and feed ingredients from global markets (corn, cottonseed, soybean meal, etc.)
- **Operations:** Feed manufacturing with specialized formulations by growth stage (pre-starter, starter, grower, finisher)
- **Outputs:** 100% of chicken feed sold to ENF (intercompany) + cattle feed to external customers

**Critical Business Impact:** Feed cost directly determines poultry profitability. The current FCR of 1.7-1.8 at ENF farms versus industry benchmark of 1.4 represents potential savings of approximately 0.5 million AED per 0.1 FCR improvement. Without proper feed management and quality tracking, GF cannot prove or improve its contribution to ENF's performance.

---

## 1. Company Overview & Value Chain Position

| Aspect | Current State at GF | Industry Best Practice |
|--------|---------------------|------------------------|
| **Business Function** | Animal feed manufacturing. Chicken feed for ENF (100% intercompany) and cattle/cow feed for external customers. "This one is a proper animal feed factory." | • Integrated feed mill operations<br>• Multi-species formulation<br>• Quality-linked supply |
| **Primary Customer** | ENF is the sole customer for chicken feed. "On the paper the biggest client is ENF for them." All chicken feed production dedicated to ENF farms. | • Demand-driven production<br>• Intercompany integration<br>• Performance accountability |
| **Secondary Business** | Cattle/cow feed sold to external customers. "We have other company, we have other customers outside and we sell the feed also." Separate from chicken feed operations. | • Product line management<br>• Customer diversification<br>• Segment profitability |
| **Raw Material Sourcing** | Imports grains globally - corn, cottonseed, soybean meal, additives. "We are buying outside and we are processing that feed. For example, you have corns and cottonseeds." | • Commodity procurement<br>• Global sourcing<br>• Price hedging |
| **Division Integration** | Part of poultry division with ENF and Al Salwa. Single finance team manages all three entities with elimination at division level. | • Consolidated planning<br>• Intercompany automation<br>• Division P&L |
| **Recent Operations** | Mill was stopped due to quality issues affecting ENF farms. "It was operational but it has some challenges in terms of quality." Recently resumed with new recipes. | • Quality management system<br>• Continuous improvement<br>• Performance monitoring |

---

## 2. Sales & Distribution (SD)

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Chicken Feed Sales** | 100% to ENF (intercompany). No external chicken feed sales. "GF's main client is ENF on the paper." All production dedicated to ENF farm requirements. | • Scheduling agreements<br>• Intercompany automation<br>• Demand-driven supply |
| **Cattle Feed Sales** | External customers for cattle/cow feed. Separate product line and customer base. "Cow feed and this is animal feed. Big animal." | • External customer management<br>• Pricing strategy<br>• Credit management |
| **Sales Process** | Sales handled by finance due to simplified intercompany nature. "Right now, sales is also being handled by finance. 60% is for me and 20% for AITC." | • Dedicated sales function<br>• Customer relationship<br>• Order management |
| **Gate Pass System** | Custom program - gate pass triggers sales order. "Once you create a gate pass, automatically, it will take to the sales order." For external sales. | • Standard SAP SD<br>• Mobile order capture<br>• Delivery integration |
| **Delivery to ENF** | Feed delivered directly to ENF farm silos. "Feed doesn't come to stores, it directly goes to the farms." Bypasses GF warehouse. | • Direct delivery scheduling<br>• Proof of delivery<br>• Quality at receipt |
| **Intercompany Pricing** | Fixed transfer price with margin. "The pricing is done based on, we are also keeping certain margin, because we have separate budgets for each entity." | • Transfer pricing policy<br>• Arm's length documentation<br>• Regular price reviews |

---

## 3. Materials Management (MM) - Procurement

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Raw Material Categories** | Import grains (corn, cottonseed, soybean meal), additives, vitamins, minerals. Local purchases for packaging, some ingredients, spare parts. | • Commodity management<br>• Global sourcing strategy<br>• Supplier diversification |
| **Import Procurement** | Grains imported globally. Container-based imports. Lead times require advance planning. "We have import, import materials." | • Commodity futures<br>• Container optimization<br>• Port logistics |
| **Planning Method** | Excel-based planning - NO MRP running in SAP. "MRP does not run... it is an excel where you generate your MRP." PR generated manually based on Excel forecasts. | • SAP MRP automation<br>• Demand-driven planning<br>• Safety stock optimization |
| **Planning Horizon** | Currently 1-month in Excel, working toward 6-month horizon. "We already implemented the planning in one month... in the process now of finalizing the requirement for six months." | • 12-18 month rolling forecast<br>• Seasonal planning<br>• Commodity hedging |
| **Commodity Hedging** | NO hedging in place. "There is no concept of hedging." Fully exposed to grain price volatility. Major risk in feed business. | • Futures/options hedging<br>• Fixed price contracts<br>• Risk management |
| **ENF Demand Integration** | No integration with ENF farm demand. Production based on requests, not forecasts. "There is no planning central anyway right now." | • S&OP integration<br>• Demand sensing<br>• Capacity planning |

---

## 4. Production Planning (PP) - Feed Manufacturing

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Feed Formulation** | Recipes created based on ENF requirements. New recipes developed after quality issues. "We have now created a new recipe as per the requirement of IEDA." | • SAP Recipe Management<br>• Nutritional optimization<br>• Cost-based formulation |
| **Formulation Software** | External system for feed formulation. "There was a one guy... talking about the formulations, feed formulations." Integration with SAP unclear. | • Integrated formulation<br>• Real-time cost calculation<br>• Nutrient balancing |
| **Feed Types** | Multiple formulations by growth stage: Pre-starter (days 1-10), Starter (days 11-23), Grower, Finisher. "Pre-starter, starter, grower, the final one is finisher." | • Stage-based recipes<br>• Performance optimization<br>• Nutritional precision |
| **Production Planning** | No integrated planning with ENF. Farm capacity drives demand, not sales forecast. "Feed is not under supply zone... requirement goes directly from the farm." | • Demand-driven production<br>• S&OP integration<br>• Capacity planning |
| **Quality Control** | Recent quality failures stopped supply. Now implementing new testing regimen. "It has some challenges in terms of quality and we were suffering here as well." | • QC at each stage<br>• Batch testing<br>• Performance correlation |
| **Capacity Utilization** | Low (35-60%) due to confirmed order requirements. "In the last three months my capacity utilization is 35-60." Production discipline improving. | • Capacity optimization<br>• Order backlog management<br>• Efficiency KPIs |

---

## 5. Production Planning (PP) - Feed Delivery to ENF

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Delivery Method** | Bulk tanker delivery directly to ENF farm silos. "Do you buy entire stuff in bulk? Yes... In tankers." Tanker capacity 32.5 tons, minimum 24-28 tons delivery. | • Bag-based for control<br>• Weighbridge integration<br>• Delivery verification |
| **Delivery Scheduling** | Based on farm requests to production team. "Requirement goes directly from the farm." No central coordination or optimization. | • Route optimization<br>• Delivery scheduling<br>• Multi-farm efficiency |
| **Measurement at GF** | Central weighbridge at GF mill. "We have the weighing scale... Centralized. So we know how much has come in." Outbound weight recorded. | • Certified weighbridge<br>• Weight documentation<br>• Variance tracking |
| **Measurement at ENF** | NO measurement at farm silos. "There is no measuring either in the truck nor in the silos." Cannot verify what is delivered vs consumed. | • Receipt confirmation<br>• Silo sensors<br>• Consumption tracking |
| **Control Gap** | Cannot prove feed quality performance. "If the quality of feed is good or bad, you will never be able to identify it because there is no control in the feed itself." | • FCR by feed batch<br>• Vendor accountability<br>• Performance correlation |
| **Excess Feed Issue** | Feed dumped in silos cannot be transferred between farms/houses. Excess becomes waste. "If they offload more than the farm, I cannot transfer from one to another." | • Returnable policy<br>• Inter-farm transfers<br>• Waste minimization |

---

## 6. Quality Management (QM)

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Quality History** | Quality issues caused supply stoppage to ENF. "It was operational but it has some challenges in terms of quality and we were suffering here as well. So, we stopped the supply." | • Continuous quality monitoring<br>• Root cause analysis<br>• Corrective action |
| **New Recipe Testing** | Trial on 2-3 ENF farms to measure FCR impact. "We will produce it, deliver to 2 or 3 farms, do the triangle, what is the FCR." Performance-based qualification. | • Controlled trials<br>• Statistical analysis<br>• Performance benchmarking |
| **Raw Material QC** | Incoming inspection for grains and ingredients. Nutritional specifications must be met. | • COA verification<br>• Sampling protocols<br>• Supplier scorecards |
| **In-Process QC** | Mixing, pelletizing, bagging quality checks. Formulation adherence monitoring. | • Process control<br>• Batch sampling<br>• Parameter monitoring |
| **FCR Accountability** | Cannot correlate GF feed quality with ENF farm FCR due to measurement gaps. "Currently we are buying almost same from all the suppliers for each farm." No differentiation. | • Feed-FCR correlation<br>• Performance-based pricing<br>• Quality premium |
| **Specification Management** | Nutritional specifications developed for ENF. "Egg color, yolk size... it's all feed." Feed impacts multiple quality parameters. | • Spec management<br>• Customer requirements<br>• Compliance tracking |

---

## 7. Finance & Controlling (FI/CO)

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Intercompany Pricing** | Fixed transfer price with margin to ENF. "Pricing is done based on... we are also keeping certain margin, because we have separate budgets for each entity." | • Market-based pricing<br>• Arm's length documentation<br>• Regular reviews |
| **Division Consolidation** | Elimination at poultry division level with ENF and Salwa. "At that level, we do the elimination and make the decision." Single finance team. | • Intercompany elimination<br>• Division P&L<br>• Segment reporting |
| **Production Costing** | Standard costing for feed products. "Period costing... not like any normal production order." Limited variance analysis. | • Actual costing<br>• Batch costing<br>• Variance analysis |
| **Raw Material Cost** | Commodity price fluctuations directly impact cost. No hedging creates volatility. "Commodity trade is perfect... hedging for ages." Opportunity missed. | • Commodity accounting<br>• Price variance tracking<br>• Hedge accounting |
| **FCR Financial Impact** | 0.1 FCR improvement = ~0.5 million AED savings for ENF. "0.1 FCR is close to half a million." GF quality directly impacts this. | • Performance-linked pricing<br>• Quality incentives<br>• Value sharing |
| **Profitability Analysis** | Limited visibility into product/batch profitability. Cattle feed vs chicken feed margins unclear. | • Product profitability<br>• Batch margin analysis<br>• Customer contribution |

---

## 8. Materials Management (MM) - Inventory & Warehouse

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Raw Material Storage** | Grain storage at mill. Corn, cottonseed, soybean meal in silos/bins. Quality preservation important. | • Climate-controlled storage<br>• Pest management<br>• FIFO rotation |
| **Finished Feed Storage** | Limited - most feed produced to order and delivered directly to ENF farms. Some bagged feed for cattle customers. | • Staging for delivery<br>• Batch segregation<br>• Quality holding |
| **Bag vs Bulk** | Bulk for ENF (tankers). Bags available for cattle feed. "I saw in Greenfield, they are storing it by bags." Bags enable better control. | • Hybrid approach<br>• Control-based decision<br>• Customer preference |
| **Spare Parts** | Central storage for mill equipment spares. "The total value of the spare parts is less than 3 giga." Import spares <5%. | • Critical spares identification<br>• Min-max planning<br>• Vendor managed |
| **Annual Feed Volume** | 55-60 million grams (55,000-60,000 tons) of feed annually. "We are buying 55-60 million grams of feed every year." Significant volume. | • Capacity planning<br>• Delivery scheduling<br>• Inventory optimization |

---

## 9. Plant Maintenance (PM)

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Critical Equipment** | Feed mill machinery - grinders, mixers, pelletizers, baggers, conveyors. Mill downtime stops ENF farm supply. | • Criticality assessment<br>• Redundancy planning<br>• Emergency response |
| **Maintenance Approach** | Separate maintenance team. Details not extensively covered. Presumed reactive approach similar to ENF. | • Preventive maintenance<br>• Condition monitoring<br>• Predictive analytics |
| **Downtime Impact** | Mill stoppage directly impacts ENF farm operations. Recent quality-related stoppage demonstrated risk. | • OEE tracking<br>• Planned maintenance windows<br>• Backup supply plans |
| **Spare Parts Management** | PR created manually. Not integrated with equipment records. | • Equipment-linked spares<br>• Automatic reorder<br>• Work order integration |

---

## 10. Enterprise Integration & Reporting

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **SAP Usage** | Full SAP for transactions. "All SAP, there is no other software." Gate pass custom program. | • Standard processes<br>• Minimal customization<br>• Best practices |
| **ENF Planning Integration** | No integration. "There is no planning central anyway right now." Feed requests come from farms ad-hoc. | • S&OP integration<br>• Demand-driven supply<br>• Capacity balancing |
| **Feed Formulation Integration** | External software for formulation. Integration with SAP for BOM/costing unclear. | • Formulation-SAP integration<br>• Real-time cost calculation<br>• BOM synchronization |
| **Performance Reporting** | Cannot prove feed quality correlation with FCR. "You will never know where you are standing on." No feedback loop. | • Quality-FCR dashboards<br>• Batch performance tracking<br>• Continuous improvement |
| **IBP/Demand Planning** | No demand planning system. "I am not using IBP demand planning. This is not using anything. Anything. No planning." | • SAP IBP implementation<br>• Statistical forecasting<br>• Scenario planning |

---

## Summary of Critical Gaps

### Strategic Planning Gaps (Fundamental)
1. **No MRP in SAP:** Excel-based planning for a manufacturing operation
2. **No Demand Integration:** Production disconnected from ENF farm requirements
3. **No Commodity Hedging:** Fully exposed to grain price volatility
4. **No IBP/S&OP:** Complete absence of integrated business planning

### Feed Quality & Performance Gaps (Critical)
5. **Cannot Prove Quality Impact:** No measurement at ENF farms to correlate feed with FCR
6. **Recent Quality Failure:** Supply stopped due to quality issues - root cause unclear
7. **New Recipe Unproven:** Trial phase for new formulations
8. **No Performance Accountability:** Feed supplier cannot be held accountable without data

### Delivery & Control Gaps (High Risk)
9. **Bulk Without Verification:** Tanker delivery with no measurement at destination
10. **Excess Becomes Waste:** No mechanism to recover over-delivered feed
11. **No Consumption Tracking:** Cannot verify feed actually consumed vs delivered
12. **Direct-to-Farm Bypass:** No GF inventory visibility after dispatch

### Financial Gaps (High Impact)
13. **No Hedging = Volatile Costs:** Commodity exposure unmanaged
14. **FCR Impact Unquantified:** 0.5M AED per 0.1 FCR but cannot prove feed contribution
15. **No Quality Premium:** Cannot command higher price for better feed

---

## Recommendations

### 1. SAP MRP Implementation
- Activate MRP with proper master data
- Integrate with ENF farm demand
- Rolling 6-12 month planning horizon

### 2. Feed-to-FCR Accountability
- Implement measurement at ENF farm delivery/consumption
- Track FCR by feed batch
- Performance-based pricing model with ENF

### 3. Commodity Risk Management
- Implement hedging strategy for key grains
- Fixed-price forward contracts
- Price escalation clauses with ENF

### 4. Quality Management Enhancement
- SAP QM for incoming, in-process, finished goods
- Formulation software integration
- Batch traceability to farm performance

### 5. Delivery Control
- Consider bag-based delivery for measurability
- Weighbridge at key ENF farms
- Silo sensors for consumption tracking

### 6. Integrated Planning
- S&OP process across GF-ENF
- Demand-driven production scheduling
- Capacity optimization

---

## Financial Impact Summary

| Gap Area | Estimated Annual Impact | Basis |
|----------|------------------------|-------|
| FCR Improvement Attribution | 1.5 - 2.0 million AED | If GF quality contributes to 0.3 FCR improvement |
| Commodity Hedging Savings | Variable (High Risk) | Unhedged price volatility |
| Feed Waste Reduction | 0.3 - 0.5 million AED | 5% leakage on delivery |
| Quality Premium Opportunity | 0.5 - 1.0 million AED | Performance-based pricing |
| **Total Addressable Opportunity** | **3.0 - 4.0 million AED+** | Conservative estimate |

---

*Document generated from NXSYS Pre-Discovery Workshop Sessions - Cross-Functional (GF)*  
*Prepared by: NXSYS AI-Powered Discovery Engine™*

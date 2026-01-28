# Greenfields for Feed Industries (GF)
## SAP Pre-Discovery Cross-Functional Process Analysis

**Document Type:** Workshop Findings Analysis  
**Workshop Date:** January 23-26, 2026  
**Session:** Cross-Functional (All Modules)  
**Prepared by:** NXSYS Discovery Team

---

## Executive Summary

This document captures detailed findings from the Pre-Discovery Cross-Functional workshop conducted with Greenfields for Feed Industries (GF), the animal feed manufacturing arm of Al Rawabi Group's poultry division. GF operates as the primary feed supplier to ENF (Emirates National Food Company) for chicken feed, while also producing cow/cattle feed for external customers.

**Key Finding:** GF is positioned at the heart of the poultry division's operational efficiency, yet critical planning, production control, and feed formulation processes are managed outside SAP. The feed mill recently resumed operations after quality issues and is implementing new recipes based on ENF requirements. The absence of proper MRP, feed formulation integration, and consumption tracking at farm level directly impacts ENF's FCR performance and overall poultry profitability.

**Critical Business Impact:** Feed represents 95-98% of chicken production cost. Without proper feed management, planning, hedging, and quality tracking, the entire poultry business operates blind to its most significant cost driver. The current FCR of 1.7-1.8 versus industry benchmark of 1.4 represents potential savings of approximately 0.5 million AED per 0.1 FCR improvement.

---

## 1. Company Overview & Organizational Structure

| Aspect | Current State at GF | Industry Best Practice |
|--------|---------------------|------------------------|
| **Business Scope** | Animal feed manufacturing - chicken feed for ENF (internal) and cow/cattle feed for external customers. "This one is a proper animal feed factory." Raw materials include corn, cottonseed, and other ingredients. | • Integrated feed mill operations<br>• Multi-species feed production<br>• Vertical integration with farms |
| **Primary Customer** | ENF is the main customer (intercompany). "On the paper the biggest client is ENF for them." Recently resumed supply after quality issues. External sales represent smaller portion. | • Internal transfer pricing<br>• External market diversification<br>• Customer portfolio balance |
| **Organizational Structure** | Production team separate, sales team separate, finance centralized. "Production team is separate, sales team is separate, finance is centralized." Part of poultry division with ENF and Liwa/Salwa. | • Integrated planning team<br>• Cross-functional coordination<br>• Centralized supply chain |
| **Poultry Division Integration** | GF, ENF, and Liwa/Salwa together form the poultry division. "Liva, this one ENF and GF all forms are the poll tree for us." Single finance and costing team manages elimination. | • Consolidated planning<br>• Intercompany automation<br>• Division-level reporting |
| **Support Functions** | Finance centralized across poultry division. "This entire is managed by one team, one costing and finance team." Elimination happens at division level. | • Shared services model<br>• Standardized processes<br>• Division-level controls |

---

## 2. Sales & Distribution (SD)

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Sales Channels** | Primarily intercompany sales to ENF (chicken feed). External sales for cow/cattle feed. "60% is for me and 20% for AITC, we are hardly selling anything from outside." | • Multiple channel management<br>• Contract-based sales<br>• Market diversification |
| **Sales Process** | Sales handled by finance team due to low external volumes. "Right now, sales is also being handled by finance." Gate pass system triggers sales order creation. | • Dedicated sales function<br>• CRM integration<br>• Order management |
| **Gate Pass System** | Custom program - gate pass creation automatically generates sales order. "Once you create a gate pass, automatically, it will take to the sales order." Customer code, material, quantity captured. | • Standard SAP SD process<br>• Mobile order capture<br>• Delivery integration |
| **Walk-in Customers** | Some walk-in customers for external feed sales. "These are walk-in customers, they walk in and you sell to them sometimes." Simplified process for known customers. | • Customer master management<br>• Credit check integration<br>• Pricing automation |
| **Intercompany Sales** | Feed supplied to ENF farms via intercompany process. Fixed transfer pricing maintained. No formal contracts or scheduling agreements in place. | • Scheduling agreements<br>• Transfer pricing documentation<br>• Intercompany reconciliation |
| **Direct Delivery** | Feed delivered directly to ENF farms, bypassing GF stores. "Feed doesn't come to stores, it directly goes to the farms." Bulk tanker delivery. | • Delivery scheduling<br>• Proof of delivery<br>• Inventory visibility |

---

## 3. Materials Management (MM) - Procurement

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Raw Material Categories** | Import materials (primarily meat from Brazil, China), local purchases (packing materials, ingredients, spare parts), vaccines. "We have import, import materials and we have local." | • Commodity management<br>• Global sourcing strategy<br>• Supplier diversification |
| **Import Procurement** | 95% imports are frozen meat, less than 5% spare parts. "95 percent, spare parts, very less. Less than 5 percent." Lead times and container logistics managed. | • Import documentation<br>• Letter of credit management<br>• Customs integration |
| **Planning Method** | Excel-based planning - no MRP running in SAP. "MRP does not run... it is an excel where you generate your MRP." PR generated manually based on Excel forecasts. | • SAP MRP automation<br>• Demand-driven planning<br>• Safety stock optimization |
| **PR/PO Process** | Manual PR creation based on monitoring. "Every day we are monitoring, so as needed, sometimes we raise PR during the month." Workflow approvals in place. | • MRP-driven PR generation<br>• Automatic PO creation<br>• Vendor scheduling |
| **Planning Horizon** | Currently 1-month planning in Excel, working toward 6-month planning. "We already implemented the planning in one month... in the process now of finalizing the requirement for six months." | • 12-18 month rolling forecast<br>• Seasonal planning<br>• Commodity hedging |
| **Commodity Hedging** | No hedging concept in place. "There is no concept of hedging." Exposed to feed ingredient price volatility. | • Futures/options hedging<br>• Fixed price contracts<br>• Risk management |

---

## 4. Production Planning (PP) - Feed Manufacturing

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Feed Formulation** | Recipes created based on ENF requirements. "We have made a new recipe, based on the requirements of GFE, based on the customer wise, they will change the recipe." External formulation software mentioned. | • SAP Recipe Management<br>• Nutritional optimization<br>• Cost-based formulation |
| **Formulation Software** | External system for feed formulation integrated with SAP. "There was a one guy... talking about the formulations, feed formulations, how are the feed formulas built." | • Integrated formulation<br>• Real-time cost calculation<br>• Nutrient balancing |
| **Production Planning** | No integrated planning with ENF demand. "Feed is not under supply zone... requirement goes directly from the farm." Farm capacity drives production, not sales forecast. | • Demand-driven production<br>• S&OP integration<br>• Capacity planning |
| **Feed Types** | Multiple feed types for different growth stages: Pre-starter, Starter, Grower, Finisher. "Pre-starter, starter, grower, the final one is finisher." Different formulations per stage. | • Stage-based recipes<br>• Automatic switchover<br>• Consumption tracking |
| **Quality Issues** | Recent quality problems stopped supply to ENF. "It was operational but it has some challenges in terms of quality and we were suffering here as well. So, we stopped the supply." Now resuming with new recipes. | • Quality control integration<br>• Batch testing<br>• Supplier qualification |
| **Capacity Utilization** | Low capacity utilization (35-60%) due to lack of confirmed orders. "In the last three months my capacity utilization is 35-60." Production reduced pending confirmed contracts. | • Capacity optimization<br>• Order backlog management<br>• Efficiency monitoring |

---

## 5. Production Planning (PP) - Feed Delivery & Consumption

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Delivery Method** | Bulk tanker delivery directly to farm silos. "Do you buy entire stuff in bulk? Yes... In tankers." Tanker capacity 32.5 tons, minimum delivery 24-28 tons. | • Bag-based delivery for control<br>• Weighbridge integration<br>• Delivery verification |
| **Measurement at Delivery** | Central weighbridge only - no measurement at farm silos. "We have the weighing scale... Centralized. So we know how much has come in. Now how much has been put in?" No silo-level measurement. | • Silo sensors<br>• Delivery confirmation<br>• Variance tracking |
| **Consumption Tracking** | No measurement of actual consumption per house/flock. "There is no measuring either in the truck nor in the silos." Consumption estimated, not measured. | • House-level consumption<br>• Daily feed tracking<br>• Automatic recording |
| **Excess Feed Handling** | Cannot transfer excess feed between farms/houses. "If they offload more than the farm, I cannot transfer from one to another. They will dispose it all." Becomes waste/manure. | • Returnable feed policy<br>• Inter-farm transfers<br>• Waste minimization |
| **Silo Management** | Separate silos for pre-starter, grower, finisher per house. No measurement in silos - manual estimation using "stick and thread" method. | • Silo level sensors<br>• Automatic feed ordering<br>• Inventory visibility |
| **Control Gap Impact** | Major FCR impact - cannot determine feed quality performance by vendor. "If the quality of feed is good or bad, you will never be able to identify it because there is no control in the feed itself." | • Vendor performance tracking<br>• FCR by feed source<br>• Quality correlation |

---

## 6. Quality Management (QM)

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Feed Quality Control** | Quality issues caused supply stoppage to ENF. Now implementing new recipes with quality focus. "We have now created a new recipe as per the requirement of IEDA." | • Raw material testing<br>• In-process inspection<br>• Finished goods analysis |
| **FCR Performance Testing** | Planning to trial new feed on 2-3 farms and measure FCR. "We will produce it, deliver to 2 or 3 farms, do the triangle, what is the FCR." Performance-based qualification. | • Controlled trials<br>• Statistical analysis<br>• Performance benchmarking |
| **Vendor Quality Monitoring** | Attempting to track FCR by feed source/vendor. "We need to identify even the average lightweight and the carcass weight, and the HCR." Segregation by supplier attempted. | • Supplier scorecards<br>• Quality agreements<br>• Performance penalties |
| **Quality-Cost Correlation** | Cannot correlate feed quality with cost/performance. "Good quality, conversion should be more so you need to buy less. Currently we are buying almost same from all the suppliers." | • Total cost of ownership<br>• Quality premium analysis<br>• Value-based sourcing |
| **Nutritional Specifications** | New specifications developed for ENF requirements. Testing regimen being established. Lab team manages vaccines and quality testing. | • Specification management<br>• Certificate of analysis<br>• Compliance tracking |

---

## 7. Finance & Controlling (FI/CO)

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Intercompany Pricing** | Fixed transfer prices to ENF with margin. "The pricing is done based on, we are also keeping certain margin, because we have separate budgets for each entity." | • Transfer pricing policy<br>• Arm's length documentation<br>• Regular price reviews |
| **Division Consolidation** | Elimination happens at poultry division level. "At that level, we do the elimination and make the decision." Single finance team manages ENF, GF, Liwa/Salwa. | • Intercompany elimination<br>• Division P&L<br>• Segment reporting |
| **Production Costing** | Standard costing methodology. Feed cost represents 95-98% of chicken cost. "95-98% of the cost of a chick is feed." | • Actual costing<br>• Variance analysis<br>• Cost optimization |
| **Profitability Analysis** | Limited visibility into true profitability by product/customer. Commodity business with thin margins. "Your margin percentage... does not go back 5% up and down." | • Product profitability<br>• Customer profitability<br>• Contribution margin |
| **Budget vs Actual** | Plant budgets prepared independently. "We have prepared the plant budgets independent of from where we will buy it." Disconnect between sales forecast and production. | • Integrated budgeting<br>• Rolling forecasts<br>• Variance analysis |
| **FCR Financial Impact** | 0.1 FCR improvement equals approximately 0.5 million AED savings. "0.1 FCR is close to half a million." Current gap of 0.3-0.4 FCR vs benchmark represents significant opportunity. | • FCR-linked costing<br>• Performance incentives<br>• Continuous improvement |

---

## 8. Materials Management (MM) - Inventory & Warehouse

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Storage Facilities** | Central warehouse predominantly for spare parts. "The total value of the spare parts is less than 3 giga." Feed not stored - direct delivery to farms. | • Raw material storage<br>• Finished feed storage<br>• Staging areas |
| **Bag vs Bulk Decision** | Currently bulk (tanker) only. Bags would enable better control. "Why not in bags?... entire food industry works on bags... it's countable." GF produces bags for external sales. | • Hybrid approach<br>• Control-based decision<br>• Cost-benefit analysis |
| **Spare Parts Management** | Spare parts stored centrally. Import spare parts represent less than 5% of total. Local sourcing for most parts. | • Min-max planning<br>• Critical spares identification<br>• Vendor managed inventory |
| **Feed Ingredient Storage** | Raw materials (corn, cottonseed, etc.) stored at mill. Procurement based on production requirements. | • Commodity storage<br>• Quality preservation<br>• FIFO management |

---

## 9. Co-Packing Operations

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Co-Packer Management** | 80% of processed products through co-packers. Previously no contracts - produced based on forecasts. "Without a confirmed PU or a contract... we forecast for them." | • Binding contracts<br>• Scheduling agreements<br>• Minimum order quantities |
| **Contract Implementation** | Now implementing 80% confirmed order policy. "80% should be confirmed... after that for last 3 months your production has gone down." Driving discipline. | • Rolling contracts<br>• Advance payments<br>• Capacity reservations |
| **Inventory Risk** | Co-packer inventory stored at GF facilities at GF cost. "We have FPP co-papers stored in my store... Roni, I am so sorry." 9-10 containers stored externally, paid by GF. | • Consignment stock<br>• Customer-owned inventory<br>• Storage charges |
| **Financial Impact** | Working capital locked in co-packer inventory. "He is using your money... storing... you are providing this free of cost." No advance payment practice. | • Advance payments (25%)<br>• LC-backed orders<br>• Working capital efficiency |
| **Export Customers** | Even export has no contracts, 60-day credit. "For export there is no contact... 60 days credit on export." Container sat 2.5 months in storage. | • Export LC requirements<br>• Advance payment<br>• Container planning |

---

## 10. Plant Maintenance (PM)

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **Maintenance Coverage** | Feed mill equipment maintenance. "Maintenance also separate." Separate maintenance team from production. | • Preventive maintenance<br>• Predictive analytics<br>• Asset lifecycle management |
| **Critical Equipment** | Feed mill machinery, mixing equipment, pelletizing lines, bagging machines. Quality issues may have been equipment-related. | • Criticality assessment<br>• Redundancy planning<br>• Spare parts strategy |
| **Downtime Impact** | Mill downtime affects ENF farm supply. Recent operational challenges caused supply stoppage. | • OEE tracking<br>• Planned maintenance windows<br>• Backup suppliers |

---

## 11. Enterprise Integration & Reporting

| Process Step | Current State at GF | Industry Best Practice |
|--------------|---------------------|------------------------|
| **SAP Usage** | Full SAP for transactions. "All SAP, there is no other software." Gate pass custom program integrated. | • Standard SAP processes<br>• Minimal customization<br>• Best practice adoption |
| **Planning Integration** | No integration between GF production planning and ENF demand. "There is no planning central anyway right now." Farm capacity drives production. | • S&OP process<br>• Integrated planning<br>• Demand sensing |
| **Feed Formulation Integration** | External formulation software. Integration with SAP unclear. Recipe management outside SAP. | • Formulation-to-SAP integration<br>• Real-time cost calculation<br>• BOM synchronization |
| **Performance Reporting** | FCR monitoring attempted in Excel. "They have the monitoring of FCR. House by house. For the source of the feed." Cannot validate due to control gaps. | • Real-time dashboards<br>• Automated KPIs<br>• Exception alerting |
| **IBP/Demand Planning** | No demand planning system. "I am not using IBP demand planning. This is not using anything. Anything. No planning." | • SAP IBP implementation<br>• Statistical forecasting<br>• Scenario planning |

---

## Summary of Critical Gaps

### Strategic Planning Gaps (Fundamental)
1. **No MRP in SAP:** Excel-based planning for a manufacturing operation
2. **No Demand Integration:** Production driven by farm capacity, not market demand
3. **No Commodity Hedging:** Exposed to feed ingredient price volatility without protection
4. **No IBP/S&OP:** Complete absence of integrated business planning

### Feed Control Gaps (Critical for Poultry Profitability)
5. **Bulk Delivery Without Measurement:** Tanker loads dumped in silos with no verification
6. **No Silo-Level Tracking:** Cannot measure actual feed consumption per house/flock
7. **Excess Feed Becomes Waste:** No mechanism to transfer or return unused feed
8. **FCR Untraceable to Feed Source:** Cannot correlate feed quality with farm performance

### Commercial Gaps (High Financial Risk)
9. **Co-Packer Inventory at GF Risk:** 80% of business without contracts until recently
10. **No Advance Payments:** Working capital locked in customer inventory
11. **Export Without LC/Contract:** 60-day credit with no security
12. **Storage Paid by GF:** External containers paid for co-packer stock

### Quality & Operational Gaps (Medium-High Risk)
13. **Recent Quality Failures:** Supply to ENF stopped due to quality issues
14. **No Formulation Integration:** External software not integrated with SAP
15. **Recipe Management Outside SAP:** BOM and costing disconnected
16. **Low Capacity Utilization:** 35-60% due to lack of confirmed orders

---

## Recommendations

### 1. SAP MRP & Planning Implementation
- Activate MRP in SAP with proper master data (lead times, safety stock, lot sizes)
- Implement rolling 6-12 month planning horizon
- Integrate with ENF demand through S&OP process

### 2. Feed Delivery Transformation
- Evaluate bag-based delivery for critical control (vs bulk tankers)
- Implement silo-level sensors if bulk continues
- Establish measurement and verification at delivery point

### 3. Commercial Discipline
- Mandatory contracts for all co-packer relationships
- 25% advance payment requirement for production
- LC requirement for export orders
- Storage charges for customer inventory

### 4. Commodity Risk Management
- Implement hedging strategy for key feed ingredients
- Fixed-price contracts with suppliers
- Price escalation clauses in customer contracts

### 5. Quality Management Enhancement
- SAP QM activation for incoming, in-process, and finished goods
- Integration of feed formulation software with SAP
- FCR-based vendor performance scorecards

### 6. Integrated Business Planning
- Implement SAP IBP or equivalent for demand planning
- S&OP process across GF-ENF-Liwa/Salwa
- Capacity-constrained planning linked to farm schedules

---

## Financial Impact Summary

| Gap Area | Estimated Annual Impact | Basis |
|----------|------------------------|-------|
| FCR Improvement (0.3 reduction) | 1.5 - 2.0 million AED | 0.5M per 0.1 FCR × 0.3 gap |
| Working Capital (Co-packer inventory) | 0.5 - 1.0 million AED | Interest on locked capital |
| Feed Waste (Unmeasured consumption) | 0.5 - 1.0 million AED | Estimated 5% leakage on 55-60M feed |
| Commodity Exposure (No hedging) | Variable (High Risk) | Price volatility unprotected |
| **Total Addressable Opportunity** | **3.0 - 5.0 million AED+** | Conservative estimate |

---

*Document generated from NXSYS Pre-Discovery Workshop Sessions - Cross-Functional (GF)*  
*Prepared by: NXSYS AI-Powered Discovery Engine™*

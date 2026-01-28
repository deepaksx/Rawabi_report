High-level summary of the current state for each process:

**1. Demand Planning & Forecasting**

The current process is largely manual and reactive, driven heavily by daily sales requirements rather than a strategic system-generated plan. Sales teams hand over requirements directly to production, bypassing formal long-term planning, effectively forcing the factory into a mix of "Make to Stock" and "Make to Order" modes. There is no automated statistical forecasting to account for critical demand drivers like seasonality (e.g., Ramadan) or day-of-week surges, leaving the planning process as a conceptual exercise "on paper" rather than a system-driven reality.

**2. Recipe & Formulation Management**

Formulations are currently managed outside of SAP, with nutritionists using external tools like "Easy Feed" or Excel to determine recipes. The Bill of Materials (BOM) in the system is static and volume-based, treating "Milk" as a fixed liquid input rather than a dynamic combination of Fat and Protein components. This disconnect means that the financial impact of recipe changes or raw milk variability is not visible until month-end variance analysis, preventing real-time cost control.

**3. Material Requirements Planning (MRP)**

MRP is currently functioning as an administrative tool rather than a planning engine. It generates "Planned Orders," but these act merely as a list of suggestions that the Production Manager often overrides or manually manages. The system lacks critical dairy-specific constraints, such as shelf-life management (e.g., distinguishing between 7-day fresh milk and 180-day UHT), which risks overproduction and spoilage if not manually checked.

**4. Production Scheduling**

Scheduling is a labor-intensive, manual task where the Production Manager spends up to "half a day" organizing daily runs instead of overseeing execution. Decisions are made based on human judgment and assumed machine capacity (e.g., a flat ~70% utilization rate) because the system lacks real-time visibility into machine downtime, maintenance calendars, or labor shifts.

**5. Milk Reception & Weighbridge**

The reception process is high-risk and disconnected from the system. The weighbridge is not integrated with SAP, allowing trucks to enter without automated validation against a Purchase Order (PO). Frequently, raw materials are physically received and consumed without a valid PO or mandatory quality documents (like Certificates of Analysis) to prevent production stoppages, creating "phantom inventory" where goods exist physically but not in the system.

**6. Standardization & Component Balancing**

Milk is currently received as "Whole Milk" and mixed into silos before detailed component analysis (Fat/SNF) is complete, as the lab results take 3-4 hours while intake is immediate. There is no total separation of raw milk into Skim and Cream upon receipt; instead, standardization happens in-line during processing. This "mixing" approach dilutes batch traceability and obscures the precise "mass balance" needed to track yield loss accurately.

**7. Production Execution**

The facility is currently running on the wrong SAP module type, utilizing "Discrete Manufacturing" (Production Orders) instead of "Process Manufacturing" (PP-PI). Critical process parameters—such as pasteurization temperatures and hold times—are recorded on paper logs or machine sensors but are not captured digitally in the system. Consequently, the system cannot explain yield losses (e.g., why 1000L of milk yielded only 950L of product) because it tracks volume rather than component mass.

**8. Quality Management (QM)**

Quality processes rely heavily on paper records, with no active Laboratory Information Management System (LIMS) or SAP QM integration. Product release is manual and risk-based; for fresh products, goods are often shipped to market before final microbiological results (which take 5 days) are available, forcing the company to "sleep with the risk" of a potential recall.

**9. Traceability & Batch Management**

Traceability is currently fragmented and paper-dependent. Key data points, such as "Badge details" or supplier batch numbers, are often missing at the point of goods receipt, breaking the digital link between the raw material and the finished good. This lack of digital genealogy makes executing a regulatory-compliant "Mock Recall" (tracing a product back to the farm within 4 hours) extremely difficult or impossible.

**10. Inventory Management**

Inventory accuracy is compromised by the "open gate" reception practices and retrospective recording. Because materials are often consumed before they are system-received (due to missing POs), the system shows zero stock even when the warehouse is full. Consumption is recorded via backflushing (deducting stock after production) rather than in real-time, leading to a perpetual lag between physical reality and system data.
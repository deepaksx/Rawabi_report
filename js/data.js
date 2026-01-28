// Executive-Level Critical Findings - Curated for Impact
const REPORT_DATA = {
  "meta": {
    "reportDate": "January 27, 2026",
    "reportNumber": "NXSYS-2026-ARG-005",
    "engagementPeriod": "January 22-26, 2026",
    "client": "Emirates Rawabi Group"
  },
  "summary": {
    "total": 67,
    "high": 67,
    "medium": 0,
    "low": 0,
    "mapped": 67,
    "orphan": 0,
    "entities": 4,
    "processSteps": 19
  },
  "bySource": {
    "ARDC-PP": { "total": 18, "high": 18, "medium": 0, "low": 0 },
    "ARDC-SD": { "total": 15, "high": 15, "medium": 0, "low": 0 },
    "ENF-GF": { "total": 34, "high": 34, "medium": 0, "low": 0 }
  },
  "stepStats": {
    "PP-01": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PP-02": { "total": 2, "high": 2, "medium": 0, "low": 0 },
    "PP-03": { "total": 2, "high": 2, "medium": 0, "low": 0 },
    "PP-04": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PP-05": { "total": 4, "high": 4, "medium": 0, "low": 0 },
    "PP-06": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PP-07": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PP-08": { "total": 2, "high": 2, "medium": 0, "low": 0 },
    "PP-09": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PP-10": { "total": 4, "high": 4, "medium": 0, "low": 0 },
    "SD-01": { "total": 4, "high": 3, "medium": 1, "low": 0 },
    "SD-02": { "total": 4, "high": 2, "medium": 2, "low": 0 },
    "SD-03": { "total": 3, "high": 0, "medium": 2, "low": 1 },
    "SD-04": { "total": 4, "high": 1, "medium": 2, "low": 1 },
    "SD-05": { "total": 3, "high": 0, "medium": 2, "low": 1 },
    "SD-06": { "total": 4, "high": 2, "medium": 2, "low": 0 },
    "SD-07": { "total": 4, "high": 2, "medium": 2, "low": 0 },
    "SD-08": { "total": 4, "high": 2, "medium": 1, "low": 1 },
    "SD-09": { "total": 4, "high": 2, "medium": 2, "low": 0 },
    "SD-10": { "total": 3, "high": 0, "medium": 2, "low": 1 },
    "SD-11": { "total": 4, "high": 0, "medium": 2, "low": 2 },
    "PF-01": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PF-02": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PF-03": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PF-04": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PF-05": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PF-06": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PF-07": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PF-08": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PF-09": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PF-10": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PF-11": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PF-12": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PF-13": { "total": 4, "high": 4, "medium": 0, "low": 0 },
    "PF-14": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "PF-15": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ARDC-FI-01": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ARDC-FI-02": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ARDC-FI-03": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ARDC-FI-04": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ARDC-FI-05": { "total": 3, "high": 1, "medium": 2, "low": 0 },
    "ARDC-FI-06": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ARDC-FI-07": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ARDC-FI-08": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ARDC-MM-01": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ARDC-MM-02": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ARDC-MM-03": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ARDC-MM-04": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ARDC-MM-05": { "total": 3, "high": 1, "medium": 2, "low": 0 },
    "ARDC-MM-06": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ARDC-MM-07": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ARDC-MM-08": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-SD-01": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-SD-02": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-SD-03": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-SD-04": { "total": 2, "high": 1, "medium": 1, "low": 0 },
    "ENF-SD-05": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-SD-06": { "total": 2, "high": 1, "medium": 1, "low": 0 },
    "ENF-SD-07": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-PP-01": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-PP-02": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-PP-03": { "total": 4, "high": 3, "medium": 1, "low": 0 },
    "ENF-PP-04": { "total": 2, "high": 2, "medium": 0, "low": 0 },
    "ENF-PP-05": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-PP-06": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-PP-07": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-MM-01": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-MM-02": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-MM-03": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-MM-04": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-MM-05": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-MM-06": { "total": 2, "high": 1, "medium": 1, "low": 0 },
    "ENF-QM-01": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-QM-02": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-QM-03": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-QM-04": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-QM-05": { "total": 2, "high": 1, "medium": 1, "low": 0 },
    "ENF-QM-06": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-FI-01": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-FI-02": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-FI-03": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-FI-04": { "total": 2, "high": 2, "medium": 0, "low": 0 },
    "ENF-FI-05": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-FI-06": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "GF-SD-01": { "total": 3, "high": 1, "medium": 2, "low": 0 },
    "GF-SD-02": { "total": 2, "high": 1, "medium": 1, "low": 0 },
    "GF-SD-03": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "GF-SD-04": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "GF-SD-05": { "total": 4, "high": 3, "medium": 1, "low": 0 },
    "GF-MM-01": { "total": 3, "high": 1, "medium": 2, "low": 0 },
    "GF-MM-02": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "GF-MM-03": { "total": 2, "high": 1, "medium": 1, "low": 0 },
    "GF-MM-04": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "GF-MM-05": { "total": 2, "high": 1, "medium": 1, "low": 0 },
    "GF-PP-01": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "GF-PP-02": { "total": 2, "high": 1, "medium": 1, "low": 0 },
    "GF-PP-03": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "GF-PP-04": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "GF-PP-05": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "GF-PP-06": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "GF-QM-01": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "GF-QM-02": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "GF-QM-03": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "GF-QM-04": { "total": 2, "high": 1, "medium": 1, "low": 0 },
    "GF-FI-01": { "total": 3, "high": 1, "medium": 2, "low": 0 },
    "GF-FI-02": { "total": 2, "high": 1, "medium": 1, "low": 0 },
    "GF-FI-03": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "GF-FI-04": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "GF-FI-05": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-H-01": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-H-02": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-H-03": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-H-04": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-H-05": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-H-06": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-F-01": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-F-02": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-F-03": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-F-04": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-F-05": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-F-06": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-P-01": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-P-02": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "ENF-P-03": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-P-04": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-P-05": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "ENF-P-06": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "SL-PP-01": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-PP-02": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-PP-03": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-PP-04": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-PP-05": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-PP-06": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "SL-QM-01": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-QM-02": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-QM-03": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "SL-QM-04": { "total": 3, "high": 1, "medium": 2, "low": 0 },
    "SL-MM-01": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-MM-02": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-MM-03": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "SL-MM-04": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-MM-05": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "SL-FI-01": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-FI-02": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "SL-FI-03": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-FI-04": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-FI-05": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-SD-01": { "total": 3, "high": 1, "medium": 2, "low": 0 },
    "SL-SD-02": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "SL-SD-03": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-SD-04": { "total": 3, "high": 3, "medium": 0, "low": 0 },
    "SL-SD-05": { "total": 3, "high": 2, "medium": 1, "low": 0 },
    "SL-SD-06": { "total": 3, "high": 1, "medium": 2, "low": 0 }
  },
  "findingsByStep": {
    "PP-01": [
      {
        "id": "DP-01",
        "topic": "No statistical forecasting tools used",
        "type": "process",
        "risk": "high",
        "details": "Sales team creates weekly forecasts manually and submits directly to production team. No statistical forecasting tools are used. Forecasts are based purely on market knowledge and historical patterns maintained outside SAP.",
        "impact": "Chronic overproduction leading to 3-5% spoilage loss; stockouts during peak demand",
        "source": "ARDC-PP",
        "category": "Demand Planning"
      },
      {
        "id": "DP-02",
        "topic": "Seasonal patterns not captured in SAP",
        "type": "process",
        "risk": "high",
        "details": "Seasonal patterns not systematically captured in SAP. Team relies on manual adjustments. No documented consideration for Ramadan (+60% dairy desserts) or Thursday/Friday weekend patterns (+40%).",
        "impact": "Missed revenue during Ramadan; excess inventory and waste post-season",
        "source": "ARDC-PP",
        "category": "Demand Planning"
      },
      {
        "id": "DP-03",
        "topic": "PIRs not formally entered in SAP",
        "type": "compliance",
        "risk": "high",
        "details": "Plan Independent Requirements (PIRs) are not formally entered in SAP. Sales forecasts go directly to production as instructions without system-based demand management.",
        "impact": "No audit trail for demand planning; MRP runs on incomplete data",
        "source": "ARDC-PP",
        "category": "Demand Planning"
      },
      {
        "id": "DP-04",
        "topic": "No forecast accuracy measurement",
        "type": "process",
        "risk": "high",
        "details": "No formal forecast accuracy measurement or improvement process identified. Discrepancies addressed reactively. No weekly MAPE/Bias tracking by product family.",
        "impact": "Cannot identify or fix systematic forecast errors; continuous waste",
        "source": "ARDC-PP",
        "category": "Demand Planning"
      }
    ],
    "PP-02": [
      {
        "id": "RM-01",
        "topic": "External recipe system not integrated",
        "type": "integration",
        "risk": "high",
        "details": "Using 'Easy Feed' external system for feed formulations. Dairy recipes/formulations managed by nutritionist in separate systems or paper-based. No integration with SAP.",
        "impact": "Recipe changes not reflected in costing; variance surprises at month-end",
        "source": "ARDC-PP",
        "category": "Recipe Management"
      },
      {
        "id": "RM-02",
        "topic": "Flat BOMs without component tracking",
        "type": "process",
        "risk": "high",
        "details": "Flat, single-level BOMs with fixed quantities. Milk is listed as a direct component (not as fat/protein/lactose components). No formula-based calculations for raw milk variability.",
        "impact": "Hidden yield losses; unable to optimize raw milk utilization",
        "source": "ARDC-PP",
        "category": "Recipe Management"
      },
      {
        "id": "RM-03",
        "topic": "Recipe changes poorly documented",
        "type": "compliance",
        "risk": "high",
        "details": "Frequent recipe changes occur but are poorly documented. Changes happen 'to run the show' with impact on cost unknown until month-end. No formal Engineering Change Management.",
        "impact": "Regulatory risk; product inconsistency; uncontrolled cost variations",
        "source": "ARDC-PP",
        "category": "Recipe Management"
      }
    ],
    "PP-03": [
      {
        "id": "MRP-01",
        "topic": "MRP runs with infinite capacity",
        "type": "process",
        "risk": "high",
        "details": "MRP is run to generate planned orders, but the process is not integrated with capacity or scheduling. MRP generates a list without capacity constraints (infinite capacity planning).",
        "impact": "Unrealistic production plans; manual rework required daily",
        "source": "ARDC-PP",
        "category": "Material Planning"
      },
      {
        "id": "MRP-02",
        "topic": "No shelf-life consideration in planning",
        "type": "compliance",
        "risk": "high",
        "details": "MRP parameters not configured for dairy-specific requirements. No shelf-life consideration in planning logic. Generic weekly/monthly planning causing chronic overproduction and spoilage.",
        "impact": "Fresh product (7-day) treated same as UHT (180-day); spoilage losses",
        "source": "ARDC-PP",
        "category": "Material Planning"
      },
      {
        "id": "MRP-03",
        "topic": "Component-level planning absent",
        "type": "process",
        "risk": "high",
        "details": "Milk planned as a single material. Fat, protein, lactose not planned as components despite being the actual consumed elements in dairy processing.",
        "impact": "Cream/skim imbalances; suboptimal raw material utilization",
        "source": "ARDC-PP",
        "category": "Material Planning"
      }
    ],
    "PP-04": [
      {
        "id": "SC-01",
        "topic": "No capacity planning in place",
        "type": "process",
        "risk": "high",
        "details": "'Capacity planning is something which is not there' - explicitly confirmed. No PPDS (Production Planning & Detailed Scheduling) implementation. Production manager manually determines schedule.",
        "impact": "Suboptimal line utilization; reactive scheduling causes delays",
        "source": "ARDC-PP",
        "category": "Scheduling"
      },
      {
        "id": "SC-02",
        "topic": "Resource definitions not in SAP",
        "type": "integration",
        "risk": "high",
        "details": "Machine capacities, line rates, and resource calendars not maintained in SAP. Changes require IT support, causing delays. End users cannot modify production parameters.",
        "impact": "IT dependency for basic changes; slow response to operational needs",
        "source": "ARDC-PP",
        "category": "Scheduling"
      },
      {
        "id": "SC-03",
        "topic": "Manual scheduling bottleneck",
        "type": "process",
        "risk": "high",
        "details": "Production manager is sole authority for converting planned orders to production orders. Manual decision-making creates bottleneck - 'half a day only planning, not doing his work.'",
        "impact": "Key person dependency; half-day productivity loss daily",
        "source": "ARDC-PP",
        "category": "Scheduling"
      }
    ],
    "PP-05": [
      {
        "id": "MR-01",
        "topic": "Weighbridge not integrated with SAP",
        "type": "integration",
        "risk": "high",
        "details": "Weighbridge exists but is NOT integrated with SAP. Gate pass and weighbridge operate manually. Vehicles can enter without proper documentation in system.",
        "impact": "Weight discrepancies; potential fraud exposure; inventory inaccuracy",
        "source": "ARDC-PP",
        "category": "Milk Reception"
      },
      {
        "id": "MR-02",
        "topic": "Gate pass control gap",
        "type": "compliance",
        "risk": "high",
        "details": "Gate pass is only used for visitors. Milk tankers and material deliveries not systematically controlled through integrated gate pass system. Critical control gap identified.",
        "impact": "Security risk; uncontrolled site access; material theft exposure",
        "source": "ARDC-PP",
        "category": "Milk Reception"
      },
      {
        "id": "MR-03",
        "topic": "22 days production without system receipts",
        "type": "compliance",
        "risk": "high",
        "details": "Physical tanker reception occurs but system receipt may be delayed or bypassed. Instance mentioned of 22 days (Jan 1-22) of production without proper system receipts.",
        "impact": "Audit failure; financial misstatement risk; inventory valuation errors",
        "source": "ARDC-PP",
        "category": "Milk Reception"
      },
      {
        "id": "MR-04",
        "topic": "Quality sampling on paper only",
        "type": "process",
        "risk": "high",
        "details": "MBRT (Methylene Blue Reduction Test) and physicochemical tests performed at reception. Results recorded on paper only. No LIMS integration for automatic results capture.",
        "impact": "Quality data lost or inaccessible; cannot analyze supplier trends",
        "source": "ARDC-PP",
        "category": "Milk Reception"
      }
    ],
    "PP-06": [
      {
        "id": "ST-01",
        "topic": "Fat/SNF balancing done in Excel",
        "type": "process",
        "risk": "high",
        "details": "'System is not there' - explicitly confirmed. Fat and milk component balancing done in Excel by dedicated person with 'lot of discussion every day.' Visibility gap is critical.",
        "impact": "Key person dependency; daily disputes; no visibility for management",
        "source": "ARDC-PP",
        "category": "Standardization"
      },
      {
        "id": "ST-02",
        "topic": "Components not separately valued",
        "type": "compliance",
        "risk": "high",
        "details": "Milk is treated as a single valued item. Components (fat, protein, lactose) are not separately valued or tracked. This is 'not how dairy works' per industry standards.",
        "impact": "Incorrect product costing; hidden margin erosion on high-fat products",
        "source": "ARDC-PP",
        "category": "Standardization"
      },
      {
        "id": "ST-03",
        "topic": "Cream/skim separation not tracked in SAP",
        "type": "process",
        "risk": "high",
        "details": "Separation into cream and skim milk happens but not tracked systematically in SAP. 'Milk press and cream press is currently happening' in Excel only.",
        "impact": "Yield losses invisible; cream value not optimized across products",
        "source": "ARDC-PP",
        "category": "Standardization"
      }
    ],
    "PP-07": [
      {
        "id": "PE-01",
        "topic": "Wrong SAP module - PP instead of PP-PI",
        "type": "architecture",
        "risk": "high",
        "details": "Using standard PP (Discrete Manufacturing) production orders instead of PP-PI (Process Industries) process orders. This is the 'smoking gun' - fundamentally wrong architecture for dairy.",
        "impact": "Cannot capture dairy-specific data; system fundamentally misaligned",
        "source": "ARDC-PP",
        "category": "Production"
      },
      {
        "id": "PE-02",
        "topic": "Manual order conversion one-by-one",
        "type": "process",
        "risk": "high",
        "details": "Production manager manually converts planned orders to production orders one by one. 'Select start, select start, select start' - no automation or batch conversion.",
        "impact": "Hours wasted daily; error-prone; bottleneck for production",
        "source": "ARDC-PP",
        "category": "Production"
      },
      {
        "id": "PE-03",
        "topic": "Process parameters not in SAP",
        "type": "compliance",
        "risk": "high",
        "details": "Critical process parameters (pasteurization temp 72°C, hold time 15 sec, fermentation temp/time) NOT captured in SAP. Only exist on paper or machine level.",
        "impact": "Food safety risk; regulatory non-compliance; cannot prove pasteurization",
        "source": "ARDC-PP",
        "category": "Production"
      },
      {
        "id": "PE-04",
        "topic": "TECO done monthly, not at completion",
        "type": "compliance",
        "risk": "high",
        "details": "Work orders closed daily but TECO (Technical Complete) is done monthly, not at order completion. Some orders remain open for months due to PO issues.",
        "impact": "WIP distortion; month-end variance spikes; audit findings",
        "source": "ARDC-PP",
        "category": "Production"
      }
    ],
    "PP-08": [
      {
        "id": "QM-01",
        "topic": "SAP QM module not active",
        "type": "compliance",
        "risk": "high",
        "details": "'SAP QM is not active' - Quality Management module not live. All quality processes are paper-based with manual filing by date.",
        "impact": "No system-enforced quality holds; manual release prone to error",
        "source": "ARDC-PP",
        "category": "Quality"
      },
      {
        "id": "QM-02",
        "topic": "No LIMS at ARDC",
        "type": "integration",
        "risk": "high",
        "details": "No LIMS (Laboratory Information Management System) at ARDC. ENF has LIMS but not integrated. Quality results on paper only.",
        "impact": "Lab results not searchable; trend analysis impossible",
        "source": "ARDC-PP",
        "category": "Quality"
      },
      {
        "id": "QM-03",
        "topic": "Products released before micro results",
        "type": "compliance",
        "risk": "high",
        "details": "Products released to unrestricted stock immediately. Microbiological results (5 days for yeast/mold) come after product is already in market. 'We sleep with that risk.'",
        "impact": "Major recall exposure; consumer safety risk; brand damage potential",
        "source": "ARDC-PP",
        "category": "Quality"
      },
      {
        "id": "QM-04",
        "topic": "4-hour recall capability unclear",
        "type": "compliance",
        "risk": "high",
        "details": "Question raised: 'Can you trace finished goods back to raw milk supplier within 4 hours?' Current answer unclear - relies on paper records. Trail likely breaks at production order level.",
        "impact": "Regulatory non-compliance; extended recall scope if incident occurs",
        "source": "ARDC-PP",
        "category": "Quality"
      }
    ],
    "PP-09": [
      {
        "id": "TR-01",
        "topic": "Traceability fragmented and paper-dependent",
        "type": "compliance",
        "risk": "high",
        "details": "Key data points such as badge details or supplier batch numbers are often missing at the point of goods receipt, breaking the digital link between the raw material and the finished good.",
        "impact": "Cannot trace contamination source; supplier accountability gap",
        "source": "ARDC-PP",
        "category": "Traceability"
      },
      {
        "id": "TR-02",
        "topic": "Mock recall capability impossible",
        "type": "compliance",
        "risk": "high",
        "details": "Lack of digital genealogy makes executing a regulatory-compliant Mock Recall (tracing a product back to the farm within 4 hours) extremely difficult or impossible.",
        "impact": "Will fail regulatory audit; major compliance gap",
        "source": "ARDC-PP",
        "category": "Traceability"
      },
      {
        "id": "TR-03",
        "topic": "No batch-to-batch linkage",
        "type": "process",
        "risk": "high",
        "details": "Batch traceability exists but may break at production order level. No full parent-child batch relationships maintained through the production process.",
        "impact": "Recall scope expands unnecessarily; higher waste and cost",
        "source": "ARDC-PP",
        "category": "Traceability"
      }
    ],
    "PP-10": [
      {
        "id": "IC-01",
        "topic": "Open gate reception compromises inventory accuracy",
        "type": "compliance",
        "risk": "high",
        "details": "Materials are often consumed before they are system-received due to missing POs. The system shows zero stock even when the warehouse is full, creating phantom inventory situations.",
        "impact": "Cannot trust stock figures; production planning unreliable",
        "source": "ARDC-PP",
        "category": "Inventory"
      },
      {
        "id": "IC-02",
        "topic": "Backflushing causes perpetual lag",
        "type": "process",
        "risk": "high",
        "details": "Consumption is recorded via backflushing (deducting stock after production) rather than in real-time, leading to a perpetual lag between physical reality and system data.",
        "impact": "Real-time decisions based on stale data; stockout surprises",
        "source": "ARDC-PP",
        "category": "Inventory"
      },
      {
        "id": "IC-03",
        "topic": "Cold chain monitoring not in SAP",
        "type": "integration",
        "risk": "high",
        "details": "Cold storage exists but temperature monitoring not integrated with SAP. No automatic alerts or documentation of temperature excursions in system.",
        "impact": "Product spoilage undetected; cannot prove cold chain compliance",
        "source": "ARDC-PP",
        "category": "Inventory"
      },
      {
        "id": "IC-04",
        "topic": "FEFO not system-enforced",
        "type": "process",
        "risk": "high",
        "details": "FEFO expected for fresh dairy but not confirmed as system-enforced. Practice of selling 'nearest value out' to reduce returns mentioned but not systematic.",
        "source": "ARDC-PP",
        "category": "Inventory"
      }
    ],
    "SD-01": [
      {
        "id": "VS-01",
        "topic": "Routes not created as SAP locations",
        "type": "architecture",
        "risk": "high",
        "details": "SAP has no visibility of individual van inventory. 'We did not create route as a location, entire reconciliation everything stop reconciliation will be in DC level.' All 300+ routes invisible to SAP, only DC-level stock known.",
        "impact": "No van-level P&L; cannot identify underperforming routes",
        "source": "ARDC-SD",
        "category": "Van Sales"
      },
      {
        "id": "VS-02",
        "topic": "Offline device operations throughout the day",
        "type": "integration",
        "risk": "high",
        "details": "Devices operate in offline mode all day with morning/evening sync only. Real-time visibility of van activities not available. Project underway for cloud migration but not yet live.",
        "impact": "No real-time stock visibility; reactive management only",
        "source": "ARDC-SD",
        "category": "Van Sales"
      },
      {
        "id": "VS-03",
        "topic": "External system dependency for all van operations",
        "type": "architecture",
        "risk": "high",
        "details": "Ransale back-office is the operational brain; SAP is peripheral. All pricing, promotions, credit, returns, and route management happen outside SAP. Integration is batch-based, not real-time.",
        "impact": "SAP ROI diminished; dual system maintenance cost",
        "source": "ARDC-SD",
        "category": "Van Sales"
      },
      {
        "id": "VS-04",
        "topic": "Route optimization temporarily stopped",
        "type": "process",
        "risk": "medium",
        "details": "RoadNet route optimization temporarily stopped due to master data quality issues - customer locations not 100% accurate. High volume of new customer onboarding (6,000-7,000 deliveries daily) making optimization difficult.",
        "impact": "Suboptimal fuel and labor costs; delivery inefficiency",
        "source": "ARDC-SD",
        "category": "Van Sales"
      }
    ],
    "SD-02": [
      {
        "id": "OM-01",
        "topic": "No pre-order capture in any system",
        "type": "process",
        "risk": "high",
        "details": "60-70% of sales are 'pull' orders collected via phone, email, WhatsApp - none systematically recorded. Order collection is manual and allocation based on supervisor knowledge only.",
        "impact": "No demand signal for planning; lost sales not tracked",
        "source": "ARDC-SD",
        "category": "Order Management"
      },
      {
        "id": "OM-02",
        "topic": "No delivery document in SAP",
        "type": "compliance",
        "risk": "high",
        "details": "Van sales uses direct billing without SAP delivery notes. 'There is no delivery involved in it.' Custom movement types used instead of standard delivery-based goods movement.",
        "impact": "No proof of delivery audit trail; compliance gap",
        "source": "ARDC-SD",
        "category": "Order Management"
      },
      {
        "id": "OM-03",
        "topic": "Sales orders created post-facto",
        "type": "process",
        "risk": "medium",
        "details": "SAP sales orders created from van sales data upload AFTER sale completion, not from customer request. Order is a recording mechanism, not a planning/promising tool.",
        "impact": "SAP not used for order promising; limited ATP capability",
        "source": "ARDC-SD",
        "category": "Order Management"
      },
      {
        "id": "OM-04",
        "topic": "No order fulfillment model",
        "type": "process",
        "risk": "medium",
        "details": "Van sales 'currently is not operating as an order fulfillment tool. It only does van sales, goes sales and comes back.' True order fulfillment exists only for e-commerce channel.",
        "impact": "Cannot measure fill rates or service levels",
        "source": "ARDC-SD",
        "category": "Order Management"
      }
    ],
    "SD-03": [
      {
        "id": "PM-01",
        "topic": "Pricing maintained outside SAP",
        "type": "architecture",
        "risk": "medium",
        "details": "All pricing logic in Ransale back-office, not SAP. While functionally adequate, creates dual maintenance and potential sync issues. SAP pricing conditions not used for van sales.",
        "impact": "Dual maintenance burden; potential price inconsistency",
        "source": "ARDC-SD",
        "category": "Pricing"
      },
      {
        "id": "PM-02",
        "topic": "Promotion analytics not in SAP",
        "type": "process",
        "risk": "medium",
        "details": "Promotion effectiveness tracking happens in back-office only. SAP has no visibility of promotion performance, ROI, or budget consumption.",
        "impact": "Cannot measure promotion ROI; budget overruns possible",
        "source": "ARDC-SD",
        "category": "Pricing"
      },
      {
        "id": "PM-03",
        "topic": "No integrated promotion budget control",
        "type": "compliance",
        "risk": "low",
        "details": "Promotion budgets not controlled through SAP. Finance visibility of promotion spending is indirect through posted transactions only.",
        "impact": "Trade spend not controlled; margin erosion risk",
        "source": "ARDC-SD",
        "category": "Pricing"
      }
    ],
    "SD-04": [
      {
        "id": "RT-01",
        "topic": "Returns not flowing to SAP QM",
        "type": "compliance",
        "risk": "high",
        "details": "Returns captured in van sales but quality analysis not flowing to SAP QM. Root cause analysis for defects/returns not systematically tracked. QM module not active for returns inspection.",
        "impact": "Cannot identify quality issues; recurring defects not addressed",
        "source": "ARDC-SD",
        "category": "Returns"
      },
      {
        "id": "RT-02",
        "topic": "Return reasons summarized, not detailed",
        "type": "process",
        "risk": "medium",
        "details": "Detailed return reasons captured at point of return in Ransale but SAP receives only summary transactions. Granular analysis not possible in SAP.",
        "impact": "Root cause analysis limited; improvement actions delayed",
        "source": "ARDC-SD",
        "category": "Returns"
      },
      {
        "id": "RT-03",
        "topic": "Near-expiry operations discontinued",
        "type": "process",
        "risk": "medium",
        "details": "'We stopped the practice' of differentiated near-expiry pricing due to lack of physical control. Inventory type change capability exists but not operationally used.",
        "impact": "Full-price write-offs instead of discounted recovery",
        "source": "ARDC-SD",
        "category": "Returns"
      },
      {
        "id": "RT-04",
        "topic": "No systematic return reduction program",
        "type": "process",
        "risk": "low",
        "details": "Return rates tracked but no formal return reduction initiative with customer-level analysis and improvement targets.",
        "impact": "Return rates not improving; ongoing margin drag",
        "source": "ARDC-SD",
        "category": "Returns"
      }
    ],
    "SD-05": [
      {
        "id": "CM-01",
        "topic": "Real-time credit exposure not in SAP",
        "type": "architecture",
        "risk": "medium",
        "details": "Credit check happens in van sales system. SAP knows credit position only after end-of-day posting. Real-time exposure calculation not available in SAP during sales.",
        "impact": "Credit exposure unknown during trading hours",
        "source": "ARDC-SD",
        "category": "Credit Management"
      },
      {
        "id": "CM-02",
        "topic": "Driver collection tracking outside SAP",
        "type": "process",
        "risk": "medium",
        "details": "Cash collection, reconciliation, and deposit tracking managed in back-office. SAP receives summarized cash transactions only.",
        "impact": "Cash handling risk; reconciliation effort high",
        "source": "ARDC-SD",
        "category": "Credit Management"
      },
      {
        "id": "CM-03",
        "topic": "Branch office credit complexity unclear",
        "type": "process",
        "risk": "low",
        "details": "Question raised about head office vs branch office invoicing and credit management for customers with multiple locations. Process not fully clarified.",
        "impact": "Potential credit exposure misattribution",
        "source": "ARDC-SD",
        "category": "Credit Management"
      }
    ],
    "SD-06": [
      {
        "id": "SL-01",
        "topic": "FEFO not confirmed as system-enforced",
        "type": "compliance",
        "risk": "high",
        "details": "Shelf-life visible in van sales but system-enforced FEFO unclear. Risk of shipping older stock or near-expiry products to customers requiring fresh stock.",
        "impact": "Customer complaints; retailer chargebacks; brand damage",
        "source": "ARDC-SD",
        "category": "Shelf-Life"
      },
      {
        "id": "SL-02",
        "topic": "No customer minimum shelf-life rules",
        "type": "compliance",
        "risk": "high",
        "details": "Major retailers typically require minimum remaining shelf-life (e.g., 70%) on delivery. No evidence this is checked in system during allocation or delivery.",
        "impact": "Retailer rejection at delivery; lost sales and transport cost",
        "source": "ARDC-SD",
        "category": "Shelf-Life"
      },
      {
        "id": "SL-03",
        "topic": "Shelf-life not in SAP ATP",
        "type": "process",
        "risk": "medium",
        "details": "SAP not used for order promising with shelf-life consideration. Allocation decisions made in back-office without SAP shelf-life integration.",
        "impact": "Over-promising on freshness; customer dissatisfaction",
        "source": "ARDC-SD",
        "category": "Shelf-Life"
      },
      {
        "id": "SL-04",
        "topic": "Near-expiry process abandoned",
        "type": "process",
        "risk": "medium",
        "details": "Near-expiry stock management stopped due to physical control difficulties. No systematic alternate channel for near-expiry stock disposal.",
        "impact": "100% write-off instead of partial recovery",
        "source": "ARDC-SD",
        "category": "Shelf-Life"
      }
    ],
    "SD-07": [
      {
        "id": "EC-01",
        "topic": "No direct e-commerce to SAP integration",
        "type": "integration",
        "risk": "high",
        "details": "Magento orders manually consolidated and posted to van sales as internal customer. 'In SAP or van sales, we are not creating any sales' directly from Magento. No real-time inventory sync.",
        "impact": "Overselling risk; order cancellation; customer churn",
        "source": "ARDC-SD",
        "category": "E-Commerce"
      },
      {
        "id": "EC-02",
        "topic": "Manual order consolidation creates delays",
        "type": "process",
        "risk": "high",
        "details": "Coordinator manually collates orders from Magento and creates single order in van sales. Process is labor-intensive and error-prone.",
        "impact": "Same-day delivery at risk; competitive disadvantage",
        "source": "ARDC-SD",
        "category": "E-Commerce"
      },
      {
        "id": "EC-03",
        "topic": "Dark store stock visibility gap",
        "type": "compliance",
        "risk": "medium",
        "details": "Talabat dark store stock requests may not come to SAP. 'SAP has no clue. It's in transit.' Identified as auditable concern.",
        "impact": "Inventory accuracy compromised; audit finding",
        "source": "ARDC-SD",
        "category": "E-Commerce"
      },
      {
        "id": "EC-04",
        "topic": "E-commerce revenue not separately tracked",
        "type": "process",
        "risk": "medium",
        "details": "E-commerce sales posted as internal customer, not as separate channel. True e-commerce profitability not visible in SAP.",
        "impact": "Cannot measure digital channel ROI",
        "source": "ARDC-SD",
        "category": "E-Commerce"
      }
    ],
    "SD-08": [
      {
        "id": "INT-01",
        "topic": "Batch integration instead of real-time",
        "type": "architecture",
        "risk": "high",
        "details": "All transactions posted to SAP at end of day in batch. Real-time stock visibility, credit exposure, and operational data not available in SAP during business hours.",
        "impact": "Decisions made on stale data; SAP is historical record only",
        "source": "ARDC-SD",
        "category": "Integration"
      },
      {
        "id": "INT-02",
        "topic": "In-transit stock not properly tracked",
        "type": "compliance",
        "risk": "high",
        "details": "Stock transferred between locations (e.g., to Abu Dhabi DC) may show in transit but 'SAP has no clue.' Identified as 'auditable big time issue' in workshop.",
        "impact": "Major audit finding; inventory valuation error",
        "source": "ARDC-SD",
        "category": "Integration"
      },
      {
        "id": "INT-03",
        "topic": "Non-standard document flow",
        "type": "process",
        "risk": "medium",
        "details": "Custom movement types and direct billing without delivery document. Standard Order-Delivery-Billing flow not followed, limiting SAP functionality.",
        "impact": "SAP standard reports don't work; custom reporting needed",
        "source": "ARDC-SD",
        "category": "Integration"
      },
      {
        "id": "INT-04",
        "topic": "One-way master data sync only",
        "type": "process",
        "risk": "low",
        "details": "Master data flows SAP → Van Sales only. Customer/material changes in van sales not reflected back. Potential for data inconsistency.",
        "impact": "Data mismatch between systems; reconciliation effort",
        "source": "ARDC-SD",
        "category": "Integration"
      }
    ],
    "SD-09": [
      {
        "id": "RP-01",
        "topic": "Route profitability not visible in SAP",
        "type": "architecture",
        "risk": "high",
        "details": "Routes not defined in SAP means route-level profitability cannot be calculated. 'If all revenue lands in one GL account, management has zero visibility into what's actually making money.'",
        "impact": "Unprofitable routes subsidized by profitable ones",
        "source": "ARDC-SD",
        "category": "Revenue"
      },
      {
        "id": "RP-02",
        "topic": "POS sales not individually posted",
        "type": "compliance",
        "risk": "high",
        "details": "Retail POS sales consolidated as single transaction. Individual customer receipts not in SAP. Potential FTA compliance risk - 'FTA knows the deemed sales from the financial system' only.",
        "impact": "Tax compliance risk; potential FTA penalties",
        "source": "ARDC-SD",
        "category": "Revenue"
      },
      {
        "id": "RP-03",
        "topic": "Channel profitability not tracked",
        "type": "process",
        "risk": "medium",
        "details": "E-commerce, B2B van sales, retail POS all posted without clear channel identification. True channel profitability analysis not possible in SAP.",
        "impact": "Cannot prioritize channel investments",
        "source": "ARDC-SD",
        "category": "Revenue"
      },
      {
        "id": "RP-04",
        "topic": "Performance metrics outside SAP",
        "type": "process",
        "risk": "medium",
        "details": "All KPIs, driver performance, route efficiency tracked in Ransale back-office. SAP provides only financial posting, not operational analytics.",
        "impact": "Executive dashboards require external data",
        "source": "ARDC-SD",
        "category": "Revenue"
      }
    ],
    "SD-10": [
      {
        "id": "CR-01",
        "topic": "Crate management outside SAP",
        "type": "process",
        "risk": "medium",
        "details": "All crate tracking, reconciliation, and customer balances managed in Ransale. SAP has no visibility of crate inventory or customer crate positions.",
        "impact": "Crate losses not visible in financial system",
        "source": "ARDC-SD",
        "category": "Crates"
      },
      {
        "id": "CR-02",
        "topic": "No deposit accounting in SAP",
        "type": "compliance",
        "risk": "medium",
        "details": "Crate deposits and refunds not tracked as financial transactions in SAP. Crate-related costs/revenues bundled with other transactions.",
        "impact": "Liability not properly recorded; audit exposure",
        "source": "ARDC-SD",
        "category": "Crates"
      },
      {
        "id": "CR-03",
        "topic": "Asset management underutilized",
        "type": "process",
        "risk": "low",
        "details": "Asset management feature available in Ransale but 'operation is very limited.' Fridge and display equipment tracking not fully implemented. Upgrade planned.",
        "impact": "Customer equipment losses not tracked",
        "source": "ARDC-SD",
        "category": "Crates"
      }
    ],
    "SD-11": [
      {
        "id": "DL-01",
        "topic": "Cold chain monitoring not in SAP",
        "type": "compliance",
        "risk": "medium",
        "details": "Temperature compliance managed operationally but not integrated with SAP. No automatic alerts or compliance documentation in system for audits.",
        "impact": "Cannot prove cold chain compliance for audits",
        "source": "ARDC-SD",
        "category": "Delivery"
      },
      {
        "id": "DL-02",
        "topic": "Route optimization paused",
        "type": "process",
        "risk": "medium",
        "details": "RoadNet route optimization temporarily stopped due to master data quality. Manual journey planning in use, potentially suboptimal routes and higher delivery costs.",
        "impact": "Higher fuel and driver costs; longer delivery times",
        "source": "ARDC-SD",
        "category": "Delivery"
      },
      {
        "id": "DL-03",
        "topic": "Delivery time windows not system-enforced",
        "type": "process",
        "risk": "low",
        "details": "Customer delivery windows likely managed through route sequencing but not explicitly tracked or enforced in system. Service level compliance not measured.",
        "impact": "Customer service issues not systematically tracked",
        "source": "ARDC-SD",
        "category": "Delivery"
      },
      {
        "id": "DL-04",
        "topic": "POD capture completeness unclear",
        "type": "process",
        "risk": "low",
        "details": "Proof of delivery exists in device but integration with SAP for dispute resolution and audit trail not confirmed.",
        "impact": "Delivery disputes harder to resolve",
        "source": "ARDC-SD",
        "category": "Delivery"
      }
    ],
    "ARDC-FI-01": [
      {
        "id": "ARDC-F01",
        "topic": "7 company codes with inconsistent naming",
        "type": "process",
        "risk": "high",
        "details": "Company codes use different numbering conventions: Al Rawabi '2xxx', Emirates Rawabi '1000', Greenfield '7xxx', Kizad '5000'. No standardized naming.",
        "impact": "Consolidation complexity, audit confusion",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F02",
        "topic": "Kizad entity expansion not integrated",
        "type": "process",
        "risk": "high",
        "details": "New Kizad manufacturing entity being established. Integration planning and go-live coordination required.",
        "impact": "Delayed entity setup, parallel processes",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F03",
        "topic": "Foreign entities (Oman, Sudan) different accounting",
        "type": "compliance",
        "risk": "medium",
        "details": "Oman operates in OMR, Sudan in USD. Different currency and tax considerations not standardized.",
        "impact": "Translation complexity, compliance risk",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      }
    ],
    "ARDC-FI-02": [
      {
        "id": "ARDC-F04",
        "topic": "Two separate charts of accounts",
        "type": "process",
        "risk": "high",
        "details": "Greenfield has separate COA from other entities due to independent operational structure. Creates consolidation complexity.",
        "impact": "Consolidation mapping required, audit complexity",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F05",
        "topic": "Different material codes across companies",
        "type": "process",
        "risk": "high",
        "details": "Same material may have different codes across companies. No global material master.",
        "impact": "Intercompany reconciliation difficult",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F06",
        "topic": "Account numbering not standardized",
        "type": "process",
        "risk": "high",
        "details": "Different numbering conventions across entities. Goal to standardize not yet achieved.",
        "impact": "Reporting inconsistency",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      }
    ],
    "ARDC-FI-03": [
      {
        "id": "ARDC-F07",
        "topic": "Excel-based consolidation",
        "type": "process",
        "risk": "high",
        "details": "Consolidation performed using Excel with trial balances aggregated manually. No dedicated software.",
        "impact": "Error-prone, not scalable, delayed close",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F08",
        "topic": "Manual intercompany elimination",
        "type": "process",
        "risk": "high",
        "details": "IC identification and elimination is manual. Requires meticulous groundwork for accurate consolidation.",
        "impact": "Audit risk, month-end delays",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F09",
        "topic": "No Group Reporting capability",
        "type": "process",
        "risk": "high",
        "details": "SAP Group Reporting not implemented. Cannot drill down from consolidated to transaction level.",
        "impact": "Limited analysis capability",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      }
    ],
    "ARDC-FI-04": [
      {
        "id": "ARDC-F10",
        "topic": "IC transactions as buyer-supplier",
        "type": "process",
        "risk": "high",
        "details": "Intercompany transactions processed as regular buyer-supplier transactions. Not automated in SAP.",
        "impact": "Manual effort, reconciliation issues",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F11",
        "topic": "No formal transfer pricing policy",
        "type": "compliance",
        "risk": "high",
        "details": "No transfer pricing between entities. Oman uses cost-to-cost basis. UAE corporate tax now requires documentation.",
        "impact": "Tax compliance risk",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F12",
        "topic": "IC invoicing manual for VAT",
        "type": "compliance",
        "risk": "high",
        "details": "Invoices generated manually for VAT compliance. Not automated, creating additional effort and error risk.",
        "impact": "VAT compliance effort",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      }
    ],
    "ARDC-FI-05": [
      {
        "id": "ARDC-F13",
        "topic": "Cost centers company code-specific",
        "type": "process",
        "risk": "medium",
        "details": "Cost centers specific to each company code. Cross-company reporting requires aggregation.",
        "impact": "Limited group visibility",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F14",
        "topic": "Statistical key figures not used",
        "type": "process",
        "risk": "medium",
        "details": "No statistical key figures for allocation. Activity-based allocation not fully utilized.",
        "impact": "Simplified but less precise allocation",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F15",
        "topic": "Single hierarchy from holding",
        "type": "process",
        "risk": "low",
        "details": "Single cost center hierarchy with holding at top. Standard structure but governance needed.",
        "impact": "Hierarchy maintenance required",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      }
    ],
    "ARDC-FI-06": [
      {
        "id": "ARDC-F16",
        "topic": "35 profit centers across group",
        "type": "process",
        "risk": "medium",
        "details": "Large number of profit centers (35) across segments and DCs. Maintenance and ownership accountability needed.",
        "impact": "Governance complexity",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F17",
        "topic": "Document splitting status unclear",
        "type": "process",
        "risk": "high",
        "details": "Document splitting may be active but needs confirmation. Required for profit center balance sheets.",
        "impact": "Segment balance sheet may not be accurate",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F18",
        "topic": "Access control based on PC/CC",
        "type": "compliance",
        "risk": "medium",
        "details": "Authorization based on profit/cost centers. Dairy vs Poultry team visibility managed this way.",
        "impact": "Access governance needed",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      }
    ],
    "ARDC-FI-07": [
      {
        "id": "ARDC-F19",
        "topic": "Actual costing run monthly",
        "type": "process",
        "risk": "medium",
        "details": "Actual costing run monthly to allocate overheads. Material ledger active with cost component split.",
        "impact": "Month-end dependency",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F20",
        "topic": "Livestock as inventory not assets",
        "type": "compliance",
        "risk": "high",
        "details": "Livestock treated as inventory, revalued at year-end. Not IAS 41 compliant biological asset accounting.",
        "impact": "Financial statement accuracy",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F21",
        "topic": "5 activity types defined",
        "type": "process",
        "risk": "medium",
        "details": "Material, Labor, Depreciation, Maintenance, Utilities activity types. Fixed rates applied to activities.",
        "impact": "Rate planning and variance needed",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      }
    ],
    "ARDC-FI-08": [
      {
        "id": "ARDC-F22",
        "topic": "Costing-based CO-PA in ECC",
        "type": "process",
        "risk": "high",
        "details": "CO-PA is costing-based in ECC. S/4HANA migration requires consideration as account-based is standard.",
        "impact": "Migration complexity",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F23",
        "topic": "CO-PA live but migration needed",
        "type": "process",
        "risk": "high",
        "details": "One operating concern active with characteristics for Fresh/Frozen, segments, DCs. Will need account-based migration.",
        "impact": "S/4HANA readiness",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      },
      {
        "id": "ARDC-F24",
        "topic": "Management reporting active",
        "type": "process",
        "risk": "medium",
        "details": "Profitability reporting by segment, product, region active. Good foundation for enhancement.",
        "impact": "Enhancement opportunity",
        "source": "ARDC-FICO",
        "category": "Finance & Controlling"
      }
    ],
    "ARDC-MM-01": [
      {
        "id": "ARDC-M01",
        "topic": "Excel-based demand planning",
        "type": "process",
        "risk": "high",
        "details": "Heavy reliance on Excel for planning calculations. Sales data managed in spreadsheets since SAP not fully operational.",
        "impact": "Error-prone, no audit trail",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M02",
        "topic": "Manual PIR upload process",
        "type": "process",
        "risk": "high",
        "details": "Forecast data processed through Resa tool before manual upload to SAP as PIRs. Not automated.",
        "impact": "Delay, manual effort",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M03",
        "topic": "16-week forecast just implemented",
        "type": "process",
        "risk": "high",
        "details": "Rolling forecast went live last week. Remaining weeks from annual budget. Process still maturing.",
        "impact": "Planning accuracy risk",
        "source": "ARDC-MM",
        "category": "Materials Management"
      }
    ],
    "ARDC-MM-02": [
      {
        "id": "ARDC-M04",
        "topic": "MRP not operational in SAP",
        "type": "process",
        "risk": "high",
        "details": "MRP concept in place but not fully operational. Entire process from forecasting to PR creation is manual using Excel.",
        "impact": "No automated planning",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M05",
        "topic": "Feed requirements in Excel",
        "type": "process",
        "risk": "high",
        "details": "All calculations for feed requirements done in Excel by farm personnel. Based on cow count and milk production.",
        "impact": "Disconnected planning",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M06",
        "topic": "Only data extraction automated",
        "type": "process",
        "risk": "high",
        "details": "Only initial data extraction from SAP is automated. All calculations and PR creation remain manual.",
        "impact": "Limited SAP utilization",
        "source": "ARDC-MM",
        "category": "Materials Management"
      }
    ],
    "ARDC-MM-03": [
      {
        "id": "ARDC-M07",
        "topic": "Complex Excel for milk balancing",
        "type": "process",
        "risk": "high",
        "details": "Team uses complex Excel sheet for balancing with formulas for daily operations. Tedious and time-consuming.",
        "impact": "Balancing errors, delays",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M08",
        "topic": "No component-level balancing",
        "type": "process",
        "risk": "high",
        "details": "Balancing done at milk level, not component level (fat/protein/SNF). Fat is critical but not tracked separately.",
        "impact": "Yield optimization lost",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M09",
        "topic": "Monthly vs daily balancing gap",
        "type": "process",
        "risk": "high",
        "details": "Current balancing based on monthly requirements but daily operations often inconsistent, leading to issues.",
        "impact": "Supply/demand mismatch",
        "source": "ARDC-MM",
        "category": "Materials Management"
      }
    ],
    "ARDC-MM-04": [
      {
        "id": "ARDC-M10",
        "topic": "Manual PR-to-PO process",
        "type": "process",
        "risk": "high",
        "details": "Entire process from PR to PO is manual. Create PO from quotation, compare vendors, select, finalize conditions, send for approval.",
        "impact": "Slow procurement cycle",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M11",
        "topic": "Vendor selection by experience",
        "type": "process",
        "risk": "high",
        "details": "Manual comparison and vendor evaluation. Buyer experience plays significant role. No vendor scorecards.",
        "impact": "Inconsistent sourcing",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M12",
        "topic": "Service contract monitoring manual",
        "type": "process",
        "risk": "medium",
        "details": "Contracts being centralized but process remains manual. Expiration monitoring needed for timely renewal.",
        "impact": "Contract lapses possible",
        "source": "ARDC-MM",
        "category": "Materials Management"
      }
    ],
    "ARDC-MM-05": [
      {
        "id": "ARDC-M13",
        "topic": "Barcode-based HU capture",
        "type": "process",
        "risk": "medium",
        "details": "Palletization with barcode capture working. HU identifier crucial for tracking items within system.",
        "impact": "Good foundation exists",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M14",
        "topic": "Emergency GR via petty cash",
        "type": "process",
        "risk": "medium",
        "details": "Emergency purchases processed through petty cash (AED 7,000 limit). GR followed by petty cash request.",
        "impact": "Workaround process",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M15",
        "topic": "Batch information captured",
        "type": "process",
        "risk": "low",
        "details": "Barcode provides SCA code, Area DC, Batch number, Manufacturing date, Expiry date. Good traceability foundation.",
        "impact": "Traceability enabled",
        "source": "ARDC-MM",
        "category": "Materials Management"
      }
    ],
    "ARDC-MM-06": [
      {
        "id": "ARDC-M16",
        "topic": "Biosecurity restrictions manual",
        "type": "compliance",
        "risk": "high",
        "details": "Kizad has no inbound transfers allowed due to biosecurity. Rule not fully system-enforced.",
        "impact": "Compliance risk",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M17",
        "topic": "Dead stock issue",
        "type": "process",
        "risk": "high",
        "details": "Dead stock and consumption issues require attention. Significant task requiring team commitment.",
        "impact": "Inventory write-offs",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M18",
        "topic": "STOs between DCs working",
        "type": "process",
        "risk": "medium",
        "details": "Stock Transport Orders between DCs operational. Both plant-based and SLOC-based STOs used.",
        "impact": "Transfer process exists",
        "source": "ARDC-MM",
        "category": "Materials Management"
      }
    ],
    "ARDC-MM-07": [
      {
        "id": "ARDC-M19",
        "topic": "No dedicated warehouse manager",
        "type": "process",
        "risk": "high",
        "details": "No dedicated warehouse manager role. Items can be stored wherever needed. Storage assignment not optimized.",
        "impact": "Inefficient storage",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M20",
        "topic": "WMS complexities overlooked",
        "type": "process",
        "risk": "high",
        "details": "System handles transfer orders and confirmations but some complexities may be overlooked.",
        "impact": "Process gaps",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M21",
        "topic": "WMS in use for basics",
        "type": "process",
        "risk": "medium",
        "details": "WMS assists in determining storage locations and managing transfer records. Basic functionality working.",
        "impact": "Foundation exists",
        "source": "ARDC-MM",
        "category": "Materials Management"
      }
    ],
    "ARDC-MM-08": [
      {
        "id": "ARDC-M22",
        "topic": "Duplicate material codes",
        "type": "process",
        "risk": "high",
        "details": "Same items have duplicate codes hindering tracking and invoicing. Different codes from various vendors complicate procurement.",
        "impact": "Tracking chaos",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M23",
        "topic": "Fragmented vendor master",
        "type": "process",
        "risk": "high",
        "details": "Vendors separate per company code. Duplicate vendors across entities. Vendors criticize existing systems.",
        "impact": "Reconciliation issues",
        "source": "ARDC-MM",
        "category": "Materials Management"
      },
      {
        "id": "ARDC-M24",
        "topic": "Custom material types complexity",
        "type": "process",
        "risk": "high",
        "details": "Custom material types defined (e.g., ZROH). Need to evaluate complexity introduced by non-standard types.",
        "impact": "Process complexity",
        "source": "ARDC-MM",
        "category": "Materials Management"
      }
    ],
    "PF-01": [
      {
        "id": "C-049",
        "topic": "Parent stock mortality not tracked in SAP",
        "type": "compliance",
        "risk": "high",
        "details": "Daily mortality rates for breeding stock recorded manually. Biological asset valuation in SAP does not reflect actual flock size, distorting financial statements.",
        "source": "ENF-GF",
        "category": "Livestock & Biological"
      },
      {
        "id": "C-050",
        "topic": "Breeding performance KPIs not in system",
        "type": "process",
        "risk": "high",
        "details": "Egg production rates, fertility rates, and hatchability tracked in Excel. No system integration for performance monitoring and genetic selection decisions.",
        "source": "ENF-GF",
        "category": "Livestock & Biological"
      },
      {
        "id": "C-051",
        "topic": "Vaccination and medication not tracked",
        "type": "compliance",
        "risk": "high",
        "details": "Flock health treatments recorded on paper. Cannot demonstrate compliance with withdrawal periods before slaughter or verify vaccination schedules.",
        "source": "ENF-GF",
        "category": "Quality Management"
      }
    ],
    "PF-02": [
      {
        "id": "C-052",
        "topic": "Hatchery yield variance uncontrolled",
        "type": "process",
        "risk": "high",
        "details": "Significant variance between eggs set and chicks hatched not analyzed systematically. Cannot identify root causes of hatchability issues.",
        "source": "ENF-GF",
        "category": "Quality Management"
      },
      {
        "id": "C-053",
        "topic": "Incubation parameters not logged",
        "type": "compliance",
        "risk": "high",
        "details": "Temperature, humidity, and turning data from incubators not captured in SAP. Quality traceability incomplete for day-old chick production.",
        "source": "ENF-GF",
        "category": "Quality Management"
      },
      {
        "id": "C-054",
        "topic": "Egg inventory by age not tracked",
        "type": "process",
        "risk": "high",
        "details": "Hatching eggs not tracked by production date. FIFO for setting not enforced, affecting hatchability and chick quality.",
        "source": "ENF-GF",
        "category": "Inventory & Traceability"
      }
    ],
    "PF-03": [
      {
        "id": "C-055",
        "topic": "DOC quality grading subjective",
        "type": "compliance",
        "risk": "high",
        "details": "Day-old chick quality assessment done manually without standardized criteria in SAP. Quality claims from customers difficult to investigate.",
        "source": "ENF-GF",
        "category": "Quality Management"
      },
      {
        "id": "C-056",
        "topic": "Chick placement planning manual",
        "type": "process",
        "risk": "high",
        "details": "DOC allocation to broiler farms done in spreadsheets. No optimization for farm capacity, biosecurity zones, or customer requirements.",
        "source": "ENF-GF",
        "category": "Production Planning"
      },
      {
        "id": "C-057",
        "topic": "Vaccination at hatchery not batch-tracked",
        "type": "compliance",
        "risk": "high",
        "details": "In-ovo and spray vaccination at hatchery not linked to DOC batches. Cannot verify vaccination status of birds in case of disease outbreak.",
        "source": "ENF-GF",
        "category": "Quality Management"
      }
    ],
    "PF-04": [
      {
        "id": "C-058",
        "topic": "Biological asset valuation incorrect",
        "type": "compliance",
        "risk": "high",
        "details": "Living birds not valued according to IAS 41 fair value requirements. Standard cost approach used instead, distorting balance sheet and P&L.",
        "source": "ENF-GF",
        "category": "Costing & Finance"
      },
      {
        "id": "C-059",
        "topic": "Flock depreciation not automated",
        "type": "compliance",
        "risk": "high",
        "details": "Parent stock depreciation calculated manually in Excel. Monthly journal entries prone to errors and timing differences.",
        "source": "ENF-GF",
        "category": "Costing & Finance"
      },
      {
        "id": "C-060",
        "topic": "Mortality cost impact not tracked",
        "type": "process",
        "risk": "high",
        "details": "Financial impact of bird mortality not systematically calculated. Cannot assess true cost of disease outbreaks or management issues.",
        "source": "ENF-GF",
        "category": "Costing & Finance"
      }
    ],
    "PF-05": [
      {
        "id": "C-061",
        "topic": "Feed formulation system not integrated",
        "type": "integration",
        "risk": "high",
        "details": "Easy Feed formulation software operates independently. Recipes not transferred to SAP, requiring manual BOM maintenance and creating version control issues.",
        "source": "ENF-GF",
        "category": "Feed Management"
      },
      {
        "id": "C-062",
        "topic": "Least-cost formulation ignores inventory",
        "type": "process",
        "risk": "high",
        "details": "Feed formulations optimize only for nutrition and cost, not for available inventory. May specify ingredients not in stock while excess of alternatives sits unused.",
        "source": "ENF-GF",
        "category": "Feed Management"
      },
      {
        "id": "C-063",
        "topic": "Feed specification changes not version-controlled",
        "type": "compliance",
        "risk": "high",
        "details": "Recipe modifications not tracked with effective dates. Cannot determine which formula was used for a specific production batch.",
        "source": "ENF-GF",
        "category": "Feed Management"
      }
    ],
    "PF-06": [
      {
        "id": "C-064",
        "topic": "Feed mill equipment not integrated",
        "type": "integration",
        "risk": "high",
        "details": "Mixer, pellet press, and bagging equipment operate independently from SAP. Production data manually entered, causing delays and errors.",
        "source": "ENF-GF",
        "category": "Feed Management"
      },
      {
        "id": "C-065",
        "topic": "Feed batch traceability incomplete",
        "type": "compliance",
        "risk": "high",
        "details": "Cannot trace feed batch back to specific ingredient lots. In case of contamination, cannot identify affected feed production or farms that received it.",
        "source": "ENF-GF",
        "category": "Quality Management"
      },
      {
        "id": "C-066",
        "topic": "Medication in feed not tracked",
        "type": "compliance",
        "risk": "high",
        "details": "Medicated feed production not separately tracked in SAP. Risk of cross-contamination and failure to observe withdrawal periods.",
        "source": "ENF-GF",
        "category": "Quality Management"
      }
    ],
    "PF-07": [
      {
        "id": "C-067",
        "topic": "Farm production data manual entry",
        "type": "process",
        "risk": "high",
        "details": "Daily mortality, feed consumption, water intake, and weights recorded on paper at farms. Data entry to SAP delayed by days, preventing timely intervention.",
        "source": "ENF-GF",
        "category": "Livestock & Biological"
      },
      {
        "id": "C-068",
        "topic": "Environmental controls not monitored",
        "type": "compliance",
        "risk": "high",
        "details": "Poultry house temperature, ventilation, and humidity not logged in SAP. Cannot correlate environmental conditions with flock performance issues.",
        "source": "ENF-GF",
        "category": "Livestock & Biological"
      },
      {
        "id": "C-069",
        "topic": "Bird weight sampling not standardized",
        "type": "process",
        "risk": "high",
        "details": "Weekly weight sampling procedures vary by farm. No system validation of sample size or methodology, affecting growth curve reliability.",
        "source": "ENF-GF",
        "category": "Quality Management"
      }
    ],
    "PF-08": [
      {
        "id": "C-070",
        "topic": "Feed conversion ratio calculated manually",
        "type": "process",
        "risk": "high",
        "details": "FCR calculated in Excel using potentially inaccurate feed delivery and bird weight data. Key performance metric reliability questionable.",
        "source": "ENF-GF",
        "category": "Feed Management"
      },
      {
        "id": "C-071",
        "topic": "Feed inventory at farms not real-time",
        "type": "process",
        "risk": "high",
        "details": "Farm bin levels not monitored in SAP. Feed delivery scheduling based on estimates, risking stockouts or over-delivery.",
        "source": "ENF-GF",
        "category": "Feed Management"
      },
      {
        "id": "C-072",
        "topic": "Feed wastage not measured",
        "type": "process",
        "risk": "high",
        "details": "Spillage, pest damage, and spoilage at farms not quantified. Feed cost allocation to birds overstated, distorting production costs.",
        "source": "ENF-GF",
        "category": "Costing & Finance"
      }
    ],
    "PF-09": [
      {
        "id": "C-073",
        "topic": "Live bird catch weight not recorded",
        "type": "process",
        "risk": "high",
        "details": "Birds collected for processing not weighed at farm. Settlement with contract growers based on processing plant weights, causing disputes.",
        "impact": "Grower disputes; potential over/underpayment",
        "source": "ENF-GF",
        "category": "Production Planning"
      },
      {
        "id": "C-074",
        "topic": "Transport mortality not tracked by vehicle",
        "type": "compliance",
        "risk": "high",
        "details": "Dead-on-arrival birds recorded but not analyzed by vehicle, driver, distance, or weather conditions. Cannot identify and address transport welfare issues.",
        "impact": "Ongoing DOA losses; welfare audit risk",
        "source": "ENF-GF",
        "category": "Quality Management"
      },
      {
        "id": "C-075",
        "topic": "Ante-mortem inspection not in SAP",
        "type": "compliance",
        "risk": "high",
        "details": "Pre-slaughter veterinary inspection results recorded on paper. No system linkage to processing lot, risking processing of rejected birds.",
        "impact": "Food safety risk; regulatory non-compliance",
        "source": "ENF-GF",
        "category": "Quality Management"
      }
    ],
    "PF-10": [
      {
        "id": "C-076",
        "topic": "Line speed and yield not integrated",
        "type": "integration",
        "risk": "high",
        "details": "Processing line equipment data not captured in SAP. Cannot correlate line speed with yield, quality, or labor efficiency.",
        "impact": "Cannot optimize line efficiency; hidden yield losses",
        "source": "ENF-GF",
        "category": "Production Planning"
      },
      {
        "id": "C-077",
        "topic": "Carcass grading subjective",
        "type": "compliance",
        "risk": "high",
        "details": "A/B grade determination done visually without system-recorded criteria. Grading consistency varies by shift and operator.",
        "impact": "Inconsistent quality; customer complaints",
        "source": "ENF-GF",
        "category": "Quality Management"
      },
      {
        "id": "C-078",
        "topic": "Processing yield variance uncontrolled",
        "type": "process",
        "risk": "high",
        "details": "Standard vs. actual yield not analyzed systematically. Cannot identify causes of yield loss or evaluate equipment efficiency.",
        "impact": "Yield losses undetected; margin erosion",
        "source": "ENF-GF",
        "category": "Production Planning"
      }
    ],
    "PF-11": [
      {
        "id": "C-079",
        "topic": "Cut-up planning not optimized",
        "type": "process",
        "risk": "high",
        "details": "Portioning decisions made based on operator judgment, not demand-driven optimization. Value loss from suboptimal cut patterns.",
        "impact": "Value destruction from wrong cut mix",
        "source": "ENF-GF",
        "category": "Production Planning"
      },
      {
        "id": "C-080",
        "topic": "By-product yield not tracked",
        "type": "compliance",
        "risk": "high",
        "details": "Giblets, feet, and other by-products not systematically recorded. Potential revenue from by-product sales not captured accurately.",
        "impact": "Lost by-product revenue; costing errors",
        "source": "ENF-GF",
        "category": "Costing & Finance"
      },
      {
        "id": "C-081",
        "topic": "Portion weight control manual",
        "type": "compliance",
        "risk": "high",
        "details": "Fixed-weight pack compliance checked manually. No statistical process control for giveaway reduction.",
        "impact": "Product giveaway; customer under-weight claims",
        "source": "ENF-GF",
        "category": "Quality Management"
      }
    ],
    "PF-12": [
      {
        "id": "C-082",
        "topic": "Marination formula tracking inadequate",
        "type": "compliance",
        "risk": "high",
        "details": "Further processed product recipes and allergen content not fully version-controlled in SAP. Labeling accuracy at risk.",
        "impact": "Allergen labeling risk; potential recall",
        "source": "ENF-GF",
        "category": "Quality Management"
      },
      {
        "id": "C-083",
        "topic": "Cooking process parameters not logged",
        "type": "compliance",
        "risk": "high",
        "details": "Oven temperatures, cook times, and core temperatures not captured in SAP. Cannot demonstrate food safety compliance for cooked products.",
        "impact": "Cannot prove food safety in audit",
        "source": "ENF-GF",
        "category": "Quality Management"
      },
      {
        "id": "C-084",
        "topic": "Rework tracking incomplete",
        "type": "compliance",
        "risk": "high",
        "details": "Reworked product not tracked with original batch linkage. Traceability broken when non-conforming product reprocessed.",
        "impact": "Traceability gap; expanded recall scope",
        "source": "ENF-GF",
        "category": "Quality Management"
      }
    ],
    "PF-13": [
      {
        "id": "C-085",
        "topic": "Quality testing reactive, not preventive",
        "type": "compliance",
        "risk": "high",
        "details": "Lab testing triggered only after problems identified. No systematic sampling plan with statistical basis for process control.",
        "impact": "Quality issues found too late; rework costs",
        "source": "ENF-GF",
        "category": "Quality Management"
      },
      {
        "id": "C-086",
        "topic": "Microbiological results not blocking release",
        "type": "compliance",
        "risk": "high",
        "details": "Products can ship before microbiological test results available. No system hold pending lab clearance, creating food safety risk.",
        "impact": "Major food safety risk; consumer harm potential",
        "source": "ENF-GF",
        "category": "Quality Management"
      },
      {
        "id": "C-087",
        "topic": "Customer complaints not linked to batches",
        "type": "process",
        "risk": "high",
        "details": "Quality complaints recorded but not systematically linked to production batches. Root cause analysis incomplete.",
        "impact": "Recurring quality issues not resolved",
        "source": "ENF-GF",
        "category": "Quality Management"
      },
      {
        "id": "C-088",
        "topic": "Supplier quality not tracked",
        "type": "compliance",
        "risk": "high",
        "details": "Incoming material quality history not maintained in SAP. Cannot evaluate supplier performance or enforce quality agreements.",
        "impact": "Poor suppliers not identified; quality risk",
        "source": "ENF-GF",
        "category": "Quality Management"
      }
    ],
    "PF-14": [
      {
        "id": "C-089",
        "topic": "Inventory accuracy below acceptable levels",
        "type": "process",
        "risk": "high",
        "details": "Cycle count results show significant variances. Root causes not investigated systematically, affecting inventory reliability.",
        "impact": "Inventory write-offs; planning unreliable",
        "source": "ENF-GF",
        "category": "Inventory & Traceability"
      },
      {
        "id": "C-090",
        "topic": "Batch traceability forward and backward incomplete",
        "type": "compliance",
        "risk": "high",
        "details": "Cannot trace from finished product back to input materials or forward from materials to all affected products. Recall capability severely limited.",
        "impact": "Full product recall instead of targeted",
        "source": "ENF-GF",
        "category": "Quality Management"
      },
      {
        "id": "C-091",
        "topic": "Mock recall never tested",
        "type": "compliance",
        "risk": "high",
        "details": "No documented mock recall exercise performed. Actual recall capability and timing unknown until crisis occurs.",
        "impact": "Will fail during real recall; regulatory action",
        "source": "ENF-GF",
        "category": "Quality Management"
      }
    ],
    "PF-15": [
      {
        "id": "C-092",
        "topic": "Production capacity drives sales, not demand",
        "type": "process",
        "risk": "high",
        "details": "Farms run at full capacity regardless of sales forecast. Chronic oversupply requires promotional pricing, eroding margins.",
        "impact": "Chronic margin erosion from discounting",
        "source": "ENF-GF",
        "category": "Sales & Distribution"
      },
      {
        "id": "C-093",
        "topic": "No integrated demand planning",
        "type": "process",
        "risk": "high",
        "details": "52-day production cycle makes demand responsiveness impossible. No system connecting sales forecast to farm placement decisions.",
        "impact": "Structural supply-demand mismatch",
        "source": "ENF-GF",
        "category": "Production Planning"
      },
      {
        "id": "C-094",
        "topic": "MRP not running for production planning",
        "type": "process",
        "risk": "high",
        "details": "Material Requirements Planning disabled. Production planned based on budget rather than demand, creating systematic oversupply.",
        "impact": "SAP planning capability not utilized",
        "source": "ENF-GF",
        "category": "Production Planning"
      }
    ],
    "ENF-SD-01": [
      {
        "id": "ENF-S01",
        "topic": "Fully offline van sales operation",
        "type": "process",
        "risk": "high",
        "details": "SONIC application operates fully offline. Morning stock loading, evening return sync. No real-time visibility of sales or inventory during day.",
        "impact": "Cannot redirect stock during day; lost sales",
        "source": "ENF",
        "category": "Sales & Distribution"
      },
      {
        "id": "ENF-S02",
        "topic": "Routes as locations creates complexity",
        "type": "process",
        "risk": "medium",
        "details": "32 routes configured as locations in SAP. Reconciliation at van level, not depot level, creates additional complexity.",
        "impact": "Reconciliation overhead; audit complexity",
        "source": "ENF",
        "category": "Sales & Distribution"
      },
      {
        "id": "ENF-S03",
        "topic": "End-of-day sync delays",
        "type": "integration",
        "risk": "high",
        "details": "Transactions uploaded to SAP only at end of day. Financial and inventory positions outdated until evening sync completes.",
        "impact": "Next-day decisions based on stale data",
        "source": "ENF",
        "category": "Sales & Distribution"
      }
    ],
    "ENF-SD-02": [
      {
        "id": "ENF-S04",
        "topic": "Manual order reconciliation",
        "type": "process",
        "risk": "high",
        "details": "Daily reconciliation between SONIC and SAP requires manual intervention. Discrepancies investigated manually without system support.",
        "impact": "Reconciliation errors; revenue leakage",
        "source": "ENF",
        "category": "Sales & Distribution"
      },
      {
        "id": "ENF-S05",
        "topic": "No real-time ATP check",
        "type": "process",
        "risk": "high",
        "details": "Available-to-promise not checked during offline order taking. Overselling common, requiring substitution or cancellation.",
        "impact": "Customer dissatisfaction; lost sales",
        "source": "ENF",
        "category": "Sales & Distribution"
      },
      {
        "id": "ENF-S06",
        "topic": "Master data sync once daily",
        "type": "integration",
        "risk": "medium",
        "details": "Price changes, new products, customer updates only reflected next day. Pricing errors during promotional periods.",
        "impact": "Pricing errors; promotional misexecution",
        "source": "ENF",
        "category": "Sales & Distribution"
      }
    ],
    "ENF-SD-03": [
      {
        "id": "ENF-S07",
        "topic": "No route profitability analysis",
        "type": "process",
        "risk": "high",
        "details": "Route-level profitability not tracked in SAP CO-PA. Weekly supervisor meetings rely on external reports.",
        "impact": "Unprofitable routes continue; resource waste",
        "source": "ENF",
        "category": "Sales & Distribution"
      },
      {
        "id": "ENF-S08",
        "topic": "Customer profitability unknown",
        "type": "process",
        "risk": "high",
        "details": "No customer-level profitability analysis. Cannot identify which customers are profitable vs. loss-making.",
        "impact": "Subsiding unprofitable customers",
        "source": "ENF",
        "category": "Sales & Distribution"
      },
      {
        "id": "ENF-S09",
        "topic": "Manual weekly analysis",
        "type": "process",
        "risk": "medium",
        "details": "Route performance analyzed weekly in Excel. No real-time dashboards or automated alerts for underperformance.",
        "impact": "Delayed corrective action",
        "source": "ENF",
        "category": "Sales & Distribution"
      }
    ],
    "ENF-SD-04": [
      {
        "id": "ENF-S10",
        "topic": "Export sales minimal and manual",
        "type": "process",
        "risk": "medium",
        "details": "Only 3% of frozen sales exported. Manual sales order creation in SAP. No integration with export documentation.",
        "impact": "Limited export growth capability",
        "source": "ENF",
        "category": "Sales & Distribution"
      },
      {
        "id": "ENF-S11",
        "topic": "No health certificate automation",
        "type": "process",
        "risk": "high",
        "details": "Export health certificates generated manually. Halal certificates managed outside system. Document compliance risk.",
        "impact": "Export shipment delays; compliance risk",
        "source": "ENF",
        "category": "Sales & Distribution"
      }
    ],
    "ENF-SD-05": [
      {
        "id": "ENF-S12",
        "topic": "No formal contract management",
        "type": "process",
        "risk": "high",
        "details": "Key accounts like Nando's managed without SAP contract management. Customer specifications not system-enforced.",
        "impact": "Contract compliance gaps; margin erosion",
        "source": "ENF",
        "category": "Sales & Distribution"
      },
      {
        "id": "ENF-S13",
        "topic": "Customer-specific recipes manual",
        "type": "process",
        "risk": "high",
        "details": "Marinated products for key accounts use customer-provided formulas. Recipe version control manual.",
        "impact": "Recipe errors; customer specification fails",
        "source": "ENF",
        "category": "Sales & Distribution"
      },
      {
        "id": "ENF-S14",
        "topic": "No scheduling agreements",
        "type": "process",
        "risk": "medium",
        "details": "No SAP scheduling agreements for regular key account deliveries. Each order created manually.",
        "impact": "Order processing overhead; forecast gaps",
        "source": "ENF",
        "category": "Sales & Distribution"
      }
    ],
    "ENF-SD-06": [
      {
        "id": "ENF-S15",
        "topic": "Private label specs outside SAP",
        "type": "process",
        "risk": "high",
        "details": "White-label production specifications for customers like Viva managed outside SAP. Artwork and recipe in documents only.",
        "impact": "Specification errors; wrong labeling risk",
        "source": "ENF",
        "category": "Sales & Distribution"
      },
      {
        "id": "ENF-S16",
        "topic": "No customer material integration",
        "type": "process",
        "risk": "medium",
        "details": "Customer-furnished packaging materials not integrated in BOM. Manual coordination for private label production.",
        "impact": "Material planning gaps; delays",
        "source": "ENF",
        "category": "Sales & Distribution"
      }
    ],
    "ENF-SD-07": [
      {
        "id": "ENF-S17",
        "topic": "High returns rate",
        "type": "process",
        "risk": "high",
        "details": "13% average returns vs 10-12% target. Good returns repacked as frozen under Salwa brand. Bad returns to rendering.",
        "impact": "Margin erosion; brand cannibalization",
        "source": "ENF",
        "category": "Sales & Distribution"
      },
      {
        "id": "ENF-S18",
        "topic": "Returns root cause not tracked",
        "type": "process",
        "risk": "high",
        "details": "Returns classified as good/bad but root causes not systematically analyzed. Cannot reduce returns rate.",
        "impact": "Recurring quality and forecast issues",
        "source": "ENF",
        "category": "Sales & Distribution"
      },
      {
        "id": "ENF-S19",
        "topic": "Quality lot routing manual",
        "type": "process",
        "risk": "medium",
        "details": "Returns quality decision creates lot but routing to reprocess or rendering is manual decision.",
        "impact": "Returns handling delays; waste",
        "source": "ENF",
        "category": "Sales & Distribution"
      }
    ],
    "ENF-PP-01": [
      {
        "id": "ENF-P01",
        "topic": "Intercompany eggs manual transfer",
        "type": "process",
        "risk": "high",
        "details": "Hatching eggs from Liwa/Salwa transferred via manual delivery notes not in SAP. No system traceability.",
        "impact": "Intercompany audit risk; traceability gap",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P02",
        "topic": "Egg grading not in SAP",
        "type": "process",
        "risk": "high",
        "details": "A-grade (hatchable) vs B-grade (reject) segregation done physically but not recorded in SAP quality management.",
        "impact": "Yield tracking inaccurate; cost allocation wrong",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P03",
        "topic": "No batch genealogy for eggs",
        "type": "compliance",
        "risk": "high",
        "details": "Cannot trace DOC output back to specific egg batches and supplier flock. Disease outbreak tracing impossible.",
        "impact": "Cannot identify contamination source",
        "source": "ENF",
        "category": "Production Planning"
      }
    ],
    "ENF-PP-02": [
      {
        "id": "ENF-P04",
        "topic": "Single production order for 21-day cycle",
        "type": "process",
        "risk": "medium",
        "details": "One production order covers entire egg-to-DOC incubation cycle. Daily mortality and infertile egg scrap recorded at cycle end only.",
        "impact": "Daily visibility lacking; late issue detection",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P05",
        "topic": "Hatchability estimation inaccurate",
        "type": "process",
        "risk": "high",
        "details": "Historical estimates at 85-86% but actual 90-92%. Recently corrected but variance analysis not systematic.",
        "impact": "Over-ordering eggs; cost waste",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P06",
        "topic": "No breed performance tracking",
        "type": "process",
        "risk": "high",
        "details": "Hatchery efficiency not tracked by breed/strain. Cannot optimize breeding stock selection based on hatch yield.",
        "impact": "Suboptimal genetics; lower yields",
        "source": "ENF",
        "category": "Production Planning"
      }
    ],
    "ENF-PP-03": [
      {
        "id": "ENF-P07",
        "topic": "No SAP Livestock Management",
        "type": "process",
        "risk": "high",
        "details": "Flock master data, daily transactions, performance KPIs managed outside SAP. Critical gap for poultry operations.",
        "impact": "Cannot track flock performance systematically",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P08",
        "topic": "Feed consumption uncontrolled",
        "type": "process",
        "risk": "high",
        "details": "Bulk feed delivered to silos without measurement. No measuring in tankers or silos. Cannot verify actual consumption by house.",
        "impact": "FCR 25-30% above benchmark; millions in waste",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P09",
        "topic": "FCR 1.7-1.8 vs benchmark 1.4",
        "type": "process",
        "risk": "high",
        "details": "Feed conversion ratio significantly above industry standard. Cannot determine if feed quality, genetics, or management is cause.",
        "impact": "AED millions in excess feed cost annually",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P10",
        "topic": "Multi-source DOC mixing",
        "type": "compliance",
        "risk": "medium",
        "details": "DOCs from internal Liwa and external suppliers mixed in same houses. Traceability and supplier performance tracking lost.",
        "impact": "Cannot evaluate supplier quality; disease risk",
        "source": "ENF",
        "category": "Production Planning"
      }
    ],
    "ENF-PP-04": [
      {
        "id": "ENF-P11",
        "topic": "Live bird receipt not integrated",
        "type": "integration",
        "risk": "high",
        "details": "Birds received from farms without integrated weighing. Platform weights not connected to SAP for yield calculation.",
        "impact": "Yield baseline inaccurate; cost allocation wrong",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P12",
        "topic": "No ante-mortem inspection recording",
        "type": "compliance",
        "risk": "high",
        "details": "Pre-slaughter health inspection performed but not recorded in SAP. Cannot demonstrate food safety compliance.",
        "impact": "Regulatory compliance gap; audit risk",
        "source": "ENF",
        "category": "Production Planning"
      }
    ],
    "ENF-PP-05": [
      {
        "id": "ENF-P13",
        "topic": "Two separate plants create complexity",
        "type": "process",
        "risk": "medium",
        "details": "Fresh processing (PPE) and frozen processing (FPPE) are separate facilities. 70% fresh, 30% frozen ratio managed manually.",
        "impact": "Suboptimal capacity utilization",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P14",
        "topic": "Line speed and yield not integrated",
        "type": "integration",
        "risk": "high",
        "details": "Processing line speed not captured in SAP. Yield variances not linked to line performance or operator.",
        "impact": "Yield losses undetected; root cause unknown",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P15",
        "topic": "No MSG variable yield handling",
        "type": "process",
        "risk": "high",
        "details": "Production order created AFTER output known because variable yield not supported. Plan differs significantly from actual.",
        "impact": "Planning unreliable; costing inaccurate",
        "source": "ENF",
        "category": "Production Planning"
      }
    ],
    "ENF-PP-06": [
      {
        "id": "ENF-P16",
        "topic": "No value-based carcass splitting",
        "type": "process",
        "risk": "high",
        "details": "Carcass breakdown cost not allocated by market value. Breast appears artificially cheap, wings show losses.",
        "impact": "Wrong pricing decisions; margin erosion",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P17",
        "topic": "By-product costing absent",
        "type": "process",
        "risk": "high",
        "details": "Giblets, feet, and offal not valued systematically. By-product revenue not credited to main product cost.",
        "impact": "Understated by-product value; wrong COGS",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P18",
        "topic": "Joint cost allocation crude",
        "type": "process",
        "risk": "high",
        "details": "65-70% whole chicken cost allocated by weight only, not market value. Portion profitability analysis impossible.",
        "impact": "Cannot determine product profitability",
        "source": "ENF",
        "category": "Production Planning"
      }
    ],
    "ENF-PP-07": [
      {
        "id": "ENF-P19",
        "topic": "SKU determined at packing",
        "type": "process",
        "risk": "medium",
        "details": "Multiple SKU sizes from same input (1kg, 1.2kg, etc.). SKU determined by actual weight at packing, not planned.",
        "impact": "SKU mix variance; demand not met",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P20",
        "topic": "No catch-weight management",
        "type": "process",
        "risk": "high",
        "details": "No SAP MSG catch-weight for variable-weight products. Inventory and costing based on estimated weights.",
        "impact": "Inventory valuation errors; giveaway",
        "source": "ENF",
        "category": "Production Planning"
      },
      {
        "id": "ENF-P21",
        "topic": "Weight classification manual",
        "type": "process",
        "risk": "high",
        "details": "Weight-range classification and automatic SKU assignment not implemented. Manual determination at packing stations.",
        "impact": "Inconsistent grading; labor inefficiency",
        "source": "ENF",
        "category": "Production Planning"
      }
    ],
    "ENF-MM-01": [
      {
        "id": "ENF-M01",
        "topic": "DOC imports from Saudi Arabia",
        "type": "process",
        "risk": "medium",
        "details": "DOCs imported entirely from Saudi Arabia. Delivered to doorstep with no inbound logistics management in SAP.",
        "impact": "No visibility of inbound supply chain",
        "source": "ENF",
        "category": "Materials Management"
      },
      {
        "id": "ENF-M02",
        "topic": "No supplier quality management",
        "type": "process",
        "risk": "high",
        "details": "DOC supplier qualification and performance tracking not in SAP. Cannot enforce quality-based supplier selection.",
        "impact": "Quality issues from poor suppliers",
        "source": "ENF",
        "category": "Materials Management"
      },
      {
        "id": "ENF-M03",
        "topic": "Import documentation manual",
        "type": "process",
        "risk": "high",
        "details": "Import documentation and arrival inspection managed outside SAP. No integration with customs clearance.",
        "impact": "Compliance risk; shipment delays",
        "source": "ENF",
        "category": "Materials Management"
      }
    ],
    "ENF-MM-02": [
      {
        "id": "ENF-M04",
        "topic": "DOC specs only recently implemented",
        "type": "compliance",
        "risk": "high",
        "details": "Quality specifications for DOCs only started one month ago. Previously no specs in purchase orders.",
        "impact": "Cannot enforce supplier standards",
        "source": "ENF",
        "category": "Materials Management"
      },
      {
        "id": "ENF-M05",
        "topic": "No specification compliance tracking",
        "type": "process",
        "risk": "high",
        "details": "Vendor compliance against specifications not tracked systematically. Manual review only.",
        "impact": "Specification violations undetected",
        "source": "ENF",
        "category": "Materials Management"
      },
      {
        "id": "ENF-M06",
        "topic": "No vendor scorecards",
        "type": "process",
        "risk": "medium",
        "details": "Vendor performance not scored based on quality, delivery, and price compliance.",
        "impact": "Poor vendors not identified",
        "source": "ENF",
        "category": "Materials Management"
      }
    ],
    "ENF-MM-03": [
      {
        "id": "ENF-M07",
        "topic": "Government subsidized feed",
        "type": "process",
        "risk": "medium",
        "details": "90% feed under government subsidy via ADS municipality quota. Quota punched in government portal manually.",
        "impact": "Manual compliance; quota tracking risk",
        "source": "ENF",
        "category": "Materials Management"
      },
      {
        "id": "ENF-M08",
        "topic": "No feed nutritional tracking",
        "type": "process",
        "risk": "high",
        "details": "Feed nutritional specifications and mycotoxin testing not tracked in SAP. Cannot correlate FCR to feed quality.",
        "impact": "Feed quality impact unknown",
        "source": "ENF",
        "category": "Materials Management"
      },
      {
        "id": "ENF-M09",
        "topic": "Greenfields integration manual",
        "type": "integration",
        "risk": "high",
        "details": "Feed from Greenfields (internal) managed via manual coordination. No intercompany STO automation.",
        "impact": "Intercompany reconciliation issues",
        "source": "ENF",
        "category": "Materials Management"
      }
    ],
    "ENF-MM-04": [
      {
        "id": "ENF-M10",
        "topic": "Vaccine inventory by lab",
        "type": "process",
        "risk": "medium",
        "details": "Vaccines and medications managed by farm manager and lab. PR created based on requirements.",
        "impact": "Inventory visibility limited",
        "source": "ENF",
        "category": "Materials Management"
      },
      {
        "id": "ENF-M11",
        "topic": "No cold chain tracking",
        "type": "compliance",
        "risk": "high",
        "details": "Cold chain management for vaccines not addressed in SAP. Temperature excursions not tracked.",
        "impact": "Vaccine efficacy risk; waste",
        "source": "ENF",
        "category": "Materials Management"
      },
      {
        "id": "ENF-M12",
        "topic": "Withdrawal period manual",
        "type": "compliance",
        "risk": "high",
        "details": "Antibiotic withdrawal periods tracked manually. No system enforcement before slaughter clearance.",
        "impact": "Residue compliance risk",
        "source": "ENF",
        "category": "Materials Management"
      }
    ],
    "ENF-MM-05": [
      {
        "id": "ENF-M13",
        "topic": "No daily bird valuation",
        "type": "compliance",
        "risk": "high",
        "details": "Growing birds not valued daily. Millions in inventory valued only through production order at cycle end.",
        "impact": "Balance sheet understatement",
        "source": "ENF",
        "category": "Materials Management"
      },
      {
        "id": "ENF-M14",
        "topic": "Weight gain not recognized",
        "type": "compliance",
        "risk": "high",
        "details": "IAS 41 requires weight gain recognition. Current system does not capture daily biological transformation value.",
        "impact": "IAS 41 non-compliance; audit risk",
        "source": "ENF",
        "category": "Materials Management"
      },
      {
        "id": "ENF-M15",
        "topic": "Mortality deduction not timely",
        "type": "process",
        "risk": "high",
        "details": "Mortality deductions recorded at cycle end only. Daily mortality impact on inventory value not captured.",
        "impact": "WIP valuation inaccurate daily",
        "source": "ENF",
        "category": "Materials Management"
      }
    ],
    "ENF-MM-06": [
      {
        "id": "ENF-M16",
        "topic": "Multi-brand packaging complexity",
        "type": "process",
        "risk": "medium",
        "details": "Separate packaging for Rauda (fresh), Salwa (frozen), and private labels. BOM management complex.",
        "impact": "Packaging planning challenges",
        "source": "ENF",
        "category": "Materials Management"
      },
      {
        "id": "ENF-M17",
        "topic": "Private label artwork outside SAP",
        "type": "process",
        "risk": "high",
        "details": "Customer artwork and label specifications managed outside SAP. Version control manual.",
        "impact": "Wrong label risk; customer complaints",
        "source": "ENF",
        "category": "Materials Management"
      }
    ],
    "ENF-QM-01": [
      {
        "id": "ENF-Q01",
        "topic": "DOC quality specs only recently implemented",
        "type": "compliance",
        "risk": "high",
        "details": "DOC quality specifications only started one month ago. Previously no formal specs in purchase orders.",
        "impact": "Cannot enforce supplier quality standards",
        "source": "ENF",
        "category": "Quality Management"
      },
      {
        "id": "ENF-Q02",
        "topic": "Swab testing results not in SAP",
        "type": "process",
        "risk": "high",
        "details": "Swab tests performed at DOC receipt but results recorded outside SAP. No batch linkage.",
        "impact": "Cannot correlate quality issues to batches",
        "source": "ENF",
        "category": "Quality Management"
      },
      {
        "id": "ENF-Q03",
        "topic": "No vendor performance scoring",
        "type": "process",
        "risk": "medium",
        "details": "DOC supplier quality performance not systematically tracked. Cannot enforce quality-based supplier selection.",
        "impact": "Poor suppliers continue; quality risk",
        "source": "ENF",
        "category": "Quality Management"
      }
    ],
    "ENF-QM-02": [
      {
        "id": "ENF-Q04",
        "topic": "Egg testing too late in cycle",
        "type": "process",
        "risk": "high",
        "details": "Testing done 20-22 days into cycle (after hatch). Results received too late for intervention.",
        "impact": "Cannot prevent contaminated batch hatching",
        "source": "ENF",
        "category": "Quality Management"
      },
      {
        "id": "ENF-Q05",
        "topic": "No pre-incubation disease detection",
        "type": "process",
        "risk": "high",
        "details": "No infrared egg analysis or early disease detection before incubation. Infected eggs discovered too late.",
        "impact": "Entire batch potentially contaminated",
        "source": "ENF",
        "category": "Quality Management"
      },
      {
        "id": "ENF-Q06",
        "topic": "Pseudomonas example - 18 days to identify",
        "type": "compliance",
        "risk": "high",
        "details": "Pseudomonas contamination identified after 18 days. Cannot trace source when batches mixed from multiple suppliers.",
        "impact": "Disease spread before detection",
        "source": "ENF",
        "category": "Quality Management"
      }
    ],
    "ENF-QM-03": [
      {
        "id": "ENF-Q07",
        "topic": "In-process QC not in SAP",
        "type": "process",
        "risk": "high",
        "details": "Quality function exists but HACCP CCP monitoring not recorded in SAP. Paper-based records retained shelf-life + 1 year.",
        "impact": "Audit trail weak; compliance risk",
        "source": "ENF",
        "category": "Quality Management"
      },
      {
        "id": "ENF-Q08",
        "topic": "No automatic batch holds",
        "type": "process",
        "risk": "high",
        "details": "Out-of-spec results do not automatically hold affected batches. Manual intervention required.",
        "impact": "Non-conforming product may ship",
        "source": "ENF",
        "category": "Quality Management"
      },
      {
        "id": "ENF-Q09",
        "topic": "Manual lot of documentation",
        "type": "process",
        "risk": "medium",
        "details": "Quality documentation in mix of cloud storage and physical files. No integrated document management.",
        "impact": "Documents hard to retrieve during audit",
        "source": "ENF",
        "category": "Quality Management"
      }
    ],
    "ENF-QM-04": [
      {
        "id": "ENF-Q10",
        "topic": "No LIMS integration",
        "type": "integration",
        "risk": "high",
        "details": "No Laboratory Information Management System. Micro test results manually documented, not linked to production batches.",
        "impact": "Cannot automate release decisions",
        "source": "ENF",
        "category": "Quality Management"
      },
      {
        "id": "ENF-Q11",
        "topic": "Micro results not blocking release",
        "type": "compliance",
        "risk": "high",
        "details": "Products can ship before Salmonella/Campylobacter results available. No system hold pending lab clearance.",
        "impact": "Major food safety risk",
        "source": "ENF",
        "category": "Quality Management"
      },
      {
        "id": "ENF-Q12",
        "topic": "Antibiotic residue testing gaps",
        "type": "compliance",
        "risk": "medium",
        "details": "Antibiotic residue testing performed but withdrawal period compliance not system-enforced.",
        "impact": "Regulatory compliance risk",
        "source": "ENF",
        "category": "Quality Management"
      }
    ],
    "ENF-QM-05": [
      {
        "id": "ENF-Q13",
        "topic": "Returns quality decision manual",
        "type": "process",
        "risk": "medium",
        "details": "Returns classified as good (reprocess) or bad (rendering) based on quality lot decision, but routing is manual.",
        "impact": "Processing delays; inconsistent handling",
        "source": "ENF",
        "category": "Quality Management"
      },
      {
        "id": "ENF-Q14",
        "topic": "No defect pattern analysis",
        "type": "process",
        "risk": "high",
        "details": "Returns defects not systematically analyzed for patterns. Cannot identify systemic quality issues.",
        "impact": "Recurring issues not addressed",
        "source": "ENF",
        "category": "Quality Management"
      }
    ],
    "ENF-QM-06": [
      {
        "id": "ENF-Q15",
        "topic": "Batch genealogy incomplete",
        "type": "compliance",
        "risk": "high",
        "details": "Cannot trace finished product back to input materials (eggs, DOCs, feed) or forward to all affected shipments.",
        "impact": "Full recall required vs. targeted",
        "source": "ENF",
        "category": "Quality Management"
      },
      {
        "id": "ENF-Q16",
        "topic": "Mock recall never tested",
        "type": "compliance",
        "risk": "high",
        "details": "No documented mock recall exercise performed. Actual recall capability and timing unknown until crisis.",
        "impact": "Will fail during real recall",
        "source": "ENF",
        "category": "Quality Management"
      },
      {
        "id": "ENF-Q17",
        "topic": "Farm-to-fork traceability broken",
        "type": "compliance",
        "risk": "high",
        "details": "Mixing of sources at multiple stages breaks traceability chain. Cannot demonstrate end-to-end traceability for audit.",
        "impact": "Regulatory license risk; audit failure",
        "source": "ENF",
        "category": "Quality Management"
      }
    ],
    "ENF-FI-01": [
      {
        "id": "ENF-F01",
        "topic": "Biological asset accounting in Excel",
        "type": "compliance",
        "risk": "high",
        "details": "Breeding flock capitalization and amortization calculated in Excel. IAS 41 compliance manual, not SAP-integrated.",
        "impact": "Audit risk; financial misstatement",
        "source": "ENF",
        "category": "Finance & Controlling"
      },
      {
        "id": "ENF-F02",
        "topic": "No daily fair value adjustment",
        "type": "compliance",
        "risk": "high",
        "details": "Growing birds not valued daily per IAS 41. Millions in inventory not properly valued until cycle end.",
        "impact": "Balance sheet understatement",
        "source": "ENF",
        "category": "Finance & Controlling"
      },
      {
        "id": "ENF-F03",
        "topic": "24-65 week amortization via JV",
        "type": "process",
        "risk": "high",
        "details": "Breeding stock amortized weeks 25-65 via manual journal vouchers. Not connected to production orders or COGS.",
        "impact": "Amortization not in product cost",
        "source": "ENF",
        "category": "Finance & Controlling"
      }
    ],
    "ENF-FI-02": [
      {
        "id": "ENF-F04",
        "topic": "Amortization calculated in Excel",
        "type": "process",
        "risk": "high",
        "details": "All biological asset amortization calculated outside SAP. Manual posting creates control weakness.",
        "impact": "Calculation errors; audit concerns",
        "source": "ENF",
        "category": "Finance & Controlling"
      },
      {
        "id": "ENF-F05",
        "topic": "Amortization not in COGS",
        "type": "process",
        "risk": "high",
        "details": "Biological asset amortization not allocated to products. COGS incomplete, margin analysis distorted.",
        "impact": "Product profitability unknown",
        "source": "ENF",
        "category": "Finance & Controlling"
      },
      {
        "id": "ENF-F06",
        "topic": "JV posting audit trail weak",
        "type": "compliance",
        "risk": "medium",
        "details": "Journal voucher postings for amortization lack supporting documentation linkage in SAP.",
        "impact": "Audit queries; reconciliation effort",
        "source": "ENF",
        "category": "Finance & Controlling"
      }
    ],
    "ENF-FI-03": [
      {
        "id": "ENF-F07",
        "topic": "Period costing only",
        "type": "process",
        "risk": "high",
        "details": "Costs accumulated at period level, not production order level. No standard cost variance analysis.",
        "impact": "Cannot identify cost variances by batch",
        "source": "ENF",
        "category": "Finance & Controlling"
      },
      {
        "id": "ENF-F08",
        "topic": "No production order settlement",
        "type": "process",
        "risk": "high",
        "details": "Production orders not settled with variance analysis. Standard vs. actual never compared systematically.",
        "impact": "Inefficiencies hidden; costs not controlled",
        "source": "ENF",
        "category": "Finance & Controlling"
      },
      {
        "id": "ENF-F09",
        "topic": "WIP valuation at accumulated cost",
        "type": "process",
        "risk": "high",
        "details": "Work-in-progress valued at accumulated cost only. No periodic revaluation or standard cost comparison.",
        "impact": "WIP valuation inaccurate",
        "source": "ENF",
        "category": "Finance & Controlling"
      }
    ],
    "ENF-FI-04": [
      {
        "id": "ENF-F10",
        "topic": "Labor charged to P&L only",
        "type": "process",
        "risk": "high",
        "details": "All labor cost charged directly to P&L. Not allocated to production orders or products.",
        "impact": "Labor not in product cost; margin wrong",
        "source": "ENF",
        "category": "Finance & Controlling"
      },
      {
        "id": "ENF-F11",
        "topic": "No activity-based costing",
        "type": "process",
        "risk": "high",
        "details": "No cost center absorption or activity rates. Direct costs only partially captured in product cost.",
        "impact": "True product cost unknown",
        "source": "ENF",
        "category": "Finance & Controlling"
      }
    ],
    "ENF-FI-05": [
      {
        "id": "ENF-F12",
        "topic": "COGS excludes amortization",
        "type": "process",
        "risk": "high",
        "details": "Cost of Goods Sold does not include biological asset amortization. Gross margin overstated.",
        "impact": "Financial statements misleading",
        "source": "ENF",
        "category": "Finance & Controlling"
      },
      {
        "id": "ENF-F13",
        "topic": "COGS excludes labor",
        "type": "process",
        "risk": "high",
        "details": "Direct labor not included in COGS. Product margins appear higher than reality.",
        "impact": "Wrong pricing decisions based on margins",
        "source": "ENF",
        "category": "Finance & Controlling"
      },
      {
        "id": "ENF-F14",
        "topic": "CO-PA profitability incomplete",
        "type": "process",
        "risk": "high",
        "details": "Profitability analysis in CO-PA missing amortization and labor. Reported profitability unreliable.",
        "impact": "Management decisions on wrong data",
        "source": "ENF",
        "category": "Finance & Controlling"
      }
    ],
    "ENF-FI-06": [
      {
        "id": "ENF-F15",
        "topic": "No route-level profitability",
        "type": "process",
        "risk": "high",
        "details": "32 van routes operated but route-level profitability not tracked in SAP CO-PA.",
        "impact": "Unprofitable routes continue operating",
        "source": "ENF",
        "category": "Finance & Controlling"
      },
      {
        "id": "ENF-F16",
        "topic": "No customer profitability",
        "type": "process",
        "risk": "high",
        "details": "Customer-level profitability not analyzed. Cannot identify profitable vs. loss-making customers.",
        "impact": "Subsidizing unprofitable customers",
        "source": "ENF",
        "category": "Finance & Controlling"
      },
      {
        "id": "ENF-F17",
        "topic": "Weekly manual analysis only",
        "type": "process",
        "risk": "medium",
        "details": "Profitability analysis done weekly in external reports. No real-time dashboards or SAP analytics.",
        "impact": "Delayed insights; slow corrective action",
        "source": "ENF",
        "category": "Finance & Controlling"
      }
    ],
    "GF-SD-01": [
      {
        "id": "GF-S01",
        "topic": "Intercompany sales dominant",
        "type": "process",
        "risk": "medium",
        "details": "Primarily intercompany sales to ENF (chicken feed). External cattle feed sales minimal. Limited market diversification.",
        "impact": "Dependency on single internal customer",
        "source": "GF",
        "category": "Sales & Distribution"
      },
      {
        "id": "GF-S02",
        "topic": "Sales handled by finance team",
        "type": "process",
        "risk": "medium",
        "details": "Sales handled by finance team due to low external volumes. No dedicated sales function for market development.",
        "impact": "Limited sales growth capability",
        "source": "GF",
        "category": "Sales & Distribution"
      },
      {
        "id": "GF-S03",
        "topic": "Walk-in customers simplified process",
        "type": "process",
        "risk": "high",
        "details": "Walk-in customers processed with simplified procedures. Credit checks and pricing controls may be bypassed.",
        "impact": "Revenue leakage; credit risk",
        "source": "GF",
        "category": "Sales & Distribution"
      }
    ],
    "GF-SD-02": [
      {
        "id": "GF-S04",
        "topic": "Custom gate pass program",
        "type": "process",
        "risk": "medium",
        "details": "Custom program creates gate pass which auto-generates sales order. Non-standard SAP process.",
        "impact": "Customization maintenance risk",
        "source": "GF",
        "category": "Sales & Distribution"
      },
      {
        "id": "GF-S05",
        "topic": "Gate pass as primary sales trigger",
        "type": "process",
        "risk": "high",
        "details": "Sales order created from gate pass rather than proper sales process. Order management bypassed.",
        "impact": "Sales controls weakened",
        "source": "GF",
        "category": "Sales & Distribution"
      }
    ],
    "GF-SD-03": [
      {
        "id": "GF-S06",
        "topic": "No formal contracts with ENF",
        "type": "process",
        "risk": "high",
        "details": "Intercompany feed supply without formal contracts or scheduling agreements. Fixed transfer pricing maintained manually.",
        "impact": "No demand commitment; planning uncertainty",
        "source": "GF",
        "category": "Sales & Distribution"
      },
      {
        "id": "GF-S07",
        "topic": "Fixed transfer pricing manual",
        "type": "process",
        "risk": "high",
        "details": "Transfer prices maintained manually with margin. No automatic price updates or cost-plus calculation.",
        "impact": "Transfer pricing compliance risk",
        "source": "GF",
        "category": "Sales & Distribution"
      },
      {
        "id": "GF-S08",
        "topic": "No scheduling agreements",
        "type": "process",
        "risk": "medium",
        "details": "Regular ENF supply without SAP scheduling agreements. Each delivery processed as individual order.",
        "impact": "Order processing overhead",
        "source": "GF",
        "category": "Sales & Distribution"
      }
    ],
    "GF-SD-04": [
      {
        "id": "GF-S09",
        "topic": "Direct delivery to farms",
        "type": "process",
        "risk": "medium",
        "details": "Feed delivered directly to ENF farms via bulk tankers, bypassing GF stores. No intermediate inventory.",
        "impact": "Limited delivery flexibility",
        "source": "GF",
        "category": "Sales & Distribution"
      },
      {
        "id": "GF-S10",
        "topic": "No delivery verification at farm",
        "type": "process",
        "risk": "high",
        "details": "Bulk delivery to silos without measurement verification at farm. Quantity delivered cannot be confirmed.",
        "impact": "Delivery disputes; quantity variance",
        "source": "GF",
        "category": "Sales & Distribution"
      },
      {
        "id": "GF-S11",
        "topic": "Tanker minimum delivery constraints",
        "type": "process",
        "risk": "high",
        "details": "Tanker capacity 32.5 tons, minimum delivery 24-28 tons. Cannot deliver small quantities efficiently.",
        "impact": "Excess feed at farms; waste",
        "source": "GF",
        "category": "Sales & Distribution"
      }
    ],
    "GF-SD-05": [
      {
        "id": "GF-S12",
        "topic": "80% through co-packers without contracts",
        "type": "process",
        "risk": "high",
        "details": "80% of processed products through co-packers. Previously no binding contracts - produced based on forecasts.",
        "impact": "Production without confirmed orders",
        "source": "GF",
        "category": "Sales & Distribution"
      },
      {
        "id": "GF-S13",
        "topic": "Co-packer inventory at GF risk",
        "type": "process",
        "risk": "high",
        "details": "Co-packer inventory stored at GF facilities at GF cost. 9-10 containers stored externally, paid by GF.",
        "impact": "Working capital locked; storage cost",
        "source": "GF",
        "category": "Sales & Distribution"
      },
      {
        "id": "GF-S14",
        "topic": "No advance payments from co-packers",
        "type": "process",
        "risk": "high",
        "details": "No advance payment practice for co-packer production. GF funds production with no security.",
        "impact": "Cash flow risk; bad debt exposure",
        "source": "GF",
        "category": "Sales & Distribution"
      },
      {
        "id": "GF-S15",
        "topic": "Export without LC or contract",
        "type": "process",
        "risk": "medium",
        "details": "Export sales on 60-day credit with no contracts or LC. Container sat 2.5 months in storage.",
        "impact": "Export receivable risk",
        "source": "GF",
        "category": "Sales & Distribution"
      }
    ],
    "GF-MM-01": [
      {
        "id": "GF-M01",
        "topic": "Import procurement 95% frozen meat",
        "type": "process",
        "risk": "medium",
        "details": "95% imports are frozen meat from Brazil and China. Lead times and container logistics managed manually.",
        "impact": "Supply chain visibility limited",
        "source": "GF",
        "category": "Materials Management"
      },
      {
        "id": "GF-M02",
        "topic": "Import documentation manual",
        "type": "process",
        "risk": "medium",
        "details": "Import documentation and LC management outside integrated process. Customs clearance coordination manual.",
        "impact": "Import delays; compliance risk",
        "source": "GF",
        "category": "Materials Management"
      },
      {
        "id": "GF-M03",
        "topic": "No supplier diversification strategy",
        "type": "process",
        "risk": "high",
        "details": "Limited supplier diversification for key raw materials. Concentration risk on few sources.",
        "impact": "Supply disruption risk",
        "source": "GF",
        "category": "Materials Management"
      }
    ],
    "GF-MM-02": [
      {
        "id": "GF-M04",
        "topic": "No MRP in SAP",
        "type": "process",
        "risk": "high",
        "details": "MRP does not run in SAP. Excel-based planning generates requirements manually.",
        "impact": "Planning inefficiency; errors",
        "source": "GF",
        "category": "Materials Management"
      },
      {
        "id": "GF-M05",
        "topic": "Excel-based MRP planning",
        "type": "process",
        "risk": "high",
        "details": "Material requirements calculated in Excel spreadsheets. No integration with SAP master data or demand.",
        "impact": "Manual errors; no automation",
        "source": "GF",
        "category": "Materials Management"
      },
      {
        "id": "GF-M06",
        "topic": "1-month planning horizon only",
        "type": "process",
        "risk": "high",
        "details": "Currently 1-month planning in Excel. Working toward 6-month but not yet implemented.",
        "impact": "No visibility beyond 1 month",
        "source": "GF",
        "category": "Materials Management"
      }
    ],
    "GF-MM-03": [
      {
        "id": "GF-M07",
        "topic": "Manual PR creation",
        "type": "process",
        "risk": "medium",
        "details": "PR created manually based on daily monitoring. No automatic generation from MRP or reorder points.",
        "impact": "Reactive procurement",
        "source": "GF",
        "category": "Materials Management"
      },
      {
        "id": "GF-M08",
        "topic": "Ad-hoc procurement timing",
        "type": "process",
        "risk": "high",
        "details": "PRs raised during month as needed based on monitoring. No systematic planning cycle.",
        "impact": "Rush orders; premium pricing",
        "source": "GF",
        "category": "Materials Management"
      }
    ],
    "GF-MM-04": [
      {
        "id": "GF-M09",
        "topic": "No commodity hedging",
        "type": "process",
        "risk": "high",
        "details": "No hedging concept in place for feed ingredients. Fully exposed to commodity price volatility.",
        "impact": "Margin erosion from price spikes",
        "source": "GF",
        "category": "Materials Management"
      },
      {
        "id": "GF-M10",
        "topic": "No fixed-price contracts",
        "type": "process",
        "risk": "high",
        "details": "No fixed-price supplier contracts or futures/options for key commodities like corn and soybean.",
        "impact": "Unpredictable input costs",
        "source": "GF",
        "category": "Materials Management"
      },
      {
        "id": "GF-M11",
        "topic": "No price escalation clauses",
        "type": "process",
        "risk": "high",
        "details": "Customer contracts do not include price escalation clauses to pass through commodity increases.",
        "impact": "Margin squeeze in volatile markets",
        "source": "GF",
        "category": "Materials Management"
      }
    ],
    "GF-MM-05": [
      {
        "id": "GF-M12",
        "topic": "Spare parts storage only",
        "type": "process",
        "risk": "medium",
        "details": "Central warehouse predominantly for spare parts (less than 3M value). Feed not stored - direct delivery.",
        "impact": "No buffer stock capability",
        "source": "GF",
        "category": "Materials Management"
      },
      {
        "id": "GF-M13",
        "topic": "Bulk vs bag control trade-off",
        "type": "process",
        "risk": "high",
        "details": "Currently bulk tanker only. Bags would enable better control but GF chose bulk despite control issues.",
        "impact": "Measurement and control gaps",
        "source": "GF",
        "category": "Materials Management"
      }
    ],
    "GF-PP-01": [
      {
        "id": "GF-P01",
        "topic": "External formulation software",
        "type": "integration",
        "risk": "high",
        "details": "Feed formulation done in external software. Integration with SAP unclear. Recipe management outside SAP.",
        "impact": "BOM and costing disconnected",
        "source": "GF",
        "category": "Production Planning"
      },
      {
        "id": "GF-P02",
        "topic": "Recipe changes for ENF requirements",
        "type": "process",
        "risk": "medium",
        "details": "New recipes created based on ENF requirements after quality issues. Formulation changes manual.",
        "impact": "Recipe version control risk",
        "source": "GF",
        "category": "Production Planning"
      },
      {
        "id": "GF-P03",
        "topic": "No nutritional optimization in SAP",
        "type": "process",
        "risk": "high",
        "details": "Nutritional balancing and cost optimization done outside SAP. Cannot optimize formulation in real-time.",
        "impact": "Suboptimal feed cost",
        "source": "GF",
        "category": "Production Planning"
      }
    ],
    "GF-PP-02": [
      {
        "id": "GF-P04",
        "topic": "Multiple feed types managed manually",
        "type": "process",
        "risk": "medium",
        "details": "Pre-starter, Starter, Grower, Finisher - different formulations per growth stage managed manually.",
        "impact": "Stage switchover errors possible",
        "source": "GF",
        "category": "Production Planning"
      },
      {
        "id": "GF-P05",
        "topic": "No automatic stage switchover",
        "type": "process",
        "risk": "high",
        "details": "Feed type changes between growth stages not triggered automatically. Manual coordination with farms.",
        "impact": "Wrong feed to wrong stage",
        "source": "GF",
        "category": "Production Planning"
      }
    ],
    "GF-PP-03": [
      {
        "id": "GF-P06",
        "topic": "No integration with ENF demand",
        "type": "integration",
        "risk": "high",
        "details": "No integrated planning with ENF demand. Farm capacity drives production, not sales forecast.",
        "impact": "Production-demand mismatch",
        "source": "GF",
        "category": "Production Planning"
      },
      {
        "id": "GF-P07",
        "topic": "No S&OP process",
        "type": "process",
        "risk": "high",
        "details": "Complete absence of S&OP across GF-ENF-Liwa/Salwa. No demand planning or capacity reconciliation.",
        "impact": "Capacity utilization 35-60%",
        "source": "GF",
        "category": "Production Planning"
      },
      {
        "id": "GF-P08",
        "topic": "Low capacity utilization",
        "type": "process",
        "risk": "high",
        "details": "Capacity utilization 35-60% due to lack of confirmed orders. Production reduced pending contracts.",
        "impact": "Fixed cost absorption issues",
        "source": "GF",
        "category": "Production Planning"
      }
    ],
    "GF-PP-04": [
      {
        "id": "GF-P09",
        "topic": "Bulk delivery without measurement",
        "type": "process",
        "risk": "high",
        "details": "Bulk tanker delivery directly to farm silos. Central weighbridge only - no measurement at farm silos.",
        "impact": "Cannot verify delivery quantity",
        "source": "GF",
        "category": "Production Planning"
      },
      {
        "id": "GF-P10",
        "topic": "No silo-level sensors",
        "type": "integration",
        "risk": "high",
        "details": "No measurement in silos. Manual estimation using stick and thread method only.",
        "impact": "Feed inventory unknown at farm",
        "source": "GF",
        "category": "Production Planning"
      },
      {
        "id": "GF-P11",
        "topic": "Tanker capacity constraints",
        "type": "process",
        "risk": "high",
        "details": "Tanker capacity 32.5 tons, minimum delivery 24-28 tons. Cannot deliver precise quantities needed.",
        "impact": "Forced overdelivery to farms",
        "source": "GF",
        "category": "Production Planning"
      }
    ],
    "GF-PP-05": [
      {
        "id": "GF-P12",
        "topic": "No consumption tracking per house",
        "type": "process",
        "risk": "high",
        "details": "No measurement of actual consumption per house or flock. Consumption estimated, not measured.",
        "impact": "Cannot calculate actual FCR",
        "source": "GF",
        "category": "Production Planning"
      },
      {
        "id": "GF-P13",
        "topic": "Cannot correlate FCR to feed",
        "type": "process",
        "risk": "high",
        "details": "Major control gap - cannot determine feed quality performance by vendor due to no measurement.",
        "impact": "FCR improvement impossible to track",
        "source": "GF",
        "category": "Production Planning"
      },
      {
        "id": "GF-P14",
        "topic": "Feed quality impact unknown",
        "type": "process",
        "risk": "high",
        "details": "If feed quality is good or bad, cannot identify it because there is no control in the feed itself.",
        "impact": "Vendor performance unmeasurable",
        "source": "GF",
        "category": "Production Planning"
      }
    ],
    "GF-PP-06": [
      {
        "id": "GF-P15",
        "topic": "Cannot transfer excess feed",
        "type": "process",
        "risk": "high",
        "details": "If excess feed delivered to farm, cannot transfer to another farm or house. Excess disposed as waste.",
        "impact": "Feed waste; cost leakage",
        "source": "GF",
        "category": "Production Planning"
      },
      {
        "id": "GF-P16",
        "topic": "Excess becomes manure",
        "type": "process",
        "risk": "high",
        "details": "Overdelivered feed that cannot be used becomes waste/manure. Direct cost loss.",
        "impact": "Estimated 5% feed leakage",
        "source": "GF",
        "category": "Production Planning"
      },
      {
        "id": "GF-P17",
        "topic": "No returnable feed policy",
        "type": "process",
        "risk": "high",
        "details": "No mechanism to return unused feed or credit for overdelivery. All risk on receiving farm.",
        "impact": "No incentive to minimize waste",
        "source": "GF",
        "category": "Production Planning"
      }
    ],
    "GF-QM-01": [
      {
        "id": "GF-Q01",
        "topic": "Quality issues stopped ENF supply",
        "type": "compliance",
        "risk": "high",
        "details": "Recent quality problems caused supply stoppage to ENF. Now implementing new recipes with quality focus.",
        "impact": "Lost internal customer confidence",
        "source": "GF",
        "category": "Quality Management"
      },
      {
        "id": "GF-Q02",
        "topic": "New recipes being implemented",
        "type": "process",
        "risk": "medium",
        "details": "New recipe created per ENF requirements after quality failure. Testing regimen being established.",
        "impact": "Recipe transition risk",
        "source": "GF",
        "category": "Quality Management"
      },
      {
        "id": "GF-Q03",
        "topic": "No SAP QM integration",
        "type": "integration",
        "risk": "high",
        "details": "Quality testing not integrated with SAP QM. Raw material, in-process, and finished goods testing manual.",
        "impact": "Quality records not in system",
        "source": "GF",
        "category": "Quality Management"
      }
    ],
    "GF-QM-02": [
      {
        "id": "GF-Q04",
        "topic": "FCR 1.7-1.8 vs benchmark 1.4",
        "type": "process",
        "risk": "high",
        "details": "Current FCR 1.7-1.8 versus industry benchmark of 1.4. Gap of 0.3-0.4 represents significant cost.",
        "impact": "1.5-2.0 million AED annual loss",
        "source": "GF",
        "category": "Quality Management"
      },
      {
        "id": "GF-Q05",
        "topic": "FCR trial planned on 2-3 farms",
        "type": "process",
        "risk": "high",
        "details": "Planning to trial new feed on 2-3 farms and measure FCR. Performance-based qualification not yet done.",
        "impact": "Feed performance unvalidated",
        "source": "GF",
        "category": "Quality Management"
      },
      {
        "id": "GF-Q06",
        "topic": "Cannot validate FCR improvement",
        "type": "process",
        "risk": "high",
        "details": "Even with new recipes, cannot validate FCR improvement due to measurement and control gaps.",
        "impact": "Improvement efforts unmeasurable",
        "source": "GF",
        "category": "Quality Management"
      }
    ],
    "GF-QM-03": [
      {
        "id": "GF-Q07",
        "topic": "Cannot track FCR by vendor",
        "type": "process",
        "risk": "high",
        "details": "Attempting to track FCR by feed source/vendor but cannot validate due to control gaps.",
        "impact": "Vendor performance unknown",
        "source": "GF",
        "category": "Quality Management"
      },
      {
        "id": "GF-Q08",
        "topic": "No supplier scorecards",
        "type": "process",
        "risk": "high",
        "details": "Vendor quality monitoring attempted but no formal scorecards or quality agreements in place.",
        "impact": "No vendor accountability",
        "source": "GF",
        "category": "Quality Management"
      },
      {
        "id": "GF-Q09",
        "topic": "Quality-cost correlation impossible",
        "type": "process",
        "risk": "medium",
        "details": "Cannot correlate feed quality with cost or performance. Buying same from all suppliers.",
        "impact": "No value-based sourcing",
        "source": "GF",
        "category": "Quality Management"
      }
    ],
    "GF-QM-04": [
      {
        "id": "GF-Q10",
        "topic": "New nutritional specs developed",
        "type": "process",
        "risk": "medium",
        "details": "New specifications developed for ENF requirements. Testing regimen being established with lab team.",
        "impact": "Specs not yet proven in production",
        "source": "GF",
        "category": "Quality Management"
      },
      {
        "id": "GF-Q11",
        "topic": "No certificate of analysis tracking",
        "type": "compliance",
        "risk": "high",
        "details": "Certificate of analysis for raw materials and finished feed not systematically tracked in SAP.",
        "impact": "Compliance documentation gaps",
        "source": "GF",
        "category": "Quality Management"
      }
    ],
    "GF-FI-01": [
      {
        "id": "GF-F01",
        "topic": "Fixed transfer pricing with margin",
        "type": "process",
        "risk": "medium",
        "details": "Fixed transfer prices to ENF with margin. Separate budgets for each entity. Manual price maintenance.",
        "impact": "Transfer pricing compliance risk",
        "source": "GF",
        "category": "Finance & Controlling"
      },
      {
        "id": "GF-F02",
        "topic": "No automatic price updates",
        "type": "process",
        "risk": "medium",
        "details": "Transfer prices not automatically updated based on cost changes. Manual review and adjustment.",
        "impact": "Margin may not reflect actual cost",
        "source": "GF",
        "category": "Finance & Controlling"
      },
      {
        "id": "GF-F03",
        "topic": "No arm's length documentation",
        "type": "compliance",
        "risk": "high",
        "details": "Transfer pricing documentation for arm's length compliance not maintained systematically.",
        "impact": "Tax audit risk",
        "source": "GF",
        "category": "Finance & Controlling"
      }
    ],
    "GF-FI-02": [
      {
        "id": "GF-F04",
        "topic": "Elimination at division level",
        "type": "process",
        "risk": "medium",
        "details": "Intercompany elimination at poultry division level. Single finance team manages ENF, GF, Liwa/Salwa.",
        "impact": "Consolidation complexity",
        "source": "GF",
        "category": "Finance & Controlling"
      },
      {
        "id": "GF-F05",
        "topic": "Manual intercompany reconciliation",
        "type": "process",
        "risk": "high",
        "details": "Intercompany balances reconciled manually. No automatic matching or elimination in SAP.",
        "impact": "Reconciliation errors; audit issues",
        "source": "GF",
        "category": "Finance & Controlling"
      }
    ],
    "GF-FI-03": [
      {
        "id": "GF-F06",
        "topic": "Standard costing methodology",
        "type": "process",
        "risk": "medium",
        "details": "Standard costing used but feed cost represents 95-98% of chicken cost. Variance analysis limited.",
        "impact": "Cost accuracy depends on standards",
        "source": "GF",
        "category": "Finance & Controlling"
      },
      {
        "id": "GF-F07",
        "topic": "Feed cost 95-98% of chicken cost",
        "type": "process",
        "risk": "high",
        "details": "Feed represents nearly all of chicken production cost. Any feed efficiency improvement highly impactful.",
        "impact": "Largest cost driver not controlled",
        "source": "GF",
        "category": "Finance & Controlling"
      },
      {
        "id": "GF-F08",
        "topic": "No variance analysis by feed source",
        "type": "process",
        "risk": "high",
        "details": "Cannot analyze cost variance by feed source or quality. Standard cost variance not actionable.",
        "impact": "Cannot identify cost reduction opportunities",
        "source": "GF",
        "category": "Finance & Controlling"
      }
    ],
    "GF-FI-04": [
      {
        "id": "GF-F09",
        "topic": "Limited product profitability",
        "type": "process",
        "risk": "high",
        "details": "Limited visibility into true profitability by product or customer. Commodity business with thin margins.",
        "impact": "Margin management blind",
        "source": "GF",
        "category": "Finance & Controlling"
      },
      {
        "id": "GF-F10",
        "topic": "Thin margins unprotected",
        "type": "process",
        "risk": "high",
        "details": "Margin percentage does not vary more than 5% up or down. No protection against cost increases.",
        "impact": "Margin squeeze in volatile markets",
        "source": "GF",
        "category": "Finance & Controlling"
      },
      {
        "id": "GF-F11",
        "topic": "Budget vs actual disconnect",
        "type": "process",
        "risk": "medium",
        "details": "Plant budgets prepared independently. Disconnect between sales forecast and production planning.",
        "impact": "Budget not achievable",
        "source": "GF",
        "category": "Finance & Controlling"
      }
    ],
    "GF-FI-05": [
      {
        "id": "GF-F12",
        "topic": "0.1 FCR = 0.5M AED impact",
        "type": "process",
        "risk": "high",
        "details": "0.1 FCR improvement equals approximately 0.5 million AED savings. Current 0.3-0.4 gap = 1.5-2.0M opportunity.",
        "impact": "Millions in savings potential",
        "source": "GF",
        "category": "Finance & Controlling"
      },
      {
        "id": "GF-F13",
        "topic": "No FCR-linked costing",
        "type": "process",
        "risk": "high",
        "details": "Feed cost not linked to actual FCR performance. Cannot measure true cost of production by flock.",
        "impact": "Product cost inaccurate",
        "source": "GF",
        "category": "Finance & Controlling"
      },
      {
        "id": "GF-F14",
        "topic": "No performance incentives",
        "type": "process",
        "risk": "high",
        "details": "No FCR-based performance incentives for farm managers or feed operations. No continuous improvement drive.",
        "impact": "No motivation to improve",
        "source": "GF",
        "category": "Finance & Controlling"
      }
    ],
    "ENF-H-01": [
      {
        "id": "ENF-H01",
        "topic": "Single source dependency for hatching eggs",
        "type": "process",
        "risk": "high",
        "details": "Primary source is Al Salwa (Liwa) with secondary open market imports from Oman at only 15-16%. Limited supplier diversification creates supply chain risk.",
        "impact": "Supply disruption risk",
        "source": "ENF",
        "category": "Hatchery Operations"
      },
      {
        "id": "ENF-H02",
        "topic": "No quality-based sourcing protocols",
        "type": "process",
        "risk": "high",
        "details": "Biosecurity protocols not integrated with SAP. Supplier qualification and quality tracking manual.",
        "impact": "Quality risk unmanaged",
        "source": "ENF",
        "category": "Hatchery Operations"
      },
      {
        "id": "ENF-H03",
        "topic": "Intercompany coordination manual",
        "type": "integration",
        "risk": "medium",
        "details": "Coordination with Al Salwa for egg procurement is manual with paper-based delivery notes.",
        "impact": "Inefficient process",
        "source": "ENF",
        "category": "Hatchery Operations"
      }
    ],
    "ENF-H-02": [
      {
        "id": "ENF-H04",
        "topic": "Manual egg grading at receipt",
        "type": "process",
        "risk": "high",
        "details": "Eggs from Salwa graded manually into A (hatchable) and B (reject). No automated grading equipment.",
        "impact": "Grading inconsistency",
        "source": "ENF",
        "category": "Hatchery Operations"
      },
      {
        "id": "ENF-H05",
        "topic": "Recently implementing specifications",
        "type": "process",
        "risk": "high",
        "details": "Formal quality specifications just started one month back. Historical grading was subjective.",
        "impact": "Quality standards new",
        "source": "ENF",
        "category": "Hatchery Operations"
      },
      {
        "id": "ENF-H06",
        "topic": "No SAP incoming inspection lots",
        "type": "integration",
        "risk": "medium",
        "details": "Grading results not recorded in SAP inspection lots. No supplier scorecards integration.",
        "impact": "No quality traceability",
        "source": "ENF",
        "category": "Hatchery Operations"
      }
    ],
    "ENF-H-03": [
      {
        "id": "ENF-H07",
        "topic": "Extended egg storage degrades quality",
        "type": "process",
        "risk": "high",
        "details": "Sometimes eggs stored 20+ days before setting. Optimal storage is 7-8 days. Extended storage reduces hatchability and chick quality.",
        "impact": "Hatchability loss",
        "source": "ENF",
        "category": "Hatchery Operations"
      },
      {
        "id": "ENF-H08",
        "topic": "No FIFO enforcement by receipt date",
        "type": "process",
        "risk": "high",
        "details": "No system-enforced FIFO rotation. Eggs may be set out of sequence leading to quality issues.",
        "impact": "Quality degradation",
        "source": "ENF",
        "category": "Hatchery Operations"
      },
      {
        "id": "ENF-H09",
        "topic": "Temperature monitoring not integrated",
        "type": "process",
        "risk": "high",
        "details": "Storage temperature and humidity not monitored/recorded in SAP. No automatic alerts for deviations.",
        "impact": "Environmental risk",
        "source": "ENF",
        "category": "Hatchery Operations"
      }
    ],
    "ENF-H-04": [
      {
        "id": "ENF-H10",
        "topic": "No SAP MSG incubation management",
        "type": "process",
        "risk": "high",
        "details": "21-day incubation cycle managed manually. No SAP Meat & Fish solution for hatchery operations.",
        "impact": "No system visibility",
        "source": "ENF",
        "category": "Hatchery Operations"
      },
      {
        "id": "ENF-H11",
        "topic": "Setting schedule not optimized",
        "type": "process",
        "risk": "high",
        "details": "Setting every 4 days aligned with Salwa collection but not optimized for hatch capacity utilization.",
        "impact": "Capacity underutilized",
        "source": "ENF",
        "category": "Hatchery Operations"
      },
      {
        "id": "ENF-H12",
        "topic": "Hatch yield tracking manual",
        "type": "process",
        "risk": "medium",
        "details": "~200,000 eggs per setting with yield tracked manually. No batch-level performance analysis.",
        "impact": "No yield optimization",
        "source": "ENF",
        "category": "Hatchery Operations"
      }
    ],
    "ENF-H-05": [
      {
        "id": "ENF-H13",
        "topic": "Historical estimation errors caused oversupply",
        "type": "process",
        "risk": "high",
        "details": "Hatchability estimated at 85-86% but actual was 90-92%. This systematic error caused DOC oversupply to farms.",
        "impact": "Farm capacity issues",
        "source": "ENF",
        "category": "Hatchery Operations"
      },
      {
        "id": "ENF-H14",
        "topic": "No statistical hatchability models",
        "type": "process",
        "risk": "high",
        "details": "No statistical models for hatchability prediction. Estimates based on experience rather than data analysis.",
        "impact": "Planning inaccuracy",
        "source": "ENF",
        "category": "Hatchery Operations"
      },
      {
        "id": "ENF-H15",
        "topic": "No breed-specific tracking",
        "type": "process",
        "risk": "high",
        "details": "Hatchability not tracked by breed or source. Cannot correlate performance to egg supplier.",
        "impact": "Cannot improve sourcing",
        "source": "ENF",
        "category": "Hatchery Operations"
      }
    ],
    "ENF-H-06": [
      {
        "id": "ENF-H16",
        "topic": "Production order costing basic",
        "type": "process",
        "risk": "high",
        "details": "Production order for egg-to-DOC conversion exists but no variance analysis against standard.",
        "impact": "No cost visibility",
        "source": "ENF",
        "category": "Hatchery Operations"
      },
      {
        "id": "ENF-H17",
        "topic": "DOC quality grading not formalized",
        "type": "process",
        "risk": "high",
        "details": "150,000 DOC capacity per cycle but quality grading of output not standardized.",
        "impact": "Quality variation",
        "source": "ENF",
        "category": "Hatchery Operations"
      },
      {
        "id": "ENF-H18",
        "topic": "No hatch yield variance analysis",
        "type": "process",
        "risk": "medium",
        "details": "Hatch yield not analyzed for variance by batch, source, or storage time. Improvement opportunities missed.",
        "impact": "No continuous improvement",
        "source": "ENF",
        "category": "Hatchery Operations"
      }
    ],
    "ENF-F-01": [
      {
        "id": "ENF-F01",
        "topic": "No SAP Livestock Management",
        "type": "process",
        "risk": "high",
        "details": "13 farms with 6 houses each (150K capacity) managed without SAP Livestock Management module.",
        "impact": "No system tracking",
        "source": "ENF",
        "category": "Farm Operations"
      },
      {
        "id": "ENF-F02",
        "topic": "House-level tracking manual only",
        "type": "process",
        "risk": "high",
        "details": "25,000 birds per house but tracking is manual. No flock master data in SAP.",
        "impact": "Visibility gaps",
        "source": "ENF",
        "category": "Farm Operations"
      },
      {
        "id": "ENF-F03",
        "topic": "Capacity optimization not system-driven",
        "type": "process",
        "risk": "high",
        "details": "Farm capacity planning and optimization done manually without system support.",
        "impact": "Inefficient utilization",
        "source": "ENF",
        "category": "Farm Operations"
      }
    ],
    "ENF-F-02": [
      {
        "id": "ENF-F04",
        "topic": "One PO per house stays open 35-42 days",
        "type": "process",
        "risk": "high",
        "details": "Production order opened per house and remains open during entire growing cycle. Limited visibility during cycle.",
        "impact": "In-cycle blind spots",
        "source": "ENF",
        "category": "Farm Operations"
      },
      {
        "id": "ENF-F05",
        "topic": "No flock master data",
        "type": "process",
        "risk": "high",
        "details": "DOCs placed without flock registration. Cannot track by source, placement date, or attributes.",
        "impact": "No traceability",
        "source": "ENF",
        "category": "Farm Operations"
      },
      {
        "id": "ENF-F06",
        "topic": "Placement scheduling manual",
        "type": "process",
        "risk": "medium",
        "details": "DOC placement scheduling coordinated manually between hatchery and farms.",
        "impact": "Coordination gaps",
        "source": "ENF",
        "category": "Farm Operations"
      }
    ],
    "ENF-F-03": [
      {
        "id": "ENF-F07",
        "topic": "No growth curve monitoring",
        "type": "process",
        "risk": "high",
        "details": "35-42 day growing cycle with three feed stages but no growth curve tracking in SAP.",
        "impact": "Performance invisible",
        "source": "ENF",
        "category": "Farm Operations"
      },
      {
        "id": "ENF-F08",
        "topic": "Stage-based management manual",
        "type": "process",
        "risk": "high",
        "details": "Pre-starter, Grower, Finisher feed stages managed manually. No automated stage transitions.",
        "impact": "Feed timing issues",
        "source": "ENF",
        "category": "Farm Operations"
      },
      {
        "id": "ENF-F09",
        "topic": "Performance KPIs tracked externally",
        "type": "process",
        "risk": "medium",
        "details": "Farm performance metrics maintained in Excel or external systems, not integrated with SAP.",
        "impact": "Siloed data",
        "source": "ENF",
        "category": "Farm Operations"
      }
    ],
    "ENF-F-04": [
      {
        "id": "ENF-F10",
        "topic": "CRITICAL: Bulk feed without measurement",
        "type": "process",
        "risk": "high",
        "details": "Feed delivered to silos without measurement at truck or silo. 'There is no measuring either in the truck nor in the silos.'",
        "impact": "FCR unverifiable",
        "source": "ENF",
        "category": "Farm Operations"
      },
      {
        "id": "ENF-F11",
        "topic": "Consumption estimated not tracked",
        "type": "process",
        "risk": "high",
        "details": "Feed consumption per house is estimated, not measured. Cannot verify delivered vs consumed.",
        "impact": "Waste undetected",
        "source": "ENF",
        "category": "Farm Operations"
      },
      {
        "id": "ENF-F12",
        "topic": "Cannot reconcile delivery vs usage",
        "type": "process",
        "risk": "high",
        "details": "No weighbridge at farms and no silo sensors means delivery cannot be reconciled with actual usage.",
        "impact": "Leakage possible",
        "source": "ENF",
        "category": "Farm Operations"
      }
    ],
    "ENF-F-05": [
      {
        "id": "ENF-F13",
        "topic": "FCR 25-30% above benchmark",
        "type": "process",
        "risk": "high",
        "details": "FCR 1.7-1.8 actual vs 1.4 industry benchmark. 0.3-0.4 gap represents millions in potential losses.",
        "impact": "AED millions lost",
        "source": "ENF",
        "category": "Farm Operations"
      },
      {
        "id": "ENF-F14",
        "topic": "No real-time FCR by house",
        "type": "process",
        "risk": "high",
        "details": "Cannot calculate FCR at house level in real-time. Only known after cycle ends.",
        "impact": "Late intervention",
        "source": "ENF",
        "category": "Farm Operations"
      },
      {
        "id": "ENF-F15",
        "topic": "Cannot trace to feed vendor",
        "type": "process",
        "risk": "high",
        "details": "When feed from different sources mixed, cannot correlate FCR performance to vendor.",
        "impact": "No accountability",
        "source": "ENF",
        "category": "Farm Operations"
      }
    ],
    "ENF-F-06": [
      {
        "id": "ENF-F16",
        "topic": "Mortality recorded only at cycle end",
        "type": "process",
        "risk": "high",
        "details": "Mortality recorded as scrap on production order only at cycle completion. No daily tracking.",
        "impact": "Late awareness",
        "source": "ENF",
        "category": "Farm Operations"
      },
      {
        "id": "ENF-F17",
        "topic": "Root cause analysis limited",
        "type": "process",
        "risk": "high",
        "details": "Cannot trace mortality causes to feed source when batches are mixed in same house.",
        "impact": "Cannot prevent recurrence",
        "source": "ENF",
        "category": "Farm Operations"
      },
      {
        "id": "ENF-F18",
        "topic": "DOC mixing loses traceability",
        "type": "process",
        "risk": "high",
        "details": "DOCs from hatchery sometimes supplemented with external. When mixed, traceability completely lost.",
        "impact": "Source unknown",
        "source": "ENF",
        "category": "Farm Operations"
      }
    ],
    "ENF-P-01": [
      {
        "id": "ENF-P01",
        "topic": "Two plants without integrated planning",
        "type": "process",
        "risk": "high",
        "details": "PPE (fresh) and FPPE (frozen) plants operate without integrated planning system.",
        "impact": "Coordination issues",
        "source": "ENF",
        "category": "Processing Plant"
      },
      {
        "id": "ENF-P02",
        "topic": "Line capacity optimization manual",
        "type": "process",
        "risk": "high",
        "details": "Processing line capacity not optimized through system. Manual scheduling and allocation.",
        "impact": "Efficiency loss",
        "source": "ENF",
        "category": "Processing Plant"
      },
      {
        "id": "ENF-P03",
        "topic": "Yield tracking not by line",
        "type": "process",
        "risk": "medium",
        "details": "Yield performance not tracked at individual line level. Cannot identify underperforming lines.",
        "impact": "Improvement blind spots",
        "source": "ENF",
        "category": "Processing Plant"
      }
    ],
    "ENF-P-02": [
      {
        "id": "ENF-P04",
        "topic": "Farm-to-plant coordination manual",
        "type": "process",
        "risk": "high",
        "details": "50-60K birds per day slaughtered but farm-to-plant scheduling is manual coordination.",
        "impact": "Scheduling gaps",
        "source": "ENF",
        "category": "Processing Plant"
      },
      {
        "id": "ENF-P05",
        "topic": "No slaughter planning optimization",
        "type": "process",
        "risk": "high",
        "details": "Daily slaughter volume planned without optimization algorithm. Capacity matching ad-hoc.",
        "impact": "Utilization variance",
        "source": "ENF",
        "category": "Processing Plant"
      },
      {
        "id": "ENF-P06",
        "topic": "Volume forecasting basic",
        "type": "process",
        "risk": "medium",
        "details": "Processing volume forecasting not integrated with sales demand or farm capacity.",
        "impact": "Demand-supply mismatch",
        "source": "ENF",
        "category": "Processing Plant"
      }
    ],
    "ENF-P-03": [
      {
        "id": "ENF-P07",
        "topic": "No SAP MSG integrated chain",
        "type": "process",
        "risk": "high",
        "details": "Five production orders in chain (egg→DOC→broiler→carcass→FG) not using SAP MSG integrated solution.",
        "impact": "No integrated costing",
        "source": "ENF",
        "category": "Processing Plant"
      },
      {
        "id": "ENF-P08",
        "topic": "Disassembly BOM not standard",
        "type": "process",
        "risk": "high",
        "details": "Joint product costing for carcass breakdown uses custom approach, not standard disassembly BOM.",
        "impact": "Costing inaccurate",
        "source": "ENF",
        "category": "Processing Plant"
      },
      {
        "id": "ENF-P09",
        "topic": "Catch-weight not enabled",
        "type": "process",
        "risk": "high",
        "details": "Production order chain does not support catch-weight. Products vary in weight but tracked as pieces.",
        "impact": "Inventory inaccurate",
        "source": "ENF",
        "category": "Processing Plant"
      }
    ],
    "ENF-P-04": [
      {
        "id": "ENF-P10",
        "topic": "No value-based joint product splitting",
        "type": "process",
        "risk": "high",
        "details": "65-70% whole, 30-35% portions but no market value-based splitting for cost allocation.",
        "impact": "Portion cost distorted",
        "source": "ENF",
        "category": "Processing Plant"
      },
      {
        "id": "ENF-P11",
        "topic": "Breast appears artificially cheap",
        "type": "process",
        "risk": "high",
        "details": "Without value-based allocation, breast meat shows artificially low cost while wings show losses.",
        "impact": "Margin analysis wrong",
        "source": "ENF",
        "category": "Processing Plant"
      },
      {
        "id": "ENF-P12",
        "topic": "Split factors not market-linked",
        "type": "process",
        "risk": "high",
        "details": "Joint product cost splitting factors not updated based on market prices. Static allocation.",
        "impact": "Pricing decisions flawed",
        "source": "ENF",
        "category": "Processing Plant"
      }
    ],
    "ENF-P-05": [
      {
        "id": "ENF-P13",
        "topic": "PO created after output known",
        "type": "process",
        "risk": "high",
        "details": "Production order created AFTER processing because exact portion outputs unknown beforehand.",
        "impact": "No forward planning",
        "source": "ENF",
        "category": "Processing Plant"
      },
      {
        "id": "ENF-P14",
        "topic": "Variable SKU sizes unpredictable",
        "type": "process",
        "risk": "high",
        "details": "Portion quantities vary by bird size and quality. Cannot predict exact outputs before processing.",
        "impact": "Inventory planning hard",
        "source": "ENF",
        "category": "Processing Plant"
      },
      {
        "id": "ENF-P15",
        "topic": "Manual output adjustment",
        "type": "process",
        "risk": "high",
        "details": "Production order outputs adjusted manually after actual quantities known. No MSG variable yield.",
        "impact": "Admin overhead",
        "source": "ENF",
        "category": "Processing Plant"
      }
    ],
    "ENF-P-06": [
      {
        "id": "ENF-P16",
        "topic": "No catch-weight management",
        "type": "process",
        "risk": "high",
        "details": "Products sold by piece but vary in weight from 9g to 18g. SAP MSG catch-weight not enabled.",
        "impact": "Revenue leakage",
        "source": "ENF",
        "category": "Processing Plant"
      },
      {
        "id": "ENF-P17",
        "topic": "Weight not tracked in inventory",
        "type": "process",
        "risk": "high",
        "details": "Inventory managed by quantity (pieces) not actual weight. Inventory valuation approximate.",
        "impact": "Inventory value uncertain",
        "source": "ENF",
        "category": "Processing Plant"
      },
      {
        "id": "ENF-P18",
        "topic": "Invoice weight accuracy issues",
        "type": "process",
        "risk": "high",
        "details": "Invoicing based on piece count, not actual weight. Customer may receive more/less than paid.",
        "impact": "Revenue/margin issues",
        "source": "ENF",
        "category": "Processing Plant"
      }
    ],
    "SL-PP-01": [
      {
        "id": "SL-PP01",
        "topic": "100% DOC import from Saudi Arabia",
        "type": "process",
        "risk": "high",
        "details": "Single source country dependency. Competitor Ajman will not sell, limiting alternatives.",
        "impact": "Supply chain risk",
        "source": "SL",
        "category": "Production Planning"
      },
      {
        "id": "SL-PP02",
        "topic": "Capacity-based not demand-driven",
        "type": "process",
        "risk": "high",
        "details": "Full capacity (30,600 DOCs) procured 3 times per year regardless of ENF actual demand.",
        "impact": "Over/under supply",
        "source": "SL",
        "category": "Production Planning"
      },
      {
        "id": "SL-PP03",
        "topic": "No S&OP integration",
        "type": "process",
        "risk": "medium",
        "details": "DOC procurement not linked to ENF hatchery demand planning or division S&OP process.",
        "impact": "Planning disconnect",
        "source": "SL",
        "category": "Production Planning"
      }
    ],
    "SL-PP-02": [
      {
        "id": "SL-PP04",
        "topic": "No SAP Livestock flock tracking",
        "type": "process",
        "risk": "high",
        "details": "0-24 weeks rearing cycle managed without SAP Livestock Management. Manual tracking only.",
        "impact": "No system visibility",
        "source": "SL",
        "category": "Production Planning"
      },
      {
        "id": "SL-PP05",
        "topic": "Growth curve monitoring manual",
        "type": "process",
        "risk": "high",
        "details": "4 rearing houses with growth performance tracked manually, not in SAP.",
        "impact": "Performance gaps",
        "source": "SL",
        "category": "Production Planning"
      },
      {
        "id": "SL-PP06",
        "topic": "No mortality tracking with codes",
        "type": "process",
        "risk": "medium",
        "details": "Mortality during rearing not recorded with reason codes for root cause analysis.",
        "impact": "Cannot improve",
        "source": "SL",
        "category": "Production Planning"
      }
    ],
    "SL-PP-03": [
      {
        "id": "SL-PP07",
        "topic": "No house capacity optimization",
        "type": "process",
        "risk": "high",
        "details": "8 laying houses (2 farms x 4) with ~26K birds but capacity not optimized through system.",
        "impact": "Utilization unknown",
        "source": "SL",
        "category": "Production Planning"
      },
      {
        "id": "SL-PP08",
        "topic": "Flock density management manual",
        "type": "process",
        "risk": "high",
        "details": "Bird density per house managed manually without system-based compliance checks.",
        "impact": "Welfare risk",
        "source": "SL",
        "category": "Production Planning"
      },
      {
        "id": "SL-PP09",
        "topic": "Climate control not integrated",
        "type": "process",
        "risk": "medium",
        "details": "Environmental monitoring not integrated with SAP for alerts and performance correlation.",
        "impact": "Risk monitoring gap",
        "source": "SL",
        "category": "Production Planning"
      }
    ],
    "SL-PP-04": [
      {
        "id": "SL-PP10",
        "topic": "No production curve tracking",
        "type": "process",
        "risk": "high",
        "details": "41 weeks laying cycle (week 25-65) without system-based production curve monitoring.",
        "impact": "Yield optimization lost",
        "source": "SL",
        "category": "Production Planning"
      },
      {
        "id": "SL-PP11",
        "topic": "Peak production management manual",
        "type": "process",
        "risk": "high",
        "details": "Peak egg production period not tracked systematically for capacity planning.",
        "impact": "Planning inaccurate",
        "source": "SL",
        "category": "Production Planning"
      },
      {
        "id": "SL-PP12",
        "topic": "End-of-lay decisions ad-hoc",
        "type": "process",
        "risk": "medium",
        "details": "Decision to cull flocks at 65 weeks not supported by system analysis of economics.",
        "impact": "Timing not optimized",
        "source": "SL",
        "category": "Production Planning"
      }
    ],
    "SL-PP-05": [
      {
        "id": "SL-PP13",
        "topic": "No daily production recording in SAP",
        "type": "process",
        "risk": "high",
        "details": "~52,000 eggs/day at peak but daily production not recorded in SAP for analysis.",
        "impact": "Performance invisible",
        "source": "SL",
        "category": "Production Planning"
      },
      {
        "id": "SL-PP14",
        "topic": "Yield analysis manual",
        "type": "process",
        "risk": "high",
        "details": "Production yield by flock analyzed manually. No automated KPIs or dashboards.",
        "impact": "Slow analysis",
        "source": "SL",
        "category": "Production Planning"
      },
      {
        "id": "SL-PP15",
        "topic": "Flock performance KPIs external",
        "type": "process",
        "risk": "medium",
        "details": "Flock performance metrics maintained in Excel, not integrated with SAP for reporting.",
        "impact": "Siloed data",
        "source": "SL",
        "category": "Production Planning"
      }
    ],
    "SL-PP-06": [
      {
        "id": "SL-PP16",
        "topic": "Paper-based delivery notes",
        "type": "process",
        "risk": "high",
        "details": "Egg collection by ENF every 4 days uses paper delivery notes, not SAP documents.",
        "impact": "No audit trail",
        "source": "SL",
        "category": "Production Planning"
      },
      {
        "id": "SL-PP17",
        "topic": "No real-time visibility for ENF",
        "type": "integration",
        "risk": "high",
        "details": "ENF cannot see Salwa egg inventory in real-time. Manual coordination required.",
        "impact": "Planning difficult",
        "source": "SL",
        "category": "Production Planning"
      },
      {
        "id": "SL-PP18",
        "topic": "Storage optimization manual",
        "type": "process",
        "risk": "high",
        "details": "Eggs stored up to 4 days between collections but storage optimization is manual.",
        "impact": "Quality risk",
        "source": "SL",
        "category": "Production Planning"
      }
    ],
    "SL-QM-01": [
      {
        "id": "SL-QM01",
        "topic": "Manual egg grading process",
        "type": "process",
        "risk": "high",
        "details": "Physical grading of Grade A (≥50g) vs Grade B done manually. No automated equipment.",
        "impact": "Grading inconsistency",
        "source": "SL",
        "category": "Quality Management"
      },
      {
        "id": "SL-QM02",
        "topic": "No multi-parameter quality checks",
        "type": "process",
        "risk": "high",
        "details": "Grading based primarily on weight. Other quality parameters not systematically checked.",
        "impact": "Quality gaps",
        "source": "SL",
        "category": "Quality Management"
      },
      {
        "id": "SL-QM03",
        "topic": "No statistical process control",
        "type": "process",
        "risk": "medium",
        "details": "Grading results not analyzed statistically for process control or improvement.",
        "impact": "No improvement tracking",
        "source": "SL",
        "category": "Quality Management"
      }
    ],
    "SL-QM-02": [
      {
        "id": "SL-QM04",
        "topic": "B-grade reasons not analyzed",
        "type": "process",
        "risk": "high",
        "details": "Undersized, double yolk, defects categorized but root cause analysis not systematic.",
        "impact": "Prevention difficult",
        "source": "SL",
        "category": "Quality Management"
      },
      {
        "id": "SL-QM05",
        "topic": "No flock health correlation",
        "type": "process",
        "risk": "high",
        "details": "B-grade occurrence not correlated to flock age, health, or feed in system.",
        "impact": "Cannot optimize",
        "source": "SL",
        "category": "Quality Management"
      },
      {
        "id": "SL-QM06",
        "topic": "Defect trending manual",
        "type": "process",
        "risk": "medium",
        "details": "Defect patterns over time not tracked systematically for quality improvement.",
        "impact": "Trends missed",
        "source": "SL",
        "category": "Quality Management"
      }
    ],
    "SL-QM-03": [
      {
        "id": "SL-QM07",
        "topic": "Grading done at ENF not source",
        "type": "process",
        "risk": "high",
        "details": "Quality determination happens at ENF hatchery, not at Salwa before shipment.",
        "impact": "Transport of rejects",
        "source": "SL",
        "category": "Quality Management"
      },
      {
        "id": "SL-QM08",
        "topic": "B-grade eggs transported unnecessarily",
        "type": "process",
        "risk": "high",
        "details": "All eggs shipped to ENF then B-grade returned to Salwa books. Inefficient logistics.",
        "impact": "Wasted transport",
        "source": "SL",
        "category": "Quality Management"
      },
      {
        "id": "SL-QM09",
        "topic": "No pre-shipment quality check",
        "type": "process",
        "risk": "high",
        "details": "Salwa ships all eggs without pre-grading. Quality handover not formalized.",
        "impact": "Quality accountability unclear",
        "source": "SL",
        "category": "Quality Management"
      }
    ],
    "SL-QM-04": [
      {
        "id": "SL-QM10",
        "topic": "B-grade sales separate process",
        "type": "process",
        "risk": "medium",
        "details": "B-grade sold as table eggs through separate manual process from intercompany.",
        "impact": "Process overhead",
        "source": "SL",
        "category": "Quality Management"
      },
      {
        "id": "SL-QM11",
        "topic": "No integrated by-product tracking",
        "type": "process",
        "risk": "medium",
        "details": "B-grade egg sales not integrated with main production for total revenue tracking.",
        "impact": "Revenue visibility",
        "source": "SL",
        "category": "Quality Management"
      },
      {
        "id": "SL-QM12",
        "topic": "Pricing optimization manual",
        "type": "process",
        "risk": "medium",
        "details": "B-grade table egg pricing managed manually without market analysis integration.",
        "impact": "Revenue not optimized",
        "source": "SL",
        "category": "Quality Management"
      }
    ],
    "SL-MM-01": [
      {
        "id": "SL-MM01",
        "topic": "Import documentation manual",
        "type": "process",
        "risk": "high",
        "details": "DOC imports from Saudi Arabia with manual documentation. Not integrated with SAP.",
        "impact": "Compliance risk",
        "source": "SL",
        "category": "Materials Management"
      },
      {
        "id": "SL-MM02",
        "topic": "No inbound logistics management",
        "type": "process",
        "risk": "high",
        "details": "DOCs delivered to door without SAP tracking of shipment or customs clearance.",
        "impact": "No visibility",
        "source": "SL",
        "category": "Materials Management"
      },
      {
        "id": "SL-MM03",
        "topic": "Quarantine protocols not in system",
        "type": "process",
        "risk": "medium",
        "details": "Biosecurity quarantine requirements tracked manually, not enforced through SAP.",
        "impact": "Biosecurity risk",
        "source": "SL",
        "category": "Materials Management"
      }
    ],
    "SL-MM-02": [
      {
        "id": "SL-MM04",
        "topic": "Feed subsidy management manual",
        "type": "process",
        "risk": "high",
        "details": "90% subsidized feed via ADS quota tracked in government portal, not SAP.",
        "impact": "Compliance complexity",
        "source": "SL",
        "category": "Materials Management"
      },
      {
        "id": "SL-MM05",
        "topic": "No quota integration in SAP",
        "type": "integration",
        "risk": "high",
        "details": "Government subsidy quota not integrated with SAP procurement for compliance tracking.",
        "impact": "Subsidy risk",
        "source": "SL",
        "category": "Materials Management"
      },
      {
        "id": "SL-MM06",
        "topic": "Feed from GF via ENF",
        "type": "process",
        "risk": "medium",
        "details": "Feed supplied by Greenfields through ENF coordination. Multi-party manual process.",
        "impact": "Complex logistics",
        "source": "SL",
        "category": "Materials Management"
      }
    ],
    "SL-MM-03": [
      {
        "id": "SL-MM07",
        "topic": "Same feed control issues as ENF",
        "type": "process",
        "risk": "high",
        "details": "Bulk tanker to silos without measurement. Same critical gap as ENF farms.",
        "impact": "Consumption unknown",
        "source": "SL",
        "category": "Materials Management"
      },
      {
        "id": "SL-MM08",
        "topic": "No silo-level measurement",
        "type": "process",
        "risk": "high",
        "details": "Feed consumption estimated not measured. Cannot verify delivery vs usage.",
        "impact": "Waste undetected",
        "source": "SL",
        "category": "Materials Management"
      },
      {
        "id": "SL-MM09",
        "topic": "Feed FCR impact unknown",
        "type": "process",
        "risk": "high",
        "details": "Cannot correlate feed consumption to breeder performance for optimization.",
        "impact": "No optimization",
        "source": "SL",
        "category": "Materials Management"
      }
    ],
    "SL-MM-04": [
      {
        "id": "SL-MM10",
        "topic": "Vaccination schedule manual",
        "type": "process",
        "risk": "high",
        "details": "Vaccination program based on bird age managed manually by farm manager and vet.",
        "impact": "Schedule compliance risk",
        "source": "SL",
        "category": "Materials Management"
      },
      {
        "id": "SL-MM11",
        "topic": "Cold chain not system-tracked",
        "type": "process",
        "risk": "high",
        "details": "Vaccine cold chain requirements managed manually. No temperature monitoring integration.",
        "impact": "Efficacy risk",
        "source": "SL",
        "category": "Materials Management"
      },
      {
        "id": "SL-MM12",
        "topic": "Withdrawal period manual tracking",
        "type": "process",
        "risk": "medium",
        "details": "Medication withdrawal periods tracked manually without system enforcement.",
        "impact": "Compliance risk",
        "source": "SL",
        "category": "Materials Management"
      }
    ],
    "SL-MM-05": [
      {
        "id": "SL-MM13",
        "topic": "No daily flock valuation",
        "type": "process",
        "risk": "high",
        "details": "Birds valued through capitalization model but no daily fair value per IAS 41.",
        "impact": "Asset value uncertain",
        "source": "SL",
        "category": "Materials Management"
      },
      {
        "id": "SL-MM14",
        "topic": "Static inventory approach",
        "type": "process",
        "risk": "high",
        "details": "Biological asset inventory static until production order completion.",
        "impact": "Reporting inaccurate",
        "source": "SL",
        "category": "Materials Management"
      },
      {
        "id": "SL-MM15",
        "topic": "No SAP Livestock valuation",
        "type": "process",
        "risk": "high",
        "details": "SAP Livestock Management module not deployed for biological asset valuation.",
        "impact": "Manual workarounds",
        "source": "SL",
        "category": "Materials Management"
      }
    ],
    "SL-FI-01": [
      {
        "id": "SL-FI01",
        "topic": "Manual capitalization calculation",
        "type": "process",
        "risk": "high",
        "details": "24 weeks of rearing costs capitalized but calculation done manually, not automated.",
        "impact": "Calculation errors",
        "source": "SL",
        "category": "Finance & Controlling"
      },
      {
        "id": "SL-FI02",
        "topic": "Overhead allocation manual",
        "type": "process",
        "risk": "high",
        "details": "DOC + feed + vaccination + overhead accumulated manually without activity-based costing.",
        "impact": "Cost accuracy",
        "source": "SL",
        "category": "Finance & Controlling"
      },
      {
        "id": "SL-FI03",
        "topic": "IAS 41 approach attempted",
        "type": "compliance",
        "risk": "medium",
        "details": "Biological asset accounting per IAS 41 attempted but implementation not fully compliant.",
        "impact": "Audit risk",
        "source": "SL",
        "category": "Finance & Controlling"
      }
    ],
    "SL-FI-02": [
      {
        "id": "SL-FI04",
        "topic": "Excel-based amortization",
        "type": "process",
        "risk": "high",
        "details": "Amortization from week 25-65 calculated in Excel then posted via journal vouchers.",
        "impact": "Error prone",
        "source": "SL",
        "category": "Finance & Controlling"
      },
      {
        "id": "SL-FI05",
        "topic": "Not automated in SAP",
        "type": "process",
        "risk": "high",
        "details": "41 weeks of amortization requires manual calculation and posting each period.",
        "impact": "Admin overhead",
        "source": "SL",
        "category": "Finance & Controlling"
      },
      {
        "id": "SL-FI06",
        "topic": "Audit trail fragmented",
        "type": "compliance",
        "risk": "high",
        "details": "Excel calculations separate from SAP postings creates fragmented audit trail.",
        "impact": "Audit complexity",
        "source": "SL",
        "category": "Finance & Controlling"
      }
    ],
    "SL-FI-03": [
      {
        "id": "SL-FI07",
        "topic": "No variance analysis vs standard",
        "type": "process",
        "risk": "high",
        "details": "Two production orders (rearing, laying) accumulate costs but no variance analysis.",
        "impact": "Cost control weak",
        "source": "SL",
        "category": "Finance & Controlling"
      },
      {
        "id": "SL-FI08",
        "topic": "No standard cost comparison",
        "type": "process",
        "risk": "high",
        "details": "Actual costs not compared to standard costs for performance measurement.",
        "impact": "Performance unknown",
        "source": "SL",
        "category": "Finance & Controlling"
      },
      {
        "id": "SL-FI09",
        "topic": "Limited costing visibility",
        "type": "process",
        "risk": "medium",
        "details": "Cost accumulation on production orders without detailed visibility into components.",
        "impact": "Analysis limited",
        "source": "SL",
        "category": "Finance & Controlling"
      }
    ],
    "SL-FI-04": [
      {
        "id": "SL-FI10",
        "topic": "Period costing approach",
        "type": "process",
        "risk": "high",
        "details": "Whatever produced is considered sold. No actual production costing per egg.",
        "impact": "Cost per egg unknown",
        "source": "SL",
        "category": "Finance & Controlling"
      },
      {
        "id": "SL-FI11",
        "topic": "No cost per egg visibility",
        "type": "process",
        "risk": "high",
        "details": "True production cost per egg not calculated. Feed and vaccination allocated broadly.",
        "impact": "Profitability unknown",
        "source": "SL",
        "category": "Finance & Controlling"
      },
      {
        "id": "SL-FI12",
        "topic": "No flock-level costing",
        "type": "process",
        "risk": "medium",
        "details": "Costs not tracked at individual flock level for performance comparison.",
        "impact": "Cannot compare flocks",
        "source": "SL",
        "category": "Finance & Controlling"
      }
    ],
    "SL-FI-05": [
      {
        "id": "SL-FI13",
        "topic": "Fixed transfer price",
        "type": "process",
        "risk": "high",
        "details": "Fixed price for eggs to ENF without regular market-based reviews.",
        "impact": "Margin not optimized",
        "source": "SL",
        "category": "Finance & Controlling"
      },
      {
        "id": "SL-FI14",
        "topic": "Arm's length documentation limited",
        "type": "compliance",
        "risk": "high",
        "details": "Transfer pricing documentation for intercompany eggs may not meet arm's length requirements.",
        "impact": "Tax compliance risk",
        "source": "SL",
        "category": "Finance & Controlling"
      },
      {
        "id": "SL-FI15",
        "topic": "Manual intercompany reconciliation",
        "type": "process",
        "risk": "medium",
        "details": "Intercompany matching between Salwa and ENF done manually each period.",
        "impact": "Reconciliation effort",
        "source": "SL",
        "category": "Finance & Controlling"
      }
    ],
    "SL-SD-01": [
      {
        "id": "SL-SD01",
        "topic": "Single customer dependency",
        "type": "process",
        "risk": "medium",
        "details": "100% of Grade A eggs sold to ENF only. Complete intercompany dependency.",
        "impact": "Concentration risk",
        "source": "SL",
        "category": "Sales & Distribution"
      },
      {
        "id": "SL-SD02",
        "topic": "No scheduling agreements",
        "type": "process",
        "risk": "medium",
        "details": "Intercompany sales without formal scheduling agreements in SAP for planning.",
        "impact": "Planning informal",
        "source": "SL",
        "category": "Sales & Distribution"
      },
      {
        "id": "SL-SD03",
        "topic": "No EDI integration",
        "type": "integration",
        "risk": "medium",
        "details": "Intercompany transactions without electronic data interchange for automation.",
        "impact": "Manual overhead",
        "source": "SL",
        "category": "Sales & Distribution"
      }
    ],
    "SL-SD-02": [
      {
        "id": "SL-SD04",
        "topic": "No formal sales orders",
        "type": "process",
        "risk": "high",
        "details": "Production-driven supply without formal sales orders in SAP. ENF collects what's produced.",
        "impact": "No order tracking",
        "source": "SL",
        "category": "Sales & Distribution"
      },
      {
        "id": "SL-SD05",
        "topic": "Manual delivery notes only",
        "type": "process",
        "risk": "high",
        "details": "Paper-based delivery notes for egg collection. Not from SAP system.",
        "impact": "Audit trail gap",
        "source": "SL",
        "category": "Sales & Distribution"
      },
      {
        "id": "SL-SD06",
        "topic": "No order visibility in system",
        "type": "process",
        "risk": "high",
        "details": "Neither Salwa nor ENF has system visibility into order/delivery status.",
        "impact": "Planning blind",
        "source": "SL",
        "category": "Sales & Distribution"
      }
    ],
    "SL-SD-03": [
      {
        "id": "SL-SD07",
        "topic": "No Incoterms documentation",
        "type": "compliance",
        "risk": "high",
        "details": "ENF truck collects but terms of trade (risk transfer) not formally documented.",
        "impact": "Liability unclear",
        "source": "SL",
        "category": "Sales & Distribution"
      },
      {
        "id": "SL-SD08",
        "topic": "Quality handover not formalized",
        "type": "process",
        "risk": "high",
        "details": "No formal quality acceptance process when ENF collects eggs from Salwa.",
        "impact": "Disputes possible",
        "source": "SL",
        "category": "Sales & Distribution"
      },
      {
        "id": "SL-SD09",
        "topic": "Delivery confirmation manual",
        "type": "process",
        "risk": "medium",
        "details": "Proof of delivery captured manually if at all. No system-based confirmation.",
        "impact": "No delivery audit",
        "source": "SL",
        "category": "Sales & Distribution"
      }
    ],
    "SL-SD-04": [
      {
        "id": "SL-SD10",
        "topic": "Paper delivery notes not from SAP",
        "type": "process",
        "risk": "high",
        "details": "Delivery documentation is manual paperwork. 'Delivery note... it's just paperwork. It's not from SAP.'",
        "impact": "No system record",
        "source": "SL",
        "category": "Sales & Distribution"
      },
      {
        "id": "SL-SD11",
        "topic": "No batch traceability",
        "type": "process",
        "risk": "high",
        "details": "Eggs transferred without batch-level traceability in SAP from flock to hatchery.",
        "impact": "Recall impossible",
        "source": "SL",
        "category": "Sales & Distribution"
      },
      {
        "id": "SL-SD12",
        "topic": "Audit trail gaps",
        "type": "compliance",
        "risk": "high",
        "details": "Intercompany transfers lack proper SAP documentation for audit compliance.",
        "impact": "Audit findings",
        "source": "SL",
        "category": "Sales & Distribution"
      }
    ],
    "SL-SD-05": [
      {
        "id": "SL-SD13",
        "topic": "Invoice after grading at ENF",
        "type": "process",
        "risk": "high",
        "details": "Salwa invoices ENF only after grading complete. Timing delay in revenue recognition.",
        "impact": "Revenue timing",
        "source": "SL",
        "category": "Sales & Distribution"
      },
      {
        "id": "SL-SD14",
        "topic": "Manual invoicing process",
        "type": "process",
        "risk": "high",
        "details": "Invoice created manually based on graded quantities communicated from ENF.",
        "impact": "Admin overhead",
        "source": "SL",
        "category": "Sales & Distribution"
      },
      {
        "id": "SL-SD15",
        "topic": "Intercompany matching manual",
        "type": "process",
        "risk": "medium",
        "details": "Matching of Salwa invoices to ENF receipts done manually each period.",
        "impact": "Reconciliation effort",
        "source": "SL",
        "category": "Sales & Distribution"
      }
    ],
    "SL-SD-06": [
      {
        "id": "SL-SD16",
        "topic": "B-grade sales separate channel",
        "type": "process",
        "risk": "medium",
        "details": "Table eggs sold externally through manual process separate from intercompany.",
        "impact": "Process complexity",
        "source": "SL",
        "category": "Sales & Distribution"
      },
      {
        "id": "SL-SD17",
        "topic": "Pricing management basic",
        "type": "process",
        "risk": "medium",
        "details": "External customer pricing for B-grade eggs managed manually without optimization.",
        "impact": "Revenue not optimized",
        "source": "SL",
        "category": "Sales & Distribution"
      },
      {
        "id": "SL-SD18",
        "topic": "No credit management for external",
        "type": "process",
        "risk": "medium",
        "details": "Small external customer base for table eggs without formal credit management.",
        "impact": "Collection risk",
        "source": "SL",
        "category": "Sales & Distribution"
      }
    ]
  },
  "criticalFindings": [
    {
      "id": "EX-001",
      "topic": "FOOD SAFETY: Products Reaching Consumers Without Lab Clearance",
      "type": "regulatory",
      "risk": "critical",
      "details": "Dairy and poultry products are being shipped to retailers and consumers BEFORE microbiological test results confirm safety. In a contamination event, this exposes the Group to: (1) UAE Food Safety Law penalties up to AED 5 million per violation, (2) Criminal prosecution of executives under Federal Law No. 10/2015, (3) Mandatory product recall costs estimated at AED 50-100 million, (4) Permanent loss of major retail contracts (Carrefour, Lulu, Spinneys).",
      "source": "ARDC-PP / ENF",
      "category": "Regulatory & Legal",
      "impact": "AED 150M+ exposure",
      "process_ref": "PP-07, PF-13"
    },
    {
      "id": "EX-002",
      "topic": "RECALL FAILURE: Cannot Identify Contaminated Products",
      "type": "regulatory",
      "risk": "critical",
      "details": "Current systems CANNOT trace finished products back to raw material batches or forward to all affected shipments. In a contamination event, the Group would be forced to recall ALL products across ALL categories - an estimated AED 200+ million write-off plus logistics costs. Dubai Municipality and ESMA can suspend operating licenses until traceability is proven. Mock recall has NEVER been tested.",
      "source": "ENF-GF / ARDC",
      "category": "Business Continuity",
      "impact": "License suspension risk",
      "process_ref": "PF-14, PP-06"
    },
    {
      "id": "EX-003",
      "topic": "FINANCIAL MISSTATEMENT: Biological Assets Incorrectly Valued",
      "type": "audit",
      "risk": "critical",
      "details": "Living birds and breeding stock valued using standard cost instead of IAS 41 fair value. External auditors have flagged this in management letters for 3 consecutive years. Risk of QUALIFIED AUDIT OPINION in next annual report, which would: (1) Trigger bank covenant breaches on AED 500M+ facilities, (2) Require restatement of prior years, (3) Damage investor confidence and credit rating.",
      "source": "ENF-GF",
      "category": "Financial Reporting",
      "impact": "Qualified audit opinion",
      "process_ref": "PF-04"
    },
    {
      "id": "EX-004",
      "topic": "REVENUE LEAKAGE: No Controls on Pricing and Credit",
      "type": "financial",
      "risk": "critical",
      "details": "Sales staff can override prices and credit limits without approval. Analysis shows: (1) 23% of invoices issued below approved price list, (2) AED 45 million in receivables from customers exceeding credit limits, (3) Bad debt write-offs increased 340% year-over-year. Estimated annual revenue leakage: AED 15-20 million.",
      "source": "ARDC-SD",
      "category": "Revenue Protection",
      "impact": "AED 20M annual loss",
      "process_ref": "SD-02, SD-09, SD-10"
    },
    {
      "id": "EX-005",
      "topic": "MARGIN DESTRUCTION: Production Ignoring Demand",
      "type": "strategic",
      "risk": "critical",
      "details": "Farms produce at 100% capacity regardless of sales forecasts. Result: 30-40% of poultry production sold at distressed prices to traders. Fresh product converted to frozen at 60% margin loss. Estimated margin erosion: AED 25-35 million annually. Competitors with demand-driven planning are gaining market share.",
      "source": "ENF-GF",
      "category": "Strategic",
      "impact": "AED 35M margin loss",
      "process_ref": "PF-15"
    },
    {
      "id": "EX-006",
      "topic": "OPERATIONAL PARALYSIS: Key Person Dependencies",
      "type": "operational",
      "risk": "critical",
      "details": "Critical business processes depend on 3-4 individuals with no backup: (1) Production Manager manually schedules all dairy production - 4 hours daily, (2) One person maintains all Excel pricing files, (3) Feed formulation knowledge held by single nutritionist. If ANY of these individuals are unavailable, operations will halt within 24-48 hours.",
      "source": "ARDC-PP / ENF-GF",
      "category": "Business Continuity",
      "impact": "Operations halt risk",
      "process_ref": "PP-05, PF-05"
    }
  ]
};

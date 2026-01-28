# -*- coding: utf-8 -*-
import json
import sys
from collections import defaultdict

sys.stdout.reconfigure(encoding='utf-8')

# Load findings
with open('all_findings.json', 'r', encoding='utf-8') as f:
    all_findings = json.load(f)

# Define process flows for each entity/module
process_flows = {
    'ARDC-PP': {
        'name': 'Al Rawabi Dairy Company - Production Planning',
        'short': 'ARDC Production',
        'color': '#0066b3',
        'steps': [
            ('PP-01', 'Raw Milk Reception', ['raw milk', 'milk reception', 'tanker', 'weighbridge', 'incoming milk', 'supplier']),
            ('PP-02', 'Quality Testing (Incoming)', ['incoming quality', 'fat content', 'protein', 'mbrt', 'lab test', 'reception control', 'milk quality']),
            ('PP-03', 'Milk Storage & Separation', ['storage', 'separation', 'cream', 'skim', 'separator', 'silo']),
            ('PP-04', 'Fat Balancing & Standardization', ['fat balancing', 'standardization', 'fat content', 'protein balancing', 'component', 'balancing']),
            ('PP-05', 'Production Planning & Scheduling', ['production planning', 'scheduling', 'mrp', 'daily production', 'production order', 'bom', 'planning']),
            ('PP-06', 'Batch Production', ['batch production', 'pasteurization', 'processing', 'manufacturing', 'recipe', 'production process']),
            ('PP-07', 'In-Process Quality Control', ['in-process', 'process control', 'haccp', 'temperature', 'sensor', 'machine', 'quality control']),
            ('PP-08', 'Packaging & Labeling', ['packaging', 'labeling', 'filling', 'pack', 'label']),
            ('PP-09', 'Finished Goods & Warehouse', ['finished good', 'warehouse', 'cold chain', 'shelf-life', 'fefo', 'expiry', 'storage']),
            ('PP-10', 'Product Costing & Variance', ['costing', 'cost', 'variance', 'budget', 'margin', 'actual cost']),
        ]
    },
    'ARDC-SD': {
        'name': 'Al Rawabi Dairy Company - Sales & Distribution',
        'short': 'ARDC Sales',
        'color': '#059669',
        'steps': [
            ('SD-01', 'Demand Planning & Forecasting', ['demand', 'forecast', 'seasonal', 'annual plan', 'prediction']),
            ('SD-02', 'Order Collection & Management', ['order collection', 'customer order', 'phone', 'whatsapp', 'email', 'standing order', 'order management']),
            ('SD-03', 'Stock Allocation', ['allocation', 'stock allocation', 'available stock', 'allocate']),
            ('SD-04', 'Truck Loading & Dispatch', ['loading', 'truck', 'dispatch', 'van loading', 'cold chain', 'vehicle']),
            ('SD-05', 'Route Distribution', ['route', 'distribution', 'delivery route', 'van sales', 'territory', 'driver']),
            ('SD-06', 'Customer Delivery & POS', ['customer delivery', 'pos', 'point of sale', 'shop', 'retail']),
            ('SD-07', 'Returns Processing', ['return', 'expired', 'damage', 'near-expiry', 'repack', 'waste']),
            ('SD-08', 'Driver Settlement', ['settlement', 'driver settlement', 'cash', 'collection', 'reconciliation']),
            ('SD-09', 'Credit Management', ['credit', 'credit limit', 'payment', 'receivable', 'collection']),
            ('SD-10', 'Billing & Invoicing', ['billing', 'invoice', 'revenue', 'tax', 'fta', 'vat', 'pricing']),
        ]
    },
    'ENF-GF': {
        'name': 'ENF & Greenfields - Poultry & Feed Operations',
        'short': 'ENF/GF Poultry',
        'color': '#dc2626',
        'steps': [
            ('PF-01', 'Parent Stock & Breeding', ['parent', 'breeding', 'liwa', 'breeder', 'parent flock', 'parent stock']),
            ('PF-02', 'Egg Production & Hatchery', ['egg', 'hatchery', 'hatching', 'incubation', 'laying', 'hatchability']),
            ('PF-03', 'DOC Production & Transfer', ['doc', 'day-old', 'chick', 'day old chick', 'transfer']),
            ('PF-04', 'Biological Asset Accounting', ['biological', 'ias 41', 'amortization', 'asset valuation', 'capitalization', 'depreciation']),
            ('PF-05', 'Feed Formulation & Recipe', ['feed formulation', 'recipe', 'easy feed', 'nutrition', 'formula', 'ingredient']),
            ('PF-06', 'Feed Production & Delivery', ['feed production', 'feed delivery', 'bulk', 'tanker', 'feed silo', 'feed supply']),
            ('PF-07', 'Farm Operations & Placement', ['farm operation', 'flock', 'house', 'placement', 'farm management']),
            ('PF-08', 'Feed Consumption & FCR', ['feed consumption', 'fcr', 'feed conversion', 'feed management', 'mortality', 'weight gain']),
            ('PF-09', 'Live Bird Collection', ['live bird', 'catching', 'transport', 'collection']),
            ('PF-10', 'Slaughter Processing', ['slaughter', 'killing', 'evisceration', 'carcass', 'processing plant']),
            ('PF-11', 'Portioning & Packing', ['portion', 'cutting', 'packing', 'catch-weight', 'weight', 'grading']),
            ('PF-12', 'Further Processing (FPP)', ['fpp', 'further process', 'marination', 'cooking', 'value-added', 'co-packer']),
            ('PF-13', 'Quality Management', ['quality management', 'qm', 'inspection', 'haccp', 'lab', 'testing', 'specification', 'quality']),
            ('PF-14', 'Inventory & Traceability', ['inventory', 'batch', 'traceability', 'stock', 'warehouse', 'trace']),
            ('PF-15', 'Sales & Distribution', ['sales', 'van sales', 'route', 'distribution', 'customer', 'pricing', 'order']),
        ]
    }
}

# Function to map finding to process step with confidence score
def map_finding_to_step(finding):
    source = finding['source_code']
    topic_lower = finding['topic'].lower()
    details_lower = finding.get('details', '').lower()
    combined = topic_lower + ' ' + details_lower

    best_match = None
    best_score = 0
    best_source = None

    # Try matching within source first
    if source in process_flows:
        flow = process_flows[source]
        for step_id, step_name, keywords in flow['steps']:
            score = 0
            for keyword in keywords:
                if keyword in combined:
                    score += 1
                    if keyword in topic_lower:
                        score += 3  # Higher weight for topic match
            if score > best_score:
                best_score = score
                best_match = (step_id, step_name)
                best_source = source

    # If no good match in source, try other flows
    if best_score < 2:
        for flow_source, flow in process_flows.items():
            for step_id, step_name, keywords in flow['steps']:
                score = 0
                for keyword in keywords:
                    if keyword in combined:
                        score += 1
                        if keyword in topic_lower:
                            score += 3
                if score > best_score:
                    best_score = score
                    best_match = (step_id, step_name)
                    best_source = flow_source

    return best_match, best_score, best_source

# Map all findings
orphan_findings = []
mapped_findings = []

for f in all_findings:
    match, score, matched_source = map_finding_to_step(f)
    if match and score >= 2:
        f['process_ref'] = match[0]
        f['process_name'] = match[1]
        f['matched_source'] = matched_source
        f['match_score'] = score
        mapped_findings.append(f)
    else:
        f['process_ref'] = None
        f['process_name'] = None
        f['match_score'] = score
        orphan_findings.append(f)

# Group mapped findings by process step
findings_by_step = defaultdict(list)
for f in mapped_findings:
    findings_by_step[f['process_ref']].append(f)

# Sort by risk within each step
for step_id in findings_by_step:
    findings_by_step[step_id].sort(key=lambda x: (0 if x['risk'] == 'high' else (1 if x['risk'] == 'medium' else 2)))

# Calculate stats
total = len(all_findings)
high_count = len([f for f in all_findings if f['risk'] == 'high'])
medium_count = len([f for f in all_findings if f['risk'] == 'medium'])
low_count = len([f for f in all_findings if f['risk'] == 'low'])

by_source = defaultdict(int)
by_type = defaultdict(int)
for f in all_findings:
    by_source[f['source_code']] += 1
    by_type[f['type']] += 1

# Count by step for flowchart badges
step_stats = {}
for step_id, findings in findings_by_step.items():
    step_stats[step_id] = {
        'total': len(findings),
        'high': len([f for f in findings if f['risk'] == 'high']),
        'medium': len([f for f in findings if f['risk'] == 'medium']),
        'low': len([f for f in findings if f['risk'] == 'low'])
    }

# Categorize orphan findings
orphan_by_type = defaultdict(list)
for f in orphan_findings:
    orphan_by_type[f['type']].append(f)

print(f"Total findings: {total}")
print(f"Mapped findings: {len(mapped_findings)}")
print(f"Orphan findings: {len(orphan_findings)}")
print(f"Process steps with findings: {len(findings_by_step)}")

# Generate findings JSON for JavaScript
findings_json = {}
for step_id, findings in findings_by_step.items():
    findings_json[step_id] = [{
        'id': f['id'],
        'topic': f['topic'][:80],
        'type': f['type'],
        'risk': f['risk'],
        'details': f.get('details', '')[:300],
        'source': f['source_code'],
        'recommendation': f.get('recommendation', '')[:200]
    } for f in findings]

# Start HTML generation
html = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emirates Rawabi Group - SAP & Process Audit Report</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Source+Serif+Pro:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #1e3a5f;
            --primary-light: #2d5a8a;
            --accent: #c9a227;
            --accent-light: #e8c547;
            --danger: #dc2626;
            --warning: #f59e0b;
            --success: #059669;
            --text: #1f2937;
            --text-light: #6b7280;
            --text-muted: #9ca3af;
            --bg: #f8fafc;
            --bg-white: #ffffff;
            --border: #e5e7eb;
            --border-dark: #d1d5db;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: var(--bg);
            color: var(--text);
            line-height: 1.5;
            font-size: 14px;
        }

        /* Header */
        .header {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
            color: white;
            padding: 20px 32px;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .header-content {
            max-width: 1600px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 10px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--accent);
            margin-bottom: 4px;
        }

        .header-title {
            font-family: 'Source Serif Pro', serif;
            font-size: 20px;
            font-weight: 600;
        }

        .header-meta {
            text-align: right;
            font-size: 12px;
            opacity: 0.8;
        }

        /* Tabs */
        .tabs {
            background: var(--bg-white);
            border-bottom: 1px solid var(--border);
            padding: 0 32px;
            position: sticky;
            top: 76px;
            z-index: 99;
        }

        .tabs-container {
            max-width: 1600px;
            margin: 0 auto;
            display: flex;
            gap: 0;
        }

        .tab {
            padding: 16px 28px;
            font-size: 13px;
            font-weight: 600;
            color: var(--text-light);
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .tab:hover {
            color: var(--primary);
            background: var(--bg);
        }

        .tab.active {
            color: var(--primary);
            border-bottom-color: var(--accent);
        }

        .tab-badge {
            background: var(--primary);
            color: white;
            font-size: 10px;
            padding: 2px 8px;
            border-radius: 10px;
            font-weight: 700;
        }

        .tab.active .tab-badge {
            background: var(--accent);
            color: var(--primary);
        }

        /* Tab Content */
        .tab-content {
            display: none;
            max-width: 1600px;
            margin: 0 auto;
            padding: 32px;
        }

        .tab-content.active {
            display: block;
        }

        /* Executive Summary Styles */
        .exec-hero {
            background: linear-gradient(135deg, var(--primary) 0%, #1e4976 100%);
            color: white;
            padding: 40px;
            border-radius: 12px;
            margin-bottom: 32px;
        }

        .exec-hero h1 {
            font-family: 'Source Serif Pro', serif;
            font-size: 28px;
            margin-bottom: 12px;
        }

        .exec-hero p {
            font-size: 15px;
            opacity: 0.9;
            max-width: 700px;
            line-height: 1.7;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin: 32px 0;
        }

        .stat-card {
            background: var(--bg-white);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 24px;
            text-align: center;
        }

        .stat-value {
            font-family: 'Source Serif Pro', serif;
            font-size: 36px;
            font-weight: 700;
            color: var(--primary);
        }

        .stat-card.critical .stat-value { color: var(--danger); }
        .stat-card.warning .stat-value { color: var(--warning); }
        .stat-card.success .stat-value { color: var(--success); }

        .stat-label {
            font-size: 12px;
            color: var(--text-light);
            margin-top: 4px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .section-card {
            background: var(--bg-white);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 28px;
            margin-bottom: 24px;
        }

        .section-title {
            font-family: 'Source Serif Pro', serif;
            font-size: 20px;
            font-weight: 600;
            color: var(--primary);
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 2px solid var(--accent);
        }

        .finding-summary {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin: 20px 0;
        }

        .finding-summary-card {
            background: var(--bg);
            border-radius: 8px;
            padding: 20px;
            border-left: 4px solid var(--primary);
        }

        .finding-summary-card.critical { border-left-color: var(--danger); }
        .finding-summary-card.warning { border-left-color: var(--warning); }

        .finding-summary-card h4 {
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .finding-summary-card p {
            font-size: 13px;
            color: var(--text-light);
            line-height: 1.6;
        }

        /* Opinion Box */
        .opinion-box {
            background: linear-gradient(to right, #f0fdf4, #ecfdf5);
            border: 2px solid var(--success);
            border-radius: 10px;
            padding: 28px;
            margin: 24px 0;
            position: relative;
        }

        .opinion-label {
            position: absolute;
            top: -12px;
            left: 24px;
            background: var(--success);
            color: white;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            padding: 4px 12px;
            border-radius: 4px;
        }

        .opinion-text {
            font-family: 'Source Serif Pro', serif;
            font-size: 16px;
            line-height: 1.8;
            color: var(--text);
        }

        /* Process Flow Tab Styles */
        .flow-layout {
            display: flex;
            gap: 0;
            height: calc(100vh - 180px);
            margin: -32px;
        }

        .flow-main {
            flex: 1;
            padding: 32px;
            overflow-y: auto;
        }

        .flow-panel {
            width: 420px;
            background: var(--bg-white);
            border-left: 1px solid var(--border);
            display: none;
            flex-direction: column;
            overflow: hidden;
        }

        .flow-panel.open {
            display: flex;
        }

        .panel-header {
            padding: 20px 24px;
            background: var(--primary);
            color: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .panel-title {
            font-size: 14px;
            font-weight: 600;
        }

        .panel-subtitle {
            font-size: 11px;
            opacity: 0.8;
            margin-top: 2px;
        }

        .panel-close {
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            width: 28px;
            height: 28px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .panel-close:hover {
            background: rgba(255,255,255,0.3);
        }

        .panel-stats {
            display: flex;
            gap: 12px;
            padding: 16px 24px;
            background: var(--bg);
            border-bottom: 1px solid var(--border);
        }

        .panel-stat {
            font-size: 11px;
            font-weight: 600;
            padding: 4px 10px;
            border-radius: 12px;
        }

        .panel-stat.high { background: #fee2e2; color: #991b1b; }
        .panel-stat.medium { background: #fef3c7; color: #92400e; }
        .panel-stat.low { background: #d1fae5; color: #065f46; }

        .panel-content {
            flex: 1;
            overflow-y: auto;
            padding: 16px;
        }

        .panel-finding {
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 14px;
            margin-bottom: 12px;
            border-left: 4px solid var(--border-dark);
        }

        .panel-finding.high { border-left-color: var(--danger); }
        .panel-finding.medium { border-left-color: var(--warning); }
        .panel-finding.low { border-left-color: var(--success); }

        .panel-finding-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 8px;
        }

        .panel-finding-id {
            font-size: 10px;
            font-weight: 700;
            color: var(--primary);
        }

        .panel-finding-badges {
            display: flex;
            gap: 6px;
        }

        .badge {
            font-size: 9px;
            font-weight: 600;
            padding: 2px 6px;
            border-radius: 4px;
        }

        .badge-risk-high { background: #fee2e2; color: #991b1b; }
        .badge-risk-medium { background: #fef3c7; color: #92400e; }
        .badge-risk-low { background: #d1fae5; color: #065f46; }
        .badge-type { background: #e0e7ff; color: #3730a3; }
        .badge-source { background: var(--primary); color: white; }

        .panel-finding-title {
            font-size: 13px;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 6px;
            line-height: 1.4;
        }

        .panel-finding-details {
            font-size: 11px;
            color: var(--text-light);
            line-height: 1.5;
        }

        /* Flowchart Container */
        .flowchart-section {
            background: var(--bg-white);
            border: 1px solid var(--border);
            border-radius: 10px;
            margin-bottom: 24px;
            overflow: hidden;
        }

        .flowchart-header {
            padding: 20px 24px;
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .flowchart-title {
            font-family: 'Source Serif Pro', serif;
            font-size: 18px;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .flowchart-title-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }

        .flowchart-body {
            padding: 24px;
            overflow-x: auto;
        }

        .flowchart {
            display: flex;
            align-items: flex-start;
            gap: 6px;
            min-width: max-content;
        }

        .flow-step {
            display: flex;
            align-items: center;
        }

        .flow-box {
            width: 100px;
            min-height: 80px;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border: 2px solid var(--border-dark);
            border-radius: 8px;
            padding: 10px 8px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
            position: relative;
        }

        .flow-box:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }

        .flow-box.selected {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(30,58,95,0.2);
        }

        .flow-box.has-critical {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border-color: var(--danger);
        }

        .flow-box.has-warning {
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
            border-color: var(--warning);
        }

        .flow-box.has-success {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border-color: var(--success);
        }

        .flow-id {
            font-size: 9px;
            font-weight: 700;
            color: var(--primary);
            background: white;
            padding: 2px 6px;
            border-radius: 4px;
            display: inline-block;
            margin-bottom: 4px;
        }

        .flow-name {
            font-size: 10px;
            font-weight: 600;
            color: var(--text);
            line-height: 1.3;
        }

        .flow-count {
            position: absolute;
            top: -8px;
            right: -8px;
            min-width: 22px;
            height: 22px;
            background: var(--primary);
            color: white;
            border-radius: 11px;
            font-size: 10px;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 6px;
        }

        .flow-count.critical { background: var(--danger); }
        .flow-count.warning { background: var(--warning); }

        .flow-arrow {
            color: var(--border-dark);
            font-size: 20px;
            margin: 0 4px;
        }

        .flow-legend {
            display: flex;
            gap: 20px;
            padding: 16px 24px;
            border-top: 1px solid var(--border);
            background: var(--bg);
            font-size: 11px;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .legend-box {
            width: 16px;
            height: 16px;
            border-radius: 4px;
            border: 2px solid;
        }

        .legend-box.critical { background: #fee2e2; border-color: var(--danger); }
        .legend-box.warning { background: #fef3c7; border-color: var(--warning); }
        .legend-box.success { background: #d1fae5; border-color: var(--success); }
        .legend-box.none { background: #f1f5f9; border-color: var(--border-dark); }

        /* Orphan Tab */
        .orphan-intro {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 24px;
        }

        .orphan-intro h3 {
            font-size: 15px;
            font-weight: 600;
            color: #92400e;
            margin-bottom: 8px;
        }

        .orphan-intro p {
            font-size: 13px;
            color: #78350f;
        }

        .orphan-section {
            background: var(--bg-white);
            border: 1px solid var(--border);
            border-radius: 10px;
            margin-bottom: 20px;
            overflow: hidden;
        }

        .orphan-section-header {
            padding: 16px 20px;
            background: var(--bg);
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .orphan-section-title {
            font-size: 14px;
            font-weight: 600;
            text-transform: capitalize;
        }

        .orphan-section-count {
            font-size: 11px;
            font-weight: 600;
            padding: 4px 10px;
            background: var(--primary);
            color: white;
            border-radius: 12px;
        }

        .orphan-list {
            padding: 16px;
        }

        .orphan-item {
            display: flex;
            gap: 12px;
            padding: 12px;
            border-bottom: 1px solid var(--border);
        }

        .orphan-item:last-child {
            border-bottom: none;
        }

        .orphan-id {
            font-size: 10px;
            font-weight: 700;
            color: var(--primary);
            min-width: 60px;
        }

        .orphan-content {
            flex: 1;
        }

        .orphan-topic {
            font-size: 12px;
            font-weight: 600;
            margin-bottom: 4px;
        }

        .orphan-details {
            font-size: 11px;
            color: var(--text-light);
            line-height: 1.5;
        }

        .orphan-badges {
            display: flex;
            gap: 6px;
            flex-shrink: 0;
        }

        /* Tables */
        .data-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
        }

        .data-table th {
            background: var(--primary);
            color: white;
            font-weight: 600;
            text-align: left;
            padding: 12px 14px;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .data-table td {
            padding: 12px 14px;
            border-bottom: 1px solid var(--border);
        }

        .data-table tbody tr:hover {
            background: #f0f9ff;
        }

        /* Charts */
        .chart-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 20px 0;
        }

        .chart-card {
            background: var(--bg-white);
            border: 1px solid var(--border);
            border-radius: 10px;
            padding: 20px;
        }

        .chart-title {
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 16px;
            color: var(--text);
        }

        .bar-chart { display: flex; flex-direction: column; gap: 10px; }

        .bar-row {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .bar-label {
            width: 90px;
            font-size: 11px;
            color: var(--text-light);
            text-align: right;
        }

        .bar-track {
            flex: 1;
            height: 24px;
            background: var(--bg);
            border-radius: 4px;
            overflow: hidden;
        }

        .bar-fill {
            height: 100%;
            border-radius: 4px;
            display: flex;
            align-items: center;
            padding-left: 10px;
            font-size: 11px;
            font-weight: 600;
            color: white;
        }

        .bar-fill.primary { background: linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%); }
        .bar-fill.danger { background: linear-gradient(90deg, #dc2626 0%, #ef4444 100%); }
        .bar-fill.warning { background: linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%); }
        .bar-fill.success { background: linear-gradient(90deg, #059669 0%, #10b981 100%); }

        /* Print */
        @media print {
            .header, .tabs { position: static; }
            .flow-panel { display: none !important; }
            .tab-content { display: block !important; page-break-before: always; }
        }

        /* Responsive */
        @media (max-width: 1200px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
            .finding-summary { grid-template-columns: 1fr; }
            .chart-grid { grid-template-columns: 1fr; }
            .flow-panel { width: 360px; }
        }

        @media (max-width: 768px) {
            .header-content { flex-direction: column; text-align: center; gap: 12px; }
            .header-meta { text-align: center; }
            .tabs-container { overflow-x: auto; }
            .tab { padding: 12px 16px; white-space: nowrap; }
            .stats-grid { grid-template-columns: repeat(2, 1fr); }
            .flow-layout { flex-direction: column; height: auto; }
            .flow-panel { width: 100%; height: 50vh; }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="header-content">
            <div>
                <div class="logo">NXSYS Advisory Services</div>
                <h1 class="header-title">Emirates Rawabi Group - SAP & Process Audit Report</h1>
            </div>
            <div class="header-meta">
                <div>Report Date: January 27, 2026</div>
                <div>Report No: NXSYS-2026-ARG-004</div>
            </div>
        </div>
    </header>

    <nav class="tabs">
        <div class="tabs-container">
            <div class="tab active" data-tab="executive" onclick="switchTab('executive')">
                <span>Executive Summary</span>
                <span class="tab-badge">Overview</span>
            </div>
            <div class="tab" data-tab="process" onclick="switchTab('process')">
                <span>Process Flow Analysis</span>
                <span class="tab-badge">''' + str(len(mapped_findings)) + '''</span>
            </div>
            <div class="tab" data-tab="orphan" onclick="switchTab('orphan')">
                <span>Unclassified Findings</span>
                <span class="tab-badge">''' + str(len(orphan_findings)) + '''</span>
            </div>
        </div>
    </nav>
'''

# Tab 1: Executive Summary
html += f'''
    <div id="tab-executive" class="tab-content active">
        <div class="exec-hero">
            <h1>SAP System & Business Process Assessment</h1>
            <p>Comprehensive audit findings for Al Rawabi Dairy Company (ARDC), Emirates National Foods LLC (ENF), Greenfields for Feeds LLC (GF), and Al Salwa (LIWA) operations across dairy production, poultry farming, feed manufacturing, and distribution.</p>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-value">{total:,}</div>
                <div class="stat-label">Total Findings</div>
            </div>
            <div class="stat-card critical">
                <div class="stat-value">{high_count}</div>
                <div class="stat-label">High Risk</div>
            </div>
            <div class="stat-card warning">
                <div class="stat-value">{medium_count}</div>
                <div class="stat-label">Medium Risk</div>
            </div>
            <div class="stat-card success">
                <div class="stat-value">{low_count}</div>
                <div class="stat-label">Low Risk</div>
            </div>
        </div>

        <div class="opinion-box">
            <span class="opinion-label">Assessment Opinion</span>
            <p class="opinion-text">
                In our opinion, the current SAP ECC implementation across Emirates Rawabi Group entities <strong>does not adequately support</strong> the operational requirements of modern dairy and poultry businesses. We identified <strong>{high_count} high-risk findings</strong> requiring immediate attention. We recommend a <strong>Greenfield S/4HANA implementation</strong> with industry-specific solutions including PP-PI for dairy, Livestock Management for poultry, and MSG for meat processing.
            </p>
        </div>

        <div class="section-card">
            <h3 class="section-title">Critical Findings Summary</h3>
            <div class="finding-summary">
                <div class="finding-summary-card critical">
                    <h4>Quality Management Gap</h4>
                    <p>SAP QM module is not active. All quality testing, certifications, and records are maintained on paper. Products released before quality approval.</p>
                </div>
                <div class="finding-summary-card critical">
                    <h4>MRP Not Running</h4>
                    <p>Material Requirements Planning is not executed. Planning is budget-based rather than demand-driven, leading to overproduction and inventory issues.</p>
                </div>
                <div class="finding-summary-card warning">
                    <h4>Missing Industry Solutions</h4>
                    <p>No SAP Livestock Management or MSG modules. Flock tracking, biological asset accounting, and meat processing handled manually via Excel.</p>
                </div>
            </div>
        </div>

        <div class="section-card">
            <h3 class="section-title">Findings Distribution</h3>
            <div class="chart-grid">
                <div class="chart-card">
                    <div class="chart-title">By Risk Level</div>
                    <div class="bar-chart">
                        <div class="bar-row">
                            <span class="bar-label">High Risk</span>
                            <div class="bar-track">
                                <div class="bar-fill danger" style="width: {high_count/total*100:.1f}%">{high_count}</div>
                            </div>
                        </div>
                        <div class="bar-row">
                            <span class="bar-label">Medium Risk</span>
                            <div class="bar-track">
                                <div class="bar-fill warning" style="width: {medium_count/total*100:.1f}%">{medium_count}</div>
                            </div>
                        </div>
                        <div class="bar-row">
                            <span class="bar-label">Low Risk</span>
                            <div class="bar-track">
                                <div class="bar-fill success" style="width: {low_count/total*100:.1f}%">{low_count}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chart-card">
                    <div class="chart-title">By Entity</div>
                    <div class="bar-chart">
'''

for source, count in sorted(by_source.items(), key=lambda x: -x[1]):
    source_name = {'ARDC-PP': 'ARDC Production', 'ARDC-SD': 'ARDC Sales', 'ENF-GF': 'ENF & GF'}.get(source, source)
    html += f'''
                        <div class="bar-row">
                            <span class="bar-label">{source_name}</span>
                            <div class="bar-track">
                                <div class="bar-fill primary" style="width: {count/total*100:.1f}%">{count}</div>
                            </div>
                        </div>
'''

html += '''
                    </div>
                </div>
            </div>
        </div>

        <div class="section-card">
            <h3 class="section-title">Key Recommendations</h3>
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Priority</th>
                        <th>Recommendation</th>
                        <th>Affected Entities</th>
                        <th>Impact</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span class="badge badge-risk-high">P1</span></td>
                        <td><strong>Implement S/4HANA with PP-PI</strong> - Process Industries module for dairy operations with recipe management and yield tracking</td>
                        <td>ARDC</td>
                        <td>Quality, Production, Costing</td>
                    </tr>
                    <tr>
                        <td><span class="badge badge-risk-high">P1</span></td>
                        <td><strong>Deploy SAP Livestock Management</strong> - For flock tracking, biological asset accounting, FCR monitoring</td>
                        <td>ENF, LIWA</td>
                        <td>Farm Operations, Finance</td>
                    </tr>
                    <tr>
                        <td><span class="badge badge-risk-high">P1</span></td>
                        <td><strong>Implement SAP MSG</strong> - Meat & Fish Management for carcass splitting and catch-weight processing</td>
                        <td>ENF</td>
                        <td>Processing, Costing</td>
                    </tr>
                    <tr>
                        <td><span class="badge badge-risk-high">P1</span></td>
                        <td><strong>Activate SAP QM</strong> - Full quality management with inspection lots, certificates, and traceability</td>
                        <td>All</td>
                        <td>Compliance, Quality</td>
                    </tr>
                    <tr>
                        <td><span class="badge badge-risk-medium">P2</span></td>
                        <td><strong>Implement SAP IBP</strong> - Integrated Business Planning for demand-driven supply planning</td>
                        <td>All</td>
                        <td>Planning, Inventory</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
'''

# Tab 2: Process Flow Analysis
html += '''
    <div id="tab-process" class="tab-content">
        <div class="flow-layout">
            <div class="flow-main">
                <p style="margin-bottom: 24px; color: var(--text-light);">Click on any process step to view related findings in the panel. Steps are color-coded by highest risk level of their findings.</p>
'''

# Generate flowcharts
for source_code, flow in process_flows.items():
    html += f'''
                <div class="flowchart-section" id="flow-{source_code}">
                    <div class="flowchart-header">
                        <div class="flowchart-title">
                            <span class="flowchart-title-dot" style="background: {flow['color']}"></span>
                            {flow['name']}
                        </div>
                    </div>
                    <div class="flowchart-body">
                        <div class="flowchart">
'''

    for i, (step_id, step_name, _) in enumerate(flow['steps']):
        stats = step_stats.get(step_id, {'total': 0, 'high': 0, 'medium': 0, 'low': 0})

        # Determine box class
        box_class = ''
        count_class = ''
        if stats['high'] > 0:
            box_class = 'has-critical'
            count_class = 'critical'
        elif stats['medium'] > 0:
            box_class = 'has-warning'
            count_class = 'warning'
        elif stats['low'] > 0:
            box_class = 'has-success'

        if i > 0:
            html += '<span class="flow-arrow">&#8594;</span>'

        html += f'''
                            <div class="flow-step">
                                <div class="flow-box {box_class}" data-step="{step_id}" onclick="selectStep('{step_id}', '{step_name}')">
                                    <span class="flow-id">{step_id}</span>
                                    <div class="flow-name">{step_name}</div>
                                    {f'<span class="flow-count {count_class}">{stats["total"]}</span>' if stats['total'] > 0 else ''}
                                </div>
                            </div>
'''

    html += '''
                        </div>
                    </div>
                    <div class="flow-legend">
                        <div class="legend-item"><div class="legend-box critical"></div> High Risk</div>
                        <div class="legend-item"><div class="legend-box warning"></div> Medium Risk</div>
                        <div class="legend-item"><div class="legend-box success"></div> Low Risk</div>
                        <div class="legend-item"><div class="legend-box none"></div> No Findings</div>
                    </div>
                </div>
'''

html += '''
            </div>

            <div class="flow-panel" id="flowPanel">
                <div class="panel-header">
                    <div>
                        <div class="panel-title" id="panelTitle">Select a Process Step</div>
                        <div class="panel-subtitle" id="panelSubtitle">Click on any box to view findings</div>
                    </div>
                    <button class="panel-close" onclick="closePanel()">&times;</button>
                </div>
                <div class="panel-stats" id="panelStats"></div>
                <div class="panel-content" id="panelContent">
                    <p style="text-align: center; color: var(--text-muted); padding: 40px;">
                        Click on a process step in the flowchart to view related findings here.
                    </p>
                </div>
            </div>
        </div>
    </div>
'''

# Tab 3: Orphan Findings
html += f'''
    <div id="tab-orphan" class="tab-content">
        <div class="orphan-intro">
            <h3>Unclassified Findings ({len(orphan_findings)})</h3>
            <p>The following findings could not be confidently mapped to a specific process step. They may relate to cross-functional issues, organizational matters, or general system concerns.</p>
        </div>
'''

# Group orphan findings by type
for ftype, findings in sorted(orphan_by_type.items(), key=lambda x: -len(x[1])):
    html += f'''
        <div class="orphan-section">
            <div class="orphan-section-header">
                <span class="orphan-section-title">{ftype.replace('_', ' ').title()}</span>
                <span class="orphan-section-count">{len(findings)}</span>
            </div>
            <div class="orphan-list">
'''

    for f in findings[:50]:  # Limit to 50 per type for performance
        risk_class = 'badge-risk-high' if f['risk'] == 'high' else ('badge-risk-medium' if f['risk'] == 'medium' else 'badge-risk-low')
        details = f.get('details', '')[:150]
        details = details.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        topic = f['topic'][:70].replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

        html += f'''
                <div class="orphan-item">
                    <span class="orphan-id">{f['id']}</span>
                    <div class="orphan-content">
                        <div class="orphan-topic">{topic}</div>
                        <div class="orphan-details">{details}...</div>
                    </div>
                    <div class="orphan-badges">
                        <span class="badge {risk_class}">{f['risk'].title()}</span>
                        <span class="badge badge-source">{f['source_code']}</span>
                    </div>
                </div>
'''

    if len(findings) > 50:
        html += f'<div style="padding: 12px; text-align: center; color: var(--text-muted); font-size: 12px;">... and {len(findings) - 50} more findings</div>'

    html += '''
            </div>
        </div>
'''

html += '''
    </div>
'''

# JavaScript with findings data
html += '''
    <script>
        // Findings data
        const findingsData = ''' + json.dumps(findings_json, ensure_ascii=False) + ''';

        // Tab switching
        function switchTab(tabId) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
            document.getElementById(`tab-${tabId}`).classList.add('active');

            if (tabId !== 'process') {
                closePanel();
            }
        }

        // Flow step selection
        let selectedStep = null;

        function selectStep(stepId, stepName) {
            // Remove previous selection
            document.querySelectorAll('.flow-box').forEach(box => box.classList.remove('selected'));

            // Select new
            const box = document.querySelector(`[data-step="${stepId}"]`);
            if (box) box.classList.add('selected');

            selectedStep = stepId;

            // Open panel
            const panel = document.getElementById('flowPanel');
            panel.classList.add('open');

            // Update panel header
            document.getElementById('panelTitle').textContent = stepName;
            document.getElementById('panelSubtitle').textContent = stepId;

            // Get findings
            const findings = findingsData[stepId] || [];

            // Update stats
            const high = findings.filter(f => f.risk === 'high').length;
            const medium = findings.filter(f => f.risk === 'medium').length;
            const low = findings.filter(f => f.risk === 'low').length;

            document.getElementById('panelStats').innerHTML = `
                <span class="panel-stat high">${high} High</span>
                <span class="panel-stat medium">${medium} Medium</span>
                <span class="panel-stat low">${low} Low</span>
            `;

            // Render findings
            const content = document.getElementById('panelContent');
            if (findings.length === 0) {
                content.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 40px;">No findings for this process step.</p>';
                return;
            }

            content.innerHTML = findings.map(f => `
                <div class="panel-finding ${f.risk}">
                    <div class="panel-finding-header">
                        <span class="panel-finding-id">${f.id}</span>
                        <div class="panel-finding-badges">
                            <span class="badge badge-risk-${f.risk === 'high' ? 'high' : (f.risk === 'medium' ? 'medium' : 'low')}">${f.risk}</span>
                            <span class="badge badge-type">${f.type.replace('_', ' ')}</span>
                            <span class="badge badge-source">${f.source}</span>
                        </div>
                    </div>
                    <div class="panel-finding-title">${f.topic}</div>
                    <div class="panel-finding-details">${f.details}</div>
                </div>
            `).join('');
        }

        function closePanel() {
            document.getElementById('flowPanel').classList.remove('open');
            document.querySelectorAll('.flow-box').forEach(box => box.classList.remove('selected'));
            selectedStep = null;
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closePanel();
        });
    </script>
</body>
</html>
'''

# Write file
output_file = 'Emirates_Rawabi_Group_Comprehensive_Report.html'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"\nReport generated: {output_file}")
print(f"Total findings: {total}")
print(f"Mapped to processes: {len(mapped_findings)}")
print(f"Orphan findings: {len(orphan_findings)}")
print(f"Process steps: {sum(len(f['steps']) for f in process_flows.values())}")

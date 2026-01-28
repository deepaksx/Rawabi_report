# -*- coding: utf-8 -*-
import json
import sys
import re
from collections import defaultdict

sys.stdout.reconfigure(encoding='utf-8')

# Load findings
with open('all_findings.json', 'r', encoding='utf-8') as f:
    all_findings = json.load(f)

# Define process flows for each entity/module
process_flows = {
    'ARDC-PP': {
        'name': 'Al Rawabi Dairy - Production Planning',
        'steps': [
            ('PP-01', 'Raw Milk Reception', ['raw milk', 'milk reception', 'tanker', 'weighbridge', 'incoming milk']),
            ('PP-02', 'Quality Testing (Incoming)', ['quality test', 'fat content', 'protein', 'mbrt', 'lab test', 'reception control', 'incoming quality']),
            ('PP-03', 'Milk Storage & Separation', ['storage', 'separation', 'cream', 'skim', 'separator']),
            ('PP-04', 'Fat Balancing & Standardization', ['fat balancing', 'standardization', 'fat content', 'protein balancing', 'component']),
            ('PP-05', 'Production Planning & Scheduling', ['production planning', 'scheduling', 'mrp', 'daily production', 'production order', 'bom']),
            ('PP-06', 'Batch Production', ['batch', 'production', 'pasteurization', 'processing', 'manufacturing', 'recipe']),
            ('PP-07', 'In-Process Quality Control', ['in-process', 'process control', 'haccp', 'temperature', 'sensor', 'machine']),
            ('PP-08', 'Packaging & Labeling', ['packaging', 'labeling', 'filling', 'pack']),
            ('PP-09', 'Finished Goods & Storage', ['finished good', 'storage', 'warehouse', 'cold chain', 'shelf-life', 'fefo', 'expiry']),
            ('PP-10', 'Product Costing & Variance', ['costing', 'cost', 'variance', 'budget', 'price', 'margin']),
        ]
    },
    'ARDC-SD': {
        'name': 'Al Rawabi Dairy - Sales & Distribution',
        'steps': [
            ('SD-01', 'Demand Planning & Forecasting', ['demand', 'forecast', 'planning', 'seasonal', 'annual plan']),
            ('SD-02', 'Order Collection & Management', ['order', 'customer order', 'phone', 'whatsapp', 'email', 'standing order']),
            ('SD-03', 'Stock Allocation', ['allocation', 'stock allocation', 'available stock']),
            ('SD-04', 'Truck Loading & Dispatch', ['loading', 'truck', 'dispatch', 'van loading', 'cold chain']),
            ('SD-05', 'Route Distribution', ['route', 'distribution', 'delivery', 'van sales', 'territory']),
            ('SD-06', 'Customer Delivery & Sales', ['customer', 'delivery', 'sales', 'pos', 'invoice', 'pricing']),
            ('SD-07', 'Returns Processing', ['return', 'expired', 'damage', 'near-expiry', 'repack']),
            ('SD-08', 'Driver Settlement', ['settlement', 'driver', 'cash', 'collection', 'reconciliation']),
            ('SD-09', 'Credit Management', ['credit', 'credit limit', 'payment', 'receivable']),
            ('SD-10', 'Billing & Revenue', ['billing', 'invoice', 'revenue', 'tax', 'fta', 'vat']),
        ]
    },
    'ENF-GF': {
        'name': 'ENF & GF - Poultry & Feed Operations',
        'steps': [
            ('PF-01', 'Parent Stock & Breeding (LIWA)', ['parent', 'breeding', 'liwa', 'breeder', 'parent flock', 'rearing']),
            ('PF-02', 'Egg Production & Hatchery', ['egg', 'hatchery', 'hatching', 'incubation', 'laying', 'hatchability']),
            ('PF-03', 'DOC Production & Supply', ['doc', 'day-old', 'chick', 'day old chick']),
            ('PF-04', 'Biological Asset Accounting', ['biological', 'ias 41', 'amortization', 'asset valuation', 'capitalization']),
            ('PF-05', 'Feed Formulation (GF)', ['feed formulation', 'recipe', 'easy feed', 'nutrition', 'formula']),
            ('PF-06', 'Feed Production & Delivery', ['feed production', 'feed delivery', 'bulk', 'tanker', 'silo']),
            ('PF-07', 'Farm Operations & Flock Management', ['farm', 'flock', 'house', 'bird', 'mortality', 'placement']),
            ('PF-08', 'Feed Consumption & FCR', ['feed consumption', 'fcr', 'feed conversion', 'feed management']),
            ('PF-09', 'Live Bird Collection', ['live bird', 'collection', 'catching', 'transport']),
            ('PF-10', 'Slaughter Processing', ['slaughter', 'processing', 'killing', 'evisceration', 'carcass']),
            ('PF-11', 'Portioning & Packing', ['portion', 'cutting', 'packing', 'weight', 'catch-weight']),
            ('PF-12', 'FPP (Further Processing)', ['fpp', 'further process', 'marination', 'cooking', 'value-added', 'co-packer']),
            ('PF-13', 'Quality Management', ['quality', 'qm', 'inspection', 'haccp', 'lab', 'testing', 'specification']),
            ('PF-14', 'Inventory & Traceability', ['inventory', 'batch', 'traceability', 'stock', 'warehouse']),
            ('PF-15', 'Sales & Van Distribution', ['sales', 'van', 'route', 'distribution', 'customer', 'pricing']),
        ]
    }
}

# Function to map finding to process step
def map_finding_to_step(finding):
    source = finding['source_code']
    topic_lower = finding['topic'].lower()
    details_lower = finding.get('details', '').lower()
    combined = topic_lower + ' ' + details_lower

    if source not in process_flows:
        return None, None

    flow = process_flows[source]
    best_match = None
    best_score = 0

    for step_id, step_name, keywords in flow['steps']:
        score = 0
        for keyword in keywords:
            if keyword in combined:
                score += 1
                # Bonus for topic match
                if keyword in topic_lower:
                    score += 2
        if score > best_score:
            best_score = score
            best_match = (step_id, step_name)

    # Default to a general step if no match
    if best_match is None or best_score == 0:
        # Assign based on type
        ftype = finding.get('type', '')
        if 'quality' in combined or ftype == 'compliance':
            if source == 'ARDC-PP':
                best_match = ('PP-07', 'In-Process Quality Control')
            elif source == 'ARDC-SD':
                best_match = ('SD-07', 'Returns Processing')
            else:
                best_match = ('PF-13', 'Quality Management')
        elif 'cost' in combined or 'price' in combined:
            if source == 'ARDC-PP':
                best_match = ('PP-10', 'Product Costing & Variance')
            elif source == 'ARDC-SD':
                best_match = ('SD-10', 'Billing & Revenue')
            else:
                best_match = ('PF-15', 'Sales & Van Distribution')
        elif 'manual' in combined or 'excel' in combined:
            if source == 'ARDC-PP':
                best_match = ('PP-05', 'Production Planning & Scheduling')
            elif source == 'ARDC-SD':
                best_match = ('SD-02', 'Order Collection & Management')
            else:
                best_match = ('PF-07', 'Farm Operations & Flock Management')
        else:
            # Default to middle of process
            steps = flow['steps']
            mid = len(steps) // 2
            best_match = (steps[mid][0], steps[mid][1])

    return best_match

# Map all findings to process steps
for f in all_findings:
    step = map_finding_to_step(f)
    if step and step[0]:
        f['process_ref'] = step[0]
        f['process_name'] = step[1]
    else:
        f['process_ref'] = 'N/A'
        f['process_name'] = 'General'

# Categorize findings
category_mapping = {
    'quality': ['quality', 'qm', 'haccp', 'inspection', 'testing', 'lab', 'certificate'],
    'production': ['production', 'manufacturing', 'bom', 'mrp', 'planning', 'scheduling', 'pp-pi', 'recipe'],
    'feed': ['feed', 'fcr', 'silo', 'nutrition', 'tanker'],
    'livestock': ['livestock', 'flock', 'biological', 'bird', 'chick', 'doc', 'poultry', 'mortality', 'hatchery', 'breeder', 'laying'],
    'sales': ['sales', 'van', 'route', 'distribution', 'customer', 'pricing', 'invoice', 'order', 'delivery'],
    'inventory': ['inventory', 'stock', 'warehouse', 'batch', 'traceability', 'shelf-life', 'fefo', 'expiry'],
    'costing': ['cost', 'costing', 'variance', 'budget', 'price', 'margin', 'profit'],
    'integration': ['integration', 'interface', 'sensor', 'machine', 'automation', 'system'],
    'manual': ['manual', 'excel', 'paper', 'workaround', 'spreadsheet'],
    'performance': ['performance', 'report', 'slow', 'delay', 'run']
}

def categorize_finding(finding):
    topic_lower = finding['topic'].lower()
    details_lower = finding.get('details', '').lower() if finding.get('details') else ''
    combined = topic_lower + ' ' + details_lower
    for category, keywords in category_mapping.items():
        for keyword in keywords:
            if keyword in combined:
                return category
    return 'other'

for f in all_findings:
    f['category'] = categorize_finding(f)

by_category = defaultdict(list)
for f in all_findings:
    by_category[f['category']].append(f)

# Sort by risk within each category
for cat in by_category:
    by_category[cat].sort(key=lambda x: (0 if x['risk'] == 'high' else (1 if x['risk'] == 'medium' else 2), x['process_ref']))

# Category metadata
category_meta = {
    'quality': ('Quality Management', 'Findings related to quality control, QM module, testing procedures, HACCP compliance, and quality documentation'),
    'production': ('Production Planning', 'Findings related to manufacturing processes, MRP, BOMs, PP-PI, scheduling, and recipe management'),
    'feed': ('Feed Management', 'Findings related to feed procurement, delivery, FCR tracking, silo management, and feed optimization'),
    'livestock': ('Livestock & Biological Assets', 'Findings related to flock management, DOCs, hatching, biological asset accounting, and IAS 41 compliance'),
    'sales': ('Sales & Distribution', 'Findings related to van sales, routing, customer management, pricing, and order processing'),
    'inventory': ('Inventory & Traceability', 'Findings related to batch management, warehouse operations, stock control, and traceability'),
    'costing': ('Costing & Finance', 'Findings related to product costing, cost variance analysis, budgeting, and profitability'),
    'integration': ('System Integration', 'Findings related to interfaces, sensor automation, machine integration, and system connectivity'),
    'manual': ('Manual Processes & Workarounds', 'Findings related to Excel-based processes, paper documentation, and system bypasses'),
    'performance': ('System Performance', 'Findings related to system speed, reporting delays, and processing capacity'),
    'other': ('Other Findings', 'Additional findings not classified in specific categories')
}

# Calculate stats
high_count = len([f for f in all_findings if f['risk'] == 'high'])
medium_count = len([f for f in all_findings if f['risk'] == 'medium'])
low_count = len([f for f in all_findings if f['risk'] == 'low'])

by_source = defaultdict(int)
by_type = defaultdict(int)
for f in all_findings:
    by_source[f['source_code']] += 1
    by_type[f['type']] += 1

# Count findings by process step
step_counts = defaultdict(lambda: {'high': 0, 'medium': 0, 'low': 0, 'total': 0})
for f in all_findings:
    ref = f.get('process_ref', 'N/A')
    step_counts[ref][f['risk']] += 1
    step_counts[ref]['total'] += 1

# Generate HTML
print("Generating HTML report with flowcharts...")

html_content = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emirates Rawabi Group - SAP Assessment Report with Process Flows</title>
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&family=Source+Serif+Pro:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-dark: #1a1f35;
            --primary-blue: #002b5c;
            --accent-blue: #0066b3;
            --accent-gold: #b8860b;
            --accent-copper: #c4804a;
            --text-primary: #2d3748;
            --text-secondary: #4a5568;
            --text-muted: #718096;
            --bg-cream: #fdfcfa;
            --bg-light: #f8f7f5;
            --bg-white: #ffffff;
            --border-light: #e8e6e3;
            --border-medium: #d1cdc7;
            --success: #2d6a4f;
            --warning: #b45309;
            --danger: #9b2c2c;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Source Sans Pro', sans-serif;
            background: var(--bg-cream);
            color: var(--text-primary);
            line-height: 1.6;
            font-size: 13px;
        }

        @media print {
            body { background: white; font-size: 9pt; }
            .sidebar, .back-to-top { display: none !important; }
            .main-content { margin-left: 0 !important; }
            .page-break { page-break-before: always; }
            .flowchart-container { page-break-inside: avoid; }
        }

        .sidebar {
            position: fixed;
            left: 0; top: 0;
            width: 240px;
            height: 100vh;
            background: var(--primary-dark);
            color: white;
            overflow-y: auto;
            z-index: 1000;
            font-size: 12px;
        }

        .sidebar-header {
            padding: 20px 16px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .firm-logo {
            font-size: 9px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--accent-gold);
            margin-bottom: 6px;
        }

        .report-title-sidebar {
            font-family: 'Source Serif Pro', serif;
            font-size: 14px;
            font-weight: 600;
        }

        .nav-section { padding: 10px 0; }

        .nav-section-title {
            font-size: 8px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.4);
            padding: 6px 16px;
        }

        .nav-item {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            font-size: 11px;
            border-left: 2px solid transparent;
            transition: all 0.2s;
        }

        .nav-item:hover {
            background: rgba(255,255,255,0.05);
            color: white;
        }

        .nav-item.active {
            background: rgba(255,255,255,0.1);
            border-left-color: var(--accent-gold);
            color: white;
        }

        .nav-item-number {
            width: 20px;
            height: 20px;
            background: rgba(255,255,255,0.1);
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 9px;
            font-weight: 600;
            margin-right: 8px;
        }

        .main-content {
            margin-left: 240px;
            min-height: 100vh;
        }

        .cover-section {
            background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-blue) 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 50px;
        }

        .cover-firm-name {
            font-size: 11px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--accent-gold);
            margin-bottom: 30px;
        }

        .cover-title {
            font-family: 'Source Serif Pro', serif;
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 16px;
            max-width: 600px;
        }

        .cover-subtitle {
            font-size: 18px;
            font-weight: 300;
            color: rgba(255,255,255,0.8);
            margin-bottom: 30px;
        }

        .cover-meta {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            max-width: 600px;
            margin-top: 30px;
            padding-top: 30px;
            border-top: 1px solid rgba(255,255,255,0.2);
        }

        .cover-meta-item label {
            font-size: 8px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.5);
            display: block;
            margin-bottom: 4px;
        }

        .cover-meta-item span {
            font-size: 13px;
            font-weight: 600;
        }

        .cover-classification {
            position: absolute;
            bottom: 30px;
            right: 50px;
            padding: 5px 12px;
            background: rgba(184, 134, 11, 0.2);
            border: 1px solid var(--accent-gold);
            color: var(--accent-gold);
            font-size: 9px;
            letter-spacing: 1.5px;
            text-transform: uppercase;
        }

        .content-wrapper {
            max-width: 1100px;
            margin: 0 auto;
            padding: 50px 30px;
        }

        section {
            margin-bottom: 50px;
            scroll-margin-top: 20px;
        }

        .section-header {
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 2px solid var(--primary-blue);
        }

        .section-number {
            font-size: 10px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--accent-copper);
            margin-bottom: 4px;
        }

        .section-title {
            font-family: 'Source Serif Pro', serif;
            font-size: 24px;
            font-weight: 700;
            color: var(--primary-dark);
        }

        h3 {
            font-family: 'Source Serif Pro', serif;
            font-size: 18px;
            font-weight: 600;
            color: var(--primary-dark);
            margin: 24px 0 12px;
        }

        h4 {
            font-size: 13px;
            font-weight: 700;
            color: var(--text-primary);
            margin: 20px 0 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        p {
            margin-bottom: 12px;
            color: var(--text-secondary);
        }

        /* Dashboard */
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            margin: 20px 0;
        }

        .dash-card {
            background: white;
            border: 1px solid var(--border-light);
            border-radius: 6px;
            padding: 16px;
            text-align: center;
        }

        .dash-card-value {
            font-family: 'Source Serif Pro', serif;
            font-size: 28px;
            font-weight: 700;
            color: var(--primary-dark);
        }

        .dash-card-label {
            font-size: 11px;
            color: var(--text-muted);
        }

        .dash-card.critical .dash-card-value { color: #dc2626; }
        .dash-card.warning .dash-card-value { color: #f59e0b; }
        .dash-card.success .dash-card-value { color: #059669; }

        /* Flowchart Styles */
        .flowchart-container {
            background: white;
            border: 1px solid var(--border-light);
            border-radius: 8px;
            padding: 24px;
            margin: 20px 0;
            overflow-x: auto;
        }

        .flowchart-title {
            font-family: 'Source Serif Pro', serif;
            font-size: 16px;
            font-weight: 600;
            color: var(--primary-dark);
            margin-bottom: 20px;
            padding-bottom: 12px;
            border-bottom: 2px solid var(--accent-gold);
        }

        .flowchart {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: flex-start;
            align-items: flex-start;
        }

        .flow-step {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 95px;
        }

        .flow-box {
            width: 90px;
            min-height: 70px;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border: 2px solid var(--border-medium);
            border-radius: 6px;
            padding: 8px 6px;
            text-align: center;
            position: relative;
            transition: all 0.2s;
            cursor: pointer;
        }

        .flow-box:hover {
            border-color: var(--accent-blue);
            box-shadow: 0 4px 12px rgba(0,102,179,0.15);
            transform: translateY(-2px);
        }

        .flow-box.has-high {
            border-color: #dc2626;
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        }

        .flow-box.has-medium {
            border-color: #f59e0b;
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
        }

        .flow-box.has-low {
            border-color: #059669;
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
        }

        .flow-id {
            font-size: 9px;
            font-weight: 700;
            color: var(--accent-blue);
            background: white;
            padding: 2px 6px;
            border-radius: 3px;
            margin-bottom: 4px;
            display: inline-block;
        }

        .flow-name {
            font-size: 9px;
            font-weight: 600;
            color: var(--text-primary);
            line-height: 1.3;
        }

        .flow-count {
            position: absolute;
            top: -8px;
            right: -8px;
            min-width: 20px;
            height: 20px;
            background: var(--primary-dark);
            color: white;
            border-radius: 10px;
            font-size: 9px;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 5px;
        }

        .flow-count.high { background: #dc2626; }
        .flow-count.medium { background: #f59e0b; }

        .flow-arrow {
            color: var(--border-medium);
            font-size: 16px;
            margin: 0 2px;
            align-self: center;
        }

        .flow-legend {
            display: flex;
            gap: 16px;
            margin-top: 16px;
            padding-top: 12px;
            border-top: 1px solid var(--border-light);
            font-size: 10px;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .legend-color {
            width: 14px;
            height: 14px;
            border-radius: 3px;
            border: 2px solid;
        }

        .legend-color.high { border-color: #dc2626; background: #fee2e2; }
        .legend-color.medium { border-color: #f59e0b; background: #fef3c7; }
        .legend-color.low { border-color: #059669; background: #d1fae5; }
        .legend-color.none { border-color: var(--border-medium); background: #f1f5f9; }

        /* Data Tables */
        .data-table-wrapper {
            overflow-x: auto;
            margin: 16px 0;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11px;
        }

        .data-table th {
            background: var(--primary-dark);
            color: white;
            font-weight: 600;
            text-align: left;
            padding: 8px 10px;
            font-size: 9px;
            letter-spacing: 0.3px;
            text-transform: uppercase;
            position: sticky;
            top: 0;
        }

        .data-table td {
            padding: 8px 10px;
            border-bottom: 1px solid var(--border-light);
            vertical-align: top;
        }

        .data-table tbody tr:hover {
            background: #f0f9ff;
        }

        .data-table tbody tr:nth-child(even) {
            background: var(--bg-light);
        }

        /* Badges */
        .rating {
            display: inline-flex;
            align-items: center;
            padding: 2px 6px;
            border-radius: 10px;
            font-size: 9px;
            font-weight: 700;
            text-transform: uppercase;
        }

        .rating-critical { background: #fee2e2; color: #991b1b; }
        .rating-medium { background: #fef3c7; color: #92400e; }
        .rating-high { background: #dcfce7; color: #166534; }

        .rating-indicator {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            margin-right: 4px;
        }

        .rating-critical .rating-indicator { background: #dc2626; }
        .rating-medium .rating-indicator { background: #f59e0b; }
        .rating-high .rating-indicator { background: #22c55e; }

        .type-badge {
            display: inline-block;
            padding: 1px 6px;
            border-radius: 3px;
            font-size: 9px;
            background: var(--bg-light);
            color: var(--text-secondary);
        }

        .source-badge {
            display: inline-block;
            padding: 1px 5px;
            border-radius: 3px;
            font-size: 8px;
            font-weight: 600;
            background: var(--primary-dark);
            color: white;
        }

        .process-ref {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: 700;
            background: var(--accent-blue);
            color: white;
            text-decoration: none;
        }

        .process-ref:hover {
            background: var(--primary-blue);
        }

        .details-cell {
            font-size: 10px;
            color: var(--text-muted);
            line-height: 1.4;
        }

        /* Category Section */
        .category-section {
            background: white;
            border: 1px solid var(--border-light);
            border-radius: 6px;
            margin: 20px 0;
            overflow: hidden;
        }

        .category-header {
            display: flex;
            align-items: center;
            padding: 16px;
            background: var(--bg-light);
            border-bottom: 1px solid var(--border-light);
        }

        .category-icon {
            font-size: 24px;
            margin-right: 12px;
        }

        .category-info { flex: 1; }

        .category-title {
            font-family: 'Source Serif Pro', serif;
            font-size: 16px;
            font-weight: 600;
            color: var(--primary-dark);
            margin: 0;
        }

        .category-desc {
            font-size: 11px;
            color: var(--text-muted);
            margin: 2px 0 0 0;
        }

        .category-stats {
            display: flex;
            gap: 6px;
        }

        .stat-badge {
            padding: 3px 8px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: 600;
        }

        .stat-high { background: #fee2e2; color: #991b1b; }
        .stat-medium { background: #fef3c7; color: #92400e; }
        .stat-low { background: #dcfce7; color: #166534; }
        .stat-total { background: var(--primary-dark); color: white; }

        /* Category Nav */
        .category-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
            margin: 16px 0;
            padding: 12px;
            background: var(--bg-light);
            border-radius: 6px;
        }

        .cat-nav-item {
            padding: 6px 10px;
            background: white;
            border: 1px solid var(--border-light);
            border-radius: 15px;
            font-size: 10px;
            color: var(--text-primary);
            text-decoration: none;
            transition: all 0.2s;
        }

        .cat-nav-item:hover {
            background: var(--accent-blue);
            color: white;
            border-color: var(--accent-blue);
        }

        /* Opinion Box */
        .opinion-box {
            background: white;
            border: 2px solid var(--primary-blue);
            padding: 24px;
            margin: 24px 0;
            position: relative;
        }

        .opinion-box::before {
            content: '';
            position: absolute;
            top: -2px;
            left: 24px;
            right: 24px;
            height: 3px;
            background: var(--accent-gold);
        }

        .opinion-type {
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            color: var(--accent-gold);
            margin-bottom: 10px;
        }

        .opinion-text {
            font-family: 'Source Serif Pro', serif;
            font-size: 14px;
            line-height: 1.7;
            color: var(--primary-dark);
        }

        /* Signature */
        .signature-block {
            margin-top: 40px;
            padding-top: 24px;
            border-top: 1px solid var(--border-medium);
        }

        .signature-line {
            width: 200px;
            border-bottom: 1px solid var(--text-primary);
            margin-bottom: 6px;
            padding-bottom: 40px;
        }

        .signature-name {
            font-weight: 700;
            color: var(--primary-dark);
            font-size: 13px;
        }

        .signature-title {
            font-size: 11px;
            color: var(--text-muted);
        }

        .signature-date {
            margin-top: 16px;
            font-size: 11px;
            color: var(--text-muted);
        }

        /* Back to top */
        .back-to-top {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 40px;
            height: 40px;
            background: var(--primary-dark);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            box-shadow: 0 3px 12px rgba(0,0,0,0.2);
            z-index: 999;
        }

        .back-to-top.visible { opacity: 1; visibility: visible; }
        .back-to-top:hover { background: var(--accent-blue); transform: translateY(-2px); }

        @media (max-width: 1000px) {
            .sidebar { display: none; }
            .main-content { margin-left: 0; }
            .dashboard-grid { grid-template-columns: repeat(2, 1fr); }
            .flowchart { justify-content: center; }
        }
    </style>
</head>
<body>
'''

# Sidebar
html_content += '''
    <nav class="sidebar">
        <div class="sidebar-header">
            <div class="firm-logo">NXSYS Advisory</div>
            <div class="report-title-sidebar">SAP Assessment Report</div>
        </div>
        <div class="nav-section">
            <div class="nav-section-title">Report</div>
            <a href="#cover" class="nav-item active"><span class="nav-item-number">-</span>Cover</a>
            <a href="#executive-summary" class="nav-item"><span class="nav-item-number">1</span>Executive Summary</a>
            <a href="#process-flows" class="nav-item"><span class="nav-item-number">2</span>Process Flow Charts</a>
            <a href="#recommendations" class="nav-item"><span class="nav-item-number">3</span>Recommendations</a>
            <a href="#opinion" class="nav-item"><span class="nav-item-number">4</span>Opinion</a>
        </div>
        <div class="nav-section">
            <div class="nav-section-title">Detailed Findings</div>
'''

# Add category nav items
icons = {'quality': 'D1', 'production': 'D2', 'feed': 'D3', 'livestock': 'D4', 'sales': 'D5',
         'inventory': 'D6', 'costing': 'D7', 'integration': 'D8', 'manual': 'D9', 'performance': 'D10', 'other': 'D11'}
cat_names = {'quality': 'Quality', 'production': 'Production', 'feed': 'Feed', 'livestock': 'Livestock',
             'sales': 'Sales', 'inventory': 'Inventory', 'costing': 'Costing', 'integration': 'Integration',
             'manual': 'Manual', 'performance': 'Performance', 'other': 'Other'}

for cat in ['quality', 'production', 'feed', 'livestock', 'sales', 'inventory', 'costing', 'integration', 'manual', 'performance', 'other']:
    if cat in by_category:
        html_content += f'<a href="#appendix-{cat}" class="nav-item"><span class="nav-item-number">{icons[cat]}</span>{cat_names[cat]}</a>\n'

html_content += '''
        </div>
    </nav>
'''

# Cover
html_content += '''
    <main class="main-content">
        <section id="cover" class="cover-section">
            <div class="cover-firm-name">NXSYS Advisory Services</div>
            <h1 class="cover-title">SAP System & Process Assessment Report</h1>
            <p class="cover-subtitle">With Process Flow Analysis for Emirates Rawabi Group</p>
            <div class="cover-meta">
                <div class="cover-meta-item">
                    <label>Report Date</label>
                    <span>January 27, 2026</span>
                </div>
                <div class="cover-meta-item">
                    <label>Engagement</label>
                    <span>Jan 22-26, 2026</span>
                </div>
                <div class="cover-meta-item">
                    <label>Report No.</label>
                    <span>NXSYS-2026-ARG-003</span>
                </div>
            </div>
            <div class="cover-classification">Confidential</div>
        </section>

        <div class="content-wrapper">
'''

# Executive Summary
html_content += f'''
            <section id="executive-summary" class="page-break">
                <div class="section-header">
                    <div class="section-number">Section One</div>
                    <h2 class="section-title">Executive Summary</h2>
                </div>

                <p>This report presents findings from our SAP assessment across Emirates Rawabi Group. Each finding is mapped to specific process steps in the entity flow charts for clear traceability.</p>

                <div class="dashboard-grid">
                    <div class="dash-card">
                        <div class="dash-card-value">{len(all_findings):,}</div>
                        <div class="dash-card-label">Total Findings</div>
                    </div>
                    <div class="dash-card critical">
                        <div class="dash-card-value">{high_count}</div>
                        <div class="dash-card-label">High Risk</div>
                    </div>
                    <div class="dash-card warning">
                        <div class="dash-card-value">{medium_count}</div>
                        <div class="dash-card-label">Medium Risk</div>
                    </div>
                    <div class="dash-card success">
                        <div class="dash-card-value">{low_count}</div>
                        <div class="dash-card-label">Low Risk</div>
                    </div>
                </div>

                <div class="opinion-box">
                    <div class="opinion-type">Assessment Opinion</div>
                    <p class="opinion-text">The current SAP implementation <strong>does not adequately support</strong> dairy and poultry requirements. We recommend <strong>S/4HANA with industry solutions</strong>.</p>
                </div>
            </section>
'''

# Process Flow Charts Section
html_content += '''
            <section id="process-flows" class="page-break">
                <div class="section-header">
                    <div class="section-number">Section Two</div>
                    <h2 class="section-title">Process Flow Charts</h2>
                </div>

                <p>The following flow charts represent the key business processes for each entity. Each step is numbered and color-coded based on the severity of findings. Click on any step to navigate to related findings.</p>
'''

# Generate flowchart for each entity
for source_code, flow_data in process_flows.items():
    html_content += f'''
                <div class="flowchart-container" id="flow-{source_code}">
                    <div class="flowchart-title">{flow_data['name']}</div>
                    <div class="flowchart">
'''

    for i, (step_id, step_name, _) in enumerate(flow_data['steps']):
        counts = step_counts.get(step_id, {'high': 0, 'medium': 0, 'low': 0, 'total': 0})
        total = counts['total']

        # Determine box class based on highest severity
        box_class = ''
        count_class = ''
        if counts['high'] > 0:
            box_class = 'has-high'
            count_class = 'high'
        elif counts['medium'] > 0:
            box_class = 'has-medium'
            count_class = 'medium'
        elif counts['low'] > 0:
            box_class = 'has-low'

        # Add arrow between steps (except for first)
        if i > 0:
            html_content += '<span class="flow-arrow">&#8594;</span>'

        html_content += f'''
                        <div class="flow-step">
                            <div class="flow-box {box_class}" onclick="document.getElementById('findings-{step_id}').scrollIntoView({{behavior: 'smooth'}})">
                                <span class="flow-id">{step_id}</span>
                                <div class="flow-name">{step_name}</div>
                                {f'<span class="flow-count {count_class}">{total}</span>' if total > 0 else ''}
                            </div>
                        </div>
'''

    html_content += '''
                    </div>
                    <div class="flow-legend">
                        <div class="legend-item"><div class="legend-color high"></div> High Risk Findings</div>
                        <div class="legend-item"><div class="legend-color medium"></div> Medium Risk</div>
                        <div class="legend-item"><div class="legend-color low"></div> Low Risk</div>
                        <div class="legend-item"><div class="legend-color none"></div> No Findings</div>
                    </div>
                </div>
'''

html_content += '''
            </section>
'''

# Recommendations
html_content += '''
            <section id="recommendations" class="page-break">
                <div class="section-header">
                    <div class="section-number">Section Three</div>
                    <h2 class="section-title">Recommendations</h2>
                </div>

                <h4>Priority 1: Industry-Specific SAP Modules</h4>
                <div class="data-table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Module</th>
                                <th>Entity</th>
                                <th>Process Steps Affected</th>
                                <th>Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>SAP PP-PI</strong></td>
                                <td>ARDC</td>
                                <td>PP-02 to PP-10</td>
                                <td>Process Industries for dairy with recipe management</td>
                            </tr>
                            <tr>
                                <td><strong>SAP Livestock</strong></td>
                                <td>ENF, LIWA</td>
                                <td>PF-01 to PF-09</td>
                                <td>Flock tracking, biological assets, FCR</td>
                            </tr>
                            <tr>
                                <td><strong>SAP MSG</strong></td>
                                <td>ENF</td>
                                <td>PF-10 to PF-12</td>
                                <td>Meat processing, carcass splitting</td>
                            </tr>
                            <tr>
                                <td><strong>SAP QM</strong></td>
                                <td>All</td>
                                <td>PP-02, PP-07, PF-13</td>
                                <td>Quality management with inspection lots</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
'''

# Opinion
html_content += '''
            <section id="opinion" class="page-break">
                <div class="section-header">
                    <div class="section-number">Section Four</div>
                    <h2 class="section-title">Opinion</h2>
                </div>

                <div class="opinion-box">
                    <div class="opinion-type">Independent Assessor's Opinion</div>
                    <p class="opinion-text">
                        Based on <strong>1,831 findings</strong> mapped across 35 process steps, the current SAP ECC implementation <strong>does not adequately support</strong> Emirates Rawabi Group's operational requirements.
                    </p>
                    <br>
                    <p class="opinion-text">
                        We recommend a <strong>Greenfield S/4HANA implementation</strong> with industry-specific solutions.
                    </p>
                </div>

                <div class="signature-block">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                        <div>
                            <div class="signature-line"></div>
                            <div class="signature-name">Engagement Partner</div>
                            <div class="signature-title">NXSYS Advisory Services</div>
                        </div>
                        <div>
                            <div class="signature-line"></div>
                            <div class="signature-name">Technical Reviewer</div>
                            <div class="signature-title">NXSYS Advisory Services</div>
                        </div>
                    </div>
                    <div class="signature-date">Dubai, UAE | January 27, 2026</div>
                </div>
            </section>
'''

# Navigate to detailed findings
html_content += '''
            <section id="detailed-findings-nav">
                <div class="section-header">
                    <div class="section-number">Appendices</div>
                    <h2 class="section-title">Detailed Findings by Category</h2>
                </div>
                <p>Navigate to detailed findings organized by functional category. Each finding includes a process reference linking to the flow charts above.</p>
                <div class="category-nav">
'''

for cat, findings in sorted(by_category.items(), key=lambda x: -len(x[1])):
    if len(findings) > 0:
        title = category_meta.get(cat, (cat.title(), ''))[0]
        html_content += f'<a href="#appendix-{cat}" class="cat-nav-item">{title} ({len(findings)})</a>\n'

html_content += '''
                </div>
            </section>
'''

# Generate category appendices with process references
cat_icons = {
    'quality': '&#128300;', 'production': '&#127981;', 'feed': '&#127806;', 'livestock': '&#128020;',
    'sales': '&#128666;', 'inventory': '&#128230;', 'costing': '&#128176;', 'integration': '&#128268;',
    'manual': '&#128221;', 'performance': '&#9889;', 'other': '&#128203;'
}

for cat, findings in sorted(by_category.items(), key=lambda x: -len(x[1])):
    if len(findings) == 0:
        continue

    title, desc = category_meta.get(cat, (cat.title(), ''))
    high = len([f for f in findings if f['risk'] == 'high'])
    med = len([f for f in findings if f['risk'] == 'medium'])
    low = len([f for f in findings if f['risk'] == 'low'])
    icon = cat_icons.get(cat, '&#128203;')

    html_content += f'''
            <section id="appendix-{cat}" class="page-break">
                <div class="category-section">
                    <div class="category-header">
                        <div class="category-icon">{icon}</div>
                        <div class="category-info">
                            <h4 class="category-title">{title}</h4>
                            <p class="category-desc">{desc}</p>
                        </div>
                        <div class="category-stats">
                            <span class="stat-badge stat-high">{high} High</span>
                            <span class="stat-badge stat-medium">{med} Med</span>
                            <span class="stat-badge stat-low">{low} Low</span>
                            <span class="stat-badge stat-total">{len(findings)}</span>
                        </div>
                    </div>
                    <div class="data-table-wrapper">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th style="width: 5%">ID</th>
                                    <th style="width: 6%">Process</th>
                                    <th style="width: 6%">Source</th>
                                    <th style="width: 20%">Finding</th>
                                    <th style="width: 8%">Type</th>
                                    <th style="width: 6%">Risk</th>
                                    <th style="width: 49%">Details</th>
                                </tr>
                            </thead>
                            <tbody>
'''

    for f in findings:
        risk_class = 'rating-critical' if f['risk'] == 'high' else ('rating-medium' if f['risk'] == 'medium' else 'rating-high')
        risk_label = 'High' if f['risk'] == 'high' else ('Medium' if f['risk'] == 'medium' else 'Low')
        details = f.get('details', '')[:200]
        details = details.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;') + ('...' if len(f.get('details', '')) > 200 else '')
        topic = f['topic'][:60].replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        process_ref = f.get('process_ref', 'N/A')

        html_content += f'''
                                <tr id="findings-{process_ref}">
                                    <td><strong>{f['id']}</strong></td>
                                    <td><a href="#flow-{f['source_code']}" class="process-ref">{process_ref}</a></td>
                                    <td><span class="source-badge">{f['source_code']}</span></td>
                                    <td>{topic}</td>
                                    <td><span class="type-badge">{f['type'].replace('_', ' ').title()}</span></td>
                                    <td><span class="rating {risk_class}"><span class="rating-indicator"></span>{risk_label}</span></td>
                                    <td class="details-cell">{details}</td>
                                </tr>
'''

    html_content += '''
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
'''

# Close HTML
html_content += '''
        </div>
    </main>

    <button class="back-to-top" id="backToTop">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    </button>

    <script>
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 400);
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                const target = document.getElementById(item.getAttribute('href').substring(1));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    </script>
</body>
</html>
'''

# Write file
with open('Emirates_Rawabi_Group_Final_Report_with_Flowcharts.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print("Report generated: Emirates_Rawabi_Group_Final_Report_with_Flowcharts.html")
print(f"Total findings: {len(all_findings)}")
print(f"Process steps mapped: {len(step_counts)}")

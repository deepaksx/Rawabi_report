# -*- coding: utf-8 -*-
import json
import sys
from collections import defaultdict

sys.stdout.reconfigure(encoding='utf-8')

# Load findings
with open('../all_findings.json', 'r', encoding='utf-8') as f:
    all_findings = json.load(f)

# Process flows
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

# Categorize findings
category_keywords = {
    'Quality Management': ['quality', 'qm', 'haccp', 'inspection', 'testing', 'lab', 'certificate', 'compliance'],
    'Production Planning': ['production', 'manufacturing', 'bom', 'mrp', 'planning', 'scheduling', 'pp-pi', 'recipe'],
    'Feed Management': ['feed', 'fcr', 'silo', 'nutrition', 'tanker'],
    'Livestock & Biological': ['livestock', 'flock', 'biological', 'bird', 'chick', 'doc', 'poultry', 'mortality', 'hatchery'],
    'Sales & Distribution': ['sales', 'van', 'route', 'distribution', 'customer', 'pricing', 'invoice', 'order'],
    'Inventory & Traceability': ['inventory', 'stock', 'warehouse', 'batch', 'traceability', 'shelf-life', 'fefo'],
    'Costing & Finance': ['cost', 'costing', 'variance', 'budget', 'price', 'margin', 'profit'],
    'System Integration': ['integration', 'interface', 'sensor', 'machine', 'automation'],
    'Manual Processes': ['manual', 'excel', 'paper', 'workaround', 'spreadsheet'],
    'System Performance': ['performance', 'report', 'slow', 'delay']
}

def categorize(f):
    combined = (f['topic'] + ' ' + f.get('details', '')).lower()
    for cat, keywords in category_keywords.items():
        for kw in keywords:
            if kw in combined:
                return cat
    return 'Other'

def map_to_step(f):
    source = f['source_code']
    combined = (f['topic'] + ' ' + f.get('details', '')).lower()
    best_match, best_score = None, 0

    if source in process_flows:
        for step_id, step_name, keywords in process_flows[source]['steps']:
            score = sum(3 if kw in f['topic'].lower() else 1 for kw in keywords if kw in combined)
            if score > best_score:
                best_score, best_match = score, (step_id, step_name)

    if best_score < 2:
        for src, flow in process_flows.items():
            for step_id, step_name, keywords in flow['steps']:
                score = sum(3 if kw in f['topic'].lower() else 1 for kw in keywords if kw in combined)
                if score > best_score:
                    best_score, best_match = score, (step_id, step_name)

    return (best_match, best_score) if best_score >= 2 else (None, 0)

# Process all findings
for f in all_findings:
    f['category'] = categorize(f)
    match, score = map_to_step(f)
    f['process_ref'] = match[0] if match else None
    f['process_name'] = match[1] if match else None
    f['match_score'] = score

# Separate mapped and orphan
mapped = [f for f in all_findings if f['process_ref']]
orphans = [f for f in all_findings if not f['process_ref']]

# Group by step
by_step = defaultdict(list)
for f in mapped:
    by_step[f['process_ref']].append(f)

# Sort within steps
for step in by_step:
    by_step[step].sort(key=lambda x: (0 if x['risk']=='high' else 1 if x['risk']=='medium' else 2))

# Calculate all stats
total = len(all_findings)
high = len([f for f in all_findings if f['risk'] == 'high'])
medium = len([f for f in all_findings if f['risk'] == 'medium'])
low = len([f for f in all_findings if f['risk'] == 'low'])

by_source = defaultdict(lambda: {'total': 0, 'high': 0, 'medium': 0, 'low': 0})
by_type = defaultdict(lambda: {'total': 0, 'high': 0, 'medium': 0, 'low': 0})
by_category = defaultdict(lambda: {'total': 0, 'high': 0, 'medium': 0, 'low': 0})

for f in all_findings:
    by_source[f['source_code']]['total'] += 1
    by_source[f['source_code']][f['risk']] += 1
    by_type[f['type']]['total'] += 1
    by_type[f['type']][f['risk']] += 1
    by_category[f['category']]['total'] += 1
    by_category[f['category']][f['risk']] += 1

step_stats = {}
for step_id, findings in by_step.items():
    step_stats[step_id] = {
        'total': len(findings),
        'high': len([f for f in findings if f['risk'] == 'high']),
        'medium': len([f for f in findings if f['risk'] == 'medium']),
        'low': len([f for f in findings if f['risk'] == 'low'])
    }

# Critical findings (top 10 high risk)
critical_findings = sorted([f for f in all_findings if f['risk'] == 'high'],
                          key=lambda x: -x.get('match_score', 0))[:10]

# Prepare findings for panel (simplified)
findings_by_step = {}
for step_id, findings in by_step.items():
    findings_by_step[step_id] = [{
        'id': f['id'],
        'topic': f['topic'][:100],
        'type': f['type'],
        'risk': f['risk'],
        'details': f.get('details', '')[:400],
        'source': f['source_code'],
        'category': f['category']
    } for f in findings]

# Prepare orphan findings
orphan_by_type = defaultdict(list)
for f in orphans:
    orphan_by_type[f['type']].append({
        'id': f['id'],
        'topic': f['topic'][:100],
        'type': f['type'],
        'risk': f['risk'],
        'details': f.get('details', '')[:300],
        'source': f['source_code'],
        'category': f['category']
    })

# Build data object
data = {
    'meta': {
        'reportDate': 'January 27, 2026',
        'reportNumber': 'NXSYS-2026-ARG-005',
        'engagementPeriod': 'January 22-26, 2026',
        'client': 'Emirates Rawabi Group'
    },
    'summary': {
        'total': total,
        'high': high,
        'medium': medium,
        'low': low,
        'mapped': len(mapped),
        'orphan': len(orphans),
        'entities': 4,
        'processSteps': 35
    },
    'bySource': dict(by_source),
    'byType': dict(by_type),
    'byCategory': dict(by_category),
    'processFlows': {k: {'name': v['name'], 'short': v['short'], 'color': v['color'],
                        'steps': [(s[0], s[1]) for s in v['steps']]}
                    for k, v in process_flows.items()},
    'stepStats': step_stats,
    'findingsByStep': findings_by_step,
    'orphanFindings': dict(orphan_by_type),
    'criticalFindings': [{
        'id': f['id'],
        'topic': f['topic'],
        'type': f['type'],
        'details': f.get('details', '')[:500],
        'source': f['source_code'],
        'category': f['category'],
        'process_ref': f.get('process_ref'),
        'process_name': f.get('process_name')
    } for f in critical_findings]
}

# Write JS data file
with open('../js/data.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated report data\n')
    f.write('const REPORT_DATA = ')
    json.dump(data, f, indent=2, ensure_ascii=False)
    f.write(';\n')

print(f"Data generated: {total} findings")
print(f"  Mapped: {len(mapped)}, Orphan: {len(orphans)}")
print(f"  Categories: {len(by_category)}")

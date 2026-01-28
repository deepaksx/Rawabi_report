# -*- coding: utf-8 -*-
import json
import sys
from collections import defaultdict

sys.stdout.reconfigure(encoding='utf-8')

# Load findings
with open('all_findings.json', 'r', encoding='utf-8') as f:
    all_findings = json.load(f)

# Categorize findings
by_type = defaultdict(list)
by_risk = defaultdict(list)
by_source = defaultdict(list)

# Define categories for grouping
category_mapping = {
    'quality': ['quality', 'qm', 'haccp', 'inspection', 'testing', 'compliance'],
    'production': ['production', 'manufacturing', 'bom', 'mrp', 'planning', 'scheduling'],
    'feed': ['feed', 'fcr', 'silo', 'nutrition'],
    'livestock': ['livestock', 'flock', 'biological', 'bird', 'chick', 'doc', 'poultry', 'mortality'],
    'sales': ['sales', 'van', 'route', 'distribution', 'customer', 'pricing', 'invoice'],
    'inventory': ['inventory', 'stock', 'warehouse', 'batch', 'traceability', 'shelf-life', 'fefo'],
    'costing': ['cost', 'costing', 'variance', 'budget', 'price'],
    'integration': ['integration', 'interface', 'sensor', 'machine', 'automation'],
    'manual': ['manual', 'excel', 'paper', 'workaround', 'spreadsheet'],
    'performance': ['performance', 'report', 'slow', 'delay']
}

def categorize_finding(finding):
    topic_lower = finding['topic'].lower()
    details_lower = finding['details'].lower() if finding['details'] else ''
    combined = topic_lower + ' ' + details_lower

    for category, keywords in category_mapping.items():
        for keyword in keywords:
            if keyword in combined:
                return category
    return 'other'

# Assign categories
for f in all_findings:
    f['category'] = categorize_finding(f)
    by_type[f['type']].append(f)
    by_risk[f['risk']].append(f)
    by_source[f['source_code']].append(f)

by_category = defaultdict(list)
for f in all_findings:
    by_category[f['category']].append(f)

# Generate HTML for findings table
def generate_findings_table(findings, show_source=True, limit=None):
    if limit:
        findings = findings[:limit]

    html = '''<div class="data-table-wrapper">
    <table class="data-table findings-table">
        <thead>
            <tr>
                <th style="width: 8%">ID</th>'''
    if show_source:
        html += '<th style="width: 10%">Source</th>'
    html += '''<th style="width: 25%">Finding</th>
                <th style="width: 10%">Type</th>
                <th style="width: 10%">Risk</th>
                <th style="width: 37%">Details</th>
            </tr>
        </thead>
        <tbody>'''

    for f in findings:
        risk_class = 'rating-critical' if f['risk'] == 'high' else ('rating-medium' if f['risk'] == 'medium' else 'rating-high')
        risk_label = 'High' if f['risk'] == 'high' else ('Medium' if f['risk'] == 'medium' else 'Low')

        type_icon = {
            'process': '⚙️',
            'pain_point': '⚠️',
            'requirement': '📋',
            'compliance': '⚖️',
            'integration': '🔗',
            'workaround': '🔧',
            'performance': '📊',
            'risk': '🚨',
            'other': '📌'
        }.get(f['type'], '📌')

        details_short = f['details'][:200] + '...' if len(f['details']) > 200 else f['details']

        html += f'''
            <tr id="{f['id']}">
                <td><strong>{f['id']}</strong></td>'''
        if show_source:
            html += f'<td><span class="source-badge">{f["source_code"]}</span></td>'
        html += f'''<td>{f['topic'][:80]}</td>
                <td><span class="type-badge type-{f['type']}">{type_icon} {f['type'].replace('_', ' ').title()}</span></td>
                <td><span class="rating {risk_class}"><span class="rating-indicator"></span>{risk_label}</span></td>
                <td class="details-cell">{details_short}</td>
            </tr>'''

    html += '''
        </tbody>
    </table>
</div>'''
    return html

# Generate category sections
def generate_category_section(category_name, findings, category_id):
    category_titles = {
        'quality': ('Quality Management', '⚗️', 'Findings related to quality control, testing, HACCP, and compliance'),
        'production': ('Production Planning', '🏭', 'Findings related to manufacturing, MRP, BOMs, and scheduling'),
        'feed': ('Feed Management', '🌾', 'Findings related to feed procurement, FCR, and nutrition'),
        'livestock': ('Livestock & Biological Assets', '🐔', 'Findings related to flock management, DOCs, and biological asset accounting'),
        'sales': ('Sales & Distribution', '🚚', 'Findings related to van sales, routing, pricing, and customer management'),
        'inventory': ('Inventory & Traceability', '📦', 'Findings related to batch management, warehouse, and traceability'),
        'costing': ('Costing & Finance', '💰', 'Findings related to product costing, variances, and budgeting'),
        'integration': ('System Integration', '🔌', 'Findings related to interfaces, sensors, and automation'),
        'manual': ('Manual Processes & Workarounds', '📝', 'Findings related to Excel-based processes and paper documentation'),
        'performance': ('System Performance', '⚡', 'Findings related to system speed, reporting, and capacity'),
        'other': ('Other Findings', '📋', 'Additional findings not categorized above')
    }

    title, icon, desc = category_titles.get(category_name, (category_name.title(), '📌', ''))

    high_count = len([f for f in findings if f['risk'] == 'high'])
    medium_count = len([f for f in findings if f['risk'] == 'medium'])
    low_count = len([f for f in findings if f['risk'] == 'low'])

    html = f'''
            <div class="category-section" id="appendix-{category_id}">
                <div class="category-header">
                    <div class="category-icon">{icon}</div>
                    <div class="category-info">
                        <h4 class="category-title">{title}</h4>
                        <p class="category-desc">{desc}</p>
                    </div>
                    <div class="category-stats">
                        <span class="stat-badge stat-high">{high_count} High</span>
                        <span class="stat-badge stat-medium">{medium_count} Medium</span>
                        <span class="stat-badge stat-low">{low_count} Low</span>
                        <span class="stat-badge stat-total">{len(findings)} Total</span>
                    </div>
                </div>
                {generate_findings_table(findings, show_source=True, limit=None)}
            </div>'''
    return html

# Sort categories by count
sorted_categories = sorted(by_category.items(), key=lambda x: -len(x[1]))

# Generate all category sections
category_sections = ''
category_nav = ''
for i, (cat, findings) in enumerate(sorted_categories):
    if len(findings) > 0:
        category_sections += generate_category_section(cat, findings, cat)
        category_titles = {
            'quality': 'Quality Management',
            'production': 'Production Planning',
            'feed': 'Feed Management',
            'livestock': 'Livestock & Biological',
            'sales': 'Sales & Distribution',
            'inventory': 'Inventory & Traceability',
            'costing': 'Costing & Finance',
            'integration': 'System Integration',
            'manual': 'Manual Processes',
            'performance': 'System Performance',
            'other': 'Other Findings'
        }
        category_nav += f'<a href="#appendix-{cat}" class="cat-nav-item">{category_titles.get(cat, cat.title())} ({len(findings)})</a>\n'

# Save the generated sections
output = {
    'category_sections': category_sections,
    'category_nav': category_nav,
    'total_findings': len(all_findings),
    'high_risk': len([f for f in all_findings if f['risk'] == 'high']),
    'medium_risk': len([f for f in all_findings if f['risk'] == 'medium']),
    'low_risk': len([f for f in all_findings if f['risk'] == 'low']),
    'by_type': {t: len(findings) for t, findings in by_type.items()},
    'by_source': {s: len(findings) for s, findings in by_source.items()}
}

with open('generated_sections.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print("Generated sections saved to generated_sections.json")
print(f"Categories: {[cat for cat, _ in sorted_categories]}")

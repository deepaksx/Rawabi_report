# -*- coding: utf-8 -*-
import json
import sys
from collections import defaultdict

sys.stdout.reconfigure(encoding='utf-8')

# Load findings
with open('all_findings.json', 'r', encoding='utf-8') as f:
    all_findings = json.load(f)

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

# Assign categories
for f in all_findings:
    f['category'] = categorize_finding(f)

by_category = defaultdict(list)
for f in all_findings:
    by_category[f['category']].append(f)

# Sort by risk within each category
for cat in by_category:
    by_category[cat].sort(key=lambda x: (0 if x['risk'] == 'high' else (1 if x['risk'] == 'medium' else 2)))

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

# Start building HTML
html_start = '''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emirates Rawabi Group - SAP System & Process Assessment Report</title>
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
            --info: #1e40af;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, sans-serif;
            background: var(--bg-cream);
            color: var(--text-primary);
            line-height: 1.6;
            font-size: 14px;
        }

        @media print {
            body { background: white; font-size: 10pt; }
            .sidebar, .no-print, .back-to-top { display: none !important; }
            .main-content { margin-left: 0 !important; }
            .page-break { page-break-before: always; }
            .category-section { page-break-inside: avoid; }
        }

        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 260px;
            height: 100vh;
            background: var(--primary-dark);
            color: white;
            overflow-y: auto;
            z-index: 1000;
        }

        .sidebar-header {
            padding: 24px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .firm-logo {
            font-size: 10px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--accent-gold);
            margin-bottom: 8px;
        }

        .report-title-sidebar {
            font-family: 'Source Serif Pro', Georgia, serif;
            font-size: 16px;
            font-weight: 600;
            line-height: 1.4;
        }

        .nav-section {
            padding: 12px 0;
        }

        .nav-section-title {
            font-size: 9px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.5);
            padding: 8px 20px;
        }

        .nav-item {
            display: flex;
            align-items: center;
            padding: 10px 20px;
            color: rgba(255,255,255,0.8);
            text-decoration: none;
            font-size: 13px;
            transition: all 0.2s ease;
            border-left: 3px solid transparent;
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
            width: 22px;
            height: 22px;
            background: rgba(255,255,255,0.1);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
            font-weight: 600;
            margin-right: 10px;
        }

        .main-content {
            margin-left: 260px;
            min-height: 100vh;
        }

        .cover-section {
            background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-blue) 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 60px;
            position: relative;
        }

        .cover-firm-name {
            font-size: 12px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: var(--accent-gold);
            margin-bottom: 40px;
        }

        .cover-title {
            font-family: 'Source Serif Pro', Georgia, serif;
            font-size: 42px;
            font-weight: 700;
            line-height: 1.2;
            margin-bottom: 20px;
            max-width: 650px;
        }

        .cover-subtitle {
            font-size: 22px;
            font-weight: 300;
            color: rgba(255,255,255,0.8);
            margin-bottom: 40px;
            max-width: 550px;
        }

        .cover-meta {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            max-width: 700px;
            margin-top: 40px;
            padding-top: 40px;
            border-top: 1px solid rgba(255,255,255,0.2);
        }

        .cover-meta-item label {
            font-size: 9px;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: rgba(255,255,255,0.5);
            display: block;
            margin-bottom: 6px;
        }

        .cover-meta-item span {
            font-size: 15px;
            font-weight: 600;
        }

        .cover-classification {
            position: absolute;
            bottom: 30px;
            right: 60px;
            padding: 6px 14px;
            background: rgba(184, 134, 11, 0.2);
            border: 1px solid var(--accent-gold);
            color: var(--accent-gold);
            font-size: 10px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }

        .content-wrapper {
            max-width: 1100px;
            margin: 0 auto;
            padding: 60px 40px;
        }

        section {
            margin-bottom: 60px;
            scroll-margin-top: 30px;
        }

        .section-header {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid var(--primary-blue);
        }

        .section-number {
            font-size: 11px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--accent-copper);
            margin-bottom: 6px;
        }

        .section-title {
            font-family: 'Source Serif Pro', Georgia, serif;
            font-size: 28px;
            font-weight: 700;
            color: var(--primary-dark);
        }

        h3 {
            font-family: 'Source Serif Pro', Georgia, serif;
            font-size: 20px;
            font-weight: 600;
            color: var(--primary-dark);
            margin: 30px 0 15px;
        }

        h4 {
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
            margin: 24px 0 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        p {
            margin-bottom: 14px;
            color: var(--text-secondary);
        }

        /* Dashboard Cards */
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 16px;
            margin: 24px 0;
        }

        .dash-card {
            background: white;
            border: 1px solid var(--border-light);
            border-radius: 8px;
            padding: 20px;
            text-align: center;
        }

        .dash-card-value {
            font-family: 'Source Serif Pro', Georgia, serif;
            font-size: 32px;
            font-weight: 700;
            color: var(--primary-dark);
        }

        .dash-card-label {
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 4px;
        }

        .dash-card.critical .dash-card-value { color: #dc2626; }
        .dash-card.warning .dash-card-value { color: #f59e0b; }
        .dash-card.success .dash-card-value { color: #059669; }

        /* Category Navigation */
        .category-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 24px 0;
            padding: 16px;
            background: var(--bg-light);
            border-radius: 8px;
        }

        .cat-nav-item {
            padding: 8px 14px;
            background: white;
            border: 1px solid var(--border-light);
            border-radius: 20px;
            font-size: 12px;
            color: var(--text-primary);
            text-decoration: none;
            transition: all 0.2s ease;
        }

        .cat-nav-item:hover {
            background: var(--accent-blue);
            color: white;
            border-color: var(--accent-blue);
        }

        /* Category Section */
        .category-section {
            background: white;
            border: 1px solid var(--border-light);
            border-radius: 8px;
            margin: 24px 0;
            overflow: hidden;
        }

        .category-header {
            display: flex;
            align-items: center;
            padding: 20px;
            background: var(--bg-light);
            border-bottom: 1px solid var(--border-light);
        }

        .category-icon {
            font-size: 28px;
            margin-right: 16px;
        }

        .category-info {
            flex: 1;
        }

        .category-title {
            font-family: 'Source Serif Pro', Georgia, serif;
            font-size: 18px;
            font-weight: 600;
            color: var(--primary-dark);
            margin: 0;
        }

        .category-desc {
            font-size: 13px;
            color: var(--text-muted);
            margin: 4px 0 0 0;
        }

        .category-stats {
            display: flex;
            gap: 8px;
        }

        .stat-badge {
            padding: 4px 10px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: 600;
        }

        .stat-high { background: #fee2e2; color: #991b1b; }
        .stat-medium { background: #fef3c7; color: #92400e; }
        .stat-low { background: #dcfce7; color: #166534; }
        .stat-total { background: var(--primary-dark); color: white; }

        /* Data Tables */
        .data-table-wrapper {
            overflow-x: auto;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
        }

        .data-table th {
            background: var(--primary-dark);
            color: white;
            font-weight: 600;
            text-align: left;
            padding: 10px 12px;
            font-size: 10px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            position: sticky;
            top: 0;
        }

        .data-table td {
            padding: 10px 12px;
            border-bottom: 1px solid var(--border-light);
            vertical-align: top;
        }

        .data-table tbody tr:hover {
            background: #f0f9ff;
        }

        .data-table tbody tr:nth-child(even) {
            background: var(--bg-light);
        }

        .data-table tbody tr:nth-child(even):hover {
            background: #f0f9ff;
        }

        /* Rating Badges */
        .rating {
            display: inline-flex;
            align-items: center;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.3px;
            text-transform: uppercase;
        }

        .rating-critical { background: #fee2e2; color: #991b1b; }
        .rating-medium { background: #fef3c7; color: #92400e; }
        .rating-high { background: #dcfce7; color: #166534; }

        .rating-indicator {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 5px;
        }

        .rating-critical .rating-indicator { background: #dc2626; }
        .rating-medium .rating-indicator { background: #f59e0b; }
        .rating-high .rating-indicator { background: #22c55e; }

        /* Type Badges */
        .type-badge {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: 500;
            background: var(--bg-light);
            color: var(--text-secondary);
        }

        .type-process { background: #dbeafe; color: #1e40af; }
        .type-pain_point { background: #fef3c7; color: #92400e; }
        .type-requirement { background: #e0e7ff; color: #3730a3; }
        .type-compliance { background: #fce7f3; color: #9d174d; }
        .type-integration { background: #d1fae5; color: #065f46; }
        .type-workaround { background: #fee2e2; color: #991b1b; }
        .type-performance { background: #f3e8ff; color: #6b21a8; }

        /* Source Badge */
        .source-badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 9px;
            font-weight: 600;
            background: var(--primary-dark);
            color: white;
        }

        .details-cell {
            font-size: 11px;
            color: var(--text-muted);
            line-height: 1.5;
        }

        /* Charts */
        .chart-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            margin: 24px 0;
        }

        .chart-card {
            background: white;
            border: 1px solid var(--border-light);
            border-radius: 8px;
            padding: 20px;
        }

        .chart-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--primary-dark);
            margin-bottom: 16px;
        }

        .bar-chart {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .bar-row {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .bar-label {
            width: 100px;
            font-size: 11px;
            color: var(--text-secondary);
            text-align: right;
        }

        .bar-track {
            flex: 1;
            height: 20px;
            background: var(--bg-light);
            border-radius: 4px;
            overflow: hidden;
        }

        .bar-fill {
            height: 100%;
            border-radius: 4px;
            display: flex;
            align-items: center;
            padding-left: 8px;
            font-size: 10px;
            font-weight: 600;
            color: white;
        }

        .bar-fill.high { background: linear-gradient(90deg, #dc2626, #ef4444); }
        .bar-fill.medium { background: linear-gradient(90deg, #f59e0b, #fbbf24); }
        .bar-fill.low { background: linear-gradient(90deg, #059669, #10b981); }
        .bar-fill.blue { background: linear-gradient(90deg, #2563eb, #3b82f6); }

        /* Pie Chart (CSS only) */
        .pie-legend {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            margin-top: 16px;
        }

        .pie-legend-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 11px;
        }

        .pie-legend-color {
            width: 12px;
            height: 12px;
            border-radius: 2px;
        }

        /* Opinion Box */
        .opinion-box {
            background: white;
            border: 2px solid var(--primary-blue);
            padding: 30px;
            margin: 30px 0;
            position: relative;
        }

        .opinion-box::before {
            content: '';
            position: absolute;
            top: -2px;
            left: 30px;
            right: 30px;
            height: 4px;
            background: var(--accent-gold);
        }

        .opinion-type {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: var(--accent-gold);
            margin-bottom: 12px;
        }

        .opinion-text {
            font-family: 'Source Serif Pro', Georgia, serif;
            font-size: 16px;
            line-height: 1.8;
            color: var(--primary-dark);
        }

        /* Callout */
        .callout {
            padding: 20px 24px;
            margin: 24px 0;
            border-radius: 4px;
            position: relative;
        }

        .callout::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 4px;
            border-radius: 4px 0 0 4px;
        }

        .callout-critical {
            background: #fee2e2;
            border: 1px solid #dc2626;
        }

        .callout-critical::before { background: #dc2626; }

        .callout-title {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin-bottom: 8px;
            color: #991b1b;
        }

        /* Signature */
        .signature-block {
            margin-top: 50px;
            padding-top: 30px;
            border-top: 1px solid var(--border-medium);
        }

        .signature-line {
            width: 220px;
            border-bottom: 1px solid var(--text-primary);
            margin-bottom: 8px;
            padding-bottom: 50px;
        }

        .signature-name {
            font-weight: 700;
            color: var(--primary-dark);
        }

        .signature-title {
            font-size: 13px;
            color: var(--text-muted);
        }

        .signature-date {
            margin-top: 20px;
            font-size: 13px;
            color: var(--text-muted);
        }

        /* Back to top */
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 44px;
            height: 44px;
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
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(0,0,0,0.2);
            z-index: 999;
        }

        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .back-to-top:hover {
            background: var(--accent-blue);
            transform: translateY(-3px);
        }

        @media (max-width: 1200px) {
            .sidebar { display: none; }
            .main-content { margin-left: 0; }
            .dashboard-grid { grid-template-columns: repeat(2, 1fr); }
            .chart-container { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
'''

# Navigation sidebar
sidebar_html = '''
    <nav class="sidebar">
        <div class="sidebar-header">
            <div class="firm-logo">NXSYS Advisory</div>
            <div class="report-title-sidebar">SAP Assessment Report</div>
        </div>
        <div class="nav-section">
            <div class="nav-section-title">Report Sections</div>
            <a href="#cover" class="nav-item active"><span class="nav-item-number">-</span>Cover</a>
            <a href="#executive-summary" class="nav-item"><span class="nav-item-number">1</span>Executive Summary</a>
            <a href="#findings-dashboard" class="nav-item"><span class="nav-item-number">2</span>Findings Dashboard</a>
            <a href="#recommendations" class="nav-item"><span class="nav-item-number">3</span>Recommendations</a>
            <a href="#opinion" class="nav-item"><span class="nav-item-number">4</span>Opinion</a>
        </div>
        <div class="nav-section">
            <div class="nav-section-title">Detailed Findings</div>
            <a href="#appendix-quality" class="nav-item"><span class="nav-item-number">D1</span>Quality Mgmt</a>
            <a href="#appendix-production" class="nav-item"><span class="nav-item-number">D2</span>Production</a>
            <a href="#appendix-feed" class="nav-item"><span class="nav-item-number">D3</span>Feed Mgmt</a>
            <a href="#appendix-livestock" class="nav-item"><span class="nav-item-number">D4</span>Livestock</a>
            <a href="#appendix-sales" class="nav-item"><span class="nav-item-number">D5</span>Sales & Dist</a>
            <a href="#appendix-inventory" class="nav-item"><span class="nav-item-number">D6</span>Inventory</a>
            <a href="#appendix-costing" class="nav-item"><span class="nav-item-number">D7</span>Costing</a>
            <a href="#appendix-integration" class="nav-item"><span class="nav-item-number">D8</span>Integration</a>
            <a href="#appendix-manual" class="nav-item"><span class="nav-item-number">D9</span>Manual Proc</a>
            <a href="#appendix-performance" class="nav-item"><span class="nav-item-number">D10</span>Performance</a>
        </div>
    </nav>
'''

# Calculate stats
high_count = len([f for f in all_findings if f['risk'] == 'high'])
medium_count = len([f for f in all_findings if f['risk'] == 'medium'])
low_count = len([f for f in all_findings if f['risk'] == 'low'])

by_source = defaultdict(int)
by_type = defaultdict(int)
for f in all_findings:
    by_source[f['source_code']] += 1
    by_type[f['type']] += 1

# Cover section
cover_html = '''
    <main class="main-content">
        <section id="cover" class="cover-section">
            <div class="cover-firm-name">NXSYS Advisory Services</div>
            <h1 class="cover-title">SAP System & Process Assessment Report</h1>
            <p class="cover-subtitle">Comprehensive Findings Analysis for Emirates Rawabi Group</p>
            <div class="cover-meta">
                <div class="cover-meta-item">
                    <label>Report Date</label>
                    <span>January 27, 2026</span>
                </div>
                <div class="cover-meta-item">
                    <label>Engagement Period</label>
                    <span>January 22-26, 2026</span>
                </div>
                <div class="cover-meta-item">
                    <label>Report Number</label>
                    <span>NXSYS-2026-ARG-002</span>
                </div>
            </div>
            <div class="cover-classification">Confidential - Management Use Only</div>
        </section>

        <div class="content-wrapper">
'''

# Executive Summary
exec_summary = f'''
            <section id="executive-summary" class="page-break">
                <div class="section-header">
                    <div class="section-number">Section One</div>
                    <h2 class="section-title">Executive Summary</h2>
                </div>

                <p>This report presents the comprehensive findings from our SAP system and business process assessment across Emirates Rawabi Group entities including Al Rawabi Dairy Company (ARDC), Emirates National Foods LLC (ENF), Greenfields for Feeds LLC (GF), and Al Salwa (LIWA).</p>

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
                    <p class="opinion-text">The current SAP ECC implementation <strong>does not adequately support</strong> dairy and poultry industry requirements. We recommend a <strong>Greenfield S/4HANA implementation</strong> with industry-specific solutions.</p>
                </div>
            </section>
'''

# Findings Dashboard
findings_dashboard = f'''
            <section id="findings-dashboard" class="page-break">
                <div class="section-header">
                    <div class="section-number">Section Two</div>
                    <h2 class="section-title">Findings Dashboard</h2>
                </div>

                <h3>Distribution by Risk Level</h3>
                <div class="chart-container">
                    <div class="chart-card">
                        <div class="chart-title">Risk Distribution</div>
                        <div class="bar-chart">
                            <div class="bar-row">
                                <span class="bar-label">High Risk</span>
                                <div class="bar-track">
                                    <div class="bar-fill high" style="width: {high_count/len(all_findings)*100:.1f}%">{high_count}</div>
                                </div>
                            </div>
                            <div class="bar-row">
                                <span class="bar-label">Medium Risk</span>
                                <div class="bar-track">
                                    <div class="bar-fill medium" style="width: {medium_count/len(all_findings)*100:.1f}%">{medium_count}</div>
                                </div>
                            </div>
                            <div class="bar-row">
                                <span class="bar-label">Low Risk</span>
                                <div class="bar-track">
                                    <div class="bar-fill low" style="width: {low_count/len(all_findings)*100:.1f}%">{low_count}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chart-card">
                        <div class="chart-title">Distribution by Source Entity</div>
                        <div class="bar-chart">
                            <div class="bar-row">
                                <span class="bar-label">ENF & GF</span>
                                <div class="bar-track">
                                    <div class="bar-fill blue" style="width: {by_source.get("ENF-GF", 0)/len(all_findings)*100:.1f}%">{by_source.get("ENF-GF", 0)}</div>
                                </div>
                            </div>
                            <div class="bar-row">
                                <span class="bar-label">ARDC - PP</span>
                                <div class="bar-track">
                                    <div class="bar-fill blue" style="width: {by_source.get("ARDC-PP", 0)/len(all_findings)*100:.1f}%">{by_source.get("ARDC-PP", 0)}</div>
                                </div>
                            </div>
                            <div class="bar-row">
                                <span class="bar-label">ARDC - SD</span>
                                <div class="bar-track">
                                    <div class="bar-fill blue" style="width: {by_source.get("ARDC-SD", 0)/len(all_findings)*100:.1f}%">{by_source.get("ARDC-SD", 0)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <h3>Distribution by Finding Type</h3>
                <div class="chart-card">
                    <div class="bar-chart">
'''

for ftype, count in sorted(by_type.items(), key=lambda x: -x[1])[:8]:
    pct = count/len(all_findings)*100
    findings_dashboard += f'''
                        <div class="bar-row">
                            <span class="bar-label">{ftype.replace('_', ' ').title()}</span>
                            <div class="bar-track">
                                <div class="bar-fill blue" style="width: {pct:.1f}%">{count}</div>
                            </div>
                        </div>
'''

findings_dashboard += '''
                    </div>
                </div>

                <h3>Navigate to Detailed Findings by Category</h3>
                <div class="category-nav">
'''

for cat, findings in sorted(by_category.items(), key=lambda x: -len(x[1])):
    if len(findings) > 0:
        title = category_meta.get(cat, (cat.title(), ''))[0]
        findings_dashboard += f'<a href="#appendix-{cat}" class="cat-nav-item">{title} ({len(findings)})</a>\n'

findings_dashboard += '''
                </div>
            </section>
'''

# Recommendations section
recommendations = '''
            <section id="recommendations" class="page-break">
                <div class="section-header">
                    <div class="section-number">Section Three</div>
                    <h2 class="section-title">Key Recommendations</h2>
                </div>

                <div class="callout callout-critical">
                    <div class="callout-title">Priority 1: Implement S/4HANA with Industry Solutions</div>
                    <p>Deploy SAP S/4HANA with PP-PI for dairy, Livestock Management for poultry, MSG for meat processing, and full QM activation.</p>
                </div>

                <h4>Recommended SAP Modules</h4>
                <div class="data-table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Module</th>
                                <th>Entity</th>
                                <th>Purpose</th>
                                <th>Related Findings</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>SAP PP-PI</strong></td>
                                <td>ARDC</td>
                                <td>Process Industries for dairy with recipe management and yield tracking</td>
                                <td>Quality, Production categories</td>
                            </tr>
                            <tr>
                                <td><strong>SAP Livestock Management</strong></td>
                                <td>ENF, LIWA</td>
                                <td>Flock tracking, biological asset accounting, FCR monitoring</td>
                                <td>Livestock, Feed categories</td>
                            </tr>
                            <tr>
                                <td><strong>SAP MSG</strong></td>
                                <td>ENF</td>
                                <td>Meat & Fish Management for carcass splitting and catch-weight</td>
                                <td>Production, Costing categories</td>
                            </tr>
                            <tr>
                                <td><strong>SAP QM</strong></td>
                                <td>All</td>
                                <td>Quality Management with inspection lots and certificates</td>
                                <td>Quality category</td>
                            </tr>
                            <tr>
                                <td><strong>SAP IBP</strong></td>
                                <td>All</td>
                                <td>Integrated Business Planning for demand-driven planning</td>
                                <td>Production, Sales categories</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
'''

# Opinion section
opinion = '''
            <section id="opinion" class="page-break">
                <div class="section-header">
                    <div class="section-number">Section Four</div>
                    <h2 class="section-title">Opinion</h2>
                </div>

                <div class="opinion-box">
                    <div class="opinion-type">Independent Assessor's Opinion</div>
                    <p class="opinion-text">
                        Based on our assessment procedures and the <strong>1,831 findings</strong> documented (including <strong>845 high-risk items</strong>), the current SAP ECC implementation across Emirates Rawabi Group entities <strong>does not adequately support</strong> the operational requirements of modern dairy and poultry businesses.
                    </p>
                    <br>
                    <p class="opinion-text">
                        We recommend that management proceed with a <strong>Greenfield S/4HANA implementation</strong> incorporating industry-specific solutions as the most viable path to address identified gaps.
                    </p>
                </div>

                <div class="signature-block">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
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
                    <div class="signature-date">
                        Dubai, United Arab Emirates<br>
                        January 27, 2026
                    </div>
                </div>
            </section>
'''

# Generate category appendix sections
def generate_category_appendix(cat, findings, cat_id):
    title, desc = category_meta.get(cat, (cat.title(), ''))

    high = len([f for f in findings if f['risk'] == 'high'])
    med = len([f for f in findings if f['risk'] == 'medium'])
    low = len([f for f in findings if f['risk'] == 'low'])

    icons = {
        'quality': '🔬', 'production': '🏭', 'feed': '🌾', 'livestock': '🐔',
        'sales': '🚚', 'inventory': '📦', 'costing': '💰', 'integration': '🔌',
        'manual': '📝', 'performance': '⚡', 'other': '📋'
    }
    icon = icons.get(cat, '📋')

    html = f'''
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
                            <span class="stat-badge stat-medium">{med} Medium</span>
                            <span class="stat-badge stat-low">{low} Low</span>
                            <span class="stat-badge stat-total">{len(findings)} Total</span>
                        </div>
                    </div>
                    <div class="data-table-wrapper">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th style="width: 6%">ID</th>
                                    <th style="width: 8%">Source</th>
                                    <th style="width: 22%">Finding</th>
                                    <th style="width: 10%">Type</th>
                                    <th style="width: 8%">Risk</th>
                                    <th style="width: 46%">Details</th>
                                </tr>
                            </thead>
                            <tbody>
'''

    type_icons = {
        'process': '⚙️', 'pain_point': '⚠️', 'requirement': '📋', 'compliance': '⚖️',
        'integration': '🔗', 'workaround': '🔧', 'performance': '📊', 'risk': '🚨', 'other': '📌'
    }

    for f in findings:
        risk_class = 'rating-critical' if f['risk'] == 'high' else ('rating-medium' if f['risk'] == 'medium' else 'rating-high')
        risk_label = 'High' if f['risk'] == 'high' else ('Medium' if f['risk'] == 'medium' else 'Low')
        type_icon = type_icons.get(f['type'], '📌')
        details = f['details'][:250] + '...' if len(f['details']) > 250 else f['details']
        # Escape HTML
        details = details.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        topic = f['topic'][:70].replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

        html += f'''
                                <tr>
                                    <td><strong>{f['id']}</strong></td>
                                    <td><span class="source-badge">{f['source_code']}</span></td>
                                    <td>{topic}</td>
                                    <td><span class="type-badge type-{f['type']}">{type_icon} {f['type'].replace('_', ' ').title()}</span></td>
                                    <td><span class="rating {risk_class}"><span class="rating-indicator"></span>{risk_label}</span></td>
                                    <td class="details-cell">{details}</td>
                                </tr>
'''

    html += '''
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
'''
    return html

# Generate all appendix sections
appendix_sections = ''
for cat, findings in sorted(by_category.items(), key=lambda x: -len(x[1])):
    if len(findings) > 0:
        appendix_sections += generate_category_appendix(cat, findings, cat)

# Closing HTML
closing_html = '''
        </div>
    </main>

    <button class="back-to-top" id="backToTop">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    </button>

    <script>
        const backToTop = document.getElementById('backToTop');
        const navItems = document.querySelectorAll('.nav-item');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    </script>
</body>
</html>
'''

# Combine all parts
full_html = html_start + sidebar_html + cover_html + exec_summary + findings_dashboard + recommendations + opinion + appendix_sections + closing_html

# Write the final report
with open('Emirates_Rawabi_Group_Complete_Audit_Report.html', 'w', encoding='utf-8') as f:
    f.write(full_html)

print(f"Report generated: Emirates_Rawabi_Group_Complete_Audit_Report.html")
print(f"Total findings: {len(all_findings)}")
print(f"Categories: {len(by_category)}")

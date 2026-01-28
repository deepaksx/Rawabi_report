# -*- coding: utf-8 -*-
import openpyxl
import sys
from collections import defaultdict

sys.stdout.reconfigure(encoding='utf-8')

files = [
    ('ARDC PP Final report.xlsx', 'ARDC PP (Production Planning)'),
    ('ARDC Sales Final report.xlsx', 'ARDC Sales (Sales & Distribution)'),
    ('ENF and GF final report.xlsx', 'ENF/GF (Poultry Operations)')
]

# Collect and categorize findings
all_findings = []
categories = defaultdict(list)
types_count = defaultdict(int)

for filepath, name in files:
    wb = openpyxl.load_workbook(filepath)
    findings = list(wb['Additional Findings'].iter_rows(min_row=6, values_only=True))

    for r in findings:
        if r[0] is not None and r[2] == 'high':
            finding = {
                'source': name,
                'topic': str(r[0])[:100] if r[0] else '',
                'type': str(r[1]) if r[1] else '',
                'details': str(r[3])[:500] if r[3] else '',
                'sap_rec': str(r[5])[:300] if r[5] else '',
            }
            all_findings.append(finding)
            types_count[finding['type']] += 1

# Print categorized summary
print("=" * 80)
print("FINDINGS SUMMARY BY TYPE")
print("=" * 80)
for ftype, count in sorted(types_count.items(), key=lambda x: -x[1]):
    print(f"  {ftype}: {count} findings")

# Group unique topics
print("\n" + "=" * 80)
print("KEY FINDINGS BY CATEGORY (Deduplicated)")
print("=" * 80)

# Quality Management
print("\n### QUALITY MANAGEMENT ISSUES ###")
qm = [f for f in all_findings if 'quality' in f['topic'].lower() or 'qm' in f['topic'].lower()]
seen = set()
for f in qm[:15]:
    key = f['topic'][:40]
    if key not in seen:
        print(f"- [{f['type']}] {f['topic']}")
        seen.add(key)

# Production Planning
print("\n### PRODUCTION PLANNING ISSUES ###")
pp = [f for f in all_findings if 'production' in f['topic'].lower() or 'mrp' in f['topic'].lower() or 'planning' in f['topic'].lower()]
seen = set()
for f in pp[:15]:
    key = f['topic'][:40]
    if key not in seen:
        print(f"- [{f['type']}] {f['topic']}")
        seen.add(key)

# Feed Management
print("\n### FEED MANAGEMENT ISSUES ###")
feed = [f for f in all_findings if 'feed' in f['topic'].lower() or 'fcr' in f['topic'].lower()]
seen = set()
for f in feed[:10]:
    key = f['topic'][:40]
    if key not in seen:
        print(f"- [{f['type']}] {f['topic']}")
        seen.add(key)

# Biological Assets
print("\n### BIOLOGICAL ASSET ACCOUNTING ISSUES ###")
bio = [f for f in all_findings if 'biological' in f['topic'].lower() or 'livestock' in f['topic'].lower() or 'flock' in f['topic'].lower()]
seen = set()
for f in bio[:10]:
    key = f['topic'][:40]
    if key not in seen:
        print(f"- [{f['type']}] {f['topic']}")
        seen.add(key)

# Compliance
print("\n### COMPLIANCE & TRACEABILITY ISSUES ###")
comp = [f for f in all_findings if 'compliance' in f['type'].lower() or 'traceability' in f['topic'].lower() or 'haccp' in f['topic'].lower()]
seen = set()
for f in comp[:10]:
    key = f['topic'][:40]
    if key not in seen:
        print(f"- [{f['type']}] {f['topic']}")
        seen.add(key)

# Integration
print("\n### SYSTEM INTEGRATION ISSUES ###")
intg = [f for f in all_findings if 'integration' in f['type'].lower() or 'integration' in f['topic'].lower() or 'manual' in f['topic'].lower()]
seen = set()
for f in intg[:10]:
    key = f['topic'][:40]
    if key not in seen:
        print(f"- [{f['type']}] {f['topic']}")
        seen.add(key)

# Costing
print("\n### COSTING & FINANCE ISSUES ###")
cost = [f for f in all_findings if 'cost' in f['topic'].lower() or 'pricing' in f['topic'].lower() or 'costing' in f['topic'].lower()]
seen = set()
for f in cost[:10]:
    key = f['topic'][:40]
    if key not in seen:
        print(f"- [{f['type']}] {f['topic']}")
        seen.add(key)

# Van Sales
print("\n### VAN SALES & DISTRIBUTION ISSUES ###")
van = [f for f in all_findings if 'van' in f['topic'].lower() or 'route' in f['topic'].lower() or 'sales' in f['topic'].lower()]
seen = set()
for f in van[:10]:
    key = f['topic'][:40]
    if key not in seen:
        print(f"- [{f['type']}] {f['topic']}")
        seen.add(key)

# Workarounds
print("\n### WORKAROUNDS & MANUAL PROCESSES ###")
work = [f for f in all_findings if f['type'] == 'workaround' or 'excel' in f['topic'].lower() or 'manual' in f['topic'].lower()]
seen = set()
for f in work[:10]:
    key = f['topic'][:40]
    if key not in seen:
        print(f"- [{f['type']}] {f['topic']}")
        seen.add(key)

print("\n" + "=" * 80)
print("END OF SUMMARY")
print("=" * 80)

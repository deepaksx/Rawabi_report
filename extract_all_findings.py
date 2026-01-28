# -*- coding: utf-8 -*-
import openpyxl
import sys
import json
from collections import defaultdict

sys.stdout.reconfigure(encoding='utf-8')

files = [
    ('ARDC PP Final report.xlsx', 'ARDC-PP', 'Al Rawabi Dairy - Production Planning'),
    ('ARDC Sales Final report.xlsx', 'ARDC-SD', 'Al Rawabi Dairy - Sales & Distribution'),
    ('ENF and GF final report.xlsx', 'ENF-GF', 'ENF & GF - Poultry Operations')
]

all_findings = []
finding_id = 1

for filepath, code, name in files:
    wb = openpyxl.load_workbook(filepath)
    ws = wb['Additional Findings']

    for row in ws.iter_rows(min_row=6, values_only=True):
        if row[0] is not None:
            topic = str(row[0]) if row[0] else ''
            ftype = str(row[1]) if row[1] else 'process'
            risk = str(row[2]) if row[2] else 'medium'
            details = str(row[3]) if row[3] else ''
            sap_analysis = str(row[4]) if row[4] else ''
            sap_rec = str(row[5]) if row[5] else ''
            best_practice = str(row[6]) if row[6] else ''

            all_findings.append({
                'id': f'F-{finding_id:04d}',
                'source_code': code,
                'source_name': name,
                'topic': topic[:100],
                'type': ftype,
                'risk': risk,
                'details': details[:500],
                'sap_analysis': sap_analysis[:400],
                'recommendation': sap_rec[:400],
                'best_practice': best_practice[:300]
            })
            finding_id += 1

# Save to JSON
with open('all_findings.json', 'w', encoding='utf-8') as f:
    json.dump(all_findings, f, indent=2, ensure_ascii=False)

print(f"Total findings extracted: {len(all_findings)}")

# Count by category
by_type = defaultdict(list)
by_risk = defaultdict(list)
by_source = defaultdict(list)

for f in all_findings:
    by_type[f['type']].append(f)
    by_risk[f['risk']].append(f)
    by_source[f['source_code']].append(f)

print("\nBy Type:")
for t, items in sorted(by_type.items(), key=lambda x: -len(x[1])):
    print(f"  {t}: {len(items)}")

print("\nBy Risk:")
for r, items in sorted(by_risk.items(), key=lambda x: -len(x[1])):
    print(f"  {r}: {len(items)}")

print("\nBy Source:")
for s, items in sorted(by_source.items(), key=lambda x: -len(x[1])):
    print(f"  {s}: {len(items)}")

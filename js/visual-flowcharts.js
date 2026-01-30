/**
 * Visual Industry Flowcharts
 * Creates illustrated process flow diagrams with SVG icons
 */

// SVG Icons for process steps - More colorful and detailed
const PROCESS_ICONS = {
    // Dairy Industry Icons
    'milk-truck': `<svg viewBox="0 0 64 64">
        <rect fill="#2563eb" x="4" y="24" width="36" height="20" rx="3"/>
        <ellipse fill="#bfdbfe" cx="22" cy="34" rx="14" ry="8"/>
        <ellipse fill="#fff" cx="22" cy="32" rx="10" ry="5" opacity="0.6"/>
        <path fill="#1e40af" d="M40 24h12l8 10v10H40V24z"/>
        <rect fill="#93c5fd" x="44" y="28" width="8" height="6" rx="1"/>
        <circle fill="#1f2937" cx="14" cy="48" r="6"/><circle fill="#6b7280" cx="14" cy="48" r="3"/>
        <circle fill="#1f2937" cx="50" cy="48" r="6"/><circle fill="#6b7280" cx="50" cy="48" r="3"/>
    </svg>`,

    'milk-tank': `<svg viewBox="0 0 64 64">
        <ellipse fill="#d1d5db" cx="32" cy="14" rx="18" ry="6"/>
        <path fill="#e5e7eb" d="M14 14v34c0 4 8 8 18 8s18-4 18-8V14c0 4-8 8-18 8s-18-4-18-8z"/>
        <ellipse fill="#bfdbfe" cx="32" cy="32" rx="12" ry="5"/>
        <ellipse fill="#fff" cx="32" cy="30" rx="8" ry="3" opacity="0.7"/>
        <rect fill="#6b7280" x="28" y="4" width="8" height="8" rx="2"/>
        <rect fill="#3b82f6" x="30" y="52" width="4" height="6"/>
    </svg>`,

    'lab-test': `<svg viewBox="0 0 64 64">
        <path fill="#8b5cf6" d="M38 8H26v14L14 50c-1.5 3 1 6 4 6h28c3 0 5.5-3 4-6L38 22V8z"/>
        <rect fill="#e5e7eb" x="24" y="4" width="16" height="6" rx="2"/>
        <circle fill="#fbbf24" cx="24" cy="44" r="4"/>
        <circle fill="#34d399" cx="36" cy="40" r="3"/>
        <circle fill="#f472b6" cx="30" cy="48" r="3"/>
        <path fill="#c4b5fd" d="M20 36h24" stroke="#c4b5fd" stroke-width="2"/>
    </svg>`,

    'separator': `<svg viewBox="0 0 64 64">
        <rect fill="#9ca3af" x="18" y="10" width="28" height="44" rx="4"/>
        <rect fill="#d1d5db" x="22" y="14" width="20" height="36" rx="2"/>
        <circle fill="#3b82f6" cx="32" cy="32" r="10"/>
        <circle fill="#93c5fd" cx="32" cy="32" r="6"/>
        <circle fill="#fff" cx="32" cy="32" r="3"/>
        <rect fill="#6b7280" x="28" y="2" width="8" height="10" rx="2"/>
        <rect fill="#6b7280" x="28" y="52" width="8" height="10" rx="2"/>
        <path fill="#3b82f6" d="M32 22v-6M32 48v-6" stroke="#3b82f6" stroke-width="2"/>
    </svg>`,

    'processing': `<svg viewBox="0 0 64 64">
        <rect fill="#f3f4f6" x="6" y="18" width="52" height="28" rx="4"/>
        <rect fill="#2563eb" x="10" y="22" width="18" height="20" rx="2"/>
        <rect fill="#16a34a" x="32" y="22" width="22" height="20" rx="2"/>
        <circle fill="#bfdbfe" cx="19" cy="32" r="6"/>
        <circle fill="#fff" cx="19" cy="32" r="3"/>
        <rect fill="#bbf7d0" x="36" y="26" width="14" height="3" rx="1"/>
        <rect fill="#bbf7d0" x="36" y="31" width="14" height="3" rx="1"/>
        <rect fill="#bbf7d0" x="36" y="36" width="14" height="3" rx="1"/>
        <path fill="#f59e0b" d="M4 32h4M56 32h4" stroke="#f59e0b" stroke-width="3"/>
    </svg>`,

    'batch': `<svg viewBox="0 0 64 64">
        <rect fill="#e5e7eb" x="6" y="18" width="52" height="34" rx="4"/>
        <rect fill="#3b82f6" x="10" y="24" width="12" height="24" rx="2"/>
        <rect fill="#8b5cf6" x="26" y="24" width="12" height="24" rx="2"/>
        <rect fill="#ec4899" x="42" y="24" width="12" height="24" rx="2"/>
        <rect fill="#9ca3af" x="6" y="12" width="52" height="8" rx="2"/>
        <circle fill="#22c55e" cx="16" cy="8" r="4"/><circle fill="#fff" cx="16" cy="8" r="2"/>
        <circle fill="#ef4444" cx="32" cy="8" r="4"/><circle fill="#fff" cx="32" cy="8" r="2"/>
        <circle fill="#f59e0b" cx="48" cy="8" r="4"/><circle fill="#fff" cx="48" cy="8" r="2"/>
    </svg>`,

    'quality': `<svg viewBox="0 0 64 64">
        <circle fill="#22c55e" cx="32" cy="32" r="26"/>
        <circle fill="#16a34a" cx="32" cy="32" r="20"/>
        <path fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" d="M22 32l7 7 15-15"/>
        <circle fill="none" stroke="#bbf7d0" stroke-width="2" cx="32" cy="32" r="14"/>
    </svg>`,

    'packaging': `<svg viewBox="0 0 64 64">
        <rect fill="#3b82f6" x="10" y="14" width="44" height="40" rx="4"/>
        <rect fill="#fff" x="14" y="18" width="36" height="14" rx="2"/>
        <rect fill="#bfdbfe" x="18" y="22" width="28" height="6" rx="1"/>
        <rect fill="#93c5fd" x="18" y="36" width="28" height="14" rx="2"/>
        <path fill="#1e40af" d="M32 2v12" stroke="#1e40af" stroke-width="4"/>
        <path fill="#6b7280" d="M24 8h16" stroke="#6b7280" stroke-width="4"/>
    </svg>`,

    'warehouse': `<svg viewBox="0 0 64 64">
        <path fill="#6b7280" d="M6 26L32 10l26 16v30H6V26z"/>
        <path fill="#9ca3af" d="M10 28L32 14l22 14v26H10V28z"/>
        <rect fill="#60a5fa" x="14" y="32" width="14" height="22"/>
        <rect fill="#60a5fa" x="36" y="32" width="14" height="22"/>
        <rect fill="#fbbf24" x="18" y="40" width="6" height="14"/>
        <rect fill="#fbbf24" x="40" y="40" width="6" height="14"/>
        <polygon fill="#4b5563" points="32,6 6,24 6,22 32,4 58,22 58,24"/>
    </svg>`,

    'costing': `<svg viewBox="0 0 64 64">
        <circle fill="#16a34a" cx="32" cy="32" r="26"/>
        <circle fill="#22c55e" cx="32" cy="32" r="20"/>
        <text x="32" y="42" text-anchor="middle" fill="#fff" font-size="28" font-weight="bold">$</text>
        <circle fill="none" stroke="#bbf7d0" stroke-width="2" cx="32" cy="32" r="23" stroke-dasharray="4 2"/>
    </svg>`,

    // Sales & Distribution Icons
    'forecast': `<svg viewBox="0 0 64 64">
        <rect fill="#f8fafc" x="6" y="6" width="52" height="52" rx="6"/>
        <rect fill="#e2e8f0" x="10" y="10" width="44" height="44" rx="4"/>
        <path fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" d="M14 44l10-10 8 6 16-22"/>
        <circle fill="#ef4444" cx="14" cy="44" r="4"/>
        <circle fill="#f59e0b" cx="24" cy="34" r="4"/>
        <circle fill="#22c55e" cx="32" cy="40" r="4"/>
        <circle fill="#3b82f6" cx="48" cy="18" r="4"/>
        <path fill="none" stroke="#cbd5e1" stroke-width="1" d="M14 50h36M14 38h36M14 26h36"/>
    </svg>`,

    'orders': `<svg viewBox="0 0 64 64">
        <rect fill="#f8fafc" x="10" y="6" width="44" height="52" rx="4"/>
        <rect fill="#3b82f6" x="14" y="12" width="28" height="6" rx="2"/>
        <rect fill="#cbd5e1" x="14" y="22" width="36" height="4" rx="1"/>
        <rect fill="#cbd5e1" x="14" y="28" width="30" height="4" rx="1"/>
        <rect fill="#cbd5e1" x="14" y="34" width="34" height="4" rx="1"/>
        <rect fill="#22c55e" x="14" y="44" width="24" height="8" rx="3"/>
        <text x="26" y="51" fill="#fff" font-size="8" font-weight="bold">ORDER</text>
    </svg>`,

    'allocation': `<svg viewBox="0 0 64 64">
        <rect fill="#3b82f6" x="6" y="24" width="22" height="30" rx="4"/>
        <rect fill="#22c55e" x="36" y="24" width="22" height="30" rx="4"/>
        <rect fill="#bfdbfe" x="10" y="30" width="14" height="18" rx="2"/>
        <rect fill="#bbf7d0" x="40" y="30" width="14" height="18" rx="2"/>
        <rect fill="#f59e0b" x="22" y="6" width="20" height="14" rx="3"/>
        <path fill="#fbbf24" d="M28 32h8M32 28v8" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
        <path fill="none" stroke="#f59e0b" stroke-width="2" d="M32 20v8"/>
    </svg>`,

    'loading': `<svg viewBox="0 0 64 64">
        <rect fill="#6b7280" x="2" y="26" width="42" height="26" rx="3"/>
        <rect fill="#9ca3af" x="6" y="30" width="34" height="18" rx="2"/>
        <rect fill="#60a5fa" x="10" y="34" width="8" height="10" rx="1"/>
        <rect fill="#60a5fa" x="20" y="34" width="8" height="10" rx="1"/>
        <rect fill="#60a5fa" x="30" y="34" width="6" height="10" rx="1"/>
        <path fill="#2563eb" d="M44 26h12l8 14v12H44V26z"/>
        <rect fill="#bfdbfe" x="48" y="30" width="10" height="8" rx="1"/>
        <circle fill="#1f2937" cx="14" cy="56" r="6"/><circle fill="#9ca3af" cx="14" cy="56" r="3"/>
        <circle fill="#1f2937" cx="38" cy="56" r="6"/><circle fill="#9ca3af" cx="38" cy="56" r="3"/>
        <circle fill="#1f2937" cx="54" cy="56" r="5"/><circle fill="#9ca3af" cx="54" cy="56" r="2"/>
    </svg>`,

    'route': `<svg viewBox="0 0 64 64">
        <circle fill="#e0f2fe" cx="32" cy="32" r="28"/>
        <circle fill="#bfdbfe" cx="32" cy="32" r="22"/>
        <path fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 4" d="M14 48 Q32 14 50 48"/>
        <circle fill="#ef4444" cx="14" cy="48" r="6"/><circle fill="#fff" cx="14" cy="48" r="3"/>
        <circle fill="#22c55e" cx="32" cy="20" r="6"/><circle fill="#fff" cx="32" cy="20" r="3"/>
        <circle fill="#3b82f6" cx="50" cy="48" r="6"/><circle fill="#fff" cx="50" cy="48" r="3"/>
    </svg>`,

    'delivery': `<svg viewBox="0 0 64 64">
        <rect fill="#22c55e" x="4" y="20" width="36" height="28" rx="4"/>
        <rect fill="#bbf7d0" x="8" y="26" width="28" height="16" rx="2"/>
        <rect fill="#fff" x="12" y="30" width="20" height="8" rx="1"/>
        <path fill="#16a34a" d="M40 20h14l8 12v16H40V20z"/>
        <rect fill="#bbf7d0" x="44" y="24" width="10" height="8" rx="1"/>
        <circle fill="#1f2937" cx="16" cy="52" r="6"/><circle fill="#9ca3af" cx="16" cy="52" r="3"/>
        <circle fill="#1f2937" cx="52" cy="52" r="6"/><circle fill="#9ca3af" cx="52" cy="52" r="3"/>
        <path fill="#fbbf24" d="M22 34l4 2-4 2z"/>
    </svg>`,

    'returns': `<svg viewBox="0 0 64 64">
        <rect fill="#f59e0b" x="10" y="18" width="44" height="34" rx="6"/>
        <rect fill="#fef3c7" x="14" y="24" width="36" height="22" rx="3"/>
        <path fill="none" stroke="#d97706" stroke-width="4" stroke-linecap="round" d="M24 35h16"/>
        <path fill="none" stroke="#d97706" stroke-width="3" stroke-linecap="round" d="M18 42 Q32 52 46 42"/>
        <path fill="#d97706" d="M18 42l-4-4v8z"/>
    </svg>`,

    'settlement': `<svg viewBox="0 0 64 64">
        <rect fill="#f8fafc" x="6" y="10" width="52" height="44" rx="4"/>
        <rect fill="#3b82f6" x="10" y="14" width="28" height="6" rx="2"/>
        <rect fill="#22c55e" x="12" y="26" width="14" height="22" rx="2"/>
        <rect fill="#f59e0b" x="30" y="32" width="14" height="16" rx="2"/>
        <rect fill="#cbd5e1" x="10" y="48" width="44" height="4" rx="1"/>
        <text x="50" y="28" fill="#64748b" font-size="8" font-weight="bold">SAR</text>
    </svg>`,

    'credit': `<svg viewBox="0 0 64 64">
        <rect fill="#2563eb" x="6" y="14" width="52" height="36" rx="6"/>
        <rect fill="#1e40af" x="10" y="18" width="44" height="28" rx="4"/>
        <rect fill="#fbbf24" x="14" y="22" width="22" height="14" rx="2"/>
        <circle fill="#fff" cx="46" cy="38" r="8"/>
        <text x="46" y="42" text-anchor="middle" fill="#2563eb" font-size="12" font-weight="bold">$</text>
        <rect fill="#60a5fa" x="14" y="40" width="20" height="3" rx="1"/>
    </svg>`,

    'billing': `<svg viewBox="0 0 64 64">
        <rect fill="#f8fafc" x="10" y="6" width="44" height="52" rx="4"/>
        <rect fill="#3b82f6" x="14" y="10" width="36" height="10" rx="2"/>
        <rect fill="#e2e8f0" x="14" y="24" width="28" height="4" rx="1"/>
        <rect fill="#e2e8f0" x="14" y="30" width="24" height="4" rx="1"/>
        <rect fill="#e2e8f0" x="14" y="36" width="30" height="4" rx="1"/>
        <rect fill="#22c55e" x="14" y="44" width="36" height="10" rx="3"/>
        <text x="32" y="52" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">PAID</text>
    </svg>`,

    // Poultry Processing Icons
    'birds': `<svg viewBox="0 0 64 64">
        <ellipse fill="#fef3c7" cx="32" cy="38" rx="22" ry="14"/>
        <ellipse fill="#fde68a" cx="32" cy="36" rx="18" ry="10"/>
        <circle fill="#fef3c7" cx="32" cy="20" r="12"/>
        <circle fill="#fde68a" cx="32" cy="18" r="8"/>
        <path fill="#f97316" d="M28 20l4 5 4-5z"/>
        <circle fill="#1f2937" cx="27" cy="16" r="2"/>
        <circle fill="#1f2937" cx="37" cy="16" r="2"/>
        <ellipse fill="#dc2626" cx="32" cy="10" rx="4" ry="3"/>
        <path fill="#f97316" d="M22 52v8M32 52v8M42 52v8" stroke="#f97316" stroke-width="3" stroke-linecap="round"/>
    </svg>`,

    'slaughter': `<svg viewBox="0 0 64 64">
        <rect fill="#6b7280" x="6" y="14" width="52" height="38" rx="4"/>
        <rect fill="#e5e7eb" x="10" y="18" width="44" height="30" rx="2"/>
        <rect fill="#dc2626" x="16" y="28" width="32" height="10" rx="2"/>
        <path fill="none" stroke="#9ca3af" stroke-width="2" d="M16 6v10M32 6v10M48 6v10"/>
        <circle fill="#4b5563" cx="16" cy="6" r="4"/>
        <circle fill="#4b5563" cx="32" cy="6" r="4"/>
        <circle fill="#4b5563" cx="48" cy="6" r="4"/>
        <rect fill="#fecaca" x="20" y="30" width="8" height="6" rx="1"/>
        <rect fill="#fecaca" x="30" y="30" width="8" height="6" rx="1"/>
    </svg>`,

    'portioning': `<svg viewBox="0 0 64 64">
        <ellipse fill="#fed7aa" cx="32" cy="34" rx="26" ry="16"/>
        <ellipse fill="#fdba74" cx="32" cy="32" rx="22" ry="12"/>
        <path fill="none" stroke="#dc2626" stroke-width="3" stroke-linecap="round" d="M12 32h40"/>
        <path fill="none" stroke="#dc2626" stroke-width="3" stroke-linecap="round" d="M32 18v28"/>
        <rect fill="#9ca3af" x="52" y="24" width="8" height="18" rx="2"/>
        <rect fill="#6b7280" x="54" y="20" width="4" height="6"/>
    </svg>`,

    'fpp': `<svg viewBox="0 0 64 64">
        <rect fill="#6b7280" x="6" y="18" width="52" height="32" rx="4"/>
        <rect fill="#ef4444" x="10" y="22" width="18" height="24" rx="2"/>
        <rect fill="#f59e0b" x="32" y="22" width="22" height="24" rx="2"/>
        <circle fill="#fecaca" cx="19" cy="34" r="7"/>
        <circle fill="#fff" cx="19" cy="34" r="4"/>
        <rect fill="#fef3c7" x="36" y="28" width="14" height="4" rx="1"/>
        <rect fill="#fef3c7" x="36" y="34" width="14" height="4" rx="1"/>
        <rect fill="#fef3c7" x="36" y="40" width="14" height="4" rx="1"/>
    </svg>`,

    'inventory': `<svg viewBox="0 0 64 64">
        <rect fill="#4b5563" x="6" y="10" width="52" height="48" rx="4"/>
        <rect fill="#60a5fa" x="10" y="14" width="16" height="14" rx="2"/>
        <rect fill="#60a5fa" x="28" y="14" width="16" height="14" rx="2"/>
        <rect fill="#60a5fa" x="46" y="14" width="8" height="14" rx="2"/>
        <rect fill="#fbbf24" x="10" y="30" width="16" height="14" rx="2"/>
        <rect fill="#fbbf24" x="28" y="30" width="16" height="14" rx="2"/>
        <rect fill="#34d399" x="46" y="30" width="8" height="14" rx="2"/>
        <rect fill="#e5e7eb" x="10" y="48" width="44" height="6" rx="2"/>
        <rect fill="#9ca3af" x="14" y="50" width="36" height="2" rx="1"/>
    </svg>`,

    'sales': `<svg viewBox="0 0 64 64">
        <rect fill="#22c55e" x="8" y="22" width="28" height="32" rx="4"/>
        <rect fill="#bbf7d0" x="12" y="28" width="20" height="10" rx="2"/>
        <rect fill="#fff" x="14" y="30" width="16" height="6" rx="1"/>
        <rect fill="#3b82f6" x="38" y="14" width="20" height="40" rx="4"/>
        <rect fill="#bfdbfe" x="42" y="20" width="12" height="4" rx="1"/>
        <rect fill="#bfdbfe" x="42" y="28" width="12" height="4" rx="1"/>
        <rect fill="#bfdbfe" x="42" y="36" width="12" height="4" rx="1"/>
        <rect fill="#93c5fd" x="42" y="44" width="12" height="6" rx="1"/>
    </svg>`,

    // Farming & Feed Icons
    'feed-formula': `<svg viewBox="0 0 64 64">
        <rect fill="#f8fafc" x="8" y="6" width="48" height="52" rx="6"/>
        <rect fill="#e2e8f0" x="12" y="10" width="40" height="44" rx="4"/>
        <circle fill="#16a34a" cx="22" cy="24" r="8"/>
        <circle fill="#22c55e" cx="22" cy="24" r="5"/>
        <text x="22" y="27" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">C</text>
        <circle fill="#d97706" cx="42" cy="24" r="8"/>
        <circle fill="#f59e0b" cx="42" cy="24" r="5"/>
        <text x="42" y="27" text-anchor="middle" fill="#fff" font-size="8" font-weight="bold">P</text>
        <circle fill="#2563eb" cx="32" cy="42" r="10"/>
        <circle fill="#3b82f6" cx="32" cy="42" r="6"/>
        <text x="32" y="46" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">%</text>
        <path fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="3 2" d="M22 32v4M42 32v4"/>
    </svg>`,

    'feed-production': `<svg viewBox="0 0 64 64">
        <path fill="#16a34a" d="M8 6h48l-10 22H18L8 6z"/>
        <path fill="#22c55e" d="M12 8h40l-8 18H20L12 8z"/>
        <ellipse fill="#bbf7d0" cx="32" cy="14" rx="14" ry="4"/>
        <rect fill="#6b7280" x="14" y="28" width="36" height="28" rx="4"/>
        <rect fill="#9ca3af" x="18" y="32" width="28" height="20" rx="2"/>
        <rect fill="#d97706" x="22" y="38" width="20" height="10" rx="2"/>
        <rect fill="#f59e0b" x="26" y="40" width="12" height="6" rx="1"/>
        <circle fill="#374151" cx="18" cy="58" r="5"/><circle fill="#6b7280" cx="18" cy="58" r="2"/>
        <circle fill="#374151" cx="46" cy="58" r="5"/><circle fill="#6b7280" cx="46" cy="58" r="2"/>
        <path fill="#4b5563" d="M32 28v6" stroke="#4b5563" stroke-width="4"/>
    </svg>`,

    'farm-ops': `<svg viewBox="0 0 64 64">
        <rect fill="#86efac" x="4" y="52" width="56" height="8" rx="2"/>
        <path fill="#16a34a" d="M6 36L32 18l26 18v18H6V36z"/>
        <path fill="#22c55e" d="M10 38L32 22l22 16v16H10V38z"/>
        <rect fill="#d97706" x="24" y="42" width="16" height="16"/>
        <rect fill="#f59e0b" x="28" y="46" width="8" height="8"/>
        <rect fill="#60a5fa" x="12" y="42" width="8" height="8" rx="1"/>
        <rect fill="#93c5fd" x="14" y="44" width="4" height="4" rx="1"/>
        <rect fill="#60a5fa" x="44" y="42" width="8" height="8" rx="1"/>
        <rect fill="#93c5fd" x="46" y="44" width="4" height="4" rx="1"/>
        <circle fill="#fef3c7" cx="32" cy="32" r="4"/>
        <circle fill="#fbbf24" cx="32" cy="32" r="2"/>
        <polygon fill="#15803d" points="32,14 6,34 6,32 32,12 58,32 58,34"/>
    </svg>`,

    'feed-consumption': `<svg viewBox="0 0 64 64">
        <ellipse fill="#d97706" cx="20" cy="52" rx="14" ry="6"/>
        <ellipse fill="#f59e0b" cx="20" cy="50" rx="10" ry="4"/>
        <ellipse fill="#fbbf24" cx="20" cy="48" rx="6" ry="2"/>
        <ellipse fill="#d97706" cx="44" cy="52" rx="14" ry="6"/>
        <ellipse fill="#f59e0b" cx="44" cy="50" rx="10" ry="4"/>
        <ellipse fill="#fbbf24" cx="44" cy="48" rx="6" ry="2"/>
        <ellipse fill="#fef3c7" cx="20" cy="30" rx="10" ry="8"/>
        <ellipse fill="#fde68a" cx="20" cy="28" rx="7" ry="5"/>
        <circle fill="#fef3c7" cx="20" cy="18" r="6"/>
        <path fill="#f97316" d="M18 18l2 3 2-3z"/>
        <circle fill="#1f2937" cx="17" cy="16" r="1.5"/>
        <ellipse fill="#fef3c7" cx="44" cy="30" rx="10" ry="8"/>
        <ellipse fill="#fde68a" cx="44" cy="28" rx="7" ry="5"/>
        <circle fill="#fef3c7" cx="44" cy="18" r="6"/>
        <path fill="#f97316" d="M42 18l2 3 2-3z"/>
        <circle fill="#1f2937" cx="41" cy="16" r="1.5"/>
        <path fill="#f97316" d="M20 38v10M44 38v10" stroke="#f97316" stroke-width="2" stroke-linecap="round"/>
    </svg>`,

    // Breeding Icons
    'parent-stock': `<svg viewBox="0 0 64 64">
        <ellipse fill="#7c3aed" cx="20" cy="38" rx="14" ry="10" opacity="0.3"/>
        <ellipse fill="#fef3c7" cx="20" cy="36" rx="12" ry="8"/>
        <ellipse fill="#fde68a" cx="20" cy="34" rx="9" ry="5"/>
        <circle fill="#fef3c7" cx="20" cy="22" r="8"/>
        <circle fill="#fde68a" cx="20" cy="20" r="5"/>
        <path fill="#f97316" d="M17 22l3 4 3-4z"/>
        <circle fill="#1f2937" cx="16" cy="18" r="1.5"/>
        <circle fill="#1f2937" cx="22" cy="18" r="1.5"/>
        <ellipse fill="#dc2626" cx="20" cy="12" rx="4" ry="2"/>
        <ellipse fill="#7c3aed" cx="44" cy="38" rx="14" ry="10" opacity="0.3"/>
        <ellipse fill="#f5f5f5" cx="44" cy="36" rx="12" ry="8"/>
        <ellipse fill="#e5e7eb" cx="44" cy="34" rx="9" ry="5"/>
        <circle fill="#f5f5f5" cx="44" cy="22" r="8"/>
        <circle fill="#e5e7eb" cx="44" cy="20" r="5"/>
        <path fill="#f97316" d="M41 22l3 4 3-4z"/>
        <circle fill="#1f2937" cx="40" cy="18" r="1.5"/>
        <circle fill="#1f2937" cx="46" cy="18" r="1.5"/>
        <ellipse fill="#dc2626" cx="44" cy="12" rx="6" ry="3"/>
        <path fill="#f97316" d="M20 46v8M44 46v8" stroke="#f97316" stroke-width="3" stroke-linecap="round"/>
    </svg>`,

    'hatchery': `<svg viewBox="0 0 64 64">
        <ellipse fill="#fef3c7" cx="32" cy="38" rx="24" ry="18"/>
        <ellipse fill="#fde68a" cx="32" cy="36" rx="20" ry="14"/>
        <ellipse fill="#fbbf24" cx="32" cy="34" rx="14" ry="8"/>
        <path fill="#fef3c7" d="M24 24c0-6 3.6-12 8-12s8 6 8 12c0 4-3 8-5 10l1 8h-8l1-8c-2-2-5-6-5-10z"/>
        <path fill="#fde68a" d="M28 24c0-4 2-8 4-8s4 4 4 8c0 2-1.5 4-2.5 5l.5 5h-4l.5-5c-1-1-2.5-3-2.5-5z"/>
        <circle fill="#1f2937" cx="30" cy="26" r="1.5"/>
        <circle fill="#1f2937" cx="36" cy="26" r="1.5"/>
        <path fill="#f97316" d="M31 30l2 3 2-3z"/>
        <ellipse fill="#fff" cx="22" cy="44" rx="4" ry="3" opacity="0.5"/>
        <ellipse fill="#fff" cx="42" cy="44" rx="4" ry="3" opacity="0.5"/>
    </svg>`,

    'doc': `<svg viewBox="0 0 64 64">
        <rect fill="#7c3aed" x="20" y="48" width="24" height="12" rx="4"/>
        <rect fill="#8b5cf6" x="24" y="50" width="16" height="8" rx="2"/>
        <circle fill="#fef3c7" cx="18" cy="32" r="12"/>
        <circle fill="#fde68a" cx="18" cy="30" r="8"/>
        <circle fill="#fbbf24" cx="18" cy="28" r="4"/>
        <circle fill="#1f2937" cx="15" cy="28" r="2"/>
        <circle fill="#1f2937" cx="21" cy="28" r="2"/>
        <path fill="#f97316" d="M16 32l2 3 2-3z"/>
        <circle fill="#fef3c7" cx="46" cy="32" r="12"/>
        <circle fill="#fde68a" cx="46" cy="30" r="8"/>
        <circle fill="#fbbf24" cx="46" cy="28" r="4"/>
        <circle fill="#1f2937" cx="43" cy="28" r="2"/>
        <circle fill="#1f2937" cx="49" cy="28" r="2"/>
        <path fill="#f97316" d="M44 32l2 3 2-3z"/>
        <circle fill="#fef3c7" cx="32" cy="24" r="10"/>
        <circle fill="#fde68a" cx="32" cy="22" r="6"/>
        <circle fill="#fbbf24" cx="32" cy="20" r="3"/>
        <circle fill="#1f2937" cx="30" cy="22" r="1.5"/>
        <circle fill="#1f2937" cx="35" cy="22" r="1.5"/>
        <path fill="#f97316" d="M31 26l2 2 2-2z"/>
    </svg>`,

    'bio-asset': `<svg viewBox="0 0 64 64">
        <rect fill="#f8fafc" x="6" y="10" width="52" height="44" rx="6"/>
        <rect fill="#e2e8f0" x="10" y="14" width="44" height="36" rx="4"/>
        <path fill="#7c3aed" d="M14 46V28l14-10 14 10v18z"/>
        <path fill="#8b5cf6" d="M18 44V30l10-7 10 7v14z"/>
        <circle fill="#fef3c7" cx="28" cy="34" r="4"/>
        <text x="28" y="44" text-anchor="middle" fill="#fff" font-size="10" font-weight="bold">$</text>
        <rect fill="#16a34a" x="44" y="28" width="8" height="18" rx="2"/>
        <rect fill="#22c55e" x="46" y="32" width="4" height="10" rx="1"/>
        <circle fill="#f59e0b" cx="48" cy="20" r="5"/>
        <circle fill="#fbbf24" cx="48" cy="20" r="3"/>
        <path fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2 2" d="M14 20h30"/>
    </svg>`
};

// Visual Flowchart Configurations - Single Row Layout with Descriptions
const VISUAL_FLOWCHARTS = {
    // Al Rawabi Dairy - Production
    'ARDC-PP': {
        title: 'Dairy Production Process',
        subtitle: 'End-to-End Manufacturing Operations',
        type: 'dairy',
        icon: 'fa-cheese',
        rows: [
            {
                nodes: [
                    { id: 'PP-01', name: 'Demand Planning', desc: 'Forecasting, PIR entry, seasonal patterns' },
                    { id: 'PP-02', name: 'Recipe Mgmt', desc: 'Formulation, BOM, change control' },
                    { id: 'PP-03', name: 'MRP', desc: 'Material planning, lot sizing' },
                    { id: 'PP-04', name: 'Scheduling', desc: 'Capacity, line assignment' },
                    { id: 'PP-05', name: 'Milk Reception', desc: 'Weighbridge, gate pass' },
                    { id: 'PP-06', name: 'Standardization', desc: 'Fat/SNF balancing' },
                    { id: 'PP-07', name: 'Production', desc: 'Process orders, execution' },
                    { id: 'PP-08', name: 'Quality Mgmt', desc: 'QM, LIMS, testing' },
                    { id: 'PP-09', name: 'Traceability', desc: 'Batch genealogy, recall' },
                    { id: 'PP-10', name: 'Inventory', desc: 'Cold chain, FEFO' }
                ]
            }
        ]
    },

    // Al Rawabi Dairy - Sales
    'ARDC-SD': {
        title: 'Sales & Distribution Process',
        subtitle: 'Van Sales Operations',
        type: 'dairy',
        icon: 'fa-truck',
        rows: [
            {
                nodes: [
                    { id: 'SD-01', name: 'Van Sales & Routes', desc: 'Route management, devices' },
                    { id: 'SD-02', name: 'Order Mgmt', desc: 'Order fulfillment' },
                    { id: 'SD-03', name: 'Pricing', desc: 'Pricing & promotions' },
                    { id: 'SD-04', name: 'Returns', desc: 'Returns & credits' },
                    { id: 'SD-05', name: 'Credit Mgmt', desc: 'Credit & collections' },
                    { id: 'SD-06', name: 'Shelf-Life', desc: 'FEFO management' },
                    { id: 'SD-07', name: 'E-Commerce', desc: 'Magento integration' },
                    { id: 'SD-08', name: 'SAP Integration', desc: 'Data flow & sync' },
                    { id: 'SD-09', name: 'Revenue', desc: 'Multi-channel profit' },
                    { id: 'SD-10', name: 'Crates', desc: 'Returnable mgmt' },
                    { id: 'SD-11', name: 'Delivery', desc: 'Cold chain' }
                ]
            }
        ]
    },

    // Al Rawabi Dairy - Materials Management
    'ARDC-MM': {
        title: 'Materials Management',
        subtitle: 'Procurement, Planning & Inventory',
        type: 'dairy',
        icon: 'fa-boxes',
        rows: [
            {
                nodes: [
                    { id: 'ARDC-MM-01', name: 'Demand Planning', desc: '16-week forecast, Excel-based' },
                    { id: 'ARDC-MM-02', name: 'MRP', desc: 'Not operational, manual calc' },
                    { id: 'ARDC-MM-03', name: 'Milk Balancing', desc: 'Complex Excel, daily adjust' },
                    { id: 'ARDC-MM-04', name: 'Procurement', desc: 'Manual PR-to-PO, 5 approvals' },
                    { id: 'ARDC-MM-05', name: 'Goods Receipt', desc: 'Barcode/HU, palletization' },
                    { id: 'ARDC-MM-06', name: 'Inventory', desc: 'STOs, biosecurity rules' },
                    { id: 'ARDC-MM-07', name: 'Warehouse', desc: 'WMS active, no dedicated mgr' },
                    { id: 'ARDC-MM-08', name: 'Master Data', desc: 'Duplicate codes, fragmented' }
                ]
            }
        ]
    },

    // Al Rawabi Dairy - Finance & Controlling
    'ARDC-FICO': {
        title: 'Finance & Controlling',
        subtitle: 'Group Financial Management & Cost Accounting',
        type: 'dairy',
        icon: 'fa-calculator',
        rows: [
            {
                nodes: [
                    { id: 'ARDC-FI-01', name: 'Group Structure', desc: '7 company codes, 2 divisions' },
                    { id: 'ARDC-FI-02', name: 'Chart of Accounts', desc: 'Two COAs, Greenfield separate' },
                    { id: 'ARDC-FI-03', name: 'Consolidation', desc: 'Excel-based, manual elimination' },
                    { id: 'ARDC-FI-04', name: 'Intercompany', desc: 'No automation, buyer-supplier' },
                    { id: 'ARDC-FI-05', name: 'Cost Centers', desc: 'Single hierarchy, CC-specific' },
                    { id: 'ARDC-FI-06', name: 'Profit Centers', desc: '35 PCs, segment alignment' },
                    { id: 'ARDC-FI-07', name: 'Product Costing', desc: 'Actual costing, ML active' },
                    { id: 'ARDC-FI-08', name: 'CO-PA', desc: 'Live, costing-based' }
                ]
            }
        ]
    },

    // ENF - Sales & Distribution
    'ENF-SD': {
        title: 'Sales & Distribution',
        subtitle: 'Two Brands: Al Rawdah (Fresh) & Al Salwa (Frozen)',
        type: 'poultry',
        icon: 'fa-truck',
        rows: [
            {
                nodes: [
                    { id: 'ENF-SD-01', name: 'Product Brands', desc: 'Al Rawdah fresh, Al Salwa frozen' },
                    { id: 'ENF-SD-02', name: 'Van Sales', desc: '32 routes, SONIC app, offline' },
                    { id: 'ENF-SD-03', name: 'Route Profitability', desc: 'No CO-PA analysis, manual' },
                    { id: 'ENF-SD-04', name: 'B2B Key Accounts', desc: 'Nandos, marinade specs' },
                    { id: 'ENF-SD-05', name: 'Export Sales', desc: '3% frozen, direct SAP orders' },
                    { id: 'ENF-SD-06', name: 'Returns Handling', desc: '13% returns, freeze as Salwa' }
                ]
            }
        ]
    },

    // ENF - Hatchery Operations
    'ENF-HATCH': {
        title: 'Hatchery Operations',
        subtitle: 'Eggs from Salwa → Day-Old Chicks',
        type: 'poultry',
        icon: 'fa-egg',
        rows: [
            {
                nodes: [
                    { id: 'ENF-H-01', name: 'Egg Procurement', desc: 'Salwa + open market (15-16%)' },
                    { id: 'ENF-H-02', name: 'Egg Grading', desc: 'A-grade hatchable, B-grade reject' },
                    { id: 'ENF-H-03', name: 'Egg Storage', desc: 'Optimal 7-8 days, degrades 20+' },
                    { id: 'ENF-H-04', name: 'Incubation Cycle', desc: '21 days, 200K eggs per setting' },
                    { id: 'ENF-H-05', name: 'Hatchability', desc: '90-92% actual vs 85-86% estimate' },
                    { id: 'ENF-H-06', name: 'DOC Output', desc: '150K capacity, for own farms' }
                ]
            }
        ]
    },

    // ENF - Farm Operations
    'ENF-FARM': {
        title: 'Farm Operations',
        subtitle: 'Broiler Growing: DOC → Slaughter Weight',
        type: 'poultry',
        icon: 'fa-warehouse',
        rows: [
            {
                nodes: [
                    { id: 'ENF-F-01', name: 'Farm Capacity', desc: '13 farms, 6 houses, 150K birds' },
                    { id: 'ENF-F-02', name: 'DOC Placement', desc: 'One PO per house, 35-42 days' },
                    { id: 'ENF-F-03', name: 'Growing Cycle', desc: 'Pre-starter, Grower, Finisher' },
                    { id: 'ENF-F-04', name: 'Feed Control', desc: 'Bulk to silos, NO measurement' },
                    { id: 'ENF-F-05', name: 'FCR Performance', desc: '1.7-1.8 vs 1.4 benchmark' },
                    { id: 'ENF-F-06', name: 'Mortality', desc: 'Scrap at cycle end, no daily' }
                ]
            }
        ]
    },

    // ENF - Processing Plant
    'ENF-PROC': {
        title: 'Processing Plant',
        subtitle: 'Live Birds → Packed Products',
        type: 'poultry',
        icon: 'fa-industry',
        rows: [
            {
                nodes: [
                    { id: 'ENF-P-01', name: 'Processing Facilities', desc: 'PPE fresh, FPPE frozen plants' },
                    { id: 'ENF-P-02', name: 'Daily Volume', desc: '50-60K birds slaughtered' },
                    { id: 'ENF-P-03', name: 'Production Orders', desc: '5 POs: egg→DOC→broiler→carcass→FG' },
                    { id: 'ENF-P-04', name: 'Carcass Split', desc: '65-70% whole, 30-35% portions' },
                    { id: 'ENF-P-05', name: 'Variable Yield', desc: 'PO created AFTER output known' },
                    { id: 'ENF-P-06', name: 'Catch Weight Gap', desc: 'No weight-based tracking' }
                ]
            }
        ]
    },

    // ENF - Materials Management
    'ENF-MM': {
        title: 'Materials Management',
        subtitle: 'Procurement & Inventory',
        type: 'poultry',
        icon: 'fa-boxes',
        rows: [
            {
                nodes: [
                    { id: 'ENF-MM-01', name: 'Egg Procurement', desc: 'Salwa primary, imports 15-16%' },
                    { id: 'ENF-MM-02', name: 'Feed from GF', desc: '100% intercompany, resumed' },
                    { id: 'ENF-MM-03', name: 'Feed Subsidy', desc: '90% ADS quota, manual tracking' },
                    { id: 'ENF-MM-04', name: 'Feed Delivery', desc: 'Bulk tanker, no silo measure' },
                    { id: 'ENF-MM-05', name: 'Vaccine/Meds', desc: 'Cold chain, withdrawal manual' },
                    { id: 'ENF-MM-06', name: 'Frozen Imports', desc: 'Brazil meat for FPPE, 95%' }
                ]
            }
        ]
    },

    // ENF - Quality Management
    'ENF-QM': {
        title: 'Quality Management',
        subtitle: 'Testing & Traceability',
        type: 'poultry',
        icon: 'fa-clipboard-check',
        rows: [
            {
                nodes: [
                    { id: 'ENF-QM-01', name: 'Egg Quality', desc: 'A/B grading, specs new' },
                    { id: 'ENF-QM-02', name: 'Hatchery QC', desc: 'Testing at day 20-22, too late' },
                    { id: 'ENF-QM-03', name: 'Disease Trace', desc: 'Cannot trace when mixed' },
                    { id: 'ENF-QM-04', name: 'In-Process QC', desc: 'Not in SAP, paper records' },
                    { id: 'ENF-QM-05', name: 'Returns Quality', desc: 'Good/bad, reprocess/render' },
                    { id: 'ENF-QM-06', name: 'No LIMS', desc: 'Manual lab documentation' }
                ]
            }
        ]
    },

    // ENF - Finance & Controlling
    'ENF-FICO': {
        title: 'Finance & Controlling',
        subtitle: 'Costing & Profitability',
        type: 'poultry',
        icon: 'fa-calculator',
        rows: [
            {
                nodes: [
                    { id: 'ENF-FI-01', name: 'Production Costing', desc: 'Period level, no PO costing' },
                    { id: 'ENF-FI-02', name: 'Joint Product', desc: 'No value-based splitting' },
                    { id: 'ENF-FI-03', name: 'Labor Allocation', desc: 'All to P&L, not products' },
                    { id: 'ENF-FI-04', name: 'Route Profitability', desc: 'No CO-PA, manual analysis' },
                    { id: 'ENF-FI-05', name: 'Intercompany', desc: 'Fixed price Salwa & GF' },
                    { id: 'ENF-FI-06', name: 'WIP Valuation', desc: 'Accumulated cost, no revalue' }
                ]
            }
        ]
    },

    // Greenfields - Sales & Distribution
    'GF-SD': {
        title: 'Sales & Distribution',
        subtitle: '100% Chicken Feed to ENF + Cattle Feed External',
        type: 'farming',
        icon: 'fa-truck',
        rows: [
            {
                nodes: [
                    { id: 'GF-SD-01', name: 'Chicken Feed Sales', desc: '100% to ENF, intercompany' },
                    { id: 'GF-SD-02', name: 'Cattle Feed Sales', desc: 'External customers, separate' },
                    { id: 'GF-SD-03', name: 'Gate Pass System', desc: 'Custom, auto sales order' },
                    { id: 'GF-SD-04', name: 'Delivery to ENF', desc: 'Direct to farm silos' },
                    { id: 'GF-SD-05', name: 'Intercompany Pricing', desc: 'Fixed transfer with margin' }
                ]
            }
        ]
    },

    // Greenfields - Materials Management
    'GF-MM': {
        title: 'Materials Management',
        subtitle: 'Global Grain Imports & Procurement',
        type: 'farming',
        icon: 'fa-boxes',
        rows: [
            {
                nodes: [
                    { id: 'GF-MM-01', name: 'Raw Materials', desc: 'Corn, cottonseed, soybean global' },
                    { id: 'GF-MM-02', name: 'No MRP in SAP', desc: 'Excel-based planning only' },
                    { id: 'GF-MM-03', name: 'Planning Horizon', desc: '1-month, targeting 6-month' },
                    { id: 'GF-MM-04', name: 'No Hedging', desc: 'Exposed to grain volatility' },
                    { id: 'GF-MM-05', name: 'No ENF Integration', desc: 'No demand-driven planning' }
                ]
            }
        ]
    },

    // Greenfields - Production Planning
    'GF-PP': {
        title: 'Production Planning',
        subtitle: 'Feed Manufacturing & Delivery to ENF',
        type: 'farming',
        icon: 'fa-industry',
        rows: [
            {
                nodes: [
                    { id: 'GF-PP-01', name: 'Feed Formulation', desc: 'External software, ENF recipes' },
                    { id: 'GF-PP-02', name: 'Feed Types', desc: 'Pre-starter→Starter→Grower→Finisher' },
                    { id: 'GF-PP-03', name: 'Capacity Utilization', desc: '35-60%, no confirmed orders' },
                    { id: 'GF-PP-04', name: 'Bulk Delivery', desc: 'Tankers 32.5T to ENF silos' },
                    { id: 'GF-PP-05', name: 'No Measurement', desc: 'No verification at ENF farms' },
                    { id: 'GF-PP-06', name: 'Excess = Waste', desc: 'Cannot transfer, disposed' }
                ]
            }
        ]
    },

    // Greenfields - Quality Management
    'GF-QM': {
        title: 'Quality Management',
        subtitle: 'Feed Quality & FCR Accountability',
        type: 'farming',
        icon: 'fa-clipboard-check',
        rows: [
            {
                nodes: [
                    { id: 'GF-QM-01', name: 'Quality History', desc: 'Stopped supply, now resumed' },
                    { id: 'GF-QM-02', name: 'New Recipe Testing', desc: 'Trial on 2-3 ENF farms' },
                    { id: 'GF-QM-03', name: 'FCR Accountability', desc: 'Cannot correlate feed→FCR' },
                    { id: 'GF-QM-04', name: 'Spec Management', desc: 'Nutritional specs for ENF' }
                ]
            }
        ]
    },

    // Greenfields - Finance & Controlling
    'GF-FICO': {
        title: 'Finance & Controlling',
        subtitle: 'Feed Cost = 95-98% of Chicken Cost',
        type: 'farming',
        icon: 'fa-calculator',
        rows: [
            {
                nodes: [
                    { id: 'GF-FI-01', name: 'Intercompany Price', desc: 'Fixed margin to ENF' },
                    { id: 'GF-FI-02', name: 'Division Consolidation', desc: 'Elimination at poultry level' },
                    { id: 'GF-FI-03', name: 'Production Costing', desc: 'Standard cost, period-based' },
                    { id: 'GF-FI-04', name: 'Commodity Exposure', desc: 'No hedging, volatile costs' },
                    { id: 'GF-FI-05', name: 'FCR Impact', desc: '0.1 FCR = 0.5M AED savings' }
                ]
            }
        ]
    },

    // Salwa@Liwa - Production Planning (Rearing + Laying)
    'SL-PP': {
        title: 'Production Planning',
        subtitle: 'Parent Stock Breeding: DOC → Hatching Eggs',
        type: 'breeding',
        icon: 'fa-egg',
        rows: [
            {
                nodes: [
                    { id: 'SL-PP-01', name: 'DOC Sourcing', desc: '100% Saudi imports, 30K×3/year' },
                    { id: 'SL-PP-02', name: 'Rearing Cycle', desc: '0-24 weeks, 4 houses' },
                    { id: 'SL-PP-03', name: 'Laying Houses', desc: '2 farms, 8 houses, 26K birds' },
                    { id: 'SL-PP-04', name: 'Production Cycle', desc: 'Week 25-65, 41 weeks laying' },
                    { id: 'SL-PP-05', name: 'Daily Production', desc: '52K eggs/day at peak' },
                    { id: 'SL-PP-06', name: 'ENF Collection', desc: 'Every 4 days, ENF truck' }
                ]
            }
        ]
    },

    // Salwa@Liwa - Quality Management (Egg Grading)
    'SL-QM': {
        title: 'Quality Management',
        subtitle: 'Egg Grading: A-Grade for Hatching',
        type: 'breeding',
        icon: 'fa-clipboard-check',
        rows: [
            {
                nodes: [
                    { id: 'SL-QM-01', name: 'Egg Grading', desc: 'A (≥50g hatchable) vs B (reject)' },
                    { id: 'SL-QM-02', name: 'B-Grade Reasons', desc: 'Undersized, double yolk, defects' },
                    { id: 'SL-QM-03', name: 'Grading Location', desc: 'Done at ENF, not source' },
                    { id: 'SL-QM-04', name: 'B-Grade Sales', desc: 'Sold as table eggs external' }
                ]
            }
        ]
    },

    // Salwa@Liwa - Materials Management
    'SL-MM': {
        title: 'Materials Management',
        subtitle: 'DOC & Feed Procurement',
        type: 'breeding',
        icon: 'fa-boxes',
        rows: [
            {
                nodes: [
                    { id: 'SL-MM-01', name: 'DOC Import', desc: 'Saudi Arabia, delivered to Liwa' },
                    { id: 'SL-MM-02', name: 'Feed Supply', desc: 'GF via ENF, subsidized ADS' },
                    { id: 'SL-MM-03', name: 'Feed Delivery', desc: 'Bulk to silos, no measurement' },
                    { id: 'SL-MM-04', name: 'Vaccine/Meds', desc: 'Farm manager, vet managed' },
                    { id: 'SL-MM-05', name: 'Bird Valuation', desc: 'No daily valuation, static' }
                ]
            }
        ]
    },

    // Salwa@Liwa - Finance & Controlling
    'SL-FICO': {
        title: 'Finance & Controlling',
        subtitle: 'Biological Asset Accounting (IAS 41)',
        type: 'breeding',
        icon: 'fa-calculator',
        rows: [
            {
                nodes: [
                    { id: 'SL-FI-01', name: 'Capitalization', desc: '24 weeks rearing costs' },
                    { id: 'SL-FI-02', name: 'Amortization', desc: 'Week 25-65, Excel + JV posting' },
                    { id: 'SL-FI-03', name: 'Production Orders', desc: 'Rearing PO + Laying PO' },
                    { id: 'SL-FI-04', name: 'Egg Costing', desc: 'Period costing approach' },
                    { id: 'SL-FI-05', name: 'Transfer Pricing', desc: 'Fixed price to ENF' }
                ]
            }
        ]
    },

    // Salwa@Liwa - Sales & Distribution
    'SL-SD': {
        title: 'Sales & Distribution',
        subtitle: '100% Eggs to ENF (Single Customer)',
        type: 'breeding',
        icon: 'fa-truck',
        rows: [
            {
                nodes: [
                    { id: 'SL-SD-01', name: 'Customer Base', desc: '100% ENF, intercompany only' },
                    { id: 'SL-SD-02', name: 'Order Process', desc: 'No formal orders, production-driven' },
                    { id: 'SL-SD-03', name: 'Delivery Process', desc: 'ENF truck collects every 4 days' },
                    { id: 'SL-SD-04', name: 'Documentation Gap', desc: 'Paper delivery notes, not SAP' },
                    { id: 'SL-SD-05', name: 'Invoice Process', desc: 'After grading, Grade A only' },
                    { id: 'SL-SD-06', name: 'B-Grade External', desc: 'Table eggs sold separately' }
                ]
            }
        ]
    }
};

/**
 * Initialize visual flowcharts for an entity
 */
function initVisualFlowcharts(entityId) {
    const container = document.getElementById(`${entityId}-flowcharts`);
    if (!container) return;

    const config = ENTITY_CONFIG[entityId];
    if (!config) return;

    let html = '';

    config.flows.forEach(flowKey => {
        const flowConfig = VISUAL_FLOWCHARTS[flowKey];
        if (!flowConfig) return;

        html += renderVisualFlowchart(flowKey, flowConfig, entityId);
    });

    container.innerHTML = html;
}

/**
 * Render a visual flowchart with numbered circles
 */
function renderVisualFlowchart(flowKey, config, entityId) {
    let html = `
        <div class="visual-flowchart ${config.type}" data-flow="${flowKey}">
            <div class="flow-title-bar">
                <div class="flow-title-left">
                    <div class="flow-title-icon ${config.type}">
                        <i class="fas ${config.icon}"></i>
                    </div>
                    <div class="flow-title-text">
                        <h3>${config.title}</h3>
                        <p>${config.subtitle}</p>
                    </div>
                </div>
            </div>
            <div class="process-flow-visual">
    `;

    config.rows.forEach((row, rowIndex) => {
        html += `<div class="flow-row ${row.reverse ? 'reverse' : ''}">`;

        row.nodes.forEach((node, nodeIndex) => {
            // Dynamically count findings from actual data
            const findings = REPORT_DATA.findingsByStep[node.id] || [];
            const stats = {
                total: findings.length,
                high: findings.filter(f => f.risk === 'high').length,
                medium: findings.filter(f => f.risk === 'medium').length,
                low: findings.filter(f => f.risk === 'low').length
            };

            let riskClass = 'risk-none';
            if (stats.high > 0) riskClass = 'risk-high';
            else if (stats.medium > 0) riskClass = 'risk-medium';
            else if (stats.low > 0) riskClass = 'risk-low';

            const hasFindings = stats.total > 0;

            // Explicit color class (cycles through 4 colors: teal, orange, green, red)
            const colorIndex = (nodeIndex % 4) + 1;
            const colorClass = `node-color-${colorIndex}`;

            // Add connector before node (except first in row)
            if (nodeIndex > 0) {
                html += `
                    <div class="flow-connector">
                        <div class="connector-arrow"></div>
                    </div>
                `;
            }

            html += `
                <div class="process-node ${riskClass} ${hasFindings ? 'has-findings' : ''} ${colorClass}"
                     data-step="${node.id}"
                     data-entity="${entityId}"
                     onclick="selectEntityFlowStep('${entityId}', '${node.id}', '${node.name}')">
                    <div class="node-number">${stats.total}</div>
                    <div class="node-label">
                        <span class="label-name">${node.name}</span>
                        <span class="label-desc">${node.desc || ''}</span>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
    });

    html += `
            </div>
        </div>
    `;

    return html;
}

// Initialize flowcharts on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initVisualFlowcharts('ardc');
        initVisualFlowcharts('enf');
        initVisualFlowcharts('greenfields');
        initVisualFlowcharts('alrawdah');

        // Set default selection to first flow for each entity
        setDefaultEntityFlow('ardc', 'ARDC-PP');
        setDefaultEntityFlow('enf', 'ENF-SD');
        setDefaultEntityFlow('greenfields', 'GF-SD');
        setDefaultEntityFlow('alrawdah', 'SL-PP');
    }, 100);
});

/**
 * Set default selected flow for an entity (show only first flowchart)
 */
function setDefaultEntityFlow(entityId, flowKey) {
    const tabContent = document.getElementById(`tab-${entityId}`);
    if (!tabContent) return;

    // Hide all flowcharts except the default one
    const flowcharts = tabContent.querySelectorAll('.visual-flowchart[data-flow]');
    flowcharts.forEach(chart => {
        if (chart.dataset.flow === flowKey) {
            chart.style.display = 'block';
        } else {
            chart.style.display = 'none';
        }
    });
}

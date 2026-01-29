/**
 * NXSYS Advisory - Emirates Rawabi Group Audit Report
 * Main Application JavaScript
 *
 * Features:
 * - Tab management (Executive Report, Flowcharts, Orphan)
 * - Animated presentation with slide navigation
 * - Counter animations
 * - Process flowcharts with findings panel
 * - Orphan findings sections
 */

// =====================================================
// TAB MANAGEMENT
// =====================================================
// Track current view
let currentView = 'executive';

function switchTab(tabId) {
    currentView = tabId;

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `tab-${tabId}`);
    });

    // Update toggle button
    updateToggleButton();

    // Update page title
    updatePageTitle(tabId);

    // Trigger animations when switching to executive tab
    if (tabId === 'executive') {
        animateCurrentSlide();
    }

    // Initialize Deep-Dive tab when switching to it
    if (tabId === 'deepdive') {
        setTimeout(() => {
            // Check if already initialized
            const container = document.getElementById('deepdive-flowcharts');
            if (container && container.children.length === 0) {
                // Initialize with first module
                const firstItem = document.querySelector('#tab-deepdive .nav-entity-modules .nav-item.active');
                if (firstItem) {
                    const flowKey = firstItem.dataset.flow;
                    const entityId = firstItem.dataset.entity;
                    selectDeepDiveModule(entityId, flowKey, firstItem);
                }
            }
        }, 100);
    }
}

function updatePageTitle(tabId) {
    const centerTitle = document.getElementById('pageTitleCenter');
    if (tabId === 'executive') {
        document.title = 'Executive Summary | Emirates Rawabi Group';
        if (centerTitle) centerTitle.textContent = 'Executive Summary';
    } else {
        document.title = 'Process Flow Deep-Dive | Emirates Rawabi Group';
        if (centerTitle) centerTitle.textContent = 'Process Flow Deep-Dive';
    }
}

function toggleView() {
    if (currentView === 'executive') {
        switchTab('deepdive');
    } else {
        switchTab('executive');
    }
}

function updateToggleButton() {
    // Update both TOC toggle switches
    const summaryToggle = document.getElementById('tocToggleSummary');
    const deepDiveToggle = document.getElementById('tocToggleDeepDive');

    if (currentView === 'executive') {
        if (summaryToggle) {
            summaryToggle.classList.remove('right');
            updateToggleLabels(summaryToggle, true);
        }
        if (deepDiveToggle) {
            deepDiveToggle.classList.remove('right');
            updateToggleLabels(deepDiveToggle, true);
        }
    } else {
        if (summaryToggle) {
            summaryToggle.classList.add('right');
            updateToggleLabels(summaryToggle, false);
        }
        if (deepDiveToggle) {
            deepDiveToggle.classList.add('right');
            updateToggleLabels(deepDiveToggle, false);
        }
    }
}

function updateToggleLabels(toggle, isSummary) {
    const labels = toggle.querySelectorAll('.toggle-label');
    labels.forEach(label => {
        if (label.dataset.view === 'executive') {
            label.classList.toggle('active', isSummary);
        } else {
            label.classList.toggle('active', !isSummary);
        }
    });
}

/**
 * Auto-select the first process node in an entity tab
 */
function autoSelectFirstProcess(entityId) {
    const tabContent = document.getElementById(`tab-${entityId}`);
    if (!tabContent) return;

    // Check if panel is already open with a selection
    const panel = document.getElementById(`${entityId}-flowPanel`);
    if (panel && panel.classList.contains('open')) return;

    // Find all flowcharts and get the first visible one
    const flowcharts = tabContent.querySelectorAll('.visual-flowchart[data-flow]');
    let visibleFlowchart = null;

    for (const fc of flowcharts) {
        // Check if flowchart is visible (not display:none)
        if (fc.offsetParent !== null || fc.style.display !== 'none') {
            visibleFlowchart = fc;
            break;
        }
    }

    // Fallback to first flowchart if none found
    if (!visibleFlowchart && flowcharts.length > 0) {
        visibleFlowchart = flowcharts[0];
    }

    if (!visibleFlowchart) return;

    const firstNode = visibleFlowchart.querySelector('.process-node[data-step]');
    if (firstNode) {
        const stepId = firstNode.dataset.step;
        const stepName = firstNode.querySelector('.node-label')?.textContent || stepId;
        selectEntityFlowStep(entityId, stepId, stepName);
    }
}

// =====================================================
// PRESENTATION ENGINE
// =====================================================
let currentSlide = 0;
const totalSlides = 10;
let isAnimating = false;

function initPresentation() {
    // Create slide indicators
    createSlideIndicators();

    // Bind navigation
    bindPresentationEvents();

    // Initialize first slide
    goToSlide(0);

    // Animate counters on first slide if visible
    setTimeout(() => animateCountersOnSlide(0), 500);
}

function createSlideIndicators() {
    const container = document.getElementById('presSlideIndicators');
    if (!container) return;

    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'pres-slide-indicator' + (i === 0 ? ' active' : '');
        indicator.addEventListener('click', () => goToSlide(i));
        container.appendChild(indicator);
    }
}

function bindPresentationEvents() {
    // Navigation buttons
    const prevBtn = document.getElementById('presPrevSlide');
    const nextBtn = document.getElementById('presNextSlide');

    if (prevBtn) prevBtn.addEventListener('click', () => prevSlide());
    if (nextBtn) nextBtn.addEventListener('click', () => nextSlide());

    // Left nav items
    document.querySelectorAll('.pres-titles-nav .nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const navIndex = parseInt(item.dataset.nav);
            goToSlide(navIndex);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
}

function handleKeyboard(e) {
    // Only handle keys when executive tab is active
    const execTab = document.getElementById('tab-executive');
    if (!execTab || !execTab.classList.contains('active')) return;

    switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
            e.preventDefault();
            nextSlide();
            break;
        case 'ArrowUp':
        case 'ArrowLeft':
        case 'PageUp':
            e.preventDefault();
            prevSlide();
            break;
        case 'Home':
            e.preventDefault();
            goToSlide(0);
            break;
        case 'End':
            e.preventDefault();
            goToSlide(totalSlides - 1);
            break;
        case 'f':
        case 'F':
            e.preventDefault();
            toggleFullscreen();
            break;
        case 'Escape':
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
            closeFlowPanel();
            break;
    }
}

function goToSlide(index) {
    if (isAnimating || index === currentSlide) return;
    if (index < 0 || index >= totalSlides) return;

    isAnimating = true;

    const slides = document.querySelectorAll('.presentation .slide');

    // Remove active from all slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });

    // Activate target slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }

    currentSlide = index;
    updatePresentationUI();
    animateCountersOnSlide(index);

    // Reset animation lock
    setTimeout(() => {
        isAnimating = false;
    }, 800);
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    }
}

function updatePresentationUI() {
    // Ensure currentSlide is valid
    if (typeof currentSlide !== 'number' || isNaN(currentSlide)) {
        currentSlide = 0;
    }

    // Update progress bar
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    const progressBar = document.getElementById('presProgressBar');
    if (progressBar) progressBar.style.setProperty('--progress', `${progress}%`);

    // Update slide counter
    const counter = document.getElementById('presSlideCounter');
    if (counter) {
        const current = counter.querySelector('.current');
        if (current) current.textContent = String(currentSlide + 1).padStart(2, '0');
    }

    // Update indicators
    document.querySelectorAll('.pres-slide-indicator').forEach((ind, i) => {
        ind.classList.toggle('active', i === currentSlide);
    });

    // Update nav items
    document.querySelectorAll('.pres-titles-nav .nav-item').forEach((item, i) => {
        item.classList.toggle('active', i === currentSlide);
    });

    // Update nav buttons
    const prevBtn = document.getElementById('presPrevSlide');
    const nextBtn = document.getElementById('presNextSlide');
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
}

function animateCurrentSlide() {
    animateCountersOnSlide(currentSlide);
}

// =====================================================
// COUNTER ANIMATIONS
// =====================================================
function animateCountersOnSlide(slideIndex) {
    const slides = document.querySelectorAll('.presentation .slide');
    if (!slides[slideIndex]) return;

    const counters = slides[slideIndex].querySelectorAll('[data-count]');

    counters.forEach(counter => {
        if (counter.dataset.animated === 'true') return;

        const target = parseInt(counter.dataset.count);
        const duration = 1500;
        const steps = 50;
        const stepDuration = duration / steps;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = formatNumber(Math.floor(current));
        }, stepDuration);

        counter.dataset.animated = 'true';
    });
}

// =====================================================
// FULLSCREEN
// =====================================================
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen();
    }
}

// =====================================================
// FLOW PANEL MANAGEMENT (Legacy - kept for compatibility)
// =====================================================
function closeFlowPanel() {
    // Legacy function - now redirects to entity panels
    ['ardc', 'enf', 'greenfields', 'alrawdah'].forEach(entity => {
        closeEntityPanel(entity);
    });
}

// =====================================================
// ORPHAN SECTIONS TOGGLE
// =====================================================
function toggleOrphanSection(header) {
    const list = header.nextElementSibling;
    if (list) list.classList.toggle('open');
}

// =====================================================
// UTILITIES
// =====================================================
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function formatNumber(num) {
    return num.toLocaleString();
}

// =====================================================
// INITIALIZATION
// =====================================================
// =====================================================
// ENTITY CONFIGURATION
// =====================================================
const ENTITY_CONFIG = {
    ardc: {
        name: 'Al Rawabi Dairy Company',
        flows: ['ARDC-PP', 'ARDC-SD', 'ARDC-MM', 'ARDC-FICO'],
        icon: 'fa-cheese',
        color: '#0066b3'
    },
    enf: {
        name: 'Emirates National Foods',
        flows: ['ENF-SD', 'ENF-HATCH', 'ENF-FARM', 'ENF-PROC', 'ENF-MM', 'ENF-QM', 'ENF-FICO'],
        icon: 'fa-industry',
        color: '#dc2626'
    },
    greenfields: {
        name: 'Greenfields',
        flows: ['GF-SD', 'GF-MM', 'GF-PP', 'GF-QM', 'GF-FICO'],
        icon: 'fa-seedling',
        color: '#059669'
    },
    alrawdah: {
        name: 'Salwa @ Liwa',
        flows: ['SL-PP', 'SL-QM', 'SL-MM', 'SL-FICO', 'SL-SD'],
        icon: 'fa-egg',
        color: '#7c3aed'
    }
};

// Entity-specific process flows
const ENTITY_FLOWS = {
    // Al Rawabi Dairy - Production Planning
    'ARDC-PP': {
        name: 'Production Planning',
        subtitle: 'Dairy Manufacturing Process',
        icon: 'fa-cogs',
        color: '#0066b3',
        steps: [
            ['PP-01', 'Raw Milk Reception'],
            ['PP-02', 'Quality Testing'],
            ['PP-03', 'Milk Storage'],
            ['PP-04', 'Standardization'],
            ['PP-05', 'Production Planning'],
            ['PP-06', 'Batch Production'],
            ['PP-07', 'Quality Control'],
            ['PP-08', 'Packaging'],
            ['PP-09', 'Finished Goods'],
            ['PP-10', 'Costing']
        ]
    },
    // Al Rawabi Dairy - Sales & Distribution
    'ARDC-SD': {
        name: 'Sales & Distribution',
        subtitle: 'Order to Cash Process',
        icon: 'fa-truck',
        color: '#059669',
        steps: [
            ['SD-01', 'Demand Planning'],
            ['SD-02', 'Order Management'],
            ['SD-03', 'Stock Allocation'],
            ['SD-04', 'Truck Loading'],
            ['SD-05', 'Route Distribution'],
            ['SD-06', 'Customer Delivery'],
            ['SD-07', 'Returns Processing'],
            ['SD-08', 'Driver Settlement'],
            ['SD-09', 'Credit Management'],
            ['SD-10', 'Billing']
        ]
    },
    // Al Rawabi Dairy - Materials Management
    'ARDC-MM': {
        name: 'Materials Management',
        subtitle: 'Procurement & Inventory',
        icon: 'fa-boxes',
        color: '#f59e0b',
        steps: [
            ['ARDC-MM-01', 'Demand Planning'],
            ['ARDC-MM-02', 'MRP'],
            ['ARDC-MM-03', 'Milk Balancing'],
            ['ARDC-MM-04', 'Procurement'],
            ['ARDC-MM-05', 'Goods Receipt'],
            ['ARDC-MM-06', 'Inventory Mgmt'],
            ['ARDC-MM-07', 'Warehouse'],
            ['ARDC-MM-08', 'Master Data']
        ]
    },
    // Al Rawabi Dairy - Finance & Controlling
    'ARDC-FICO': {
        name: 'Finance & Controlling',
        subtitle: 'Financial Accounting & Cost Management',
        icon: 'fa-calculator',
        color: '#7c3aed',
        steps: [
            ['ARDC-FI-01', 'Group Structure'],
            ['ARDC-FI-02', 'Chart of Accounts'],
            ['ARDC-FI-03', 'Consolidation'],
            ['ARDC-FI-04', 'Intercompany'],
            ['ARDC-FI-05', 'Cost Centers'],
            ['ARDC-FI-06', 'Profit Centers'],
            ['ARDC-FI-07', 'Product Costing'],
            ['ARDC-FI-08', 'CO-PA']
        ]
    },
    // ENF - Poultry Processing
    'ENF-PROC': {
        name: 'Poultry Processing',
        subtitle: 'Slaughter to Distribution',
        icon: 'fa-drumstick-bite',
        color: '#dc2626',
        steps: [
            ['PF-09', 'Live Bird Collection'],
            ['PF-10', 'Slaughter Processing'],
            ['PF-11', 'Portioning & Packing'],
            ['PF-12', 'Further Processing'],
            ['PF-13', 'Quality Management'],
            ['PF-14', 'Inventory & Traceability'],
            ['PF-15', 'Sales & Distribution']
        ]
    },
    // Greenfields - Farm Operations
    'GF-FARM': {
        name: 'Farm & Feed Operations',
        subtitle: 'Agricultural Process',
        icon: 'fa-tractor',
        color: '#059669',
        steps: [
            ['PF-05', 'Feed Formulation'],
            ['PF-06', 'Feed Production'],
            ['PF-07', 'Farm Operations'],
            ['PF-08', 'Feed Consumption & FCR']
        ]
    },
    // Al Rawdah - Poultry Breeding
    'AR-POULTRY': {
        name: 'Poultry Breeding',
        subtitle: 'Breeding & Hatchery Operations',
        icon: 'fa-egg',
        color: '#7c3aed',
        steps: [
            ['PF-01', 'Parent Stock & Breeding'],
            ['PF-02', 'Egg Production & Hatchery'],
            ['PF-03', 'DOC Production'],
            ['PF-04', 'Biological Asset Accounting']
        ]
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize presentation
    initPresentation();

    // Note: Entity flowcharts are now initialized by visual-flowcharts.js

    // Initialize entity nav click handlers
    initEntityNavHandlers();

    // Initialize Deep-Dive nav click handlers
    initDeepDiveNavHandlers();

    // Initialize swipe gestures
    initSwipeGestures();

    // Populate critical findings
    populateCriticalFindings();
});

// =====================================================
// SWIPE & MOUSE GESTURE NAVIGATION
// =====================================================
function initSwipeGestures() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;
    let isDragging = false;
    const minSwipeDistance = 50;

    // Entity tabs order for horizontal navigation
    const entityTabs = ['ardc', 'enf', 'greenfields', 'alrawdah'];

    // ===== TOUCH EVENTS =====
    document.addEventListener('touchstart', function(e) {
        startX = e.changedTouches[0].screenX;
        startY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].screenX;
        endY = e.changedTouches[0].screenY;
        handleGesture();
    }, { passive: true });

    // ===== MOUSE DRAG EVENTS =====
    document.addEventListener('mousedown', function(e) {
        // Only track on entity tab content areas
        if (isOnEntityTab(e.target)) {
            isDragging = true;
            startX = e.screenX;
            startY = e.screenY;
            document.body.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            e.preventDefault();
        }
    });

    document.addEventListener('mouseup', function(e) {
        if (isDragging) {
            isDragging = false;
            endX = e.screenX;
            endY = e.screenY;
            document.body.style.cursor = '';
            handleGesture();
        }
    });

    // ===== SCROLL WHEEL EVENTS =====
    document.addEventListener('wheel', function(e) {
        // Only handle on entity tabs, not when scrolling content
        const activeEntityTab = getActiveEntityTab(entityTabs);
        if (!activeEntityTab) return;

        // Check if we're over the main content area (not scrollable panels)
        const target = e.target.closest('.entity-main, .visual-flowchart');
        if (!target) return;

        // Shift + Scroll = horizontal tab navigation
        if (e.shiftKey) {
            e.preventDefault();
            if (e.deltaY > 0 || e.deltaX > 0) {
                // Scroll down/right - next tab
                navigateTab(activeEntityTab, entityTabs, 1);
            } else {
                // Scroll up/left - previous tab
                navigateTab(activeEntityTab, entityTabs, -1);
            }
        }
        // Regular scroll on flowchart area = flowchart navigation
        else if (target.closest('.visual-flowchart')) {
            const flowchartContainer = target.closest('.visual-flowchart');
            // Only intercept if not scrolling within the flowchart
            if (flowchartContainer.scrollHeight <= flowchartContainer.clientHeight) {
                e.preventDefault();
                if (e.deltaY > 0) {
                    navigateFlowchart(activeEntityTab, 1);
                } else {
                    navigateFlowchart(activeEntityTab, -1);
                }
            }
        }
    }, { passive: false });

    function isOnEntityTab(target) {
        return target.closest('.tab-content[id^="tab-ardc"], .tab-content[id^="tab-enf"], .tab-content[id^="tab-greenfields"], .tab-content[id^="tab-alrawdah"]') !== null;
    }

    function getActiveEntityTab(tabs) {
        return tabs.find(id => {
            const tab = document.getElementById(`tab-${id}`);
            return tab && tab.classList.contains('active');
        });
    }

    function handleGesture() {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        // Determine if horizontal or vertical swipe
        if (absDeltaX < minSwipeDistance && absDeltaY < minSwipeDistance) {
            return; // Not a significant swipe
        }

        // Find currently active entity tab
        const activeEntityTab = getActiveEntityTab(entityTabs);

        // If we're on an entity tab, handle swipe navigation
        if (activeEntityTab) {
            if (absDeltaX > absDeltaY) {
                // Horizontal - navigate between entity tabs
                const direction = deltaX < 0 ? 1 : -1;
                navigateTab(activeEntityTab, entityTabs, direction);
            } else {
                // Vertical - navigate between flowcharts within entity
                const direction = deltaY < 0 ? 1 : -1;
                navigateFlowchart(activeEntityTab, direction);
            }
        }
    }

    function navigateTab(currentTab, tabs, direction) {
        const currentIndex = tabs.indexOf(currentTab);
        const newIndex = currentIndex + direction;

        if (newIndex >= 0 && newIndex < tabs.length) {
            switchToEntityTab(tabs[newIndex]);
        }
    }

    function navigateFlowchart(entityId, direction) {
        const tabContent = document.getElementById(`tab-${entityId}`);
        if (!tabContent) return;

        const navItems = Array.from(tabContent.querySelectorAll('.pres-titles-nav .nav-item[data-flow]'));
        if (navItems.length <= 1) return;

        const activeNav = navItems.find(item => item.classList.contains('active'));
        const activeIndex = activeNav ? navItems.indexOf(activeNav) : 0;
        const newIndex = activeIndex + direction;

        if (newIndex >= 0 && newIndex < navItems.length) {
            navItems[newIndex].click();
        }
    }
}

function switchToEntityTab(tabId) {
    // Find and click the entity tab button
    const tabButton = document.querySelector(`.entity-tabs .tab[data-tab="${tabId}"]`);
    if (tabButton) {
        tabButton.click();
        // Add visual feedback
        showSwipeIndicator(tabId);
    }
}

function showSwipeIndicator(tabId) {
    // Optional: Add brief visual feedback for swipe
    const tabContent = document.getElementById(`tab-${tabId}`);
    if (tabContent) {
        tabContent.classList.add('swipe-active');
        setTimeout(() => {
            tabContent.classList.remove('swipe-active');
        }, 300);
    }
}

// =====================================================
// BOTTOM PANEL SWIPE TO CLOSE
// =====================================================
function initPanelSwipe() {
    const panels = document.querySelectorAll('.flow-panel');

    panels.forEach(panel => {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;

        panel.addEventListener('touchstart', (e) => {
            if (e.target.closest('.panel-drag-handle') || e.target.closest('.panel-header')) {
                startY = e.touches[0].clientY;
                isDragging = true;
            }
        }, { passive: true });

        panel.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentY = e.touches[0].clientY;
            const diff = currentY - startY;

            if (diff > 0) {
                panel.style.transform = `translateY(${diff}px)`;
            }
        }, { passive: true });

        panel.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;

            const diff = currentY - startY;
            if (diff > 100) {
                // Close panel
                const entityId = panel.id.replace('-flowPanel', '');
                closeEntityPanel(entityId);
            }
            panel.style.transform = '';
        });
    });
}

// Initialize panel swipe on load
document.addEventListener('DOMContentLoaded', initPanelSwipe);

// Show navigation hint on first entity tab visit
let navHintShown = false;
function showNavHint() {
    if (navHintShown) return;
    navHintShown = true;

    // Create hint element if not exists
    let hint = document.querySelector('.nav-hint');
    if (!hint) {
        hint = document.createElement('div');
        hint.className = 'nav-hint';
        hint.innerHTML = `
            <span class="nav-hint-item">
                <span class="nav-hint-icon">↔</span> Drag or Shift+Scroll for tabs
            </span>
            <span class="nav-hint-item">
                <span class="nav-hint-icon">↕</span> Scroll for flowcharts
            </span>
        `;
        document.body.appendChild(hint);
    }

    // Show hint
    setTimeout(() => hint.classList.add('visible'), 500);

    // Hide after 4 seconds
    setTimeout(() => {
        hint.classList.remove('visible');
        setTimeout(() => hint.remove(), 300);
    }, 4000);
}

// Trigger hint when first visiting an entity tab
document.addEventListener('click', function(e) {
    const tab = e.target.closest('.entity-tabs .tab');
    if (tab && !navHintShown) {
        showNavHint();
    }
});

/**
 * Initialize click handlers for entity tab navigation items
 */
function initEntityNavHandlers() {
    // For each entity tab, bind nav item clicks
    ['ardc', 'enf', 'greenfields', 'alrawdah'].forEach(entityId => {
        const tabContent = document.getElementById(`tab-${entityId}`);
        if (!tabContent) return;

        const navItems = tabContent.querySelectorAll('.pres-titles-nav .nav-item[data-flow]');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                const flowKey = this.dataset.flow;
                selectEntityFlow(entityId, flowKey, this);
            });
        });
    });
}

/**
 * Select and show a specific flowchart in an entity tab
 */
function selectEntityFlow(entityId, flowKey, navItem) {
    const tabContent = document.getElementById(`tab-${entityId}`);
    if (!tabContent) return;

    // Update nav item active states
    tabContent.querySelectorAll('.pres-titles-nav .nav-item').forEach(item => {
        item.classList.remove('active');
    });
    if (navItem) navItem.classList.add('active');

    // Clear previous selection
    tabContent.querySelectorAll('.process-node').forEach(node => {
        node.classList.remove('selected');
    });

    // Reset current step tracking so new selection works
    currentEntityStep = null;

    // Show/hide flowcharts based on selection
    const flowcharts = tabContent.querySelectorAll('.visual-flowchart[data-flow]');
    let targetFlowchart = null;
    flowcharts.forEach(chart => {
        if (chart.dataset.flow === flowKey) {
            chart.style.display = 'block';
            targetFlowchart = chart;
        } else {
            chart.style.display = 'none';
        }
    });

    // Auto-select first process in the new flowchart
    if (targetFlowchart) {
        const firstNode = targetFlowchart.querySelector('.process-node[data-step]');
        if (firstNode) {
            const stepId = firstNode.dataset.step;
            const stepName = firstNode.querySelector('.node-label')?.textContent || stepId;
            selectEntityFlowStep(entityId, stepId, stepName);
        }
    }
}

function initEntityFlowcharts(entityId) {
    const container = document.getElementById(`${entityId}-flowcharts`);
    if (!container) return;

    const config = ENTITY_CONFIG[entityId];
    if (!config) return;

    let html = '';

    config.flows.forEach(flowKey => {
        const flow = ENTITY_FLOWS[flowKey];
        if (!flow) return;

        html += `
            <div class="flowchart-section">
                <div class="flowchart-header">
                    <div class="flowchart-icon" style="background: ${flow.color}">
                        <i class="fas ${flow.icon}"></i>
                    </div>
                    <div>
                        <div class="flowchart-title">${flow.name}</div>
                        <div class="flowchart-subtitle">${flow.subtitle}</div>
                    </div>
                </div>
                <div class="flowchart-body">
                    <div class="flowchart">
        `;

        flow.steps.forEach((step, i) => {
            const [stepId, stepName] = step;
            const stats = REPORT_DATA.stepStats[stepId] || { total: 0, high: 0, medium: 0, low: 0 };

            let boxClass = '';
            let countClass = '';
            if (stats.high > 0) {
                boxClass = 'has-high';
                countClass = 'high';
            } else if (stats.medium > 0) {
                boxClass = 'has-medium';
                countClass = 'medium';
            } else if (stats.low > 0) {
                boxClass = 'has-low';
            }

            if (i > 0) {
                html += '<span class="flow-arrow"><i class="fas fa-arrow-right"></i></span>';
            }

            html += `
                <div class="flow-box ${boxClass}" data-step="${stepId}" data-entity="${entityId}" onclick="selectEntityFlowStep('${entityId}', '${stepId}', '${escapeHtml(stepName)}')">
                    <span class="flow-id">${stepId}</span>
                    <div class="flow-name">${stepName}</div>
                    ${stats.total > 0 ? `<span class="flow-count ${countClass}">${stats.total}</span>` : ''}
                </div>
            `;
        });

        html += `
                    </div>
                </div>
                <div class="flow-legend">
                    <div class="legend-item"><div class="legend-box high"></div> High Risk</div>
                    <div class="legend-item"><div class="legend-box medium"></div> Medium Risk</div>
                    <div class="legend-item"><div class="legend-box low"></div> Low Risk</div>
                    <div class="legend-item"><div class="legend-box none"></div> No Findings</div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

let currentEntity = null;
let currentEntityStep = null;

// Process step metadata for panel display - Al Rawabi Production Process Analysis
const STEP_METADATA = {
    'PP-01': {
        title: 'Demand Planning & Forecasting',
        currentState: [
            'Manual, reactive process driven by daily sales requirements',
            'No strategic system-generated forecasts in SAP',
            'Hybrid Make-to-Stock / Make-to-Order model without formal planning',
            'No automation for seasonality (Ramadan +60%) or promotional impacts',
            'Sales requirements communicated directly to production informally'
        ],
        bestPractice: [
            'SAP APO/IBP with ML-based statistical forecasting',
            'Collaborative S&OP process across sales, marketing, operations',
            'Daily forecasting granularity for fresh dairy (7-day shelf life)',
            'Built-in seasonal profiles and promotional uplift factors',
            'PIRs entered with consumption strategies and version control'
        ],
        controls: [
            'Statistical forecasting tools with ML models',
            'Daily/weekly forecast granularity by SKU',
            'Seasonal pattern automation (Ramadan, weekends)',
            'PIR entry with consumption strategies',
            'Weekly MAPE/Bias tracking and improvement'
        ]
    },
    'PP-02': {
        title: 'Recipe & Formulation Management',
        currentState: [
            'Formulation managed outside SAP using spreadsheets',
            'Static, volume-based BOM structure',
            'Milk treated as fixed input, not dynamic fat/protein/SNF components',
            'No real-time visibility into recipe modification cost impacts',
            'Cost variances only visible at month-end'
        ],
        bestPractice: [
            'SAP PP-PI Master Recipes with version control',
            'Integration with PLM for R&D formulation management',
            'Multi-level formula-based BOMs by fat%, protein%, SNF%',
            'Dynamic input calculation based on incoming milk quality',
            'Engineering Change Management with cost simulation'
        ],
        controls: [
            'PP-PI Master Recipes with version control',
            'Multi-level formula-based BOMs',
            'Real-time formulation system integration',
            'Engineering Change Management (ECM)',
            'Nutritional compliance and labeling automation'
        ]
    },
    'PP-03': {
        title: 'Material Requirements Planning (MRP)',
        currentState: [
            'MRP used as administrative tool, not strategic planning engine',
            'Planned orders frequently overridden manually',
            'No shelf-life constraints in planning (fresh 7-day vs UHT 180-day)',
            'Overproduction and spoilage risks without manual oversight',
            'Component-level planning for fat/protein/SNF not enabled'
        ],
        bestPractice: [
            'Finite capacity MRP with resource constraints',
            'SLED management with day-specific fresh product requirements',
            'Component-level planning for fat, SNF, protein',
            'Standardization yield calculations integrated',
            'Automated exception messages with planner workbench'
        ],
        controls: [
            'Finite capacity MRP with constraints',
            'Shelf-life (SLED) integrated planning',
            'Component-level planning (fat, SNF, protein)',
            'Period lot sizing aligned with shelf life',
            'Automated exception processing'
        ]
    },
    'PP-04': {
        title: 'Production Scheduling & Capacity Planning',
        currentState: [
            'Labor-intensive manual scheduling process',
            'Significant management time spent on daily run organization',
            'Assumed 70% capacity utilization without real-time data',
            'No integrated visibility into machine availability',
            'Maintenance schedules and labor shifts not in planning system'
        ],
        bestPractice: [
            'SAP PP/DS or APO for finite scheduling',
            'Real-time capacity visualization dashboards',
            'Rule-based automatic scheduling with optimization',
            'Automatic line assignment with changeover matrix',
            'Integrated maintenance planning visibility'
        ],
        controls: [
            'Finite capacity scheduling (PP/DS)',
            'Work center definitions with rates',
            'Automatic line assignment and sequencing',
            'Changeover optimization',
            'Maintenance calendar integration'
        ]
    },
    'PP-05': {
        title: 'Milk Reception & Weighbridge Management',
        currentState: [
            'Weighbridge not integrated with SAP',
            'Vehicle entry permitted without PO validation',
            'Materials received and consumed before system documentation',
            'Quality verification often completed after consumption',
            'Inventory discrepancies between physical and system records'
        ],
        bestPractice: [
            'SAP-integrated weighbridge with auto weight capture',
            'Mandatory gate pass with PO validation before entry',
            'Real-time tanker receipt with silo assignment',
            'Mobile sampling with LIMS integration',
            'Configurable tolerance management with variance alerts'
        ],
        controls: [
            'Integrated weighbridge with SAP',
            'Gate pass control linked to PO',
            'Real-time tanker receipt and silo tracking',
            'LIMS integration for quality sampling',
            'Tolerance management and variance alerts'
        ]
    },
    'PP-06': {
        title: 'Standardization & Component Balancing',
        currentState: [
            'Milk combined in silos before component analysis complete',
            'Lab results take 3-4 hours; intake occurs immediately',
            'In-line standardization vs pre-separation upon receipt',
            'Limited batch-level traceability',
            'No precise mass balance tracking for yield loss analysis'
        ],
        bestPractice: [
            'SAP Dairy solution for real-time component tracking',
            'Component-level valuation (fat, protein, SNF)',
            'Automatic cream/skim ratio calculations',
            'In-line analyzers feeding SAP real-time',
            'Component ATP with automatic shortage alerts'
        ],
        controls: [
            'Real-time component tracking (fat, SNF, protein)',
            'Component-level valuation',
            'Automatic standardization calculations',
            'Daily component reconciliation',
            'Component ATP and shortage alerts'
        ]
    },
    'PP-07': {
        title: 'Production Execution & Process Control',
        currentState: [
            'Using Discrete Manufacturing instead of PP-PI Process Manufacturing',
            'Critical parameters (pasteurization temp/time) on paper logs',
            'Machine sensors not integrated with SAP',
            'Volume-based tracking instead of component mass',
            'Systematic yield variance analysis not possible'
        ],
        bestPractice: [
            'PP-PI Process Orders with phases and control recipes',
            'Automatic order creation from MRP',
            'PLC/SCADA integration for critical parameter capture',
            'Real-time shop floor confirmations (mobile)',
            'Same-day TECO after final confirmation'
        ],
        controls: [
            'PP-PI Process Orders (not Discrete)',
            'Control recipe with process parameters',
            'PLC/SCADA integration for data capture',
            'Real-time shop floor confirmations',
            'Same-day work order closure (TECO)'
        ]
    },
    'PP-08': {
        title: 'Quality Management Integration',
        currentState: [
            'Paper-based quality documentation',
            'No active LIMS or SAP QM integration',
            'Fresh products dispatched before micro testing complete (5-day)',
            'Risk-based manual release decisions',
            'Quality hold/release workflows not system-enforced'
        ],
        bestPractice: [
            'Full SAP QM with automatic inspection lot creation',
            'LIMS integration with auto results transfer',
            'In-process SPC and control charts',
            'Quality hold until release with partial release strategies',
            'End-to-end batch genealogy for 2-hour recall'
        ],
        controls: [
            'SAP QM module fully activated',
            'LIMS integration for lab results',
            'Quality hold until release decision',
            'In-process SPC and control charts',
            '4-hour recall traceability capability'
        ]
    },
    'PP-09': {
        title: 'Traceability & Batch Management',
        currentState: [
            'Fragmented traceability with paper documentation',
            'Supplier batch numbers frequently incomplete at GR',
            'Digital chain of custody compromised',
            'Cannot execute mock recall within 4-hour requirement',
            'Vendor batch linkage to finished goods incomplete'
        ],
        bestPractice: [
            'Automatic batch number assignment with mandatory fields',
            'Full batch genealogy with parent-child relationships',
            'SLED management with FEFO-based dispatch',
            'Mock recall drills achieving <2-hour trace capability',
            'Remaining shelf life ATP check at dispatch'
        ],
        controls: [
            'Automatic batch number assignment',
            'Full batch genealogy (batch-to-batch)',
            'SLED and FEFO management',
            'Mock recall capability (<2 hours)',
            'Vendor batch linkage to finished goods'
        ]
    },
    'PP-10': {
        title: 'Inventory & Cold Chain Management',
        currentState: [
            'Inventory accuracy compromised by informal reception',
            'Retrospective system recording creates discrepancies',
            'Materials consumed before formal system receipt',
            'Backflushing causes lag vs real-time physical operations',
            'Cold chain monitoring not integrated with batch records'
        ],
        bestPractice: [
            'Perpetual inventory accuracy >98% with cycle counting',
            'IoT temperature monitoring with auto excursion alerts',
            'FEFO-based picking with system-enforced dispatch rules',
            'Bin-level inventory with transfer order documentation',
            'Mandatory receipt before issue policy'
        ],
        controls: [
            'Perpetual inventory accuracy >98%',
            'IoT cold chain monitoring',
            'FEFO-enforced picking strategies',
            'Bin-level inventory management',
            'Real-time goods movement posting'
        ]
    },
    // Sales & Distribution Process Metadata
    'SD-01': {
        title: 'Van Sales Operations & Route Management',
        currentState: [
            '95-100% dairy distribution via 300+ van routes',
            'External system (Ransale/RISA) manages all van operations',
            'SAP visibility only at Distribution Center level',
            'Routes not configured as storage locations in SAP',
            'Mobile devices offline; batch sync only at start/end of day'
        ],
        bestPractice: [
            'SAP DSD with full route integration and GPS tracking',
            'Each van/route as separate SAP storage location',
            'STO-based van loading with real-time stock tracking',
            'Always-connected devices with continuous sync',
            'Integrated route optimization with dynamic adjustments'
        ],
        controls: [
            'Routes defined as storage locations in SAP',
            'Real-time van inventory visibility',
            'Online/connected device operations',
            'Integrated route optimization',
            'GPS tracking and geofencing'
        ]
    },
    'SD-02': {
        title: 'Order Management & Fulfillment',
        currentState: [
            'Direct delivery model without pre-order capture',
            'Orders via informal channels (phone, email, WhatsApp)',
            'Sales orders recorded in SAP retrospectively after delivery',
            'Standard delivery document process bypassed',
            'Direct billing with custom movement types'
        ],
        bestPractice: [
            'Pre-order capture with ATP check',
            'Standard flow: Sales Order → Delivery → Billing',
            'Proof of delivery with digital signature',
            'Standing order management with auto-generation',
            'Order history and demand pattern analytics'
        ],
        controls: [
            'Pre-order capture with ATP check',
            'Order promising and allocation visibility',
            'Delivery document creation with POD',
            'Standing order management',
            'Backorder management'
        ]
    },
    'SD-03': {
        title: 'Pricing & Promotions Management',
        currentState: [
            'Pricing maintained entirely in external van sales system',
            'SAP pricing procedure functionality replicated externally',
            'Promotions (free goods, bundling, discounts) outside SAP',
            'Final prices transmitted to mobile devices',
            'Retail vs HoReCa differentiation managed externally'
        ],
        bestPractice: [
            'SAP condition technique for centralized pricing',
            'Price list versioning with validity management',
            'Trade Promotion Management with effectiveness analytics',
            'Budget control integration for promotions',
            'Customer hierarchy and volume-based pricing'
        ],
        controls: [
            'Centralized pricing in SAP',
            'Condition record management with validity',
            'Promotion effectiveness tracking',
            'Budget control for promotions',
            'Margin protection alerts'
        ]
    },
    'SD-04': {
        title: 'Returns & Credit Processing',
        currentState: [
            'Returns captured in van sales system by type',
            'Only summarized return data flows to SAP',
            'Quality inspection integration not active',
            'No systematic defect analysis capability',
            'Near-expiry stock management discontinued'
        ],
        bestPractice: [
            'Returns processing in SAP with auto credit memo',
            'QM integration for returned goods inspection',
            'Reason code analysis for root cause tracking',
            'Customer-level return analysis and reduction',
            'Near-expiry segregation with alternate channels'
        ],
        controls: [
            'Returns captured in SAP with reason codes',
            'Automatic credit memo processing',
            'QM integration for returns inspection',
            'Return rate monitoring by customer/product',
            'Root cause analysis and tracking'
        ]
    },
    'SD-05': {
        title: 'Credit Management',
        currentState: [
            'Credit limits in SAP but validation in external system',
            'Real-time exposure only visible in back-office app',
            'SAP receives credit updates via end-of-day batch',
            'Manual cash collection reconciliation',
            'Significant finance team involvement for daily closure'
        ],
        bestPractice: [
            'SAP credit management with real-time exposure',
            'Automatic credit block on limit breach',
            'Customer risk scoring with dynamic credit adjustment',
            'Driver collection tracking with variance alerts',
            'Bank deposit reconciliation automation'
        ],
        controls: [
            'Real-time credit exposure in SAP',
            'Automatic credit block on limit breach',
            'Customer risk categorization',
            'Driver collection tracking',
            'Cash reconciliation automation'
        ]
    },
    'SD-06': {
        title: 'Shelf-Life & FEFO Management',
        currentState: [
            'Shelf-life maintained in van sales system only',
            'FEFO compliance not confirmed as operational',
            'Fresh dairy requires strict 7-day rotation',
            'Near-expiry management capabilities not utilized',
            'Customer minimum shelf-life not validated'
        ],
        bestPractice: [
            'SAP SLED with batch-level expiry tracking',
            'System-enforced FEFO picking',
            'Customer-specific minimum shelf-life rules',
            'Remaining shelf-life ATP check',
            'Auto near-expiry alerts and markdown triggers'
        ],
        controls: [
            'SLED management in SAP',
            'System-enforced FEFO picking',
            'Customer minimum shelf-life check',
            'Remaining shelf-life ATP',
            'Near-expiry alerts and reporting'
        ]
    },
    'SD-07': {
        title: 'E-Commerce Integration',
        currentState: [
            'Magento Cloud operates separately from van sales',
            'E-commerce orders manually consolidated into van system',
            'Treated as single internal customer transaction',
            'Dedicated route for e-commerce fulfillment',
            'Transactions do not flow directly to SAP'
        ],
        bestPractice: [
            'Unified commerce with real-time inventory sync',
            'Automatic order integration with status updates',
            'Dedicated e-commerce fulfillment with wave picking',
            'Same-day delivery capability',
            'Channel-specific revenue recognition in SAP'
        ],
        controls: [
            'Real-time order integration from e-commerce',
            'Inventory allocation visibility',
            'Order status updates to customers',
            'Channel-specific revenue tracking',
            'Fulfillment tracking and POD'
        ]
    },
    'SD-08': {
        title: 'SAP Integration & Data Flow',
        currentState: [
            'One-way master data flow: SAP → van sales via IDOC',
            'Direct database connectivity for transactions',
            'All transactions posted to SAP in batch after daily close',
            'SAP has DC-level visibility only, not route-level',
            'In-transit stock tracking gaps in SAP'
        ],
        bestPractice: [
            'Real-time bidirectional integration with error handling',
            'Standard Order → Delivery → Billing flow',
            'Real-time goods movement posting',
            'Route-level stock visibility in SAP',
            'In-transit tracking with STO and delivery confirmation'
        ],
        controls: [
            'Real-time transaction integration',
            'Bidirectional master data sync',
            'Standard document flow (Order-Delivery-Billing)',
            'In-transit stock tracking',
            'Integration error handling'
        ]
    },
    'SD-09': {
        title: 'Multi-Channel Revenue & Profitability',
        currentState: [
            'Multiple channels: B2B van (95%+), e-commerce, POS, agricultural',
            'SAP receives only summarized data',
            'Route-level profitability not available in SAP',
            'POS posts as consolidated entries (compliance risk)',
            'Channel/customer profitability analysis not possible in SAP'
        ],
        bestPractice: [
            'Multi-dimensional profitability by channel/route/customer',
            'Activity-based costing for cost-to-serve',
            'Real-time dashboards with KPI tracking',
            'Individual transaction posting for compliance',
            'Route profitability for investment decisions'
        ],
        controls: [
            'Revenue split by channel in SAP',
            'Route profitability tracking',
            'Customer profitability analysis',
            'Product margin visibility',
            'Real-time profitability dashboards'
        ]
    },
    'SD-10': {
        title: 'Crate & Returnable Management',
        currentState: [
            'Mandatory checkpoint controls at journey start/end',
            'All crate tracking in external back-office system',
            'Crate shortages reconciled through driver accountability',
            'Customer equipment (fridges, displays) minimally tracked',
            'No crate management in SAP'
        ],
        bestPractice: [
            'Returnable packaging in SAP with deposit/refund',
            'Crate inventory as storage location stock',
            'Aging of unreturned crates with auto follow-up',
            'Customer crate account tracking',
            'Asset tracking for fridges and displays'
        ],
        controls: [
            'Crate inventory in SAP',
            'Customer crate balance tracking',
            'Deposit/refund accounting',
            'Unreturned crate aging',
            'Asset placement tracking'
        ]
    },
    'SD-11': {
        title: 'Delivery & Cold Chain Management',
        currentState: [
            'Refrigerated vehicles for dairy delivery',
            'End-of-day settlement with supervisor approval',
            'Route optimization (RoadNet) suspended – MDM issues',
            '6,000-7,000 daily deliveries managed',
            'Cold chain monitoring not integrated with SAP'
        ],
        bestPractice: [
            'Temperature monitoring integration with batch records',
            'Delivery time windows enforced by customer type',
            'Multi-drop route optimization with real-time adjustments',
            'POD with signature, photo, and GPS confirmation',
            'Delivery failure tracking with redelivery management'
        ],
        controls: [
            'Temperature monitoring integration',
            'Delivery time window management',
            'Proof of delivery capture',
            'Delivery exception handling',
            'Cold chain compliance documentation'
        ]
    },

    // =========================================
    // Al Rawabi - Finance & Controlling
    // =========================================
    'ARDC-FI-01': {
        title: 'Group Structure & Organization',
        currentState: [
            '7 company codes currently, expanding to 8 with Kizad',
            'Two divisions: Dairy/Juice (4 entities) and Poultry (3 entities)',
            'Emirates Al Rawabi as holding company (100% ownership)',
            'Company code numbering not standardized (2xxx, 1000, 7xxx, 5000)',
            'Foreign entities: Oman (OMR), Sudan (USD) with different accounting'
        ],
        bestPractice: [
            'Standardized company code naming convention',
            'Clear legal entity hierarchy documentation',
            'Division-level reporting alignment',
            'Geographic separation for foreign entities',
            'Scalable structure for future expansion'
        ],
        controls: [
            'Entity hierarchy documentation',
            'Ownership structure compliance',
            'Division assignment verification',
            'Foreign branch accounting compliance',
            'New entity setup procedures'
        ]
    },
    'ARDC-FI-02': {
        title: 'Chart of Accounts',
        currentState: [
            'Two separate charts of accounts - Greenfield separate from others',
            'Different account numbering conventions across entities',
            'Same material may have different codes across companies',
            'IFRS-based financial reporting with legal ledger 0L',
            'Goal to consolidate and standardize across group'
        ],
        bestPractice: [
            'Single operational COA for all entities',
            'Group COA for consolidated reporting',
            'Standardized account numbering',
            'Automated mapping between operational and group COA',
            'Clear account hierarchy and ownership'
        ],
        controls: [
            'COA standardization compliance',
            'Account creation governance',
            'Cross-entity consistency checks',
            'IFRS compliance verification',
            'COA change management'
        ]
    },
    'ARDC-FI-03': {
        title: 'Consolidation',
        currentState: [
            'Excel-based consolidation - manual and error-prone',
            'Trial balances aggregated from entities monthly',
            'Manual intercompany elimination process',
            'No dedicated consolidation software',
            'All reports generated in AED'
        ],
        bestPractice: [
            'SAP Group Reporting for automation',
            'Transaction-level drill-down capability',
            'Automated IC elimination via ICMR',
            'Real-time consolidation on demand',
            'Flash reporting capability'
        ],
        controls: [
            'Consolidation automation',
            'IC elimination accuracy',
            'Trial balance reconciliation',
            'Currency translation verification',
            'Consolidation audit trail'
        ]
    },
    'ARDC-FI-04': {
        title: 'Intercompany Transactions',
        currentState: [
            'Processed as regular buyer-supplier transactions',
            'Not automated in SAP - manual coordination',
            'Invoices generated manually for VAT compliance',
            'No formal transfer pricing policy',
            'IC loans exist with interest charged'
        ],
        bestPractice: [
            'Automated IC orders with STO billing',
            'Trading partner configuration in BP master',
            'Automatic IC invoicing for VAT compliance',
            'Arm\'s length transfer pricing documentation',
            'IC loan agreements with proper documentation'
        ],
        controls: [
            'IC transaction identification',
            'Transfer pricing compliance',
            'VAT documentation',
            'IC reconciliation automation',
            'Loan agreement compliance'
        ]
    },
    'ARDC-FI-05': {
        title: 'Cost Center Accounting',
        currentState: [
            'Single hierarchy with holding company at top',
            'Cost centers are company code-specific',
            'Internal allocation within cost centers only',
            'Statistical key figures not utilized',
            'No cross-company allocation needed'
        ],
        bestPractice: [
            'Standard hierarchy structure',
            'Consistent naming convention',
            'Activity-based allocation',
            'Clear ownership and budget accountability',
            'Periodic assessment and variance analysis'
        ],
        controls: [
            'Cost center hierarchy compliance',
            'Budget accountability',
            'Allocation accuracy',
            'Variance reporting',
            'Cost center ownership'
        ]
    },
    'ARDC-FI-06': {
        title: 'Profit Center Accounting',
        currentState: [
            '35 profit centers total across group',
            'Categorized by segments: Dairy, Juice, Bakery, Trading',
            'Further divided by Distribution Centers (Sharjah, Abu Dhabi, Dubai)',
            'Profit centers can span multiple company codes',
            'Access control based on profit center assignments'
        ],
        bestPractice: [
            'Segment alignment for IFRS 8 compliance',
            'Geographic granularity for performance tracking',
            'Profit center balance sheet capability',
            'Cross-company analysis enabled',
            'Role-based access control'
        ],
        controls: [
            'Segment reporting compliance',
            'Profit center assignment accuracy',
            'Cross-entity consistency',
            'Access control enforcement',
            'Performance tracking'
        ]
    },
    'ARDC-FI-07': {
        title: 'Product Costing',
        currentState: [
            'Standard costing with actual costing run monthly',
            'Material ledger active and running actual costing',
            '5 activity types: Material, Labor, Depreciation, Maintenance, Utilities',
            'Direct costs and overhead costs included in product cost',
            'Fixed rates applied to activities consumed'
        ],
        bestPractice: [
            'Standard cost planning with variance analysis',
            'Material ledger for actual cost component split',
            'Activity-based costing',
            'Periodic inventory revaluation',
            'Over/under absorption analysis'
        ],
        controls: [
            'Standard cost accuracy',
            'Actual costing run completion',
            'Variance analysis',
            'Overhead absorption rates',
            'Inventory valuation'
        ]
    },
    'ARDC-FI-08': {
        title: 'Profitability Analysis (CO-PA)',
        currentState: [
            'CO-PA live and active - costing-based approach',
            'One operating concern assigned to controlling area',
            'Characteristics: Product type (Fresh/Frozen), segments, DCs',
            'Actual costing feeds into CO-PA',
            'Management reporting for profitability by segment/product/region'
        ],
        bestPractice: [
            'Account-based CO-PA in S/4HANA',
            'Real-time profitability analysis',
            'Multi-dimensional analysis with drill-down',
            'Unified valuation approach',
            'Executive dashboards'
        ],
        controls: [
            'CO-PA data accuracy',
            'Characteristic assignment',
            'Value field reconciliation',
            'Margin analysis',
            'Report accuracy verification'
        ]
    },

    // =========================================
    // Al Rawabi - Materials Management
    // =========================================
    'ARDC-MM-01': {
        title: 'Demand Planning & Forecasting',
        currentState: [
            '16-week rolling forecast recently implemented',
            'IBP for data gathering, Resa tool for processing before SAP upload',
            'Heavy reliance on Excel for planning calculations',
            'Forecast data manually uploaded to SAP as PIRs',
            'Sales-based planning for all raw materials'
        ],
        bestPractice: [
            'SAP IBP or S/4 Demand Management',
            'Automatic PIR generation from forecast',
            'Statistical forecasting with ML',
            'Consensus demand planning process',
            'Seasonal and promotional adjustment'
        ],
        controls: [
            'Forecast accuracy measurement',
            'PIR version control',
            'Budget integration',
            'Demand signal monitoring',
            'Planning cycle compliance'
        ]
    },
    'ARDC-MM-02': {
        title: 'Material Requirements Planning (MRP)',
        currentState: [
            'MRP concept in place but not fully operational in SAP',
            'Manual calculations using Excel for requirements',
            'Only initial data extraction from SAP automated',
            'Reorder point planning used for some materials',
            'Feed requirements calculated in Excel by farm personnel'
        ],
        bestPractice: [
            'Fully automated MRP with daily/weekly runs',
            'Exception-based management with planner workbench',
            'Automatic PR generation from MRP',
            'Dynamic safety stock calculation',
            'Lead time accuracy and lot size optimization'
        ],
        controls: [
            'MRP run completion',
            'Exception monitoring',
            'Master data accuracy (lead times, lot sizes)',
            'Safety stock compliance',
            'Automatic PR generation'
        ]
    },
    'ARDC-MM-03': {
        title: 'Milk & Cream Balancing',
        currentState: [
            'Complex Excel sheet for balancing with daily formulas',
            'Monthly requirements with daily adjustments needed',
            'Balancing at milk level, not component level (fat/protein/SNF)',
            'Cream supply critical - shortages must be prevented',
            'Seasonal variations (Ramadan, Eid) considered manually'
        ],
        bestPractice: [
            'SAP PP-PI batch balancing',
            'Component-level tracking (fat/protein/SNF)',
            'Real-time adjustments and visibility',
            'Scenario modeling and what-if analysis',
            'Yield optimization algorithms'
        ],
        controls: [
            'Daily balancing completion',
            'Component yield tracking',
            'Cream supply monitoring',
            'Seasonal adjustment accuracy',
            'Waste minimization'
        ]
    },
    'ARDC-MM-04': {
        title: 'Procurement Process',
        currentState: [
            'Manual PR-to-PO process entirely',
            'PRs required for all materials before POs (max 4 approval levels)',
            'POs have max 5 levels of approval',
            'Vendor selection manual based on buyer experience',
            'Emergency purchases via petty cash (AED 7,000 limit)'
        ],
        bestPractice: [
            'Source determination and automatic PO creation',
            'Outline agreements for recurring purchases',
            'Vendor scorecards and RFQ automation',
            'Commodity contract management',
            'Service contract monitoring with renewal alerts'
        ],
        controls: [
            'PR approval compliance',
            'PO release strategy',
            'Budget availability check',
            'Vendor performance tracking',
            'Contract expiration monitoring'
        ]
    },
    'ARDC-MM-05': {
        title: 'Goods Receipt Process',
        currentState: [
            'Physical receiving at designated locations',
            'Barcode scanning for palletization with HU capture',
            'Handling units critical - barcode identifies contents',
            'GR for emergency purchases followed by petty cash request',
            'Batch information captured (SCA code, DC, batch, dates)'
        ],
        bestPractice: [
            'RF scanning with automatic batch assignment',
            'Real-time GR posting',
            'Delivery scheduling and dock management',
            'Full HU lifecycle management',
            'Quality inspection integration'
        ],
        controls: [
            'GR timeliness',
            'Batch traceability',
            'HU accuracy',
            'Invoice verification',
            'Quality inspection compliance'
        ]
    },
    'ARDC-MM-06': {
        title: 'Inventory Management',
        currentState: [
            'Stock Transport Orders (STOs) between DCs',
            'Both plant-based and SLOC-based STOs used',
            'Biosecurity restrictions for Kizad (no inbound transfers)',
            'Materials valued consistently across plants',
            'Dead stock issue requiring attention'
        ],
        bestPractice: [
            'One-step/two-step STO with in-transit visibility',
            'System-enforced biosecurity rules',
            'Automatic replenishment',
            'Slow-moving analysis and write-off procedures',
            'Material ledger for actual costing'
        ],
        controls: [
            'Transfer compliance',
            'Biosecurity rule enforcement',
            'In-transit tracking',
            'Dead stock monitoring',
            'Valuation consistency'
        ]
    },
    'ARDC-MM-07': {
        title: 'Warehouse Management',
        currentState: [
            'WMS in use for storage and transfers',
            'No dedicated warehouse manager - items stored anywhere',
            'Transfer orders and confirmations handled by system',
            'Barcode-based HU identification',
            'Some complexities may be overlooked'
        ],
        bestPractice: [
            'Full WM/EWM deployment',
            'Rule-based putaway and storage type determination',
            'Wave picking and task interleaving',
            'Capacity management',
            'Performance monitoring'
        ],
        controls: [
            'Storage assignment optimization',
            'Transfer order completion',
            'HU tracking accuracy',
            'Capacity utilization',
            'Pick/pack efficiency'
        ]
    },
    'ARDC-MM-08': {
        title: 'Master Data Management',
        currentState: [
            'Duplicate material codes for same items across entities',
            'Vendor master separate per company code',
            'Custom material types defined (e.g., ZROH)',
            'Master data quality issues prevalent',
            'Different codes for same materials from different vendors'
        ],
        bestPractice: [
            'Global material master with single code per material',
            'Central vendor master with Business Partner model',
            'Standard material types preferred',
            'Data governance council with data owners',
            'Quality monitoring and change control'
        ],
        controls: [
            'Material code uniqueness',
            'Vendor master governance',
            'Material type standardization',
            'Data quality monitoring',
            'Change control process'
        ]
    },

    // ENF Poultry Processing - Process Metadata
    'PF-09': {
        title: 'Live Bird Collection & Receipt',
        currentState: [
            'Birds received from farms (50,000-60,000 daily processing)',
            'No SAP Livestock Management module implemented',
            'Flock data managed outside SAP in spreadsheets',
            'Multi-source DOCs mixed in same houses – traceability lost',
            'Live bird inventory not properly valued in SAP'
        ],
        bestPractice: [
            'SAP Livestock Management for flock lifecycle tracking',
            'MSG live receiving with platform weighing integration',
            'Ante-mortem inspection with automatic batch holds',
            'Source segregation by house for full traceability',
            'Real-time mortality tracking with reason codes'
        ],
        controls: [
            'Livestock Management flock master data',
            'Platform weighing integration',
            'Ante-mortem inspection lots',
            'Source segregation enforcement',
            'Daily mortality recording'
        ]
    },
    'PF-10': {
        title: 'Slaughter Processing',
        currentState: [
            'Five production orders in chain (Egg→DOC→Broiler→Carcass→Portions→FG)',
            'Fresh (PPE) and frozen (FPPE) are separate facilities',
            '70% fresh, 30% frozen production ratio',
            'No SAP MSG module – catch-weight not handled',
            'Production order created AFTER actual output known'
        ],
        bestPractice: [
            'SAP MSG integrated production chain',
            'Disassembly BOM with standard yields',
            'Catch-weight management throughout',
            'Line capacity optimization',
            'Yield tracking by line and shift'
        ],
        controls: [
            'MSG slaughter planning',
            'Catch-weight capture at kill',
            'Line efficiency tracking',
            'Yield variance analysis',
            'Production versioning'
        ]
    },
    'PF-11': {
        title: 'Portioning & Packing',
        currentState: [
            '65-70% whole chicken, 30-35% portions output',
            'Variable yield challenge – plan differs from actual significantly',
            'Multiple SKU sizes from same input (1kg, 1.2kg, etc.)',
            'SKU determined at packing based on actual weight',
            'No value-based splitting for portion costing'
        ],
        bestPractice: [
            'MSG carcass breakdown BOM',
            'Value-based splitting for accurate portion cost',
            'Weight-range classification for automatic SKU assignment',
            'Catch-weight inventory management',
            'By-product costing and routing'
        ],
        controls: [
            'Disassembly BOM with yields',
            'Value-based cost allocation',
            'Automatic SKU assignment',
            'Catch-weight inventory',
            'Portion profitability tracking'
        ]
    },
    'PF-12': {
        title: 'Further Processing & Private Label',
        currentState: [
            'Key accounts (Nandos) have dedicated marinated products',
            'Customer provides marination free of charge',
            'White-label production for customers like Viva',
            'No formal contract management in SAP',
            'Recipe and pricing in informal arrangements'
        ],
        bestPractice: [
            'Contract management in SAP SD',
            'Customer specification master data',
            'Customer-furnished materials tracking',
            'Specification-driven production orders',
            'Subcontracting integration for private label'
        ],
        controls: [
            'Customer specification master',
            'Contract management with validity',
            'Customer-furnished material tracking',
            'Scheduling agreement handling',
            'Private label cost segregation'
        ]
    },
    'PF-13': {
        title: 'Quality Management',
        currentState: [
            'Quality checks performed but not recorded in SAP',
            'No LIMS integration – manual documentation',
            'DOC quality specs only recently implemented (one month)',
            'Hatching egg testing done 20-22 days into cycle – too late',
            'Disease traceability limited when batches mixed'
        ],
        bestPractice: [
            'SAP QM with automatic inspection lot creation',
            'LIMS integration for automated result capture',
            'Pre-incubation testing and early disease detection',
            'HACCP CCP monitoring with automatic batch holds',
            'Salmonella/Campylobacter tracking and regulatory docs'
        ],
        controls: [
            'SAP QM inspection lots',
            'LIMS integration',
            'Incoming inspection automation',
            'HACCP CCP monitoring',
            'Microbiological testing records'
        ]
    },
    'PF-14': {
        title: 'Inventory & Traceability',
        currentState: [
            'Fresh (0-4°C, 24-72hr shelf life), Frozen (-18°C, 1yr)',
            '13% average returns (target 10-12%)',
            'Good returns repacked as frozen under Salwa brand',
            'Batch numbers by production date – same-day batches',
            'FEFO claimed but system enforcement unclear'
        ],
        bestPractice: [
            'Temperature-zone warehouse management',
            'FEFO by hour for fresh products',
            'Cold chain monitoring with alerts',
            'Shelf-life based valuation and markdown',
            'Returns inspection workflow with grade-based routing'
        ],
        controls: [
            'Temperature-zone WM',
            'System-enforced FEFO',
            'Cold chain monitoring integration',
            'Shelf-life ATP check',
            'Returns quality inspection'
        ]
    },
    'PF-15': {
        title: 'Sales & Distribution',
        currentState: [
            'Van sales via 32 routes – routes ARE locations in SAP',
            'SONIC app (Android) manages field operations',
            'Fully offline operation with end-of-day sync',
            'No route profitability analysis in SAP',
            'Export sales (~3%) managed directly in SAP'
        ],
        bestPractice: [
            'SAP DSD with real-time route visibility',
            'Catch-weight enabled sales for poultry',
            'Online/real-time device connectivity',
            'Route profitability in CO-PA',
            'Customer profitability analysis'
        ],
        controls: [
            'Route-level profitability',
            'Catch-weight sales management',
            'Real-time van sales sync',
            'Customer margin analysis',
            'Export documentation automation'
        ]
    },
    // ENF Sales & Distribution
    'ENF-SD-01': {
        title: 'Van Sales & Routes',
        currentState: [
            '32 van routes configured as locations in SAP',
            'SONIC Android app manages field operations',
            'Fully offline – morning stock load, evening sync',
            'Reconciliation at van level, not depot level',
            'No real-time visibility during the day'
        ],
        bestPractice: [
            'SAP DSD with real-time route integration',
            'Cloud-based continuous sync capability',
            'Catch-weight enabled van sales',
            'Mobile device management and tracking',
            'Real-time inventory and sales visibility'
        ],
        controls: [
            'Real-time van sales sync',
            'Route GPS tracking',
            'Device management platform',
            'Offline transaction validation',
            'Automated reconciliation'
        ]
    },
    'ENF-SD-02': {
        title: 'Order Management',
        currentState: [
            'Daily sync with SAP for master data and transactions',
            'End-of-day transaction upload',
            'Manual reconciliation between SONIC and SAP',
            'No real-time ATP check during offline operation',
            'Price and master data updated next day only'
        ],
        bestPractice: [
            'Real-time order integration with SAP',
            'ATP check at point of sale',
            'Continuous master data sync',
            'Automated discrepancy resolution',
            'Order history and analytics'
        ],
        controls: [
            'SAP SD order integration',
            'ATP availability check',
            'Price validation at order',
            'Credit limit enforcement',
            'Duplicate order prevention'
        ]
    },
    'ENF-SD-03': {
        title: 'Route Profitability',
        currentState: [
            'No route profitability analysis in SAP CO-PA',
            'Weekly supervisor meetings with external reports',
            'No customer-level profitability tracking',
            'Manual Excel-based analysis',
            'Cannot identify profitable vs loss-making routes'
        ],
        bestPractice: [
            'Route profitability in SAP CO-PA',
            'Customer profitability analysis',
            'Product margin by route and customer',
            'Real-time profitability dashboards',
            'Automatic route optimization'
        ],
        controls: [
            'CO-PA multi-dimensional analysis',
            'Route contribution margin',
            'Customer profitability reports',
            'Exception alerting for losses',
            'Performance-based route assignment'
        ]
    },
    'ENF-SD-04': {
        title: 'Export Sales',
        currentState: [
            'Only ~3% of frozen sales exported',
            'Manual sales order creation in SAP',
            'Customer picks up – no delivery responsibility',
            'Export documentation generated manually',
            'Halal certificates managed outside system'
        ],
        bestPractice: [
            'Export documentation automation',
            'Health certificate generation',
            'Halal certificate integration',
            'Export compliance tracking',
            'International shipping integration'
        ],
        controls: [
            'Export document checklist',
            'Certificate generation workflow',
            'Compliance verification',
            'Customs documentation',
            'International trade compliance'
        ]
    },
    'ENF-SD-05': {
        title: 'B2B Key Accounts',
        currentState: [
            'Key accounts like Nandos with dedicated handling',
            'Customer-provided marination formulas',
            'No formal contract management in SAP',
            'Recipe and pricing in separate arrangements',
            'Manual specification management'
        ],
        bestPractice: [
            'SAP SD contract management',
            'Customer specification master',
            'Scheduling agreement automation',
            'Key account pricing controls',
            'SLA monitoring and compliance'
        ],
        controls: [
            'Contract compliance tracking',
            'Customer spec enforcement',
            'Scheduling agreements',
            'Key account pricing',
            'Performance SLAs'
        ]
    },
    'ENF-SD-06': {
        title: 'Private Labeling',
        currentState: [
            'White-label production for customers like Viva',
            'Customer provides artwork and specifications',
            'Recipe and pricing included in arrangement',
            'Packaging managed outside SAP BOM',
            'Manual coordination for label changes'
        ],
        bestPractice: [
            'Subcontracting integration in SAP',
            'Customer-furnished materials tracking',
            'Specification-driven production orders',
            'Label management system',
            'Artwork version control'
        ],
        controls: [
            'Private label BOM',
            'Customer material management',
            'Artwork version control',
            'Specification compliance',
            'Label accuracy verification'
        ]
    },
    'ENF-SD-07': {
        title: 'Returns & Credits',
        currentState: [
            '13% average returns (target 10-12%)',
            'Good returns repacked as frozen (Salwa brand)',
            'Bad returns sent to rendering',
            '80% classified as good for reprocessing',
            'Quality lot created for decision-making'
        ],
        bestPractice: [
            'Returns inspection workflow',
            'Root cause analysis system',
            'Grade-based automatic routing',
            'Defect pattern tracking',
            'Returns cost allocation'
        ],
        controls: [
            'QM-SD integration',
            'Returns inspection lot',
            'Root cause coding',
            'Defect trend analysis',
            'Rendering by-product tracking'
        ]
    },
    // ENF Production Planning
    'ENF-PP-01': {
        title: 'Egg Procurement & Grading',
        currentState: [
            'Hatching eggs from Liwa/Salwa (internal entity)',
            'Manual delivery notes – not in SAP',
            'Graded into A (hatchable) and B (reject) at ENF',
            'B-grade returned to Salwa for sale',
            'No batch genealogy for egg traceability'
        ],
        bestPractice: [
            'SAP Livestock Management integration',
            'Egg quality tracking by batch',
            'Automatic batch classification',
            'Supplier performance scoring',
            'Digital grading records in QM'
        ],
        controls: [
            'Intercompany STO with traceability',
            'Quality inspection at receipt',
            'Batch genealogy tracking',
            'Supplier performance records',
            'Transfer pricing documentation'
        ]
    },
    'ENF-PP-02': {
        title: 'Hatchery Operations',
        currentState: [
            'Single production order for 21-day incubation cycle',
            'Scrapping recorded during cycle for mortality',
            'Historical hatchability estimates 85-86% vs actual 90-92%',
            'Good production receives all accumulated costs',
            'GRM based on number of viable DOCs'
        ],
        bestPractice: [
            'MSG incubation management',
            'Daily mortality tracking',
            'Hatch yield analysis by breed',
            'Statistical hatchability models',
            'Continuous improvement tracking'
        ],
        controls: [
            'Daily hatchery transactions',
            'Breed performance comparison',
            'Hatchery efficiency KPIs',
            'Standard cost with variance',
            'Hatch yield monitoring'
        ]
    },
    'ENF-PP-03': {
        title: 'Farm & Flock Management',
        currentState: [
            'No SAP Livestock Management – flock data outside system',
            'One production order per house',
            'Feed delivered bulk to silos without measurement',
            'FCR 1.7-1.8 vs industry benchmark 1.4',
            'Multi-source DOC mixing loses traceability'
        ],
        bestPractice: [
            'SAP Livestock Management flock master',
            'Daily flock transactions and KPIs',
            'House-by-house feed consumption',
            'Real-time FCR monitoring',
            'Source segregation by house'
        ],
        controls: [
            'Livestock master data',
            'Daily mortality with reason codes',
            'Silo-level feed tracking',
            'FCR by flock/vendor',
            'No-mixing policy enforcement'
        ]
    },
    'ENF-PP-04': {
        title: 'Live Bird Receipt',
        currentState: [
            'Birds received from farms – 50-60K daily',
            'Platform weighing not integrated with SAP',
            'Ante-mortem inspection performed manually',
            'No system recording of health inspection',
            'Cannot establish yield baseline'
        ],
        bestPractice: [
            'MSG live receiving integration',
            'Platform weighing automation',
            'Ante-mortem inspection in QM',
            'Yield baseline establishment',
            'Transport condition monitoring'
        ],
        controls: [
            'Weighbridge SAP integration',
            'Health inspection recording',
            'Yield baseline tracking',
            'Transport documentation',
            'Crate tracking system'
        ]
    },
    'ENF-PP-05': {
        title: 'Slaughter Processing',
        currentState: [
            'Fresh (PPE) and frozen (FPPE) separate facilities',
            '70% fresh, 30% frozen ratio',
            'Line speed not captured in SAP',
            'Yield variances not linked to line performance',
            'Five production orders in chain'
        ],
        bestPractice: [
            'MSG slaughter planning',
            'Line capacity optimization',
            'Yield tracking by line',
            'Real-time line monitoring',
            'Operator performance tracking'
        ],
        controls: [
            'Line speed monitoring',
            'Yield by operator/shift',
            'Capacity utilization tracking',
            'Production scheduling',
            'Line efficiency KPIs'
        ]
    },
    'ENF-PP-06': {
        title: 'Carcass to Portions',
        currentState: [
            'Variable yield – order created AFTER output known',
            '65-70% whole chicken, 30-35% portions',
            'No value-based carcass splitting',
            'By-products not systematically valued',
            'Plan differs from actual significantly'
        ],
        bestPractice: [
            'MSG variable yield handling',
            'Catch-weight management',
            'Value-based joint cost allocation',
            'By-product costing',
            'Portion profitability analysis'
        ],
        controls: [
            'MSG disassembly BOM',
            'Market price-based splitting',
            'By-product valuation',
            'Yield variance analysis',
            'Production versioning'
        ]
    },
    'ENF-PP-07': {
        title: 'SKU & Packing',
        currentState: [
            'Multiple SKU sizes from same input',
            'SKU determined at packing by actual weight',
            'No catch-weight inventory in SAP',
            'Weight-range classification manual',
            'Automatic SKU assignment not implemented'
        ],
        bestPractice: [
            'Catch-weight inventory management',
            'Automatic weight-range classification',
            'Dynamic SKU assignment',
            'Fixed-weight compliance tracking',
            'Giveaway reduction analytics'
        ],
        controls: [
            'Catch-weight inventory',
            'Weight classification rules',
            'SKU assignment automation',
            'Giveaway monitoring',
            'Pack weight SPC'
        ]
    },
    // ENF Materials Management
    'ENF-MM-01': {
        title: 'DOC Procurement',
        currentState: [
            'DOCs imported entirely from Saudi Arabia',
            'Delivered to doorstep – no inbound logistics',
            'No supplier quality management in SAP',
            'Import documentation manual',
            'Arrival inspection not in system'
        ],
        bestPractice: [
            'Supplier quality management program',
            'Import documentation automation',
            'Arrival inspection in SAP QM',
            'Inbound logistics tracking',
            'Supplier performance scoring'
        ],
        controls: [
            'Vendor qualification program',
            'Incoming inspection automation',
            'Import compliance documentation',
            'Supplier scorecards',
            'Quality history tracking'
        ]
    },
    'ENF-MM-02': {
        title: 'DOC Quality Specifications',
        currentState: [
            'Quality specs only implemented one month ago',
            'Previously no specs in purchase orders',
            'Vendor compliance not tracked systematically',
            'Manual review of specifications',
            'No vendor performance scoring'
        ],
        bestPractice: [
            'Specification management in SAP',
            'Vendor compliance tracking',
            'Automatic spec enforcement',
            'Performance-based vendor scoring',
            'Non-conformance workflow'
        ],
        controls: [
            'QM specification management',
            'Vendor compliance reports',
            'Specification version control',
            'Vendor scorecards',
            'NCR workflow'
        ]
    },
    'ENF-MM-03': {
        title: 'Feed Procurement',
        currentState: [
            '90% feed under government subsidy (ADS)',
            'Quota punched in government portal manually',
            'Greenfields main internal supplier',
            'Limited to approved suppliers',
            'External purchases when quota exceeded'
        ],
        bestPractice: [
            'Subsidy tracking in SAP',
            'Quota management integration',
            'Nutritional spec management',
            'Mycotoxin testing records',
            'Supplier qualification by feed type'
        ],
        controls: [
            'Government portal integration',
            'Quota tracking and alerts',
            'Feed quality specifications',
            'Intercompany STO automation',
            'Supplier performance by feed'
        ]
    },
    'ENF-MM-04': {
        title: 'Vaccine & Medication Inventory',
        currentState: [
            'Managed by farm manager and lab',
            'PR created based on requirements',
            'Cold chain management not in SAP',
            'Temperature excursions not tracked',
            'Withdrawal periods tracked manually'
        ],
        bestPractice: [
            'Cold chain tracking in SAP',
            'Withdrawal period automation',
            'Lot traceability to flocks',
            'Temperature monitoring integration',
            'Vaccine efficacy tracking'
        ],
        controls: [
            'Cold chain monitoring',
            'Withdrawal period enforcement',
            'Lot traceability',
            'Temperature alert system',
            'Vaccine inventory management'
        ]
    },
    'ENF-MM-05': {
        title: 'Live Bird Inventory Valuation',
        currentState: [
            'No daily valuation of growing birds',
            'Valued through production order at cycle end',
            'Millions in inventory not properly valued',
            'Weight gain not recognized per IAS 41',
            'Mortality deduction at cycle end only'
        ],
        bestPractice: [
            'SAP Livestock daily valuation',
            'Weight gain recognition',
            'Mortality deduction daily',
            'IAS 41 fair value compliance',
            'Biological transformation tracking'
        ],
        controls: [
            'Daily inventory valuation',
            'IAS 41 compliance reports',
            'Weight gain automation',
            'Mortality impact tracking',
            'Fair value adjustments'
        ]
    },
    'ENF-MM-06': {
        title: 'Packaging Materials',
        currentState: [
            'Separate packaging for Rauda, Salwa, private labels',
            'Customer artwork managed outside SAP',
            'Version control manual',
            'BOM management complex',
            'Label specification not in system'
        ],
        bestPractice: [
            'Packaging BOM integration',
            'Customer-specific materials',
            'Label management system',
            'Artwork version control',
            'Private label specification tracking'
        ],
        controls: [
            'Packaging BOM accuracy',
            'Artwork version management',
            'Label compliance verification',
            'Customer material tracking',
            'Specification enforcement'
        ]
    },
    // ENF Quality Management
    'ENF-QM-01': {
        title: 'DOC Quality at Receipt',
        currentState: [
            'Quality checks performed but recently formalized',
            'Specifications only implemented one month ago',
            'Swab tests conducted but results outside SAP',
            'No vendor performance scoring',
            'Cannot enforce quality-based selection'
        ],
        bestPractice: [
            'Incoming inspection automation',
            'Supplier performance tracking',
            'Non-conformance management',
            'Vendor qualification program',
            'Specification compliance scoring'
        ],
        controls: [
            'QM incoming inspection',
            'Supplier scorecards',
            'Batch rejection workflow',
            'Vendor qualification audit',
            'Spec compliance tracking'
        ]
    },
    'ENF-QM-02': {
        title: 'Egg & Incubation Testing',
        currentState: [
            'Testing done 20-22 days into cycle (too late)',
            'Results received after hatch – cannot intervene',
            'No pre-incubation testing capability',
            'Cannot trace disease to source when mixed',
            'Pseudomonas example – 18 days to identify'
        ],
        bestPractice: [
            'Pre-incubation testing protocols',
            'Infrared egg analysis',
            'Early disease detection',
            'Batch genealogy for outbreak tracing',
            'Supplier source tracking'
        ],
        controls: [
            'Pre-incubation QC',
            'Disease detection protocols',
            'Batch traceability',
            'Outbreak investigation',
            'Supplier performance by disease'
        ]
    },
    'ENF-QM-03': {
        title: 'In-Process Quality Control',
        currentState: [
            'Quality function exists but not in SAP',
            'HACCP CCP monitoring on paper',
            'Records retained shelf-life + 1 year',
            'Mix of cloud storage and physical files',
            'No automatic batch holds for OOS'
        ],
        bestPractice: [
            'SAP QM inspection lots',
            'HACCP CCP monitoring in system',
            'Automatic batch holds',
            'Real-time quality alerts',
            'Document management integration'
        ],
        controls: [
            'QM inspection recording',
            'HACCP compliance tracking',
            'Auto-hold for OOS results',
            'Quality notification workflow',
            'Document retention compliance'
        ]
    },
    'ENF-QM-04': {
        title: 'Microbiological Testing',
        currentState: [
            'No LIMS integration',
            'Results not linked to production batches',
            'Products can ship before micro results',
            'Salmonella/Campylobacter testing manual',
            'Antibiotic residue testing gaps'
        ],
        bestPractice: [
            'LIMS integration with SAP QM',
            'Automated result capture',
            'Batch hold pending micro clearance',
            'Trend analysis for micro results',
            'Regulatory compliance documentation'
        ],
        controls: [
            'LIMS-SAP integration',
            'Micro result batch linkage',
            'Release hold until cleared',
            'Antibiotic withdrawal tracking',
            'Trend monitoring alerts'
        ]
    },
    'ENF-QM-05': {
        title: 'Returns Quality Handling',
        currentState: [
            'Returns classified as good or bad',
            'Good returns repacked as frozen',
            'Quality lot created for decision',
            'Routing to reprocess or rendering manual',
            'Root cause not systematically tracked'
        ],
        bestPractice: [
            'QM-SD integration',
            'Root cause analysis system',
            'Defect pattern tracking',
            'Automatic grade-based routing',
            'Returns cost allocation'
        ],
        controls: [
            'Returns inspection lot',
            'Defect coding system',
            'Trend analysis',
            'Automatic routing rules',
            'Returns cost tracking'
        ]
    },
    'ENF-QM-06': {
        title: 'Traceability & Recall',
        currentState: [
            'Batch genealogy incomplete',
            'Cannot trace forward or backward completely',
            'Mock recall never tested',
            'Farm-to-fork traceability broken by mixing',
            'Full recall required vs targeted'
        ],
        bestPractice: [
            'Complete batch genealogy',
            'Forward and backward tracing',
            'Mock recall exercises',
            'Farm-to-fork traceability',
            'Recall automation tools'
        ],
        controls: [
            'Batch genealogy tracking',
            'One-up/one-down traceability',
            'Annual mock recall tests',
            'Recall notification system',
            'Regulatory compliance audit'
        ]
    },
    // ENF Finance & Controlling
    'ENF-FI-01': {
        title: 'Biological Asset Accounting',
        currentState: [
            'Breeding flock capitalized for 24 weeks',
            'Amortization weeks 25-65 per IAS 41',
            'All calculations in Excel',
            'Posted via manual journal vouchers',
            'Not charged to production orders'
        ],
        bestPractice: [
            'SAP biological asset module',
            'Daily fair value adjustment',
            'IAS 41 compliance automation',
            'Integration with CO for costing',
            'Automated amortization posting'
        ],
        controls: [
            'Biological asset master',
            'Daily valuation updates',
            'IAS 41 compliance reports',
            'Amortization automation',
            'Audit trail maintenance'
        ]
    },
    'ENF-FI-02': {
        title: 'Amortization Processing',
        currentState: [
            'Excel-based calculations',
            'Posted through manual JVs',
            'Not linked to production orders',
            'Not included in COGS',
            'Audit trail weak for JV postings'
        ],
        bestPractice: [
            'Automated amortization calculation',
            'Integration with production costing',
            'COGS allocation',
            'Period-end automated posting',
            'Complete audit trail'
        ],
        controls: [
            'Automated amortization',
            'Production order integration',
            'COGS inclusion',
            'Reconciliation reports',
            'JV supporting documentation'
        ]
    },
    'ENF-FI-03': {
        title: 'Production Costing',
        currentState: [
            'Period-level costing only',
            'No production order costing',
            'No standard cost variance analysis',
            'WIP valued at accumulated cost',
            'Cannot identify variances by batch'
        ],
        bestPractice: [
            'Production order costing with settlement',
            'Standard vs actual variance analysis',
            'Activity-based costing',
            'WIP revaluation',
            'Batch-level cost tracking'
        ],
        controls: [
            'Production order settlement',
            'Variance analysis reports',
            'Standard cost maintenance',
            'WIP aging analysis',
            'Cost center absorption'
        ]
    },
    'ENF-FI-04': {
        title: 'Labor Cost Allocation',
        currentState: [
            'All labor charged to P&L',
            'Not allocated to production orders',
            'Not part of product cost',
            'No activity-based costing',
            'Direct costs only partially captured'
        ],
        bestPractice: [
            'Activity-based labor allocation',
            'Cost center absorption rates',
            'Product-level labor cost',
            'Shift and line labor tracking',
            'Efficiency variance analysis'
        ],
        controls: [
            'Labor allocation rules',
            'Activity type rates',
            'Production labor tracking',
            'Efficiency reporting',
            'Cost center reconciliation'
        ]
    },
    'ENF-FI-05': {
        title: 'COGS Accuracy',
        currentState: [
            'COGS excludes amortization',
            'COGS excludes labor',
            'Gross margin overstated',
            'CO-PA profitability incomplete',
            'Product margins appear higher than reality'
        ],
        bestPractice: [
            'Complete COGS calculation',
            'Amortization in product cost',
            'Labor in product cost',
            'Accurate gross margin',
            'Full CO-PA profitability'
        ],
        controls: [
            'COGS completeness check',
            'Cost element validation',
            'Margin analysis reports',
            'CO-PA reconciliation',
            'Product profitability audit'
        ]
    },
    'ENF-FI-06': {
        title: 'Profitability Analysis',
        currentState: [
            'No route-level profitability',
            'No customer-level profitability',
            'Weekly manual analysis from external reports',
            'No real-time dashboards',
            'Cannot identify profitable routes/customers'
        ],
        bestPractice: [
            'CO-PA multi-dimensional analysis',
            'Route profitability tracking',
            'Customer margin analysis',
            'Real-time profitability dashboards',
            'Exception-based alerting'
        ],
        controls: [
            'CO-PA route dimension',
            'Customer profitability reports',
            'Product margin by channel',
            'Profitability trend analysis',
            'Loss-making route alerts'
        ]
    },
    // Greenfields Sales & Distribution
    'GF-SD-01': {
        title: 'Sales Channels',
        currentState: [
            'Primarily intercompany sales to ENF (chicken feed)',
            'External cattle feed sales minimal',
            'Sales handled by finance team due to low volumes',
            'Walk-in customers with simplified process',
            'Limited market diversification'
        ],
        bestPractice: [
            'Multiple channel management',
            'Dedicated sales function',
            'CRM integration',
            'Market diversification strategy',
            'Customer portfolio balance'
        ],
        controls: [
            'Channel profitability tracking',
            'Sales team KPIs',
            'Customer segmentation',
            'Market development targets',
            'Sales pipeline management'
        ]
    },
    'GF-SD-02': {
        title: 'Gate Pass System',
        currentState: [
            'Custom program creates gate pass',
            'Auto-generates sales order from gate pass',
            'Customer code, material, quantity captured',
            'Non-standard SAP process',
            'Gate pass as primary sales trigger'
        ],
        bestPractice: [
            'Standard SAP SD process',
            'Mobile order capture',
            'Delivery integration',
            'Order management workflow',
            'Sales approval controls'
        ],
        controls: [
            'Standard order process',
            'Approval workflow',
            'Credit check at order',
            'Pricing validation',
            'Order-to-delivery tracking'
        ]
    },
    'GF-SD-03': {
        title: 'Intercompany Sales',
        currentState: [
            'Feed supplied to ENF via intercompany process',
            'Fixed transfer pricing maintained manually',
            'No formal contracts or scheduling agreements',
            'No demand commitment from ENF',
            'Planning uncertainty from lack of orders'
        ],
        bestPractice: [
            'Scheduling agreements in SAP',
            'Transfer pricing documentation',
            'Intercompany reconciliation automation',
            'Demand commitment contracts',
            'Rolling forecast integration'
        ],
        controls: [
            'Scheduling agreements',
            'Transfer pricing policy',
            'Intercompany matching',
            'Demand visibility',
            'Automatic reconciliation'
        ]
    },
    'GF-SD-04': {
        title: 'Direct Delivery',
        currentState: [
            'Feed delivered directly to ENF farms',
            'Bypasses GF stores – bulk tanker delivery',
            'Central weighbridge only – no farm measurement',
            'Tanker capacity 32.5 tons, minimum 24-28 tons',
            'Cannot deliver precise quantities'
        ],
        bestPractice: [
            'Delivery scheduling system',
            'Proof of delivery capture',
            'Weighbridge integration at delivery',
            'Quantity verification at receipt',
            'Flexible delivery options'
        ],
        controls: [
            'Delivery verification',
            'Weighbridge integration',
            'POD capture',
            'Quantity reconciliation',
            'Delivery scheduling'
        ]
    },
    'GF-SD-05': {
        title: 'Co-Packer Sales',
        currentState: [
            '80% of processed products through co-packers',
            'Previously no contracts – produced on forecasts',
            'Co-packer inventory at GF risk and cost',
            'No advance payments from co-packers',
            'Export without LC or contract – 60-day credit'
        ],
        bestPractice: [
            'Binding contracts for all co-packers',
            '25% advance payment requirement',
            'LC requirement for export',
            'Storage charges for customer inventory',
            'Minimum order quantities'
        ],
        controls: [
            'Contract management',
            'Advance payment tracking',
            'LC documentation',
            'Inventory ownership',
            'Credit risk management'
        ]
    },
    // Greenfields Materials Management
    'GF-MM-01': {
        title: 'Import Procurement',
        currentState: [
            '95% imports are frozen meat from Brazil/China',
            'Less than 5% spare parts',
            'Lead times and container logistics managed manually',
            'Import documentation outside integrated process',
            'Limited supplier diversification'
        ],
        bestPractice: [
            'Import documentation automation',
            'LC management in SAP',
            'Customs integration',
            'Global sourcing strategy',
            'Supplier diversification'
        ],
        controls: [
            'Import tracking',
            'LC workflow',
            'Customs compliance',
            'Supplier qualification',
            'Lead time monitoring'
        ]
    },
    'GF-MM-02': {
        title: 'Planning Method',
        currentState: [
            'MRP does not run in SAP',
            'Excel-based planning generates MRP manually',
            'PR generated based on Excel forecasts',
            '1-month planning horizon only',
            'Working toward 6-month planning'
        ],
        bestPractice: [
            'SAP MRP automation',
            'Demand-driven planning',
            'Safety stock optimization',
            '12-18 month rolling forecast',
            'Seasonal planning integration'
        ],
        controls: [
            'MRP activation',
            'Master data accuracy',
            'Safety stock levels',
            'Reorder point maintenance',
            'Planning run scheduling'
        ]
    },
    'GF-MM-03': {
        title: 'PR/PO Process',
        currentState: [
            'Manual PR creation based on monitoring',
            'PRs raised during month as needed',
            'Workflow approvals in place',
            'No automatic generation from MRP',
            'Ad-hoc procurement timing'
        ],
        bestPractice: [
            'MRP-driven PR generation',
            'Automatic PO creation',
            'Vendor scheduling agreements',
            'Systematic planning cycle',
            'Approval workflow integration'
        ],
        controls: [
            'PR approval workflow',
            'PO automation',
            'Vendor management',
            'Spend analytics',
            'Procurement KPIs'
        ]
    },
    'GF-MM-04': {
        title: 'Commodity Hedging',
        currentState: [
            'No hedging concept in place',
            'Fully exposed to feed ingredient price volatility',
            'No fixed-price contracts with suppliers',
            'No futures or options for commodities',
            'No price escalation clauses in customer contracts'
        ],
        bestPractice: [
            'Futures/options hedging strategy',
            'Fixed price contracts for key commodities',
            'Price escalation clauses',
            'Commodity risk management',
            'Cost pass-through mechanisms'
        ],
        controls: [
            'Hedging policy',
            'Fixed price contracts',
            'Price monitoring',
            'Escalation clause enforcement',
            'Commodity exposure reporting'
        ]
    },
    'GF-MM-05': {
        title: 'Warehouse & Storage',
        currentState: [
            'Central warehouse for spare parts (< 3M value)',
            'Feed not stored – direct delivery to farms',
            'Raw materials stored at mill',
            'No buffer stock capability for feed',
            'Bulk delivery chosen over bags despite control issues'
        ],
        bestPractice: [
            'Raw material storage optimization',
            'Finished feed buffer stock',
            'Staging areas for delivery',
            'FIFO management',
            'Quality preservation controls'
        ],
        controls: [
            'Inventory management',
            'Min-max levels',
            'Storage conditions',
            'FIFO enforcement',
            'Cycle counting'
        ]
    },
    // Greenfields Production Planning
    'GF-PP-01': {
        title: 'Feed Formulation',
        currentState: [
            'Recipes created based on ENF requirements',
            'External formulation software used',
            'Integration with SAP unclear',
            'Recipe management outside SAP',
            'No real-time cost calculation'
        ],
        bestPractice: [
            'SAP Recipe Management',
            'Nutritional optimization',
            'Cost-based formulation',
            'Integrated formulation software',
            'Real-time nutrient balancing'
        ],
        controls: [
            'Recipe version control',
            'Formulation-SAP integration',
            'BOM synchronization',
            'Cost calculation automation',
            'Nutrient specification compliance'
        ]
    },
    'GF-PP-02': {
        title: 'Feed Types',
        currentState: [
            'Multiple feed types: Pre-starter, Starter, Grower, Finisher',
            'Different formulations per growth stage',
            'Manual management of feed type changes',
            'No automatic stage switchover',
            'Manual coordination with farms'
        ],
        bestPractice: [
            'Stage-based recipes in SAP',
            'Automatic switchover triggers',
            'Consumption tracking by stage',
            'Performance tracking by feed type',
            'Stage-specific cost analysis'
        ],
        controls: [
            'Feed type BOM management',
            'Stage transition rules',
            'Consumption by stage',
            'Performance by feed type',
            'Recipe accuracy'
        ]
    },
    'GF-PP-03': {
        title: 'Production Planning',
        currentState: [
            'No integrated planning with ENF demand',
            'Farm capacity drives production, not forecast',
            'No S&OP process across division',
            'Capacity utilization 35-60%',
            'Production reduced pending confirmed contracts'
        ],
        bestPractice: [
            'Demand-driven production',
            'S&OP integration across GF-ENF',
            'Capacity planning and optimization',
            'Order backlog management',
            'Efficiency monitoring'
        ],
        controls: [
            'S&OP process',
            'Demand visibility',
            'Capacity utilization tracking',
            'Production scheduling',
            'Efficiency KPIs'
        ]
    },
    'GF-PP-04': {
        title: 'Bulk Delivery',
        currentState: [
            'Bulk tanker delivery to farm silos',
            'Central weighbridge only – no farm measurement',
            'Tanker capacity 32.5 tons, minimum 24-28 tons',
            'Cannot deliver precise quantities needed',
            'No silo-level measurement'
        ],
        bestPractice: [
            'Bag-based delivery for control',
            'Weighbridge integration at both ends',
            'Delivery verification at farm',
            'Silo sensors for inventory',
            'Variance tracking'
        ],
        controls: [
            'Weighbridge integration',
            'Delivery verification',
            'Silo level sensors',
            'Quantity reconciliation',
            'Variance investigation'
        ]
    },
    'GF-PP-05': {
        title: 'Consumption Tracking',
        currentState: [
            'No measurement of actual consumption per house',
            'Consumption estimated, not measured',
            'Manual estimation using stick and thread',
            'Cannot correlate FCR to feed source',
            'Feed quality impact unmeasurable'
        ],
        bestPractice: [
            'House-level consumption tracking',
            'Daily feed recording',
            'Automatic consumption capture',
            'FCR by feed source tracking',
            'Vendor performance correlation'
        ],
        controls: [
            'Consumption by house',
            'Daily feed tracking',
            'FCR calculation',
            'Vendor performance',
            'Quality correlation'
        ]
    },
    'GF-PP-06': {
        title: 'Excess Feed Handling',
        currentState: [
            'Cannot transfer excess feed between farms',
            'Excess feed becomes waste/manure',
            'No returnable feed policy',
            'No mechanism for overdelivery credit',
            'All risk on receiving farm'
        ],
        bestPractice: [
            'Returnable feed policy',
            'Inter-farm transfer capability',
            'Waste minimization program',
            'Overdelivery credit mechanism',
            'Feed recovery process'
        ],
        controls: [
            'Feed transfer process',
            'Waste tracking',
            'Return policy',
            'Credit mechanism',
            'Waste minimization KPIs'
        ]
    },
    // Greenfields Quality Management
    'GF-QM-01': {
        title: 'Feed Quality Control',
        currentState: [
            'Quality issues caused supply stoppage to ENF',
            'Now implementing new recipes with quality focus',
            'Testing regimen being established',
            'Quality testing not integrated with SAP QM',
            'Lab team manages testing'
        ],
        bestPractice: [
            'Raw material testing in SAP QM',
            'In-process inspection',
            'Finished goods analysis',
            'Batch testing and release',
            'Quality integration'
        ],
        controls: [
            'QM incoming inspection',
            'In-process checks',
            'Finished goods testing',
            'Batch release workflow',
            'Quality documentation'
        ]
    },
    'GF-QM-02': {
        title: 'FCR Performance',
        currentState: [
            'Current FCR 1.7-1.8 vs benchmark 1.4',
            'Gap of 0.3-0.4 represents significant cost',
            'Planning to trial on 2-3 farms',
            'Cannot validate improvement due to control gaps',
            'Performance-based qualification not yet done'
        ],
        bestPractice: [
            'Controlled FCR trials',
            'Statistical analysis of performance',
            'Performance benchmarking',
            'Continuous improvement tracking',
            'Vendor qualification by FCR'
        ],
        controls: [
            'FCR monitoring',
            'Trial protocols',
            'Statistical analysis',
            'Benchmark comparison',
            'Improvement tracking'
        ]
    },
    'GF-QM-03': {
        title: 'Vendor Quality',
        currentState: [
            'Attempting to track FCR by feed source',
            'Cannot validate due to control gaps',
            'No formal supplier scorecards',
            'No quality agreements with vendors',
            'Cannot correlate quality with cost'
        ],
        bestPractice: [
            'Supplier scorecards',
            'Quality agreements',
            'Performance-based penalties',
            'Total cost of ownership analysis',
            'Value-based sourcing'
        ],
        controls: [
            'Vendor scorecards',
            'Quality agreements',
            'Performance tracking',
            'Cost correlation',
            'Supplier qualification'
        ]
    },
    'GF-QM-04': {
        title: 'Nutritional Specifications',
        currentState: [
            'New specifications developed for ENF requirements',
            'Testing regimen being established',
            'Lab team manages vaccines and quality testing',
            'Certificate of analysis not tracked in SAP',
            'Compliance documentation gaps'
        ],
        bestPractice: [
            'Specification management in SAP',
            'Certificate of analysis tracking',
            'Compliance documentation',
            'Nutritional analysis automation',
            'Specification version control'
        ],
        controls: [
            'Specification management',
            'CoA tracking',
            'Compliance reporting',
            'Lab integration',
            'Documentation control'
        ]
    },
    // Greenfields Finance & Controlling
    'GF-FI-01': {
        title: 'Intercompany Pricing',
        currentState: [
            'Fixed transfer prices to ENF with margin',
            'Separate budgets for each entity',
            'Manual price maintenance',
            'No automatic cost-plus calculation',
            'No arm\'s length documentation'
        ],
        bestPractice: [
            'Transfer pricing policy',
            'Arm\'s length documentation',
            'Regular price reviews',
            'Automatic cost-plus calculation',
            'Compliance documentation'
        ],
        controls: [
            'Transfer pricing policy',
            'Documentation requirements',
            'Price review schedule',
            'Cost-plus automation',
            'Audit trail'
        ]
    },
    'GF-FI-02': {
        title: 'Division Consolidation',
        currentState: [
            'Elimination at poultry division level',
            'Single finance team manages ENF, GF, Liwa/Salwa',
            'Manual intercompany reconciliation',
            'No automatic matching in SAP',
            'Consolidation complexity'
        ],
        bestPractice: [
            'Intercompany elimination automation',
            'Division P&L reporting',
            'Segment reporting',
            'Automatic matching',
            'Real-time consolidation'
        ],
        controls: [
            'IC elimination rules',
            'Automatic matching',
            'Division reporting',
            'Reconciliation automation',
            'Segment compliance'
        ]
    },
    'GF-FI-03': {
        title: 'Production Costing',
        currentState: [
            'Standard costing methodology',
            'Feed cost represents 95-98% of chicken cost',
            'Variance analysis limited',
            'Cannot analyze variance by feed source',
            'Cost accuracy depends on standards'
        ],
        bestPractice: [
            'Actual costing capability',
            'Variance analysis by source',
            'Cost optimization analytics',
            'Feed source cost tracking',
            'Production efficiency costing'
        ],
        controls: [
            'Standard cost maintenance',
            'Variance analysis',
            'Cost by source',
            'Efficiency tracking',
            'Cost optimization'
        ]
    },
    'GF-FI-04': {
        title: 'Profitability Analysis',
        currentState: [
            'Limited visibility into true profitability',
            'Commodity business with thin margins (±5%)',
            'Budget vs actual disconnect',
            'No protection against cost increases',
            'Product and customer profitability unknown'
        ],
        bestPractice: [
            'Product profitability analysis',
            'Customer profitability tracking',
            'Contribution margin reporting',
            'Integrated budgeting',
            'Rolling forecasts'
        ],
        controls: [
            'Product profitability',
            'Customer analysis',
            'Margin monitoring',
            'Budget integration',
            'Variance reporting'
        ]
    },
    'GF-FI-05': {
        title: 'FCR Financial Impact',
        currentState: [
            '0.1 FCR improvement = ~0.5M AED savings',
            'Current gap 0.3-0.4 vs benchmark = 1.5-2.0M opportunity',
            'No FCR-linked costing',
            'Cannot measure true cost by flock',
            'No performance incentives for FCR improvement'
        ],
        bestPractice: [
            'FCR-linked costing',
            'Performance incentives',
            'Continuous improvement tracking',
            'Cost by flock analysis',
            'Savings quantification'
        ],
        controls: [
            'FCR cost linkage',
            'Performance KPIs',
            'Incentive programs',
            'Flock-level costing',
            'Savings tracking'
        ]
    },

    // =========================================
    // ENF - Hatchery Operations
    // =========================================
    'ENF-H-01': {
        title: 'Egg Procurement',
        currentState: [
            'Primary source: Al Salwa (Liwa) - intercompany',
            'Secondary: Open market imports from Oman (15-16%)',
            'No supplier diversification strategy',
            'Limited quality-based sourcing protocols',
            'Biosecurity protocols not integrated with SAP'
        ],
        bestPractice: [
            'Multiple supplier qualification',
            'Quality-based sourcing with scorecards',
            'Biosecurity protocol enforcement',
            'Incoming inspection automation',
            'SAP-integrated supplier management'
        ],
        controls: [
            'Supplier qualification process',
            'Quality inspection at receipt',
            'Biosecurity compliance checks',
            'Supplier performance tracking',
            'Intercompany coordination'
        ]
    },
    'ENF-H-02': {
        title: 'Egg Receipt & Grading',
        currentState: [
            'Eggs received from Salwa, graded at ENF',
            'Grade A (hatchable) vs Grade B (reject) classification',
            'B-grade returned to Salwa for sale as table eggs',
            'Physical inspection process, manual recording',
            'Recently implementing formal specifications'
        ],
        bestPractice: [
            'Automated grading equipment',
            'SAP incoming inspection lots',
            'Batch classification in system',
            'Quality recording with root cause',
            'Supplier scorecards integration'
        ],
        controls: [
            'Incoming inspection lots',
            'Batch quality classification',
            'Rejection tracking and reporting',
            'Supplier quality feedback',
            'Grade-based routing'
        ]
    },
    'ENF-H-03': {
        title: 'Egg Storage',
        currentState: [
            'Storage at ENF before setting in incubators',
            'Extended storage (20+ days) reduces hatchability',
            'Optimal storage is 7-8 days',
            'No system-enforced FIFO by receipt date',
            'Temperature monitoring not integrated'
        ],
        bestPractice: [
            'FIFO enforcement by receipt date',
            'Maximum storage age rules (8 days)',
            'Temperature and humidity monitoring',
            'Quality degradation tracking',
            'System alerts for aging inventory'
        ],
        controls: [
            'FIFO by receipt date',
            'Maximum age enforcement',
            'Temperature monitoring',
            'Quality degradation alerts',
            'Storage condition compliance'
        ]
    },
    'ENF-H-04': {
        title: 'Hatchery Cycle',
        currentState: [
            '21-day incubation cycle',
            'Setting every 4 days aligned with Salwa collection',
            '~200,000 eggs per 4-day setting',
            'No SAP MSG incubation management',
            'Manual setting schedule, no optimization'
        ],
        bestPractice: [
            'SAP MSG incubation management',
            'Setting schedule optimization',
            'Hatch yield tracking by batch',
            'Environmental parameter monitoring',
            'Capacity utilization optimization'
        ],
        controls: [
            'Incubation schedule tracking',
            'Batch-level hatch yield',
            'Environmental monitoring',
            'Capacity utilization KPIs',
            'Quality parameter tracking'
        ]
    },
    'ENF-H-05': {
        title: 'Hatchability Performance',
        currentState: [
            'Historical estimation issues: 85-86% estimate vs 90-92% actual',
            'Recently corrected after discovery',
            'Estimation errors caused DOC oversupply',
            'No statistical hatchability models',
            'No breed-specific performance tracking'
        ],
        bestPractice: [
            'Statistical hatchability models',
            'Breed-specific expectations',
            'Continuous calibration of estimates',
            'Variance analysis by batch',
            'Root cause analysis for under-performance'
        ],
        controls: [
            'Hatchability forecasting accuracy',
            'Breed-specific benchmarks',
            'Variance tracking and analysis',
            'Continuous model calibration',
            'Performance KPI reporting'
        ]
    },
    'ENF-H-06': {
        title: 'DOC Output',
        currentState: [
            'Hatchery produces DOCs for own farms only',
            '150,000 DOC capacity per cycle',
            'Production order for egg-to-DOC conversion',
            'No hatch yield variance analysis',
            'Quality grading not formalized'
        ],
        bestPractice: [
            'Production order costing with variance',
            'Hatch yield variance analysis',
            'DOC quality grading and tracking',
            'Cost allocation by batch',
            'Performance benchmarking'
        ],
        controls: [
            'Production order costing',
            'Yield variance analysis',
            'Quality grading',
            'Batch cost tracking',
            'Performance KPIs'
        ]
    },

    // =========================================
    // ENF - Farm Operations
    // =========================================
    'ENF-F-01': {
        title: 'Farm Capacity',
        currentState: [
            '13 farms with 6 houses each',
            '25,000 birds per house = 150,000 total capacity',
            'No SAP Livestock Management',
            'House-level tracking manual only',
            'Capacity optimization not system-driven'
        ],
        bestPractice: [
            'SAP Livestock Management deployment',
            'House-level tracking in system',
            'Capacity optimization analytics',
            'Climate control integration',
            'Biosecurity zone management'
        ],
        controls: [
            'House-level capacity tracking',
            'Flock master data',
            'Climate monitoring integration',
            'Biosecurity compliance',
            'Capacity utilization KPIs'
        ]
    },
    'ENF-F-02': {
        title: 'DOC Placement',
        currentState: [
            'DOCs from hatchery placed in farm houses',
            'One production order per house',
            'PO stays open during 35-42 day growing cycle',
            'No flock master data in SAP',
            'Placement scheduling manual'
        ],
        bestPractice: [
            'Flock master data with attributes',
            'Automated placement scheduling',
            'Biosecurity protocol enforcement',
            'House preparation tracking',
            'Source traceability from hatchery'
        ],
        controls: [
            'Placement scheduling',
            'House preparation verification',
            'Source batch traceability',
            'Biosecurity compliance',
            'Flock registration'
        ]
    },
    'ENF-F-03': {
        title: 'Growing Cycle',
        currentState: [
            '35-42 days to slaughter weight',
            'Three feed stages: Pre-starter (1-10), Grower (11-23), Finisher',
            'No growth curve monitoring in SAP',
            'Stage-based management manual only',
            'Performance KPIs tracked externally'
        ],
        bestPractice: [
            'Growth curve monitoring with alerts',
            'Stage-based feed management',
            'Daily weight sampling integration',
            'Performance KPIs in real-time',
            'Veterinary alert automation'
        ],
        controls: [
            'Growth curve tracking',
            'Feed stage management',
            'Weight sampling records',
            'Performance dashboards',
            'Health monitoring alerts'
        ]
    },
    'ENF-F-04': {
        title: 'Feed Consumption Control',
        currentState: [
            'CRITICAL GAP: Bulk feed to silos without measurement',
            'No measuring at truck nor in silos',
            'Feed consumption estimated, not tracked',
            'Cannot verify delivered vs consumed',
            'FCR calculation unreliable'
        ],
        bestPractice: [
            'Silo-level sensors for measurement',
            'House consumption tracking',
            'Feed delivered vs consumed reconciliation',
            'Weighbridge verification both ends',
            'Bag-based delivery for control'
        ],
        controls: [
            'Delivery measurement verification',
            'Silo sensor monitoring',
            'House-level consumption',
            'Delivery reconciliation',
            'Feed usage variance'
        ]
    },
    'ENF-F-05': {
        title: 'FCR Performance',
        currentState: [
            'FCR 1.7-1.8 actual vs 1.4 industry benchmark',
            '0.3-0.4 gap represents millions in potential losses',
            'No real-time FCR by house',
            'Cannot trace to feed vendor performance',
            'Continuous improvement limited'
        ],
        bestPractice: [
            'Real-time FCR by house',
            'Feed vendor performance tracking',
            'Breed-specific FCR benchmarks',
            'Continuous improvement programs',
            'FCR-linked incentives'
        ],
        controls: [
            'House-level FCR tracking',
            'Vendor performance correlation',
            'Benchmark comparison',
            'Improvement tracking',
            'Cost impact analysis'
        ]
    },
    'ENF-F-06': {
        title: 'Mortality Tracking',
        currentState: [
            'Mortality recorded as scrap at cycle end only',
            'Root cause analysis limited',
            'Cannot trace to feed source when mixed',
            'Daily mortality not tracked in SAP',
            'Disease outbreak correlation difficult'
        ],
        bestPractice: [
            'Daily mortality recording with reason codes',
            'Disease tracking and veterinary alerts',
            'Feed source correlation analysis',
            'Root cause investigation workflow',
            'Flock health dashboards'
        ],
        controls: [
            'Daily mortality recording',
            'Reason code classification',
            'Disease tracking alerts',
            'Root cause workflows',
            'Health trend analysis'
        ]
    },

    // =========================================
    // ENF - Processing Plant
    // =========================================
    'ENF-P-01': {
        title: 'Processing Facilities',
        currentState: [
            'Two plants: PPE (fresh) and FPPE (frozen/further processing)',
            'PPE handles fresh chicken for Al Rawdah brand',
            'FPPE handles frozen and further processed products',
            'No integrated plant planning',
            'Line capacity optimization manual'
        ],
        bestPractice: [
            'Integrated plant planning',
            'Line capacity optimization',
            'Yield tracking by line',
            'Maintenance integration',
            'Cross-plant coordination'
        ],
        controls: [
            'Plant capacity planning',
            'Line utilization tracking',
            'Yield monitoring',
            'Maintenance scheduling',
            'Quality checkpoints'
        ]
    },
    'ENF-P-02': {
        title: 'Daily Volume',
        currentState: [
            '50,000-60,000 birds per day slaughtered',
            'Farm-to-plant coordination manual',
            'No slaughter planning optimization',
            'Capacity matching ad-hoc',
            'Volume forecasting basic'
        ],
        bestPractice: [
            'Slaughter planning optimization',
            'Farm-to-plant coordination system',
            'Capacity matching automation',
            'Volume forecasting integration',
            'Real-time throughput tracking'
        ],
        controls: [
            'Slaughter scheduling',
            'Farm coordination',
            'Capacity utilization',
            'Throughput monitoring',
            'Volume variance tracking'
        ]
    },
    'ENF-P-03': {
        title: 'Production Order Chain',
        currentState: [
            'Five production orders in chain',
            'Egg→DOC, DOC→Broiler, Live→Carcass, Carcass→Portions, Portions→Packed FG',
            'No SAP MSG integrated chain',
            'Disassembly BOM not standard',
            'Catch-weight not enabled'
        ],
        bestPractice: [
            'SAP MSG integrated production chain',
            'Disassembly BOM for joint products',
            'Catch-weight throughout chain',
            'Yield tracking at each stage',
            'Cost flow visibility'
        ],
        controls: [
            'Production order chain tracking',
            'Stage yield recording',
            'Catch-weight capture',
            'Cost allocation',
            'Variance analysis'
        ]
    },
    'ENF-P-04': {
        title: 'Carcass Split Ratio',
        currentState: [
            '65-70% whole chicken, 30-35% portions',
            'Portions: breast, thigh, drumstick, wings',
            'No value-based splitting for joint product costing',
            'Breast appears artificially cheap',
            'Wings show accounting losses'
        ],
        bestPractice: [
            'MSG value-based allocation',
            'Market price splitting factors',
            'Portion profitability analysis',
            'Dynamic split factor updates',
            'Yield optimization tracking'
        ],
        controls: [
            'Value-based cost allocation',
            'Split ratio tracking',
            'Portion margin analysis',
            'Yield variance monitoring',
            'Market price integration'
        ]
    },
    'ENF-P-05': {
        title: 'Variable Yield Challenge',
        currentState: [
            'Production order created AFTER output known',
            'Variable SKU sizes from processing',
            'Cannot predict exact portion quantities',
            'Yield varies by bird size and quality',
            'Manual adjustment of outputs'
        ],
        bestPractice: [
            'MSG variable yield handling',
            'Catch-weight management',
            'Production versioning for actuals',
            'Statistical yield prediction',
            'Automatic output recording'
        ],
        controls: [
            'Variable yield tracking',
            'Output vs standard comparison',
            'Catch-weight capture',
            'Yield variance analysis',
            'Statistical process control'
        ]
    },
    'ENF-P-06': {
        title: 'Catch Weight Gap',
        currentState: [
            'No catch-weight management implemented',
            'Products sold by piece but vary in weight',
            'Weight ranges from 9g to 18g per piece',
            'SAP MSG catch-weight not enabled',
            'Inventory accuracy issues'
        ],
        bestPractice: [
            'Catch-weight inventory management',
            'Weight-based invoicing',
            'Tolerance management',
            'Scale integration',
            'Label printing with actual weight'
        ],
        controls: [
            'Catch-weight inventory',
            'Weight capture at receipt',
            'Tolerance verification',
            'Scale calibration',
            'Invoice weight accuracy'
        ]
    },

    // =========================================
    // Salwa @ Liwa - Production Planning (Breeding)
    // =========================================
    'SL-PP-01': {
        title: 'DOC Sourcing',
        currentState: [
            '100% imported from Saudi Arabia',
            'Single source country dependency',
            'Limited supplier options (competitor Ajman will not sell)',
            '3 batches per year, 30,600 DOCs each',
            'No demand-driven planning'
        ],
        bestPractice: [
            'Multiple source countries',
            'Supplier qualification program',
            'Biosecurity protocols',
            'Demand-driven procurement',
            'Risk mitigation through diversification'
        ],
        controls: [
            'Supplier qualification',
            'Biosecurity compliance',
            'Import documentation',
            'Quality inspection at receipt',
            'Source diversification tracking'
        ]
    },
    'SL-PP-02': {
        title: 'Rearing Cycle',
        currentState: [
            '0-24 weeks in rearing houses',
            '4 houses in one rearing farm',
            '10% male birds in flock',
            'No SAP Livestock flock tracking',
            'Growth curve monitoring manual'
        ],
        bestPractice: [
            'SAP Livestock Management',
            'Flock master data with attributes',
            'Growth curve monitoring',
            'Mortality tracking with codes',
            'Performance KPIs by flock'
        ],
        controls: [
            'Flock registration',
            'Growth tracking',
            'Mortality recording',
            'Feed consumption',
            'Health monitoring'
        ]
    },
    'SL-PP-03': {
        title: 'Laying Houses',
        currentState: [
            '2 farms with 4 houses each = 8 laying houses',
            '~26,000 birds per flock in production',
            'No house capacity optimization',
            'Flock density management manual',
            'Climate control not integrated'
        ],
        bestPractice: [
            'House capacity optimization',
            'Flock density management',
            'Climate control integration',
            'Environmental monitoring',
            'Performance tracking by house'
        ],
        controls: [
            'House capacity tracking',
            'Density compliance',
            'Climate monitoring',
            'Environmental alerts',
            'House performance KPIs'
        ]
    },
    'SL-PP-04': {
        title: 'Production Cycle',
        currentState: [
            'Laying from week 25 to week 65 (41 weeks)',
            'Production varies by flock age',
            'No production curve tracking in SAP',
            'Peak production management manual',
            'End-of-lay decisions ad-hoc'
        ],
        bestPractice: [
            'Production curve tracking',
            'Peak production management',
            'End-of-lay decision support',
            'Flock lifecycle optimization',
            'Performance benchmarking'
        ],
        controls: [
            'Production curve monitoring',
            'Peak tracking',
            'Lifecycle management',
            'Performance benchmarks',
            'End-of-lay planning'
        ]
    },
    'SL-PP-05': {
        title: 'Daily Egg Production',
        currentState: [
            '~52,000 eggs per day at peak from 2 flocks',
            'Production varies by flock age',
            'No daily production recording in SAP',
            'Yield analysis manual',
            'Flock performance KPIs external'
        ],
        bestPractice: [
            'Daily production recording',
            'Yield analysis by flock',
            'Flock performance KPIs',
            'Variance tracking',
            'Production optimization'
        ],
        controls: [
            'Daily production entry',
            'Yield tracking',
            'Flock KPIs',
            'Variance analysis',
            'Performance dashboards'
        ]
    },
    'SL-PP-06': {
        title: 'ENF Collection',
        currentState: [
            'Eggs collected by ENF every 4 days',
            'Storage at Salwa between collections',
            'Collection schedule manual coordination',
            'No real-time visibility for ENF',
            'Paper-based delivery notes'
        ],
        bestPractice: [
            'Integrated collection scheduling',
            'Real-time inventory visibility',
            'SAP-based delivery documents',
            'Automatic intercompany posting',
            'Storage optimization'
        ],
        controls: [
            'Collection scheduling',
            'Inventory visibility',
            'Delivery documentation',
            'Intercompany automation',
            'Storage monitoring'
        ]
    },

    // =========================================
    // Salwa @ Liwa - Quality Management
    // =========================================
    'SL-QM-01': {
        title: 'Egg Grading Process',
        currentState: [
            'Physical grading at collection',
            'Grade A (≥50g, hatchable) vs Grade B (undersized, defects)',
            'Only Grade A sent for hatching',
            'Manual grading process',
            'No automated grading equipment'
        ],
        bestPractice: [
            'Automated grading equipment',
            'Weight-based classification',
            'Multi-parameter quality checks',
            'Statistical process control',
            'Specification management'
        ],
        controls: [
            'Grading process compliance',
            'Weight classification accuracy',
            'Quality parameter tracking',
            'Specification adherence',
            'Grade distribution analysis'
        ]
    },
    'SL-QM-02': {
        title: 'B-Grade Reasons',
        currentState: [
            'Undersized eggs (early laying period)',
            'Double yolk, shell defects, floor eggs',
            'Primarily in first 1-2 weeks of laying cycle',
            '3 occurrences per year (new flock starts)',
            'No root cause analysis in system'
        ],
        bestPractice: [
            'Defect categorization with codes',
            'Root cause analysis workflow',
            'Flock health correlation',
            'Production curve analysis',
            'Quality improvement tracking'
        ],
        controls: [
            'Defect code classification',
            'Root cause tracking',
            'Flock correlation',
            'Trend analysis',
            'Improvement actions'
        ]
    },
    'SL-QM-03': {
        title: 'Grading Location',
        currentState: [
            'Grading done at ENF upon receipt, not at Salwa',
            'Salwa ships all eggs without pre-grading',
            'Hatchery decides A vs B classification',
            'Quality determination at destination',
            'Transport of B-grade eggs inefficient'
        ],
        bestPractice: [
            'Source grading at Salwa preferred',
            'Quality determination at origin',
            'Transport optimization',
            'Pre-shipment quality check',
            'Grade-based logistics'
        ],
        controls: [
            'Source grading implementation',
            'Quality at origin',
            'Transport efficiency',
            'Grade-based routing',
            'Quality handover'
        ]
    },
    'SL-QM-04': {
        title: 'B-Grade Sales',
        currentState: [
            'B-grade eggs returned to Salwa books',
            'Sold externally as table eggs',
            'Separate sales process from intercompany',
            'Small volume, manual management',
            'No integrated by-product tracking'
        ],
        bestPractice: [
            'By-product revenue optimization',
            'Market channel management',
            'Pricing optimization',
            'Quality-based pricing tiers',
            'Integrated by-product tracking'
        ],
        controls: [
            'By-product tracking',
            'Market pricing',
            'Channel management',
            'Revenue tracking',
            'Quality documentation'
        ]
    },

    // =========================================
    // Salwa @ Liwa - Materials Management
    // =========================================
    'SL-MM-01': {
        title: 'DOC Import',
        currentState: [
            'Import from Saudi Arabia',
            'Delivered to Liwa location',
            'No inbound logistics management',
            'Delivered to door, no SAP tracking',
            'Import documentation manual'
        ],
        bestPractice: [
            'Import documentation automation',
            'Customs clearance integration',
            'Quarantine protocol tracking',
            'Delivery confirmation in SAP',
            'Supplier coordination system'
        ],
        controls: [
            'Import documentation',
            'Customs compliance',
            'Quarantine verification',
            'Delivery confirmation',
            'Supplier coordination'
        ]
    },
    'SL-MM-02': {
        title: 'Feed Supply',
        currentState: [
            'Feed supplied by GF (Greenfields) via ENF',
            'Subsidized feed from government quota via ADS',
            '90% should be subsidized',
            'Manual quota tracking in government portal',
            'No SAP integration for subsidies'
        ],
        bestPractice: [
            'Feed scheduling automation',
            'Quota management integration',
            'Subsidy tracking in SAP',
            'Compliance documentation',
            'Supplier coordination system'
        ],
        controls: [
            'Quota compliance',
            'Subsidy tracking',
            'Feed scheduling',
            'Documentation compliance',
            'Supplier coordination'
        ]
    },
    'SL-MM-03': {
        title: 'Feed Delivery',
        currentState: [
            'Bulk tanker delivery to silos',
            'Same control issues as ENF farms',
            'No measurement at silo level',
            'Consumption estimated, not measured',
            'Cannot verify delivered vs consumed'
        ],
        bestPractice: [
            'Bag-based delivery for control',
            'Silo sensors for measurement',
            'Consumption tracking by house',
            'Delivery reconciliation',
            'Feed usage variance analysis'
        ],
        controls: [
            'Delivery verification',
            'Silo measurement',
            'Consumption tracking',
            'Delivery reconciliation',
            'Usage variance'
        ]
    },
    'SL-MM-04': {
        title: 'Vaccine/Medication',
        currentState: [
            'Managed by farm manager and veterinarian',
            'Vaccination schedule based on bird age',
            'Cold chain requirements manual',
            'Withdrawal period tracking manual',
            'Batch traceability limited'
        ],
        bestPractice: [
            'Cold chain management system',
            'Withdrawal period automation',
            'Batch traceability',
            'Vaccination scheduling',
            'Veterinary alert integration'
        ],
        controls: [
            'Cold chain compliance',
            'Withdrawal enforcement',
            'Batch traceability',
            'Schedule compliance',
            'Health monitoring'
        ]
    },
    'SL-MM-05': {
        title: 'Bird Valuation',
        currentState: [
            'Birds valued through capitalization model',
            'No daily valuation of growing flock',
            'Static inventory approach',
            'Valuation only at PO completion',
            'No IAS 41 daily fair value'
        ],
        bestPractice: [
            'SAP Livestock valuation',
            'Daily fair value adjustment',
            'IAS 41 compliance',
            'Biological asset tracking',
            'Automated revaluation'
        ],
        controls: [
            'Daily valuation',
            'IAS 41 compliance',
            'Biological asset tracking',
            'Valuation accuracy',
            'Audit trail'
        ]
    },

    // =========================================
    // Salwa @ Liwa - Finance & Controlling
    // =========================================
    'SL-FI-01': {
        title: 'Biological Asset Capitalization',
        currentState: [
            'Capitalization for 24 weeks during rearing',
            'DOC cost + feed + vaccination + overhead accumulated',
            'Creates asset value at week 24',
            'Manual calculation and posting',
            'IAS 41 approach attempted'
        ],
        bestPractice: [
            'SAP biological asset module',
            'Automated cost accumulation',
            'Overhead allocation automation',
            'Activity-based costing',
            'IAS 41 compliant processing'
        ],
        controls: [
            'Cost accumulation accuracy',
            'Overhead allocation',
            'IAS 41 compliance',
            'Audit trail',
            'Period-end verification'
        ]
    },
    'SL-FI-02': {
        title: 'Amortization',
        currentState: [
            'Amortization from week 25 to 65 (41 weeks laying)',
            'Excel-based calculation',
            'Posted via journal vouchers',
            'Manual depreciation spread',
            'Not automated in SAP'
        ],
        bestPractice: [
            'Automated amortization in SAP',
            'System-calculated depreciation',
            'Biological asset module',
            'Audit trail automation',
            'Period-end automation'
        ],
        controls: [
            'Amortization accuracy',
            'Calculation verification',
            'Posting compliance',
            'Audit trail',
            'Period-end review'
        ]
    },
    'SL-FI-03': {
        title: 'Production Orders',
        currentState: [
            'Two production orders structure',
            'Rearing PO: DOC to laying-ready bird',
            'Laying PO: For cost capture during production',
            'Costs accumulated on orders',
            'No variance analysis vs standard'
        ],
        bestPractice: [
            'Integrated production costing',
            'Variance analysis vs standard',
            'Standard cost comparison',
            'Activity-based allocation',
            'Period-end settlement'
        ],
        controls: [
            'Production order costing',
            'Variance tracking',
            'Standard comparison',
            'Settlement process',
            'Cost accuracy'
        ]
    },
    'SL-FI-04': {
        title: 'Egg Costing',
        currentState: [
            'Period costing approach',
            'Whatever produced is considered sold',
            'Feed and vaccination costs allocated to eggs',
            'No cost per egg visibility',
            'True production cost not calculated'
        ],
        bestPractice: [
            'Actual production costing',
            'Cost per egg tracking',
            'Yield-based allocation',
            'Flock-level costing',
            'Profitability by batch'
        ],
        controls: [
            'Cost per egg calculation',
            'Yield allocation',
            'Flock-level tracking',
            'Profitability analysis',
            'Cost variance'
        ]
    },
    'SL-FI-05': {
        title: 'Transfer Pricing',
        currentState: [
            'Fixed transfer price for eggs to ENF',
            'ENF truck collects - no transport cost to Salwa',
            'No regular price reviews',
            'Arm\'s length documentation limited',
            'Manual intercompany reconciliation'
        ],
        bestPractice: [
            'Market-based transfer pricing',
            'Regular price reviews',
            'Arm\'s length documentation',
            'Automatic intercompany invoicing',
            'Reconciliation automation'
        ],
        controls: [
            'Transfer price compliance',
            'Price review schedule',
            'Documentation completeness',
            'Intercompany matching',
            'Reconciliation accuracy'
        ]
    },

    // =========================================
    // Salwa @ Liwa - Sales & Distribution
    // =========================================
    'SL-SD-01': {
        title: 'Customer Base',
        currentState: [
            'Single customer - ENF (100% intercompany)',
            '100% of Grade A eggs to ENF',
            'B-grade sold externally',
            'No external hatching egg sales',
            'Complete dependency on ENF'
        ],
        bestPractice: [
            'Scheduling agreements with ENF',
            'Intercompany automation',
            'EDI integration',
            'Demand-driven production',
            'Performance-linked pricing'
        ],
        controls: [
            'Intercompany compliance',
            'Scheduling agreement adherence',
            'Demand fulfillment',
            'Quality compliance',
            'Price agreement'
        ]
    },
    'SL-SD-02': {
        title: 'Order Process',
        currentState: [
            'No formal sales orders in SAP',
            'Production-driven supply model',
            'ENF collects every 4 days based on production',
            'Manual delivery notes only',
            'No order management in system'
        ],
        bestPractice: [
            'Automatic order generation',
            'Delivery scheduling system',
            'POD capture integration',
            'Intercompany STO process',
            'Real-time order visibility'
        ],
        controls: [
            'Order documentation',
            'Delivery scheduling',
            'Quantity verification',
            'Timing compliance',
            'System tracking'
        ]
    },
    'SL-SD-03': {
        title: 'Delivery Process',
        currentState: [
            'ENF truck collects eggs from Salwa',
            'Transport cost borne by ENF',
            'No Incoterms documentation',
            'Quality handover not formalized',
            'Delivery confirmation manual'
        ],
        bestPractice: [
            'Incoterms documentation',
            'Delivery confirmation system',
            'Quality at handover verification',
            'Transport tracking',
            'POD automation'
        ],
        controls: [
            'Incoterms compliance',
            'Delivery confirmation',
            'Quality verification',
            'Transport tracking',
            'POD capture'
        ]
    },
    'SL-SD-04': {
        title: 'Documentation Gap',
        currentState: [
            'Delivery notes are manual/paper-based',
            'Not from SAP system',
            'No system traceability for egg transfers',
            'Audit trail gaps',
            'Reconciliation manual'
        ],
        bestPractice: [
            'SAP delivery documents',
            'Batch traceability',
            'Audit compliance automation',
            'Electronic document management',
            'Real-time posting'
        ],
        controls: [
            'SAP document generation',
            'Batch traceability',
            'Audit trail completeness',
            'Document retention',
            'Reconciliation automation'
        ]
    },
    'SL-SD-05': {
        title: 'Invoice Process',
        currentState: [
            'Invoice created after grading at ENF',
            'Only Grade A invoiced to ENF',
            'B-grade returned to Salwa books',
            'Manual invoicing process',
            'Intercompany matching manual'
        ],
        bestPractice: [
            'Automatic invoicing based on graded quantities',
            'Intercompany matching automation',
            'Real-time reconciliation',
            'Grade-based pricing',
            'EDI invoice exchange'
        ],
        controls: [
            'Invoice accuracy',
            'Intercompany matching',
            'Grade-based billing',
            'Reconciliation',
            'Audit compliance'
        ]
    },
    'SL-SD-06': {
        title: 'B-Grade External Sales',
        currentState: [
            'Sold as table eggs in external market',
            'Separate sales process from intercompany',
            'Small volume, managed from Salwa books',
            'No integrated by-product tracking',
            'Pricing and customer management basic'
        ],
        bestPractice: [
            'By-product sales channel management',
            'Integrated pricing management',
            'Customer master data',
            'Revenue tracking by channel',
            'Credit management'
        ],
        controls: [
            'By-product tracking',
            'Customer management',
            'Pricing compliance',
            'Revenue recognition',
            'Credit control'
        ]
    }
};

// Get display name for entity
function getEntityName(entityId) {
    const names = {
        'ardc': 'AL RAWABI',
        'enf': 'ENF',
        'greenfields': 'GREENFIELDS',
        'alrawdah': 'SALWA @ LIWA'
    };
    return names[entityId] || entityId.toUpperCase();
}

// Generate default metadata for steps without specific data
function getStepMetadata(stepId, stepName) {
    if (STEP_METADATA[stepId]) {
        return STEP_METADATA[stepId];
    }
    // Generate default metadata
    return {
        title: stepName,
        bestPractice: `Industry best practice for ${stepName.toLowerCase()} requires integrated systems with real-time data capture, automated controls, and full traceability. Manual processes should be minimized with system-enforced validations and approvals.`,
        controls: [
            'Standard operating procedures followed',
            'Documentation requirements met',
            'Authorization controls applied',
            'Quality checks performed',
            'Audit trail maintained'
        ]
    };
}

function selectEntityFlowStep(entityId, stepId, stepName) {
    // Handle deepdive as a special case - use deepdive tab but track original entity
    const tabId = entityId === 'deepdive' ? 'deepdive' : entityId;

    // Clear previous selection in this entity
    document.querySelectorAll(`#tab-${tabId} .process-node`).forEach(node => {
        node.classList.remove('selected');
    });

    // Select new node
    const node = document.querySelector(`#tab-${tabId} [data-step="${stepId}"]`);
    if (node) {
        node.classList.add('selected');
    }

    // If same step clicked, do nothing
    if (currentEntity === entityId && currentEntityStep === stepId) {
        return;
    }

    const panel = document.getElementById(`${entityId}-flowPanel`);
    const content = document.getElementById(`${entityId}-panelContent`);
    const overlay = document.getElementById('panelOverlay');

    // If panel is already open, slide down then slide up with new content
    if (panel && panel.classList.contains('open')) {
        // Slide panel down first
        panel.classList.remove('open');

        setTimeout(() => {
            // Update content while panel is closed
            currentEntity = entityId;
            currentEntityStep = stepId;
            renderPanelContent(entityId, stepId, stepName, node, content);

            // Slide panel back up with new content
            panel.classList.add('open');
        }, 350);

        return;
    }

    // First time opening panel
    currentEntity = entityId;
    currentEntityStep = stepId;

    // Open panel
    if (panel) panel.classList.add('open');
    if (overlay) overlay.classList.add('active');

    // Hide the hint when panel opens
    const hint = document.getElementById(`${entityId}-hint`);
    if (hint) hint.classList.add('hidden');

    // Render content
    renderPanelContent(entityId, stepId, stepName, node, content);
}

/**
 * Render panel content for a process step
 */
function renderPanelContent(entityId, stepId, stepName, node, content) {
    if (!content) {
        content = document.getElementById(`${entityId}-panelContent`);
    }
    if (!content) return;

    // Get step number and color from the node - scope to current flowchart only
    const parentFlowchart = node ? node.closest('.visual-flowchart') : null;
    const allNodes = parentFlowchart
        ? parentFlowchart.querySelectorAll('.process-node[data-step]')
        : document.querySelectorAll(`#tab-${entityId} .process-node[data-step]`);
    let stepNumber = 1;
    allNodes.forEach((n, i) => {
        if (n.dataset.step === stepId) stepNumber = i + 1;
    });

    // Color pattern matching the flowchart icons (based on position in flow-row)
    const colorPattern = ['#14b8a6', '#f59e0b', '#22c55e', '#ef4444'];
    const stepColor = colorPattern[(stepNumber - 1) % 4];

    // Get findings for this step
    const findings = REPORT_DATA.findingsByStep[stepId] || [];

    // Calculate stats
    const high = findings.filter(f => f.risk === 'high').length;
    const medium = findings.filter(f => f.risk === 'medium').length;
    const low = findings.filter(f => f.risk === 'low').length;
    const total = findings.length;

    // Build findings summary for header
    let findingsSummary = '';
    if (total === 0) {
        findingsSummary = '<span class="findings-badge success">No Findings</span>';
    } else {
        const parts = [];
        if (high > 0) parts.push(`<span class="findings-badge-count high">${high} High</span>`);
        if (medium > 0) parts.push(`<span class="findings-badge-count medium">${medium} Medium</span>`);
        if (low > 0) parts.push(`<span class="findings-badge-count low">${low} Low</span>`);
        findingsSummary = parts.join('');
    }

    // Get metadata for this step
    const metadata = getStepMetadata(stepId, stepName);

    // Build panel HTML
    let html = `
        <div class="panel-card">
            <div class="panel-card-header" style="background: ${stepColor}">
                <div class="panel-step-number" style="color: ${stepColor}; border-color: ${stepColor}">${String(stepNumber).padStart(2, '0')}</div>
                <h3 class="panel-step-title">${escapeHtml(metadata.title)}</h3>
                <div class="panel-findings-badges">${findingsSummary}</div>
                <span class="panel-nav-hint">Click any process above to view details</span>
            </div>

            <div class="panel-card-body">
                <div class="panel-three-columns">
                    <div class="panel-column panel-column-large">
                        <div class="panel-column-header">
                            <i class="fas fa-building"></i>
                            <span>CURRENT STATE AT ${getEntityName(entityId)}</span>
                        </div>
                        <div class="panel-column-content current-state">
                            ${Array.isArray(metadata.currentState)
                                ? metadata.currentState.map(item => `
                                    <div class="panel-bullet-item current">
                                        <i class="fas fa-exclamation-circle"></i>
                                        <span>${escapeHtml(item)}</span>
                                    </div>
                                `).join('')
                                : `<p>${escapeHtml(metadata.currentState || 'Current state assessment not available.')}</p>`
                            }
                        </div>
                    </div>

                    <div class="panel-column">
                        <div class="panel-column-header">
                            <i class="fas fa-lightbulb"></i>
                            <span>INDUSTRY BEST PRACTICE</span>
                        </div>
                        <div class="panel-column-content best-practice">
                            ${Array.isArray(metadata.bestPractice)
                                ? metadata.bestPractice.map(item => `
                                    <div class="panel-bullet-item best">
                                        <i class="fas fa-check-circle"></i>
                                        <span>${escapeHtml(item)}</span>
                                    </div>
                                `).join('')
                                : `<p>${escapeHtml(metadata.bestPractice)}</p>`
                            }
                        </div>
                    </div>

                    <div class="panel-column">
                        <div class="panel-column-header">
                            <i class="fas fa-shield-alt"></i>
                            <span>KEY CONTROLS EXPECTED</span>
                        </div>
                        <div class="panel-column-content controls">
                            ${metadata.controls.map(ctrl => `
                                <div class="panel-control-item">
                                    <i class="fas fa-check"></i>
                                    <span>${escapeHtml(ctrl)}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>

                <div class="panel-section findings-section">
    `;

    if (findings.length === 0) {
        html += `
                        <div class="panel-success-box">
                            <i class="fas fa-check-circle"></i>
                            <span>No findings identified. Controls operating effectively.</span>
                        </div>
        `;
    } else {
        // Separate high risk findings for executive focus
        const highRisk = findings.filter(f => f.risk === 'high');
        const otherRisk = findings.filter(f => f.risk !== 'high');

        // Critical findings callout
        if (highRisk.length > 0) {
            html += `
                        <div class="exec-critical-section">
                            <div class="exec-critical-header">
                                <span class="critical-icon"><i class="fas fa-exclamation-circle"></i></span>
                                <span class="critical-label">${highRisk.length} Critical Issue${highRisk.length > 1 ? 's' : ''} Requiring Immediate Attention</span>
                            </div>
                            <div class="exec-findings-list" id="${entityId}-findingsList">
                                ${highRisk.map((f, index) => `
                                    <div class="exec-finding-card high" data-finding-index="${index}">
                                        <div class="exec-finding-main">
                                            <div class="exec-finding-ref">${f.id}</div>
                                            <div class="exec-finding-content">
                                                <div class="exec-finding-title">${escapeHtml(f.topic)}</div>
                                                ${f.impact ? `<div class="exec-finding-impact"><i class="fas fa-arrow-right"></i> ${escapeHtml(f.impact)}</div>` : ''}
                                            </div>
                                            <div class="exec-finding-risk">
                                                <span class="risk-badge high">HIGH</span>
                                            </div>
                                        </div>
                                        <div class="exec-finding-details">
                                            <p>${escapeHtml(f.details)}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
            `;
        }

        // Other findings (medium/low) - compact list
        if (otherRisk.length > 0) {
            html += `
                        <div class="exec-other-section">
                            <div class="exec-other-header">Other Observations (${otherRisk.length})</div>
                            <div class="exec-other-list">
                                ${otherRisk.map((f, index) => `
                                    <div class="exec-other-item ${f.risk}" data-finding-index="${highRisk.length + index}">
                                        <span class="other-ref">${f.id}</span>
                                        <span class="other-title">${escapeHtml(f.topic)}</span>
                                        <span class="other-risk ${f.risk}">${f.risk.toUpperCase()}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
            `;
        }
    }

    html += `
                </div>
            </div>
        </div>
    `;

    content.innerHTML = html;

    // Setup accordion behavior for findings - opening one closes others
    setupFindingsAccordion(content);

    // Hide the old header elements since we're putting everything in panel content
    const panelTitle = document.getElementById(`${entityId}-panelTitle`);
    const panelSubtitle = document.getElementById(`${entityId}-panelSubtitle`);
    const panelStats = document.getElementById(`${entityId}-panelStats`);
    if (panelTitle) panelTitle.style.display = 'none';
    if (panelSubtitle) panelSubtitle.style.display = 'none';
    if (panelStats) panelStats.style.display = 'none';
}

function toggleFindings(header) {
    const section = header.closest('.findings-section');
    section.classList.toggle('expanded');
}

/**
 * Setup accordion behavior for executive finding cards
 */
function setupFindingsAccordion(container) {
    // Handle critical finding cards
    const findingCards = container.querySelectorAll('.exec-finding-card');
    findingCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const isOpen = this.classList.contains('expanded');

            // Close all cards first
            findingCards.forEach(c => c.classList.remove('expanded'));

            // Toggle current one
            if (!isOpen) {
                this.classList.add('expanded');
            }
        });
    });

    // Handle other observations items (expand inline or show tooltip)
    const otherItems = container.querySelectorAll('.exec-other-item');
    otherItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Could add expand behavior here if needed
        });
    });
}


function closeEntityPanel(entityId) {
    const panel = document.getElementById(`${entityId}-flowPanel`);
    const overlay = document.getElementById('panelOverlay');
    if (panel) panel.classList.remove('open');
    if (overlay) overlay.classList.remove('active');

    // Show the hint again when panel closes
    const hint = document.getElementById(`${entityId}-hint`);
    if (hint) hint.classList.remove('hidden');

    // Handle tab ID for deepdive
    const tabId = entityId === 'deepdive' ? 'deepdive' : entityId;
    document.querySelectorAll(`#tab-${tabId} .process-node`).forEach(node => {
        node.classList.remove('selected');
    });

    if (currentEntity === entityId) {
        currentEntity = null;
        currentEntityStep = null;
    }
}

function closeAllPanels() {
    ['ardc', 'enf', 'greenfields', 'alrawdah', 'deepdive'].forEach(entityId => {
        closeEntityPanel(entityId);
    });
}

// =====================================================
// DEEP-DIVE TAB FUNCTIONALITY
// =====================================================

// Current deep-dive state
let currentDeepDiveEntity = 'ardc';
let currentDeepDiveFlow = 'ARDC-PP';

/**
 * Toggle entity group expand/collapse in Deep-Dive TOC (accordion behavior)
 */
function toggleEntityGroup(entityId) {
    const allGroups = document.querySelectorAll('.nav-entity-group');
    const targetGroup = document.querySelector(`.nav-entity-group[data-entity="${entityId}"]`);

    if (!targetGroup) return;

    const isCurrentlyCollapsed = targetGroup.classList.contains('collapsed');

    // Collapse all groups first
    allGroups.forEach(group => {
        group.classList.add('collapsed');
    });

    // If the clicked group was collapsed, expand it
    if (isCurrentlyCollapsed) {
        targetGroup.classList.remove('collapsed');
    }
    // If it was already expanded, it stays collapsed (all collapsed now)
}

/**
 * Initialize Deep-Dive navigation handlers
 */
function initDeepDiveNavHandlers() {
    const deepdiveTab = document.getElementById('tab-deepdive');
    if (!deepdiveTab) return;

    // Bind module nav item clicks
    const navItems = deepdiveTab.querySelectorAll('.nav-entity-modules .nav-item[data-flow]');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const flowKey = this.dataset.flow;
            const entityId = this.dataset.entity;
            selectDeepDiveModule(entityId, flowKey, this);
        });
    });

    // Initialize first module
    setTimeout(() => {
        const firstItem = deepdiveTab.querySelector('.nav-entity-modules .nav-item.active');
        if (firstItem) {
            const flowKey = firstItem.dataset.flow;
            const entityId = firstItem.dataset.entity;
            selectDeepDiveModule(entityId, flowKey, firstItem);
        }
    }, 100);
}

/**
 * Select and display a module in Deep-Dive tab
 */
function selectDeepDiveModule(entityId, flowKey, navItem) {
    const deepdiveTab = document.getElementById('tab-deepdive');
    if (!deepdiveTab) return;

    // Update nav item active states
    deepdiveTab.querySelectorAll('.nav-entity-modules .nav-item').forEach(item => {
        item.classList.remove('active');
    });
    if (navItem) navItem.classList.add('active');

    // Store current selection
    currentDeepDiveEntity = entityId;
    currentDeepDiveFlow = flowKey;

    // Update header breadcrumb
    updateDeepDiveHeader(entityId, flowKey);

    // Update progress bar
    updateDeepDiveProgress(navItem);

    // Close any open panel first
    closeEntityPanel('deepdive');

    // Render flowchart
    renderDeepDiveFlowchart(flowKey);

    // Auto-select first process node after a short delay
    setTimeout(() => {
        const firstNode = deepdiveTab.querySelector('.process-node[data-step]');
        if (firstNode) {
            const stepId = firstNode.dataset.step;
            const stepName = firstNode.querySelector('.label-name')?.textContent || stepId;
            selectEntityFlowStep('deepdive', stepId, stepName);
        }
    }, 100);
}

/**
 * Update Deep-Dive progress bar based on current module
 */
function updateDeepDiveProgress(activeNavItem) {
    const progressBar = document.getElementById('deepdiveProgressBar');
    if (!progressBar) return;

    const allModules = document.querySelectorAll('#tab-deepdive .nav-entity-modules .nav-item');
    const totalModules = allModules.length;

    if (totalModules === 0) return;

    let currentIndex = 0;
    allModules.forEach((item, index) => {
        if (item === activeNavItem || item.classList.contains('active')) {
            currentIndex = index;
        }
    });

    const progress = ((currentIndex + 1) / totalModules) * 100;
    progressBar.style.setProperty('--progress', `${progress}%`);
}

/**
 * Update the Deep-Dive header with current selection
 */
function updateDeepDiveHeader(entityId, flowKey) {
    const header = document.getElementById('deepdive-header');
    if (!header) return;

    // Entity names mapping
    const entityNames = {
        'ardc': 'Al Rawabi Dairy',
        'enf': 'Emirates National Foods',
        'greenfields': 'Greenfields for Feeds',
        'alrawdah': 'Salwa @ Liwa'
    };

    // Module names mapping
    const moduleNames = {
        'ARDC-PP': 'Production Planning',
        'ARDC-SD': 'Sales & Distribution',
        'ARDC-MM': 'Materials Management',
        'ARDC-FICO': 'Finance & Controlling',
        'ENF-SD': 'Sales & Distribution',
        'ENF-HATCH': 'Hatchery Operations',
        'ENF-FARM': 'Farm Operations',
        'ENF-PROC': 'Processing Plant',
        'ENF-MM': 'Materials Management',
        'ENF-QM': 'Quality Management',
        'ENF-FICO': 'Finance & Controlling',
        'GF-SD': 'Sales & Distribution',
        'GF-MM': 'Materials Management',
        'GF-PP': 'Production Planning',
        'GF-QM': 'Quality Management',
        'GF-FICO': 'Finance & Controlling',
        'SL-PP': 'Production Planning',
        'SL-QM': 'Quality Management',
        'SL-MM': 'Materials Management',
        'SL-FICO': 'Finance & Controlling',
        'SL-SD': 'Sales & Distribution'
    };

    // Get stats for this flow
    const stats = getFlowStats(flowKey);

    header.innerHTML = `
        <div class="deepdive-breadcrumb">
            <span class="breadcrumb-entity">${entityNames[entityId] || entityId}</span>
            <i class="fas fa-chevron-right"></i>
            <span class="breadcrumb-module">${moduleNames[flowKey] || flowKey}</span>
        </div>
        <div class="deepdive-stats">
            <span class="stat-badge total">${stats.total} Findings</span>
            <span class="stat-badge high">High: ${stats.high}</span>
            <span class="stat-badge medium">Medium: ${stats.medium}</span>
        </div>
    `;
}

/**
 * Get stats for a flow
 */
function getFlowStats(flowKey) {
    // Count findings for all steps in this flow
    let total = 0, high = 0, medium = 0, low = 0;

    // Get the flow definition from VISUAL_FLOWCHARTS
    const flow = VISUAL_FLOWCHARTS[flowKey];
    if (flow && flow.rows) {
        // Iterate through rows and nodes (correct structure)
        flow.rows.forEach(row => {
            row.nodes.forEach(node => {
                const findings = REPORT_DATA.findingsByStep[node.id] || [];
                total += findings.length;
                findings.forEach(f => {
                    if (f.risk === 'high') high++;
                    else if (f.risk === 'medium') medium++;
                    else low++;
                });
            });
        });
    }

    return { total, high, medium, low };
}

/**
 * Render flowchart for Deep-Dive tab
 */
function renderDeepDiveFlowchart(flowKey) {
    const container = document.getElementById('deepdive-flowcharts');
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    // Get the flow definition from VISUAL_FLOWCHARTS
    if (typeof VISUAL_FLOWCHARTS === 'undefined') {
        container.innerHTML = '<p class="no-data">Flowchart data not loaded</p>';
        return;
    }

    const flow = VISUAL_FLOWCHARTS[flowKey];
    if (!flow) {
        container.innerHTML = '<p class="no-data">Flow not found: ' + flowKey + '</p>';
        return;
    }

    // Render using the visual-flowcharts rendering function
    if (typeof renderVisualFlowchart === 'function') {
        const html = renderVisualFlowchart(flowKey, flow, 'deepdive');
        container.innerHTML = html;
    } else {
        // Fallback: simple rendering
        container.innerHTML = `<div class="visual-flowchart" data-flow="${flowKey}">
            <div class="flow-title-bar">
                <h3>${flow.title || flowKey}</h3>
                <p>${flow.subtitle || ''}</p>
            </div>
            <div class="process-flow-visual">
                ${flow.rows ? flow.rows.map(row => `
                    <div class="flow-row">
                        ${row.nodes.map((node, idx) => `
                            <div class="process-node" data-step="${node.id}" data-entity="deepdive"
                                 onclick="selectEntityFlowStep('deepdive', '${node.id}', '${node.name}')">
                                <div class="node-number">${String(idx + 1).padStart(2, '0')}</div>
                                <div class="node-label">
                                    <span class="label-name">${node.name}</span>
                                    <span class="label-desc">${node.desc || ''}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `).join('') : '<p>No process steps defined</p>'}
            </div>
        </div>`;
    }
}

function toggleFindingDetails(element) {
    element.classList.toggle('expanded');
}

function populateCriticalFindings() {
    const container = document.getElementById('criticalFindingsGrid');
    if (!container || !REPORT_DATA.criticalFindings) return;

    container.innerHTML = REPORT_DATA.criticalFindings.slice(0, 4).map(f => `
        <div class="concern-card animate-item" data-delay="200">
            <div class="concern-id">${f.id} | ${f.source}</div>
            <div class="concern-title">${escapeHtml(f.topic)}</div>
            <div class="concern-details">${escapeHtml(f.details.substring(0, 150))}...</div>
        </div>
    `).join('');
}

// Console branding
console.log(`
%c NXSYS %c Emirates Rawabi Group - SAP Audit Report
%c Presentation Engine

%c Navigation:
  Arrow Keys / Space  -  Navigate slides
  F                   -  Toggle fullscreen
  Home / End          -  First / Last slide

%c NXSYS Advisory Services
`,
'background: #1a2744; color: #c9a227; font-size: 18px; font-weight: bold; padding: 8px 16px; border-radius: 4px 0 0 4px;',
'background: #1a1a1a; color: white; font-size: 12px; padding: 8px 16px; border-radius: 0 4px 4px 0;',
'color: #666; font-size: 10px;',
'color: #1a2744; font-size: 10px;',
'color: #888; font-size: 9px; font-style: italic;'
);

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
    const hintArrow = document.getElementById('deepDiveHint');

    if (currentView === 'executive') {
        if (summaryToggle) {
            summaryToggle.classList.remove('right');
            updateToggleLabels(summaryToggle, true);
        }
        if (deepDiveToggle) {
            deepDiveToggle.classList.remove('right');
            updateToggleLabels(deepDiveToggle, true);
        }
        // Show hint arrow in Summary view
        if (hintArrow) {
            hintArrow.classList.remove('hidden');
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
        // Hide hint arrow in Deep-Dive view
        if (hintArrow) {
            hintArrow.classList.add('hidden');
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

    // Initialize hint arrow click handler
    const hintArrow = document.getElementById('deepDiveHint');
    if (hintArrow) {
        hintArrow.addEventListener('click', function() {
            switchTab('deepdive');
        });
    }
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
            'Manual, reactive process driven by daily sales requirements rather than strategic demand planning. Production schedules are determined based on immediate orders rather than forecasted demand patterns.',
            'No statistical forecasting tools or system-generated forecasts utilized in SAP. Demand planning relies entirely on manual judgment and historical intuition without ML-based predictions.',
            'Hybrid Make-to-Stock / Make-to-Order model operates without formal planning parameters. The lack of defined planning strategies leads to inconsistent production decisions and inventory imbalances.',
            'Seasonal demand variations (Ramadan +60%, weekend peaks) and promotional impacts are not automated in the system. Manual adjustments are made reactively, often resulting in stockouts or overproduction.',
            'Sales requirements communicated informally to production via phone calls and emails, bypassing SAP workflow. This creates audit trail gaps and accountability issues for demand changes.'
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
            'Product formulations and recipes managed outside SAP using Excel spreadsheets. This creates version control challenges and disconnects R&D formulation from production execution.',
            'Static, volume-based Bill of Materials structure does not reflect the dynamic nature of dairy manufacturing where component percentages vary based on incoming milk quality.',
            'Raw milk treated as fixed input material rather than a dynamic multi-component ingredient (fat, protein, SNF). This prevents accurate component-level costing and yield calculations.',
            'No real-time visibility into cost impacts when recipes are modified. Recipe changes bypass cost simulation, leading to margin surprises discovered only at month-end.',
            'Cost variances between standard and actual only become visible at month-end close. Production operates without timely feedback on formulation cost performance.'
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
            'MRP functions as an administrative order creation tool rather than a strategic planning engine. System-generated recommendations are routinely bypassed without documented justification.',
            'Planned orders frequently overridden manually by planners based on informal production decisions. Lack of exception management means valid MRP recommendations are lost in manual noise.',
            'Shelf-life constraints not incorporated in planning logic. Fresh dairy (7-day shelf life) and UHT (180-day) products planned with same parameters, creating mismatch between plan and physical product requirements.',
            'Overproduction and spoilage risks exist due to lack of shelf-life aware lot sizing. Without SLED-based planning, production quantities do not align with realistic consumption windows.',
            'Component-level planning for fat, protein, and SNF not enabled in MRP. This prevents optimization of component utilization and creates hidden yield losses across product mix.'
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
            'Labor-intensive manual scheduling process consumes significant management time daily. Scheduling decisions are made outside SAP based on informal capacity assessments.',
            'Senior management spends considerable time organizing daily production runs. This manual coordination creates bottlenecks and prevents strategic focus on improvement initiatives.',
            'Capacity utilization assumed at 70% without real-time OEE data from production equipment. Actual capacity availability unknown, leading to either under-scheduling or overtime requirements.',
            'No integrated visibility into machine availability, maintenance windows, or breakdown status. Schedulers operate with incomplete information about true production capacity.',
            'Maintenance schedules, CIP cycles, and labor shift patterns not integrated in SAP planning. Production plans created without considering these critical constraints cause frequent rescheduling.'
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
            'Weighbridge operates independently without SAP integration. Manual weight entry creates data accuracy risks and delays in goods receipt posting.',
            'Tanker vehicles permitted entry to production area without mandatory PO validation at gate. This bypasses procurement controls and enables unauthorized deliveries.',
            'Raw milk frequently received into silos and consumed in production before formal system documentation is completed. Physical operations run ahead of SAP records.',
            'Quality testing and verification often completed after milk has already been combined with existing silo inventory. Non-conforming milk cannot be segregated once mixed.',
            'Persistent inventory discrepancies between physical silo levels and SAP system records. Reconciliation requires manual adjustments and variance investigations.'
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
            'Incoming milk combined in storage silos before laboratory component analysis is completed. This prevents segregation based on fat, protein, or SNF content.',
            'Laboratory test results take 3-4 hours to complete while milk intake occurs immediately upon arrival. Quality decisions are made retrospectively after milk is already in production stream.',
            'Standardization performed in-line during processing rather than through controlled pre-separation at receipt. This limits flexibility in component allocation across product portfolio.',
            'Batch-level traceability limited due to silo commingling practices. Individual supplier lots cannot be traced through processing to finished products.',
            'No precise mass balance tracking for milk components. Yield losses between reception and finished goods cannot be systematically analyzed or attributed to specific process steps.'
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
            'SAP configured with Discrete Manufacturing (PP) instead of Process Manufacturing (PP-PI). This architecture mismatch means dairy-specific features like batch management, process instructions, and control recipes are not available.',
            'Critical process parameters including pasteurization temperatures, holding times, and CIP validation recorded on paper logs. No automated capture of food safety critical control points.',
            'PLC/SCADA machine sensors and process automation not integrated with SAP. Production operates in isolation from ERP, requiring manual data transcription.',
            'Production tracking based on volume (liters) rather than component mass (kg of fat, protein, SNF). This prevents accurate yield calculations and component-level costing.',
            'Systematic yield variance analysis not possible without component mass balances. Losses between input milk and finished products cannot be quantified or attributed to process inefficiencies.'
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
            'Quality documentation maintained on paper forms and spreadsheets rather than SAP QM module. This creates audit compliance risks and prevents automated quality trending.',
            'Laboratory Information Management System (LIMS) not integrated with SAP. Test results manually transcribed, creating data integrity risks and delays in quality decision-making.',
            'Fresh dairy products with 7-day shelf life dispatched to market before microbiological testing is complete (5-day incubation). Quality release based on risk assessment rather than confirmed results.',
            'Quality release decisions made manually based on risk assessment and historical performance. No system-enforced hold until quality confirmation workflow.',
            'Quality hold and release workflows operate outside SAP. Blocked stock can be released without formal QM usage decision, bypassing quality gates.'
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
            'Traceability fragmented across paper records, spreadsheets, and partial SAP data. End-to-end batch genealogy from supplier to customer not achievable in single system.',
            'Supplier batch numbers frequently incomplete or missing at goods receipt. Vendor lot traceability breaks at the point of SAP entry, compromising upstream trace capability.',
            'Digital chain of custody compromised by gaps between physical operations and system recording. Batch splits, transfers, and transformations not fully documented in SAP.',
            'Mock recall exercises cannot achieve the 4-hour trace requirement expected for food safety compliance. Manual assembly of records from multiple sources extends trace time significantly.',
            'Vendor batch linkage to finished goods incomplete due to silo commingling and batch number gaps. Forward trace from supplier lot to affected customers not reliably achievable.'
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
            'Inventory accuracy compromised by informal reception practices where physical goods movements precede system documentation. Perpetual inventory reliability affected.',
            'Retrospective system recording of goods movements creates timing discrepancies between physical stock and SAP inventory records. Daily reconciliation required to maintain accuracy.',
            'Raw materials and packaging frequently consumed in production before formal goods receipt posting in SAP. Negative inventory situations occur and require correction.',
            'Backflushing of production consumption creates systematic lag between physical usage and system recording. Real-time inventory visibility not achievable with current posting practices.',
            'Cold chain temperature monitoring systems not integrated with SAP batch records. Temperature excursions not automatically linked to affected batches for quality decision-making.'
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
            '95-100% of dairy distribution executed through 300+ dedicated van routes operating daily. This represents the primary revenue channel but operates entirely outside SAP.',
            'External van sales system (Ransale/RISA) manages all route operations including loading, delivery, returns, and settlement. SAP functions only as back-office accounting system.',
            'SAP visibility limited to Distribution Center level aggregates. Route-level inventory, sales, and profitability not visible in SAP, preventing detailed performance analysis.',
            'Individual van routes not configured as storage locations in SAP. In-transit and van inventory not tracked in ERP, creating blind spot for significant working capital.',
            'Mobile handheld devices operate offline throughout the day. Data synchronization occurs only at journey start and end, preventing real-time visibility into field operations.'
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
            'Direct delivery model operates without pre-order capture. Drivers determine customer quantities at point of delivery based on shelf check, preventing demand visibility and production planning.',
            'Customer orders received through informal channels including phone calls, emails, and WhatsApp messages. No centralized order management with audit trail and acknowledgment workflow.',
            'Sales orders recorded in SAP retrospectively after physical delivery is complete. This post-facto documentation prevents ATP checks and creates compliance gaps.',
            'Standard SAP Order → Delivery → Billing document flow completely bypassed. Van sales transactions post directly to billing, missing delivery documentation requirements.',
            'Custom movement types and direct billing workarounds implemented to accommodate van sales model. This deviation from SAP standard creates upgrade and support complications.'
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
            'All pricing maintained in external van sales system rather than SAP condition technique. Price changes require updates in external system, not centralized SAP master data.',
            'SAP pricing procedure functionality replicated in external system. Dual maintenance required for any pricing logic, creating consistency risks and maintenance overhead.',
            'Promotional mechanics including free goods, product bundling, volume discounts, and special offers managed outside SAP. Promotion effectiveness analysis not possible from SAP data.',
            'Final customer prices calculated externally and transmitted to mobile devices. SAP receives only post-calculated values, preventing pricing simulation or margin analysis.',
            'Customer channel differentiation (Retail vs HoReCa vs Wholesale) and associated pricing tiers managed entirely in external system without SAP customer hierarchy integration.'
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
            'Product returns captured in van sales system with reason codes (expired, damaged, customer rejection). However, detailed return data does not flow to SAP for analysis.',
            'Only summarized return quantities and values transmitted to SAP. Individual return transactions with reason codes not available for root cause analysis or customer-level trending.',
            'Quality inspection process for returned goods not integrated with SAP QM. Returned products not systematically evaluated for defect patterns or supplier quality issues.',
            'No systematic capability to analyze return defects by product, customer, route, or time period. Pattern identification for quality improvement relies on manual investigation.',
            'Near-expiry stock management program previously implemented but currently discontinued. Short-dated products returned without structured markdown or alternate channel disposition.'
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
            'Customer credit limits maintained in SAP but actual credit validation performed in external van sales system. SAP credit management not actively controlling sales transactions.',
            'Real-time credit exposure visible only in external back-office application. SAP shows stale credit position based on batch updates rather than current outstanding balances.',
            'Credit position updates flow to SAP via end-of-day batch integration. Throughout the day, SAP credit data does not reflect current sales and collections activity.',
            'Cash collected by drivers reconciled manually against sales and collection targets. Variance investigation and shortage handling requires manual finance team intervention.',
            'Significant finance team resources dedicated to daily sales closure and reconciliation process. Bank deposit matching and driver settlement consumes considerable administrative effort.'
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
            'Product shelf-life and expiry dates maintained in external van sales system only. SAP SLED (Shelf Life Expiration Date) management not actively utilized for fresh products.',
            'FEFO (First Expiry First Out) picking compliance not confirmed as operationally enforced. Warehouse and van loading may not consistently prioritize shortest-dated stock.',
            'Fresh dairy products with 7-day shelf life require strict rotation discipline. Current systems do not enforce FEFO at loading or delivery, risking customer receipt of short-dated product.',
            'Near-expiry management capabilities available in systems but not actively utilized. Products approaching expiry not systematically identified for markdown or alternate disposition.',
            'Customer-specific minimum remaining shelf life requirements not validated at order or delivery. Key accounts may receive products with insufficient shelf life for their operations.'
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
            'Magento Cloud e-commerce platform operates as separate channel disconnected from primary van sales operations. No unified commerce view across channels.',
            'E-commerce orders manually exported and consolidated into van sales system for fulfillment. This manual handoff creates delays and potential order entry errors.',
            'All e-commerce volume treated as single internal customer transaction in external system. Individual consumer orders not visible, preventing customer-level analysis.',
            'Dedicated delivery route assigned for e-commerce order fulfillment. However, this operates within van sales system without direct SAP integration.',
            'E-commerce transactions do not flow directly to SAP. Revenue and fulfillment only visible after consolidation through van sales settlement process.'
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
            'Master data flows one-way from SAP to van sales system via IDOC. Customer, material, and pricing updates pushed to external system but no reverse sync capability.',
            'Transaction integration uses direct database connectivity rather than standard SAP interfaces. This tight coupling creates upgrade risks and makes changes difficult to implement.',
            'All van sales transactions accumulated and posted to SAP in batch after daily close process completes. Real-time visibility into sales activity not available in SAP.',
            'SAP visibility limited to Distribution Center level inventory and transactions. Route-level detail including van stock, sales by stop, and driver performance not in SAP.',
            'In-transit stock between warehouse and customer not tracked in SAP. Goods issued at van loading but delivery confirmation not received, creating inventory blind spot.'
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
            'Revenue generated through multiple channels including B2B van sales (95%+), e-commerce, retail POS outlets, and agricultural/farm sales. Each channel has different margin profiles.',
            'SAP receives only summarized revenue and cost data without channel, route, or customer-level detail. Management reporting requires extraction and manual analysis outside SAP.',
            'Route-level profitability including sales revenue, product costs, delivery costs, and returns not calculable in SAP. Investment decisions for route expansion lack data foundation.',
            'Retail POS transactions post to SAP as consolidated daily entries rather than individual sales. This aggregation creates tax compliance risks and prevents basket analysis.',
            'Channel and customer profitability analysis not achievable from SAP data alone. True cost-to-serve and margin contribution require manual data assembly from multiple systems.'
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
            'Mandatory security checkpoint controls verify crate counts at journey start and end. However, this tracking exists only in external system without SAP integration.',
            'All returnable crate and pallet tracking managed in external back-office system. SAP has no visibility into crate inventory, movements, or customer balances.',
            'Crate shortages and losses reconciled through driver accountability and payroll deductions. No systematic analysis of loss patterns by route, customer, or time period.',
            'Customer equipment including refrigerators, display coolers, and promotional materials minimally tracked. Asset placement and condition not systematically managed.',
            'No crate or returnable packaging management configured in SAP. Deposit and refund accounting handled outside standard SAP returnable packaging functionality.'
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
            'Fleet of refrigerated vehicles maintains cold chain during delivery. However, temperature monitoring data not systematically recorded or linked to batch records for compliance.',
            'End-of-day settlement process requires supervisor approval of driver reconciliation. Manual verification of sales, returns, collections, and crates extends daily close time.',
            'Route optimization software (RoadNet) implementation suspended due to master data management issues. Routes planned manually without systematic optimization.',
            'Operation manages 6,000-7,000 individual customer deliveries daily across 300+ routes. Scale of operation highlights need for systematic management tools.',
            'Cold chain temperature monitoring during transport and delivery not integrated with SAP or batch management. Excursion events not linked to affected product batches.'
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
            'Current SAP landscape includes 7 company codes with expansion to 8 planned for new Kizad facility. Each entity operates with varying degrees of process standardization.',
            'Group organized into two main divisions: Dairy/Juice operations (4 legal entities) and Poultry operations (3 legal entities). Divisional boundaries not fully reflected in SAP organizational structure.',
            'Emirates Al Rawabi functions as holding company with 100% ownership of subsidiaries. However, holding company accounting and management reporting structures require enhancement.',
            'Company code numbering follows inconsistent convention (2xxx, 1000, 7xxx, 5000) creating confusion in reporting and making cross-entity analysis more difficult.',
            'Foreign operations in Oman (OMR currency) and Sudan (USD functional currency) have different accounting requirements and local compliance needs not fully addressed in current SAP configuration.'
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
            'Two separate charts of accounts in use - Greenfields for Feeds operates with different COA than other group entities. This prevents unified financial reporting without manual mapping.',
            'Account numbering conventions vary across entities with no standardized structure. Same economic transactions may post to differently numbered accounts across companies.',
            'Same materials and products may have different G/L account assignments across company codes. This inconsistency complicates inventory valuation analysis and cost comparisons.',
            'Financial reporting follows IFRS standards using legal ledger 0L. However, group reporting requires manual consolidation adjustments due to COA inconsistencies.',
            'Strategic goal exists to consolidate and standardize chart of accounts across group, but current system configuration and historical data create migration complexity.'
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
            'Group consolidation performed using Excel spreadsheets outside SAP. This manual process is labor-intensive, error-prone, and delays month-end reporting.',
            'Trial balances extracted from individual entities and aggregated monthly in Excel. No automated data collection or validation against SAP source records.',
            'Intercompany transaction elimination performed manually requiring significant effort to identify, match, and eliminate IC balances across 7+ entities.',
            'No dedicated consolidation software deployed. SAP Group Reporting or similar tools not implemented, limiting automation and audit trail capabilities.',
            'All consolidated reporting generated in AED. Foreign currency entities require manual translation with exchange rate management outside of automated processes.'
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
            'Intercompany transactions processed as regular buyer-supplier transactions without IC-specific SAP configuration. Trading partner relationships not systematically identified.',
            'IC transaction processing not automated in SAP. Manual coordination required between entities to ensure matching postings and timely reconciliation.',
            'Intercompany invoices generated manually to satisfy UAE VAT compliance requirements. No automated IC billing process creates delays and potential compliance gaps.',
            'No formal documented transfer pricing policy for intercompany transactions. Arm\'s length pricing not systematically validated, creating potential tax authority scrutiny risk.',
            'Intercompany loans exist between group entities with interest charged. However, loan documentation and interest calculations may not meet regulatory requirements for related party transactions.'
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
            'Single cost center hierarchy exists with holding company at top level. However, hierarchy structure does not fully support required management reporting dimensions.',
            'Cost centers configured as company code-specific without cross-entity standardization. Same functional areas have different cost center structures across entities.',
            'Internal cost allocation limited to transfers within cost centers of same entity. Activity-based allocation and assessment cycles not fully utilized for overhead distribution.',
            'Statistical key figures for allocation bases (headcount, square meters, machine hours) not systematically maintained in SAP. Allocation drivers managed manually.',
            'Cross-company cost allocation not currently required but shared service cost distribution would benefit from systematic allocation methodology.'
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
            '35 profit centers configured across the group entities. However, profit center structure may not optimally align with current management reporting requirements.',
            'Profit centers categorized by business segments (Dairy, Juice, Bakery, Trading) but segment definitions may need refinement for IFRS 8 operating segment reporting.',
            'Geographic dimension captured through Distribution Center profit centers (Sharjah, Abu Dhabi, Dubai). Route-level profitability not achievable with current structure.',
            'Profit centers span multiple company codes enabling cross-entity analysis. However, intercompany eliminations at profit center level require manual processing.',
            'User access control partially based on profit center assignments. However, authorization concept may not fully restrict users to their responsible profit centers.'
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
            'Standard costing methodology in use with actual costing run executed monthly. Time lag between standard and actual cost visibility limits timely cost management decisions.',
            'Material ledger active and processing actual costing for inventory valuation. However, actual cost component split analysis may not be fully leveraged for margin visibility.',
            'Five activity types defined (Material, Labor, Depreciation, Maintenance, Utilities) for cost absorption. Activity rates may not reflect current operational realities.',
            'Product costs include both direct costs and overhead allocations. However, overhead absorption methodology may not accurately reflect cost drivers and consumption patterns.',
            'Fixed activity rates applied to production consumption regardless of actual spending. Variance analysis between planned and actual rates not systematically reviewed.'
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
            'CO-PA module live and active using costing-based approach. However, costing-based CO-PA will require migration to account-based approach for S/4HANA upgrade.',
            'Single operating concern assigned to controlling area covering all entities. Configuration supports group-wide profitability analysis but may have characteristic limitations.',
            'CO-PA characteristics include Product type (Fresh/Frozen), business segments, and Distribution Centers. Route-level and customer-level profitability characteristics not fully available.',
            'Actual costing results flow into CO-PA for margin analysis. However, timing of actual cost updates creates lag between sales posting and accurate margin visibility.',
            'Management reporting leverages CO-PA for profitability by segment, product, and region. However, drill-down capabilities and real-time analysis limited by current configuration.'
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
            '16-week rolling forecast process recently implemented but not yet mature. Forecast accuracy metrics not systematically tracked or used for continuous improvement.',
            'IBP used for data gathering with Resa tool processing before manual SAP upload. Multiple system handoffs create data latency and potential transcription errors.',
            'Heavy reliance on Excel spreadsheets for planning calculations outside SAP. Complex formulas maintained by key individuals create knowledge concentration risk.',
            'Forecast data manually uploaded to SAP as Planned Independent Requirements (PIRs). Manual entry process is time-consuming and delays planning cycle completion.',
            'Sales-based planning approach applied to all raw materials without differentiation. No consumption-based or forecast-based planning strategies configured for different material types.'
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
            'MRP concept configured in SAP but not fully operational for automated planning. System runs but output not trusted or used for procurement decisions.',
            'Material requirements calculated manually using Excel spreadsheets rather than SAP MRP output. Planners maintain parallel planning process outside the system.',
            'Only initial data extraction from SAP automated; all subsequent planning calculations performed manually. MRP results not driving procurement requisitions.',
            'Reorder point planning used for some materials but safety stock levels may not be optimally calculated. Min/max parameters set based on historical judgment rather than statistical analysis.',
            'Feed requirements for poultry operations calculated in Excel by farm personnel independently. Farm planning disconnected from central MRP creating coordination gaps.'
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
            'Complex Excel spreadsheet maintained for daily milk balancing with intricate formulas. Spreadsheet complexity creates maintenance burden and single-point-of-failure risk.',
            'Monthly production requirements established but require daily manual adjustments based on actual intake and component variations. Adjustment process is reactive rather than predictive.',
            'Balancing performed at aggregate milk volume level rather than component level (fat, protein, SNF). Component optimization for product mix not systematically achievable.',
            'Cream supply identified as critical constraint where shortages must be prevented. However, cream forecasting and allocation managed manually without system support.',
            'Seasonal demand variations (Ramadan +60%, Eid peaks) factored into planning through manual adjustments. No automated seasonal profiles or calendar-based planning in SAP.'
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
            'Purchase requisition to purchase order conversion entirely manual. No automatic PO creation from approved PRs or MRP-generated requirements.',
            'Purchase requisitions required for all materials before PO creation with up to 4 approval levels. Multi-level approval extends procurement cycle time significantly.',
            'Purchase orders require up to 5 levels of approval depending on value thresholds. Extended approval chains create delays particularly for time-sensitive procurement.',
            'Vendor selection performed manually based on buyer experience and relationships. No systematic source determination, vendor scorecards, or automated RFQ process.',
            'Emergency purchases handled through petty cash with AED 7,000 limit. Workaround process bypasses procurement controls and creates reconciliation burden.'
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
            'Physical receiving performed at designated dock locations. However, integration between gate entry, weighbridge, and SAP goods receipt may have timing gaps.',
            'Barcode scanning deployed for palletization with Handling Unit capture. However, HU creation may not always align with physical pallet configuration.',
            'Handling units critical for warehouse operations as barcode identifies pallet contents. HU integrity issues can cascade into picking and shipping errors.',
            'Goods receipt for emergency purchases posted followed by separate petty cash request process. Dual documentation creates reconciliation complexity.',
            'Batch information captured at goods receipt including SCA code, DC assignment, batch number, and dates. However, vendor batch linkage may be incomplete.'
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
            'Stock Transport Orders (STOs) used for inter-DC transfers. However, in-transit visibility and transfer documentation may not be consistently maintained.',
            'Both plant-based and storage location-based STOs used creating inconsistent transfer patterns. Lack of standardization complicates inventory tracking and reporting.',
            'Biosecurity restrictions for Kizad facility require no inbound transfers of certain materials. System enforcement of these rules may not be fully configured.',
            'Materials valued consistently across plants using standard costing. However, transfer pricing between entities may not reflect arm\'s length principles.',
            'Dead stock and slow-moving inventory identified as issue requiring attention. No systematic aging analysis or write-off procedures in place.'
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
            'Warehouse Management System (WMS) deployed for storage and transfer operations. However, full WMS functionality may not be leveraged for optimization.',
            'No dedicated warehouse manager role with items stored in available locations without systematic putaway rules. Random storage creates picking inefficiency.',
            'Transfer orders and confirmations processed through system. However, real-time task management and performance monitoring may not be fully utilized.',
            'Barcode-based Handling Unit identification enables tracking. However, HU lifecycle management from creation through consumption may have gaps.',
            'Warehouse operation complexities including wave picking, task interleaving, and capacity management may be overlooked in current simple configuration.'
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
            'Duplicate material codes exist for identical items across different entities. Same physical material may have 2-3 different SAP codes creating confusion and reporting issues.',
            'Vendor master records maintained separately per company code without central governance. Same supplier may have different vendor numbers and payment terms across entities.',
            'Custom material types defined (e.g., ZROH) rather than using SAP standard types. Custom configurations complicate upgrades and limit use of standard functionality.',
            'Master data quality issues prevalent across material, vendor, and customer masters. Incomplete fields, inconsistent naming, and duplicate records impact process efficiency.',
            'Same materials from different vendors assigned different material codes. This prevents accurate spend analysis and volume consolidation for procurement leverage.'
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
            'Processing plant receives 50,000-60,000 birds daily from company farms. High volume operation requires systematic live receiving and staging management not currently in SAP.',
            'SAP Livestock Management module not implemented. Flock lifecycle from DOC placement through processing not tracked in integrated ERP system.',
            'Flock performance data including feed conversion, mortality, and growth rates managed in spreadsheets outside SAP. Farm-to-processing integration missing.',
            'Day-old chicks (DOCs) from multiple sources mixed in same grow-out houses. This commingling breaks traceability from hatchery source through finished products.',
            'Live bird inventory not properly valued in SAP using biological asset accounting. Growing flock investment and fair value adjustments not systematically captured.'
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
            'Five sequential production orders in processing chain (Egg→DOC→Broiler→Carcass→Portions→FG). Complex chain creates yield variance accumulation and costing challenges.',
            'Fresh processing (PPE) and frozen processing (FPPE) operate as separate production facilities. Facility allocation decisions impact product availability and cost.',
            'Production split approximately 70% fresh, 30% frozen based on market demand. However, allocation flexibility limited and not optimized for profitability.',
            'SAP Meat, Seafood & Game (MSG) industry solution not implemented. Catch-weight management critical for poultry not available, forcing workarounds.',
            'Production orders created retrospectively AFTER actual output weights known. This post-production documentation prevents real-time cost tracking and variance analysis.'
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
            'Output mix typically 65-70% whole chicken and 30-35% portioned products. Product mix variability creates planning challenges for sales demand fulfillment.',
            'Variable yield is significant operational challenge where planned output differs substantially from actual. Yield unpredictability impacts inventory planning and customer commitments.',
            'Multiple SKU sizes (1kg, 1.2kg, 1.4kg, etc.) produced from same input birds based on natural weight distribution. Cannot control SKU mix output from given input.',
            'Final SKU determination occurs at packing station based on actual piece weight. This late determination prevents forward sales allocation and ATP functionality.',
            'No value-based splitting methodology for allocating carcass cost to individual portions. Portion-level profitability analysis not achievable with current costing approach.'
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
            'Key accounts like Nandos have dedicated marinated product specifications. Customer-specific production requirements managed informally without SAP specification master.',
            'Customers provide marination ingredients free of charge for processing. Customer-furnished materials not formally tracked in SAP creating inventory and costing gaps.',
            'White-label/private label production performed for customers like Viva. However, contract terms, specifications, and pricing not managed in SAP contract structures.',
            'No formal contract management configuration in SAP for customer manufacturing agreements. Contract validity, volumes, and pricing maintained outside system.',
            'Customer recipes and pricing arrangements documented informally rather than in SAP master data. Specification changes and version control not systematically managed.'
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
            'Quality checks performed at multiple points in processing but results not recorded in SAP QM module. Quality data maintained in separate spreadsheets and documents.',
            'No Laboratory Information Management System (LIMS) integration with SAP. Test results manually documented creating data transcription delays and potential errors.',
            'Day-old chick (DOC) quality specifications only recently implemented within past month. Limited history for quality trend analysis and supplier performance evaluation.',
            'Hatching egg testing performed 20-22 days into incubation cycle. Late testing timing means quality issues discovered after significant investment in incubation resources.',
            'Disease traceability severely limited when birds from multiple sources mixed in grow-out houses. Cannot trace disease outbreaks back to specific DOC sources.'
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
            'Dual temperature regimes: Fresh products at 0-4°C with 24-72 hour shelf life, Frozen at -18°C with 1-year shelf life. Temperature zone management critical but not SAP-integrated.',
            'Return rate averages 13% against target of 10-12%. Above-target returns indicate shelf-life, quality, or demand forecasting issues requiring root cause analysis.',
            'Good-condition returns repacked as frozen products under Salwa brand. However, returns processing workflow and inventory segregation not systematically managed in SAP.',
            'Batch numbers assigned by production date meaning all same-day production shares batch identity. Single batch number prevents granular traceability to specific processing lots.',
            'FEFO (First Expiry First Out) claimed as operational practice but system enforcement unclear. Fresh product rotation critical with 24-72 hour shelf life.'
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
            'Van sales distribution through 32 routes with routes configured as storage locations in SAP. Better route visibility than dairy but still limited real-time tracking.',
            'SONIC mobile application (Android) manages field sales operations including orders, deliveries, and collections. Integration with SAP limited to batch synchronization.',
            'Mobile devices operate fully offline throughout delivery day with end-of-day data synchronization. No real-time visibility into van inventory or sales activity.',
            'Route-level profitability analysis not available in SAP. Cannot determine which routes are profitable or identify optimization opportunities for route rationalization.',
            'Export sales representing approximately 3% of revenue managed directly in SAP using standard order-to-cash. Domestic van sales remain in external system.'
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
            '32 van sales routes configured as storage locations in SAP providing route-level inventory visibility. However, real-time stock movements not captured during delivery operations.',
            'SONIC Android mobile application manages field sales operations including customer orders, deliveries, returns, and cash collection. App operates independently from SAP.',
            'Mobile devices operate fully offline with morning stock load and evening data synchronization. Full day of transactions accumulated before SAP visibility.',
            'End-of-day reconciliation performed at individual van level rather than central depot. Decentralized process extends settlement time and delays issue identification.',
            'No real-time visibility into van inventory, sales progress, or driver location during operating day. Management operates without intra-day performance insights.'
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
            'Daily synchronization with SAP for master data download and transaction upload. One-day data latency between field operations and SAP records.',
            'End-of-day transaction upload batches all daily sales, returns, and collections into single integration run. No continuous transaction flow to SAP.',
            'Manual reconciliation required between SONIC mobile system and SAP posted transactions. Discrepancy investigation and correction consumes administrative resources.',
            'No real-time Available-to-Promise (ATP) check possible during offline operation. Drivers may commit to orders that cannot be fulfilled from available inventory.',
            'Price changes and master data updates only take effect on next business day. Pricing discrepancies possible when changes occur during active selling day.'
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
            'Route-level profitability analysis not configured in SAP CO-PA. Cannot determine contribution margin by route for investment and rationalization decisions.',
            'Weekly supervisor meetings review performance using reports generated outside SAP. Analysis prepared manually without systematic data foundation.',
            'Customer-level profitability tracking not available in SAP. Cannot identify which customers within routes are profitable or determine cost-to-serve.',
            'Performance analysis performed manually in Excel spreadsheets. Data extraction, compilation, and analysis time-consuming and potentially inconsistent.',
            'Cannot systematically identify profitable versus loss-making routes. Route optimization and territory rebalancing decisions made without financial data support.'
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
            'Export channel represents only approximately 3% of frozen product sales. Small volume handled manually without systematic export management processes.',
            'Export sales orders created manually in SAP without standardized document templates or compliance checklists. Order entry process varies by customer.',
            'Export customers arrange their own pickup from facility. No delivery logistics or shipping coordination managed by ENF for export orders.',
            'Export documentation including commercial invoice, packing list, and certificates of origin generated manually outside SAP. Document preparation is labor-intensive.',
            'Halal certification documents managed outside SAP system. Certificate tracking, expiry management, and customer-specific requirements handled manually.'
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
            'Key accounts like Nandos receive dedicated handling with customer-specific products and service levels. Special handling requirements managed informally.',
            'Customers provide proprietary marination formulas for their specific products. Recipe confidentiality and version control managed outside SAP system.',
            'No formal contract management configured in SAP for key account agreements. Contract terms, volumes, pricing, and validity tracked manually.',
            'Recipe specifications and pricing arrangements documented in separate files outside SAP. Changes require manual coordination across multiple documents.',
            'Customer product specifications managed manually without SAP specification master data. Specification changes communicated informally rather than through system workflow.'
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
            'White-label/private label production performed for customers like Viva. Contract manufacturing arrangements managed informally rather than in SAP.',
            'Customers provide packaging artwork and product specifications for their brands. Customer-furnished materials not tracked in SAP material management.',
            'Recipe formulations and pricing included in private label arrangements. However, separate margin tracking for private label versus own-brand not configured.',
            'Customer-specific packaging materials managed outside SAP Bill of Materials structure. BOM variants for private label products not systematically maintained.',
            'Label and artwork changes coordinated manually with customers. No formal change management workflow or version control for customer packaging specifications.'
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
            'Product returns average 13% of sales against target of 10-12%. Above-target return rate indicates opportunities for quality improvement or demand forecasting accuracy.',
            'Good-condition returns (approximately 80%) repacked as frozen products under Salwa brand. Reprocessing economics and margin impact not systematically tracked.',
            'Bad-quality returns sent to rendering for by-product recovery. Rendering yield and by-product revenue tracking may not be fully integrated with return costing.',
            'Quality classification determines return disposition with 80% graded as suitable for reprocessing. However, classification criteria and consistency may vary.',
            'Quality inspection lot created for return disposition decision-making. However, SAP QM integration for returns may not be fully configured for automated workflow.'
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
            'Hatching eggs sourced from Liwa/Salwa breeding operations (internal group entity). Intercompany transfer process not formalized in SAP with proper documentation.',
            'Egg deliveries documented with manual delivery notes outside SAP system. Receipt quantities and quality not captured in real-time ERP records.',
            'Eggs graded at ENF receiving into A-grade (suitable for hatching) and B-grade (rejected for incubation). Grading results recorded manually rather than in SAP QM.',
            'B-grade eggs returned to Salwa for sale as table eggs. Return logistics and intercompany billing managed informally without SAP STO process.',
            'No batch genealogy maintained linking hatching eggs through DOC production to finished products. Source flock traceability broken at multiple points.'
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
            'Single production order covers entire 21-day incubation cycle without intermediate checkpoints. In-process visibility limited until final hatch output.',
            'Mortality and scrapping recorded during incubation cycle. However, root cause analysis and trending by batch/source not systematically captured in SAP.',
            'Standard hatchability rates estimated at 85-86% while actual performance achieves 90-92%. Standard cost variance favorable but not driving standard updates.',
            'All accumulated production costs assigned to good DOC output. Scrap and mortality costs not separately analyzed for process improvement opportunities.',
            'Goods receipt from manufacturing (GRM) based on count of viable day-old chicks produced. Catch-weight costing for variable DOC weights not applied.'
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
            'SAP Livestock Management module not implemented. Flock lifecycle data including placement, growth, mortality, and processing managed in spreadsheets outside SAP.',
            'Single production order created per poultry house for entire grow-out cycle. Limited granularity prevents daily tracking and performance comparison.',
            'Feed delivered in bulk to farm silos without precise measurement at consumption point. Actual feed usage per house estimated rather than directly measured.',
            'Feed Conversion Ratio (FCR) of 1.7-1.8 significantly exceeds industry benchmark of 1.4. Performance gap represents substantial cost and efficiency improvement opportunity.',
            'Day-old chicks from multiple sources mixed in same grow-out houses. Multi-source mixing eliminates ability to trace performance and quality issues to specific DOC suppliers.'
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
            'Processing plant receives 50,000-60,000 live birds daily from company farms. High volume requires systematic receiving process not currently integrated with SAP.',
            'Platform weighing at live receiving not integrated with SAP. Manual weight entry creates delays and potential accuracy issues for yield calculations.',
            'Ante-mortem inspection performed manually by qualified personnel. Inspection results documented on paper forms rather than SAP Quality Management.',
            'Health inspection findings not recorded in SAP system. Cannot analyze inspection trends or link rejections to source farms for performance feedback.',
            'Cannot establish accurate yield baseline without integrated live weight capture. Processing yield calculations start from estimated rather than actual input weights.'
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
            'Fresh processing (PPE) and frozen processing (FPPE) operate as separate production facilities with different equipment and workflows. Allocation between facilities affects product availability.',
            'Production split approximately 70% fresh and 30% frozen based on market demand. However, real-time demand signals do not drive facility allocation decisions.',
            'Processing line speed and throughput not captured in SAP. Cannot analyze line efficiency or optimize scheduling based on actual equipment performance.',
            'Yield variances from standard cannot be linked to specific production lines, shifts, or operators. Root cause analysis for yield losses requires manual investigation.',
            'Five sequential production orders in processing chain creates complexity for cost tracking and variance analysis. Each order accumulates variances passed to next stage.'
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
            'Variable yield challenge with production orders created AFTER actual output quantities known. Retrospective order creation prevents forward planning and cost control.',
            'Output mix approximately 65-70% whole chickens and 30-35% portioned products. Natural weight distribution determines product mix rather than demand-driven allocation.',
            'No value-based carcass splitting methodology for allocating joint costs to portions. All portions receive equal cost per kg regardless of market value.',
            'By-products from processing (offal, feathers, blood) not systematically valued in SAP. Rendering revenue not properly offset against processing costs.',
            'Planned production quantities differ significantly from actual output due to natural yield variability. Planning accuracy compromised by unpredictable yield patterns.'
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
            'Multiple SKU sizes (1kg, 1.2kg, 1.4kg, etc.) produced from same input birds based on natural weight distribution. Cannot control SKU mix to meet specific demand patterns.',
            'Final SKU assignment determined at packing station based on actual piece weight. Late determination prevents forward inventory planning and customer commitment.',
            'Catch-weight inventory management not configured in SAP. Poultry inventory tracked by pieces without capturing actual weight variability.',
            'Weight-range classification for SKU assignment performed manually by packing operators. Classification consistency may vary between operators and shifts.',
            'Automatic SKU assignment based on scale integration not implemented. Manual SKU selection creates potential for misclassification and inventory accuracy issues.'
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
            'Day-old chicks (DOCs) imported entirely from Saudi Arabia with complete reliance on international suppliers. Supply chain vulnerability from single source region.',
            'Suppliers deliver DOCs to farm doorstep with no ENF involvement in inbound logistics. Transport conditions and timing not monitored or controlled.',
            'No supplier quality management program configured in SAP. Vendor performance history, quality trends, and compliance tracking maintained informally.',
            'Import documentation including veterinary certificates, CITES permits, and customs clearance managed manually outside SAP. Document tracking labor-intensive.',
            'Arrival inspection results not recorded in SAP Quality Management. Cannot systematically analyze DOC quality trends by supplier or shipment.'
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
            'DOC quality specifications only formalized and implemented within past month. Limited history for trending or baseline establishment.',
            'Prior to recent implementation, purchase orders issued without formal quality specifications. Acceptance criteria were informal verbal agreements.',
            'Vendor compliance against specifications not tracked systematically in SAP. Non-conformance history and trends not available for vendor evaluation.',
            'Specification review and compliance assessment performed manually by quality personnel. No automated comparison against purchase order requirements.',
            'No formal vendor performance scoring or rating system implemented. Supplier selection based on availability and relationship rather than quality metrics.'
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
            'Approximately 90% of feed procurement under Abu Dhabi government subsidy program (ADS). Subsidy compliance and documentation critical for cost structure.',
            'Subsidy quota registration performed manually in government portal. No integration between SAP procurement and government subsidy system.',
            'Greenfields for Feeds (internal group company) serves as primary feed supplier for subsidized volumes. Intercompany pricing and transfer documentation manual.',
            'Procurement limited to government-approved suppliers for subsidized feed. Supplier selection constrained by regulatory requirements rather than performance.',
            'External market purchases required when government quota exceeded. Price differential between subsidized and market feed creates significant cost impact.'
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
            'Vaccine and medication inventory managed locally by farm manager and laboratory staff. Decentralized management without central visibility or control.',
            'Purchase requisitions created based on farm requirements and vaccination schedules. However, consumption tracking and reorder point automation not configured.',
            'Cold chain requirements for vaccines not managed in SAP. Temperature-controlled storage not tracked or linked to batch validity in the system.',
            'Temperature excursion events not tracked in SAP or linked to affected vaccine batches. Potentially compromised vaccines cannot be systematically identified.',
            'Withdrawal periods before slaughter tracked manually outside SAP. No system enforcement to prevent processing of birds within withdrawal window.'
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
            'No daily or periodic valuation of growing bird inventory during grow-out cycle. Flock value only recognized at cycle completion when birds are processed.',
            'Growing birds valued through production order confirmation at cycle end. Accumulated costs recognized only when birds transferred to processing.',
            'Millions of AED in growing bird inventory not properly reflected on balance sheet. Biological asset value significantly understated during grow-out period.',
            'Weight gain and biological transformation not recognized per IAS 41 requirements. Daily value increase from growth not captured in financial records.',
            'Mortality losses deducted only at cycle end rather than as they occur. Daily mortality not reflected in inventory value or cost of production.'
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
            'Separate packaging materials maintained for own brands (Rauda, Salwa) and private label customers. Multiple SKUs of similar packaging create inventory complexity.',
            'Customer-specific artwork and brand packaging managed outside SAP material master. No linkage between packaging specifications and materials in system.',
            'Artwork version control performed manually with risk of obsolete packaging being used in production. No automated version validation against production orders.',
            'Bill of Materials management complex due to multiple packaging variants for similar products. BOM proliferation creates maintenance burden and potential errors.',
            'Label regulatory specifications including nutritional information, allergen declarations, and country requirements not maintained in SAP. Compliance verification manual.'
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
            'Quality checks performed at DOC receipt but process only recently formalized. Historical quality data limited for trend analysis and supplier evaluation.',
            'DOC quality specifications only implemented within past month. Prior receipts accepted without formal quality criteria or systematic inspection.',
            'Swab tests for disease screening conducted at receipt. However, test results documented outside SAP without linkage to receiving batches.',
            'No vendor performance scoring based on quality metrics. Supplier evaluation relies on subjective assessment rather than quantitative quality data.',
            'Cannot enforce quality-based supplier selection without systematic quality tracking. All approved suppliers treated equally regardless of quality performance.'
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
            'Quality testing performed 20-22 days into 21-day incubation cycle, essentially too late for intervention. Test results available only after hatch is complete.',
            'Test results received after eggs have hatched into DOCs. By this point, no corrective action possible for affected batch; can only inform future decisions.',
            'No pre-incubation testing capability or protocols established. Cannot identify and remove infected eggs before incubation investment is made.',
            'Disease outbreaks cannot be traced to specific egg sources when eggs from multiple suppliers are mixed. Source identification requires separate batch processing.',
            'Pseudomonas contamination example required 18 days from symptom detection to source identification. Extended investigation time due to traceability gaps.'
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
            'In-process quality control function exists and operates but completely outside SAP QM module. Quality checks performed without system-enforced workflows.',
            'HACCP Critical Control Point monitoring performed but documented on paper forms. No real-time CCP data capture or automatic deviation alerts in system.',
            'Quality records retained for product shelf life plus one year as regulatory requirement. However, retrieval for audits requires manual search of archives.',
            'Quality documentation stored in mix of cloud-based file storage and physical paper files. Fragmented storage complicates document retrieval for audits or investigations.',
            'No automatic batch hold triggered when results are out of specification. Quality holds applied manually after results reviewed, creating potential release of non-conforming product.'
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
            'No Laboratory Information Management System (LIMS) integration with SAP. Test results managed in separate laboratory systems without automatic data transfer.',
            'Microbiological test results not linked to production batches in SAP. Cannot query batch status or view test history from production order records.',
            'Fresh products with 24-72 hour shelf life can ship to customers before microbiological results available. Testing timeline incompatible with product shelf life.',
            'Salmonella and Campylobacter testing performed but documented manually. Pathogen testing records not systematically linked to batches for regulatory compliance.',
            'Antibiotic residue testing may have coverage gaps. Withdrawal period compliance relies on manual tracking rather than system-enforced controls.'
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
            'Returned products classified into good condition (suitable for reprocessing) or bad condition (rendering only). Classification criteria may vary by inspector.',
            'Good-condition returns repacked as frozen products under alternate brand (Salwa). Reprocessing decisions made without systematic cost-benefit analysis.',
            'Quality inspection lot created in system for disposition decision. However, inspection results and decisions may not be fully documented in SAP QM.',
            'Routing of returns to reprocessing line or rendering facility determined manually by quality personnel. No automatic routing rules based on inspection results.',
            'Root cause of returns not systematically tracked by reason code, customer, route, or product. Pattern analysis for quality improvement relies on manual investigation.'
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
            'Batch genealogy incomplete with gaps at multiple points in the processing chain. Cannot reliably trace finished products back to source flocks or DOC suppliers.',
            'Forward traceability (supplier to customer) and backward traceability (customer to supplier) cannot be completed end-to-end due to batch data gaps.',
            'Mock recall exercise has never been formally tested. Actual recall response time and completeness unknown, representing regulatory and food safety risk.',
            'Farm-to-fork traceability fundamentally broken by practice of mixing DOCs from multiple sources in same grow-out houses. Source identification impossible after mixing.',
            'Without targeted traceability, any recall would require full market withdrawal of all potentially affected products. Recall scope far broader than necessary.'
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
            'Breeding flock costs capitalized during first 24-week maturation period. Asset value accumulated but daily fair value adjustments not applied per IAS 41.',
            'Amortization applied during production weeks 25-65 as breeding flock produces eggs. However, amortization calculation performed outside SAP.',
            'All biological asset calculations including capitalization, fair value, and amortization performed in Excel spreadsheets. No SAP biological asset accounting.',
            'Biological asset journal entries posted via manual journal vouchers in SAP. Manual posting creates audit trail gaps and potential for entry errors.',
            'Biological asset amortization not charged to production orders or included in egg/DOC product costs. COGS incomplete without biological asset cost allocation.'
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
            'Breeding flock amortization calculations performed in Excel spreadsheets. Complex formulas maintained outside SAP create verification and audit challenges.',
            'Amortization amounts posted to SAP through manual journal vouchers rather than automated asset accounting. Monthly manual entry required.',
            'Amortization expense not linked to production orders or allocated to products produced during the period. Cost-product relationship not established.',
            'Amortization excluded from Cost of Goods Sold calculation. Product profitability and gross margin calculations incomplete without this cost element.',
            'Audit trail for manual journal voucher postings weaker than automated postings. Supporting calculations maintained separately from SAP posting.'
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
            'Costing performed at period level only (monthly) rather than production order level. Cannot determine cost of specific production runs or batches.',
            'Production order costing and settlement not configured. Orders used for quantity tracking but not for cost collection and variance analysis.',
            'No standard cost versus actual cost variance analysis available. Cost performance deviations not identified, quantified, or investigated systematically.',
            'Work-in-process inventory valued at accumulated actual costs without analysis of cost elements. WIP aging and valuation methodology may not meet audit requirements.',
            'Cannot identify cost variances at batch, shift, line, or operator level. Cost improvement opportunities hidden in aggregate period data.'
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
            'All production labor costs expensed directly to P&L cost centers. Labor not treated as manufacturing cost that should be allocated to products produced.',
            'Labor costs not allocated to production orders. Products receive no labor cost component, significantly understating true manufacturing cost.',
            'Product cost excludes labor, showing only material costs. Product profitability and pricing decisions made without complete cost visibility.',
            'No activity-based costing for labor allocation. Different processing activities (slaughter, portioning, packing) not costed at different rates.',
            'Direct labor costs only partially identified and captured. Indirect labor and supervision costs completely excluded from product cost calculations.'
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
            'Cost of Goods Sold excludes breeding flock amortization expense. Significant production cost element missing from COGS calculation.',
            'COGS excludes production labor costs which are expensed as period costs. Material-only COGS significantly understates true manufacturing cost.',
            'Gross margin systematically overstated due to incomplete COGS. Management makes decisions based on artificially favorable margin data.',
            'CO-PA profitability analysis incomplete without full product costs. Profitability rankings by product, customer, and channel potentially incorrect.',
            'Product margins appear significantly higher than actual economic reality. Pricing decisions and product portfolio strategy based on misleading cost data.'
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
            'Route-level profitability not configured in SAP CO-PA. Cannot determine which of 32 van routes generate profit versus loss for resource allocation decisions.',
            'Customer-level profitability analysis not available. Cannot identify high-value customers for retention focus or loss-making customers for pricing action.',
            'Performance analysis conducted weekly using manually prepared reports from external van sales data. Analysis is backward-looking and resource-intensive.',
            'No real-time profitability dashboards or executive reporting. Management waits for periodic manual reports rather than having continuous visibility.',
            'Cannot systematically identify profitable versus unprofitable routes or customers. Portfolio optimization decisions made without financial foundation.'
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
            'Sales predominantly intercompany to Emirates National Foods for subsidized chicken feed. Heavy reliance on single internal customer creates business concentration risk.',
            'External sales of cattle feed represent minimal portion of revenue. Limited market presence outside government-subsidized poultry feed segment.',
            'Sales function handled by finance team rather than dedicated sales personnel due to low external transaction volumes. No sales development focus.',
            'Walk-in customers served with simplified order-to-cash process. Limited customer relationship management or proactive sales engagement.',
            'Market diversification limited with heavy dependence on government subsidy program. External commercial opportunities not systematically pursued.'
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
            'Custom program outside SAP creates gate pass documentation for outbound shipments. Non-standard process deviates from SAP best practices.',
            'Gate pass automatically generates corresponding sales order in SAP. Sales order created as result of shipment rather than triggering shipment.',
            'Customer code, material, and quantity captured in gate pass system. Data subsequently transmitted to SAP rather than originating in ERP.',
            'Non-standard SAP order-to-cash process creates integration complexity. Custom development required for gate pass-SAP synchronization.',
            'Gate pass serves as primary sales trigger rather than customer order. Reactive documentation rather than proactive order management.'
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
            'Feed supplied to Emirates National Foods through intercompany transactions. However, IC process not fully configured with proper SAP trading partner setup.',
            'Fixed transfer pricing for intercompany feed sales maintained manually in spreadsheets. Transfer pricing documentation may not meet regulatory requirements.',
            'No formal scheduling agreements or contracts configured in SAP for intercompany feed supply. Arrangement operates on informal basis without system controls.',
            'No formal demand commitment or forecast visibility from ENF as customer. GF production planning operates without reliable forward demand signal.',
            'Significant planning uncertainty due to lack of committed orders. Production decisions made without firm customer requirements, risking excess or shortage.'
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
            'Feed delivered directly from mill to ENF farm silos without intermediate storage. Direct delivery model efficient but lacks delivery verification.',
            'Bulk tanker delivery bypasses stores and warehouse operations. No staging or quality inspection point between production and farm delivery.',
            'Weighbridge measurement only at central Greenfields facility. No weighing or verification capability at receiving farm silos.',
            'Bulk tanker capacity of 32.5 tons with operational minimum of 24-28 tons. Delivery quantities constrained by tanker economics, not farm requirements.',
            'Cannot deliver precise quantities to match farm consumption needs. Over or under-delivery common, creating waste or shortage situations.'
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
            'Approximately 80% of processed products sold through co-packer arrangements. Heavy reliance on third-party packers creates quality and margin control challenges.',
            'Previously operated without formal contracts, producing based on co-packer forecasts. Demand uncertainty led to inventory buildup and potential write-offs.',
            'Finished product inventory held at GF premises remains at GF risk and cost until co-packer collection. Working capital tied up without customer commitment.',
            'No advance payment requirements historically enforced with co-packers. Full payment terms extended without deposit security.',
            'Export sales made without Letter of Credit or formal contract protection on 60-day credit terms. Significant credit exposure on international transactions.'
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
            'Import procurement dominated by frozen meat (95% of imports) sourced from Brazil and China. Commodity nature requires sophisticated price risk management.',
            'Spare parts represent less than 5% of import volume. Critical maintenance items may have long lead times without systematic planning.',
            'Container logistics and international lead times managed manually outside SAP. Shipment tracking and ETA management not integrated with planning.',
            'Import documentation including LC, customs clearance, and certificates managed outside integrated SAP process. Document tracking labor-intensive.',
            'Limited supplier diversification for key feed ingredients. Concentration risk from reliance on limited number of international sources.'
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
            'SAP MRP not activated for automated requirements planning. Material planning relies entirely on manual processes outside the system.',
            'Excel-based planning spreadsheets serve as manual MRP. Complex formulas maintained outside SAP with associated version control and calculation risks.',
            'Purchase requisitions generated manually based on Excel forecast calculations. No automated PR generation from SAP planning output.',
            'Planning horizon limited to only 1 month forward visibility. Short horizon insufficient for long lead time imported materials.',
            'Target to extend planning horizon to 6 months but requires process and data foundation improvements before achievable.'
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
            'Purchase requisitions created manually based on inventory monitoring and manual requirements calculations. No system-generated procurement recommendations.',
            'PRs raised reactively during month when stock levels trigger concern. Procurement timing driven by observation rather than systematic planning.',
            'Workflow-based approval process configured in SAP for PR and PO authorization. However, approvals applied to manually initiated requests.',
            'No automatic PR generation from MRP planning run. Each procurement requirement identified and entered manually by procurement team.',
            'Ad-hoc procurement timing creates rush orders and potential stockouts. Systematic planning cycle not established for procurement execution.'
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
            'No commodity hedging strategy or risk management framework in place. Feed mill fully exposed to market price volatility for key ingredients.',
            'Complete exposure to feed ingredient price volatility including corn, soybean meal, and other components. Price swings directly impact margins.',
            'No fixed-price forward contracts negotiated with suppliers for key commodities. All purchases at prevailing spot market prices.',
            'No use of futures, options, or other derivative instruments for commodity price protection. Financial hedging tools not considered.',
            'Customer contracts lack price escalation clauses to pass through raw material cost increases. Margin squeeze when input costs rise.'
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
            'Central warehouse maintained for spare parts and maintenance items with inventory value under 3 million AED. Limited warehousing complexity.',
            'Finished feed products not stored at Greenfields facility. Direct delivery model from production to farm silos eliminates buffer capability.',
            'Raw materials for feed production stored at mill in bulk silos and bag storage. Storage conditions and FIFO management may need improvement.',
            'No buffer stock capability for finished feed between production and farm consumption. Production must closely match demand without inventory cushion.',
            'Bulk tanker delivery chosen over bagged feed despite control and measurement challenges. Economic benefits outweigh control considerations.'
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
            'Feed recipes created based on nutritional requirements specified by ENF for different growth stages. Formulation driven by customer specification rather than optimization.',
            'External feed formulation software used for least-cost recipe optimization. Software operates independently without integration to SAP master data.',
            'Integration between formulation software and SAP unclear and potentially manual. Recipe changes may not automatically update SAP Bills of Materials.',
            'Recipe management and version control maintained outside SAP in formulation software. No single source of truth for current production recipes.',
            'No real-time cost calculation when formulating recipes. Cost impact of ingredient substitutions not visible during formulation decisions.'
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
            'Multiple feed types produced for different growth stages: Pre-starter, Starter, Grower, and Finisher formulations. Each requires different nutritional specifications.',
            'Different formulations maintained for each growth stage with specific protein, energy, and nutrient profiles. Recipe complexity increases inventory and planning burden.',
            'Feed type transitions at farms managed manually without system-based triggers. Stage changeover timing relies on farm manager judgment and communication.',
            'No automatic stage switchover notifications or delivery scheduling based on flock age. Feed deliveries not automatically aligned with growth stage transitions.',
            'Manual coordination required between Greenfields and farm managers for feed type changes. Communication gaps can result in wrong feed type delivery.'
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
            'No integrated demand planning between Greenfields production and ENF consumption requirements. Feed production operates without visibility to downstream demand.',
            'Farm bird capacity drives production volumes rather than formal demand forecast. Production reactive to farm requirements rather than proactively planned.',
            'No Sales & Operations Planning (S&OP) process established across Greenfields-ENF division. Lack of cross-functional planning creates coordination gaps.',
            'Mill capacity utilization ranges between 35-60%, well below optimal efficiency levels. Underutilization driven by demand uncertainty and lack of external sales.',
            'Production volumes reduced pending confirmed customer contracts and orders. Conservative production approach to avoid inventory buildup without firm commitments.'
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
            'Feed delivered via bulk tanker trucks directly to farm storage silos. Bulk delivery efficient but creates measurement and control challenges at receiving end.',
            'Weighbridge measurement available only at central Greenfields facility. No weighing capability at farm receiving point to verify delivered quantities.',
            'Tanker capacity of 32.5 tons with practical minimum load of 24-28 tons for efficiency. Delivery quantities constrained by vehicle economics rather than farm needs.',
            'Cannot deliver precise quantities to match farm consumption requirements. Farms receive full or near-full tanker loads regardless of actual need.',
            'No silo-level measurement sensors installed at farms. Actual inventory levels in farm silos estimated manually rather than precisely measured.'
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
            'No measurement of actual feed consumption at individual poultry house level. Consumption calculated by difference rather than directly measured.',
            'Feed consumption estimated rather than precisely measured. Estimates based on delivery records and ending silo levels without intermediate tracking.',
            'Silo level estimation performed manually using primitive stick and thread method. Measurement accuracy poor, affecting consumption and FCR calculations.',
            'Cannot correlate Feed Conversion Ratio (FCR) performance to specific feed sources or batches. Quality variation impact on bird performance not traceable.',
            'Impact of feed quality variations on bird growth performance cannot be measured. No linkage between feed batch characteristics and flock performance outcomes.'
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
            'No capability to transfer excess feed from one farm to another. Feed remaining in silos at cycle end cannot be redeployed to other locations.',
            'Excess feed in silos at flock completion typically becomes waste mixed with manure. Significant feed value lost due to inability to recover or transfer.',
            'No returnable feed policy established between Greenfields and farms. Overdelivered quantities cannot be credited back or returned to mill.',
            'No mechanism for overdelivery credit when farm receives more feed than consumed. Receiving farm bears cost of all delivered quantities.',
            'All risk of overdelivery and excess feed rests with receiving farm operation. Greenfields has no accountability for delivery quantity accuracy.'
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
            'Historical feed quality issues caused supply stoppage to ENF, highlighting critical nature of quality management. Quality failures have direct impact on poultry performance.',
            'New recipe formulations being implemented with enhanced focus on quality specifications and consistency. Quality improvement initiative underway but not yet mature.',
            'Feed testing regimen being established with defined test parameters and frequencies. Quality control program in development stage with procedures being formalized.',
            'Quality testing performed by laboratory but not integrated with SAP QM module. Test results maintained in separate systems without batch linkage in ERP.',
            'Laboratory team manages all quality testing independently. Quality data not systematically shared with production or procurement for real-time decision making.'
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
            'Current Feed Conversion Ratio of 1.7-1.8 significantly exceeds industry benchmark of 1.4. Performance gap represents major cost inefficiency in poultry operations.',
            'FCR gap of 0.3-0.4 represents substantial additional feed cost per bird produced. At current volumes, gap translates to millions of AED in excess feed expense annually.',
            'Planning to conduct controlled trials on 2-3 farms to validate feed quality improvements. Trial protocols being developed but not yet executed.',
            'Cannot validate feed quality improvements due to measurement and control gaps at farm level. Consumption tracking limitations prevent accurate FCR calculation.',
            'Performance-based feed supplier qualification not yet implemented. Suppliers not evaluated based on demonstrated FCR results with their products.'
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
            'Attempting to track bird FCR performance by feed ingredient source. Goal is to identify which suppliers provide ingredients that result in better conversion.',
            'Cannot validate vendor quality impact due to control gaps in consumption measurement. Lack of precise data prevents meaningful supplier performance comparison.',
            'No formal supplier scorecards or performance evaluation system implemented. Vendor assessment relies on subjective judgment rather than quantitative metrics.',
            'No quality agreements or specifications formally contracted with ingredient suppliers. Acceptance criteria and quality standards not contractually enforced.',
            'Cannot correlate ingredient quality with total cost of ownership. Lower-price ingredients with poor FCR impact may actually cost more than premium alternatives.'
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
            'New nutritional specifications developed to meet ENF poultry requirements for each growth stage. Specification formalization recently initiated.',
            'Testing regimen to verify nutritional compliance being established. Test parameters, frequencies, and acceptance criteria under development.',
            'Laboratory team manages both vaccine storage/handling and feed quality testing. Dual responsibility may create resource conflicts and priority issues.',
            'Certificate of Analysis from ingredient suppliers not tracked in SAP. COA documents maintained in separate files without batch linkage in ERP system.',
            'Compliance documentation gaps exist for regulatory and customer quality requirements. Quality records may not meet audit requirements for food safety traceability.'
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
            'Fixed transfer prices established for feed sales from Greenfields to ENF with built-in margin. Prices not dynamically adjusted based on actual costs.',
            'Separate budgets maintained for each legal entity without integrated planning. Budget disconnect between related entities creates coordination challenges.',
            'Transfer prices maintained manually in SAP pricing conditions. Price updates require manual entry without systematic review or approval workflow.',
            'No automatic cost-plus calculation for transfer pricing. Target margin not dynamically applied to current production costs for price determination.',
            'No formal arm\'s length documentation maintained for intercompany transactions. Transfer pricing may not meet tax authority requirements for related party pricing.'
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
            'Intercompany eliminations performed at poultry division level aggregating ENF, Greenfields, and Liwa/Salwa entities. Elimination process manual and time-consuming.',
            'Single finance team manages accounting for ENF, Greenfields, and Liwa/Salwa entities. Shared resources efficient but creates capacity constraints at period-end.',
            'Intercompany reconciliation performed manually using Excel. Balance matching and discrepancy investigation requires significant effort each month.',
            'No automatic intercompany matching or reconciliation functionality configured in SAP. System does not identify or flag intercompany balance differences.',
            'Consolidation complexity increased by different chart of accounts, timing differences, and manual processes. Month-end close extended by consolidation activities.'
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
            'Standard costing methodology used for feed production. Standard costs set periodically but may not reflect current market prices for volatile commodities.',
            'Feed cost represents 95-98% of total chicken production cost, making feed cost accuracy critical for profitability analysis and pricing decisions.',
            'Variance analysis between standard and actual costs limited in scope and frequency. Cost performance deviations not systematically investigated.',
            'Cannot analyze cost variance by feed ingredient source or supplier. Unable to identify which suppliers provide best value considering quality impact.',
            'Product cost accuracy entirely dependent on standard cost maintenance. Outdated standards produce misleading cost and margin information.'
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
            'Limited visibility into true profitability of feed operations. Cost allocations and transfer pricing obscure actual economic performance.',
            'Commodity business operates with thin margins of approximately ±5%. Small cost changes or pricing errors can swing operations between profit and loss.',
            'Budget versus actual performance disconnected without systematic analysis. Variance drivers not identified, quantified, or addressed.',
            'No protection mechanisms against raw material cost increases. Fixed customer prices absorb cost increases, squeezing already thin margins.',
            'Product-level and customer-level profitability unknown. Cannot identify which products or customers contribute positive versus negative margin.'
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
            'Each 0.1 improvement in Feed Conversion Ratio represents approximately 0.5 million AED in annual savings. FCR improvement is highest-impact cost lever available.',
            'Current FCR gap of 0.3-0.4 versus industry benchmark represents 1.5-2.0 million AED annual improvement opportunity. Significant value at stake from FCR improvement.',
            'No FCR-linked costing methodology to connect feed consumption efficiency with product costs. True cost impact of FCR performance not visible in financial statements.',
            'Cannot measure true production cost by individual flock due to consumption tracking gaps. Flock-level profitability analysis not achievable with current data.',
            'No performance incentive programs linked to FCR improvement. Farm and feed mill teams not rewarded for efficiency gains, reducing improvement motivation.'
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
            'Primary hatching egg source is Al Salwa (Liwa) as intercompany supply. Heavy reliance on single internal source creates supply concentration risk.',
            'Secondary sourcing from open market imports from Oman represents 15-16% of requirements. External purchases fill gaps when internal supply insufficient.',
            'No formal supplier diversification strategy to reduce single-source dependency. Alternative supplier qualification not systematically pursued.',
            'Limited quality-based sourcing protocols for hatching egg procurement. Supplier selection based on availability rather than quality performance.',
            'Biosecurity protocols for egg receipt and handling not integrated with SAP. Compliance documentation maintained separately from procurement records.'
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
            'Hatching eggs received from Salwa breeding operations and graded at ENF hatchery. Grading process determines egg suitability for incubation.',
            'Eggs classified as Grade A (suitable for hatching) or Grade B (rejected for incubation). Classification criteria applied but may lack consistency.',
            'B-grade rejected eggs returned to Salwa for sale as table eggs. Return logistics and intercompany accounting process managed informally.',
            'Physical inspection and grading process with results recorded manually. No integration with SAP Quality Management for inspection lot creation.',
            'Recently began implementing formal quality specifications for hatching eggs. Specification criteria and acceptance limits being formalized.'
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
            'Hatching eggs stored at ENF facility before setting in incubators. Storage conditions critical for maintaining egg quality and hatchability.',
            'Extended storage beyond 20 days significantly reduces hatchability rates. Egg quality degrades with storage time, impacting DOC yield.',
            'Optimal storage period is 7-8 days before setting. Longer storage accepted when supply exceeds incubator capacity, reducing hatch performance.',
            'No system-enforced FIFO by receipt date for egg storage. Oldest eggs not systematically set first, potentially extending storage beyond optimal.',
            'Temperature and humidity monitoring for storage rooms not integrated with SAP. Storage condition compliance documented manually.'
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
            'Standard 21-day incubation cycle from setting to hatch. Cycle timing fixed by biological requirements but capacity planning needed for machine utilization.',
            'Egg setting performed every 4 days aligned with collection schedule from Salwa breeding farms. Setting frequency driven by supply rather than optimized schedule.',
            'Approximately 200,000 eggs set per 4-day setting cycle. Volume represents full hatchery capacity utilization during peak periods.',
            'No SAP MSG (Meat, Seafood, Game) incubation management functionality deployed. Hatchery operations managed manually outside ERP system.',
            'Setting schedule managed manually without optimization tools. No systematic analysis of incubator capacity utilization or setting sequence efficiency.'
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
            'Historical hatchability estimates of 85-86% significantly understated actual performance of 90-92%. Estimation error persisted undetected for extended period.',
            'Estimation methodology recently corrected after discovery of systematic underestimation. Process improvement implemented but root cause analysis incomplete.',
            'Hatchability estimation errors caused DOC oversupply to farms. More chicks produced than planned, stressing farm capacity and feed supply planning.',
            'No statistical hatchability models developed from historical data. Hatch rate expectations based on simple averages without seasonal or source adjustments.',
            'No breed-specific performance tracking for hatchability metrics. Different genetic lines not evaluated separately for hatch performance comparison.'
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
            'Hatchery produces day-old chicks exclusively for own farm operations. No external DOC sales, limiting revenue diversification opportunities.',
            'Hatchery capacity of 150,000 DOCs per 4-day setting cycle. Capacity sized for internal farm requirements without commercial surplus.',
            'Production order created for egg-to-DOC conversion process. However, order costing and variance analysis not fully utilized for performance management.',
            'No systematic hatch yield variance analysis comparing actual to expected DOC output. Yield losses not quantified or investigated for improvement.',
            'DOC quality grading not formalized in SAP. Chick quality assessment performed but results not recorded in system for supplier feedback.'
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
            'Broiler operations span 13 farms with 6 poultry houses each. Distributed farm network requires coordinated management and logistics.',
            'Each house capacity of 25,000 birds provides total placement capacity of approximately 150,000 birds per cycle. Capacity constrains growth potential.',
            'No SAP Livestock Management module deployed for farm operations. Flock lifecycle completely managed outside ERP system.',
            'House-level tracking for bird counts, mortality, and performance maintained manually in spreadsheets. No system-based flock management.',
            'Capacity utilization optimization not system-driven. Placement scheduling and house allocation based on manual coordination rather than analytics.'
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
            'Day-old chicks from hatchery transported and placed in prepared farm houses. Placement logistics coordinated manually between hatchery and farms.',
            'Single production order created per house covering entire grow-out cycle. Limited granularity prevents detailed daily tracking within cycle.',
            'Production order remains open throughout 35-42 day growing cycle until birds sent to processing. Extended open order duration complicates cost tracking.',
            'No flock master data configured in SAP. Flock attributes including source, placement date, and bird count not maintained as master records.',
            'Placement scheduling performed manually by farm management. No system-based coordination of hatchery output with house availability.'
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
            'Broiler grow-out cycle of 35-42 days from DOC placement to target slaughter weight. Cycle length varies based on target weight and market requirements.',
            'Three nutritional stages during growth: Pre-starter (days 1-10), Grower (days 11-23), and Finisher until processing. Each stage requires different feed formulation.',
            'No growth curve monitoring capability in SAP. Expected versus actual bird weights not tracked in system for early detection of performance issues.',
            'Feed stage transitions managed manually based on bird age. No system triggers or alerts for stage changeover timing.',
            'Key performance indicators including daily gain, feed consumption, and mortality tracked in external spreadsheets. Performance data not in ERP for integrated analysis.'
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
            'CRITICAL GAP: Feed delivered in bulk tankers to farm silos without precise measurement at either end. Significant control weakness for major cost component.',
            'No weighing capability at delivery point or silo level sensors installed. Delivered quantities based on dispatch weight only without receipt verification.',
            'Feed consumption estimated by difference rather than directly measured at house level. Estimation methodology introduces significant uncertainty.',
            'Cannot verify or reconcile delivered quantities versus actual consumption. Discrepancies between delivery and usage cannot be identified or investigated.',
            'Feed Conversion Ratio calculations unreliable due to consumption measurement gaps. FCR performance metrics based on estimates rather than actual data.'
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
            'Feed Conversion Ratio of 1.7-1.8 significantly exceeds industry benchmark of 1.4. This performance gap represents a critical competitive disadvantage.',
            'FCR gap of 0.3-0.4 translates to millions of AED in excess feed cost annually. Improvement to benchmark levels would substantially improve profitability.',
            'No real-time FCR visibility at individual house level. Performance variations between houses cannot be detected during grow-out cycle.',
            'Cannot trace FCR performance to specific feed batches or vendors. Unable to identify whether poor FCR results from feed quality or farm management.',
            'Continuous improvement initiatives limited by lack of reliable data. Cannot measure impact of changes due to consumption tracking gaps.'
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
            'Mortality is only recorded as scrap at the end of the grow-out cycle. Daily deaths are not captured in SAP, losing valuable data for trend analysis and early warning detection.',
            'Root cause analysis for mortality events is severely limited. Without daily recording and reason codes, patterns indicating disease onset or environmental issues cannot be identified.',
            'When feed batches are mixed in silos, correlation between mortality spikes and specific feed sources becomes impossible. Feed quality issues may go undetected as a mortality driver.',
            'Daily mortality counts are maintained externally but not entered into SAP. This disconnect means financial impact of mortality is not visible until cycle completion.',
            'Disease outbreak correlation requires manual cross-referencing of paper records. Early indicators of health issues cannot be detected through system analytics.'
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
            'Two processing plants operate independently: PPE (Primary Processing Establishment) for fresh products and FPPE (Further Processing Poultry Establishment) for frozen and value-added items.',
            'PPE facility handles fresh chicken production for the Al Rawdah brand. The plant focuses on whole birds and fresh portions for immediate distribution to retail and foodservice.',
            'FPPE facility manages frozen products and further processed items including marinated products, formed items, and ready-to-cook offerings. Different production characteristics from fresh operations.',
            'No integrated planning system coordinates the two plants. Production scheduling, capacity balancing, and product mix optimization are managed manually without visibility across facilities.',
            'Line capacity optimization relies on manual calculations and experience. Dynamic reallocation of products between lines based on demand changes is not system-supported.'
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
            'Processing capacity of 50,000-60,000 birds per day represents significant throughput requiring precise coordination. Volume variations impact labor scheduling, utilities, and packaging material requirements.',
            'Farm-to-plant coordination is managed manually via phone calls and spreadsheets. No system integration provides real-time visibility of bird availability, transport scheduling, or arrival timing.',
            'Slaughter planning lacks optimization algorithms. Sequence of farm pickups, bird weights, and plant line allocation are determined by experience rather than data-driven optimization.',
            'Capacity matching between live bird supply and processing demand is handled ad-hoc. Mismatches result in either idle capacity costs or overtime when supply exceeds normal capacity.',
            'Volume forecasting uses basic historical averages. Seasonal demand patterns, promotional impacts, and customer requirement changes are not systematically incorporated into planning.'
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
            'Production follows a five-stage transformation chain: Egg→DOC, DOC→Broiler, Live→Carcass, Carcass→Portions, Portions→Packed Finished Goods. Each stage creates value and tracking requirements.',
            'The complete chain from egg to finished goods is not managed through SAP MSG (Meat, Seafood, Game) functionality. Stages are tracked independently without integrated cost flow visibility.',
            'Disassembly BOM (Bill of Materials) functionality is not implemented using standard SAP approaches. The transformation from whole bird to multiple portion types requires special handling.',
            'Joint product costing for disassembly processes uses workarounds rather than standard configurations. This impacts cost allocation accuracy and profitability analysis by portion type.',
            'Catch-weight functionality is not enabled throughout the chain. Variable weights at each processing stage cannot be properly captured for inventory valuation and customer invoicing.'
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
            'Current production mix runs 65-70% whole chickens with 30-35% going to portion cutting. This ratio varies based on customer demand and market conditions but lacks dynamic optimization.',
            'Portion categories include breast (premium), thigh, drumstick, and wings. Each portion has different market values but similar processing costs, creating allocation challenges.',
            'No value-based splitting methodology for joint product costing. All portions receive equal cost allocation regardless of market value, distorting true profitability by product.',
            'Breast meat appears artificially cheap under equal allocation since it receives same cost per kg as lower-value portions. Premium pricing does not reflect actual economics.',
            'Wings show accounting losses despite strong market demand. Equal cost allocation burdens wings with same cost as breast while selling at lower prices, creating false margin picture.'
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
            'Production orders are created retroactively after output quantities are known. This back-flush approach means planning cannot anticipate finished goods availability.',
            'Variable SKU sizes emerge from processing as bird weights differ. A single production run yields different quantities of each weight grade, complicating inventory management.',
            'Exact portion quantities cannot be predicted before processing. Customer orders for specific portions may not match actual yield, requiring substitution or short shipments.',
            'Yield varies significantly based on input bird size and quality. Larger birds yield proportionally more breast meat while smaller birds have higher bone-to-meat ratios.',
            'Manual adjustment of production outputs is required to match actual yield. System records must be corrected after processing completion, introducing timing delays and potential errors.'
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
            'Catch-weight management is not implemented despite product characteristics requiring it. Products vary significantly in weight but system cannot track both piece count and weight simultaneously.',
            'Products are sold by piece but actual weights vary substantially. Customer invoicing by piece ignores weight differences, potentially impacting margin when selling heavier pieces.',
            'Individual piece weights can range from 9g to 18g for the same product type - a 100% variation. Without catch-weight tracking, inventory value calculations use averages that may not reflect reality.',
            'SAP MSG catch-weight functionality remains disabled. This standard meat industry capability would allow dual unit of measure tracking (pieces and kg) essential for proper valuation.',
            'Inventory accuracy issues arise from weight variability. Physical inventory counts by weight may not reconcile with system quantities tracked in pieces, complicating period-end processes.'
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
            'All Day-Old Chicks (DOCs) for breeder operations are imported 100% from Saudi Arabia. This single-country dependency creates significant supply chain risk for the breeding operation.',
            'Single source country creates vulnerability to border closures, disease outbreaks in Saudi Arabia, or diplomatic issues. No contingency sources have been qualified.',
            'Supplier options are severely limited as the main competitor in Ajman will not sell to Emirates National Foods. This competitive dynamic restricts market access for breeding stock.',
            'Only 3 batches per year are imported with approximately 30,600 DOCs per batch. This infrequent cadence requires careful planning and provides limited flexibility for demand changes.',
            'Procurement is not driven by downstream demand forecasting. DOC orders are placed based on capacity rather than anticipated egg requirements from the hatchery operation.'
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
            'Breeder birds undergo a 24-week rearing period from day-old chick to laying maturity. This significant investment period requires careful monitoring of growth, feed consumption, and health.',
            'The rearing operation uses 4 houses within a single farm facility. This concentration creates all-in-all-out management requirements and biosecurity considerations.',
            'Flock composition maintains 10% male birds for breeding purposes. Male-to-female ratio management is critical for optimal fertility and requires ongoing monitoring.',
            'SAP Livestock module is not implemented for flock tracking. Bird counts, mortality, vaccinations, and growth parameters are managed outside the ERP system.',
            'Growth curve monitoring against breed standards is performed manually using spreadsheets. Deviations from expected growth rates may not be detected promptly for corrective action.'
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
            'Laying operations span 2 farms with 4 houses each, totaling 8 laying houses. This facility footprint represents significant fixed asset investment requiring optimization.',
            'Each flock in production contains approximately 26,000 birds. At full capacity with 2 flocks producing, this represents over 50,000 laying birds requiring daily management.',
            'House capacity optimization is not system-supported. Decisions on flock placement, timing of house turnovers, and capacity utilization rely on manual planning.',
            'Flock density management follows manual calculations and visual inspection. Density impacts bird welfare, production performance, and regulatory compliance.',
            'Climate control systems operate independently without integration to production systems. Environmental conditions critical to laying performance are not correlated with production data.'
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
            'Active laying period spans 41 weeks from week 25 to week 65. This extended production cycle requires sustained performance management and health monitoring throughout.',
            'Egg production follows a biological curve that varies significantly by flock age. Peak production occurs around weeks 30-35 before gradually declining toward end of lay.',
            'Production curve tracking is not maintained in SAP. Standard breed curves for comparison and deviation analysis are managed externally, limiting integrated performance analysis.',
            'Peak production management relies on manual observation and experience. Maximizing production during peak weeks through nutrition and environment requires data-driven decisions.',
            'End-of-lay decisions about when to depopulate flocks are made ad-hoc. Economic modeling of continued production vs. new flock placement is not system-supported.'
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
            'Peak daily production reaches approximately 52,000 hatching eggs from 2 flocks operating simultaneously. This volume represents critical supply for downstream hatchery operations.',
            'Daily production varies substantially based on flock age and stage of laying cycle. Understanding production patterns is essential for supply coordination with ENF hatchery.',
            'Daily production quantities are not recorded in SAP. Egg counts are maintained in farm-level records but not integrated into ERP for planning and financial visibility.',
            'Yield analysis comparing actual vs. expected production based on flock size and age is performed manually. Deviations indicating health or management issues may not be promptly identified.',
            'Key flock performance KPIs including hen-day production percentage, egg quality metrics, and feed conversion are tracked externally rather than in integrated business systems.'
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
            'ENF trucks collect hatching eggs from Salwa every 4 days. This collection frequency balances transport efficiency against egg storage duration and hatchability concerns.',
            'Eggs are stored at Salwa farm between collections, requiring proper temperature and humidity control. Extended storage affects hatchability, making collection timing critical.',
            'Collection scheduling is coordinated manually via phone calls. No system-based scheduling optimizes collection timing based on production volumes and hatchery requirements.',
            'ENF hatchery has no real-time visibility into egg availability at Salwa. Planning for setter loading relies on historical patterns rather than actual inventory data.',
            'Delivery documentation uses paper-based delivery notes created manually. No SAP delivery documents provide system traceability for the egg transfer.'
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
            'Physical grading is performed at ENF upon egg collection from Salwa. This downstream grading approach means quality determination happens at destination rather than origin.',
            'Grade A classification requires minimum 50g weight and no defects suitable for hatching. Grade B includes undersized eggs, shell defects, and floor eggs unsuitable for incubation.',
            'Only Grade A eggs proceed to the hatchery for incubation. Grade B eggs are returned to Salwa books for sale as table eggs in external market.',
            'Grading process is entirely manual, relying on visual inspection and hand weighing. Consistency depends on individual grader judgment without standardized measurement.',
            'No automated grading equipment exists to provide consistent, objective classification. Modern egg graders could improve accuracy and reduce labor costs.'
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
            'Undersized eggs occur primarily at start of each laying cycle when pullets begin production. These early eggs do not meet minimum weight requirements for successful hatching.',
            'Defect categories include double yolk (oversize), shell abnormalities (thin, rough, or cracked), and floor eggs (laid outside nest boxes with contamination risk).',
            'B-grade volumes concentrate in the first 1-2 weeks of each laying cycle as birds establish regular production. This predictable pattern creates temporary quality dips.',
            'With 3 batches per year starting new flocks, B-grade spikes occur 3 times annually. These occurrences are predictable but not formally planned in production forecasting.',
            'Root cause analysis for B-grade eggs is not systematically tracked. Defect codes and trend analysis that could identify correctable issues are not maintained in any system.'
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
            'All grading occurs at ENF hatchery upon receipt rather than at Salwa origin. This approach means Salwa has no quality feedback until after transport completion.',
            'Salwa ships all eggs without pre-grading, mixing Grade A and Grade B in the same transport. No segregation at source maximizes transport volume but includes non-hatchable eggs.',
            'ENF hatchery makes all Grade A vs. Grade B classification decisions. Salwa relies entirely on ENF quality assessment with limited ability to dispute classifications.',
            'Quality determination at destination creates a disconnect between production and quality feedback. Farm managers cannot make real-time adjustments based on quality trends.',
            'Transporting B-grade eggs that will not be used for hatching is inherently inefficient. Fuel, labor, and vehicle capacity are consumed for eggs that return to Salwa.'
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
            'B-grade eggs are returned to Salwa\'s inventory and financial books after ENF grading. This reverse transfer requires accounting entries and physical handling back to origin.',
            'Table egg sales to external customers represent a secondary revenue stream. These sales require different customer relationships, pricing, and distribution from the core intercompany business.',
            'The B-grade sales process operates separately from the intercompany egg transfer to ENF. Different pricing structures, customers, and terms apply to external sales.',
            'Volume of B-grade sales is relatively small and managed manually. The limited scale does not justify dedicated sales infrastructure or system automation.',
            'No integrated by-product tracking connects B-grade occurrences to sales outcomes. Profitability of B-grade recovery cannot be analyzed against the cost of producing those eggs.'
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
            'Day-Old Chick imports from Saudi Arabia require careful coordination for live animal transport. Temperature control, transit time, and border clearance are critical to chick survival.',
            'Delivery to the Liwa location involves cross-border logistics with specialized transport vehicles. The remote location adds complexity to supplier coordination.',
            'No inbound logistics management system tracks shipment status, expected arrival times, or transport conditions. Visibility into in-transit shipments is limited to phone calls.',
            'Supplier delivers to the farm door with no SAP tracking of the receipt process. Goods receipt is recorded manually after physical verification of chick counts and condition.',
            'Import documentation including health certificates, customs declarations, and veterinary approvals is managed through manual paper-based processes outside SAP.'
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
            'Feed is supplied by Greenfields (GF) through ENF\'s coordination. This multi-company supply chain requires intercompany agreements and pricing arrangements.',
            'Government subsidized feed through ADS (Abu Dhabi Subsidy) program provides significant cost reduction. Proper utilization of subsidy quota is critical to farm profitability.',
            'Approximately 90% of feed requirements should qualify for government subsidy. Ensuring maximum utilization of available quota directly impacts operating costs.',
            'Quota tracking and compliance reporting is managed manually through the government portal. No automated alerts warn of approaching limits or expiring entitlements.',
            'SAP has no integration with subsidy management. Subsidy utilization cannot be correlated with actual feed consumption or financial benefits captured in the ERP.'
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
            'Feed arrives via bulk tanker delivery directly into farm silos. This delivery method optimizes transport costs but creates inventory measurement challenges.',
            'The same control issues observed at ENF broiler farms exist at Salwa breeding operations. Bulk delivery without silo sensors leaves feed quantities unverified.',
            'No measurement systems exist at silo level to verify delivered quantities. Farms rely on delivery tickets from the supplier without independent confirmation.',
            'Daily feed consumption is estimated based on bird counts and standard feeding rates rather than measured from silo levels. Actual usage cannot be verified.',
            'Without beginning and ending inventory measurements, delivered quantities cannot be reconciled against consumption. Feed losses or delivery shortages go undetected.'
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
            'Vaccine and medication management is handled directly by the farm manager and veterinarian. No system oversight ensures protocol compliance or tracks administration.',
            'Vaccination schedules are determined by bird age following breed-specific protocols. Multiple vaccinations at different ages require careful timing and documentation.',
            'Cold chain requirements for vaccine storage are managed manually. Temperature monitoring of vaccine refrigerators and handling protocols are not system-enforced.',
            'Withdrawal periods after medication administration are tracked manually. No system alerts prevent premature processing of birds that have received treatments.',
            'Batch traceability for vaccines and medications is limited. Connecting specific vaccine lots to administered flocks for recall purposes requires manual record searches.'
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
            'Breeder birds are valued using a capitalization model that accumulates costs during rearing. All costs flow into inventory value without daily fair value adjustments.',
            'No daily valuation of the growing flock occurs during the 24-week rearing period. Bird value remains static at cost accumulation rather than reflecting biological growth.',
            'The static inventory approach treats birds as conventional inventory rather than biological assets. This simplification may not comply with IAS 41 requirements.',
            'Valuation updates occur only at production order completion when birds transfer from rearing to laying. Interim financial reporting relies on accumulated costs.',
            'IAS 41 Agricultural standard requires fair value measurement of biological assets. Daily fair value adjustments based on growth and market conditions are not performed.'
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
            'Cost capitalization runs throughout the 24-week rearing period. All costs incurred during this phase accumulate into the bird inventory value rather than expensing.',
            'Capitalized costs include DOC purchase price, feed consumption, vaccination and medication, and allocated overhead costs. This builds substantial work-in-progress inventory.',
            'Asset value crystallizes at week 24 when birds transfer to laying status. The accumulated cost becomes the basis for subsequent depreciation/amortization.',
            'Calculation of accumulated costs and posting of capitalization entries is performed manually via spreadsheets. No automated accumulation exists in SAP.',
            'The approach attempts IAS 41 compliance but uses cost accumulation rather than fair value. True IAS 41 treatment would require fair value adjustments.'
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
            'Amortization of capitalized bird value occurs over the 41-week laying period from week 25 to week 65. This spreads the rearing investment against egg production.',
            'All amortization calculations are performed in Excel spreadsheets outside of SAP. Depreciation schedules are maintained manually for each flock.',
            'Posting to SAP occurs through manual journal vouchers at period end. No automated depreciation run calculates and posts amortization expense.',
            'Depreciation spread methodology uses straight-line approach over the laying period. Production-based amortization matching expense to output is not implemented.',
            'SAP Asset Accounting or biological asset functionality is not utilized for breeder bird amortization. This manual approach increases period-end workload and error risk.'
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
            'Two production order structure manages the breeder lifecycle: one for rearing phase and one for laying phase. Each captures costs during its respective period.',
            'The rearing production order transforms DOC input into laying-ready birds at week 24. All rearing costs flow through this order for capitalization.',
            'The laying production order runs during the 41-week production period. Ongoing feed, vaccination, and overhead costs during laying are captured here.',
            'Costs accumulate on production orders but settlement processes move costs to appropriate accounts. Manual intervention is required for proper cost flow.',
            'No variance analysis compares actual costs against standard costs. Without standards, performance measurement against benchmarks is not possible.'
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
            'Period costing approach treats all costs in a period as cost of goods sold. No actual production costing calculates cost per egg based on inputs and yields.',
            'Production is assumed equal to sales - whatever is produced is considered sold. No inventory buildup or work-in-progress tracking exists for eggs.',
            'Feed and vaccination costs during laying are allocated entirely to egg production. No allocation methodology distinguishes costs between egg grades or production periods.',
            'Cost per egg is not calculated or visible. Management cannot assess whether egg production is profitable or compare costs to market prices.',
            'True production cost including bird amortization, feed, medication, labor, and overhead is not calculated on a per-unit basis. Profitability analysis is limited.'
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
            'A fixed transfer price governs all egg sales from Salwa to ENF. This intercompany price determines profit allocation between the breeding and hatching operations.',
            'ENF bears all transport costs by collecting eggs using their trucks. Salwa\'s transfer price is effectively ex-works with no logistics component.',
            'Transfer prices are not regularly reviewed against market conditions or cost changes. The fixed price may not reflect current economics of egg production.',
            'Arm\'s length documentation for transfer pricing compliance is limited. Supporting documentation for tax authority review may be insufficient.',
            'Intercompany reconciliation between Salwa sales and ENF purchases is performed manually. Matching of intercompany transactions requires period-end effort.'
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
            'Salwa operates with a single customer: Emirates National Foods (ENF). This 100% intercompany model simplifies sales operations but creates complete revenue dependency.',
            'All Grade A hatching eggs (100%) are transferred to ENF for incubation. Salwa has no alternative customers for its primary product.',
            'B-grade eggs unsuitable for hatching are sold externally as table eggs. This represents the only external customer relationship for the breeding operation.',
            'No external hatching egg sales to other hatcheries occur. Even if market opportunities existed, production is committed entirely to internal ENF requirements.',
            'Complete dependency on ENF means any change in ENF requirements directly impacts Salwa operations. No diversification buffer exists against demand fluctuations.'
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
            'No formal sales orders exist in SAP for egg transfers to ENF. The intercompany transaction operates without standard order-to-cash documentation.',
            'Supply follows a production-driven model rather than demand-driven. Whatever Salwa produces is taken by ENF regardless of actual hatchery requirements.',
            'ENF collection every 4 days is based on production accumulation rather than order requirements. No order communication defines expected quantities or timing.',
            'Delivery documentation consists only of manual delivery notes created at the time of collection. No SAP sales order or delivery note drives the process.',
            'Without system-based order management, there is no visibility into planned vs. actual deliveries, no acknowledgment workflow, and no exception management.'
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
            'ENF trucks travel to Salwa to collect eggs rather than Salwa delivering to ENF. This ex-works arrangement shifts transport responsibility to the buyer.',
            'All transport costs including vehicle, fuel, and driver are borne by ENF. Salwa\'s transfer price does not include any logistics component.',
            'No formal Incoterms designation documents the delivery arrangement. Terms like EXW (Ex Works) or FCA should be specified in intercompany agreements.',
            'Quality handover at collection point is not formalized. Responsibility for egg condition during transport and acceptable rejection criteria are not documented.',
            'Delivery confirmation relies on manual paperwork signed at collection. No electronic proof of delivery or system update confirms successful transfer.'
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
            'All delivery notes for egg transfers are created manually using paper forms. No system-generated documentation provides controlled document numbering or format.',
            'Delivery documentation does not originate from SAP. Manual notes are created outside the system and may not match SAP transaction records.',
            'No system traceability connects physical egg shipments to SAP inventory movements. Tracking specific batches from production to hatchery requires manual record searches.',
            'Audit trail gaps exist where paper documentation may be incomplete, illegible, or lost. Meeting audit requirements for intercompany transactions may be challenging.',
            'Month-end reconciliation between Salwa delivery records and ENF receipt records is performed manually. Discrepancies require investigation through paper files.'
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
            'Invoicing occurs only after ENF completes grading and determines Grade A quantities. This delay means Salwa cannot invoice at time of delivery.',
            'Only Grade A eggs are invoiced to ENF at the agreed transfer price. Invoice quantities depend on ENF\'s grading results rather than Salwa\'s shipped quantities.',
            'B-grade eggs are returned to Salwa\'s inventory books for separate sale. This requires credit notes or adjustments to reconcile the original delivery.',
            'Invoice creation is a manual process performed outside standard SAP billing workflows. Invoice numbers, pricing, and quantities are entered manually.',
            'Intercompany matching of Salwa invoices to ENF payables is performed manually each period. Automated intercompany elimination processes are not utilized.'
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
            'B-grade eggs rejected for hatching are sold as table eggs in the external retail market. This represents Salwa\'s only direct customer sales activity.',
            'The external sales process operates completely separately from intercompany egg transfers. Different customers, pricing, and terms apply to table egg sales.',
            'Volume of B-grade sales is relatively small and managed entirely within Salwa\'s books. The limited scale does not justify dedicated sales infrastructure.',
            'No integrated tracking connects B-grade occurrences at ENF grading to subsequent sale as table eggs. Traceability from production through final sale is fragmented.',
            'Customer management and pricing for external table egg sales is basic. No formal price lists, customer hierarchy, or credit management processes are established.'
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
            <div class="panel-card-body">
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

                <div class="panel-stacked-sections">
                    <div class="panel-section-box observations-box">
                        <div class="panel-section-header">
                            <i class="fas fa-building"></i>
                            <span>GENERAL OBSERVATIONS</span>
                        </div>
                        <div class="panel-section-content current-state">
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

                    <div class="panel-section-box bestpractice-box">
                        <div class="panel-section-header">
                            <i class="fas fa-lightbulb"></i>
                            <span>INDUSTRY BEST PRACTICE (FOR REFERENCE)</span>
                        </div>
                        <div class="panel-section-content best-practice">
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

/* ============================================
   GIT & GITHUB CHEAT SHEET — INTERACTIVITY
   Vanilla JS, no dependencies
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollProgress();
    initBackToTop();
    initCopyButtons();
    initCommandCopy();
    initSectionObserver();
    initSmoothScroll();
    initTabs();
    initSearch();
    initHeaderScroll();
});

/* ---- Navigation Active State ---- */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navItems.forEach(item => {
                    item.classList.toggle('active', item.dataset.section === id);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
}

/* ---- Reading Progress Bar ---- */
function initScrollProgress() {
    const progressBar = document.getElementById('readingProgress');
    if (!progressBar) return;

    let ticking = false;

    function updateProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });

    updateProgress();
}

/* ---- Back to Top Button ---- */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    let ticking = false;

    function toggleVisibility() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        btn.classList.toggle('visible', scrollTop > 600);
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(toggleVisibility);
            ticking = true;
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ---- Copy Buttons for Aliases ---- */
function initCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const cmd = btn.dataset.cmd;

            if (!cmd) return;

            try {
                await navigator.clipboard.writeText(cmd);
                showToast('Alias copiado al portapapeles');

                // Visual feedback
                btn.classList.add('copied');
                const originalHTML = btn.innerHTML;
                btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

                setTimeout(() => {
                    btn.classList.remove('copied');
                    btn.innerHTML = originalHTML;
                }, 2000);

            } catch (err) {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = cmd;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();

                try {
                    document.execCommand('copy');
                    showToast('Alias copiado al portapapeles');

                    btn.classList.add('copied');
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;

                    setTimeout(() => {
                        btn.classList.remove('copied');
                        btn.innerHTML = originalHTML;
                    }, 2000);

                } catch (fallbackErr) {
                    showToast('No se pudo copiar', true);
                }

                document.body.removeChild(textarea);
            }
        });
    });
}

/* ---- Command Copy on Click ---- */
function initCommandCopy() {
    const commands = document.querySelectorAll('.command');

    commands.forEach(cmd => {
        cmd.addEventListener('click', async () => {
            const text = cmd.textContent.trim();

            try {
                await navigator.clipboard.writeText(text);
                showToast('Comando copiado: ' + text.split(' ').slice(0, 3).join(' ') + (text.split(' ').length > 3 ? '...' : ''));
            } catch (err) {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();

                try {
                    document.execCommand('copy');
                    showToast('Comando copiado');
                } catch (fallbackErr) {
                    showToast('No se pudo copiar', true);
                }

                document.body.removeChild(textarea);
            }
        });

        // Add cursor pointer and title for UX
        cmd.style.cursor = 'pointer';
        cmd.title = 'Click para copiar';
    });
}

/* ---- Toast Notification ---- */
let toastTimeout;
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;

    if (isError) {
        toast.style.borderColor = 'rgba(239, 68, 68, 0.3)';
        toast.querySelector('svg').style.color = '#ef4444';
    } else {
        toast.style.borderColor = 'rgba(99, 102, 241, 0.15)';
        toast.querySelector('svg').style.color = '#10b981';
    }

    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

/* ---- Section Reveal on Scroll ---- */
function initSectionObserver() {
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.animationPlayState = 'paused';
        observer.observe(section);
    });
}

/* ---- Smooth Scroll for Anchor Links ---- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offset = 100; // Account for sticky nav
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

/* ---- Keyboard Shortcuts ---- */
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close toast
    if (e.key === 'Escape') {
        const toast = document.getElementById('toast');
        if (toast) toast.classList.remove('show');
    }

    // Press 'Home' to go to top
    if (e.key === 'Home' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Press Cmd/Ctrl + K to focus search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.focus();
    }
});

/* ---- Header Scroll Effect ---- */
let ticking = false;
let lastScrollY = 0;
let headerState = 'normal'; // 'normal' or 'scrolled'

function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    function updateHeader() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        
        // Only update if scroll position changed significantly
        if (Math.abs(scrollY - lastScrollY) < 5) {
            ticking = false;
            return;
        }
        
        // Update header state
        if (scrollY > 50 && headerState === 'normal') {
            header.classList.add('scrolled');
            headerState = 'scrolled';
        } else if (scrollY <= 50 && headerState === 'scrolled') {
            header.classList.remove('scrolled');
            headerState = 'normal';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    updateHeader();
}

/* ---- Tabs Functionality ---- */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;

            // Update active tab
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide sections
            sections.forEach(section => {
                if (tab === 'all') {
                    section.style.display = '';
                    section.style.opacity = '1';
                } else {
                    const category = section.dataset.category;
                    if (category === tab) {
                        section.style.display = '';
                        section.style.opacity = '1';
                    } else {
                        section.style.display = 'none';
                    }
                }
            });
        });
    });
}

/* ---- Search Functionality ---- */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    let searchTimeout;

    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = searchInput.value.toLowerCase().trim();
            let firstMatchElement = null;

            // Reset to show all if search is empty
            if (!query) {
                document.querySelectorAll('.section').forEach(section => {
                    section.style.display = '';
                    section.style.opacity = '1';
                    section.querySelectorAll('tr, .tip-card, .workflow-card, .alias-card, .stash-quick-item').forEach(el => {
                        el.style.display = '';
                    });
                });
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.tab === 'all');
                });
                return;
            }

            // Activate "Todo" tab
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.tab === 'all');
            });

            // Search through all sections
            document.querySelectorAll('.section').forEach(section => {
                let sectionHasMatch = false;

                // Check all searchable elements in this section
                const searchableElements = section.querySelectorAll('tr, .tip-card, .workflow-card, .alias-card, .stash-quick-item');
                
                searchableElements.forEach(el => {
                    const text = el.textContent.toLowerCase();
                    if (text.includes(query)) {
                        el.style.display = '';
                        sectionHasMatch = true;
                        // Capture first visible match
                        if (!firstMatchElement && el.offsetParent !== null) {
                            firstMatchElement = el;
                        }
                    } else {
                        el.style.display = 'none';
                    }
                });

                // Show/hide section based on whether it has any matches
                if (sectionHasMatch) {
                    section.style.display = '';
                    section.style.opacity = '1';
                } else {
                    section.style.display = 'none';
                }
            });

            // Scroll to first match
            if (firstMatchElement) {
                setTimeout(() => {
                    firstMatchElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 150);
            }
        }, 150);
    });
}

/* ---- Prefers Reduced Motion ---- */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';

    const animatedElements = document.querySelectorAll('.header-icon');
    animatedElements.forEach(el => {
        el.style.animation = 'none';
    });
}
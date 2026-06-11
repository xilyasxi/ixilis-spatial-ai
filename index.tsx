// IXILIS Interactivity Implementation for tsx fallback

(function() {
function safeInit(name: string, fn: () => void) {
    try {
        fn();
    } catch (e) {
        console.error(`[IXILIS] Error during ${name} initialization:`, e);
    }
}

function initApp() {
    safeInit('Common Features', initCommonFeatures);
    safeInit('Mobile Menu', initMobileMenu);
    safeInit('Smooth Scroll', initSmoothScroll);
    safeInit('FAQ', initFAQ);
    safeInit('Project Overlay', initProjectOverlay);
    safeInit('Case Study Page', initCaseStudyPage);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initCommonFeatures() {
    safeInit('Custom Cursor', initCustomCursor);
    safeInit('Dynamic Time', initDynamicTime);
    safeInit('Dithering Shader', initDitheringShader);
    safeInit('Scroll Reveal', initScrollReveal);
}

function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            el.classList.add('in-view');
        });
        return;
    }

    const options = {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.02
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, options);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

function initMobileMenu() {
    const toggle = document.querySelector('.mobile-toggle');
    const menuContainer = document.querySelector('.mobile-menu');
    const menuLinks = document.querySelectorAll('.mobile-nav-links a');
    
    const closeMenu = () => {
        document.body.classList.remove('menu-open');
        toggle?.setAttribute('aria-expanded', 'false');
        menuContainer?.setAttribute('aria-hidden', 'true');
    };

    const toggleMenu = () => {
        const isOpen = document.body.classList.toggle('menu-open');
        toggle?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menuContainer?.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    };

    toggle?.addEventListener('click', toggleMenu);

    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

const caseData: Record<string, any> = {
    'chronos': {
        title: 'CHRONOS',
        year: '2024 / ALGORITHMIC TRADING',
        client: 'Quant-Hedge Ltd',
        sector: 'Finance',
        images: {
            hero: 'assets/chronos-hero.jpg',
            img1: 'assets/chronos-detail-1.jpg',
            img2: 'assets/chronos-detail-2.jpg',
            img3: 'assets/chronos-detail-3.jpg'
        },
        desc: `
            <p>The objective was to reduce cognitive load in high-frequency trading environments via temporal data visualization.</p>
        `
    },
    'nebula': {
        title: 'NEBULA',
        year: '2023 / NEURAL INTERFACE',
        client: 'DeepMind Research',
        sector: 'AI / ML',
        images: {
            hero: 'assets/nebula-hero.jpg',
            img1: 'assets/nebula-detail-1.jpg',
            img2: 'assets/nebula-detail-2.jpg',
            img3: 'assets/nebula-detail-3.jpg'
        },
        desc: `
            <p>Modern neural networks are often black boxes.</p>
        `
    },
    'aether': {
        title: 'AETHER',
        year: '2025 / QUANTUM SECURITY',
        client: 'Sovereign Bank',
        sector: 'Cryptography',
        images: {
            hero: 'assets/aether-hero.jpg',
            img1: 'assets/aether-detail-1.jpg',
            img2: 'assets/aether-detail-2.jpg',
            img3: 'assets/aether-detail-3.jpg'
        },
        desc: `
            <p>Aether abstracts complex cryptographic key management.</p>
        `
    }
};

function initProjectOverlay() {
    const overlay = document.getElementById('project-overlay');
    const closeBtn = document.querySelector('.overlay-close-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (!overlay || !closeBtn) return;

    const setImage = (id: string, src: string) => {
        const img = document.getElementById(id) as HTMLImageElement | null;
        if (img) {
            img.src = src;
            img.onerror = () => { img.style.display = 'none'; };
            img.onload = () => { img.style.display = 'block'; };
        }
    };

    const openOverlay = (id: string) => {
        const data = caseData[id];
        if (!data) return;

        const titleEl = document.getElementById('overlay-title');
        const yearEl = document.getElementById('overlay-year');
        const clientEl = document.getElementById('overlay-client');
        const sectorEl = document.getElementById('overlay-sector');
        const descEl = document.getElementById('overlay-desc');

        if (titleEl) titleEl.innerHTML = data.title;
        if (yearEl) yearEl.innerHTML = data.year;
        if (clientEl) clientEl.innerHTML = data.client;
        if (sectorEl) sectorEl.innerHTML = data.sector;
        if (descEl) descEl.innerHTML = data.desc;

        const standaloneLink = document.getElementById('overlay-standalone-link') as HTMLAnchorElement | null;
        if (standaloneLink) {
            standaloneLink.href = `case-study.html?id=${id}`;
        }

        setImage('overlay-hero-img', data.images.hero);
        setImage('overlay-img-1', data.images.img1);
        setImage('overlay-img-2', data.images.img2);
        setImage('overlay-img-3', data.images.img3);

        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overlay-open');
        overlay.scrollTop = 0;
    };

    const closeOverlay = () => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overlay-open');
    };

    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            if (id) openOverlay(id);
        });
    });

    closeBtn.addEventListener('click', closeOverlay);
}

function initCaseStudyPage() {
    const caseTitle = document.getElementById('case-title');
    const caseDesc = document.getElementById('case-desc');
    if (!caseTitle || !caseDesc) return;

    const params = new URLSearchParams(window.location.search);
    let id = params.get('id') || 'chronos';

    if (!caseData[id]) { id = 'chronos'; }
    const data = caseData[id];

    const caseYearEl = document.getElementById('case-year');
    const caseClientEl = document.getElementById('case-client');
    const caseSectorEl = document.getElementById('case-sector');

    if (caseYearEl) caseYearEl.innerHTML = data.year;
    caseTitle.innerHTML = data.title;
    if (caseClientEl) caseClientEl.innerHTML = data.client;
    if (caseSectorEl) caseSectorEl.innerHTML = data.sector;
    caseDesc.innerHTML = data.desc;
}

function initDitheringShader() {
    const canvas = document.getElementById('shader-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) return;
}

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor') as HTMLElement | null;
    if (!cursor) return;

    if (window.matchMedia('(hover: none)').matches) {
        cursor.classList.add('hidden');
        cursor.style.display = 'none';
        return;
    }

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    let isInside = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isInside) {
            isInside = true;
            cursor.classList.remove('hidden');
        }
    }, { passive: true });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(this: HTMLAnchorElement, e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                document.body.classList.remove('menu-open');
                window.scrollTo({ 
                    top: target.getBoundingClientRect().top + window.pageYOffset - 72, 
                    behavior: 'smooth' 
                });
            }
        });
    });
}

function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn = item.querySelector('.faq-btn');
        btn?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

function initDynamicTime() {
    const timeElement = document.getElementById('current-time');
    if (!timeElement) return;
    const update = () => {
        timeElement.textContent = new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
        }).format(new Date()) + ' JST';
    };
    setInterval(update, 1000);
    update();
}
})();

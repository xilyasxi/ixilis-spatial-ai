// IXILIS Interactivity Implementation

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

/**
 * Scroll Highlight Logic
 */
function initScrollReveal() {
    if (!('IntersectionObserver' in window)) {
        // Fallback for environments lacking IntersectionObserver
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            el.classList.add('in-view');
        });
        return;
    }

    const options = {
        rootMargin: '0px 0px -10% 0px', // Trigger content reveal as soon as it nears the viewport
        threshold: 0.02
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                // Keep class applied once visible so user can read naturally while scrolling back up
                // entry.target.classList.remove('in-view');
            }
        });
    }, options);

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

/**
 * Mobile Navigation Logic
 */
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

/**
 * Project Overlay Logic
 */
// DATA CONFIGURATION FOR CASES
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
            <p>The objective was to reduce cognitive load in high-frequency trading environments via temporal data visualization. Traders operate in microseconds; the interface must reflect this velocity without inducing fatigue.</p>
            <p>We developed a WebGL-accelerated time-series rendering engine with predictive interaction models. This allowed for real-time data ingestion and visualization without frame drops, maintaining a silky 120fps on workstation hardware.</p>
            <p>The outcome was a measured 300ms reduction in decision latency per trade execution, resulting in significant aggregate efficiency gains over fiscal quarters.</p>
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
            <p>Modern neural networks are often black boxes. Nebula was conceived to visualize hidden layer activations in real-time for autonomous agents, providing interpretability to the uninterpretable.</p>
            <p>The system utilizes a node-based mapping interface with dynamic force-directed graphs. It clusters activation patterns spatially, allowing researchers to spot anomalies and biases visually.</p>
            <p>This tool has become standard in the debugging pipeline for large language models within the partner organization.</p>
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
            <p>Aether abstracts complex cryptographic key management for institutional clients. The challenge was to make quantum-resistant security protocols accessible to non-technical executives.</p>
            <p>We designed a zero-friction onboarding flow with biometric hardware integration. The interface eschews traditional "security" tropes for a calm, ethereal aesthetic that builds trust through stability.</p>
            <p>Pilot programs showed a 94% adoption rate, proving that high security does not require high friction.</p>
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
            
            // Handle error: Hide image so the text placeholder shows
            img.onerror = () => { 
                img.style.display = 'none'; 
                console.warn(`[IXILIS] Missing Asset: ${src}. Please create this file in the 'assets' folder.`);
            };
            
            // Handle load: Show image
            img.onload = () => { 
                img.style.display = 'block'; 
            };
        }
    };

    const openOverlay = (id: string) => {
        const data = caseData[id];
        if (!data) return;

        // Populate Text Data
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

        // Set Standalone Link
        const standaloneLink = document.getElementById('overlay-standalone-link') as HTMLAnchorElement | null;
        if (standaloneLink) {
            standaloneLink.href = `case-study.html?id=${id}`;
        }

        // Populate Images
        setImage('overlay-hero-img', data.images.hero);
        setImage('overlay-img-1', data.images.img1);
        setImage('overlay-img-2', data.images.img2);
        setImage('overlay-img-3', data.images.img3);

        // Show Overlay
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overlay-open');

        // Reset scroll position of overlay
        overlay.scrollTop = 0;
    };

    const closeOverlay = () => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overlay-open');
        
        // Clear images on close to prevent flashing old images on next open
        ['overlay-hero-img', 'overlay-img-1', 'overlay-img-2', 'overlay-img-3'].forEach(id => {
            const img = document.getElementById(id) as HTMLImageElement | null;
            if (img) { 
                img.src = ''; 
                img.style.display = 'none'; 
            }
        });
    };

    projectItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-id');
            if (id) openOverlay(id);
        });
    });

    closeBtn.addEventListener('click', closeOverlay);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeOverlay();
        }
    });
}

/**
 * Standalone Case Study Page Populator
 */
function initCaseStudyPage() {
    const caseTitle = document.getElementById('case-title');
    const caseDesc = document.getElementById('case-desc');
    if (!caseTitle || !caseDesc) return; // If we are not on the case study page, exit

    // Resolve project ID from query parameter: case-study.html?id=nebula or case-study.html?id=aether
    const params = new URLSearchParams(window.location.search);
    let id = params.get('id') || 'chronos';

    // Fallback if the ID doesn't exist in caseData
    if (!caseData[id]) {
        id = 'chronos';
    }

    const data = caseData[id];

    // Populate metadata
    const caseYearEl = document.getElementById('case-year');
    const caseClientEl = document.getElementById('case-client');
    const caseSectorEl = document.getElementById('case-sector');

    if (caseYearEl) caseYearEl.innerHTML = data.year;
    caseTitle.innerHTML = data.title;
    if (caseClientEl) caseClientEl.innerHTML = data.client;
    if (caseSectorEl) caseSectorEl.innerHTML = data.sector;
    caseDesc.innerHTML = data.desc;

    // Populate images helper
    const setImage = (idStr: string, src: string) => {
        const img = document.getElementById(idStr) as HTMLImageElement | null;
        if (img) {
            img.src = src;
            img.onerror = () => {
                img.style.display = 'none';
                console.warn(`[IXILIS] Missing Case Study Asset: ${src}`);
            };
            img.onload = () => {
                img.style.display = 'block';
            };
        }
    };

    setImage('case-hero-img', data.images.hero);
    setImage('case-img-1', data.images.img1);
    setImage('case-img-2', data.images.img2);
    setImage('case-img-3', data.images.img3);
}

/**
 * High-Performance WebGL2 Dithering Shader Manager
 */
function initDitheringShader() {
    const canvas = document.getElementById('shader-canvas') as HTMLCanvasElement | null;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) {
        console.warn('[IXILIS] WebGL2 not supported or disabled. Falling back gracefully.');
        return;
    }

    const vertexShaderSource = `#version 300 es
    precision mediump float;
    in vec4 a_position;
    void main() { gl_Position = a_position; }`;

    const fragmentShaderSource = `#version 300 es
    precision mediump float;

    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec4 u_colorBack;
    uniform vec4 u_colorFront;
    uniform float u_pxSize;

    out vec4 fragColor;

    vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m * m * m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    float getBayerValue(vec2 uv) {
        ivec2 pos = ivec2(mod(uv, 8.0));
        int index = pos.y * 8 + pos.x;
        
        float bayer[64];
        bayer[0] = 0.0;  bayer[1] = 32.0; bayer[2] = 8.0;  bayer[3] = 40.0; bayer[4] = 2.0;  bayer[5] = 34.0; bayer[6] = 10.0; bayer[7] = 42.0;
        bayer[8] = 48.0; bayer[9] = 16.0; bayer[10] = 56.0; bayer[11] = 24.0; bayer[12] = 50.0; bayer[13] = 18.0; bayer[14] = 58.0; bayer[15] = 26.0;
        bayer[16] = 12.0; bayer[17] = 44.0; bayer[18] = 4.0;  bayer[19] = 36.0; bayer[20] = 14.0; bayer[21] = 46.0; bayer[22] = 6.0;  bayer[23] = 38.0;
        bayer[24] = 60.0; bayer[25] = 28.0; bayer[26] = 52.0; bayer[27] = 20.0; bayer[28] = 62.0; bayer[29] = 30.0; bayer[30] = 54.0; bayer[31] = 22.0;
        bayer[32] = 3.0;  bayer[33] = 35.0; bayer[34] = 11.0; bayer[35] = 43.0; bayer[36] = 1.0;  bayer[37] = 33.0; bayer[38] = 9.0;  bayer[39] = 41.0;
        bayer[40] = 51.0; bayer[41] = 19.0; bayer[42] = 59.0; bayer[43] = 27.0; bayer[44] = 49.0; bayer[45] = 17.0; bayer[46] = 57.0; bayer[47] = 25.0;
        bayer[48] = 15.0; bayer[49] = 47.0; bayer[50] = 7.0;  bayer[51] = 39.0; bayer[52] = 13.0; bayer[53] = 45.0; bayer[54] = 5.0;  bayer[55] = 37.0;
        bayer[56] = 63.0; bayer[57] = 31.0; bayer[58] = 55.0; bayer[59] = 23.0; bayer[60] = 61.0; bayer[61] = 29.0; bayer[62] = 53.0; bayer[63] = 21.0;
        
        if (index < 0) index = 0;
        if (index > 63) index = 63;
        
        return bayer[index] / 64.0;
    }

    void main() {
        float t = u_time * 0.3;
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv -= 0.5;
        uv.x *= u_resolution.x / u_resolution.y;

        float angle = atan(uv.y, uv.x);
        float radius = length(uv);
        
        float symBase = abs(sin(angle * 4.0 + t * 0.15));
        float symSecondary = abs(sin(angle * 8.0 - t * 0.3));
        
        float n1 = snoise(uv * 1.2 + vec2(t * 0.1, t * 0.05));
        float n2 = snoise(uv * 2.5 - vec2(t * 0.05, t * 0.12));
        float combinedNoise = (n1 * 0.6 + n2 * 0.4);
        
        float corePulse = smoothstep(0.45, 0.0, radius) * (0.8 + 0.2 * sin(t));
        float ringA = smoothstep(0.2, 0.25, radius) * smoothstep(0.4, 0.35, radius) * symBase;
        float ringB = smoothstep(0.5, 0.55, radius) * smoothstep(0.7, 0.65, radius) * symSecondary;
        
        float shape = corePulse + ringA * 0.7 + ringB * 0.4 + combinedNoise * 0.12;
        shape = clamp(shape, 0.0, 1.0);

        float ditherThreshold = getBayerValue(gl_FragCoord.xy / u_pxSize);
        float val = shape + (ditherThreshold - 0.5);
        float res = step(0.5, val);

        vec3 fg = u_colorFront.rgb * u_colorFront.a;
        vec3 bg = u_colorBack.rgb;
        
        fragColor = vec4(mix(bg, fg, res), 1.0);
    }`;

    function createShader(glCtx: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
        const shader = glCtx.createShader(type);
        if (!shader) return null;
        glCtx.shaderSource(shader, source);
        glCtx.compileShader(shader);
        if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
            console.warn('[IXILIS] WebGL shader compilation error:', glCtx.getShaderInfoLog(shader));
            glCtx.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const program = gl.createProgram();
    if (!program) return;

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vs || !fs) {
        console.warn('[IXILIS] Could not compile WebGL shaders. Background animation fell back gracefully.');
        return;
    }

    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn('[IXILIS] WebGL program link error:', gl.getProgramInfoLog(program));
        return;
    }

    const locations = {
        u_time: gl.getUniformLocation(program, 'u_time'),
        u_resolution: gl.getUniformLocation(program, 'u_resolution'),
        u_colorBack: gl.getUniformLocation(program, 'u_colorBack'),
        u_colorFront: gl.getUniformLocation(program, 'u_colorFront'),
        u_pxSize: gl.getUniformLocation(program, 'u_pxSize'),
        a_position: gl.getAttribLocation(program, 'a_position'),
    };

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) return;
    
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    
    if (locations.a_position !== -1) {
        gl.enableVertexAttribArray(locations.a_position);
        gl.vertexAttribPointer(locations.a_position, 2, gl.FLOAT, false, 0, 0);
    }

    function resize() {
        if (!gl || !canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const startTime = Date.now();
    let animFrameId: number;

    function render() {
        if (!gl || !canvas) return;
        const time = (Date.now() - startTime) * 0.001;
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.uniform1f(locations.u_time, time);
        gl.uniform2f(locations.u_resolution, canvas.width, canvas.height);
        gl.uniform4f(locations.u_colorBack, 0.0, 0.0, 0.0, 1.0);
        gl.uniform4f(locations.u_colorFront, 1.0, 1.0, 1.0, 0.6);
        gl.uniform1f(locations.u_pxSize, 3.5);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animFrameId = requestAnimationFrame(render);
    }
    render();
}

/**
 * Custom Cursor Logic
 */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor') as HTMLElement | null;
    if (!cursor) return;

    // Completely disable pointer tracking on non-pointer (touch) devices
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

    document.addEventListener('mouseleave', () => {
        isInside = false;
        cursor.classList.add('hidden');
    });

    const tick = () => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
        requestAnimationFrame(tick);
    };
    tick();

    // Responsive event-delegated cursor toggling
    document.addEventListener('mouseover', (e) => {
        const target = e.target as HTMLElement | null;
        if (!target) return;
        
        const isHoverable = target.closest('a, button, input, textarea, .pill-btn, .faq-btn, .tier-row, .project-item, .overlay-close-btn');
        if (isHoverable) {
            cursor.classList.add('hidden');
        } else {
            if (isInside) cursor.classList.remove('hidden');
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
                // Scaled offsets: 60*0.8=48, 90*0.8=72
                const offset = window.innerWidth < 1024 ? 48 : 72;
                window.scrollTo({ 
                    top: target.getBoundingClientRect().top + window.pageYOffset - offset, 
                    behavior: 'smooth' 
                });
            }
        });
    });
}

/**
 * FAQ Logic
 * Manages both visual classes and ARIA expanded states.
 */
function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn = item.querySelector('.faq-btn');
        btn?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all others and reset ARIA
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-btn')?.setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                btn.setAttribute('aria-expanded', 'true');
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

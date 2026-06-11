
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
        const img = document.getElementById(id) as HTMLImageElement;
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
        document.getElementById('overlay-title')!.innerHTML = data.title;
        document.getElementById('overlay-year')!.innerHTML = data.year;
        document.getElementById('overlay-client')!.innerHTML = data.client;
        document.getElementById('overlay-sector')!.innerHTML = data.sector;
        document.getElementById('overlay-desc')!.innerHTML = data.desc;

        // Set Standalone Link
        const standaloneLink = document.getElementById('overlay-standalone-link') as HTMLAnchorElement;
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
            const img = document.getElementById(id) as HTMLImageElement;
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
    document.getElementById('case-year')!.innerHTML = data.year;
    caseTitle.innerHTML = data.title;
    document.getElementById('case-client')!.innerHTML = data.client;
    document.getElementById('case-sector')!.innerHTML = data.sector;
    caseDesc.innerHTML = data.desc;

    // Populate images helper
    const setImage = (idStr: string, src: string) => {
        const img = document.getElementById(idStr) as HTMLImageElement;
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
    const canvas = document.getElementById('shader-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2');
    if (!gl) {
        console.error('WebGL2 not supported');
        return;
    }

    const vertexShaderSource = `#version 300 es
    precision mediump float;
    layout(location = 0) in vec4 a_position;
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

    const int bayer8x8[64] = int[64](
        0, 32,  8, 40,  2, 34, 10, 42,
        48, 16, 56, 24, 50, 18, 58, 26,
        12, 44,  4, 36, 14, 46,  6, 38,
        60, 28, 52, 20, 62, 30, 54, 22,
        3, 35, 11, 43,  1, 33,  9, 41,
        51, 19, 59, 27, 49, 17, 57, 25,
        15, 47,  7, 39, 13, 45,  5, 37,
        63, 31, 55, 23, 61, 29, 53, 21
    );

    float getBayerValue(vec2 uv) {
        ivec2 pos = ivec2(mod(uv, 8.0));
        return float(bayer8x8[pos.y * 8 + pos.x]) / 64.0;
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

    function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const program = gl.createProgram()!;
    const vs = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)!;
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    const locations = {
        u_time: gl.getUniformLocation(program, 'u_time'),
        u_resolution: gl.getUniformLocation(program, 'u_resolution'),
        u_colorBack: gl.getUniformLocation(program, 'u_colorBack'),
        u_colorFront: gl.getUniformLocation(program, 'u_colorFront'),
        u_pxSize: gl.getUniformLocation(program, 'u_pxSize'),
        a_position: gl.getAttribLocation(program, 'a_position'),
    };

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(locations.a_position);
    gl.vertexAttribPointer(locations.a_position, 2, gl.FLOAT, false, 0, 0);

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        gl!.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    const startTime = Date.now();
    function render() {
        const time = (Date.now() - startTime) * 0.001;
        gl!.clear(gl!.COLOR_BUFFER_BIT);
        gl!.useProgram(program);
        gl!.uniform1f(locations.u_time, time);
        gl!.uniform2f(locations.u_resolution, canvas.width, canvas.height);
        gl!.uniform4f(locations.u_colorBack, 0.0, 0.0, 0.0, 1.0);
        gl!.uniform4f(locations.u_colorFront, 1.0, 1.0, 1.0, 0.6);
        gl!.uniform1f(locations.u_pxSize, 3.5);
        gl!.drawArrays(gl!.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
    }
    render();
}

/**
 * Custom Cursor Logic
 */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor') as HTMLElement;
    if (!cursor) return;

    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    let isInside = false;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isInside) {
            isInside = true;
            cursor.classList.remove('hidden');
        }
    });

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

    document.querySelectorAll('a, button, input, textarea, .pill-btn, .faq-btn, .tier-row, .project-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hidden'));
        el.addEventListener('mouseleave', () => { if (isInside) cursor.classList.remove('hidden'); });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

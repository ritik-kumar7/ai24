import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import { teamCulture, heroData } from '../data/mockData';
import { ArrowUpRight, Check, X, Globe } from 'lucide-react';
import './About.css';
import aboutBg from '../assets/images/about_bg.jpg';

import dubaiImg from '../assets/about_city/dubai.jpg';
import newyorkImg from '../assets/about_city/newyork.jpg';
import londonImg from '../assets/about_city/london.jpg';
import singaporeImg from '../assets/about_city/singapur.jpg';
import bangaloreImg from '../assets/about_city/banglore.jpg';
import torontoImg from '../assets/about_city/torronto.jpg';

const globalCities = [
    { name: 'Dubai (HQ)', image: dubaiImg, lat: '25.2048° N', lon: '55.2708° E' },
    { name: 'New York', image: newyorkImg, lat: '40.7128° N', lon: '74.0060° W' },
    { name: 'London', image: londonImg, lat: '51.5074° N', lon: '0.1278° W' },
    { name: 'Singapore', image: singaporeImg, lat: '1.3521° N', lon: '103.8198° E' },
    { name: 'Bangalore', image: bangaloreImg, lat: '12.9716° N', lon: '77.5946° E' },
    { name: 'Toronto', image: torontoImg, lat: '43.6510° N', lon: '79.3470° W' }
];

gsap.registerPlugin(ScrollTrigger);

// 3D Tilt Component
const TiltCard = ({ children, className, style }) => {
    const ref = useRef(null);
    const x = useSpring(0, { stiffness: 400, damping: 30 });
    const y = useSpring(0, { stiffness: 400, damping: 30 });

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 40);
        y.set(yPct * -40);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX: y, rotateY: x, transformStyle: "preserve-3d", ...style }}
            className={className}
        >
            <div style={{ transform: "translateZ(30px)" }}>{children}</div>
        </motion.div>
    );
};

// Magnetic Hover Component
const MagneticButton = ({ children, className }) => {
    const ref = useRef(null);
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        x.set(middleX * 0.3);
        y.set(middleY * 0.3);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            style={{ x, y }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

const About = () => {
    const containerRef = useRef(null);
    const manifestoRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!manifestoRef.current) return;
        const rect = manifestoRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        manifestoRef.current.style.setProperty('--mouse-x', `${x}px`);
        manifestoRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 1500], [0, 400]);
    const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        let ctx = gsap.context(() => {
            gsap.fromTo('.phil-word',
                { opacity: 0.1, color: "rgba(255,255,255,0.1)", textShadow: "0 0 0px rgba(216, 181, 106, 0)" },
                {
                    opacity: 1,
                    color: "#fff",
                    textShadow: "0 0 25px rgba(216, 181, 106, 0.8)",
                    stagger: 0.1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: '.philosophy-text-container',
                        start: "top 80%",
                        end: "bottom 50%",
                        scrub: 1
                    }
                }
            );

            const timelineCards = gsap.utils.toArray('.horiz-item');
            if (timelineCards.length > 0) {
                gsap.to(timelineCards, {
                    xPercent: -100 * (timelineCards.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: '.horiz-container',
                        pin: true,
                        scrub: 1,
                        snap: 1 / (timelineCards.length - 1),
                        end: () => "+=" + document.querySelector('.horiz-container').offsetWidth * 1.5,
                        onUpdate: (self) => {
                            gsap.to('.horiz-progress-fill', { width: `${self.progress * 100}%`, ease: "none", duration: 0.1, overwrite: "auto" });
                        }
                    }
                });
            }

            const cosCards = gsap.utils.toArray('.cos-node-card');
            if (cosCards.length > 0) {
                gsap.fromTo(cosCards,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)",
                        scrollTrigger: { trigger: '.cos-section', start: "top 75%" }
                    }
                );
                const premiumCards = gsap.utils.toArray('.premium-cos-card');
                if (premiumCards.length > 0) {
                    gsap.fromTo(premiumCards,
                        { opacity: 0, y: 60 },
                        {
                            opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out",
                            scrollTrigger: { trigger: '.premium-cos-section', start: "top 75%" }
                        }
                    );
                }
            }



            const roadmapCards = gsap.utils.toArray('.roadmap-card-anim');
            roadmapCards.forEach((card, i) => {
                gsap.fromTo(card,
                    { opacity: 0, x: 50 },
                    {
                        opacity: 1, x: 0, duration: 1, ease: "power3.out",
                        scrollTrigger: { trigger: card, start: "top 85%" }
                    }
                );
            });

            const stats = gsap.utils.toArray('.impact-stat');
            stats.forEach((stat, i) => {
                gsap.fromTo(stat,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1, y: 0, duration: 1, delay: i * 0.2, ease: "power4.out",
                        scrollTrigger: { trigger: '.impact-section', start: "top 80%" }
                    }
                );
            });

            // Global Ecosystem - New Sticky Crossfade Layout
            const geCards = gsap.utils.toArray('.desktop-ge-layout .ge-scroll-card');
            const geImages = gsap.utils.toArray('.desktop-ge-layout .ge-sticky-image');

            if (geCards.length > 0 && geImages.length > 0) {
                let mm = gsap.matchMedia();

                mm.add("(min-width: 993px)", () => {
                    // Init images opacity
                    gsap.set(geImages, { opacity: 0 });
                    gsap.set(geImages[0], { opacity: 1 });

                    geCards.forEach((card, i) => {
                        ScrollTrigger.create({
                            trigger: card,
                            start: 'top 50%',
                            end: 'bottom 50%',
                            onToggle: self => {
                                if (self.isActive) {
                                    // Dim others, highlight active
                                    gsap.to(geCards, { opacity: 0.3, duration: 0.4 });
                                    gsap.to(card, { opacity: 1, duration: 0.4 });

                                    // Crossfade images
                                    gsap.to(geImages, { opacity: 0, duration: 0.6, overwrite: 'auto' });
                                    gsap.to(geImages[i], { opacity: 1, duration: 0.8, ease: 'power2.out', overwrite: 'auto' });
                                }
                            }
                        });
                    });
                });
            }
        });

        return () => {
            lenis.destroy();
            ctx.revert();
        };
    }, []);

    const timelineData = [
        { year: "2018", title: "The Ideation", desc: "Recognized the inherent limitations of human-scale marketing execution." },
        { year: "2020", title: "First Deployments", desc: "Built predictive retention models for high-growth enterprise SaaS clients." },
        { year: "2022", title: "Global Scale", desc: "Expanded operations across multiple continents, deploying AI architecture at scale." },
        { year: "2024", title: "Intelligence Era", desc: "Integrated multi-agent AI ecosystems into core revenue infrastructure." },
        { year: "Beyond", title: "Singularity", desc: "Developing entirely autonomous digital business engines requiring zero human intervention." },
    ];

    const teamData = [
        { name: "Dr. Elena Rostova", role: "Chief AI Architect", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" },
        { name: "Marcus Chen", role: "Head of Growth Engineering", image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600" },
        { name: "Sarah Jenkins", role: "VP of Revenue Operations", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600" }
    ];

    const comparisonData = [
        { feature: "Execution Strategy", traditional: "Manual A/B Testing, human intuition", ai24: "Deterministic mathematical output, self-optimizing" },
        { feature: "Data Usage", traditional: "Siloed reporting, retrospective analysis", ai24: "Real-time, integrated, predictive intelligence" },
        { feature: "Scale Potential", traditional: "Linear (requires more headcount)", ai24: "Exponential (zero-human orchestration)" }
    ];

    const philosophyText = "We do not believe in ‘best practices’. We believe in deterministic growth built on intelligent infrastructure. When a system is architected correctly, revenue becomes an inevitable mathematical output.";

    return (
        <div className="about-page" ref={containerRef}>

            {/* GLOBAL FIXED BACKGROUND */}
            <div className="bgImage" style={{ backgroundImage: `url(${aboutBg})`, filter: 'brightness(0.9) contrast(1.1)' }}></div>

            {/* 1. CINEMATIC HERO SECTION */}
            <section className="about-hero">
                <div className="hero-gradient-overlay"></div>

                <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="floating-blob blob-gold" />
                <motion.div animate={{ rotate: -360, scale: [1, 1.2, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="floating-blob blob-ice" />

                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="goldText paradigm-shift-text">
                        The Paradigm Shift
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="about-title">
                        Engineering <br />
                        <span className="text-stroke">The Future</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="cta-wrapper"
                    >
                        <MagneticButton>
                            <Link to="/contact" className="glow-cta">
                                Join The Innovation
                                <ArrowUpRight size={24} style={{ marginLeft: '12px' }} />
                            </Link>
                        </MagneticButton>
                    </motion.div>
                </div>
            </section>

            {/* 2. PREMIUM INTERACTIVE MANIFESTO */}
            <section className="about-section philosophy-section" style={{ background: '#020305', position: 'relative' }}>
                <div className="diagonal-divider"></div>

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div
                        className="manifesto-card"
                        ref={manifestoRef}
                        onMouseMove={handleMouseMove}
                        style={{ '--mouse-x': '50%', '--mouse-y': '50%' }}
                    >
                        <div className="manifesto-bg-glow"></div>
                        <div className="manifesto-content">
                            <div className="manifesto-badge">Our Core Belief</div>
                            <div className="philosophy-text-container">
                                {philosophyText.split(" ").map((word, i) => {
                                    let isHighlight = false;
                                    const cleanWord = word.replace(/[.,’‘]/g, "").toLowerCase();

                                    if (['deterministic', 'growth', 'intelligent', 'infrastructure', 'inevitable', 'mathematical', 'output'].includes(cleanWord)) {
                                        isHighlight = true;
                                    }

                                    return (
                                        <span key={i} className="phil-word-wrap">
                                            <span className={`phil-word ${isHighlight ? 'highlight-word' : ''}`}>
                                                {word}
                                            </span>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. IMPACT STATISTICS (Premium Data-Driven Reality) */}
            <section className="about-section impact-section premium-impact-section" style={{ background: 'transparent', position: 'relative' }}>
                <div className="impact-bg-grid"></div>
                <div className="impact-ambient-flare"></div>

                <div className="container impact-container" style={{ position: 'relative', zIndex: 5 }}>
                    <div className="impact-header-row">
                        <div className="impact-header-titles">
                            <div className="goldText" style={{ fontSize: '14px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
                                <span className="pulse-dot-gold" style={{ marginRight: '10px' }}></span> Measurable Impact
                            </div>
                            <h2 style={{ fontSize: 'clamp(40px, 6vw, 70px)', marginBottom: '0', fontWeight: 400, lineHeight: '1.1' }}>
                                Data-Driven <br />
                                <span className="iceText" style={{ fontWeight: 300 }}>Reality.</span>
                            </h2>
                        </div>
                        <div className="impact-header-desc">
                            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.6)', maxWidth: '400px', margin: 0, fontWeight: 300 }}>
                                We replace anecdotal marketing with deterministic infrastructure. Our performance is quantified down to the millisecond.
                            </p>
                            <div className="impact-h-line">
                                <div className="impact-h-line-glow"></div>
                            </div>
                        </div>
                    </div>

                    <div className="impact-stats-premium-grid">
                        {heroData.stats.map((stat, i) => (
                            <TiltCard key={i} className={`impact-stat-panel panel-0${i + 1}`}>
                                <div className="impact-panel-glass"></div>
                                <div className="impact-panel-borders">
                                    <div className="border-t"></div>
                                    <div className="border-r"></div>
                                    <div className="border-b"></div>
                                    <div className="border-l"></div>
                                </div>
                                <div className="impact-panel-content">
                                    <div className="impact-data-header">
                                        <div className="impact-sys-id">METRIC_0{i + 1}</div>
                                        <div className="impact-blink-dot"></div>
                                    </div>

                                    <div className="impact-number-wrap">
                                        <span className="impact-number-hl">{stat.value.replace(/[^0-9.]/g, '')}</span>
                                        <span className="impact-number-unit">{stat.value.replace(/[0-9.]/g, '')}</span>
                                    </div>

                                    <div className="impact-label-hl">{stat.label}</div>

                                    <div className="impact-graph-visual">
                                        {[...Array(4)].map((_, barIdx) => (
                                            <div key={barIdx} className={`graph-bar ${barIdx === 3 ? 'graph-bar-hl' : ''}`} style={{ height: `${40 + (barIdx * 15) + (i * 5)}%`, animationDelay: `${barIdx * 0.1}s` }}></div>
                                        ))}
                                    </div>
                                </div>
                                <div className="impact-hover-glow"></div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. HORIZONTAL SCROLL TIMELINE (Redesigned) */}
            <div className="horiz-container">
                <div className="horiz-container-bg"></div>
                <div className="horiz-progress-bar">
                    <div className="horiz-progress-fill"></div>
                </div>
                <div className="horiz-timeline-wrapper" style={{ display: 'flex', width: `${timelineData.length * 100}vw` }}>
                    {timelineData.map((item, i) => (
                        <div key={i} className="horiz-item">
                            <div className="massive-bg-year">{item.year.replace('Beyond', '2025+')}</div>
                            <div className="horiz-grid">
                                <div className="horiz-text-col">
                                    <div className="timeline-meta">
                                        <div className="timeline-dot" style={{ background: i % 2 === 0 ? 'var(--gold)' : 'var(--ice)', boxShadow: `0 0 15px ${i % 2 === 0 ? 'var(--gold)' : 'var(--ice)'}` }}></div>
                                        <div className="timeline-phase">PHASE 0{i + 1}</div>
                                    </div>
                                    <h3 className="timeline-title" style={{ fontWeight: 400 }}>
                                        <span className={i % 2 === 0 ? "goldText" : "iceText"}>{item.title}</span>
                                    </h3>
                                    <p className="timeline-desc">{item.desc}</p>
                                </div>
                                <div className="horiz-visual-col">
                                    <div className="hyper-node">
                                        <div className="hyper-ring-1" style={{ borderColor: i % 2 === 0 ? 'var(--gold) transparent transparent var(--gold)' : 'var(--ice) transparent transparent var(--ice)' }}></div>
                                        <div className="hyper-ring-2" style={{ borderColor: i % 2 === 0 ? 'transparent var(--ice) var(--ice) transparent' : 'transparent var(--gold) var(--gold) transparent' }}></div>
                                        <div className="hyper-core" style={{ background: i % 2 === 0 ? 'radial-gradient(circle, var(--gold) 0%, transparent 70%)' : 'radial-gradient(circle, var(--ice) 0%, transparent 70%)' }}></div>
                                        <div className="hyper-glass-orb"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. CULTURAL OPERATING SYSTEM (Redesigned Cyber-Holographic) */}
            <section className="about-section premium-cos-section">
                <div className="premium-cos-bg">
                    {/* Deep dynamic grid and gradient to make it feel like a mainframe */}
                    <div className="cos-mainframe-grid"></div>
                    <div className="premium-cos-glow"></div>
                </div>

                <div className="container pos-relative z-10">
                    <div className="premium-cos-header" style={{ position: 'relative', zIndex: 10 }}>
                        <div className="goldText section-subtitle">System Architecture</div>
                        <h2 className="premium-cos-title">
                            Cultural <br />
                            <span className="iceText" style={{ fontWeight: 300 }}>Operating System</span>
                        </h2>
                        <p className="premium-cos-desc">Built by engineers. A framework of first principles, eliminating human redundancy.</p>
                    </div>

                    <div className="premium-cos-grid">
                        {teamCulture.map((item, i) => (
                            <TiltCard key={i} className="cos-holographic-card">
                                <div className="cos-card-inner">
                                    {/* Animated Borders & Backgrounds */}
                                    <div className="cos-card-glass"></div>
                                    <div className="cos-card-scanline"></div>
                                    <div className="cos-card-gradient-bg"></div>

                                    {/* Tech corners */}
                                    <div className="tech-corner t-l"></div>
                                    <div className="tech-corner t-r"></div>
                                    <div className="tech-corner b-l"></div>
                                    <div className="tech-corner b-r"></div>

                                    {/* Card Content Top Layer */}
                                    <div className="cos-card-header">
                                        <div className="cos-sys-id">
                                            <span className="cos-dot-pulse"></span>
                                            SYS.DEF_0{i + 1}
                                        </div>
                                        <div className="cos-hex-badge">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="hex-icon">
                                                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="cos-card-body">
                                        <h3 className="cos-title-hl">{item.title}</h3>
                                        <div className="cos-divider">
                                            <div className="cos-divider-glow"></div>
                                        </div>
                                        <p className="cos-desc-hl">{item.desc}</p>
                                    </div>

                                    {/* Core number watermarked behind text */}
                                    <div className="cos-watermark-num">0{i + 1}</div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. AI24 ADVANTAGE (PREMIUM COMPARISON) */}
            <section className="about-section premium-comparison-section" style={{ background: 'transparent', position: 'relative' }}>
                <div className="comparison-bg-glow"></div>
                <div className="container">
                    <div className="text-center" style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 10 }}>
                        <div className="goldText section-subtitle" style={{ justifyContent: 'center' }}>Paradigm Shift</div>
                        <h2 style={{ fontSize: 'clamp(40px, 6vw, 64px)', marginBottom: '20px', fontWeight: 400 }}>The Ai24 <span style={{ color: 'var(--gold)' }}>Advantage</span></h2>
                        <p style={{ margin: '0 auto', maxWidth: '600px', fontSize: '18px', color: 'var(--muted)' }}>A fundamental shift in how revenue architectures are designed, deployed, and scaled.</p>
                    </div>

                    <div className="premium-vs-container">
                        {/* Traditional Column */}
                        <div className="premium-vs-card vs-traditional">
                            <div className="vs-card-header">
                                <h3 className="vs-title">Traditional Agencies</h3>
                                <div className="vs-subtitle">Human-dependent, slow, fragmented</div>
                            </div>
                            <div className="vs-list">
                                {comparisonData.map((item, i) => (
                                    <div key={i} className="vs-item">
                                        <div className="vs-icon-wrapper traditional-icon">
                                            <X size={18} />
                                        </div>
                                        <div className="vs-text-content">
                                            <div className="vs-label">{item.feature}</div>
                                            <div className="vs-value">{item.traditional}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* VS Badge */}
                        <div className="vs-badge">
                            <div className="vs-badge-inner">VS</div>
                            <div className="vs-badge-glow"></div>
                        </div>

                        {/* AI24 Column */}
                        <div className="premium-vs-card vs-ai24">
                            <div className="vs-card-bg-glow"></div>
                            <div className="vs-card-header">
                                <h3 className="vs-title" style={{ color: 'var(--gold)' }}>Ai24 Architecture</h3>
                                <div className="vs-subtitle" style={{ color: '#fff' }}>Autonomous, instant, unified</div>
                            </div>
                            <div className="vs-list">
                                {comparisonData.map((item, i) => (
                                    <div key={i} className="vs-item">
                                        <div className="vs-icon-wrapper ai24-icon">
                                            <Check size={18} />
                                        </div>
                                        <div className="vs-text-content">
                                            <div className="vs-label" style={{ color: 'rgba(216, 181, 106, 0.6)' }}>{item.feature}</div>
                                            <div className="vs-value ai24-value">{item.ai24}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. GLOBAL ECOSYSTEM - NEW PREMIUM STICKY LAYOUT */}
            <section className="about-section ge-premium-section" style={{ background: '#020305' }}>
                <div className="container" style={{ position: 'relative', zIndex: 5 }}>
                    <div className="ge-premium-header" style={{ marginBottom: '80px', textAlign: 'center' }}>
                        <Globe size={48} color="var(--gold)" style={{ marginBottom: '20px' }} />
                        <h2 style={{ fontSize: 'clamp(48px, 6vw, 80px)', marginBottom: '10px', fontWeight: 400 }}>Global Ecosystem</h2>
                        <div className="goldText" style={{ fontSize: '14px', letterSpacing: '0.4em', textTransform: 'uppercase', opacity: 0.8 }}>Worldwide Presence</div>
                    </div>

                    <div className="ge-premium-layout desktop-ge-layout">
                        {/* Left Column: Sticky Image Hub */}
                        <div className="ge-sticky-col">
                            <div className="ge-sticky-visual-wrapper">
                                <div className="ge-visual-glass"></div>
                                <div className="ge-visual-grid"></div>

                                <div className="ge-images-container">
                                    {globalCities.map((city, i) => (
                                        <img key={i} src={city.image} alt={city.name} className="ge-sticky-image" />
                                    ))}
                                </div>

                                {/* Overlay styling elements */}
                                <div className="ge-corner top-left"></div>
                                <div className="ge-corner top-right"></div>
                                <div className="ge-corner bottom-left"></div>
                                <div className="ge-corner bottom-right"></div>

                                <div className="ge-visual-scanline"></div>
                            </div>
                        </div>

                        {/* Right Column: Scrolling Cards */}
                        <div className="ge-scroll-col">
                            {globalCities.map((city, i) => (
                                <div key={i} className="ge-scroll-card" style={{ opacity: i === 0 ? 1 : 0.3 }}>
                                    <div className="ge-card-content">
                                        <div className="ge-card-line"></div>
                                        <h3 className="ge-city-title" style={{ fontWeight: 400 }}>{city.name}</h3>
                                        <div className="ge-coords">
                                            <span style={{ color: 'var(--gold)' }}>●</span> {city.lat} | {city.lon}
                                        </div>
                                        <p className="ge-city-text">
                                            Operating seamlessly across borders to deploy sovereign AI systems for multinational enterprises.
                                        </p>
                                        <div className="ge-node-badge">
                                            <Globe size={14} /> Active Node
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mobile-ge-layout">
                        {globalCities.map((city, i) => (
                            <div key={i} className="ge-mobile-card">
                                <div className="ge-mobile-image-wrapper">
                                    <div className="ge-visual-glass"></div>
                                    <div className="ge-visual-grid"></div>
                                    <img src={city.image} alt={city.name} className="ge-mobile-image" />
                                    <div className="ge-corner top-left"></div>
                                    <div className="ge-corner top-right"></div>
                                    <div className="ge-corner bottom-left"></div>
                                    <div className="ge-corner bottom-right"></div>
                                    <div className="ge-visual-scanline"></div>
                                </div>
                                <div className="ge-mobile-content">
                                    <h3 className="ge-city-title" style={{ fontWeight: 400 }}>{city.name}</h3>
                                    <div className="ge-coords">
                                        <span style={{ color: 'var(--gold)' }}>●</span> {city.lat} | {city.lon}
                                    </div>
                                    <p className="ge-city-text">
                                        Operating seamlessly across borders to deploy sovereign AI systems for multinational enterprises.
                                    </p>
                                    <div className="ge-node-badge">
                                        <Globe size={14} /> Active Node
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* 9. PREMIUM TIMELINE ROADMAP */}
            <section className="about-section premium-roadmap-section">
                <div className="roadmap-premium-bg">
                    <div className="rm-grid-overlay"></div>
                    <div className="rm-ambient-glow"></div>
                </div>

                <div className="container" style={{ position: 'relative', zIndex: 5 }}>
                    <div className="roadmap-header">
                        <div className="goldText section-subtitle" style={{ justifyContent: 'center' }}>Future Trajectory</div>
                        <h2 className="roadmap-main-title">The Horizon</h2>
                        <p className="roadmap-main-desc">Our immediate roadmap focuses on full lifecycle autonomy. Imagine connecting your product to market without ever hiring a human orchestration layer.</p>
                    </div>

                    <div className="rm-timeline">
                        <div className="rm-center-line">
                            <div className="rm-progress-fill"></div>
                        </div>

                        <div className="rm-item rm-left">
                            <div className="rm-node-wrapper">
                                <div className="rm-node">
                                    <div className="rm-node-core"></div>
                                    <div className="rm-node-pulse"></div>
                                </div>
                            </div>
                            <div className="rm-card">
                                <div className="rm-card-bg"></div>
                                <div className="rm-card-content">
                                    <div className="rm-step">Phase 01</div>
                                    <h3 className="rm-title">Autonomous Execution API</h3>
                                    <p className="rm-desc">Zero-code integration mapping entirely driven by LLM architecture directly interfacing with enterprise systems.</p>
                                    <div className="rm-accent-line" style={{ background: 'var(--gold)' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="rm-item rm-right">
                            <div className="rm-node-wrapper">
                                <div className="rm-node" style={{ borderColor: 'var(--ice)' }}>
                                    <div className="rm-node-core" style={{ background: 'var(--ice)' }}></div>
                                    <div className="rm-node-pulse" style={{ background: 'rgba(122, 230, 255, 0.4)' }}></div>
                                </div>
                            </div>
                            <div className="rm-card">
                                <div className="rm-card-bg"></div>
                                <div className="rm-card-content">
                                    <div className="rm-step" style={{ color: 'var(--ice)' }}>Phase 02</div>
                                    <h3 className="rm-title">Predictive Market Matrix</h3>
                                    <p className="rm-desc">Real-time 3D visualization of TAM penetration and churn vectors, mapped live against competitive movements.</p>
                                    <div className="rm-accent-line" style={{ background: 'var(--ice)' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="rm-item rm-left">
                            <div className="rm-node-wrapper">
                                <div className="rm-node" style={{ borderColor: '#fff' }}>
                                    <div className="rm-node-core" style={{ background: '#fff' }}></div>
                                    <div className="rm-node-pulse" style={{ background: 'rgba(255, 255, 255, 0.4)' }}></div>
                                </div>
                            </div>
                            <div className="rm-card">
                                <div className="rm-card-bg"></div>
                                <div className="rm-card-content">
                                    <div className="rm-step" style={{ color: '#fff' }}>Phase 03</div>
                                    <h3 className="rm-title">Generative Commerce</h3>
                                    <p className="rm-desc">Checkout systems that write their own conversion optimization tests, layout engines, and dynamic pricing models.</p>
                                    <div className="rm-accent-line" style={{ background: '#fff' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. CTA FINALE */}
            <section className="about-section cta-finale-section" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="container text-center" style={{ textAlign: 'center', position: 'relative' }}>
                    <div className="cta-glow-bg"></div>
                    <h2 style={{ fontSize: 'clamp(60px, 8vw, 120px)', marginBottom: '40px', textTransform: 'uppercase', fontWeight: 400 }}>Ready to Scale?</h2>

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <MagneticButton>
                            <Link to="/contact" className="glow-cta cta-large">
                                Partner with Ai24
                                <ArrowUpRight size={28} style={{ marginLeft: '16px' }} />
                            </Link>
                        </MagneticButton>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default About;

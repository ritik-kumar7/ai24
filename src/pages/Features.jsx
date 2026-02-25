import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { featuresDeepDive, differentiators } from '../data/mockData';
import './Features.css';
import featuresBg from '../assets/images/features.jpg';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const pageRef = useRef(null);
    const heroTitleRef = useRef(null);
    const splitRef = useRef(null);
    const timelineRef = useRef(null);


    const { scrollYProgress } = useScroll();
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    // For Stats Counter
    const [stats, setStats] = useState({ latency: 0, scale: 0, accuracy: 0 });
    const [activeCap, setActiveCap] = useState(0);

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Text Split Reveal for Hero
            if (heroTitleRef.current) {
                const chars = heroTitleRef.current.querySelectorAll('.char');
                gsap.fromTo(chars,
                    { y: 100, opacity: 0, rotateX: -90 },
                    { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.05, ease: 'power4.out', delay: 0.2 }
                );
            }

            // Timeline Scroll Reveal
            const timelineItems = gsap.utils.toArray('.timeline-item');
            timelineItems.forEach((item, i) => {
                gsap.fromTo(item,
                    { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
                    {
                        opacity: 1, x: 0, duration: 1,
                        scrollTrigger: {
                            trigger: item, start: 'top 80%', end: 'center center', scrub: 1
                        }
                    }
                );
            });

            // Feature Showcase - Sticky Split
            const splitSections = gsap.utils.toArray('.split-right-item');
            if (splitSections.length) {
                gsap.to('.split-left-visual', {
                    yPercent: 100,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: splitRef.current,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: true
                    }
                });
            }

            // Stats counter animation
            const targetStats = { latency: 0, scale: 0, accuracy: 0 };
            ScrollTrigger.create({
                trigger: '.stats-section',
                start: 'top 75%',
                once: true,
                onEnter: () => {
                    gsap.to(targetStats, {
                        latency: 50, scale: 10, accuracy: 99.9, duration: 2, ease: 'power2.out',
                        onUpdate: () => setStats({ ...targetStats })
                    });
                }
            });

            // Image Zoom Reveal
            gsap.fromTo('.zoom-reveal',
                { scale: 0.8, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, scrollTrigger: { trigger: '.zoom-reveal', start: 'top 80%' } }
            );
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const titleText = "Cognitive\nArchitecture";



    return (
        <div ref={pageRef} className="features-page">

            {/* Fixed Page Background Image */}
            <div style={{ position: 'fixed', inset: 0, backgroundImage: `url(${featuresBg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.85, zIndex: 0, filter: 'saturate(1.2) brightness(1.1)' }}></div>
            <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,5,0.1) 0%, rgba(5,5,5,0.2) 40%, rgba(5,5,5,0.4) 100%)', zIndex: 0 }}></div>

            {/* 1. HERO SECTION */}
            <section style={{ minHeight: '110vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', paddingTop: '150px' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,5,0.05) 0%, transparent 40%, rgba(5,5,5,0.3) 100%)', zIndex: 0 }}></div>

                {/* Background Particles/Glow */}
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 30%, rgba(216,181,106,0.15) 0%, transparent 60%)', zIndex: 0 }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="goldText" style={{ fontSize: '18px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 700 }}
                    >
                        Intelligence Applied
                    </motion.div>

                    <h1 ref={heroTitleRef} style={{ fontSize: 'clamp(50px, 9vw, 120px)', lineHeight: 0.9, marginBottom: '50px', textTransform: 'uppercase', fontWeight: 900, perspective: '1000px' }}>
                        {titleText.split('\n').map((line, lineIdx) => (
                            <div key={lineIdx} style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}>
                                {line.split('').map((char, i) => (
                                    <span key={i} className="char" style={{ display: 'inline-block', color: lineIdx === 1 ? 'transparent' : '#fff', WebkitTextStroke: lineIdx === 1 ? '2px var(--gold)' : 'none' }}>
                                        {char === ' ' ? '\u00A0' : char}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        style={{ fontSize: '26px', maxWidth: '800px', margin: '0 auto 60px', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 300 }}
                    >
                        The most advanced AI infrastructure designed exclusively to predict, scale, and automate global revenue systems.
                    </motion.p>

                    {/* 3D Tilt Mockup */}
                    <div className="mockup-container zoom-reveal" style={{ width: '80%', height: '400px', margin: '0 auto', perspective: '1200px' }}>
                        <motion.div
                            className="mockup-inner"
                            initial={{ rotateX: 20, rotateY: 0 }}
                            whileHover={{ rotateX: 0, rotateY: 0, scale: 1.02 }}
                            animate={{ rotateY: [0, 5, -5, 0] }}
                            transition={{ rotateY: { repeat: Infinity, duration: 10, ease: 'easeInOut' }, default: { duration: 0.5 } }}
                        >
                            <div className="mockup-glow"></div>
                            {/* Inner Visuals */}
                            <div style={{ padding: '40px', height: '100%', display: 'flex', flexWrap: 'wrap', gap: '20px', background: 'rgba(0,0,0,0.4)' }}>
                                <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}></div>
                                <div style={{ flex: 2, background: 'rgba(216,181,106,0.1)', borderRadius: '16px', border: '1px solid rgba(216,181,106,0.3)' }}></div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="scroll-indicator-wrap">
                        <div className="scroll-indicator-mouse">
                            <div className="scroll-indicator-dot"></div>
                        </div>
                        <span style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll to Explore</span>
                    </div>
                </div>
            </section>

            {/* INTEGRATION MARQUEE */}
            <section className="marquee-container">
                <div className="marquee-content">
                    {[1, 2].map(set => (
                        <React.Fragment key={set}>
                            <div className="marquee-item">Salesforce Integration <span className="goldText">✦</span></div>
                            <div className="marquee-item">HubSpot Native <span className="goldText">✦</span></div>
                            <div className="marquee-item">Snowflake Analytics <span className="goldText">✦</span></div>
                            <div className="marquee-item">AWS Bedrock <span className="goldText">✦</span></div>
                            <div className="marquee-item">OpenAI GPT-4o <span className="goldText">✦</span></div>
                            <div className="marquee-item">Segment Events <span className="goldText">✦</span></div>
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* CORE CAPABILITIES — Signal Stack */}
            <section className="cap-signal-section" style={{ position: 'relative', background: 'var(--bg, #050505)' }}>
                <div className="cap-signal-bg-accent"></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '90px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="goldText"
                            style={{ fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}
                        >
                            What Sets Us Apart
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            style={{ fontSize: 'clamp(48px, 6vw, 90px)', lineHeight: 1.1, marginBottom: '24px', fontFamily: '"Clash Display", sans-serif', fontWeight: 500 }}
                        >
                            Core <span className="iceText" style={{ fontWeight: 300 }}>Capabilities</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto' }}
                        >
                            Not just tools. We build autonomous engines that replace entire departments.
                        </motion.p>
                    </div>

                    <div className="cap-signal-stack">
                        {differentiators.map((diff, i) => (
                            <motion.div
                                key={i}
                                className={`cap-signal-row ${activeCap === i ? 'active' : ''}`}
                                onMouseEnter={() => setActiveCap(i)}
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: i * 0.1 }}
                            >
                                {/* Signal Bar */}
                                <div className="cap-signal-bar"></div>

                                {/* Number Badge */}
                                <div className="cap-signal-num">
                                    <svg viewBox="0 0 50 58" className="cap-hex-svg">
                                        <polygon
                                            points="25,2 48,15 48,43 25,56 2,43 2,15"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                    </svg>
                                    <span className="cap-hex-num">0{i + 1}</span>
                                </div>

                                {/* Content */}
                                <div className="cap-signal-content">
                                    <h3 className="cap-signal-title">{diff.title}</h3>
                                    <p className="cap-signal-desc">{diff.description}</p>
                                </div>

                                {/* Right Arrow */}
                                <div className="cap-signal-arrow">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>

                                {/* Shimmer Effect */}
                                <div className="cap-signal-shimmer"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* THE ARCHITECTURE — Neural Blueprint */}
            <section ref={splitRef} className="arch-blueprint-section">
                {/* Background Effects */}
                <div className="arch-bg-grid"></div>
                <div className="arch-bg-gradient"></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="goldText"
                            style={{ fontSize: '14px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 600 }}
                        >
                            System Blueprint
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            style={{ fontSize: 'clamp(48px, 6vw, 90px)', lineHeight: 1.1, marginBottom: '24px', fontFamily: '"Clash Display", sans-serif', fontWeight: 500 }}
                        >
                            The <span className="goldText" style={{ fontWeight: 300 }}>Architecture</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{ fontSize: '18px', color: 'rgba(255,255,255,0.5)', maxWidth: '600px', margin: '0 auto' }}
                        >
                            Three macro-systems that form the cognitive backbone of every deployment.
                        </motion.p>
                    </div>

                    {/* Architecture Modules */}
                    <div className="arch-modules-container">
                        {featuresDeepDive.map((feature, i) => (
                            <motion.div
                                key={i}
                                className="arch-module"
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-10%' }}
                                transition={{ duration: 0.9, delay: i * 0.15 }}
                            >
                                {/* Data Flow Line */}
                                {i < featuresDeepDive.length - 1 && (
                                    <div className="arch-data-flow">
                                        <div className="arch-flow-line"></div>
                                        <div className="arch-flow-pulse"></div>
                                        <div className="arch-flow-pulse arch-flow-pulse-2"></div>
                                    </div>
                                )}

                                <div className="arch-module-inner">
                                    {/* Left: System ID + Decorative */}
                                    <div className="arch-sys-badge">
                                        <div className="arch-sys-ring">
                                            <div className="arch-sys-ring-inner"></div>
                                        </div>
                                        <div className="arch-sys-id">SYS_0{i + 1}</div>
                                        <div className="arch-sys-status">
                                            <span className="arch-status-dot"></span>
                                            ACTIVE
                                        </div>
                                    </div>

                                    {/* Center: Content */}
                                    <div className="arch-module-content">
                                        <div className="arch-module-header">
                                            <div className="arch-module-tag">MACRO COMPONENT {String(i + 1).padStart(2, '0')}</div>
                                            <h3 className="arch-module-title">
                                                {feature.title.split(' ').map((word, idx, arr) => (
                                                    <span key={idx} className={idx >= Math.ceil(arr.length / 2) ? 'arch-title-gold' : ''}>
                                                        {word}{' '}
                                                    </span>
                                                ))}
                                            </h3>
                                            <p className="arch-module-desc">{feature.content}</p>
                                        </div>

                                        {/* Technical Spec Bar */}
                                        <div className="arch-tech-spec">
                                            <div className="arch-tech-icon">
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M8 1L14.93 4.5V11.5L8 15L1.07 11.5V4.5L8 1Z" stroke="currentColor" strokeWidth="1.2" />
                                                    <circle cx="8" cy="8" r="2" fill="currentColor" />
                                                </svg>
                                            </div>
                                            <div className="arch-tech-content">
                                                <div className="arch-tech-label">Technical Specification</div>
                                                <p className="arch-tech-text">{feature.technical}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Decorative Visual */}
                                    <div className="arch-module-visual">
                                        <div className="arch-visual-hex">
                                            <svg viewBox="0 0 120 140" className="arch-hex-svg">
                                                <defs>
                                                    <linearGradient id={`hexGrad${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                                        <stop offset="0%" stopColor="rgba(216,181,106,0.3)" />
                                                        <stop offset="100%" stopColor="rgba(216,181,106,0.05)" />
                                                    </linearGradient>
                                                </defs>
                                                <polygon
                                                    points="60,5 115,35 115,95 60,125 5,95 5,35"
                                                    fill="none"
                                                    stroke={`url(#hexGrad${i})`}
                                                    strokeWidth="1.5"
                                                    className="arch-hex-outer"
                                                />
                                                <polygon
                                                    points="60,25 95,45 95,85 60,105 25,85 25,45"
                                                    fill="none"
                                                    stroke="rgba(216,181,106,0.15)"
                                                    strokeWidth="1"
                                                    className="arch-hex-inner"
                                                />
                                                <circle cx="60" cy="65" r="8" fill="rgba(216,181,106,0.3)" className="arch-hex-core" />
                                                <circle cx="60" cy="65" r="3" fill="var(--gold)" className="arch-hex-dot" />
                                            </svg>
                                        </div>
                                        <div className="arch-visual-metric">
                                            {i === 0 ? '<50ms' : i === 1 ? 'GPT-4o' : '94%'}
                                        </div>
                                        <div className="arch-visual-metric-label">
                                            {i === 0 ? 'Latency' : i === 1 ? 'Engine' : 'Accuracy'}
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Scan Line */}
                                <div className="arch-scan-line"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS (Timeline) */}
            < section ref={timelineRef} style={{ padding: '150px 0', position: 'relative', overflow: 'hidden', background: 'var(--bg, #050505)' }}>
                <div className="neural-bg"></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '100px' }}>
                        <h2 style={{ fontSize: 'clamp(48px, 6vw, 90px)', lineHeight: 1.1, marginBottom: '24px', fontFamily: '"Clash Display", sans-serif', fontWeight: 500 }}>Execution <span className="iceText" style={{ fontWeight: 300 }}>Timeline</span></h2>
                    </div>

                    <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50px', width: '2px', background: 'linear-gradient(to bottom, transparent, var(--gold), transparent)', opacity: 0.3 }}></div>

                        {[1, 2, 3, 4].map((step, i) => (
                            <div key={i} className="timeline-item" style={{ display: 'flex', gap: '40px', marginBottom: '60px', position: 'relative' }}>
                                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--bg)', border: '2px solid var(--gold)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontWeight: 800, color: 'var(--gold)', zIndex: 1, flexShrink: 0, boxShadow: '0 0 30px rgba(216,181,106,0.2)' }}>
                                    0{step}
                                </div>
                                <div className="glass-panel-premium" style={{ padding: '40px', flex: 1 }}>
                                    <h3 style={{ fontSize: '28px', marginBottom: '15px', fontWeight: 400 }}>Phase {step} <span style={{ color: 'var(--gold)' }}>Integration</span></h3>
                                    <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)' }}>Deploying cognitive models into your current data streams to harvest baseline metrics and initiate autonomous learning routines.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* PERFORMANCE & STATS — Command Center */}
            <section className="stats-section" style={{ padding: '140px 0', position: 'relative', overflow: 'hidden' }}>
                {/* Background Accents */}
                <div className="stats-bg-lines"></div>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(216,181,106,0.04) 0%, transparent 60%)', pointerEvents: 'none' }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <div className="goldText" style={{ fontSize: '12px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>Performance Metrics</div>
                        <h2 style={{ fontSize: 'clamp(48px, 6vw, 90px)', lineHeight: 1.1, marginBottom: '24px', fontFamily: '"Clash Display", sans-serif', fontWeight: 500 }}>System <span className="goldText" style={{ fontWeight: 300 }}>Benchmarks</span></h2>
                        <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', maxWidth: '500px', margin: '0 auto' }}>Real-time infrastructure performance across all deployment nodes.</p>
                    </div>

                    <div className="stats-hud-grid">
                        {[
                            { value: '<50', unit: 'ms', label: 'Edge Execution Latency', desc: 'Sub-millisecond response via edge functions', ring: 92 },
                            { value: '10', unit: 'x', label: 'Compute Scale Factor', desc: 'Dynamic auto-scaling on demand spikes', ring: 78 },
                            { value: '99.9', unit: '%', label: 'Prediction Accuracy', desc: 'ML model precision across all verticals', ring: 99 }
                        ].map((stat, i) => (
                            <div key={i} className="stats-hud-card">
                                {/* Radial Ring */}
                                <div className="stats-ring-wrap">
                                    <svg viewBox="0 0 120 120" className="stats-ring-svg">
                                        {/* Background Ring */}
                                        <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3" />
                                        {/* Progress Ring */}
                                        <circle
                                            cx="60" cy="60" r="52"
                                            fill="none"
                                            stroke="url(#statGrad)"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeDasharray={`${stat.ring * 3.27} ${326.7 - stat.ring * 3.27}`}
                                            strokeDashoffset="81.7"
                                            className="stats-ring-progress"
                                        />
                                        {/* Tick Marks */}
                                        {[...Array(12)].map((_, t) => (
                                            <line
                                                key={t}
                                                x1="60" y1="4" x2="60" y2="8"
                                                stroke="rgba(216,181,106,0.2)"
                                                strokeWidth="1"
                                                transform={`rotate(${t * 30} 60 60)`}
                                            />
                                        ))}
                                        <defs>
                                            <linearGradient id="statGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#d8b56a" />
                                                <stop offset="100%" stopColor="#ffe9b8" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    {/* Center Value */}
                                    <div className="stats-ring-value">
                                        <span className="stats-number">{stat.value}</span>
                                        <span className="stats-unit">{stat.unit}</span>
                                    </div>
                                </div>

                                {/* Label */}
                                <div className="stats-hud-label">{stat.label}</div>
                                <div className="stats-hud-desc">{stat.desc}</div>

                                {/* Decorative Bottom Bar */}
                                <div className="stats-hud-bar">
                                    <div className="stats-hud-bar-fill" style={{ width: `${stat.ring}%` }}></div>
                                </div>

                                {/* Corner Accents */}
                                <div className="stats-corner stats-corner-tl"></div>
                                <div className="stats-corner stats-corner-tr"></div>
                                <div className="stats-corner stats-corner-bl"></div>
                                <div className="stats-corner stats-corner-br"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* DEMO SECTION */}
            < section style={{ padding: '150px 0', background: 'var(--bg, #050505)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{ fontSize: 'clamp(48px, 6vw, 90px)', lineHeight: 1.1, marginBottom: '24px', fontFamily: '"Clash Display", sans-serif', fontWeight: 500 }}>System <span className="iceText" style={{ fontWeight: 300 }}>Preview</span></h2>
                    </div>
                    <div className="cinematic-demo" style={{ height: '60vh', background: 'url(https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80) center/cover' }}>
                        <div className="cinematic-overlay">
                            <div className="play-btn-glow">
                                <span style={{ marginLeft: '5px', fontSize: '30px', color: '#fff' }}>▶</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* COMPARISON SECTION */}
            < section style={{ padding: '100px 0 150px', background: 'var(--bg, #050505)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 style={{ fontSize: 'clamp(48px, 6vw, 90px)', lineHeight: 1.1, marginBottom: '24px', fontFamily: '"Clash Display", sans-serif', fontWeight: 500 }}>The Architecture <span className="goldText" style={{ fontWeight: 300 }}>Delta</span></h2>
                    </div>

                    <div className="comparison-grid">
                        <div className="comp-col-them">
                            <h3 style={{ fontSize: '24px', opacity: 0.5, marginBottom: '40px', textAlign: 'center', fontWeight: 400 }}>Traditional Agencies</h3>
                            {[
                                "Manual Analyst Audits",
                                "Static Demographic Personas",
                                "Weekly Reporting Synchs",
                                "Headcount Dependent Scale"
                            ].map((text, i) => (
                                <div key={i} className="comp-item">
                                    <span style={{ color: 'red', fontSize: '20px' }}>✕</span>
                                    <span style={{ fontSize: '18px', opacity: 0.7 }}>{text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="comp-col-us">
                            <h3 style={{ fontSize: '24px', marginBottom: '40px', textAlign: 'center', fontWeight: 400 }}>Ai24 <span style={{ color: 'var(--gold)' }}>Infrastructure</span></h3>
                            {[
                                "Real-time Machine Learning",
                                "Dynamically Adjusting Cohorts",
                                "<50ms Edge Execution",
                                "Infinite Compute Scale"
                            ].map((text, i) => (
                                <div key={i} className="comp-item">
                                    <span style={{ color: 'var(--gold)', fontSize: '20px' }}>✓</span>
                                    <span style={{ fontSize: '18px' }}>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section >

            {/* CTA */}
            < section style={{ padding: '100px 0 200px', textAlign: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(216, 181, 106, 0.1) 0%, transparent 50%)', zIndex: 0 }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: 'clamp(48px, 6vw, 90px)', lineHeight: 1.1, marginBottom: '24px', fontFamily: '"Clash Display", sans-serif', fontWeight: 500 }}>Access The <span className="iceText" style={{ fontWeight: 300 }}>Arsenal</span>.</h2>
                    <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)', marginBottom: '50px', maxWidth: '600px', margin: '0 auto 50px' }}>Stop running campaigns. Start building infrastructure.</p>
                    <div className="magnetic-wrap">
                        <Link to="/contact">
                            <button className="glowing-btn-premium">
                                DEPLOY INFRASTRUCTURE
                            </button>
                        </Link>
                    </div>
                </div>
            </section >

        </div >
    );
};

export default Features;

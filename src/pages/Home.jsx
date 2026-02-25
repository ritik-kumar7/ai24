import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroData, problemDeepDive, architectureData, useCases } from '../data/mockData';
import { Link } from 'react-router-dom';
import { Leaf, TrendingUp, Bot, Building, Brain, LineChart, Layers, Globe2 } from 'lucide-react';
import './Home.css';

import uaeImg from '../assets/country_image/uae_country.jpg';
import indiaImg from '../assets/country_image/india.png';
import singaporeImg from '../assets/country_image/singapur.png';
import usaImg from '../assets/country_image/usa.png';
import ukImg from '../assets/country_image/uk.jpg';
import australiaImg from '../assets/country_image/australia.png';
import canadaImg from '../assets/country_image/canada.png';
import dubaiSideImg from '../assets/images/dubai_sideDiv.png';

const globalFootprints = [
    { name: 'UAE', image: uaeImg },
    { name: 'India', image: indiaImg },
    { name: 'Singapore', image: singaporeImg },
    { name: 'USA', image: usaImg },
    { name: 'UK', image: ukImg },
    { name: 'Australia', image: australiaImg },
    { name: 'Canada', image: canadaImg }
];

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const storyRef = useRef(null);
    const problemRef = useRef(null);
    const archRef = useRef(null);
    const showcaseRef = useRef(null);

    const { scrollYProgress } = useScroll();
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    const [activeGI, setActiveGI] = useState(0);
    const [activeWhy, setActiveWhy] = useState(0);
    const [activeArch, setActiveArch] = useState(0);

    const giServices = [
        {
            icon: Leaf,
            title: "Startup Growth Consulting",
            desc: "End-to-end growth strategy tailored for early-stage startups to establish product-market fit and accelerate traction."
        },
        {
            icon: TrendingUp,
            title: "Revenue Growth Consulting",
            desc: "Data-driven revenue optimization. We design structured, repeatable growth processes that maximize LTV and minimize CAC."
        },
        {
            icon: Bot,
            title: "AI Marketing Automation",
            desc: "Intelligent automation workflows designed to nurture leads, personalize user journeys, and accelerate your revenue engines."
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Story Text Reveal
            gsap.fromTo('.story-word',
                { opacity: 0.1, y: 10 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: storyRef.current,
                        start: 'top 70%',
                        end: 'bottom 40%',
                        scrub: 1
                    }
                }
            );

            // Architecture logic is now handled natively via Framer Motion useScroll/Viewport triggers.

            // Problem Reveal
            gsap.fromTo('.problem-item',
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    stagger: 0.2,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: problemRef.current,
                        start: 'top 60%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    const textVariants = {
        hidden: { opacity: 0, y: 40, rotateX: -45 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: { delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        })
    };

    const storyContent = "In a world drowning in data, human scale is the bottleneck. We abstract complexity, deploying autonomous systems that operate at the speed of thought. This isn't just software. This is infrastructure for the intelligent enterprise.";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="home-page"
        >
            {/* 1. CINEMATIC HERO */}
            <section ref={heroRef} className="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '100px', overflow: 'hidden' }}>
                <div className="container" style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

                        <div style={{ perspective: '1200px', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                style={{
                                    display: 'inline-block',
                                    padding: '6px 16px',
                                    border: '1px solid rgba(216, 181, 106, 0.3)',
                                    borderRadius: '50px',
                                    fontSize: '12px',
                                    fontWeight: 400,
                                    color: 'var(--gold2)',
                                    letterSpacing: '0.15em',
                                    textTransform: 'uppercase',
                                    marginBottom: '30px',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                {heroData.tagline}
                            </motion.div>

                            <h1 style={{ fontSize: 'clamp(48px, 6vw, 84px)', marginBottom: '40px', lineHeight: 1.2, fontWeight: 500, letterSpacing: '0.02em', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {heroData.headline.split(' ').slice(0, 2).map((word, i) => (
                                        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingRight: '16px' }}>
                                            <motion.span
                                                custom={i}
                                                variants={textVariants}
                                                initial="hidden"
                                                animate="visible"
                                                style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                                                className={['Growth', 'Architecture', 'Enterprises'].includes(word) ? 'goldText' : ''}
                                                data-text={word}
                                            >
                                                {word}
                                            </motion.span>
                                        </span>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                    {heroData.headline.split(' ').slice(2).map((word, i) => (
                                        <span key={i + 2} style={{ display: 'inline-block', overflow: 'hidden', paddingRight: '16px' }}>
                                            <motion.span
                                                custom={i + 2}
                                                variants={textVariants}
                                                initial="hidden"
                                                animate="visible"
                                                style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                                                className={['Growth', 'Architecture', 'Enterprises'].includes(word) ? 'goldText' : ''}
                                                data-text={word}
                                            >
                                                {word}
                                            </motion.span>
                                        </span>
                                    ))}
                                </div>
                            </h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.8 }}
                                style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto 50px', color: 'rgba(233, 238, 247, 0.8)' }}
                            >
                                {heroData.subheadline}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                                style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}
                            >
                                <Link to="/contact" className="btn btnPrimary" data-text={heroData.cta.primary} style={{ padding: '18px 40px', fontSize: '16px' }}>
                                    {heroData.cta.primary}
                                </Link>
                                <Link to="/services" className="btn glass-panel" style={{ padding: '18px 40px', fontSize: '16px' }}>
                                    {heroData.cta.secondary}
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION: GROWTH INFRASTRUCTURE */}
            <section className="responsive-section-padding" style={{ padding: '150px 0', position: 'relative', overflow: 'hidden' }}>
                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        style={{ marginBottom: '100px', textAlign: 'center' }}
                    >
                        <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: '30px', fontWeight: 500, lineHeight: 1.2 }}>
                            Growth Infrastructure <br />
                            <span className="goldText">Built for Scale</span>
                        </h2>
                        <p style={{ fontSize: '22px', color: 'rgba(233, 238, 247, 0.7)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
                            We design AI-powered systems that enable predictable, measurable, and scalable business growth.
                        </p>
                    </motion.div>

                    <div className="gi-hub-container">
                        <div className="gi-sidebar">
                            {giServices.map((item, index) => (
                                <div
                                    key={index}
                                    className={`gi-nav-item ${activeGI === index ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveGI(index)}
                                    // For mobile/touch capability
                                    onClick={() => setActiveGI(index)}
                                >
                                    <h3 className="gi-nav-title">{item.title}</h3>
                                    <p className="gi-nav-desc">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="gi-visualizer">
                            {/* Animated Background Rings */}
                            <div className="gi-ring gi-ring-1"></div>
                            <div className="gi-ring gi-ring-2"></div>
                            <div className="gi-ring gi-ring-3"></div>

                            {/* Glowing Ambient effect */}
                            <div className="gi-glow-ambient"></div>

                            {/* Particles */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={`p-${i}`}
                                    className="gi-particle"
                                    animate={{
                                        y: [0, -100, 0],
                                        x: [0, (i % 2 === 0 ? 50 : -50), 0],
                                        opacity: [0, 0.8, 0],
                                        scale: [0.5, 1.5, 0.5]
                                    }}
                                    transition={{
                                        duration: 4 + i * 1.5,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    style={{
                                        left: `${15 + i * 15}%`,
                                        top: `${80 - i * 10}%`
                                    }}
                                />
                            ))}

                            <div className="gi-core">
                                <div className="gi-core-aura"></div>
                                {giServices.map((service, index) => (
                                    index === activeGI && (
                                        <motion.div
                                            key={index}
                                            initial={{ scale: 0, rotate: -90, opacity: 0 }}
                                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                            className="gi-core-icon"
                                            style={{ position: 'absolute' }}
                                        >
                                            <service.icon size={60} strokeWidth={1.2} />
                                        </motion.div>
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background decorative elements */}
                <div style={{ position: 'absolute', top: '10%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(216, 181, 106, 0.04) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(216, 181, 106, 0.03) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>
            </section>

            {/* NEW SECTION: WHY AI24 - BENTO GRID MULTIVERSE */}
            <section className="responsive-section-padding" style={{ padding: '150px 0', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(30, 40, 60, 0.2) 0%, transparent 60%)', zIndex: 0, pointerEvents: 'none' }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    <div style={{ marginBottom: '100px', textAlign: 'center', perspective: '1200px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="goldText"
                            style={{ fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '30px', fontWeight: 600, display: 'inline-block' }}
                        >
                            WHY AI24
                        </motion.div>

                        <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: '40px', fontWeight: 500, lineHeight: 1.1, display: 'flex', flexDirection: 'column', alignItems: 'center', perspective: '1000px' }}>
                            <motion.div
                                initial={{ y: 60, opacity: 0, rotateX: -40, filter: 'blur(10px)' }}
                                whileInView={{ y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)' }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                style={{ display: 'inline-block', transformOrigin: "bottom center" }}
                            >
                                Not Just Marketing —
                            </motion.div>
                            <motion.div
                                initial={{ y: 60, opacity: 0, rotateX: -40, filter: 'blur(10px)', scale: 0.95 }}
                                whileInView={{ y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', scale: 1 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                                className="goldText"
                                style={{ display: 'inline-block', transformOrigin: "bottom center", marginTop: '5px' }}
                            >
                                Growth Engineering
                            </motion.div>
                        </h2>

                        <motion.div
                            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <p style={{ fontSize: '24px', color: 'rgba(233, 238, 247, 0.7)', maxWidth: '900px', margin: '0 auto', lineHeight: 1.6 }}>
                                We build structured growth infrastructure that compounds over time, replacing campaign-based tactics that fade away.
                            </p>
                        </motion.div>
                    </div>

                    <div className="nexus-container">
                        <div className="nexus-center">
                            <div className="nexus-core-pulse"></div>
                            <div className="nexus-core-orb">
                                <div className="nexus-core-logo">AI24</div>
                                <div className="nexus-orbit-rings"></div>
                            </div>
                        </div>

                        {/* Top Left */}
                        <div className="nexus-node node-tl">
                            <div className="nexus-conn-line line-tl"></div>
                            <div className="nexus-node-card">
                                <div className="nexus-icon"><Building size={28} /></div>
                                <h3>Growth Infrastructure</h3>
                                <p>We don't run isolated campaigns. We engineer holistic, structured growth systems designed to compound your returns month over month.</p>
                            </div>
                        </div>

                        {/* Top Right */}
                        <div className="nexus-node node-tr">
                            <div className="nexus-conn-line line-tr"></div>
                            <div className="nexus-node-card">
                                <div className="nexus-icon"><Brain size={28} /></div>
                                <h3>AI-Powered Intelligence</h3>
                                <p>Deep native integration of advanced AI for continuous task automation, performance tracking, and granular optimization.</p>
                            </div>
                        </div>

                        {/* Bottom Left */}
                        <div className="nexus-node node-bl">
                            <div className="nexus-conn-line line-bl"></div>
                            <div className="nexus-node-card">
                                <div className="nexus-icon"><LineChart size={28} /></div>
                                <h3>Measurable Results</h3>
                                <p>Abandon vanity metrics. Accelerate top-line revenue, lower CAC, and logically expand LTV with precision predictability.</p>
                            </div>
                        </div>

                        {/* Bottom Right */}
                        <div className="nexus-node node-br">
                            <div className="nexus-conn-line line-br"></div>
                            <div className="nexus-node-card">
                                <div className="nexus-icon"><Layers size={28} /></div>
                                <h3>Built for Hyper-Scale</h3>
                                <p>Rigorously designed architectures to seamlessly absorb 10x volume increases without fracturing. Systems that grow organically.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION: HEADQUARTERED IN DUBAI */}
            <section className="responsive-section-padding" style={{ padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="container">
                    <div className="hq-grid">
                        <div>
                            <div className="goldText" style={{ fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 600 }}>HEADQUARTERED IN DUBAI</div>
                            <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: '30px', fontWeight: 500 }}>Global Vision,<br />Dubai <span className="goldText">Excellence</span></h2>
                            <p style={{ fontSize: '20px', color: 'var(--text)', marginBottom: '40px', lineHeight: 1.6 }}>
                                From Dubai's innovation hub, we serve ambitious businesses across 7 countries. Our global perspective combined with operational excellence enables us to build growth systems that work at scale.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ color: 'var(--gold)' }}><Building size={32} strokeWidth={1.5} /></div>
                                    <div>
                                        <h4 style={{ fontSize: '22px', marginBottom: '8px' }}>Dubai HQ</h4>
                                        <p style={{ fontSize: '16px', color: 'var(--text)' }}>Strategic location in the heart of innovation</p>
                                    </div>
                                </div>
                                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ color: 'var(--gold)' }}><Globe2 size={32} strokeWidth={1.5} /></div>
                                    <div>
                                        <h4 style={{ fontSize: '22px', marginBottom: '8px' }}>7 Countries</h4>
                                        <p style={{ fontSize: '16px', color: 'var(--text)' }}>Global presence, local expertise</p>
                                    </div>
                                </div>
                                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ color: 'var(--gold)' }}><Layers size={32} strokeWidth={1.5} /></div>
                                    <div>
                                        <h4 style={{ fontSize: '22px', marginBottom: '8px' }}>India Operations</h4>
                                        <p style={{ fontSize: '16px', color: 'var(--text)' }}>Gurgaon, Bangalore, Mumbai</p>
                                    </div>
                                </div>
                                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                                <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                    <div style={{ color: 'var(--gold)' }}><Brain size={32} strokeWidth={1.5} /></div>
                                    <div>
                                        <h4 style={{ fontSize: '22px', marginBottom: '8px' }}>Innovation First</h4>
                                        <p style={{ fontSize: '16px', color: 'var(--text)' }}>AI-powered growth engineering</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel hq-glass-panel" style={{ padding: 0 }}>
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${dubaiSideImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION: GLOBAL FOOTPRINT */}
            <section className="responsive-section-padding" style={{ padding: '80px 0 150px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '400px', background: 'radial-gradient(ellipse, rgba(216, 181, 106, 0.05) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 style={{ fontSize: 'clamp(36px, 5vw, 64px)', marginBottom: '20px', fontWeight: 500 }}>Global <span className="goldText">Footprint</span></h2>
                            <p style={{ fontSize: '20px', color: 'var(--text)', maxWidth: '800px', margin: '0 auto' }}>
                                Establishing dominant infrastructure across primary international markets.
                            </p>
                        </motion.div>
                    </div>

                    <div className="footprint-grid">
                        {globalFootprints.map((country, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, rotateY: 30, scale: 0.9, y: 50 }}
                                whileInView={{ opacity: 1, rotateY: 0, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                                className="footprint-card"
                            >
                                <div className="footprint-img-wrap">
                                    <img src={country.image} alt={`${country.name} Office`} className="footprint-img" />
                                </div>
                                <div className="footprint-gradient"></div>
                                <div className="footprint-content">
                                    <div className="footprint-title-wrap">
                                        <div className="footprint-dot"></div>
                                        <h3 className="footprint-title">{country.name}</h3>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. PROBLEM BREAKDOWN */}
            <section ref={problemRef} className="responsive-section-padding" style={{ padding: '150px 0', position: 'relative', background: '#020305' }}>
                <div style={{ position: 'absolute', top: '10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(216, 181, 106, 0.05) 0%, transparent 60%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="origin-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            style={{ position: 'sticky', top: '20vh' }}
                        >
                            <div className="goldText" style={{ fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 600 }}>The Origin</div>
                            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginBottom: '30px', lineHeight: 1.1, fontWeight: 500 }}>The Scale <span className="goldText">Bottleneck</span></h2>
                            <p style={{ fontSize: '24px', color: 'rgba(233, 238, 247, 0.7)', lineHeight: 1.6 }}>{problemDeepDive.subtitle}</p>
                        </motion.div>

                        <div className="bottleneck-container">
                            <div className="bottleneck-pipeline"></div>
                            {problemDeepDive.points.map((point, i) => (
                                <motion.div
                                    key={i}
                                    className={`bottleneck-card bottleneck-card-${i + 1}`}
                                    initial={{ opacity: 0, x: 50, rotateY: 20 }}
                                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <div className="bottleneck-glow"></div>
                                    <div className="bottleneck-content">
                                        <div className="bottleneck-status">
                                            <div className="status-dot"></div>
                                            <span>SYSTEM BOTTLENECK_0{i + 1}</span>
                                        </div>
                                        <div className="bottleneck-header">
                                            <span className="bottleneck-index">0{i + 1}</span>
                                            <div className="bottleneck-line"></div>
                                        </div>
                                        <h3 className="bottleneck-title">{point.title}</h3>
                                        <p className="bottleneck-desc">{point.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. SOLUTION ARCHITECTURE (3D Hologram Interface) */}
            <section style={{ height: `${architectureData.layers.length * 100}vh`, position: 'relative', zIndex: 20, background: '#020305', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {/* Sticky UI */}
                <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', zIndex: 50 }}>

                    {/* Background Soft Glow */}
                    <div style={{ position: 'absolute', top: '50%', right: '0%', width: '80vw', height: '80vw', background: 'radial-gradient(circle, rgba(216, 181, 106, 0.08) 0%, transparent 60%)', transform: 'translateY(-50%)', zIndex: 0 }}></div>

                    <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', zIndex: 20 }}>
                        {/* Text Stack Left */}
                        <div className="arch-text-container" style={{ position: 'relative', height: '400px', zIndex: 100 }}>
                            {architectureData.layers.map((layer, i) => (
                                <div key={i} className={`arch-text-block ${activeArch === i ? 'active' : ''}`}>
                                    <div className="goldText" style={{ fontSize: '16px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 400 }}>Architecture Layer 0{i + 1}</div>
                                    <h2 className="arch-heading" style={{ fontSize: 'clamp(48px, 6vw, 84px)', marginBottom: '30px', fontWeight: 400, lineHeight: 1.1 }}>
                                        {layer.name.split(' ')[0]} <span className={i % 2 === 0 ? "goldText" : "iceText"}>{layer.name.split(' ')[1]}</span>
                                    </h2>
                                    <p style={{ fontSize: '26px', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.6, maxWidth: '600px' }}>{layer.detail}</p>
                                </div>
                            ))}
                        </div>

                        {/* Hologram Core Right */}
                        <div className="hologram-wrapper">
                            <div className={`hologram-layer hologram-layer-0 ${activeArch === 0 ? 'active' : ''}`}><div className="hologram-ring"></div></div>
                            <div className={`hologram-layer hologram-layer-1 ${activeArch === 1 ? 'active' : ''}`}><div className="hologram-ring"></div></div>
                            <div className={`hologram-layer hologram-layer-2 ${activeArch === 2 ? 'active' : ''}`}><div className="hologram-ring"></div></div>
                            <div className={`hologram-layer hologram-layer-3 ${activeArch === 3 ? 'active' : ''}`}>
                                <div className="hologram-ring"></div>
                                <div className="hologram-core-dot"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vertical Scroll Triggers */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 100 }}>
                    {architectureData.layers.map((_, i) => (
                        <motion.div
                            key={i}
                            style={{ height: '100vh' }}
                            onViewportEnter={() => setActiveArch(i)}
                            viewport={{ amount: 0.1, margin: "-100px 0px" }}
                        />
                    ))}
                </div>
            </section>

            {/* 6. USE CASES STORYTELLING */}
            <section className="responsive-section-padding" style={{ padding: '200px 0', position: 'relative', background: '#020305' }}>
                <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100vw', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(216, 181, 106, 0.3), transparent)' }}></div>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', flexWrap: 'wrap', gap: '30px' }}>
                        <div style={{ maxWidth: '600px' }}>
                            <div className="goldText" style={{ fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px', fontWeight: 600 }}>Real-World Impact</div>
                            <h2 style={{ fontSize: 'clamp(40px, 5vw, 64px)', marginBottom: '20px', lineHeight: 1.1, fontWeight: 500 }}>Intelligence <span className="goldText">Applied</span></h2>
                            <p style={{ fontSize: '24px', color: 'rgba(233, 238, 247, 0.7)' }}>Theoretical AI is useless. We focus on deterministic revenue outcomes.</p>
                        </div>
                    </div>

                    <div className="usecase-grid">
                        {useCases.map((uc, i) => (
                            <motion.div
                                key={i}
                                className="usecase-card"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="usecase-bg-grid"></div>
                                <div className="usecase-hover-glow"></div>

                                <div className="usecase-content">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                                        <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }}></div>
                                        <div style={{ fontSize: '14px', letterSpacing: '0.15em', color: 'var(--gold)' }}>USE CASE 0{i + 1}</div>
                                    </div>
                                    <h3>{uc.title}</h3>
                                    <p>{uc.desc}</p>
                                </div>

                                <div className="usecase-metric">
                                    <div className="usecase-metric-value">{uc.metric}</div>
                                    <div className="usecase-metric-label">Proven Impact</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. STATS ANIMATED (Big Numbers) */}
            <section className="responsive-section-padding" style={{ padding: '150px 0', background: 'radial-gradient(ellipse at center, rgba(30, 40, 60, 0.5) 0%, transparent 70%)' }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '40px' }}>
                    <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
                        <div className="big-stat goldText">42%</div>
                        <div style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '20px' }}>CAC Reduction</div>
                    </div>
                    <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
                        <div className="big-stat goldText">3.2x</div>
                        <div style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '20px' }}>LTV Expansion</div>
                    </div>
                    <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
                        <div className="big-stat goldText">150+</div>
                        <div style={{ fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '20px' }}>Global Deployments</div>
                    </div>
                </div>
            </section>

            {/* 8. CTA FINALE */}
            <section className="responsive-section-padding" style={{ padding: '200px 0 150px' }}>
                <div className="container">
                    <div className="glass-panel cta-panel">
                        <h2 style={{ fontSize: 'clamp(48px, 6vw, 84px)', marginBottom: '40px' }}>Scale Beyond <br /><span className="goldText">Human Limits.</span></h2>
                        <p style={{ fontSize: '24px', maxWidth: '600px', margin: '0 auto 60px' }}>Deploy intelligent infrastructure today and dominate your market tomorrow.</p>
                        <Link to="/contact" className="btn btnPrimary cta-btn-responsive">Initiate Transformation</Link>
                    </div>
                </div>
            </section>

            {/* VISUAL DIVIDER */}
            <div className="divider container"></div>

            {/* 9. SCROLL STORY INTRO */}
            <section ref={storyRef} style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.4, maxWidth: '1000px', margin: '0 auto' }}>
                        {storyContent.split(' ').map((word, i) => (
                            <span key={i} className="story-word" style={{ display: 'inline-block', marginRight: '0.3em', opacity: 0.1 }}>
                                {word}
                            </span>
                        ))}
                    </h2>
                </div>
            </section>

        </motion.div >
    );
};

export default Home;

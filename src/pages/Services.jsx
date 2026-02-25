import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { servicesData } from '../data/mockData';
import { Link } from 'react-router-dom';
import './Services.css';
import serviceBg from '../assets/images/service_bg.jpg';

// Service page images
import intelligentRevenueImg from '../assets/service_pageImage/IntelligentREvenue.jpg';
import aiMarketingImg from '../assets/service_pageImage/aiMarkenting.jpg';
import customerSuccessImg from '../assets/service_pageImage/costomer.jpg';
import cognitiveCrmImg from '../assets/service_pageImage/Cognitive CRM Integration.jpg';
import predictiveAnalyticsImg from '../assets/service_pageImage/Predictive Analytics.jpg';
import generativeExperienceImg from '../assets/service_pageImage/genrativeExpreiane.jpg';

const serviceImages = [
    intelligentRevenueImg,
    aiMarketingImg,
    customerSuccessImg,
    cognitiveCrmImg,
    predictiveAnalyticsImg,
    generativeExperienceImg
];

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const listRef = useRef(null);
    const bgContainerRef = useRef(null);

    const { scrollYProgress } = useScroll();
    const mapY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Background color shift based on index
            const colors = [
                'rgba(5,7,11,1)',
                'rgba(26,20,10,0.95)',
                'rgba(10,20,30,0.95)',
                'rgba(15,10,20,0.95)',
                'rgba(5,15,15,0.95)',
                'rgba(20,15,10,0.95)'
            ];

            gsap.utils.toArray('.service-item').forEach((item, i) => {
                const directionX = i % 2 === 0 ? -50 : 50;

                // Content diagonal appearance
                gsap.fromTo(item,
                    { opacity: 0.1, x: directionX, y: 100 },
                    {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        duration: 1.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 80%",
                            end: "center center",
                            scrub: 1
                        }
                    }
                );

                // Background shift timeline
                ScrollTrigger.create({
                    trigger: item,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => gsap.to(bgContainerRef.current, { backgroundColor: colors[i], duration: 1 }),
                    onEnterBack: () => gsap.to(bgContainerRef.current, { backgroundColor: colors[i], duration: 1 })
                });

                // Image Inner Parallax
                gsap.to(item.querySelector('.inner-image'), {
                    yPercent: 30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="services-page"
            style={{ position: 'relative' }}
        >
            {/* Dynamic Background */}
            <div ref={bgContainerRef} style={{ position: 'fixed', inset: 0, zIndex: -2, background: 'rgba(5,7,11,1)', transition: 'background-color 0.5s ease-out' }}></div>
            <motion.div style={{ y: mapY, position: 'fixed', inset: 0, zIndex: -1, background: `url(${serviceBg})`, backgroundSize: 'cover', opacity: 0.2, mixBlendMode: 'screen' }}></motion.div>

            {/* 1. HERO */}
            <section className="services-hero" style={{ paddingTop: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className="hero-gradient-overlay"></div>

                <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="floating-blob blob-gold" />
                <motion.div animate={{ rotate: -360, scale: [1, 1.2, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="floating-blob blob-ice" />

                <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <div className="goldText" style={{ fontSize: '1.2rem', letterSpacing: '0.5em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 700 }}>The Apparatus</div>
                    <h1 className="services-hero-title">
                        Growth <br /><span className="text-stroke">Engines</span>
                    </h1>
                    <p style={{ fontSize: 'clamp(18px, 2vw, 24px)', maxWidth: '800px', margin: '0 auto', color: 'rgba(233,238,247,0.6)', fontWeight: 300, lineHeight: 1.6 }}>
                        End-to-end intelligent capabilities built to architect, execute, and scale predictable revenue generation.
                    </p>
                </div>
            </section>

            {/* 2. SERVICES SCROLL LIST */}
            <div ref={listRef} className="services-scroll-list">

                {/* SVG Connecting Line */}
                <div className="services-center-line"></div>

                {servicesData.map((service, i) => (
                    <div
                        key={i}
                        className="service-item container"
                    >
                        {i % 2 === 0 ? (
                            <>
                                <div className="service-content-col" style={{ textAlign: 'right' }}>
                                    <div className="goldText" style={{ fontSize: '14px', fontWeight: 500, marginBottom: '20px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>0{i + 1}</div>
                                    <h2 style={{ fontSize: 'clamp(40px, 5vw, 56px)', marginBottom: '16px', lineHeight: 1.1, fontWeight: 400 }}>{service.title.split(' ').slice(0, -1).join(' ')} <span className="goldText">{service.title.split(' ').slice(-1)[0]}</span></h2>
                                    <h3 style={{ fontSize: 'clamp(18px, 2vw, 24px)', color: 'var(--ice)', marginBottom: '40px', fontWeight: 300 }}>{service.subtitle}</h3>

                                    <p style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', display: 'inline-block', maxWidth: '500px', lineHeight: 1.7, marginBottom: '40px', color: 'rgba(233,238,247,0.6)', fontWeight: 300 }}>{service.description}</p>

                                    <div className="service-info-box">
                                        <div style={{ marginBottom: '20px', color: 'rgba(233,238,247,0.6)', fontWeight: 300, fontSize: '15px', lineHeight: 1.7 }}><strong className="goldText" style={{ fontWeight: 500 }}>Problem:</strong> {service.solves}</div>
                                        <div style={{ marginBottom: '20px', color: 'rgba(233,238,247,0.6)', fontWeight: 300, fontSize: '15px', lineHeight: 1.7 }}><strong className="goldText" style={{ fontWeight: 500 }}>Vertical:</strong> {service.for}</div>
                                        <div style={{ color: 'rgba(233,238,247,0.6)', fontWeight: 300, fontSize: '15px', lineHeight: 1.7 }}><strong className="goldText" style={{ fontWeight: 500 }}>Deterministic Outcome:</strong> {service.outcome}</div>
                                    </div>
                                </div>

                                <div className="glass-panel service-image-panel">
                                    <img className="inner-image" src={serviceImages[i]} alt={service.title} style={{ position: 'absolute', inset: '-10%', width: '120%', height: '120%', objectFit: 'cover' }} />
                                    <div className="service-overlay"></div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="glass-panel service-image-panel">
                                    <img className="inner-image" src={serviceImages[i]} alt={service.title} style={{ position: 'absolute', inset: '-10%', width: '120%', height: '120%', objectFit: 'cover' }} />
                                    <div className="service-overlay"></div>
                                </div>
                                <div className="service-content-col">
                                    <div className="goldText" style={{ fontSize: '14px', fontWeight: 500, marginBottom: '20px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>0{i + 1}</div>
                                    <h2 style={{ fontSize: 'clamp(40px, 5vw, 56px)', marginBottom: '16px', lineHeight: 1.1, fontWeight: 400 }}>{service.title.split(' ').slice(0, -1).join(' ')} <span className="goldText">{service.title.split(' ').slice(-1)[0]}</span></h2>
                                    <h3 style={{ fontSize: 'clamp(18px, 2vw, 24px)', color: 'var(--ice)', marginBottom: '40px', fontWeight: 300 }}>{service.subtitle}</h3>

                                    <p style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', display: 'inline-block', maxWidth: '500px', lineHeight: 1.7, marginBottom: '40px', color: 'rgba(233,238,247,0.6)', fontWeight: 300 }}>{service.description}</p>

                                    <div className="service-info-box">
                                        <div style={{ marginBottom: '20px', color: 'rgba(233,238,247,0.6)', fontWeight: 300, fontSize: '15px', lineHeight: 1.7 }}><strong className="goldText" style={{ fontWeight: 500 }}>Problem:</strong> {service.solves}</div>
                                        <div style={{ marginBottom: '20px', color: 'rgba(233,238,247,0.6)', fontWeight: 300, fontSize: '15px', lineHeight: 1.7 }}><strong className="goldText" style={{ fontWeight: 500 }}>Vertical:</strong> {service.for}</div>
                                        <div style={{ color: 'rgba(233,238,247,0.6)', fontWeight: 300, fontSize: '15px', lineHeight: 1.7 }}><strong className="goldText" style={{ fontWeight: 500 }}>Deterministic Outcome:</strong> {service.outcome}</div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {/* CTA */}
            <section className="services-cta-section">
                <div className="glass-panel services-cta-box">
                    <h2 style={{ fontSize: 'clamp(32px, 6vw, 84px)', marginBottom: '30px', fontWeight: 400, textTransform: 'uppercase' }}>Stop Buying Campaigns.<br /><span className="goldText">Build Infrastructure.</span></h2>
                    <p style={{ fontSize: 'clamp(16px, 2vw, 24px)', maxWidth: '700px', margin: '0 auto 60px', color: 'rgba(233,238,247,0.6)', fontWeight: 300, lineHeight: 1.6 }}>Integrate our predictive models into your operations today.</p>
                    <Link to="/contact" className="btn btnPrimary" style={{ padding: '24px 60px', fontSize: '18px' }}>Schedule Growth Audit</Link>
                </div>
            </section>

        </motion.div>
    );
};

export default Services;

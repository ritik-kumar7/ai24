import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { contactInfo, faqData } from '../data/mockData';
import './Contact.css';
import contactBg from '../assets/images/contact_bg.jpg';

const Contact = () => {
    const [focusedField, setFocusedField] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);

    const inputVariants = {
        default: { borderColor: 'rgba(255,255,255,0.1)', boxShadow: '0 0 0 rgba(216, 181, 106, 0)', background: 'rgba(0,0,0,0.2)' },
        focused: { borderColor: 'rgba(216, 181, 106, 0.6)', boxShadow: '0 0 30px rgba(216, 181, 106, 0.1)', background: 'rgba(216,181,106,0.02)' }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="contact-page"
            style={{ position: 'relative' }}
        >
            <div style={{ position: 'fixed', inset: 0, background: `url(${contactBg})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2, filter: 'saturate(0.5)', zIndex: -1 }}></div>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, var(--bg) 0%, rgba(5,7,11,0.8) 50%, var(--bg) 100%)', zIndex: -1 }}></div>

            {/* 1. IMMERSIVE HEADER & FORM */}
            <section className="contact-hero-section">
                <div className="container">
                    <div className="contact-hero-grid">

                        <div>
                            <div className="goldText" style={{ fontSize: '16px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '30px', fontWeight: 600 }}>Initiation Sequence</div>
                            <h1 className="contact-title">
                                Let's Build <br /> <span className="contact-title-stroke">Together.</span>
                            </h1>
                            <p className="contact-desc">
                                Submitting this form begins a deterministic process. Within 24 hours, our architects will evaluate your ecosystem and propose a growth blueprint.
                            </p>

                            <div className="contact-info-grid">
                                <div>
                                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: '10px' }}>Headquarters</div>
                                    <div style={{ fontSize: '20px', lineHeight: 1.6 }}>{contactInfo.headquarters}</div>
                                </div>
                                <div>
                                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--ice)', marginBottom: '10px' }}>Global Operations</div>
                                    <div style={{ fontSize: '20px', lineHeight: 1.6 }}>{contactInfo.operations}</div>
                                </div>
                                <div style={{ gridColumn: '1 / -1' }}>
                                    <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', marginBottom: '10px' }}>Direct Intelligence</div>
                                    <div className="goldText" style={{ fontSize: '32px', fontFamily: 'Space Grotesk' }}>{contactInfo.email}</div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel contact-form-panel">
                            <h3 className="contact-form-title">Request Architecture Audit</h3>
                            <form style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                                <div style={{ position: 'relative' }}>
                                    <motion.input
                                        type="text"
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        variants={inputVariants}
                                        initial="default"
                                        animate={focusedField === 'name' ? 'focused' : 'default'}
                                        placeholder="Full Name"
                                        style={{ width: '100%', padding: '24px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '18px', outline: 'none', transition: 'box-shadow 0.3s' }}
                                    />
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <motion.input
                                        type="email"
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        variants={inputVariants}
                                        initial="default"
                                        animate={focusedField === 'email' ? 'focused' : 'default'}
                                        placeholder="Corporate Email"
                                        style={{ width: '100%', padding: '24px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '18px', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <motion.input
                                        type="url"
                                        onFocus={() => setFocusedField('url')}
                                        onBlur={() => setFocusedField(null)}
                                        variants={inputVariants}
                                        initial="default"
                                        animate={focusedField === 'url' ? 'focused' : 'default'}
                                        placeholder="Company URL"
                                        style={{ width: '100%', padding: '24px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '18px', outline: 'none' }}
                                    />
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <motion.textarea
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        variants={inputVariants}
                                        initial="default"
                                        animate={focusedField === 'message' ? 'focused' : 'default'}
                                        placeholder="Describe your current growth bottlenecks"
                                        rows={5}
                                        style={{ width: '100%', padding: '24px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff', fontSize: '18px', outline: 'none', resize: 'none' }}
                                    />
                                </div>

                                <button type="button" className="btn btnPrimary" style={{ padding: '24px', width: '100%', fontSize: '18px', letterSpacing: '0.1em', marginTop: '20px' }}>Initiate Sequence</button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. FAQ SECTION */}
            <section className="faq-section">
                <div className="container faq-grid">
                    <div className="faq-sticky-header">
                        <div className="goldText" style={{ fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 20px', fontWeight: 600 }}>Clarification</div>
                        <h2 className="faq-title">Operational <br />FAQ</h2>
                        <p className="faq-desc">Detailed perspectives on our deployment, pricing, and infrastructure modeling.</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {faqData.map((faq, i) => (
                            <div
                                key={i}
                                className={`glass-panel faq-panel ${openFaq === i ? 'active' : ''}`}
                                style={{
                                    border: openFaq === i ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)'
                                }}
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <div className="faq-header">
                                    <h3 className="faq-question" style={{ color: openFaq === i ? 'var(--gold)' : 'var(--text)' }}>{faq.question}</h3>
                                    <div className="faq-icon" style={{ color: openFaq === i ? 'var(--gold)' : 'rgba(255,255,255,0.3)', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</div>
                                </div>

                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: 'auto', marginTop: '24px' }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            style={{ overflow: 'hidden' }}
                                        >
                                            <p style={{ fontSize: '18px', lineHeight: 1.8, color: 'rgba(233, 238, 247, 0.8)' }}>
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </motion.div>
    );
};

export default Contact;

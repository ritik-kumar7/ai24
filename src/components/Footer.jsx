import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Footer = () => {
    return (
        <footer style={{
            position: 'relative',
            zIndex: 10,
            marginTop: '80px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            background: 'linear-gradient(180deg, rgba(5,7,11,0) 0%, rgba(5,7,11,0.8) 100%)',
            paddingTop: '80px',
            paddingBottom: '40px'
        }}>
            {/* Ambient Background Glow for Footer */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                right: '20%',
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(216, 181, 106, 0.2), transparent)',
                boxShadow: '0 0 40px 2px rgba(216, 181, 106, 0.1)'
            }} />

            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '60px',
                    marginBottom: '80px'
                }}>
                    {/* Brand Column */}
                    <div>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '14px',
                                background: 'radial-gradient(circle at 30% 30%, rgba(242, 220, 155, .30), transparent 55%), linear-gradient(135deg, rgba(216, 181, 106, .26), rgba(183, 146, 70, .06))',
                                border: '1px solid rgba(216, 181, 106, .28)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <motion.div
                                    animate={{ x: ["-150%", "150%"] }}
                                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                    style={{
                                        position: 'absolute',
                                        inset: '-40%',
                                        background: 'linear-gradient(120deg, transparent 35%, rgba(242, 220, 155, .22), transparent 65%)',
                                        transform: 'rotate(25deg)'
                                    }}
                                />
                            </div>
                            <div>
                                <div style={{ fontWeight: 800, letterSpacing: '.14em', fontSize: '18px' }}>Ai24</div>
                                <span style={{ display: 'block', fontSize: '10px', letterSpacing: '.26em', color: 'rgba(216, 181, 106, .80)', marginTop: '2px' }}>
                                    ENABLING INTELLIGENCE
                                </span>
                            </div>
                        </Link>
                        <p style={{ fontSize: '15px', color: 'rgba(233, 238, 247, 0.6)', maxWidth: '320px', lineHeight: 1.8 }}>
                            Building predictable revenue systems through AI-powered marketing and cognitive architecture. We turn data into your ultimate competitive edge.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '24px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Navigation</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {['About', 'Features', 'Services', 'Contact'].map((item) => (
                                <Link key={item} to={`/${item.toLowerCase()}`} style={{ position: 'relative', width: 'fit-content' }}>
                                    <motion.span
                                        style={{ color: 'rgba(233, 238, 247, 0.6)', fontSize: '15px', display: 'block' }}
                                        whileHover={{ color: '#E9EEF7', x: 4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {item}
                                    </motion.span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '24px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Operations</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: 'rgba(233, 238, 247, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Direct Intelligence</div>
                                <a href="mailto:hello@ai24.com" className="goldText" style={{ fontSize: '18px', fontWeight: 500, display: 'inline-block' }}>hello@ai24.com</a>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: 'rgba(233, 238, 247, 0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>Global Headquarters</div>
                                <p style={{ fontSize: '15px', color: 'rgba(233, 238, 247, 0.6)', lineHeight: 1.6 }}>
                                    Dubai International <br /> Financial Centre
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '32px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    gap: '20px'
                }}>
                    <div style={{ fontSize: '13px', color: 'rgba(233, 238, 247, 0.4)' }}>
                        © {new Date().getFullYear()} Ai24. All rights reserved.
                    </div>
                    <div style={{ display: 'flex', gap: '30px' }}>
                        <Link to="#" style={{ position: 'relative' }}>
                            <motion.span style={{ fontSize: '13px', color: 'rgba(233, 238, 247, 0.4)', display: 'block' }} whileHover={{ color: 'rgba(216, 181, 106, 0.8)' }}>Privacy Policy</motion.span>
                        </Link>
                        <Link to="#" style={{ position: 'relative' }}>
                            <motion.span style={{ fontSize: '13px', color: 'rgba(233, 238, 247, 0.4)', display: 'block' }} whileHover={{ color: 'rgba(216, 181, 106, 0.8)' }}>Terms of Service</motion.span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

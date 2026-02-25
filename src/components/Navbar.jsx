import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Features", path: "/features" },
        { name: "Services", path: "/services" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`nav ${scrolled ? 'scrolled' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '18px 0',
                transition: 'all .35s ease'
            }}
        >
            <div className="container">
                <div
                    className="inner"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 18px',
                        borderRadius: '18px',
                        background: scrolled ? 'rgba(5, 7, 11, .58)' : 'transparent',
                        border: scrolled ? '1px solid rgba(255, 255, 255, .12)' : '1px solid transparent',
                        backdropFilter: scrolled ? 'blur(14px)' : 'none',
                        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                >
                    <Link to="/" className="brand" style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '0 0 auto', minWidth: '210px' }}>
                        <div
                            className="mark"
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '14px',
                                background: 'radial-gradient(circle at 30% 30%, rgba(242, 220, 155, .30), transparent 55%), linear-gradient(135deg, rgba(216, 181, 106, .26), rgba(183, 146, 70, .06))',
                                border: '1px solid rgba(216, 181, 106, .28)',
                                boxShadow: '0 18px 70px rgba(216, 181, 106, .10)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
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
                            <div style={{ fontWeight: 800, letterSpacing: '.14em', fontSize: '14px' }}>Ai24</div>
                            <span style={{ display: 'block', fontSize: '10px', letterSpacing: '.26em', color: 'rgba(216, 181, 106, .80)', marginTop: '2px' }}>
                                ENABLING INTELLIGENCE
                            </span>
                        </div>
                    </Link>

                    <ul
                        className="menu nav-desktop-menu"
                        style={{
                            display: 'flex',
                            gap: '18px',
                            alignItems: 'center',
                            listStyle: 'none',
                            flex: '1 1 auto',
                            justifyContent: 'center'
                        }}
                    >
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    style={{
                                        color: location.pathname === link.path ? '#E9EEF7' : 'rgba(233, 238, 247, .78)',
                                        textDecoration: 'none',
                                        fontSize: '12px',
                                        letterSpacing: '.08em',
                                        textTransform: 'uppercase',
                                        position: 'relative',
                                        padding: '10px 6px',
                                        transition: 'color .25s ease'
                                    }}
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="navIndicator"
                                            style={{
                                                position: 'absolute',
                                                left: '6px',
                                                right: '6px',
                                                bottom: '6px',
                                                height: '1px',
                                                background: 'linear-gradient(90deg, transparent, rgba(216, 181, 106, .7), transparent)'
                                            }}
                                        />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="navActions" style={{ display: 'flex', gap: '10px' }}>
                        <Link to="/contact" className="btn btnPrimary">Start a Project</Link>
                    </div>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="mobile-nav-overlay"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            className="mobile-close-btn"
                            onClick={() => setMenuOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '30px',
                                right: '30px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text)',
                                cursor: 'pointer',
                                zIndex: 1001
                            }}
                        >
                            <X size={36} />
                        </button>

                        <ul className="mobile-nav-links">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="mobile-nav-link"
                                        onClick={() => setMenuOpen(false)}
                                        style={{
                                            color: location.pathname === link.path ? 'var(--gold)' : 'rgba(233, 238, 247, .78)',
                                        }}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li style={{ marginTop: '20px' }}>
                                <Link onClick={() => setMenuOpen(false)} to="/contact" className="btn btnPrimary">Start a Project</Link>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

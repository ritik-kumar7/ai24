import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

import dubaiBg from '../assets/images/dubai-homepage-heroBg.avif';
import aboutBg from '../assets/images/about_bg.jpg';
import featuresBg from '../assets/images/features.jpg';
import servicesBg from '../assets/images/service_bg.jpg';
import contactBg from '../assets/images/contact_bg.jpg';

export const BackgroundLayers = () => {
    const location = useLocation();
    const bgRef = useRef(null);
    const overlayRef = useRef(null);

    const getBgVar = (pathname) => {
        switch (pathname) {
            case '/': return `url(${dubaiBg})`;
            case '/about': return `url(${aboutBg})`;
            case '/features': return `url(${featuresBg})`;
            case '/services': return `url(${servicesBg})`;
            case '/contact': return `url(${contactBg})`;
            default: return `url(${dubaiBg})`;
        }
    };

    useEffect(() => {
        // Change background image dynamically
        if (bgRef.current) {
            bgRef.current.style.backgroundImage = getBgVar(location.pathname);

            // GSAP transition effect on route change
            gsap.fromTo(bgRef.current,
                { scale: 1.1, filter: 'saturate(0)' },
                { scale: 1.05, filter: 'saturate(1.05)', duration: 1.5, ease: "power2.out" }
            );

            gsap.fromTo(overlayRef.current,
                { opacity: 0.8 },
                { opacity: 1, duration: 1 }
            );
        }
    }, [location.pathname]);

    return (
        <>
            <div ref={bgRef} className="bgImage"></div>
            <div ref={overlayRef} className="bgOverlay"></div>
            <div className="aiFlow"></div>
            <div className="grain"></div>
        </>
    );
};

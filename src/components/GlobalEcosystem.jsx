import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './GlobalEcosystem.css';

gsap.registerPlugin(ScrollTrigger);

const cities = [
  { name: 'Dubai', subtitle: 'HQ', image: '/assets/about_city/dubai.jpg', coords: { x: 60, y: 45 } },
  { name: 'New York', subtitle: '', image: '/assets/about_city/newyork.jpg', coords: { x: 25, y: 35 } },
  { name: 'London', subtitle: '', image: '/assets/about_city/london.jpg', coords: { x: 48, y: 30 } },
  { name: 'Singapore', subtitle: '', image: '/assets/about_city/singapore.jpg', coords: { x: 75, y: 55 } },
  { name: 'Bangalore', subtitle: '', image: '/assets/about_city/bangalore.jpg', coords: { x: 68, y: 52 } },
  { name: 'Toronto', subtitle: '', image: '/assets/about_city/toronto.jpg', coords: { x: 22, y: 32 } }
];

export default function GlobalEcosystem() {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Dark cinematic entrance
      tl.to(section, { backgroundColor: '#0a0e27', duration: 0.3 })
        .to('.ge-title', { opacity: 1, y: 0, duration: 0.4 }, 0.2);

      // Animate each city with unique timing
      cities.forEach((city, i) => {
        const card = cardsRef.current[i];
        const delay = i * 0.6;

        // Beam travel effect
        tl.to(`.ge-beam-${i}`, {
          opacity: 1,
          scale: 1,
          duration: 0.3
        }, delay)
        .to(`.ge-beam-${i}`, { opacity: 0, duration: 0.2 }, delay + 0.3);

        // Card burst in
        tl.fromTo(card, 
          { scale: 0, rotateY: -45, opacity: 0, filter: 'blur(20px)' },
          { 
            scale: 1, 
            rotateY: 0, 
            opacity: 1, 
            filter: 'blur(0px)',
            duration: 0.5,
            ease: 'back.out(1.7)'
          }, 
          delay + 0.2
        );

        // Text stagger
        tl.fromTo(`.ge-city-name-${i} span`,
          { opacity: 0, y: 20, rotateX: -90 },
          { 
            opacity: 1, 
            y: 0, 
            rotateX: 0,
            stagger: 0.03,
            duration: 0.4
          },
          delay + 0.4
        );

        // Pulse glow
        tl.to(`.ge-glow-${i}`, {
          opacity: 0.6,
          scale: 1.2,
          duration: 0.4
        }, delay + 0.5);

        // Map rotation subtle
        tl.to(mapRef.current, {
          rotation: i * 2,
          duration: 0.6
        }, delay);
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    gsap.to(card, {
      rotateY: x * 10,
      rotateX: -y * 10,
      duration: 0.3
    });
  };

  const handleMouseLeave = (index) => {
    gsap.to(cardsRef.current[index], {
      rotateY: 0,
      rotateX: 0,
      duration: 0.5
    });
  };

  return (
    <section ref={sectionRef} className="ge-section">
      {/* Animated Background */}
      <div className="ge-bg">
        <div className="ge-particles"></div>
        <div ref={mapRef} className="ge-map"></div>
        <div className="ge-grid"></div>
      </div>

      {/* Title */}
      <div className="ge-title">
        <h2>🌍 Global Ecosystem</h2>
        <p>IMMERSIVE CINEMATIC EXPERIENCE</p>
      </div>

      {/* City Cards */}
      <div className="ge-cards">
        {cities.map((city, i) => (
          <div key={i}>
            {/* Beam Effect */}
            <div 
              className={`ge-beam ge-beam-${i}`}
              style={{ left: `${city.coords.x}%`, top: `${city.coords.y}%` }}
            ></div>

            {/* Card */}
            <div
              ref={el => cardsRef.current[i] = el}
              className="ge-card"
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div className={`ge-glow ge-glow-${i}`}></div>
              <div className="ge-card-inner">
                <img src={city.image} alt={city.name} />
                <div className="ge-card-overlay"></div>
              </div>
              <h3 className={`ge-city-name ge-city-name-${i}`}>
                {city.name.split('').map((char, j) => (
                  <span key={j}>{char}</span>
                ))}
                {city.subtitle && <span className="ge-subtitle">{city.subtitle}</span>}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Network Lines */}
      <svg className="ge-network" viewBox="0 0 100 100" preserveAspectRatio="none">
        {cities.map((city, i) => 
          i < cities.length - 1 && (
            <line
              key={i}
              x1={city.coords.x}
              y1={city.coords.y}
              x2={cities[i + 1].coords.x}
              y2={cities[i + 1].coords.y}
              className="ge-line"
            />
          )
        )}
      </svg>
    </section>
  );
}

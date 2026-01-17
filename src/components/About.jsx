import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

// Individual highlight item with its own scroll trigger
const HighlightItem = ({ label, value, index }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="highlight-item"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span className="highlight-value">{value}</span>
      <span className="highlight-label">{label}</span>
    </motion.div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const [titleRef, titleVisible] = useScrollReveal({ threshold: 0.5 });
  const [textRef, textVisible] = useScrollReveal({ threshold: 0.3 });
  const [ctaRef, ctaVisible] = useScrollReveal({ threshold: 0.5 });

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Card dealing animations - cards slide in from right, staggered
  // First card deals at 30-45%, second at 40-55%, third at 50-65%
  const card1X = useTransform(scrollYProgress, [0.25, 0.40], [200, 0]);
  const card1Rotate = useTransform(scrollYProgress, [0.25, 0.40], [15, -2]);
  const card1Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0, 1]);

  const card2X = useTransform(scrollYProgress, [0.32, 0.47], [200, 0]);
  const card2Rotate = useTransform(scrollYProgress, [0.32, 0.47], [15, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.32, 0.42], [0, 1]);

  const card3X = useTransform(scrollYProgress, [0.39, 0.54], [200, 0]);
  const card3Rotate = useTransform(scrollYProgress, [0.39, 0.54], [15, 2]);
  const card3Opacity = useTransform(scrollYProgress, [0.39, 0.49], [0, 1]);

  const images = [
    { src: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=400&h=500&fit=crop', alt: 'Submarine' },
    { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=500&fit=crop', alt: 'Coding' },
    { src: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=400&h=500&fit=crop', alt: 'Mountains' },
  ];

  const cardTransforms = [
    { x: card1X, rotate: card1Rotate, opacity: card1Opacity },
    { x: card2X, rotate: card2Rotate, opacity: card2Opacity },
    { x: card3X, rotate: card3Rotate, opacity: card3Opacity },
  ];

  const highlights = [
    { label: 'Navy Veteran', value: '8 Years' },
    { label: 'Education', value: 'B.S. Software Engineering' },
    { label: 'Clearance', value: 'Secret' },
  ];

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <motion.h2
              ref={titleRef}
              initial={{ opacity: 0, x: -60 }}
              animate={titleVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Who I Am
            </motion.h2>

            <motion.div
              ref={textRef}
              className="about-text"
              initial={{ opacity: 0, x: -40 }}
              animate={textVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={textVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                I'm a curious engineer who thrives at the intersection of hardware and software.
                With 8 years in the U.S. Navy as a Hull Maintenance Technician and a B.S. in
                Software Engineering from Iowa State University, I bring a unique perspective
                to every problem I tackle.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={textVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                When I'm not writing code, you'll find me snowboarding, playing chess, diving
                into battle royale games, or exploring the world of finance and crypto. I believe
                the best engineers are endlessly curious—and I never stop learning.
              </motion.p>

              <div className="about-highlights">
                {highlights.map((item, index) => (
                  <HighlightItem key={index} {...item} index={index} />
                ))}
              </div>

              <motion.a
                ref={ctaRef}
                href="#contact"
                className="btn btn-outline"
                initial={{ opacity: 0, y: 20 }}
                animate={ctaVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                Let's Connect
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </motion.a>
            </motion.div>
          </div>

          <div className="about-images">
            {images.map((img, index) => (
              <motion.div
                key={index}
                className="about-image"
                style={{
                  x: cardTransforms[index].x,
                  rotate: cardTransforms[index].rotate,
                  opacity: cardTransforms[index].opacity,
                }}
              >
                <img src={img.src} alt={img.alt} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

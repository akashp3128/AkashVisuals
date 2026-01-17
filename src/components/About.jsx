import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);

  // Scroll progress for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Phase 1: Text content comes in (0% - 25% scroll) and STAYS
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const titleX = useTransform(scrollYProgress, [0.05, 0.15], [-60, 0]);

  const textOpacity = useTransform(scrollYProgress, [0.10, 0.20], [0, 1]);
  const textX = useTransform(scrollYProgress, [0.10, 0.20], [-40, 0]);

  const highlightsOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const highlightsY = useTransform(scrollYProgress, [0.15, 0.25], [30, 0]);

  const ctaOpacity = useTransform(scrollYProgress, [0.20, 0.28], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.20, 0.28], [20, 0]);

  // Phase 2: Cards deal in one by one (each card gets its own scroll range)
  // Card 1: 30% - 42%
  const card1X = useTransform(scrollYProgress, [0.30, 0.42], [250, 0]);
  const card1Rotate = useTransform(scrollYProgress, [0.30, 0.42], [20, -3]);
  const card1Opacity = useTransform(scrollYProgress, [0.30, 0.38], [0, 1]);

  // Card 2: 42% - 54%
  const card2X = useTransform(scrollYProgress, [0.42, 0.54], [250, 0]);
  const card2Rotate = useTransform(scrollYProgress, [0.42, 0.54], [20, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.42, 0.50], [0, 1]);

  // Card 3: 54% - 66%
  const card3X = useTransform(scrollYProgress, [0.54, 0.66], [250, 0]);
  const card3Rotate = useTransform(scrollYProgress, [0.54, 0.66], [20, 3]);
  const card3Opacity = useTransform(scrollYProgress, [0.54, 0.62], [0, 1]);

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
              style={{
                opacity: titleOpacity,
                x: titleX,
              }}
            >
              Who I Am
            </motion.h2>

            <motion.div
              className="about-text"
              style={{
                opacity: textOpacity,
                x: textX,
              }}
            >
              <p>
                I'm a curious engineer who thrives at the intersection of hardware and software.
                With 8 years in the U.S. Navy as a Hull Maintenance Technician and a B.S. in
                Software Engineering from Iowa State University, I bring a unique perspective
                to every problem I tackle.
              </p>
              <p>
                When I'm not writing code, you'll find me snowboarding, playing chess, diving
                into battle royale games, or exploring the world of finance and crypto. I believe
                the best engineers are endlessly curious—and I never stop learning.
              </p>

              <motion.div
                className="about-highlights"
                style={{
                  opacity: highlightsOpacity,
                  y: highlightsY,
                }}
              >
                {highlights.map((item, index) => (
                  <div key={index} className="highlight-item">
                    <span className="highlight-value">{item.value}</span>
                    <span className="highlight-label">{item.label}</span>
                  </div>
                ))}
              </motion.div>

              <motion.a
                href="#contact"
                className="btn btn-outline"
                style={{
                  opacity: ctaOpacity,
                  y: ctaY,
                }}
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

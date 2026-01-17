import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

// Individual image with its own scroll trigger
const AboutImage = ({ src, alt, index }) => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.4 });

  const directions = [
    { x: -40, y: 30 },  // left image: from bottom-left
    { x: 0, y: 50 },    // middle image: from bottom
    { x: 40, y: 30 },   // right image: from bottom-right
  ];

  return (
    <motion.div
      ref={ref}
      className="about-image"
      initial={{ opacity: 0, ...directions[index] }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <img src={src} alt={alt} />
    </motion.div>
  );
};

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
  const [titleRef, titleVisible] = useScrollReveal({ threshold: 0.5 });
  const [textRef, textVisible] = useScrollReveal({ threshold: 0.3 });
  const [ctaRef, ctaVisible] = useScrollReveal({ threshold: 0.5 });

  const images = [
    { src: 'https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=400&h=500&fit=crop', alt: 'Submarine' },
    { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=500&fit=crop', alt: 'Coding' },
    { src: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=400&h=500&fit=crop', alt: 'Mountains' },
  ];

  const highlights = [
    { label: 'Navy Veteran', value: '8 Years' },
    { label: 'Education', value: 'B.S. Software Engineering' },
    { label: 'Clearance', value: 'Secret' },
  ];

  return (
    <section className="about" id="about">
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
              <AboutImage key={index} {...img} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

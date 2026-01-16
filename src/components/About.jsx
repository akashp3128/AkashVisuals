import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './About.css';

const About = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

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
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2>Who I Am</h2>
            <div className="about-text">
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

              <div className="about-highlights">
                {highlights.map((item, index) => (
                  <div key={index} className="highlight-item">
                    <span className="highlight-value">{item.value}</span>
                    <span className="highlight-label">{item.label}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" className="btn btn-outline">
                Let's Connect
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </div>
          </motion.div>

          <div className="about-images">
            {images.map((img, index) => (
              <motion.div
                key={index}
                className="about-image"
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
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

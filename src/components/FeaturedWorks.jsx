import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TiltCard from './TiltCard';
import './FeaturedWorks.css';

const FeaturedWorks = () => {
  const sectionRef = useRef(null);

  // Use the container element for scroll tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'], // Animate from start to end of the section
  });

  // Simplified Timeline - start visible, subtle animations on scroll
  // Header and cards start visible, with gentle movement on scroll

  // Header animations - start visible with subtle movement
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, 0]);
  const descOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const descY = useTransform(scrollYProgress, [0, 0.2], [0, 0]);

  // Card animations - start visible with subtle scale/movement
  const card1Opacity = useTransform(scrollYProgress, [0, 0.05], [1, 1]);
  const card2Opacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const card3Opacity = useTransform(scrollYProgress, [0, 0.15], [1, 1]);
  const card4Opacity = useTransform(scrollYProgress, [0, 0.2], [1, 1]);

  // CTA animation - start visible
  const ctaOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 1]);
  const ctaY = useTransform(scrollYProgress, [0, 0.2], [0, 0]);

  const card1Y = useTransform(scrollYProgress, [0, 0.3], [0, -10]);
  const card2Y = useTransform(scrollYProgress, [0, 0.3], [0, -10]);
  const card3Y = useTransform(scrollYProgress, [0, 0.3], [0, -10]);
  const card4Y = useTransform(scrollYProgress, [0, 0.3], [0, -10]);

  const cardOpacities = [card1Opacity, card2Opacity, card3Opacity, card4Opacity];
  const cardYs = [card1Y, card2Y, card3Y, card4Y];

  const projects = [
    {
      id: 1,
      title: 'LICHESS ANALYZER',
      category: 'Full-Stack SaaS',
      image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&h=450&fit=crop',
      color: '#4ecdc4',
      link: 'https://github.com/akashp3128/lichess-analyzer',
    },
    {
      id: 2,
      title: 'FADE',
      category: 'Mobile App / Flutter',
      image: '/fade-app.png',
      color: '#D4AF37',
      link: 'https://github.com/akashp3128/fade-app',
    },
    {
      id: 3,
      title: 'ESP32 FIRMWARE',
      category: 'Embedded Systems',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=450&fit=crop',
      color: '#c9b1ff',
      link: 'https://github.com/akashp3128/esp32-project',
    },
    {
      id: 4,
      title: 'MEMORY ALLOCATOR',
      category: 'Systems Programming',
      image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=450&fit=crop',
      color: '#45b7d1',
      link: 'https://github.com/akashp3128/Memory-Allocator',
    },
  ];

  return (
    <section className="featured-works" id="works" ref={sectionRef}>
      <div className="container">
        <div className="works-header">
          <motion.h2 style={{ opacity: titleOpacity, y: titleY }}>
            Featured Projects
          </motion.h2>
          <motion.p style={{ opacity: descOpacity, y: descY }}>
            A showcase of my engineering work—from embedded systems to cloud applications.
            Each project represents challenges solved and systems built with precision
            and performance in mind.
          </motion.p>
        </div>

        <div className="works-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              style={{
                opacity: cardOpacities[index],
                y: cardYs[index],
              }}
            >
              <TiltCard className="work-card-wrapper">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="work-card">
                  <div className="work-image">
                    <img src={project.image} alt={project.title} />
                    <div className="work-overlay">
                      <span>View Project</span>
                    </div>
                    <div
                      className="work-glow"
                      style={{ background: project.color }}
                    />
                  </div>
                  <div className="work-info">
                    <h4>{project.title}</h4>
                    <h6>{project.category}</h6>
                  </div>
                </a>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="works-cta"
          style={{ opacity: ctaOpacity, y: ctaY }}
        >
          <a href="https://github.com/akashp3128" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            View GitHub
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWorks;

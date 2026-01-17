import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TiltCard from './TiltCard';
import './FeaturedWorks.css';

const FeaturedWorks = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Timeline:
  // 0-12%: Header animates in
  // 12-27%: Card 1 slides in
  // 27-42%: Card 2 slides in
  // 42-57%: Card 3 slides in
  // 57-72%: Card 4 slides in
  // 72-80%: CTA slides in
  // 80-100%: Hold period

  // Header animations
  const titleOpacity = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
  const titleX = useTransform(scrollYProgress, [0, 0.08], [-40, 0]);
  const descOpacity = useTransform(scrollYProgress, [0.04, 0.12], [0, 1]);
  const descX = useTransform(scrollYProgress, [0.04, 0.12], [40, 0]);

  // Card animations - each slides in from alternating sides
  const card1Opacity = useTransform(scrollYProgress, [0.12, 0.20], [0, 1]);
  const card1X = useTransform(scrollYProgress, [0.12, 0.27], [-80, 0]);
  const card1Y = useTransform(scrollYProgress, [0.12, 0.27], [40, 0]);

  const card2Opacity = useTransform(scrollYProgress, [0.27, 0.35], [0, 1]);
  const card2X = useTransform(scrollYProgress, [0.27, 0.42], [80, 0]);
  const card2Y = useTransform(scrollYProgress, [0.27, 0.42], [40, 0]);

  const card3Opacity = useTransform(scrollYProgress, [0.42, 0.50], [0, 1]);
  const card3X = useTransform(scrollYProgress, [0.42, 0.57], [-80, 0]);
  const card3Y = useTransform(scrollYProgress, [0.42, 0.57], [40, 0]);

  const card4Opacity = useTransform(scrollYProgress, [0.57, 0.65], [0, 1]);
  const card4X = useTransform(scrollYProgress, [0.57, 0.72], [80, 0]);
  const card4Y = useTransform(scrollYProgress, [0.57, 0.72], [40, 0]);

  // CTA animation
  const ctaOpacity = useTransform(scrollYProgress, [0.72, 0.80], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.72, 0.80], [30, 0]);

  const cardTransforms = [
    { opacity: card1Opacity, x: card1X, y: card1Y },
    { opacity: card2Opacity, x: card2X, y: card2Y },
    { opacity: card3Opacity, x: card3X, y: card3Y },
    { opacity: card4Opacity, x: card4X, y: card4Y },
  ];

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
      title: 'TRADING BOT',
      category: 'Python / Quantitative',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=450&fit=crop',
      color: '#ff6b35',
      link: 'https://github.com/akashp3128/Trading-Bot',
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
          <motion.h2 style={{ opacity: titleOpacity, x: titleX }}>
            Featured Projects
          </motion.h2>
          <motion.p style={{ opacity: descOpacity, x: descX }}>
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
                opacity: cardTransforms[index].opacity,
                x: cardTransforms[index].x,
                y: cardTransforms[index].y,
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

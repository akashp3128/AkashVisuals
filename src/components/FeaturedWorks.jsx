import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import TiltCard from './TiltCard';
import './FeaturedWorks.css';

const FeaturedWorks = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

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

  // Cards slide in from alternating sides
  const getCardVariants = (index) => {
    const isLeft = index % 2 === 0;
    return {
      hidden: {
        opacity: 0,
        x: isLeft ? -60 : 60,
        y: 20,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: 0.15 + index * 0.12,
        },
      },
    };
  };

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const descVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section className="featured-works" id="works" ref={ref}>
      <div className="container">
        <motion.div
          className="works-header"
          variants={headerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.h2 variants={titleVariants}>Featured Projects</motion.h2>
          <motion.p variants={descVariants}>
            A showcase of my engineering work—from embedded systems to cloud applications.
            Each project represents challenges solved and systems built with precision
            and performance in mind.
          </motion.p>
        </motion.div>

        <div className="works-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={getCardVariants(index)}
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
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
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
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

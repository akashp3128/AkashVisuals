import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Marquee from './Marquee';
import './Hero.css';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Panel slide transforms - panels slide away as you scroll
  const leftPanelX = useTransform(scrollYProgress, [0, 0.25], ['0%', '-100%']);
  const rightPanelX = useTransform(scrollYProgress, [0, 0.25], ['0%', '100%']);
  const panelOpacity = useTransform(scrollYProgress, [0.3, 0.4], [1, 0]);

  // Wanted poster - appears big first, then shrinks as you scroll
  const posterScale = useTransform(scrollYProgress, [0.2, 0.28, 0.42, 0.55], [0.8, 1.4, 1.4, 1]);
  const posterOpacity = useTransform(scrollYProgress, [0.2, 0.28, 0.6, 0.7], [0, 1, 1, 0]);
  const posterY = useTransform(scrollYProgress, [0.2, 0.28, 0.42, 0.55, 0.7], [60, 0, 0, -20, -60]);

  // Other elements - fade in after poster shrinks
  const subtitlesOpacity = useTransform(scrollYProgress, [0.45, 0.52, 0.6, 0.7], [0, 1, 1, 0]);
  const subtitlesY = useTransform(scrollYProgress, [0.45, 0.52, 0.6, 0.7], [30, 0, 0, -40]);

  const statusOpacity = useTransform(scrollYProgress, [0.48, 0.55, 0.6, 0.7], [0, 1, 1, 0]);
  const statusY = useTransform(scrollYProgress, [0.48, 0.55, 0.6, 0.7], [30, 0, 0, -40]);

  const marqueeOpacity = useTransform(scrollYProgress, [0.51, 0.58, 0.6, 0.7], [0, 1, 1, 0]);
  const marqueeY = useTransform(scrollYProgress, [0.51, 0.58, 0.6, 0.7], [30, 0, 0, -40]);

  // Hide entire fixed layer after hero section
  const layerOpacity = useTransform(scrollYProgress, [0.65, 0.75], [1, 0]);

  // Panel images
  const leftPanelImage = '/leftpanel.jpg';
  const rightPanelImage = '/rightpanel.jpg';

  // Skills/technologies
  const techStack = [
    { type: 'text', text: 'C++' },
    { type: 'text', text: 'PYTHON' },
    { type: 'text', text: 'EMBEDDED' },
    { type: 'text', text: 'LINUX' },
    { type: 'text', text: 'REACT' },
    { type: 'text', text: 'AI/ML' },
  ];

  return (
    <section className="hero" ref={containerRef}>
      {/* Background text layer - revealed as panels slide */}
      <motion.div className="hero-content-layer" style={{ opacity: layerOpacity }}>
        <div className="hero-text-reveal">
          {/* Wanted poster - appears big first, shrinks as you scroll */}
          <motion.div
            className="wanted-poster"
            style={{
              scale: posterScale,
              opacity: posterOpacity,
              y: posterY,
            }}
          >
            <div className="wanted-header">WANTED</div>
            <div className="wanted-photo-frame">
              <div className="wanted-photo">
                <img src="/headshot.png" alt="Akash Patel" />
              </div>
            </div>
            <div className="wanted-info-wrapper">
              <div className="integral-left">
                <span className="integral-top">&#x222B;</span>
                <span className="integral-bottom">&#x222B;</span>
              </div>
              <div className="wanted-info-content">
                <div className="wanted-status">DEAD OR ALIVE</div>
                <div className="wanted-name">AKASH·PATEL</div>
                <div className="wanted-bounty">
                  <span className="berry-symbol">B</span>
                  <span className="bounty-amount">3,000,000,000-</span>
                </div>
              </div>
              <div className="integral-right">
                <span className="integral-top">&#x222B;</span>
                <span className="integral-bottom">&#x222B;</span>
              </div>
            </div>
            <div className="wanted-footer">
              <span className="navy-text">NAVY</span>
            </div>
          </motion.div>

          {/* Subtitles - fade in after poster shrinks */}
          <motion.div
            className="hero-subtitles"
            style={{
              opacity: subtitlesOpacity,
              y: subtitlesY,
            }}
          >
            <h5>
              Software Engineer<br />Chicago, IL
            </h5>
            <h5>
              Engineering at<br />every layer
            </h5>
          </motion.div>

          {/* Status badge - fade in after subtitles */}
          <motion.div
            className="hero-status"
            style={{
              opacity: statusOpacity,
              y: statusY,
            }}
          >
            <span className="status-badge">
              <span className="status-dot"></span>
              Open to Opportunities
            </span>
          </motion.div>

          {/* Tech marquee - fade in last */}
          <motion.div
            className="hero-clients"
            style={{
              opacity: marqueeOpacity,
              y: marqueeY,
            }}
          >
            <Marquee items={techStack} speed={25} />
          </motion.div>
        </div>
      </motion.div>

      {/* Sliding panels layer */}
      <motion.div className="hero-panels" style={{ opacity: panelOpacity }}>
        {/* Left Panel */}
        <motion.div
          className="hero-panel hero-panel-left"
          style={{ x: leftPanelX }}
        >
          <div className="panel-content">
            <motion.div
              className="panel-image panel-image-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img src={leftPanelImage} alt="Left Panel" />
            </motion.div>
          </div>
          <div className="panel-border"></div>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          className="hero-panel hero-panel-right"
          style={{ x: rightPanelX }}
        >
          <div className="panel-border"></div>
          <div className="panel-content">
            <motion.div
              className="panel-image panel-image-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img src={rightPanelImage} alt="Right Panel" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
      >
        <div className="scroll-line"></div>
        <span>Scroll to reveal</span>
      </motion.div>
    </section>
  );
};

export default Hero;

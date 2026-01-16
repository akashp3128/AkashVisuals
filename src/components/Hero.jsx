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
  const leftPanelX = useTransform(scrollYProgress, [0, 0.3], ['0%', '-100%']);
  const rightPanelX = useTransform(scrollYProgress, [0, 0.3], ['0%', '100%']);

  // Text reveal - fades in as panels slide, then fades out on continued scroll
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.25, 0.5, 0.65], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0.1, 0.25, 0.5, 0.65], [60, 0, 0, -100]);
  const textScale = useTransform(scrollYProgress, [0.1, 0.3, 0.5, 0.65], [0.9, 1, 1, 0.95]);

  // Hide entire fixed layer after hero section
  const layerOpacity = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]);
  const panelOpacity = useTransform(scrollYProgress, [0.35, 0.5], [1, 0]);

  // Parallax for background elements
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -150]);

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
        <motion.div
          className="hero-text-reveal"
          style={{
            opacity: textOpacity,
            y: textY,
            scale: textScale
          }}
        >
          <h1>Akash Patel</h1>

          <div className="hero-subtitles">
            <h5>
              Software Engineer<br />Chicago, IL
            </h5>
            <h5>
              Building systems from<br />silicon to software
            </h5>
          </div>

          <div className="hero-status">
            <span className="status-badge">
              <span className="status-dot"></span>
              Open to Opportunities
            </span>
          </div>

          <div className="hero-clients">
            <Marquee items={techStack} speed={25} />
          </div>
        </motion.div>
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

import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Achievements.css';

// Clean SVG Icons
const Icons = {
  anchor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="3"/>
      <line x1="12" y1="22" x2="12" y2="8"/>
      <path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
      <polyline points="16 7 22 7 22 13"/>
    </svg>
  ),
  medal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z"/>
      <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/>
    </svg>
  ),
  trophy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  graduation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  ),
  chevrons: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="17 11 12 6 7 11"/>
      <polyline points="17 18 12 13 7 18"/>
    </svg>
  ),
};

const Achievements = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  const achievements = [
    {
      stat: '$1M+',
      label: 'Saved for U.S. Navy',
      description: 'Cost savings through precision submarine repairs and quality inspections',
      icon: 'anchor',
      featured: true,
    },
    {
      stat: '2,740%',
      label: 'Trading Returns',
      description: '$7K → $202K in 3 months through options trading',
      icon: 'chart',
    },
    {
      stat: 'Top 8',
      label: 'State Qualifier',
      description: 'Gymnastics Vault at Sectionals, Advanced to State 2014',
      icon: 'medal',
    },
    {
      stat: '2017',
      label: 'Fantasy Football Champion',
      description: 'League Champion',
      icon: 'trophy',
    },
    {
      stat: '3×',
      label: 'Early Promote',
      description: 'Highest Navy evaluation rating across multiple commands',
      icon: 'chevrons',
    },
    {
      stat: 'B.S.',
      label: 'Software Engineering',
      description: 'Iowa State University — Full degree while serving',
      icon: 'graduation',
    },
    {
      stat: 'Secret',
      label: 'Security Clearance',
      description: 'Active clearance for classified defense work',
      icon: 'shield',
    },
    {
      stat: '2×',
      label: 'JSOQ Nominee',
      description: 'Junior Sailor of the Quarter nomination',
      icon: 'star',
    },
  ];

  return (
    <section className="achievements" ref={ref}>
      <div className="container">
        <motion.div
          className="achievements-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2>Achievements</h2>
          <p className="achievements-subtitle">
            Milestones from military service, markets, and athletics.
          </p>
        </motion.div>

        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className={`achievement-card ${achievement.featured ? 'featured' : ''} ${achievement.image ? 'has-image' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
            >
              {achievement.image ? (
                <div className="achievement-image">
                  <img src={achievement.image} alt={achievement.label} />
                </div>
              ) : (
                <div className="achievement-icon">
                  {Icons[achievement.icon]}
                </div>
              )}
              <div className="achievement-content">
                <div className="achievement-stat">{achievement.stat}</div>
                <div className="achievement-label">{achievement.label}</div>
                <div className="achievement-description">{achievement.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;

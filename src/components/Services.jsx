import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Services.css';

const Services = () => {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState(0);

  const services = [
    {
      title: 'Embedded Systems & Firmware',
      items: [
        'Microcontroller Development',
        'RTOS Integration',
        'Device Drivers & BSP',
        'Hardware-Software Co-Design',
        'Sensor Integration',
      ],
    },
    {
      title: 'Full-Stack Development',
      items: [
        'React & Next.js Applications',
        'Node.js & Express APIs',
        'Python Backend Services',
        'Database Design & Optimization',
        'Cloud Infrastructure (AWS/GCP)',
        'CI/CD Pipeline Setup',
      ],
    },
    {
      title: 'Systems Programming',
      items: [
        'C/C++ Development',
        'Linux Kernel & Systems',
        'Performance Optimization',
        'Memory Management',
        'Networking & Protocols',
        'Security Implementation',
      ],
    },
    {
      title: 'AI & Machine Learning',
      items: [
        'Model Development & Training',
        'Computer Vision Applications',
        'Data Pipeline Engineering',
        'MLOps & Deployment',
      ],
    },
  ];

  return (
    <section className="services" ref={ref}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          What I Do
        </motion.h2>

        <div className="services-list">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className={`service-item ${openIndex === index ? 'open' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 + index * 0.1 }}
            >
              <button
                className="service-header"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <h3>{service.title}</h3>
                <span className="service-toggle">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    className="service-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="service-items">
                      {service.items.map((item, i) => (
                        <span key={i} className="service-tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

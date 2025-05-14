'use client';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { skillBars, radarSkills } from '@/data/skills';

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Skills = () => {
  const radarData = {
    labels: radarSkills.map((skill) => skill.category),
    datasets: [
      {
        label: 'Skill Level',
        data: radarSkills.map((skill) => skill.level),
        backgroundColor: 'rgba(0, 255, 174, 0.2)',
        borderColor: '#00ffae',
        borderWidth: 2,
        pointBackgroundColor: '#00ffae',
        pointBorderColor: '#18181b',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#00ffae',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.2)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          font: {
            family: 'var(--font-geist-mono)',
            size: 10,
          },
          color: '#e0e0e0',
        },
        ticks: {
          backdropColor: 'transparent',
          color: '#a0a0a0',
          font: {
            family: 'var(--font-geist-mono)',
          },
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        titleFont: {
          family: 'var(--font-geist-mono)',
        },
        bodyFont: {
          family: 'var(--font-geist-mono)',
        },
        backgroundColor: '#18181b',
        titleColor: '#00ffae',
        bodyColor: '#e0e0e0',
        borderColor: '#00ffae',
        borderWidth: 1,
      }
    },
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-[#18181b] font-mono">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-accent uppercase tracking-wider">
          Technical Skills
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Radar Chart */}
          <div className="bg-[#27272a] p-6 rounded-lg shadow-neon border border-accent">
            <h3 className="text-2xl font-semibold mb-6 text-accent text-center font-mono">
              Skill Categories
            </h3>
            <div className="aspect-square">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>

          {/* Skill Bars */}
          <div className="bg-[#27272a] p-6 rounded-lg shadow-neon border border-accent">
            <h3 className="text-2xl font-semibold mb-6 text-accent text-center font-mono">
              Proficiency Levels
            </h3>
            <div className="space-y-6">
              {skillBars.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-300 font-mono">
                      {skill.name}
                    </span>
                    <span className="text-sm font-medium text-accent font-mono">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner">
                    <motion.div
                      className="bg-accent h-3 rounded-full shadow-lg"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 
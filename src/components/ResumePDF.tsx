'use client';

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface Skill {
  name: string;
  level: number;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ResumePDFProps {
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  theme: 'modern' | 'classic';
}

const modernStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: '2px solid #3b82f6',
    paddingBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1e40af',
  },
  title: {
    fontSize: 18,
    color: '#3b82f6',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1e40af',
    borderBottom: '1px solid #3b82f6',
    paddingBottom: 5,
  },
  skill: {
    marginBottom: 8,
  },
  skillName: {
    fontSize: 14,
    color: '#1f2937',
  },
  skillLevel: {
    fontSize: 12,
    color: '#4b5563',
  },
  project: {
    marginBottom: 12,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  projectDescription: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 6,
  },
  projectTags: {
    fontSize: 12,
    color: '#3b82f6',
  },
  experience: {
    marginBottom: 12,
  },
  experienceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  experienceCompany: {
    fontSize: 12,
    color: '#3b82f6',
  },
  experiencePeriod: {
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 6,
  },
  experienceDescription: {
    fontSize: 12,
    color: '#4b5563',
  },
});

const classicStyles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Times-Roman',
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: '1px solid #000000',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000000',
  },
  title: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
    borderBottom: '1px solid #cccccc',
    paddingBottom: 5,
  },
  skill: {
    marginBottom: 5,
  },
  skillName: {
    fontSize: 12,
    color: '#000000',
  },
  skillLevel: {
    fontSize: 10,
    color: '#666666',
  },
  project: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  projectDescription: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 5,
  },
  projectTags: {
    fontSize: 10,
    color: '#666666',
  },
  experience: {
    marginBottom: 10,
  },
  experienceTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  experienceCompany: {
    fontSize: 10,
    color: '#666666',
  },
  experiencePeriod: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 5,
  },
  experienceDescription: {
    fontSize: 10,
    color: '#666666',
  },
});

export default function ResumePDF({
  skills,
  projects,
  experiences,
  theme,
}: ResumePDFProps) {
  const styles = theme === 'modern' ? modernStyles : classicStyles;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>Adarsh Kumar Singh</Text>
          <Text style={styles.title}>Full Stack Developer</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {skills.map((skill) => (
            <View key={skill.name} style={styles.skill}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <Text style={styles.skillLevel}>Level: {skill.level}%</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.map((project) => (
            <View key={project.title} style={styles.project}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Text style={styles.projectDescription}>{project.description}</Text>
              <Text style={styles.projectTags}>
                {project.tags.join(' • ')}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experiences.map((experience) => (
            <View key={experience.title} style={styles.experience}>
              <Text style={styles.experienceTitle}>{experience.title}</Text>
              <Text style={styles.experienceCompany}>{experience.company}</Text>
              <Text style={styles.experiencePeriod}>{experience.period}</Text>
              <Text style={styles.experienceDescription}>
                {experience.description}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
} 
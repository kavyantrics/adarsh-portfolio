# 🚀 Adarsh Portfolio - Interactive Digital Garden

A modern, interactive portfolio website built with cutting-edge technologies showcasing full-stack development skills, DevOps expertise, and AI integration.

![Portfolio Preview](https://img.shields.io/badge/Next.js-15.3.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎯 **Core Portfolio Sections**
- **Hero Section** - Dynamic introduction with animated text
- **Projects Showcase** - Interactive 3D project cards with React Three Fiber
- **Skills Visualization** - Interactive 3D skill tree with ReactFlow
- **Experience Timeline** - Professional journey with animations
- **Education & Certifications** - Academic achievements display
- **Contact Form** - Functional email integration with Nodemailer

### 🤖 **AI & Interactive Elements**
- **AI Chatbot** - OpenAI-powered personal assistant
- **Voice Assistant** - Speech-to-text and text-to-speech capabilities
- **Interactive Terminal** - Command-line style interface
- **Gamified Experience** - Achievement system and progress tracking

### 📊 **Real-time Dashboards**
- **DevOps Dashboard** - Live system metrics, deployments, and logs
- **Analytics Dashboard** - Visitor tracking and performance metrics
- **GitHub Activity** - Real-time repository statistics
- **Performance Monitor** - Live website performance metrics

### 🎨 **Advanced UI/UX**
- **Dark/Light Theme** - System preference detection
- **Framer Motion** - Smooth animations and transitions
- **3D Graphics** - Three.js powered visualizations
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG compliant design

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15.3.2** - React framework with App Router
- **React 19.0.0** - Latest React with concurrent features
- **TypeScript 5.0** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Framer Motion** - Animation library

### **3D & Graphics**
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **ReactFlow** - Interactive node-based diagrams

### **Backend & APIs**
- **Next.js API Routes** - Serverless backend functions
- **OpenAI API** - AI chatbot integration
- **Nodemailer** - Email functionality
- **Chart.js** - Data visualization

### **DevOps & Performance**
- **Smart Polling** - Intelligent API refresh system
- **Error Handling** - Graceful failure management
- **Performance Monitoring** - Real-time metrics
- **Analytics** - Visitor tracking and insights

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- OpenAI API key (for chatbot)
- Email credentials (for contact form)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/kavyantrics/adarsh-portfolio.git
   cd adarsh-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your environment variables:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── analytics/     # Visitor analytics
│   │   ├── chat/          # AI chatbot
│   │   ├── contact/       # Contact form
│   │   └── dashboard/     # DevOps metrics
│   ├── blog/              # Blog pages
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── 3D/                # Three.js components
│   ├── UI/                # Reusable UI components
│   └── Dashboards/        # Dashboard components
├── data/                   # Static data and mock APIs
├── lib/                    # Utility functions
├── types/                  # TypeScript type definitions
└── utils/                  # Helper functions
```

## 🔧 Configuration

### **Next.js Configuration**
- **App Router** - Latest Next.js routing system
- **Dynamic API Routes** - Server-side rendering for APIs
- **Image Optimization** - Automatic image optimization
- **TypeScript** - Full type safety

### **Tailwind CSS**
- **Custom Color Scheme** - Dark/light theme support
- **Responsive Breakpoints** - Mobile-first design
- **Custom Animations** - Smooth transitions and effects

## 📱 Features in Detail

### **AI Chatbot**
- Powered by OpenAI GPT models
- Context-aware conversations
- Real-time responses
- Professional assistance

### **Interactive 3D Elements**
- **Skill Tree** - Navigable 3D skill visualization
- **Project Cards** - 3D project showcases
- **Architecture Diagrams** - Interactive system designs
- **Kubernetes Playground** - Container orchestration visualization

### **Real-time Dashboards**
- **DevOps Metrics** - System health, deployments, logs
- **Analytics** - Visitor behavior and performance
- **GitHub Integration** - Repository statistics
- **Performance Monitoring** - Core Web Vitals tracking

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
npm run build
vercel --prod
```

### **AWS EC2**
```bash
npm run build
npm run start
```

### **Docker**
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Three.js Community** - 3D graphics library
- **OpenAI** - AI capabilities
- **Tailwind CSS** - Utility-first CSS framework

## 📞 Contact

- **Portfolio**: [Your Portfolio URL]
- **GitHub**: [@kavyantrics](https://github.com/kavyantrics)
- **LinkedIn**: [Your LinkedIn]
- **Email**: [Your Email]

---

⭐ **Star this repository if you found it helpful!**

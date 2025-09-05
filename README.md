# KiwiQ Demo - AI Platform

A  demo of the  content and management platform, built with Next.js 15 and TypeScript.

## 🎯 Overview

This is a  functional demo showcasing KiwiQ's enterprise content creation platform. All features are static/mocked for demonstration purposes.

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000/demo/dashboard](http://localhost:3000/demo/dashboard) to view the demo.

## 📱 Features

### Dashboard
- **Metrics Overview**: Total content, published, and in-progress statistics
- **Quick Actions**: Fast access to content creation, calendar, and documents
- **Recent Activity**: Track latest content updates
- **Tips & Recommendations**: Contextual guidance

### Content Studio
- **Create Content**: 5-stage AI-powered workflow (Input → Topics → Brief → Draft → Complete)
- **My Documents**: Grid view of all content with filtering by status
- **Content Calendar**: Monthly view with scheduled content
- **Platform Support**: Blog and LinkedIn content types

### Assets Management
- **Multi-Asset Support**: Blog and LinkedIn profiles
- **Progress Tracking**: Document update, diagnostics, and playbook completion
- **Statistics**: Content count and publishing metrics

### Additional Modules
- **Diagnostics**: Performance analysis and recommendations
- **Playbook**: Strategic content planning and campaigns
- **Settings**: Profile, notifications, security, billing, team, and API management

## 🎨 Design Standards

The demo strictly follows KiwiQ's UI/UX standards:

- **Typography**: Inter font family
- **Colors**: Gray-based palette with semantic colors
- **Spacing**: 4px grid system
- **Components**: Consistent button, card, and form patterns
- **Layout**: Fixed sidebar navigation with content area

## 📂 Project Structure

```
src/
├── app/demo/           # Demo pages
│   ├── dashboard/      # Main dashboard
│   ├── content-studio/ # Content creation workflows
│   ├── assets/         # Asset management
│   ├── diagnostics/    # Performance analysis
│   ├── playbook/       # Strategic planning
│   └── settings/       # User settings
├── components/
│   └── layout/         # Layout components
├── data/
│   ├── demo-data/      # Static JSON data
│   ├── *.md            # Documentation and standards
│   └── *.json          # Demo configuration
└── lib/demo/           # Demo utilities
```

## 🔧 Technologies

- **Framework**: Next.js 15.5.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)

## 📝 Key Components

### Layout System
- Responsive sidebar navigation
- User profile section
- Content area with max-width constraints

### Content Creation Workflow
1. **Input Stage**: Company details and requirements
2. **Topics Stage**: AI-generated topic suggestions
3. **Brief Stage**: Structured content outline
4. **Draft Stage**: Full content generation
5. **Complete Stage**: Publishing confirmation

### Data Structure
All demo data is stored in JSON files:
- User profiles and organizations
- Content items and workflows
- Analytics
- Diagnostic reports
- Playbook strategies

## 🚦 Demo Limitations

- Static data only (no real API calls)
- AI responses are pre-generated
- File uploads are simulated
- Real-time features use timers
- External integrations show sample data

## 🎯 Use Cases

Perfect for:
- Product demonstrations
- Sales presentations
- Feature walkthroughs
- User training
- Design reviews

## 📄 License

© 2024 KiwiQ. All rights reserved.

---

Built with attention to detail following KiwiQ's product and design standards.

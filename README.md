# AI Image Studio

**Professional AI-Powered Image Processing Platform**

![Version](https://img.shields.io/badge/version-1.0.0-brightgreen)
![Angular](https://img.shields.io/badge/Angular-19-red)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)

---

## Overview

AI Image Studio is a modern SaaS platform that delivers professional AI-powered image editing through an intuitive web interface. Built with Angular 19 and designed for production, it offers 12 specialized AI tools that transform images in seconds.

Perfect for photographers, e-commerce businesses, content creators, and developers who need fast, high-quality image processing.

---

## 🌐 Live Demo

**[AI Image Studio - Platform](https://69e4b1d698f3db094935768b--hafizbilalakbar-ai-studio.netlify.app/)**

---

## Features

### AI-Powered Tools

- **Image Enhancement** — Upscale to 4K, sharpen, and reduce noise
- **Background Removal** — AI segmentation with precise edge detection
- **Photo Restoration** — Repair damage and restore old photos
- **Watermark Removal** — Intelligent content-aware fill
- **AI Designer** — Text-to-image generation
- **Photo Colorization** — Transform B&W photos to color
- **Object Removal** — Remove unwanted elements seamlessly
- **Face Cutout** — Precise facial detection and isolation
- **ID Photo Maker** — Automated template compliance
- **Product Retouch** — Professional enhancement for e-commerce
- **White Background** — Clean background generation
- **Batch Processing** — Automated multi-image workflows

### Platform Highlights

- Drag & drop interface with instant preview
- Interactive before/after comparison slider
- Real-time processing with live progress updates
- Fully responsive design (mobile, tablet, desktop)
- Dark mode support
- SEO optimized with server-side rendering
- GDPR compliant and privacy-first

---

## Tech Stack

**Frontend:** Angular 19, TypeScript 5.7, RxJS 7.8, Custom CSS3

**Backend:** Node.js 18+, Express.js 4.18, Multer

**AI Integration:** OpenAI SDK, TensorFlow.js (optional), ONNX Runtime (optional)

**Deployment:** Vercel, Netlify, Docker (optional)

---

## How to Run

### Prerequisites

- Node.js 18.19.0 or higher
- npm 9.0.0 or higher
- OpenAI API key (for AI features)

### Quick Start

**1. Install Dependencies**

Clone the repository and install packages:

```bash
git clone https://github.com/hafizbilalakbar/ai-image-studio.git
cd ai-image-studio
npm install
```

**2. Configure Environment**

Copy the environment template and add your OpenAI API key:

```bash
cp .env.example .env
```

Edit `.env` and set your API key:

```
OPENAI_API_KEY=your_api_key_here
```

**3. Start Development Server**

```bash
npm start
```

Open your browser and visit: **http://localhost:4200**

### Production Build

```bash
npm run build
```

Production files will be in `dist/ai-image-studio/browser/`.

---

## Deployment

### Cloud Platforms

**Vercel (Recommended)**

```bash
npm install -g vercel
vercel login
vercel --prod
```

**Netlify**

```bash
npm run build
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Production Checklist

- All tests pass (`npm test`)
- Environment variables configured
- API keys secured (never commit `.env`)
- CORS policy updated for production domain
- SSL certificate enabled (HTTPS)

---

## API Access

AI Image Studio provides RESTful endpoints for programmatic integration:

- `POST /api/enhance` — Enhance image quality
- `POST /api/remove-bg` — Remove background
- `POST /api/restore` — Restore old photos
- `POST /api/colorize` — Colorize B&W images
- And 8+ more endpoints

All endpoints require JWT authentication and support JPEG, PNG, and WebP formats up to 10MB.

---

## Project Stats

- **12 AI Tools** — Professional image processing
- **15+ API Endpoints** — RESTful integration ready
- **2-5s Processing** — Fast AI-powered transformations
- **99.9% Uptime** — Production-ready reliability

---

## Developer

**Developed by:** Hafiz Bilal Akbar  
Full-Stack Developer | AI Enthusiast | SaaS Builder

---

## Contact

- **Email:** [hafizbilalakbar.dev@gmail.com](mailto:hafizbilalakbar.dev@gmail.com)
- **WhatsApp:** [+92-310-3180385](https://wa.me/923103180385)
- **LinkedIn:** [linkedin.com/in/hafizbilalakbar](https://linkedin.com/in/hafizbilalakbar)
- **GitHub:** [github.com/hafizbilalakbar](https://github.com/hafizbilalakbar)

---

## License

This project is licensed under the [MIT License](LICENSE).

✅ Commercial use · ✅ Modification · ✅ Distribution · ❌ Liability

---

**⭐ Found this project helpful? Give it a star!**

**Built with ❤️ using Angular & AI**

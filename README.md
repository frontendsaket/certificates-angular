

# Certificate Management Platform

A modern, secure platform for managing digital certificates with blockchain verification. Built with Angular, featuring a sleek UI and smooth animations.

## 🌟 Features

### 🔐 Authentication
- Email-based OTP verification
- Secure session handling
- Animated login flows

### 📜 Certificate Management
- View & manage certificates
- One-click downloads
- Easy sharing options

### 🎨 UI/UX Features
- Glassmorphic design
- Scroll-triggered animations
- Responsive layouts
- Interactive elements
- Loading states

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/certificate-platform.git

# Install dependencies
cd certificate-platform
npm install

# Start development server
ng serve

# Build for production
ng build
```

## 🛠️ Tech Stack

- **Frontend**: Angular 17 (Standalone Components)
- **Styling**: TailwindCSS
- **Animations**: Custom CSS + Intersection Observer
- **State Management**: Angular Services
- **Authentication**: JWT + OTP

## 📁 Project Structure

```
src/app/
├── components/               # Reusable components
│   ├── navbar/              # Navigation bar
│   ├── hero/                # Hero section
│   ├── services/            # Services showcase
│   ├── footer/              # Footer component
│   └── certificate-item/    # Certificate card
├── pages/                   # Main pages
│   ├── login/              # Authentication
│   ├── certificates/       # Certificate list
│   └── certificate/        # Certificate details
├── shared/                 # Shared resources
│   └── directives/        # Custom directives
└── services/              # Business logic
```

## 🎯 Core Features

### Animations
- Scroll-triggered animations using Intersection Observer
- Staggered animations for lists
- Loading state animations
- Smooth transitions

```typescript
// Example: Scroll Animation Directive
@Directive({
  selector: '[scrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective implements AfterViewInit {
  @Input() animationClass: string = 'animate';
  @Input() threshold: number = 0.1;
  
  // ... implementation
}
```

### Authentication Flow
- Email input
- OTP verification
- Session management
- Secure routing

```typescript
// Example: OTP Handling
async onOtp() {
  if (!this.utilService.isEmail(this.email)) {
    this.error = "Invalid Email!";
    return;
  }
  // ... OTP logic
}
```

## 🎨 Styling

Using TailwindCSS with custom animations:

```css
/* Example: Card Animation */
.card {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s ease-out;
}

.card.animate {
  opacity: 1;
  transform: translateY(0);
}
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoint-specific layouts
- Flexible grids
- Adaptive typography

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request


## 🙏 Acknowledgments

- Angular Team
- TailwindCSS
- Open source community

## 📞 Contact

Saket Aryan - [@whysosaket](https://twitter.com/whysosaket)

---

Made with ❤️ by Saket
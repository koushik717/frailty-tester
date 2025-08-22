# METY Brand Layout Tokens & Design System

## 🎯 **Overview**
This guide documents the layout, spacing, and typography standards used throughout the METY FrailtyTester application. These tokens ensure consistent "scientific elegance" design principles across all components and pages.

## 📐 **Layout Standards**

### **Container Widths**
```css
/* Primary Container */
.max-w-7xl: 80rem (1280px) - Main content container
.max-w-4xl: 56rem (896px) - Hero sections and focused content
.max-w-3xl: 48rem (768px) - Narrow content and descriptions
.max-w-2xl: 42rem (672px) - Compact content areas
```

### **Page Structure**
```css
/* Page Container */
.page-container: min-h-screen bg-mety-neutral-50 flex flex-col items-center
.page-padding: px-6 py-12 lg:py-20
.page-max-width: max-w-7xl mx-auto
```

### **Section Spacing**
```css
/* Section Padding */
.section-padding: py-12 (mobile), py-20 (desktop)
.section-margin: mb-16 (between major sections)
.section-gap: gap-8 (between related elements)
```

## 🎨 **Typography Hierarchy**

### **Heading Scale**
```css
/* Primary Headings */
.h1-hero: text-4xl lg:text-5xl font-bold tracking-tight mb-10
.h1-page: text-3xl lg:text-4xl font-bold text-mety-neutral-900 mb-8
.h2-section: text-2xl lg:text-3xl font-semibold text-mety-neutral-900 mb-6
.h3-card: text-xl font-semibold text-mety-neutral-900 leading-tight
.h4-subsection: text-lg font-semibold text-mety-neutral-900 mb-4
```

### **Body Text**
```css
/* Body Typography */
.body-large: text-xl lg:text-2xl text-mety-neutral-600 leading-relaxed
.body-medium: text-lg text-mety-neutral-600 leading-relaxed
.body-base: text-base text-mety-neutral-600 leading-relaxed
.body-small: text-sm text-mety-neutral-600 leading-relaxed
```

### **Interactive Text**
```css
/* Navigation & Buttons */
.nav-link: text-base font-medium tracking-wide
.button-text: text-base font-medium
.button-large: text-lg font-medium
```

## 📏 **Spacing System**

### **Padding Scale**
```css
/* Component Padding */
.padding-xs: p-2 (8px)
.padding-sm: p-4 (16px)
.padding-md: p-6 (24px)
.padding-lg: p-8 (32px)
.padding-xl: p-10 (40px)
.padding-2xl: p-12 (48px)
```

### **Margin Scale**
```css
/* Vertical Margins */
.margin-xs: mb-2 (8px)
.margin-sm: mb-4 (16px)
.margin-md: mb-6 (24px)
.margin-lg: mb-8 (32px)
.margin-xl: mb-10 (40px)
.margin-2xl: mb-12 (48px)
.margin-3xl: mb-16 (64px)
```

### **Gap Scale**
```css
/* Element Gaps */
.gap-xs: gap-2 (8px)
.gap-sm: gap-4 (16px)
.gap-md: gap-6 (24px)
.gap-lg: gap-8 (32px)
.gap-xl: gap-10 (40px)
.gap-2xl: gap-12 (48px)
```

## 🃏 **Card Design System**

### **Card Structure**
```css
/* Standard Card */
.card-container: bg-white rounded-xl shadow-sm border border-mety-neutral-200
.card-padding: p-6 (mobile), p-8 (desktop)
.card-min-height: min-h-[240px] (mobile), min-h-[280px] (desktop)
.card-hover: hover:shadow-lg hover:border-mety-neutral-300 hover:-translate-y-1
.card-transition: transition-all duration-300
```

### **Card Grid**
```css
/* Card Grid Layout */
.card-grid: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
.card-gap: gap-6 (mobile), gap-8 (desktop)
.card-margin: mb-12 (mobile), mb-16 (desktop)
```

### **Card Content**
```css
/* Card Typography */
.card-title: text-lg (mobile), text-xl (desktop) font-semibold text-mety-neutral-900
.card-description: text-sm (mobile), text-base (desktop) text-mety-neutral-600
.card-button: px-4 py-3 (mobile), px-6 py-4 (desktop) rounded-lg font-medium
```

## 🎯 **Interactive Elements**

### **Button System**
```css
/* Primary Buttons */
.button-primary: bg-mety-green-primary hover:bg-mety-green-secondary
.button-padding: px-6 py-4 rounded-lg font-medium text-white text-base
.button-hover: hover:shadow-md hover:scale-[1.02] active:scale-[0.98]
.button-transition: transition-all duration-200
.button-focus: focus:outline-none focus:ring-2 focus:ring-mety-green-primary focus:ring-offset-2
```

### **Navigation Elements**
```css
/* Header Navigation */
.nav-container: flex items-center gap-8
.nav-link: px-6 py-3 rounded-lg font-medium text-base tracking-wide
.nav-hover: hover:text-mety-green-primary hover:bg-mety-neutral-50 hover:shadow-sm
.nav-transition: transition-all duration-200
```

### **Form Elements**
```css
/* Input Fields */
.input-field: px-4 py-3 rounded-lg border border-mety-neutral-300 focus:border-mety-green-primary
.input-focus: focus:outline-none focus:ring-2 focus:ring-mety-green-primary focus:ring-offset-2
.input-transition: transition-all duration-200
```

## 🏗️ **Layout Components**

### **Page Section Component**
```jsx
// Usage: <PageSection className="custom-class">
const pageSectionClasses = "max-w-7xl mx-auto px-6 py-12 lg:py-20"
```

### **Hero Section**
```css
/* Hero Layout */
.hero-container: w-full max-w-4xl text-center mb-16
.hero-title: text-4xl lg:text-5xl font-bold text-mety-neutral-900 tracking-tight mb-10
.hero-description: text-xl lg:text-2xl text-mety-neutral-600 max-w-3xl mx-auto leading-relaxed
```

### **Content Section**
```css
/* Content Layout */
.content-container: w-full max-w-7xl mx-auto
.content-padding: px-6 py-12 lg:py-20
.content-margin: mb-16
```

## 🎨 **Color Usage**

### **Background Colors**
```css
/* Page Backgrounds */
.bg-page: bg-mety-neutral-50
.bg-card: bg-white
.bg-overlay: bg-mety-neutral-100
```

### **Text Colors**
```css
/* Text Hierarchy */
.text-primary: text-mety-neutral-900
.text-secondary: text-mety-neutral-700
.text-tertiary: text-mety-neutral-600
.text-muted: text-mety-neutral-500
```

### **Interactive Colors**
```css
/* Interactive States */
.text-interactive: text-mety-green-primary
.bg-interactive: bg-mety-green-primary
.hover-interactive: hover:bg-mety-green-secondary
```

## 📱 **Responsive Breakpoints**

### **Mobile First Approach**
```css
/* Breakpoint Strategy */
.mobile: < 640px (default styles)
.sm: >= 640px (small tablets)
.md: >= 768px (tablets)
.lg: >= 1024px (desktops)
.xl: >= 1280px (large desktops)
.2xl: >= 1536px (extra large screens)
```

### **Responsive Typography**
```css
/* Responsive Text Sizes */
.responsive-title: text-3xl lg:text-4xl xl:text-5xl
.responsive-body: text-base lg:text-lg xl:text-xl
.responsive-card: text-lg lg:text-xl
```

## ♿ **Accessibility Standards**

### **Focus Management**
```css
/* Focus Indicators */
.focus-ring: focus:outline-none focus:ring-2 focus:ring-mety-green-primary focus:ring-offset-2
.focus-visible: focus-visible:ring-2 focus-visible:ring-mety-green-primary
```

### **Touch Targets**
```css
/* Minimum Touch Target Size */
.touch-target: min-h-[44px] min-w-[44px]
.button-touch: px-6 py-4 (ensures 44px minimum height)
```

### **Color Contrast**
```css
/* WCAG AA Compliant Contrast Ratios */
.text-primary: text-mety-neutral-900 (15:1 contrast)
.text-secondary: text-mety-neutral-700 (7:1 contrast)
.text-tertiary: text-mety-neutral-600 (4.5:1 contrast)
```

## 🔧 **Implementation Guidelines**

### **Consistent Spacing**
- Use the spacing scale consistently across all components
- Maintain proportional relationships between elements
- Apply generous white space for "scientific elegance"

### **Typography Hierarchy**
- Use heading levels semantically (h1, h2, h3, h4)
- Maintain clear size differences between heading levels
- Ensure proper line heights for readability

### **Component Structure**
- Apply consistent padding and margins to similar components
- Use the card design system for all content containers
- Maintain consistent hover states and transitions

### **Responsive Design**
- Start with mobile-first styles
- Use responsive modifiers for larger screens
- Ensure touch targets meet accessibility standards

## 📋 **Quick Reference**

### **Common Patterns**
```css
/* Page Layout */
.page: min-h-screen bg-mety-neutral-50 flex flex-col items-center px-6 py-12 lg:py-20

/* Section Layout */
.section: max-w-7xl mx-auto px-6 py-12 lg:py-20 mb-16

/* Card Layout */
.card: bg-white rounded-xl shadow-sm border border-mety-neutral-200 p-8 min-h-[280px]

/* Button Layout */
.button: px-6 py-4 rounded-lg font-medium text-base transition-all duration-200
```

### **Typography Scale**
```css
/* Heading Scale */
.h1: text-4xl lg:text-5xl font-bold mb-10
.h2: text-3xl lg:text-4xl font-semibold mb-8
.h3: text-2xl lg:text-3xl font-semibold mb-6
.h4: text-xl font-semibold mb-4

/* Body Scale */
.body-large: text-xl lg:text-2xl leading-relaxed
.body-medium: text-lg leading-relaxed
.body-base: text-base leading-relaxed
```

This design system ensures consistent, professional, and accessible design across the METY FrailtyTester application while maintaining the "scientific elegance" brand philosophy. 
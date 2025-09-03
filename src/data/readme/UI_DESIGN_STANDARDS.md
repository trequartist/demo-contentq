# KiwiQ UI Design Standards
## Version 1.0 | Enterprise Design System

## 🎨 Design Philosophy

### Core Principles
1. **Clarity Over Cleverness**: Every interface element should have a clear purpose
2. **Progressive Complexity**: Start simple, reveal advanced features contextually
3. **Consistent Patterns**: Same action, same interface everywhere
4. **Accessible First**: WCAG 2.1 AA compliance as baseline
5. **Performance Matters**: Every pixel and animation must earn its place

## 🎨 Visual Identity

### Brand Colors
```scss
// Primary Palette
$gray-900: #111827;  // Primary text, buttons
$gray-800: #1F2937;  // Secondary elements
$gray-700: #374151;  // Borders, dividers
$gray-600: #4B5563;  // Muted text
$gray-500: #6B7280;  // Placeholders
$gray-400: #9CA3AF;  // Disabled states
$gray-300: #D1D5DB;  // Borders
$gray-200: #E5E7EB;  // Backgrounds
$gray-100: #F3F4F6;  // Light backgrounds
$gray-50:  #F9FAFB;  // Subtle backgrounds
$white:    #FFFFFF;  // Base background

// Accent Colors
$blue-600:   #2563EB;  // Links, info states
$green-600:  #059669;  // Success states
$yellow-600: #D97706;  // Warning states
$red-600:    #DC2626;  // Error states
$purple-600: #7C3AED;  // Premium features

// Semantic Colors
$primary:    $gray-900;
$secondary:  $gray-600;
$success:    $green-600;
$warning:    $yellow-600;
$danger:     $red-600;
$info:       $blue-600;

// Gradients
$gradient-primary: linear-gradient(135deg, $gray-900 0%, $gray-800 100%);
$gradient-premium: linear-gradient(135deg, $purple-600 0%, $blue-600 100%);
$gradient-success: linear-gradient(135deg, $green-600 0%, $green-500 100%);
```

### Typography
```scss
// Font Stack
$font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;

// Font Sizes
$text-xs:   0.75rem;   // 12px - Badges, labels
$text-sm:   0.875rem;  // 14px - Body small, buttons
$text-base: 1rem;      // 16px - Body default
$text-lg:   1.125rem;  // 18px - Subheadings
$text-xl:   1.25rem;   // 20px - Section headers
$text-2xl:  1.5rem;    // 24px - Page titles
$text-3xl:  1.875rem;  // 30px - Hero headings
$text-4xl:  2.25rem;   // 36px - Landing pages

// Font Weights
$font-normal:  400;
$font-medium:  500;
$font-semibold: 600;
$font-bold:    700;

// Line Heights
$leading-tight:   1.25;
$leading-snug:    1.375;
$leading-normal:  1.5;
$leading-relaxed: 1.625;

// Letter Spacing
$tracking-tighter: -0.05em;
$tracking-tight:   -0.025em;
$tracking-normal:  0;
$tracking-wide:    0.025em;
```

### Spacing System
```scss
// Base unit: 4px
$space-0:   0;        // 0px
$space-1:   0.25rem;  // 4px
$space-2:   0.5rem;   // 8px
$space-3:   0.75rem;  // 12px
$space-4:   1rem;     // 16px
$space-5:   1.25rem;  // 20px
$space-6:   1.5rem;   // 24px
$space-8:   2rem;     // 32px
$space-10:  2.5rem;   // 40px
$space-12:  3rem;     // 48px
$space-16:  4rem;     // 64px
$space-20:  5rem;     // 80px
$space-24:  6rem;     // 96px
```

### Border Radius
```scss
$rounded-none:  0;
$rounded-sm:    0.125rem;  // 2px
$rounded:       0.25rem;   // 4px
$rounded-md:    0.375rem;  // 6px
$rounded-lg:    0.5rem;    // 8px
$rounded-xl:    0.75rem;   // 12px
$rounded-2xl:   1rem;      // 16px
$rounded-3xl:   1.5rem;    // 24px
$rounded-full:  9999px;    // Pills, circles
```

### Shadows
```scss
// Elevation system
$shadow-xs:   0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-sm:   0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
$shadow-md:   0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
$shadow-lg:   0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
$shadow-xl:   0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
$shadow-2xl:  0 25px 50px -12px rgba(0, 0, 0, 0.25);

// Special shadows
$shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
$shadow-outline: 0 0 0 3px rgba(17, 24, 39, 0.1);
$shadow-glow: 0 0 20px rgba(37, 99, 235, 0.3);
```

## 🧱 Component Standards

### Buttons
```typescript
interface ButtonVariants {
  primary: {
    background: 'gray-900';
    text: 'white';
    hover: 'gray-800';
    shadow: 'md';
  };
  secondary: {
    background: 'white';
    text: 'gray-700';
    border: 'gray-200';
    hover: 'gray-50';
    shadow: 'sm';
  };
  ghost: {
    background: 'transparent';
    text: 'gray-600';
    hover: 'gray-100';
  };
  destructive: {
    background: 'red-600';
    text: 'white';
    hover: 'red-700';
    shadow: 'md';
  };
}

interface ButtonSizes {
  xs: { height: '28px'; padding: '0 10px'; fontSize: '12px' };
  sm: { height: '36px'; padding: '0 14px'; fontSize: '14px' };
  md: { height: '40px'; padding: '0 20px'; fontSize: '14px' };
  lg: { height: '44px'; padding: '0 24px'; fontSize: '16px' };
  xl: { height: '48px'; padding: '0 32px'; fontSize: '16px' };
}
```

### Cards
```typescript
interface CardVariants {
  default: {
    background: 'white';
    border: '1px solid gray-200';
    borderRadius: 'lg';
    padding: '24px';
    shadow: 'sm';
  };
  elevated: {
    background: 'white';
    borderRadius: 'xl';
    padding: '32px';
    shadow: 'lg';
  };
  flat: {
    background: 'gray-50';
    borderRadius: 'lg';
    padding: '24px';
    border: 'none';
  };
  outlined: {
    background: 'transparent';
    border: '1px solid gray-300';
    borderRadius: 'lg';
    padding: '24px';
  };
}
```

### Forms
```typescript
interface FormFieldStandards {
  input: {
    height: '40px';
    padding: '0 12px';
    border: '1px solid gray-300';
    borderRadius: 'lg';
    fontSize: '14px';
    focus: {
      border: 'gray-400';
      ring: '2px gray-400/20';
    };
    error: {
      border: 'red-500';
      ring: '2px red-500/20';
    };
  };
  label: {
    fontSize: '14px';
    fontWeight: '500';
    color: 'gray-700';
    marginBottom: '6px';
  };
  helpText: {
    fontSize: '13px';
    color: 'gray-500';
    marginTop: '6px';
  };
  errorText: {
    fontSize: '13px';
    color: 'red-600';
    marginTop: '6px';
  };
}
```

### Navigation
```typescript
interface NavigationStandards {
  topNav: {
    height: '64px';
    background: 'white';
    borderBottom: '1px solid gray-200';
    shadow: 'sm';
    zIndex: 50;
  };
  sideNav: {
    width: '280px';
    background: 'gray-50';
    borderRight: '1px solid gray-200';
    padding: '24px 16px';
  };
  navItem: {
    height: '40px';
    padding: '0 12px';
    borderRadius: 'md';
    hover: 'gray-100';
    active: {
      background: 'gray-900';
      text: 'white';
    };
  };
}
```

### Modals
```typescript
interface ModalStandards {
  overlay: {
    background: 'rgba(0, 0, 0, 0.5)';
    backdropFilter: 'blur(4px)';
  };
  container: {
    maxWidth: {
      sm: '400px';
      md: '600px';
      lg: '800px';
      xl: '1024px';
    };
    padding: '32px';
    borderRadius: '2xl';
    background: 'white';
    shadow: '2xl';
  };
  header: {
    fontSize: '20px';
    fontWeight: '600';
    marginBottom: '24px';
  };
  footer: {
    marginTop: '32px';
    display: 'flex';
    justifyContent: 'flex-end';
    gap: '12px';
  };
}
```

## 📐 Layout System

### Grid System
```scss
// Container widths
$container-sm:  640px;
$container-md:  768px;
$container-lg:  1024px;
$container-xl:  1280px;
$container-2xl: 1536px;

// Grid columns
$grid-columns: 12;
$grid-gap: 24px;

// Breakpoints
$breakpoint-xs: 0;
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;
```

### Page Layout
```typescript
interface PageLayout {
  header: {
    height: '64px';
    position: 'sticky';
    top: 0;
  };
  sidebar: {
    width: '280px';
    position: 'fixed';
    height: 'calc(100vh - 64px)';
  };
  main: {
    marginLeft: '280px';
    minHeight: 'calc(100vh - 64px)';
    padding: '32px';
    maxWidth: '1280px';
  };
  footer: {
    height: '80px';
    background: 'gray-50';
    borderTop: '1px solid gray-200';
  };
}
```

## 🎭 Animation Standards

### Transitions
```scss
// Duration
$duration-75:   75ms;
$duration-100:  100ms;
$duration-150:  150ms;
$duration-200:  200ms;
$duration-300:  300ms;
$duration-500:  500ms;
$duration-700:  700ms;
$duration-1000: 1000ms;

// Timing Functions
$ease-linear: linear;
$ease-in:     cubic-bezier(0.4, 0, 1, 1);
$ease-out:    cubic-bezier(0, 0, 0.2, 1);
$ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
$ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

// Standard Transitions
$transition-all:     all 200ms ease-in-out;
$transition-opacity: opacity 150ms ease-in-out;
$transition-shadow:  box-shadow 200ms ease-in-out;
$transition-colors:  background-color 200ms ease-in-out, 
                    border-color 200ms ease-in-out, 
                    color 200ms ease-in-out;
```

### Animation Patterns
```typescript
interface AnimationStandards {
  pageTransition: {
    duration: '300ms';
    enter: 'fade-in slide-up';
    exit: 'fade-out';
  };
  modalAnimation: {
    duration: '200ms';
    overlay: 'fade-in';
    content: 'scale-up fade-in';
  };
  loading: {
    spinner: 'rotate 1s linear infinite';
    skeleton: 'pulse 2s ease-in-out infinite';
    progress: 'width 300ms ease-out';
  };
  hover: {
    duration: '150ms';
    scale: '1.02';
    shadow: 'elevate';
  };
}
```

## 🔤 Content Standards

### Voice & Tone
```typescript
interface ContentVoice {
  professional: {
    tone: 'confident, knowledgeable';
    vocabulary: 'industry-standard';
    personality: 'helpful expert';
  };
  friendly: {
    tone: 'approachable, supportive';
    vocabulary: 'clear, simple';
    personality: 'trusted advisor';
  };
  error: {
    tone: 'calm, solution-focused';
    vocabulary: 'non-technical';
    personality: 'problem solver';
  };
}
```

### Microcopy Guidelines
```typescript
interface MicrocopyStandards {
  buttons: {
    action: 'Verb + Noun'; // "Create Content", "Save Draft"
    confirmation: 'Clear outcome'; // "Yes, Delete", "Cancel"
    loading: 'Present continuous'; // "Creating...", "Saving..."
  };
  placeholders: {
    format: 'Example or instruction'; // "Enter company name..."
    search: 'What to search for'; // "Search by title, author..."
  };
  errors: {
    format: 'What happened + How to fix';
    example: 'Email already exists. Try signing in instead.';
  };
  success: {
    format: 'What succeeded + Next step';
    example: 'Content saved! Continue editing or publish now.';
  };
  empty: {
    format: 'State + Action to change';
    example: 'No content yet. Create your first post!';
  };
}
```

## 🎯 Interaction Patterns

### Click Targets
- Minimum size: 44x44px (mobile), 32x32px (desktop)
- Touch targets: 48x48px minimum
- Spacing between targets: 8px minimum

### Keyboard Navigation
```typescript
interface KeyboardShortcuts {
  global: {
    search: 'Cmd+K';
    newContent: 'Cmd+N';
    save: 'Cmd+S';
    help: 'Cmd+/';
  };
  navigation: {
    nextSection: 'Tab';
    previousSection: 'Shift+Tab';
    activate: 'Enter';
    cancel: 'Esc';
  };
  editor: {
    bold: 'Cmd+B';
    italic: 'Cmd+I';
    link: 'Cmd+K';
    undo: 'Cmd+Z';
    redo: 'Cmd+Shift+Z';
  };
}
```

### Focus Management
- Visible focus indicators (2px outline)
- Logical tab order
- Focus trap in modals
- Return focus on close

## 📱 Responsive Design

### Breakpoint Behaviors
```typescript
interface ResponsivePatterns {
  mobile: {
    // < 640px
    navigation: 'hamburger menu';
    layout: 'single column';
    cards: 'full width';
    tables: 'card view';
  };
  tablet: {
    // 640px - 1024px
    navigation: 'collapsible sidebar';
    layout: 'flexible grid';
    cards: '2 column';
    tables: 'scrollable';
  };
  desktop: {
    // > 1024px
    navigation: 'fixed sidebar';
    layout: '12 column grid';
    cards: '3-4 column';
    tables: 'full table';
  };
}
```

## ♿ Accessibility Standards

### WCAG 2.1 AA Requirements
- Color contrast: 4.5:1 (normal text), 3:1 (large text)
- Focus indicators: Visible on all interactive elements
- Alt text: All images and icons
- ARIA labels: All interactive elements
- Screen reader: Full compatibility
- Keyboard: Full functionality

### Accessibility Patterns
```html
<!-- Button with loading state -->
<button aria-busy="true" aria-label="Creating content">
  <span aria-hidden="true">Creating...</span>
</button>

<!-- Form field with error -->
<div role="group" aria-invalid="true">
  <label for="email">Email</label>
  <input id="email" aria-describedby="email-error" />
  <span id="email-error" role="alert">Invalid email format</span>
</div>

<!-- Progress indicator -->
<div role="progressbar" 
     aria-valuenow="60" 
     aria-valuemin="0" 
     aria-valuemax="100"
     aria-label="Content creation progress">
  60% Complete
</div>
```

## 🌐 Internationalization

### Text Expansion
- Allow 30% expansion for translations
- Flexible layouts that accommodate text growth
- No text in images
- RTL language support ready

### Date & Time
```typescript
interface DateTimeFormats {
  short: 'MMM D'; // Jan 5
  medium: 'MMM D, YYYY'; // Jan 5, 2024
  long: 'MMMM D, YYYY'; // January 5, 2024
  time: 'h:mm A'; // 3:30 PM
  datetime: 'MMM D, h:mm A'; // Jan 5, 3:30 PM
}
```

## 📊 Data Visualization

### Chart Colors
```scss
$chart-colors: (
  primary:   #2563EB,
  secondary: #7C3AED,
  tertiary:  #059669,
  quaternary: #D97706,
  quinary:   #DC2626,
  senary:    #0891B2,
);
```

### Chart Standards
- Consistent color mapping
- Clear legends
- Accessible patterns for colorblind users
- Interactive tooltips
- Responsive sizing

## 🚦 State Management

### Component States
```typescript
interface ComponentStates {
  default: 'Base appearance';
  hover: 'User hovering';
  active: 'Being clicked';
  focus: 'Keyboard focused';
  disabled: 'Not interactive';
  loading: 'Processing';
  error: 'Problem state';
  success: 'Completed successfully';
  empty: 'No content';
}
```

### Loading States
```typescript
interface LoadingPatterns {
  inline: 'Spinner in button';
  overlay: 'Semi-transparent overlay';
  skeleton: 'Content placeholder';
  progress: 'Progress bar';
  shimmer: 'Animated placeholder';
}
```

## 📏 Design Tokens

```json
{
  "tokens": {
    "color": {
      "primary": { "value": "#111827" },
      "secondary": { "value": "#4B5563" },
      "success": { "value": "#059669" },
      "warning": { "value": "#D97706" },
      "error": { "value": "#DC2626" },
      "info": { "value": "#2563EB" }
    },
    "spacing": {
      "xs": { "value": "4px" },
      "sm": { "value": "8px" },
      "md": { "value": "16px" },
      "lg": { "value": "24px" },
      "xl": { "value": "32px" },
      "2xl": { "value": "48px" }
    },
    "typography": {
      "fontSize": {
        "xs": { "value": "12px" },
        "sm": { "value": "14px" },
        "md": { "value": "16px" },
        "lg": { "value": "18px" },
        "xl": { "value": "20px" },
        "2xl": { "value": "24px" }
      },
      "fontWeight": {
        "normal": { "value": "400" },
        "medium": { "value": "500" },
        "semibold": { "value": "600" },
        "bold": { "value": "700" }
      }
    },
    "borderRadius": {
      "sm": { "value": "4px" },
      "md": { "value": "8px" },
      "lg": { "value": "12px" },
      "xl": { "value": "16px" },
      "full": { "value": "9999px" }
    },
    "shadow": {
      "sm": { "value": "0 1px 3px rgba(0, 0, 0, 0.1)" },
      "md": { "value": "0 4px 6px rgba(0, 0, 0, 0.1)" },
      "lg": { "value": "0 10px 15px rgba(0, 0, 0, 0.1)" },
      "xl": { "value": "0 20px 25px rgba(0, 0, 0, 0.1)" }
    }
  }
}
```

## 🎯 Implementation Checklist

### Component Development
- [ ] Follows design token system
- [ ] Responsive across breakpoints
- [ ] Keyboard accessible
- [ ] Screen reader compatible
- [ ] Loading state implemented
- [ ] Error state handled
- [ ] Empty state designed
- [ ] Animation performance optimized
- [ ] Dark mode compatible (future)
- [ ] RTL compatible (future)

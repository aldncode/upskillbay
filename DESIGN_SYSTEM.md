# UpskillBay Design System

A premium, YC-style dark theme UI system built with Next.js, Tailwind CSS, and Framer Motion.

## Color Palette

```
Background:        #0B0F19
Card:              #111827
Border:            #1F2937
Primary:           #3B82F6
Primary Hover:     #2563EB
Text Primary:      #FFFFFF
Text Secondary:    #9CA3AF
```

## Components

### Button

Reusable button component with variants and sizes.

**Variants:**
- `primary` - Main call-to-action button
- `secondary` - Secondary button
- `outline` - Outline style button

**Sizes:**
- `sm` - Small button
- `md` - Medium button (default)
- `lg` - Large button

**Usage:**

```tsx
import Button from '@/components/Button';

export default function Example() {
  return (
    <>
      {/* Primary Button */}
      <Button variant="primary" href="/signup">
        Get Started
      </Button>

      {/* Secondary Button */}
      <Button variant="secondary" onClick={() => console.log('clicked')}>
        Learn More
      </Button>

      {/* Outline Button */}
      <Button variant="outline" size="lg" href="/docs">
        Documentation
      </Button>

      {/* Submit Button */}
      <Button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </>
  );
}
```

### Card

Container component for content with hover effects.

**Usage:**

```tsx
import Card from '@/components/Card';

export default function Example() {
  return (
    <Card>
      <h3 className="text-lg font-bold text-white">Card Title</h3>
      <p className="text-[#9CA3AF]">Card content goes here</p>
    </Card>
  );
}
```

### Section

Container component for sections with max-width and padding.

**Usage:**

```tsx
import Section from '@/components/Section';

export default function Example() {
  return (
    <Section id="features" className="bg-[#0B0F19]">
      <h2 className="text-4xl font-bold text-white mb-8">Features</h2>
      {/* Content */}
    </Section>
  );
}
```

### AnimatedSection

Section component with fade + slide up animation on scroll.

**Usage:**

```tsx
import AnimatedSection from '@/components/AnimatedSection';

export default function Example() {
  return (
    <AnimatedSection className="bg-[#111827]" delay={0}>
      <h2 className="text-4xl font-bold text-white mb-8">Animated Section</h2>
      {/* Content */}
    </AnimatedSection>
  );
}
```

## Framer Motion Animations

Subtle animations using Framer Motion.

### Fade + Slide Up on Scroll

```tsx
import { motion } from 'framer-motion';

export default function Example() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
    >
      Content here
    </motion.div>
  );
}
```

### Staggered Children Animation

```tsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Example() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {[1, 2, 3].map((item) => (
        <motion.div key={item} variants={itemVariants}>
          Item {item}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### Hover Scale Effect

```tsx
import { motion } from 'framer-motion';

export default function Example() {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      Hover me
    </motion.div>
  );
}
```

## Typography

Use semantic HTML with Tailwind classes:

```tsx
<h1 className="text-4xl md:text-5xl font-bold text-white">Heading 1</h1>
<h2 className="text-3xl md:text-4xl font-bold text-white">Heading 2</h2>
<h3 className="text-xl md:text-2xl font-bold text-white">Heading 3</h3>
<p className="text-base md:text-lg text-[#9CA3AF] leading-relaxed">
  Body text
</p>
```

## Spacing

Use consistent spacing:

```tsx
{/* Sections */}
py-20 /* Vertical padding for major sections */
py-12 /* Smaller sections */
py-8  /* Cards and containers */

{/* Horizontal */}
px-6  /* Standard horizontal padding */
gap-6 /* Gap between elements */
mb-8  /* Margin bottom */
mt-4  /* Margin top */
```

## Input Styles

Consistent form input styling:

```tsx
<input
  type="text"
  className="input"
  placeholder="Placeholder text"
/>
```

## Badge Styles

Badge variants:

```tsx
<span className="badge badge-success">Success</span>
<span className="badge badge-error">Error</span>
<span className="badge badge-warning">Warning</span>
<span className="badge badge-info">Info</span>
```

## Best Practices

1. **Use Semantic Colors**: Always use the color variables defined in the system
2. **Subtle Animations**: Keep animations under 0.6s duration
3. **Hover States**: Add hover effects for interactivity feedback
4. **Mobile First**: Design for mobile, then enhance for desktop
5. **Accessibility**: Ensure sufficient color contrast and readable text sizes
6. **Consistency**: Use components instead of custom styling where possible

## Example Page

```tsx
'use client';

import { motion } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import Card from '@/components/Card';
import Button from '@/components/Button';

export default function Example() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-white mb-6">
            Beautiful Heading
          </h1>
          <p className="text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
            Subtitle or description here
          </p>
          <Button variant="primary" size="lg">
            Get Started
          </Button>
        </motion.div>
      </section>

      {/* Features */}
      <AnimatedSection className="bg-[#111827]">
        <h2 className="text-4xl font-bold text-white mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <h3 className="text-lg font-bold text-white mb-3">
                Feature {i}
              </h3>
              <p className="text-[#9CA3AF]">
                Feature description here
              </p>
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </>
  );
}
```

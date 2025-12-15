# Card Component Usage Guide

## Overview

The `Card` component provides a flexible base for creating cards throughout the application. It uses a **composition pattern** rather than trying to handle all use cases in one component.

## Import

```tsx
import { Card } from "./components/Card";
```

## Basic Usage

### Simple Card

```tsx
<Card>
  <Card.Content>
    <h3>Title</h3>
    <p>Description</p>
  </Card.Content>
</Card>
```

### Card with Variants

```tsx
// Default (basic background)
<Card variant="default">Content</Card>

// With border
<Card variant="bordered">Content</Card>

// With elevation/shadow
<Card variant="elevated">Content</Card>

// Interactive (for clickable cards)
<Card variant="interactive">Content</Card>
```

### Interactive Card with Hover

```tsx
<Card
  variant="interactive"
  hover
  hoverClassName="md:hover:scale-105 md:hover:shadow-xl"
  onClick={() => console.log("clicked")}
>
  <Card.Content>Clickable content</Card.Content>
</Card>
```

### Structured Card

```tsx
<Card variant="elevated">
  <Card.Header>
    <h2>Card Title</h2>
  </Card.Header>

  <Card.Content>
    <p>Main content goes here</p>
  </Card.Content>

  <Card.Footer>
    <button>Action</button>
  </Card.Footer>
</Card>
```

## Current Implementation Patterns

### Skills Component Pattern

Current Skills cards have:

- Fixed height (h-80)
- Two states (default and hover reveal)
- Icon + title + description on hover

**Recommendation:** Keep current implementation. The Skills cards have complex state management that would make the base Card component too complicated.

### Hobbies Component Pattern

Current Hobbies cards have:

- Icon with gradient hover overlay
- Expanding description on hover
- Centered layout

**Recommendation:** Keep current implementation. The animation complexity is specific to this component.

### Showcase Component Pattern

Current Showcase cards have:

- Large carousel items
- Multiple layers (background icon, main icon, content)
- Coming soon variant vs. regular variant

**Recommendation:** Could potentially use Card for the wrapper:

```tsx
<Card
  variant="bordered"
  className="flex-shrink-0 w-[85vw] md:w-[600px] h-[400px] md:h-[500px]"
>
  {/* Custom complex content */}
</Card>
```

## When to Use Card Component

✅ **Use Card when:**

- Creating new simple cards
- Need consistent card styling
- Card has standard structure (header/content/footer)
- Need basic hover effects

❌ **Don't force Card when:**

- Component has complex state transitions
- Layout is highly custom
- Existing implementation is working well
- Would require many custom props

## Future Usage Examples

### Simple Content Card

```tsx
<Card variant="elevated" className="max-w-md">
  <Card.Content>
    <h3 className="text-2xl font-bold mb-4">Feature</h3>
    <p>Description of the feature</p>
  </Card.Content>
</Card>
```

### Link Card

```tsx
<a href="/details">
  <Card variant="interactive" hover hoverClassName="md:hover:shadow-lg">
    <Card.Content>
      <h3>Click me</h3>
    </Card.Content>
  </Card>
</a>
```

### Custom Styled Card

```tsx
<Card
  className="h-64 bg-gradient-to-br from-blue-500 to-purple-600"
  as="article"
>
  <div className="p-8 text-white">Custom content</div>
</Card>
```

## API Reference

### Card Props

| Prop           | Type                                                   | Default   | Description            |
| -------------- | ------------------------------------------------------ | --------- | ---------------------- |
| children       | ReactNode                                              | required  | Content to render      |
| className      | string                                                 | ""        | Additional CSS classes |
| variant        | "default" \| "bordered" \| "elevated" \| "interactive" | "default" | Visual variant         |
| hover          | boolean                                                | false     | Enable hover effects   |
| hoverClassName | string                                                 | ""        | Custom hover classes   |
| onClick        | function                                               | undefined | Click handler          |
| as             | "div" \| "article" \| "section"                        | "div"     | HTML element           |

### Subcomponents

- `Card.Content` - Padded content container (p-6 md:p-8)
- `Card.Header` - Header section (p-6 md:p-8 pb-0)
- `Card.Footer` - Footer section (p-6 md:p-8 pt-0)

## Design Decision

The existing Skills, Hobbies, and Showcase components have **highly specific implementations** that work well for their use cases. Rather than forcing them to use the Card component (which would require many custom props and reduce readability), we've created a flexible base Card for:

1. **Future components** that need standard cards
2. **Simple use cases** that don't need complex interactions
3. **Consistency** across new features

This follows the principle: **Don't over-abstract existing working code**.

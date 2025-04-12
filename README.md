# The Collective - Link Directory

A retro-styled, CRT-themed link directory built with React, TypeScript, and Tailwind CSS. The application features a unique green/amber switchable theme and a classic monitor display effect.

![The Collective Screenshot](https://github.com/n1ghtw1re/the-collective-links-tool/blob/main/the_collective_links.png)

## [Check Out the Live Preview](https://the-collective-links.netlify.app/)
## [Running live in an iFrame on Neocities](https://n1ghtw1re.neocities.org/pages/links)

## Features

- 🖥️ Retro CRT monitor design
- 🎨 Switchable color themes (green/amber)
- 📁 Categorized link organization
- 💫 Smooth animations and transitions
- 📱 Responsive design
- 🔍 Easy-to-navigate interface

## Managing Content

### Adding a New Category

1. Create a new file in `src/categories/` with the format `categoryName.ts`
2. Export an array of link objects with the following structure:

```typescript
export const categoryName = [
  {
    url: 'https://example.com',
    title: 'Example Site',
    description: 'Brief description of the site'
  }
];
```

3. Import and add the new category in `src/categories/index.ts`:

```typescript
import { categoryName } from './categoryName';

export const categories = {
  // ... existing categories
  'Category Display Name': categoryName
};
```

### Modifying Links

To modify existing links, locate the appropriate category file in `src/categories/` and update the link objects:

```typescript
export const aiTools = [
  {
    url: 'https://new-url.com',
    title: 'New Title',
    description: 'New description'
  }
  // ... other links
];
```

### Deleting Links

To remove a link, delete its object from the appropriate category array in the category file.

### Deleting Categories

1. Delete the category file from `src/categories/`
2. Remove the import and category entry from `src/categories/index.ts`

## Theming

The application supports two themes: green and amber. The theme colors are defined in `App.tsx` under the `themeColors` object:

```typescript
const themeColors = {
  green: {
    text: 'text-green-400',
    // ... other color classes
  },
  amber: {
    text: 'text-amber-400',
    // ... other color classes
  }
};
```

To modify theme colors:

1. Update the color classes in the `themeColors` object
2. Ensure new color classes are added to the `safelist` in `tailwind.config.js`

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── categories/          # Link category definitions
│   ├── index.ts        # Category exports
│   └── *.ts            # Individual category files
├── context/
│   └── ThemeContext.tsx # Theme management
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## Adding New Features

To add new features to the application:

1. Create necessary components in `src/components/`
2. Update `App.tsx` to include new components
3. Add any required styles to `index.css`
4. Update this README to document new features

## License

MIT License - feel free to use this project for your own purposes.

## Contact

For additions or changes to the link directory, contact N1ghtw1re.

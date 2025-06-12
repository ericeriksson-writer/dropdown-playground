# Dropdown Component Playground

A fully interactive playground for testing and showcasing a custom dropdown component built with React and TypeScript.

## 🚀 Live Demo

Visit the live playground: [https://yourusername.github.io/dropdown-playground](https://yourusername.github.io/dropdown-playground)

## ✨ Features

- **Interactive Demo**: Test all component variations in real-time with live controls
- **Component Matrix**: Visual overview of all size and state combinations
- **Multiple Variants**: Default and outlined styles
- **Size Options**: Small, medium, and large sizes
- **State Management**: Error states, disabled states, and focus states
- **Smooth Animations**: CSS transitions and hover effects
- **Accessible Design**: Proper focus management and keyboard navigation
- **Mobile Responsive**: Works perfectly on all device sizes

## 🎯 Component Features

- ✅ Blue focus/active state with subtle shadow
- ✅ Error state with red indicator dot and styling
- ✅ Disabled state with proper visual feedback
- ✅ Click outside to close functionality
- ✅ Smooth animations and transitions
- ✅ Outlined variant option
- ✅ Three size variations (small, medium, large)
- ✅ Hover and focus states
- ✅ Proper TypeScript support

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with custom properties
- **Poppins Font** - Typography

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dropdown-playground.git
   cd dropdown-playground
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Component Usage

```tsx
import { Dropdown } from './components/Dropdown';

function App() {
  return (
    <Dropdown 
      label="Select an option"
      variant="outlined"
      size="medium"
      error={false}
      disabled={false}
    />
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text for the dropdown |
| `variant` | `'default' \| 'outlined'` | `'default'` | Visual variant of the dropdown |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the dropdown |
| `error` | `boolean` | `false` | Shows error state with red styling |
| `disabled` | `boolean` | `false` | Disables the dropdown |
| `className` | `string` | `''` | Additional CSS classes |

## 🎪 Playground Features

### Interactive Demo
- Live component preview
- Real-time property controls
- Instant visual feedback

### Component Matrix
- All size variations (Small, Medium, Large)
- All state combinations (Default, Error, Disabled)
- Both default and outlined variants
- Easy visual comparison

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help, please open an issue on GitHub. 
# Beautiful Calculator

A modern, fully-featured calculator built with React.js, featuring a sleek dark theme design and comprehensive functionality.

## 🌟 Features

- **Complete Arithmetic Operations**: Addition (+), Subtraction (−), Multiplication (×), Division (÷)
- **Keyboard Support**: Full keyboard navigation and input support
- **Calculation History**: View your last 5 calculations
- **Real-time Display**: Live calculation preview
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Beautiful UI**: Modern gradient design with smooth animations
- **Error Handling**: Prevents division by zero and handles edge cases
- **Backspace Support**: Delete individual digits or clear everything

## 🚀 Live Demo

The calculator is deployed and available at: **https://tiny-narwhal-0bf13c.netlify.app/**

## 🛠️ Technologies Used

- **React.js** - Frontend framework
- **Tailwind CSS** - Styling and responsive design
- **Lucide React** - Beautiful icons
- **Vite** - Build tool and development server

## 📱 How to Use

### Mouse/Touch Input
- Click number buttons (0-9) to input numbers
- Click operation buttons (+, −, ×, ÷) to perform calculations
- Click "=" to get the result
- Click "Clear" to reset the calculator
- Click "⌫" to delete the last digit

### Keyboard Shortcuts
- **Numbers**: 0-9
- **Operations**: +, -, *, /
- **Equals**: Enter or =
- **Clear**: Escape, C, or c
- **Backspace**: Backspace key
- **Decimal**: . (period)

## 🏗️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd calculator-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
calculator-app/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Main calculator component
│   ├── main.jsx         # React app entry point
│   └── index.css        # Tailwind CSS imports
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## 🎨 Design Features

- **Dark Theme**: Elegant dark color scheme with purple gradients
- **Smooth Animations**: Hover effects and button press animations
- **Responsive Layout**: Adapts to different screen sizes
- **Visual Feedback**: Clear visual indicators for operations
- **Typography**: Monospace font for numbers, ensuring consistent spacing

## 🧮 Calculator Logic

The calculator implements standard arithmetic operations with proper order of operations:

- **Immediate Execution**: Operations are performed as soon as the next operator is pressed
- **Chain Calculations**: Results can be used in subsequent calculations
- **Error Prevention**: Division by zero returns 0 instead of throwing an error
- **Number Formatting**: Large numbers are displayed in scientific notation
- **Decimal Support**: Full decimal number support with proper validation

## 🔧 Customization

### Changing Colors
Edit the Tailwind classes in `src/App.jsx` to customize the color scheme:

```jsx
// Button variants in the Button component
const variants = {
  default: 'bg-gradient-to-b from-gray-100 to-gray-200...',
  operation: 'bg-gradient-to-b from-blue-500 to-blue-600...',
  equals: 'bg-gradient-to-b from-green-500 to-green-600...',
  clear: 'bg-gradient-to-b from-red-500 to-red-600...'
};
```

### Adding New Features
The calculator is built with modular React hooks, making it easy to extend:

- Add new operations in the `calculate` function
- Extend keyboard support in the `handleKeyPress` function
- Modify the display format in the `formatDisplay` function

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ using React.js and modern web technologies.

---

**Enjoy calculating!** 🧮✨#

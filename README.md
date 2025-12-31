# React Widgets

React Widgets is a collection of customizable and reusable React components designed to enhance your web applications. This project is built using modern tools like Vite for fast development and SCSS for styling.

## Features

- **Modular Components**: Includes components like Backdrop, CloseButton, ConfigButton, ResizeButton, Resizer, and Widget.
- **Customizable Styles**: SCSS modules for scoped and maintainable styles.
- **Utility Functions**: Helper functions to streamline widget management.
- **Asset Management**: Includes assets like images and icons for a complete user experience.

## Project Structure

```
public/
  vite.svg
src/
  App.jsx
  index.css
  main.jsx
  ReactWidgets/
    index.jsx
    react-widgets.module.scss
    assets/
      chart-1.jpg
      chart-2.jpg
      chart-3.jpg
    components/
      Backdrop/
        backdrop.module.scss
        index.jsx
      CloseButton/
        close-button.module.scss
        index.jsx
      ConfigButton/
        config-button.module.scss
        gear-icon.svg
        index.jsx
      ResizeButton/
        index.jsx
        resize-button.module.scss
      Resizer/
        index.jsx
        resizer.module.scss
      Widget/
        index.jsx
        widget.module.scss
    constants/
      index.js
    utils/
      index.js
      widgetsToRows.js
```

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd react-widgets
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development

Start the development server:
```bash
npm run dev
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000`.

### Build

To create a production build:
```bash
npm run build
# or
yarn build
```

### Preview Production Build

To preview the production build locally:
```bash
npm run preview
# or
yarn preview
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Inspired by modern React development practices.

# naive-example

A simple React image gallery website.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Unsplash API key:
   ```bash
   export UNSPLASH_ACCESS_KEY=your_api_key_here
   ```
   Get your free API key at [https://unsplash.com/developers](https://unsplash.com/developers)

3. Download gallery images:
   ```bash
   npm run download
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to the URL shown in the terminal (typically http://localhost:5173)

## Features

- Responsive image gallery layout
- Sample images from Picsum
- Clean, minimal design

## Scripts

- `npm run download` - Download 100 random images from Unsplash
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
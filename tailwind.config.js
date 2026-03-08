/** @type {import(''tailwindcss'').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef4ff',
          100: '#d9e7ff',
          200: '#bcd3ff',
          300: '#8eb6ff',
          400: '#5b90f5',
          500: '#2f68dd',
          600: '#143f9c',
          700: '#0f327f',
          800: '#0b2561',
          900: '#081b48'
        },
        secondary: {
          50: '#f7f8fb',
          100: '#eff1f5',
          200: '#dde1e8',
          300: '#c6ccd7',
          400: '#99a4b5',
          500: '#6b7587',
          600: '#4f596a',
          700: '#384252',
          800: '#232b38',
          900: '#151b25'
        },
        steel: {
          50: '#fafafa',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827'
        },
        accent: {
          500: '#97b8ff',
          600: '#739cf5'
        },
        success: {
          500: '#0f766e'
        },
        error: {
          500: '#b42318',
          600: '#912018'
        }
      },
      fontFamily: {
        sans: ['Source Sans 3', 'sans-serif'],
        display: ['Source Sans 3', 'sans-serif']
      },
      height: {
        hero: '38rem'
      },
      boxShadow: {
        panel: '0 20px 60px rgba(8, 27, 72, 0.10)',
        soft: '0 12px 30px rgba(15, 50, 127, 0.08)'
      },
      backgroundImage: {
        'brand-radial': 'radial-gradient(circle at top left, rgba(151, 184, 255, 0.35), transparent 40%)',
        'brand-mesh': 'linear-gradient(135deg, rgba(8, 27, 72, 0.98), rgba(15, 50, 127, 0.94) 45%, rgba(47, 104, 221, 0.88))'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};

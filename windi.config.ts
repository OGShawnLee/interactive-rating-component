import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  theme: {
    colors: {
      black: '#000000',
      orange: 'hsl(25, 97%, 53%)',
      slate: {
        400: 'hsl(217, 12%, 63%)',
        500: 'hsl(216, 12%, 54%)',
        800: 'hsl(213, 19%, 18%)',
        900: 'hsl(216, 12%, 8%)',
      },
      white: '#FFFFFF',
    },
    fontFamily: {
      overpass: ['Overpass', 'sans-serif'],
    },
  },
});

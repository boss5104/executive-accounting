/** Tailwind config for Executive Pro — compiled into index.html by tools/build-css.sh */
module.exports = {
    content: ['./index.html'],
    darkMode: 'class',
    safelist: ['grid-cols-1', 'grid-cols-2', 'grid-cols-3'],
    theme: {
        extend: {
            fontFamily: { prompt: ['Prompt', 'sans-serif'] },
            colors: {
                navy: { 950: '#070b14', 900: '#0e1628', 850: '#14203a', 800: '#1b2a4a' },
                gold: { 300: '#e6cd8f', 400: '#d4b067', 500: '#c49a45', 600: '#a77f33' },
                indigo: { 50: '#f3f5fa', 100: '#e4e9f4', 200: '#c8d3e9', 300: '#9fb1d6', 400: '#7189bd', 500: '#4c67a2', 600: '#35508a', 700: '#294073', 800: '#20325b', 900: '#18264a', 950: '#0e172e' },
                violet: { 50: '#f3f5fa', 100: '#e4e9f4', 200: '#c8d3e9', 300: '#9fb1d6', 400: '#7189bd', 500: '#4c67a2', 600: '#294073', 700: '#20325b', 800: '#18264a', 900: '#121d3a', 950: '#0e172e' },
                purple: { 50: '#f3f5fa', 100: '#e4e9f4', 200: '#c8d3e9', 300: '#9fb1d6', 400: '#7189bd', 500: '#4c67a2', 600: '#294073', 700: '#20325b', 800: '#18264a', 900: '#121d3a', 950: '#0e172e' },
                amber: { 50: '#fbf8f0', 100: '#f6eedb', 200: '#ecdcb3', 300: '#e0c68a', 400: '#d4b067', 500: '#c49a45', 600: '#a77f33', 700: '#86652a', 800: '#6a5024', 900: '#56421f', 950: '#30240f' }
            }
        }
    }
};

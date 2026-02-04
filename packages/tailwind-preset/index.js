const tokens = require('./tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class', '[data-theme]'],
    theme: {
        extend: {
            colors: tokens.colors,
            spacing: tokens.spacing,
            borderRadius: tokens.radius,
            zIndex: tokens.zIndex,
            animation: {
                'fade-in': 'fadeIn 0.3s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
            },
            // Brutalist utilities
            boxShadow: {
                'brutalist': '0px 5px 0px 0px var(--shadow-color)',
                'hover': '0px 7px 0px 0px var(--shadow-color)',
                'impact': '0px 10px 0px 0px var(--shadow-color)',
                'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)'
            },
            borderRadius: {
                'brutalist': '12px',
                'none': '0'
            },
            letterSpacing: {
                'brutalist': '0.1em',
                'uppercase': '0.2em'
            }
        }
    },
    plugins: [
        require('tailwindcss-animate')
    ]
}

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                saffron: {
                    50: '#fff7ed',
                    100: '#ffedd5',
                    200: '#fed7aa',
                    300: '#fdba74',
                    400: '#fb923c',
                    500: '#FF9933', // Indian flag saffron
                    600: '#ea580c',
                    700: '#c2410c',
                },
                govt: {
                    green: '#138808',     // Indian flag green
                    navy: '#000080',       // Government navy
                    blue: '#1a365d',       // Royal blue
                    slate: '#64748b',      // Slate grey
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            }
        },
    },
    plugins: [],
}

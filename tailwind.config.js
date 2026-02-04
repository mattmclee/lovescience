/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'sci-bg': '#0a0b1e',
                'sci-primary': '#4f46e5',
                'sci-secondary': '#ec4899',
                'sci-accent': '#10b981',
            },
        },
    },
    plugins: [],
}

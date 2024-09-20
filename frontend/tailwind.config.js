/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                purple: "#051036",
                grey: "#697488",
                "light-blue": "#e5f0fd",
                primary: "#3554d1",
                "gray": "#697488",
                "light-gray": "#F5F5F5",
                "gray-border": "#ddd",
                "success": "#008009",
            },
        },
    },
    plugins: [],
};

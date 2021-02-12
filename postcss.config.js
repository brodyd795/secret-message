const purgecss = [
    '@fullhuman/postcss-purgecss',
    {
        content: ['./components/**/*.js', './pages/**/*.js'],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || []
    }
];

module.exports = {
    plugins: [
        'postcss-import',
        'tailwindcss',
        'autoprefixer',
        ...process.env.ENVIRONMENT === 'prod' ? [purgecss] : []
    ]
};

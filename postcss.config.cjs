/* eslint-disable no-undef */
module.exports = {
    plugins: {
        'postcss-nested': {},
        autoprefixer: {},
        'postcss-custom-media': {},
        'postcss-custom-selectors': {},
        'postcss-partial-import': {
            from: "src/styles/main.pcss"
        }
    }
}

module.exports = {
    plugins: [
        require('autoprefixer')({
            browsers: [
                // 加这个后可以出现额外的兼容性前缀
                // "> 0.01%"
            ]
        }),
        require('postcss-px-to-viewport')({
            viewportWidth: 750,
            viewportHeight: 1334,
            unitPrecision: 5,
            viewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false
        }),
        require('postcss-write-svg')({
            utf8: false
        })
    ]
};
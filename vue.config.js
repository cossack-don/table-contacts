// module.exports = {
//     publicPath: process.env.NODE_ENV === 'production' ?
//         '/table-contacts/' :
//         '/'
// };


// vue.config.js
module.exports = {
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            publicPath: '/table-contacts/'
            // изменение конфигурации для production...
        } else {
            // изменения для разработки...
        }
    }
}
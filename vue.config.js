module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ?
        '/table-contacts/' :
        '/'
};



// module.exports = {
//     configureWebpack: config => {
//         if (process.env.NODE_ENV === 'production') {
//             publicPath: process.env.NODE_ENV === 'production'
//                 ? '/production-sub-path/'
//                 : '/'
//             // изменение конфигурации для production...
//         } else {
//             // изменения для разработки...
//         }
//     }
// }
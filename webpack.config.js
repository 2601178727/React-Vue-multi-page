var path = require('path');
// 将样式提取到单独的 css 文件中，而不是打包到 js 文件或使用 style 标签插入在 head 标签中
var CleanWebpackPlugin = require('clean-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
// var VueLoaderPlugin = require('vue-loader/lib/plugin');
// css、js压缩、优化插件
var TerserPlugin = require('terser-webpack-plugin');
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var getEntry = require('./buildTools');

// var AutoDllPlugin = require('autodll-webpack-plugin');

// 生成自动引用 js 文件的HTML
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entries = getEntry('./source/**/index.?(jsx|js)'); // 获得入口 js 文件
var chunks = Object.keys(entries);

var vuxLoader = require('vux-loader');

var webpackConfig = {
  entry: entries,
  // entry: {
  //   'index/index': './source/index/index/index.js'
  // },
  output: {
    path: path.resolve(__dirname, 'dist'), // html, css, js 图片等资源文件的输出路径，将所有资源文件放在 Public 目录
    publicPath: '../../',                  // html, css, js 图片等资源文件的 server 上的路径
    filename: 'js/[name].[hash].js'         // 每个入口 js 文件的生成配置
  },
  resolve: {
    extensions: ['.js', '.vue', '.jsx', '.json', '.ts'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js', //完整版本的vue
      '@': path.resolve(__dirname, 'source')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ],
        exclude: /node_modules/
      },
      {
        
        test: /\.css$/,
        // 使用提取 css 文件的插件，能帮我们提取 webpack 中引用的和 vue 组件中使用的样式
        use: [
          // 开发模式下使用 vue-style-loader，以便使用热重载
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        // vue-loader，加载 vue 组件
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        // 使用 es6 开发，这个加载器帮我们处理
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: {
          presets: [
            "@babel/preset-react"
          ]
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        // 图片加载器，较小的图片转成 base64
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: './imgs/[name].[ext]?[hash:7]'
        }
      },
      {
        test: /\.less/,
        use: [
          { loader: 'less-loader' }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
    // new VueLoaderPlugin(),
    // new webpack.DllReferencePlugin({
    //   context: path.join(__dirname, '.'),  // 与DllPlugin中的那个context保持一致
    //   manifest: require('./Public/vendor-manifest.json')
    // }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          minChunks: chunks.length,
        }
      }
    }
  }
};

var prod = process.env.NODE_ENV === 'production';
webpackConfig.plugins = (webpackConfig.plugins || []);
if (prod) {
  webpackConfig.devtool = 'source-map';
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new CleanWebpackPlugin([
      path.resolve(__dirname, 'dist/') // 删除旧文件
    ])
  ]);
  webpackConfig.optimization.minimizer = [
    new TerserPlugin({ // 压缩js
      cache: true,
      parallel: true
    }),
    new OptimizeCSSAssetsPlugin({ // 压缩css
      cssProcessorOptions: {
        safe: true
      }
    })
  ]
} else {
  webpackConfig.devtool = 'eval-source-map';
  webpackConfig.output.publicPath = '/';
}

var pages = getEntry('./source/view/**/*.html');
console.log('pages', pages)
for (var pathname in pages) {
  // 配置生成的 html 文件，定义路径等
  var conf = {
    filename: prod ? './view/' + pathname + '.html' : pathname + '.html', // html 文件输出路径
    template: pages[pathname], // 模板路径
    inject: true,              // js 插入位置
    minify: {
      removeComments: true,
      collapseWhitespace: false
    }
  };
  if (pathname in webpackConfig.entry) {
    conf.chunks = ['vendors', pathname];
    conf.hash = false;
  }
  // 需要生成几个 html 文件，就配置几个 HtmlWebpackPlugin 对象
  webpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// 开发模式下有缓存的情况下，autodll 插件不会生成新的文件，导致 404，生产模式下构建没问题
// module.exports.plugins.push(new AutoDllPlugin({
//   inject: true, // will inject the DLL bundles to html
//   context: path.join(__dirname, '.'),
//   filename: '[name].dll.js',
//   debug: true,
//   inherit: true,
//   // path: './',
//   plugins: [
//     new TerserPlugin({ // 压缩js
//       cache: true,
//       parallel: true
//     }),
//     new MiniCssExtractPlugin({
//       filename: '[name].css'
//     })
//   ],
//   entry: {
//     vendor: ['vue/dist/vue.esm.js', 'axios', 'normalize.css']
//   }
// }));

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    {
      name: 'vux-ui'
    },
    {
      name: 'duplicate-style'
    },
    {
      name: 'less-theme',
      path: './source/vuxStyle/theme.less'
    }
  ]

});

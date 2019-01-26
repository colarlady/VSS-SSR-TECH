const path = require('path')
const htmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')


const isDev = process.env.NODE_ENV === 'development'

const config = {
    target:'web',
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.[hash:8].js',
        path:path.join(__dirname,'dist')
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV :isDev?'"development"':'"production"'
            }
        }),
        new htmlWebPackPlugin()
    ],
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.jsx$/,
                loader:'babel-loader'
            },
            {
                test:/\.(svg|png|jpg|jpeg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name].[ext]'
                        }
                    }
                ]
            }
           
        ]
    }
   
}

if(isDev){
    config.module.rules.push( {
        test:/\.scss$/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options:{
                    sourceMap:true,
                }
            },
            'sass-loader'
        ] 
     })
    config.devServer = {
        port:8000,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        hot:true
    }

    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    config.entry ={
       app: path.join(__dirname,'src/index.js'),
       vendor:['vue']
    }
    config.output.filename ='[name].[chunkhash:8].js'
    config.module.rules.push(
        {
            test:/\.scss$/,
            use:ExtractPlugin.extract({
                fallback:'style-loader',
                use:[
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true,
                        }
                    },
                    'sass-loader'
                ] 
            })
         }
    )

    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
    
        new webpack.optimize.CommonsChunkPlugin({
            name:"vendor"
         }),
        new webpack.optimize.CommonsChunkPlugin({
           name:"runtime"
        })
    )
}

module.exports = config
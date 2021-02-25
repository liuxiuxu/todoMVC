const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
module.exports={
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:'[hash].js',
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'webpack学习',
            template:path.resolve(__dirname,'../index.html'),
            filename:'index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/[hash].css'
        }),
        new CleanWebpackPlugin({
            path:'../dist'
        })
    ],
    module:{
        rules:[
            {
                test:/\.(png|jpg|gif)$/,
                loader:'url-loader',
                options:{
                    limit:1024*26,
                    name:'images/[hash].[ext]',
                    esModule:false
                }
            },
            {
                test:/\.css$/,
                use:[{
                    loader:MiniCssExtractPlugin.loader,
                    options:{
                        publicPath:'../'
                    }
                },'css-loader']
            }
        ]
    }
}
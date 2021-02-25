const base=require('./webpack.base.config');
const {merge}=require('webpack-merge');
const OptimizeCssAssets=require('optimize-css-assets-webpack-plugin');
const UglifyjsWebpackPlugin=require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports=merge(base,{
    mode:'production',
    output:{
        publicPath:'./'
    },
    optimization:{
        minimizer:[
            new OptimizeCssAssetsPlugin(),
            new UglifyJsPlugin()
        ]
    }
})
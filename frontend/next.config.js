const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const withPlugins = require('next-compose-plugins');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const withPWA = require('next-pwa');

// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
const theme = {
  'primary-color': '#7fba00',
  'layout-header-background': '#007364',
  'font-size-sm': '14px',
  'font-size-base': '16px',
  'font-size-lg': '16px',
  'typography-title-font-weight': '800',
  '@border-radius-base': '4px',
  'btn-font-size-lg': '16px',
  'btn-height-base': '44px',
  'btn-height-lg': '56px',
  'btn-height-sm': '32px',
  'input-height-base': '44px',
  'input-height-lg': '56px',
  'line-height-base': '1.75',
  'zindex-notification': '1101',
  'font-family': `'Nunito Sans', Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
  'dropdown-line-height': '30px',
  'menu-item-height': '56px',
  'menu-inline-toplevel-item-height': '56px',
};

const config = withPlugins([
  [withCSS],
  [withLess],
  [withPWA, { 
    pwa: {
      dest: 'public'
    }
  }],
], {
  target: 'serverless',
  poweredByHeader: false,
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  },
  cssLoaderOptions: {
    url: false
  },
  lessLoaderOptions: {
    modifyVars: theme,
    javascriptEnabled: true
  },
  webpack: (config) => {
    config.plugins = config.plugins || []
    if (config.mode === 'production') {
      config.plugins.push(new MomentLocalesPlugin())
      config.plugins.push(new MomentTimezoneDataPlugin({
        matchZones: [/^Australia/, 'Pacific/Auckland', 'Etc/UTC'],
        startYear: 2000,
        endYear: 2030,
      }))
      if (process.env.ANALYZE === 'true') {
        config.plugins.push(new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          generateStatsFile: true,
        }))
      }
    }

    return config;
  },
});

module.exports = config;

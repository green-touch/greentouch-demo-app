const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;
const path = require('path');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const config = mergeConfig(getDefaultConfig(__dirname), {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    extraNodeModules: {
      '@_assets': path.resolve(__dirname, 'src/assets'),
      '@_axios': path.resolve(__dirname, 'src/axios'),
      '@_components': path.resolve(__dirname, 'src/components'),
      '@_hooks': path.resolve(__dirname, 'src/hooks'),
      '@_layouts': path.resolve(__dirname, 'src/layouts'),
      '@_screens': path.resolve(__dirname, 'src/screens'),
      '@_services': path.resolve(__dirname, 'src/services'),
      '@_styles': path.resolve(__dirname, 'src/styles'),
      '@_types': path.resolve(__dirname, 'src/types'),
      '@_utils': path.resolve(__dirname, 'src/utils'),
      '@_zustand': path.resolve(__dirname, 'src/zustand'),
      '@_store': path.resolve(__dirname, 'src/store'),
    },
  },
});

module.exports = withNativeWind(config, { input: './src/styles/global.css' });

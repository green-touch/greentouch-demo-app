module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    '@babel/preset-react',
    '@babel/preset-typescript',
    'nativewind/babel',
  ],
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@_assets': './src/assets',
          '@_axios': './src/axios',
          '@_components': './src/components',
          '@_hooks': './src/hooks',
          '@_layouts': './src/layouts',
          '@_screens': './src/screens',
          '@_services': './src/services',
          '@_styles': './src/styles',
          '@_types': './src/types',
          '@_utils': './src/utils',
          '@_zustand': './src/zustand',
          '@_store': './src/store',
        },
      },
    ],
  ],
};

import basicConfig, {file} from './rollup.config';

export default {
  ...basicConfig,
  output: {
    name: 'sim-ui',
    file: file('umd'),
    format: 'umd',
    globals: {
      'vue': 'Vue'
    },
    exports: 'named'
  }
};

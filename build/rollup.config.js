import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import typescript from 'rollup-plugin-typescript2';
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { name } from '../package.json';

const file = type => `dist/${name}.${type}.js`;
const overrides = {
  compilerOptions: { declaration: true },
  exclude: ['tests/**/*.ts', 'tests/**/*.tsx']
};
export { name, file };
export default {
  input: 'src/index.ts',
  output: {
    name,
    file: file('esm'),
    format: 'es'
  },
  plugins: [
    nodeResolve(),
    excludeDependenciesFromBundle({
      peerDependencies: true,
      dependencies: false
    }),
    typescript({ tsconfigOverride: overrides }),
    vue({
      preprocessStyles: true
    }),
    css({ output: 'sim-ui.css' }),
  ],
  external: ['vue']
};

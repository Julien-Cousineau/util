import {terser} from 'rollup-plugin-terser';
import buble from 'rollup-plugin-buble';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
const config = (file, plugins) => ({
    input: 'src/index.js',
    output: {
        name: 'util',
        format: 'umd',
        indent: false,
        file
    },
    plugins
});

export default [
    config('build/util.js', [json(),resolve(),buble()]),
    config('build/util.min.js', [json(),resolve(),terser(), buble()])
];
import typescript from 'rollup-plugin-typescript';

export default {
    input: 'src/main.ts',
    output: {
        file: 'dist/widget.js',
        format: 'cjs'
    },
    plugins: [
        typescript()
    ]
}
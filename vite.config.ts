import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src') //路径别名
        },
        extensions: ['.js', '.json', '.ts'] //使用路径规则是想要忽略的文件后缀名
    }
})
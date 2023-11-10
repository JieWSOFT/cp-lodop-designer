import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from 'path';
import dts from "vite-plugin-dts";

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/'
      },
    ]
  },
  build: {
    //打包后文件目录
    outDir: "es",
    //压缩
    minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: ["vue","ant-design-vue"],
      //input: ["index.ts"],
      output: {
        globals: {
          vue: "Vue",
        },
        dir: "dist",
      },
    },
    lib: {
      entry: "./index.ts",
      name: "cp-lodop-designer",
      fileName: "cp-lodop-designer",
      formats: ["es", "umd", "cjs"],
    },
  },
  plugins: [vue(),
    dts({
      entryRoot: "./src",
      outDir: ['./types'],
      // outDir: ["../easyest/es/src", "../easyest/lib/src"],
      //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
      tsconfigPath: "./tsconfig.json",
    }),
  ],
});

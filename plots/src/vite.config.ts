import type { UserConfig } from 'vite'
import path from 'path'
import reactRefresh from '@vitejs/plugin-react-refresh'
import mdx from 'vite-plugin-mdx'
import pages, {DefaultPageStrategy, extractStaticData, File, FileHandler, PageStrategy} from 'vite-plugin-react-pages'
import {getPagePublicPath} from "vite-plugin-react-pages/dist/node/page-strategy/DefaultPageStrategy";

const fileHandler: FileHandler = async (file: File, fileHandlerAPI) => {
    fileHandlerAPI.addPageData({
        pageId: getPagePublicPath(file.relative).split('.')[0],
        dataPath: file.path,
        staticData: await extractStaticData(file),
    })
}

module.exports = {
  jsx: 'react',
  plugins: [
    reactRefresh(),
    mdx(),
    pages({
        pagesDir: __dirname,
        // custom pageStrategy
        pageStrategy: new PageStrategy(function findPages(pagesDir, helpers) {
            helpers.watchFiles(
                path.join(pagesDir, 'plots'),
                '**/**/*.{md,mdx,js,jsx,ts,tsx}',
                fileHandler
            )
        }),
    }),
  ],
  resolve: {
    alias: {
      'my-lib': path.join(__dirname, '../src'),
    },
  },
} as UserConfig

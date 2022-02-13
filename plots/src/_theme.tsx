import React from 'react'
import { createTheme, defaultSideNavs } from 'vite-pages-theme-doc'


export default createTheme({
  logo: <div style={{ fontSize: '20px' }}>Plots</div>,

  sideNavs: (ctx) => {
    return defaultSideNavs(ctx )
  },
  Component404: ()=><h1>404</h1>,
})

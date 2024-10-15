/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TreemapImport } from './routes/treemap'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const TreemapRoute = TreemapImport.update({
  path: '/treemap',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/treemap': {
      id: '/treemap'
      path: '/treemap'
      fullPath: '/treemap'
      preLoaderRoute: typeof TreemapImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/treemap': typeof TreemapRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/treemap': typeof TreemapRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/treemap': typeof TreemapRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/treemap'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/treemap'
  id: '__root__' | '/' | '/treemap'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  TreemapRoute: typeof TreemapRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  TreemapRoute: TreemapRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/treemap"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/treemap": {
      "filePath": "treemap.tsx"
    }
  }
}
ROUTE_MANIFEST_END */

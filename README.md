# gatsby-source-license

Gatsby source plugin for pulling software license information from dependencies.

The plugin reads the dependencies from `package.json`, and will check the `node_modules` directories for these dependencies and their licenses.
In addition, it also checks nested dependencies, and should work for npm 3.x and higher.

## Install

This plugin can be installed by using:

```none
npm install --save gatsby-source-license
```

## How to use

```javascript
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-license`,
      options: {
        // The amount of nested dependencies that should be checked.
        // 1 = Only the license within the current package.json is sourced
        // 2 = Licenses of direct dependencies and the current package are sourced
        // Infinity = All dependencies will be checked.
        // Default = Infinity
        depth: Infinity,
        // Indicates whether the own software license should be sourced or not.
        // Be aware that this may conflict with maxDepth.
        // If you set this to true, and have a maxDepth of 1, no software license will be sourced.
        // Default = true
        excludeSelf: true,
        // A list of excluded dependencies, using the format library@1.0.0.
        // For example, if we want to exclude ESLint version 6.8.0, we use [`eslint@6.8.0`]
        // Default = []
        excludedDependencies: [],
        // Indicates whether normal dependencies should be sourced or not.
        // If you set this to true, normal dependencies will be sourced.
        // Default = true
        includeDependencies: true,
        // Indicates whether development dependencies should be sourced or not.
        // If you set this this to true, development dependencies (dependencies installed with --save-dev) will be sourced.
        // Default = false
        includeDevDependencies: false
      }
    }
  ]
};
```
## How to query

Once done, you can query for the software licenses your project uses, by using the following query:

```graphql
query {
  allSoftwareLicenseLibrary {
    edges {
      node {
        license
        label
        url
        name
        version
      }
    }
  }
}
```

This would return a JSON structure similar to:

```json
{
  "allSoftwareLicenseLibrary": {
    "edges": [
      {
        "node": {
          "license": "MIT",
          "label": "gatsby-source-license@0.0.1",
          "url": "https://github.com/g00glen00b/gatsby-source-license",
          "name": "gatsby-source-license",
          "version": "0.0.1"
        }
      }
    ]
  }
}
```

# matrsomething.com v2
---
**Trello Tracker:** (https://trello.com/b/IPu2FxMa/matrsomething-studio-identity)

## Local Preview
---
A basic HTTP server can be enabled for local previewing. Server side languages and redirect functionality such as `PHP` and `.htaccess` rules will not work as expected:

**Steps to run:**

1. `cd` into the root directory
2. Run `npm run serve`
3. Open `http://localhost:9090/` in browser of choice

## Stage Preview
---
**URL:** (http://matrsomething.com/stage/)

## Live
---
**URL:** (http://matrsomething.com/)

## Supported Viewports
---
- `xsmall`
- `small`
- `medium`
- `large`
- `xlarge`

## Supported Devices
---
Lowest denominator modeled after iPhone SE

## Analytics
---
N/A

## Dev Dependencies
---
All packages have been checked for upgrades and updated. Gulp however needs to remain at `"^3.9.1"` as latest release breaks the build system.

**Notes:**

- Stack Overflow (https://stackoverflow.com/questions/27024431/updating-gulp-plugins)
- NPMJS: npm-check-updates (https://www.npmjs.com/package/npm-check-updates)

**Steps to run:**

1. `npm install -g npm-check-updates`
2. `npm-check-updates -u`
3. `rm -fr node_modules`
4. `npm install`

## Dependencies
---
Bootstrap is included however only the grid component is currently utilized in order to trim the fat.

- See package.json (https://bitbucket.org/mrusz1683/matrsomething-v2/src/master/package.json)

## Build System
Project uses Gulp (https://gulpjs.com/) to generate tasks for building.

**Tasks:**

* `gulp html`: Collects all `.hbs` files in `src` and complies them using `config.json` from `data/` for build settings into `dist/` as HTML
* `gulp js`: Collects all `.js` files in `src` and complies them into `dist/` as built JS
* `gulp css`: Collects all `.scss` files in `src` and complies them into `dist/` as built CSS
* `gulp assets`: Collects all asset files in `assets` and moves them into `dist/` as built `assets`
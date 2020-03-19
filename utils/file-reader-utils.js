"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readPackage = readPackage;
exports.isExisting = isExisting;
exports.getDependencyDirectory = getDependencyDirectory;
exports.getChildDependencyDirectories = getChildDependencyDirectories;

var _fs = require("fs");

var _path = require("path");

const {
  readFile,
  access
} = _fs.promises;

async function readPackage(directory) {
  const data = await readFile(`${directory}${_path.sep}package.json`);
  const {
    name,
    version,
    license,
    dependencies,
    devDependencies,
    repository
  } = JSON.parse(data);
  return {
    name,
    version,
    license,
    dependencies,
    devDependencies,
    repository
  };
}

async function isExisting(directory) {
  try {
    await access(directory);
    return true;
  } catch (err) {
    return false;
  }
}

async function getDependencyDirectory(dependency, directory, baseDir = directory) {
  const relativeDependency = `${directory}${_path.sep}node_modules${_path.sep}${dependency}`;
  const baseDependency = `${baseDir}${_path.sep}node_modules${_path.sep}${dependency}`;

  if (await isExisting(relativeDependency)) {
    return relativeDependency;
  } else if (await isExisting(baseDependency)) {
    return baseDependency;
  } else {
    return null;
  }
}

function getChildDependencyDirectories(dependencies, directory, baseDir = directory) {
  return Promise.all(dependencies.map(dependency => getDependencyDirectory(dependency, directory, baseDir)));
}
//# sourceMappingURL=file-reader-utils.js.map
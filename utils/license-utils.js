"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLicenses = getLicenses;

var _fileReaderUtils = require("./file-reader-utils");

var _normalizerUtils = require("./normalizer-utils");

async function getLicenses(directory, options, baseDir = directory) {
  const {
    excludedDependencies = [],
    includeDependencies = true,
    includeDevDependencies = false,
    depth = Infinity
  } = options;
  const {
    dependencies,
    devDependencies,
    ...packageInfo
  } = await (0, _fileReaderUtils.readPackage)(directory);
  const currentLicense = (0, _normalizerUtils.getLicenseInfo)(packageInfo);
  const newExcludedDependencies = [...excludedDependencies, currentLicense.label];

  if (excludedDependencies.includes(currentLicense.label)) {
    return mergeLicenses(options, directory, baseDir);
  } else {
    const newOptions = { ...options,
      excludedDependencies: newExcludedDependencies,
      depth: depth - 1
    };
    const childLicenses = includeDependencies ? await getChildLicenses(dependencies, newOptions, directory, baseDir) : [];
    const childDevLicenses = includeDevDependencies ? await getChildLicenses(devDependencies, newOptions, directory, baseDir) : [];
    const allChildLicenses = [...childLicenses.flat(), ...childDevLicenses.flat()];
    return mergeLicenses(newOptions, directory, baseDir, currentLicense, allChildLicenses);
  }
}

function mergeLicenses(options, directory, baseDir, currentLicense, childLicenses = []) {
  const isSelf = directory === baseDir;
  const {
    excludeSelf = true
  } = options;

  if (isSelf && excludeSelf || currentLicense == null) {
    return childLicenses;
  } else {
    return [currentLicense, ...childLicenses];
  }
}

async function getChildLicenses(dependencies, options, directory, baseDir) {
  const {
    depth
  } = options;

  if (depth === 0 || dependencies == null) {
    return [];
  } else {
    const childDirectories = await (0, _fileReaderUtils.getChildDependencyDirectories)(Object.keys(dependencies), directory, baseDir);
    return Promise.all(childDirectories.filter(isFound).map(directory => getLicenses(directory, options, baseDir)));
  }
}

function isFound(directory) {
  return directory != null;
}
//# sourceMappingURL=license-utils.js.map
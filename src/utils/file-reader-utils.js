import { promises as fs } from 'fs';
import { sep } from 'path';

const {readFile, access} = fs;

export async function readPackage(directory) {
  const data = await readFile(`${directory}${sep}package.json`);
  const {name, version, license, dependencies, devDependencies, repository} = JSON.parse(data);
  return {name, version, license, dependencies, devDependencies, repository};
}

export async function isExisting(directory) {
  try {
    await access(directory);
    return true;
  } catch (err) {
    return false;
  }
}

export async function getDependencyDirectory(dependency, directory, baseDir = directory) {
  const relativeDependency = `${directory}${sep}node_modules${sep}${dependency}`;
  const baseDependency = `${baseDir}${sep}node_modules${sep}${dependency}`;
  if (await isExisting(relativeDependency)) {
    return relativeDependency;
  } else if (await isExisting(baseDependency)) {
    return baseDependency;
  } else {
    return null;
  }
}

export function getChildDependencyDirectories(dependencies, directory, baseDir = directory) {
  return Promise.all(dependencies.map(dependency => getDependencyDirectory(dependency, directory, baseDir)));
}


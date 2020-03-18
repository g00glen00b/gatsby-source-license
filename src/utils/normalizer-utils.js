export function getLicenseInfo({name, version, license, repository: {url} = {}}) {
  return {
    name,
    version,
    license: getLicense(license),
    url: getRepository(url),
    label: `${name}@${version}`
  };
}


function getRepository(url) {
  return getHttpsRepository(url) || getSshRepository(url) || getGitHubUsernameRepository(url);
}

function getLicense(license) {
  if (typeof license === 'string') {
    return license;
  } else if (license != null && license.type != null) {
    return license.type;
  } else {
    return 'UNKNOWN';
  }
}

function getHttpsRepository(url) {
  const [,, httpsUrl] = url.match(/^(git\+)?(https?:.+?)(\.git)?$/) || [];
  return httpsUrl;
}

function getSshRepository(url) {
  const [,,,sshUrl] = url.match(/^git(\+ssh)?:\/\/(.+?@)?(.+?)(\.git)$/) || [];
  return sshUrl;
}

function getGitHubUsernameRepository(url) {
  const [,username, repository] = url.match(/^github.com:(.+?)\/(.+?)$/);
  if (username == null || repository == null) {
    return null;
  } else {
    return `https://github.com/${username}/${repository}`;
  }
}

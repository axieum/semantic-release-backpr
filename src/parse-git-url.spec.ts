import {describe, expect, it} from 'bun:test';
import {type OwnerRepoPair, parseGitUrl} from './parse-git-url.js';

describe('parseGitUrl', () => {
  it.each([
    ['https://github.com/axieum/semantic-release-backpr.git', ['axieum', 'semantic-release-backpr'] as OwnerRepoPair],
    ['ssh://git@bitbucket.org/jenkinsci/JenkinsPipelineUnit.git', ['jenkinsci', 'JenkinsPipelineUnit'] as OwnerRepoPair],
    ['git@HOSTNAME:microsoft/PowerToys.git', ['microsoft', 'PowerToys'] as OwnerRepoPair],
    ['git@HOSTNAME.co.uk:lorem/ipsum/dolor.git', ['ipsum', 'dolor'] as OwnerRepoPair],
  ])('parses valid url: %p', (url: string, expected: OwnerRepoPair) => {
    expect(parseGitUrl(url)).toMatchObject(expected);
  });

  it.each([
    'https://github.com/axieum/semantic-release-backpr', 'git@HOSTNAME:microsoft.git', '', undefined,
  ])('rejects invalid url: %p', (url: string | undefined) => {
    expect(parseGitUrl(url)).toMatchObject([]);
  });
});

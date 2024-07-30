import type SemanticReleaseError from '@semantic-release/error';
import pkg from '../../package.json';

const [homepage] = pkg.homepage.split('#');
const linkify = (file: string): string => `${homepage}/blob/master/${file}`;

/**
 * A collection of plugin error definitions.
 */
/* eslint-disable @typescript-eslint/naming-convention */
export const ERROR_DEFINITIONS: Record<string, (context: any) => Pick<SemanticReleaseError, 'message' | 'details'>> = {
  /**
   * The Bitbucket access token is improperly configured.
   *
   * @param owner The Bitbucket project/owner
   * @param repo The Bitbucket repository name
   * @constructor
   */
  EINVALIDBITBUCKETTOKEN: ({owner, repo}) => ({
    message: 'Invalid Bitbucket token.',
    details: `The [Bitbucket token](${linkify(
      'README.md#bitbucket-authentication',
    )}) configured in the \`BB_TOKEN\` or \`BITBUCKET_TOKEN\` environment variable must be a valid [Bitbucket access token](https://developer.atlassian.com/cloud/bitbucket/rest/intro/#access-tokens) allowing to push to the repository ${owner}/${repo}.

Please make sure to set the \`BB_TOKEN\` or \`BITBUCKET_TOKEN\` environment variable in your CI with the exact value of the Bitbucket access token.`,
  }),
  /**
   * The GitHub access token is improperly configured.
   *
   * @param owner The GitHub owner
   * @param repo The GitHub repository name
   * @constructor
   */
  EINVALIDGITHUBTOKEN: ({owner, repo}) => ({
    message: 'Invalid GitHub token.',
    details: `The [GitHub token](${linkify(
      'README.md#github-authentication',
    )}) configured in the \`GH_TOKEN\` or \`GITHUB_TOKEN\` environment variable must be a valid [GitHub access token](https://docs.github.com/en/rest/authentication) allowing to push to the repository ${owner}/${repo}.

Please make sure to set the \`GH_TOKEN\` or \`GITHUB_TOKEN\` environment variable in your CI with the exact value of the GitHub access token.`,
  }),
};
/* eslint-enable @typescript-eslint/naming-convention */

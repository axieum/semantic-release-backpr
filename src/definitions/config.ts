/**
 * The plugin configuration schema.
 */
export type Config = {
  /**
   * The version control provider, e.g. GitHub.
   */
  provider: 'bitbucket' | 'github';

  /*
   * Bitbucket
   */

  /**
   * The Bitbucket URL.
   * * `https://api.bitbucket.org/2.0` for Bitbucket Cloud.
   * * `https://<hostname>/rest/api/1.0` for Bitbucket Data Center.
   */
  bitbucketUrl: string;
  /** The Bitbucket access token. */
  bitbucketToken: string | undefined;

  /*
   * GitHub
   */

  /**
   * The GitHub URL.
   * * `https://api.github.com` for GitHub.
   * * `https://<hostname>/rest/api/1.0` for GitHub Enterprise.
   */
  githubUrl: string;
  /** The GitHub access token. */
  githubToken: string | undefined;
};

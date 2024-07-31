/**
 * The repository [owner, repo] pair.
 */
export type OwnerRepoPair = [string?, string?];

/**
 * Parses a given repository url into its owner & repository.
 *
 * Supported formats:
 * * https://HOSTNAME/owner/repo.git
 * * ssh://git@HOSTNAME/owner/repo.git
 * * git@HOSTNAME/owner/repo.git
 *
 * @param url The GitHub repository url.
 * @return a tuple of `[owner, repo]` or `[]` if invalid.
 */
export function parseGitUrl(url: string | undefined): OwnerRepoPair {
  if (url) {
    const match = /(?<owner>[^:/]+)\/(?<repo>[^/]+)\.git$/.exec(url);
    return match === null ? [] : [match[1], match[2]];
  }

  return [];
}

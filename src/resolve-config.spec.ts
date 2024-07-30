import {
  describe, expect, it, mock,
} from 'bun:test';
import SemanticReleaseError from '@semantic-release/error';
import {resolveConfig} from './resolve-config.js';

describe('resolveConfig', () => {
  describe('bitbucket', () => {
    it.each(['BB_TOKEN', 'BITBUCKET_TOKEN'])(
      'retrieves the Bitbucket token from the %p env var',
      async name => {
        await mock.module('node:process', () => ({env: {[name]: 'lorem'}}));
        expect(resolveConfig({provider: 'bitbucket'}).bitbucketToken).toBe('lorem');
      },
    );

    it('throws "EINVALIDBITBUCKETTOKEN" when no Bitbucket token is configured', async () => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      await mock.module('node:process', () => ({env: {BB_TOKEN: undefined, BITBUCKET_TOKEN: undefined}}));
      try {
        resolveConfig({provider: 'bitbucket'});
        expect().fail();
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(AggregateError);
        expect((error as AggregateError).errors).toHaveLength(1);
        expect((error as AggregateError).errors[0]).toBeInstanceOf(SemanticReleaseError);
        expect(((error as AggregateError).errors[0] as SemanticReleaseError).code).toBe('EINVALIDBITBUCKETTOKEN');
      }
    });
  });

  describe('github', () => {
    it.each(['GH_TOKEN', 'GITHUB_TOKEN'])(
      'retrieves the GitHub token from the %p env var',
      async name => {
        await mock.module('node:process', () => ({env: {[name]: 'ipsum'}}));
        expect(resolveConfig({provider: 'github'}).githubToken).toBe('ipsum');
      },
    );

    it('throws "EINVALIDGITHUBTOKEN" when no GitHub token is configured', async () => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      await mock.module('node:process', () => ({env: {GH_TOKEN: undefined, GITHUB_TOKEN: undefined}}));
      try {
        resolveConfig({provider: 'github'});
        expect().fail();
      } catch (error: unknown) {
        expect(error).toBeInstanceOf(AggregateError);
        expect((error as AggregateError).errors).toHaveLength(1);
        expect((error as AggregateError).errors[0]).toBeInstanceOf(SemanticReleaseError);
        expect(((error as AggregateError).errors[0] as SemanticReleaseError).code).toBe('EINVALIDGITHUBTOKEN');
      }
    });
  });
});

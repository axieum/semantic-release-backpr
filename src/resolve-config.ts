import {env} from 'node:process';
import type SemanticReleaseError from '@semantic-release/error';
import {isEmpty, isNil, isString} from 'lodash';
import type {Config} from './definitions/config.js';
import {getError} from './get-error.js';

const isNonEmptyString = (value: any): boolean => isString(value) && !isEmpty(value);

export function resolveConfig(config: Partial<Config>): Config {
  const {provider, bitbucketUrl, githubUrl} = config;
  return validateConfig({
    provider: isNil(provider) ? 'github' : provider.toLowerCase() as Config['provider'],
    bitbucketUrl: isNil(bitbucketUrl) ? 'https://api.bitbucket.org/2.0' : bitbucketUrl,
    bitbucketToken: env.BB_TOKEN ?? env.BITBUCKET_TOKEN,
    githubUrl: isNil(githubUrl) ? 'https://api.github.com' : githubUrl,
    githubToken: env.GH_TOKEN ?? env.GITHUB_TOKEN,
  });
}

function validateConfig(config: Config): Config {
  const validators: {[key in keyof Config]: (value: any) => boolean} = {
    provider: value => isString(value) && ['bitbucket', 'github'].includes(value),
    bitbucketUrl: isNonEmptyString,
    bitbucketToken: value => config.provider !== 'bitbucket' || isNonEmptyString(value),
    githubUrl: isNonEmptyString,
    githubToken: value => config.provider !== 'github' || isNonEmptyString(value),
  };

  const reducedErrors: SemanticReleaseError[] = Object.entries(config).reduce<SemanticReleaseError[]>(
    (errors, [option, value]) => Object.hasOwn(validators, option) && !validators[option as keyof Config](value)
      ? [...errors, getError(`EINVALID${option.toUpperCase()}`, {[option]: value})]
      : errors,
    [],
  );

  if (reducedErrors.length > 0) {
    throw new AggregateError(reducedErrors, 'The `semantic-release-backpr` plugin is misconfigured.');
  }

  return config;
}

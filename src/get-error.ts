import SemanticReleaseError from '@semantic-release/error';
import {ERROR_DEFINITIONS} from './definitions/errors.js';

export function getError(code: string, context: Record<string, any>): SemanticReleaseError {
  const {message, details} = ERROR_DEFINITIONS[code](context);
  return new SemanticReleaseError(message, code, details);
}

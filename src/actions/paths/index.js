import makeListPaths from './list-paths.js';
import makeUpdatePathContent from './update-path-content.js';

import {
  listPathsQuery,
  updatePathContentQuery
} from '../../database/paths.js';

const listPaths = makeListPaths({ listPathsQuery });
const updatePathContent = makeUpdatePathContent({ updatePathContentQuery });

export {
  listPaths,
  updatePathContent
}
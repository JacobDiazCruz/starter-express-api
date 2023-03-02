import makeListPaths from './list-paths.js';
import makeUpdatePathContent from './update-path-content.js';

import {
  listPathsQuery,
  updatePathContentQuery,
  updateTotalResultQuery
} from '../../database/paths.js';

const listPaths = makeListPaths({ listPathsQuery });
const updatePathContent = makeUpdatePathContent({ 
  updatePathContentQuery,
  updateTotalResultQuery
});

export {
  listPaths,
  updatePathContent
}
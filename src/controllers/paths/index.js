import {
  listPaths,
  updatePathContent
} from "../../actions/paths/index.js";

import makeGetListController from "./get-list.js";
import makeUpdatePathContentController from "./update-path-content.js";

const getPathsListController = makeGetListController({ listPaths })
const updatePathContentController = makeUpdatePathContentController({ updatePathContent })

const pathsController = Object.freeze({
  getPathsListController,
  updatePathContentController
});

export default pathsController;

export {
  getPathsListController,
  updatePathContentController
}
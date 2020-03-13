
/* const path = require('path') */
/* path.join(parent, path) */

/**
 * Create an object with his full absolutePath and his minimum access level
 * @param {Object} Path { path: string, parent: string, level: number }
 * @returns {Object} modified path
 * @author David Ramos
 * @date 2020-03-12
 */
const getAbsolutePath = paths => {
  const { parent, path, level } = paths
  console.log('paths: ', paths)
  return parent && parent !== '/'
    ? { absolutePath: parent.concat(path), level, parent }
    : { absolutePath: path, level, parent }
}

/**
 * Create a list of all paths and their minimum access level
 * @param {Array<Object>} Registry array of routes
 * @returns {Array<Object>} modified registry
 * @author David Ramos
 * @date 2020-03-12
 */
const getAllPaths = registry => {
  const paths = registry.map(paths => {
    const { parent } = paths
    const findPath = registry.find(paths => paths.path === parent)

    let absPath = getAbsolutePath(paths)

    if (findPath && findPath.parent !== null && findPath.parent !== '/') {
      const { parent, level } = findPath
      const { absolutePath } = absPath
      absPath = {
        absolutePath: parent.concat(absolutePath),
        level
      }
    }

    return absPath
  })
  return paths
}

/**
 * Check accessibilty for a user
 * @param {Object} User { name: string, level: number }
 * @param {String} Path path to check
 * @param {Array<Object>} ModifiedRegistry getAllPaths() result
 * @returns {Boolean} if the user has acces
 * @author David Ramos
 * @date 2020-03-12
 */
const hasAccess = (user, path, paths) => {
  const findPath = paths.find(p => p.absolutePath === path)
  return user.level >= findPath.level
}

/**
 * Get all paths a user has access too
 * @param {Object} User { name: string, level: number }
 * @param {Array<Object>} ModifiedRegistry getAllPaths() result
 * @returns {Array<Object>} filtered array of routes
 * @author David Ramos
 * @date 2020-03-12
 */
const getUserPaths = (user, paths) => {
  const userPaths = paths.reduce((acc, paths) => {
    user.level >= paths.level && acc.push(paths)
    return acc
  }, [])
  return userPaths
}

module.exports = {
  getAllPaths,
  hasAccess,
  getUserPaths
}

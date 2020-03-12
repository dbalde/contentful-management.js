/**
 * Space Membership instances
 * @namespace SpaceMember
 */

import cloneDeep from 'lodash/cloneDeep'
import { freezeSys, toPlainObject } from 'contentful-sdk-core'
import enhanceWithMethods from '../enhance-with-methods'
import {
  createUpdateEntity,
  createDeleteEntity
} from '../instance-actions'

/**
 * @memberof SpaceMember
 * @typedef SpaceMember
 * @prop {Meta.Sys} sys - System metadata
 * @prop {boolean} admin - User is an admin
 * @prop {array} roles - Array of Role Links
 * @prop {array} relatedMemberships - Array of TeamSpaceMembership or SpaceMembership Links
 * @prop {function(): Object} toPlainObject() - Returns this Space Membership as a plain JS object
 */

function createSpaceMemberApi (http) {
  return {
    /**
     * Sends an update to the server with any changes made to the object's properties
     * @memberof SpaceMember
     * @func update
     * @return {Promise<SpaceMember>} Object returned from the server with updated changes.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMembership('<spaceMembership_id>'))
     * .then((spaceMember) => {...})
     * .then((SpaceMember) => console.log(`SpaceMember ${SpaceMember.sys.id} updated.`))
     * .catch(console.error)
     */
    update: createUpdateEntity({
      http: http,
      entityPath: 'space_members',
      wrapperMethod: wrapSpaceMember
    }),

    /**
     * Deletes this object on the server.
     * @memberof SpaceMember
     * @func delete
     * @return {Promise} Promise for the deletion. It contains no data, but the Promise error case should be handled.
     * @example
     * const contentful = require('contentful-management')
     *
     * const client = contentful.createClient({
     *   accessToken: '<content_management_api_key>'
     * })
     *
     * client.getSpace('<space_id>')
     * .then((space) => space.getSpaceMembership('<spaceMembership_id>'))
     * .then((spaceMember) => spaceMember.delete())
     * .then(() => console.log(`SpaceMember deleted.`))
     * .catch(console.error)
     */
    delete: createDeleteEntity({
      http: http,
      entityPath: 'space_members'
    })
  }
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw space membership data
 * @return {SpaceMember} Wrapped space membership data
 */
export function wrapSpaceMember (http, data) {
  const SpaceMember = toPlainObject(cloneDeep(data))
  enhanceWithMethods(SpaceMember, createSpaceMemberApi(http))
  return freezeSys(SpaceMember)
}

/**
 * @private
 * @param {Object} http - HTTP client instance
 * @param {Object} data - Raw space membership collection data
 * @return {SpaceMemberCollection} Wrapped space membership collection data
 */
export function wrapSpaceMemberCollection (http, data) {
  const spaceMembers = toPlainObject(cloneDeep(data))
  spaceMembers.items = spaceMembers.items.map((entity) => wrapSpaceMember(http, entity))
  return freezeSys(spaceMembers)
}

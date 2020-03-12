import test from 'blue-tape'
import {cloneMock} from '../mocks/entities'
import setupHttpMock from '../mocks/http'
import {wrapSpaceMember, wrapSpaceMemberCollection} from '../../../lib/entities/space-member'
import {
  entityWrappedTest,
  entityCollectionWrappedTest,
  entityUpdateTest,
  entityDeleteTest,
  failingActionTest,
  failingVersionActionTest
} from '../test-creators/instance-entity-methods'

function setup (promise) {
  return {
    httpMock: setupHttpMock(promise),
    entityMock: cloneMock('spaceMembership')
  }
}

test('SpaceMember is wrapped', (t) => {
  entityWrappedTest(t, setup, {
    wrapperMethod: wrapSpaceMember
  })
})

test('SpaceMember collection is wrapped', (t) => {
  return entityCollectionWrappedTest(t, setup, {
    wrapperMethod: wrapSpaceMemberCollection
  })
})

test('SpaceMember update', (t) => {
  return entityUpdateTest(t, setup, {
    wrapperMethod: wrapSpaceMember
  })
})

test('SpaceMember update fails', (t) => {
  return failingVersionActionTest(t, setup, {
    wrapperMethod: wrapSpaceMember,
    actionMethod: 'update'
  })
})

test('SpaceMember delete', (t) => {
  return entityDeleteTest(t, setup, {
    wrapperMethod: wrapSpaceMember
  })
})

test('SpaceMember delete fails', (t) => {
  return failingActionTest(t, setup, {
    wrapperMethod: wrapSpaceMember,
    actionMethod: 'delete'
  })
})

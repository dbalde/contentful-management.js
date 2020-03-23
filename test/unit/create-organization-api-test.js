
import test from 'blue-tape'

import createOrganizationApi, {__RewireAPI__ as createOrganizationApiRewireApi} from '../../lib/create-organization-api'
import {
  appDefinitionMock,
  setupEntitiesMock
} from './mocks/entities'
import setupHttpMock from './mocks/http'
import {
  makeGetEntityTest,
  makeGetCollectionTest,
  makeCreateEntityTest,
  makeEntityMethodFailingTest
} from './test-creators/static-entity-methods'

function setup (promise) {
  const entitiesMock = setupEntitiesMock(createOrganizationApiRewireApi)
  const httpMock = setupHttpMock(promise)
  const httpUploadMock = setupHttpMock(promise)
  const api = createOrganizationApi({ http: httpMock })
  return {
    api,
    httpMock,
    httpUploadMock,
    entitiesMock
  }
}

function teardown () {
  createOrganizationApiRewireApi.__ResetDependency__('entities')
}

test('API call getAppDefinition', (t) => {
  makeGetEntityTest(t, setup, teardown, {
    entityType: 'appDefinition',
    mockToReturn: appDefinitionMock,
    methodToTest: 'getAppDefinition'
  })
})

test('API call getAppDefinition fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getAppDefinition'
  })
})

test('API call getAppDefinitions', (t) => {
  makeGetCollectionTest(t, setup, teardown, {
    entityType: 'appDefinition',
    mockToReturn: appDefinitionMock,
    methodToTest: 'getAppDefinitions'
  })
})

test('API call getAppDefinitions fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'getAppDefinitions'
  })
})

test('API call createAppDefinition', (t) => {
  makeCreateEntityTest(t, setup, teardown, {
    entityType: 'appDefinition',
    mockToReturn: appDefinitionMock,
    methodToTest: 'createAppDefinition'
  })
})

test('API call createAppDefinition fails', (t) => {
  makeEntityMethodFailingTest(t, setup, teardown, {
    methodToTest: 'createAppDefinition'
  })
})
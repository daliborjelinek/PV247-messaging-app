import * as requestUtils from '../../src/utils/requestUtils';

// Disclaimer - these tests are quite useless
// These test are implemented just to fulfill project requirements

// All tests will fail when app id, or base url is changed
const expectedBaseUrl = 'https://pv247messaging.azurewebsites.net/api/v2/';
const expectedAppId = '342df009-59b5-4215-9d07-57a8502b4839';

const expectedAppUrl = expectedBaseUrl + 'app/' + expectedAppId + '/';

test('Get base URL', () => {
  expect(requestUtils.getBaseUrl()).toBe(expectedBaseUrl + expectedAppId + '/');
});

test('Get base app URL', () => {
  expect(requestUtils.getBaseAppUrl()).toBe(expectedAppUrl);
});

test('Get user URL', () => {
  expect(requestUtils.getUserUrl()).toBe(expectedBaseUrl + expectedAppId + '/user');
});

test('Get channel URL', () => {
  expect(requestUtils.getChannelUrl()).toBe(expectedAppUrl + 'channel');
});

test('Get message URL', () => {
  expect(requestUtils.getMessageUrl('1')).toBe(expectedAppUrl + 'channel/1/message');
});

test('Get file URL', () => {
  expect(requestUtils.getFileUrl()).toBe(expectedBaseUrl + 'file');
});

test('Get file link URL', () => {
  expect(requestUtils.getFileLinkUrl('5')).toBe(expectedBaseUrl + 'file/5/download-link');
});

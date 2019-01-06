import {byEmail} from '../../src/reducers/usersReducer';
import {immutableUserAdelka, messageAppLoadingFinishedActionMock} from '../mocks/appData';


describe('Users', () => {
  it('Users are loaded after application init ', () => {

    const result = byEmail(undefined, messageAppLoadingFinishedActionMock);
    expect(result.get('adelka@jezkova.com')).toEqual(immutableUserAdelka);
  });
  it('User is changed after update', () => {

    const action = {
      type: 'USER_PROFILE_UPDATE_FINISHED',
      payload: {
        email: 'adelka@jezkova.com',
        password: '123',
        userName: 'Adélka5',
        picture: 'https://pv247messaging.blob.core.windows.net/files/330892a1-8228-4a35-abaa-99aa5470ea97/adel2_small.jpg?sv=2018-03-28&sr=b&sig=CBuqkbUurpvGJaF%2FzEipcyn6DKIHrbFCoUqXXmVMWD0%3D&se=2020-01-06T10%3A51%3A25Z&sp=r'
      }
    };

    const result = byEmail(undefined, action);
    expect(result.get('adelka@jezkova.com')!.userName).toEqual('Adélka5');

  });

});

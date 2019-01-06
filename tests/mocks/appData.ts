export const messageAppLoadingFinishedActionMock = {
  type: 'MESSAGE_APP_LOADING_FINISHED',
  payload: {
    channels: [
      {
        id: '72be109d-95bb-43d2-b09c-9aa80fac3591',
        name: 'První kanál',
        countOfNewMessages: 0,
        userEmails: [
          'daliborjelinek01@gmail.com',
          'admin@admin.cz'
        ],
        order: 1,
        createdBy: 'daliborjelinek01@gmail.com'
      },
      {
        id: '3be5cbdc-cef4-413e-b7fb-0f6c3bae3540',
        name: 'test',
        countOfNewMessages: 0,
        userEmails: [
          'daliborjelinek01@gmail.com',
          'adelka@jezkova.com'
        ],
        order: 1,
        createdBy: 'daliborjelinek01@gmail.com'
      }
    ],
    messages: [
      {
        id: '5955feae-af63-419e-b309-d5be51cb3812',
        value: {
          blocks: [
            {
              key: '4b116',
              text: 'test',
              type: 'unstyled',
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {}
            }
          ],
          entityMap: {}
        },
        createdAt: '2019-01-06T21:43:26.24485Z',
        createdBy: 'adelka@jezkova.com',
        rating: 0,
        usersWhoRatedMessage: {}
      }
    ],
    users: [
      {
        email: 'adelka@jezkova.com',
        userName: 'Adélka',
        picture: 'https://pv247messaging.blob.core.windows.net/files/330892a1-8228-4a35-abaa-99aa5470ea97/adel2_small.jpg?sv=2018-03-28&sr=b&sig=CBuqkbUurpvGJaF%2FzEipcyn6DKIHrbFCoUqXXmVMWD0%3D&se=2020-01-06T10%3A51%3A25Z&sp=r',
        password: '123'
      },
      {
        email: 'admin@admin.cz',
        userName: 'Honza',
        picture: 'https://pv247messaging.blob.core.windows.net/files/cbf72748-ee4c-4b25-91da-cdf4e01fe37f/IMG_20181218_204850.jpg?sv=2018-03-28&sr=b&sig=pvnS2%2BeqEvCYBxAm%2FnRR%2Bzc6ysAWcYwKEITWNguKszc%3D&se=2020-01-06T10%3A58%3A25Z&sp=r',
        password: 'admin'
      },
      {
        email: 'daliborjelinek01@gmail.com',
        userName: 'Dalík',
        picture: 'https://pv247messaging.blob.core.windows.net/files/90a68613-2148-4ec4-a9bb-5952ccf71e7e/IMG_0419_small.jpg?sv=2018-03-28&sr=b&sig=YIsnnrJ%2BDt2CpsuYrHt33sXYWcKFi3uHaVeR5PU3Qn0%3D&se=2020-01-06T10%3A49%3A03Z&sp=r',
        password: '123'
      }
    ]
  }
};

export const immutableUserAdelka = {
  email: 'adelka@jezkova.com',
  userName: 'Adélka',
  picture: 'https://pv247messaging.blob.core.windows.net/files/330892a1-8228-4a35-abaa-99aa5470ea97/adel2_small.jpg?sv=2018-03-28&sr=b&sig=CBuqkbUurpvGJaF%2FzEipcyn6DKIHrbFCoUqXXmVMWD0%3D&se=2020-01-06T10%3A51%3A25Z&sp=r',
  password: '123'
};

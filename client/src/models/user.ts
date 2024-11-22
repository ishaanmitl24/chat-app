export interface User {
  id: string;
  image: string;
  name: string;
  message: string;
  time: string;
}

export interface signupUserData {
  name: string;
  email: string;
  password: string;
}

export interface apiData {
  path: string;
  method: string;
}

export interface apiResponse {
  status: number;
  data: {
    ok: boolean;
    msg: string;
    token?: string;
  };
}

export interface authData {
  email: string;
  password: string;
  name?: string;
}

export interface loginData {
  email: string;
  password: string;
}

export interface addRequestReponse {
  ok: boolean;
  msg: string;
}

export interface pendingRequestsData {
  _id: string;
  name: string;
  hashId: string;
  email: string;
  status: string;
  userId: string;
}

export interface friendsData {
  _id: string;
  name: string;
  email: string;
  hashId: string;
}

export interface userMessagesData {
  friendUserId: string;
  messageConnectionId: string;
  messageData: {
    _id: string;
    message: string;
    time: string;
    userId: string;
  };
  user: {
    email: string;
    hashId: string;
    name: string;
    _id: string;
  };
}

export interface messageData {
  messageConnectionId: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
  name: string;
  email: string;
  hashId: string;
}

export interface friend {
  _id: string;
  name: string;
  email: string;
  hashId: string;
}

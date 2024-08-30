const url = {
  isExisting: '/members/exist',
  signin: '/login',
  signup: '/signup',
  getCake: '/cake',
  writeMessage: '/message',
  readMessage: '/message',
  deleteMessage: '/message',
};

export const api = {
  isExisting: async (id: BigInt) => {
    return await fetch(`${url.isExisting}?id=${id}`, {
      method: 'GET',
    });
  },
  login: async (data: FormData) => {
    return await fetch(url.signin, {
      method: 'POST',
      body: data,
    });
  },
  signup: async (data: FormData) => {
    return await fetch(url.signup, {
      method: 'POST',
      body: data,
    });
  },
  getCake: async ({ memberId, page }: { memberId: BigInt; page: number }) => {
    return await fetch(`${url.getCake}/${memberId}?page=${page}`, {
      method: 'GET',
    });
  },
  writeMessage: async ({
    candleId,
    message,
    nickname,
  }: {
    candleId: number;
    message: string;
    nickname: string;
  }) => {
    return await fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ candleId, message, nickname }),
    });
  },
  readMessage: async (messageId: BigInt) => {
    return await fetch(`${url.readMessage}/${messageId}`, {
      method: 'GET',
    });
  },
  deleteMessage: async (messageId: BigInt) => {
    return await fetch(`${url.deleteMessage}/${messageId}`, {
      method: 'DELETE',
    });
  },
};

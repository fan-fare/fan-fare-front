const url = {
  signin: '/api/auth/signin',
  signup: '/api/auth/signup',
};

export const api = {
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
  createPost: async ({
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
  }
};

const authUrl = {
  signin: '/api/auth/signin',
  signup: '/api/auth/signup',
};

export const authApi = {
  login: async (data: FormData) => {
    return await fetch(authUrl.signin, {
      method: 'POST',
      body: data,
    });
  },
  signup: async (data: FormData) => {
    return await fetch(authUrl.signup, {
      method: 'POST',
      body: data,
    });
  }
};
   
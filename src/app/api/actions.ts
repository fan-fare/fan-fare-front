'use server';

/**
 * Server-side api functions
 * For now this is just a mock
 * This application does not need any server-side api
 */

export async function signin(
  prevState: {
    nickname: string;
    id: string;
    password: string;
  },
  formData: FormData
) {
  const rawData: {
    nickname: string;
    id: string;
    password: string;
  } = {
    nickname: formData.get('nickname') as string,
    id: formData.get('id') as string,
    password: formData.get('password') as string,
  };
  console.log(rawData);

  return rawData;
}

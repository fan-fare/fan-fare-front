'use server';

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

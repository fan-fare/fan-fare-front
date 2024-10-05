export const getNextBirthday = (birthday: Date): Date => {
  const now = new Date();
  birthday.setFullYear(now.getFullYear());
  if (now.getTime() > birthday.getTime()) {
    birthday.setFullYear(now.getFullYear() + 1);
  }
  return birthday;
}

export const getRemainingTime = (birthday: Date): number => {
  const now = new Date();
  const nextBirthday = getNextBirthday(birthday);
  return nextBirthday.getTime() - now.getTime();
}

// If the birthday is today or the birthday has passed within a week, return true
export const isNotPassedOneWeek = (birthday: Date): boolean => {
  const now = new Date();
  const oneYear = 365 * 24 * 60 * 60 * 1000;
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  const nextBirthday = getNextBirthday(birthday);
  const diff = nextBirthday.getTime() - now.getTime();
  return diff >= oneYear - oneWeek;
}

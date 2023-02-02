export const regExpOnlyLettersAndSpace = /^[A-Za-z\s]*$/;

export const validateSeedText = (text: string) => {
  const splittedInputArr = text.trim().split(' ');

  let isValid = true;
  for (const seed of splittedInputArr) {
    if (!regExpOnlyLettersAndSpace.test(seed)) {
      isValid = false;
      break;
    }
  }

  if (isValid && !text.endsWith('  ') && !text.startsWith(' ')) {
    return text;
  }

  return undefined;
};

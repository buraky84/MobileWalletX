export const regExpOnlyLettersAndSpace = /^[A-Za-z\s]*$/;
export const regExpEthAddress = /^0x[a-fA-F0-9]{40}$/;
export const regExpAmount = /^\d{0,5}(\d\.\d?|\.\d)?\d?$/;

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

export const validateEthAddress = (text: string) => {
  if (regExpEthAddress.test(text)) {
    return true;
  }
  return false;
};

export const validateAmount = (text: string) => {
  if (regExpAmount.test(text)) {
    return true;
  }

  return false;
};

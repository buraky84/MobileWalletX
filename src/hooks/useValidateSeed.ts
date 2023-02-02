import {useState} from 'react';
import {regExpOnlyLettersAndSpace} from '../consts/Validation';

export const useValidateSeed = () => {
  const [seedText, setSeedText] = useState('');

  const validateSeedText = (inputText: string) => {
    let inputSeedArr = inputText.trim().split(' ');
    let isValid = true;
    for (const seed of inputSeedArr) {
      if (!regExpOnlyLettersAndSpace.test(seed)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setSeedText(inputText);
    }
  };

  return [seedText, {setValidateSeedText: validateSeedText}];
};

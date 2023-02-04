import {
  validateSeedText,
  validateEthAddress,
  validateAmount,
} from '../src/consts/Validation';

test('validateSeedText test1', () => {
  expect(
    validateSeedText(
      'wolf insect price demise observe elder help estate enhance dial club cart',
    ),
  ).toEqual(
    'wolf insect price demise observe elder help estate enhance dial club cart',
  );
});

test('validateSeedText test2', () => {
  expect(
    validateSeedText(
      'wolf insect price demise obs1erve elder help estate enhance dial club', // includes number
    ),
  ).toEqual(undefined);
});

test('validateSeedText test3', () => {
  expect(
    validateSeedText(
      'wolf, insect price demise observe elder help estate enhance dial', // includes comma
    ),
  ).toEqual(undefined);
});

test('validateEthAddress test1', () => {
  expect(
    validateEthAddress('0xA0aFeD1ACa0584e221Ed8b0423c7Ec836F0dfB55'),
  ).toEqual(true);
});

test('validateEthAddress test2', () => {
  expect(
    validateEthAddress('0xA0aFeD1ACa0584e221Ed8b0423c7Ec836FdfB55'),
  ).toEqual(false);
});

test('validateAmount test1', () => {
  expect(validateAmount('0.2')).toEqual(true);
});

test('validateAmount test2', () => {
  expect(validateAmount('3121323.222')).toEqual(false);
});

test('validateAmount test3', () => {
  expect(validateAmount('0..')).toEqual(false);
});

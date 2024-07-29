import { format_currency } from '../tests/money_test.js';
// the function below is given by jasmine
describe('test_suite:format_currency', () => {
  it('converts cents to dollars', () => {
    expect(format_currency(2095)).toEqual('20.95');
  });
  it('works with zero', () => {
    expect(format_currency(0)).toEqual('0.00');
  });
  it('works with decimals', () => {
    expect(format_currency(2000.690001)).toEqual('20.01');
  });
});
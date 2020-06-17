import { getBalanceByCategoryInPeriod } from '.';

describe('Task1', () => {
  it('returns 0 if there are no transactions', () => {
    const result = getBalanceByCategoryInPeriod(
      [],
      'groceries',
      new Date('2018-03-01T10:34:30.000Z'),
      new Date('2018-03-31T10:34:30.000Z'),
    );

    expect(result).toEqual(0);
  });

  it('returns 0 if there are no transactions in selected date period', () => {
    const INPUT = [{
      id: 1,
      sourceAccount: 'my_account',
      targetAccount: 'coffee_shop',
      amount: -30,
      category: 'groceries',
      time: '2019-03-12T12:34:00Z'
    }];

    const result = getBalanceByCategoryInPeriod(
      INPUT,
      'groceries',
      new Date('2018-03-01T10:34:30.000Z'),
      new Date('2018-03-03T10:34:30.000Z'),
    );

    expect(result).toEqual(0);
  });

  it('returns -70 if negative counting works', () => {
    const INPUT = [
      {
        id: 1,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -30,
        category: 'groceries',
        time: '2019-03-12T12:34:00Z'
      },
      {
        id: 2,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -40,
        category: 'groceries',
        time: '2019-04-12T12:34:00Z'
      }
    ]

    const result = getBalanceByCategoryInPeriod(
      INPUT,
      'groceries',
      new Date('2016-01-01T10:34:30.000Z'),
      new Date('2020-12-03T10:34:30.000Z'),
    );

    expect(result).toEqual(-70);
  });
  
  it('returns 0 if negative values add to positive', () => {
    const INPUT = [
      {
        id: 1,
        sourceAccount: 'my_account',
        targetAccount: 'old_bank_with_big_comission',
        amount: -30,
        category: 'bank',
        time: '2019-03-12T12:34:00Z'
      },
      {
        id: 2,
        sourceAccount: 'my_account',
        targetAccount: 'new_fancy_bank',
        amount: 30,
        category: 'bank',
        time: '2019-04-12T12:34:00Z'
      }
    ]

    const result = getBalanceByCategoryInPeriod(
      INPUT,
      'bank',
      new Date('2017-01-01T10:34:30.000Z'),
      new Date('2020-12-03T10:34:30.000Z'),
    );

    expect(result).toEqual(0);
  });

  it('returns 35 if counts positive values', () => {
    const INPUT = [
      {
        id: 1,
        sourceAccount: 'my_account',
        targetAccount: 'old_bank_with_big_comission',
        amount: 5,
        category: 'bank',
        time: '2019-03-12T12:34:00Z'
      },
      {
        id: 2,
        sourceAccount: 'my_account',
        targetAccount: 'new_fancy_bank',
        amount: 30,
        category: 'bank',
        time: '2019-04-12T12:34:00Z'
      }
    ]

    const result = getBalanceByCategoryInPeriod(
      INPUT,
      'bank',
      new Date('2017-01-01T10:34:30.000Z'),
      new Date('2020-12-03T10:34:30.000Z'),
    );

    expect(result).toEqual(35);
  });

  it('returns -70 if counts only values in selected time period(negative)', () => {
    const INPUT = [
      {
        id: 1,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -30,
        category: 'groceries',
        time: '2019-03-12T12:34:00Z'
      },
      {
        id: 2,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -40,
        category: 'groceries',
        time: '2019-04-12T12:34:00Z'
      },
      {
        id: 3,
        sourceAccount: 'my_account',
        targetAccount: 'coffee_shop',
        amount: -40,
        category: 'groceries',
        time: '2012-04-12T12:34:00Z'
      }
    ]

    const result = getBalanceByCategoryInPeriod(
      INPUT,
      'groceries',
      new Date('2018-01-01T10:34:30.000Z'),
      new Date('2020-12-03T10:34:30.000Z'),
    );

    expect(result).toEqual(-70);
  });

  it('returns 70 if counts only values in selected time period(positive)', () => {
    const INPUT = [
      {
        id: 1,
        sourceAccount: 'my_account',
        targetAccount: 'new_fancy_bank',
        amount: 30,
        category: 'bank',
        time: '2019-03-12T12:34:00Z'
      },
      {
        id: 2,
        sourceAccount: 'my_account',
        targetAccount: 'new_fancy_bank',
        amount: 40,
        category: 'bank',
        time: '2019-04-12T12:34:00Z'
      },
      {
        id: 3,
        sourceAccount: 'my_account',
        targetAccount: 'old_bank_with_big_comission',
        amount: 53,
        category: 'bank',
        time: '2012-04-12T12:34:00Z'
      }
    ]

    const result = getBalanceByCategoryInPeriod(
      INPUT,
      'bank',
      new Date('2018-01-01T10:34:30.000Z'),
      new Date('2020-12-03T10:34:30.000Z'),
    );

    expect(result).toEqual(70);
  });
 
  it('returns -10 if counts only values in selected time period(mixed)', () => {
    const INPUT = [
      {
        id: 1,
        sourceAccount: 'my_account',
        targetAccount: 'new_fancy_bank',
        amount: 30,
        category: 'bank',
        time: '2019-03-12T12:34:00Z'
      },
      {
        id: 2,
        sourceAccount: 'my_account',
        targetAccount: 'new_fancy_bank',
        amount: -40,
        category: 'bank',
        time: '2019-04-12T12:34:00Z'
      },
      {
        id: 3,
        sourceAccount: 'my_account',
        targetAccount: 'old_bank_with_big_comission',
        amount: 53,
        category: 'bank',
        time: '2012-04-12T12:34:00Z'
      }
    ]

    const result = getBalanceByCategoryInPeriod(
      INPUT,
      'bank',
      new Date('2018-01-01T10:34:30.000Z'),
      new Date('2020-12-03T10:34:30.000Z'),
    );

    expect(result).toEqual(-10);
  });

  it('returns -10 if works without endtime', () => {
    const INPUT = [
      {
        id: 1,
        sourceAccount: 'my_account',
        targetAccount: 'new_fancy_bank',
        amount: 30,
        category: 'bank',
        time: '2019-03-12T12:34:00Z'
      },
      {
        id: 2,
        sourceAccount: 'my_account',
        targetAccount: 'new_fancy_bank',
        amount: -40,
        category: 'bank',
        time: '2019-04-12T12:34:00Z'
      },
      {
        id: 3,
        sourceAccount: 'my_account',
        targetAccount: 'old_bank_with_big_comission',
        amount: 50,
        category: 'bank',
        time: '2012-04-12T12:34:00Z'
      }
    ]

    const result = getBalanceByCategoryInPeriod(
      INPUT,
      'bank',
      new Date('2018-01-01T10:34:30.000Z'),
    );

    expect(result).toEqual(-10);
  });

  it('returns 40 if works without endtime', () => {
    const INPUT = [
      {
        id: 1,
        sourceAccount: 'my_account',
        targetAccount: 'new_fancy_bank',
        amount: 30,
        category: 'bank',
        time: '2019-03-12T12:34:00Z'
      },
      {
        id: 2,
        sourceAccount: 'my_account',
        targetAccount: 'new_fancy_bank',
        amount: -40,
        category: 'bank',
        time: '2019-04-12T12:34:00Z'
      },
      {
        id: 3,
        sourceAccount: 'my_account',
        targetAccount: 'future_bank',
        amount: 50,
        category: 'bank',
        time: '5674-04-12T12:34:00Z'
      }
    ]

    const result = getBalanceByCategoryInPeriod(
      INPUT,
      'bank',
      new Date('2018-01-01T10:34:30.000Z'),
    );

    expect(result).toEqual(40);
  });
});

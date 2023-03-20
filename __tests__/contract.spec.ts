import { readFileSync } from 'fs';
import { testServerlessFunction, createWrite } from 'permawebjs/serverless';

const functionSrc = readFileSync('exm/contract.js');
const initState = {
  users: [],
};

const testData = {
  createUser: {
    function: 'createUser',
    user: {
      walletAddress: 'testaddress',
      fullName: 'Joel',
      username: 'codingknite',
      email: 'joelpats111@gmail.com',
      expenses: [],
    },
  },
  addExpense: {
    function: 'addExpense',
    address: 'testaddress',
    expense: {
      name: 'food',
      amount: '12',
      category: 'personal',
      date: '13-o2-2023',
    },
  },
};

describe('TEST EXM', () => {
  it('should test exm function', async () => {
    const createUser = await testServerlessFunction({
      functionSource: functionSrc,
      functionInitState: initState,
      functionWrites: [createWrite(testData.createUser)],
    });

    expect(typeof createUser.state).toBe('object');
    expect(createUser.state).toMatchObject({
      users: [
        {
          fullName: 'Joel',
          username: 'codingknite',
          email: 'joelpats111@gmail.com',
        },
      ],
    });
  });

  it('should create expense', async () => {
    const addExpense = await testServerlessFunction({
      functionSource: functionSrc,
      functionInitState: initState,
      functionWrites: [
        createWrite(testData.createUser),
        createWrite(testData.addExpense),
      ],
    });

    expect(typeof addExpense.state).toBe('object');
    expect(addExpense.state).toMatchObject({
      users: [
        {
          fullName: 'Joel',
          username: 'codingknite',
          email: 'joelpats111@gmail.com',
          expenses: [
            {
              name: 'food',
              amount: '12',
              category: 'personal',
              date: '13-o2-2023',
            },
          ],
        },
      ],
    });
  });
});

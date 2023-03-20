export async function handle(state, action) {
  if (action.input.function === 'createUser') {
    const users = state.users;
    users.push(action.input.user);
  }

  if (action.input.function === 'addExpense') {
    const users = state.users;
    const findUser = users.find((user) => user.walletAddress === action.input.address);

    findUser.expenses.push(action.input.expense);
  }


  return { state }
}


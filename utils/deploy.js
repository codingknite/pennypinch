import dotenv from 'dotenv'
import { readFileSync, writeFileSync } from 'fs';
import { createServerlessFunction } from 'permawebjs/serverless';

dotenv.config();

async function deploy() {
  const token = process.env.EXM_TOKEN;
  const functionSrc = readFileSync('exm/contract.js');
  const initialState = readFileSync('exm/state.json', 'utf-8');


  const serverlessFunction =
    await createServerlessFunction({
      token,
      initialState,
      functionSource: functionSrc,
    });

  writeFileSync('serverless-fn.json', JSON.stringify(serverlessFunction));

  return serverlessFunction;
}

deploy();

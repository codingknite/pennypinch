import dotenv from 'dotenv';
import { NextApiRequest, NextApiResponse } from 'next';
import { readServerlessFunction } from 'permawebjs/serverless';

dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = process.env.EXM_TOKEN;
  const functionId = process.env.FUNCTION_ID;

  const readState = await readServerlessFunction({
    token,
    functionId,
  });

  res.status(200).json(readState);
}

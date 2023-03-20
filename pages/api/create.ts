import dotenv from 'dotenv';
import { NextApiRequest, NextApiResponse } from 'next';
import { writeServerlessFunction } from 'permawebjs/serverless';

dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = process.env.EXM_TOKEN;
  const functionId = process.env.FUNCTION_ID;

  const writeData = JSON.parse(req.body);

  const { data, responseStatus } = await writeServerlessFunction({
    token,
    functionId,
    inputs: {
      ...writeData,
    },
  });

  if (responseStatus.code === 200) {
    res.status(200).json(data);
  }
}

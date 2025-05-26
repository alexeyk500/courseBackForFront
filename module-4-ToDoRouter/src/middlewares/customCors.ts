import {Request, Response, NextFunction} from "express";

const allowOrigins = ['https://www.w3.org'];

export const customCors = (req:Request, res:Response, next:NextFunction) => {
  const origin = req.headers.origin || '';

  if (allowOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  next()
}
import {Request, Response} from "express";

export const getMainPage = (req: Request, res: Response) => {
  console.log(req.query);
  res.send('<h1 style="color: blue">Hello from Main page</h1>')
}

export const postMainPage = (req: Request, res: Response) => {
  console.log(req.body);
  res.json({message: 'This is your json'})
}
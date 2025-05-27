import {Request, Response} from 'express';

const BASE_URL = 'https://restcountries.com/v2/';

export const getAllCountries = async (req: Request, res: Response) => {
  const result = await fetch(BASE_URL + 'all?fields=name,capital,flags,population,region');
  const data = await result.json();
  res.send(data)
}

export const getCountryByName = async (req: Request, res: Response) => {
  const name = req.params.name
  const result = await fetch(BASE_URL + 'name/' + name);
  const data = await result.json();
  res.send(data)
}

export const getCountryByCodes = async (req: Request, res: Response) => {
  const codes = req.query.codes
  const result = await fetch(BASE_URL + 'alpha?codes=' + codes);
  const data = await result.json();
  res.send(data)
}
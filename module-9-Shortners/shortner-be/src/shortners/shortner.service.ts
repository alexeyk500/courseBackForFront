export const getShortLink = async (originalLink: string) => {
  const apiUrl = process.env.SHORTNER_API_URL as string;
  const result = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({ url: originalLink }),
  });
  const { short_url } = await result.json();
  return short_url;
};

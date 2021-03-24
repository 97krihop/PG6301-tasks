export const postJson = async (url: string, json: Object) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "application/json",
    },
  });
  checkResult(res, url);
};

const checkResult = (res: Response, url: string) => {
  if (!res.ok) {
    throw new HttpException(res, url);
  }
};

class HttpException extends Error {
  status: number;

  constructor(res: Response, url: string) {
    super(`Error while loading ${url}: ${res.status} ${res.statusText}`);
    this.status = res.status;
  }
}

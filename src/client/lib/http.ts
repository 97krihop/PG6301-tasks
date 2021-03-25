export const postJson = async (url: string, json: Object = {}) => {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(json),
    headers: {
      "Content-Type": "application/json",
    },
  });
  checkResult(res, url);
  try {
    return await res.json();
  } catch (e) {
    console.error(e);
  }
};
export const postReq = async (url: string) => {
  const res = await fetch(url, {
    method: "POST",
  });
  checkResult(res, url);
  return await res.json();
};
export const fetchJson = async (url: string) => {
  const res = await fetch(url);
  checkResult(res, url);
  return await res.json();
};

const checkResult = (res: Response, url: string) => {
  if (!res.ok) {
    throw new HttpException(res, url);
  }
};

export class HttpException extends Error {
  status: number;

  constructor(res: Response, url: string) {
    super(`Error while loading ${url}: ${res.status} ${res.statusText}`);
    this.status = res.status;
  }
}

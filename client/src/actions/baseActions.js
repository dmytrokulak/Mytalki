export const fetchProtected = async (url, method = 'GET', body = null) => {
  const req = {
    method: method,
    headers: {
      Authorization: localStorage.getItem('token'),
    },
  };
  if (body) {
    req.body = JSON.stringify(body);
    req.headers = { ...req.headers, 'Content-Type': 'application/json' };
  }
  const res = await fetch(url, req);
  if (method === 'GET' || method === 'POST') {
    return await res.json();
  }
};

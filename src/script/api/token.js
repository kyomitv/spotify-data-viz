export default async function getToken() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  urlencoded.append("client_id", "45749cb3d07b41838799adf0fe20d266");
  urlencoded.append("client_secret", "b760e78bb39b49f58f2d6f65f17baa8f");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  const res = await fetch(
    "https://accounts.spotify.com/api/token",
    requestOptions
  );
  return await res.json();
}

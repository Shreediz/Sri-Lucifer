export default async () => {
  if (localStorage.ip) {
    return localStorage.ip;
  } else {
    return await fetch("https://json.geoiplookup.io/")
      .then(res => res.json())
      .then(response => {
        if (response.ip) {
          localStorage.setItem("ip", response.ip);
          return response.ip;
        } else {
          localStorage.setItem("ip", "0.0.0.0");
          return localStorage.ip;
        }
      })
      .catch(err => console.log(err));
  }
};

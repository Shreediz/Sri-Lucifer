import axios from "axios";
export default async slug => {
  console.log("slug", slug)
  return await axios
    .post("/api/utility/auth", { slug })
    .then(res => res.data.authorized)
    .catch(err => {
      return false;
    });
};

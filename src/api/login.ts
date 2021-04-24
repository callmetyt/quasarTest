import axios from "axios";

async function login(data: data) {
  // console.log(data);
}

export default login;

interface login {
  (data: data): Promise<void>;
}

interface data {
  username: string;
  password: string;
}

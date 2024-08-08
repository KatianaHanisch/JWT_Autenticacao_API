type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
};

let users: User[] = [
  {
    id: 1,
    name: "admin",
    email: "admin@gmail.com",
    password: "123",
    role: "admin",
  },
];

const findAll = () => {
  return users;
};

const findById = (id: number) => {
  return users.find((user) => user.id === id);
};

const findByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};

const registerUser = (name: string, email: string, password: string) => {
  const userAlredyExists = users.find((user) => user.email === email);

  if (userAlredyExists) return null;

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    role: "standard",
  };

  users.push(newUser);
  return newUser;
};

const createUser = (
  name: string,
  email: string,
  password: string,
  role: string
) => {
  const userAlredyExists = users.find((user) => user.email === email);

  if (userAlredyExists) return null;

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    role,
  };

  users.push(newUser);
  return newUser;
};

const deleteUser = (id: number) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) return null;

  const [deletedUser] = users.splice(userIndex, 1);

  return deletedUser;
};

export const userModel = {
  findAll,
  findById,
  findByEmail,
  registerUser,
  createUser,
  deleteUser,
};

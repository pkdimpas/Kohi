import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin user',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Kyle',
    email: 'kyle@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jai',
    email: 'jai@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;

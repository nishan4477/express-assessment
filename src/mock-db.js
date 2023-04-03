export class MockedDB {
  #users = [
    { id: 1, username: "admin", password: "password", role: "admin" },
    { id: 2, username: "user", password: "password", role: "user" },
  ];

  findUser({ username, password }) {
    return this.#users.find(
      (user) => user.username === username && user.password === password
    );
  }
}

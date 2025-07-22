import * as fs from 'fs';
import * as path from 'path';

export class User {
  public username: string;
  #password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.#password = password;
  };

  simpenData(filePath: string): void {
    fs.appendFileSync(filePath, `${this.username}:${this.#password}\n`);
  };

  cekPassword(input: string): boolean {
    return this.#password === input;
  };

  getPassword(): string {
    return this.#password;
  };
};

export class userManager {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  };

  readUsers(): User[] {
    if (!fs.existsSync(this.filePath)) return [];

    const lines = fs.readFileSync(this.filePath, 'utf-8')
      .trim()
      .split('\n')
      .filter(line => line.length > 0);

    return lines.map(line => {
      const [username, password] = line.split(':');
      return new User(username, password);
    });
  };

  findUser(username: string, password: string): User | null {
    const users = this.readUsers();
    return users.find(user =>
      user.username === username && user.cekPassword(password)) || null;
  };

  isUsernameTaken(username: string): boolean {
    return this.readUsers().some(user => user.username === username);
  };

  saveUser(user: User): void {
    user.simpenData(this.filePath);
  };

  isUserExist(username: string): boolean {
    return this.readUsers().some(user => user.username === username);
  };
}
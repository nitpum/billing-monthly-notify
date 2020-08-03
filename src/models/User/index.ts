export default class User {
  static list: Array<User> = [];

  id: string;
  name: string;
  displayName: string;
  discordId?: string;

  static has(id: string): boolean {
    return this.list.some((user) => user.id === id);
  }

  static get(id: string): User {
    return this.has(id) ? this.list.filter((user) => user.id === id)[0] : null;
  }

  static createIfNotExists(
    id: string,
    name: string,
    displayName: string,
    discordId?: string
  ): User {
    if (this.has(id)) {
      return this.get(id);
    }

    const user = new User();
    user.id = id;
    user.name = name;
    user.displayName = displayName;
    user.discordId = discordId;
    this.list.push(user);
    return user;
  }
}

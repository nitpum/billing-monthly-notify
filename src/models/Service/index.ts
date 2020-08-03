export default class Service {
  static list: Array<Service> = [];

  id: string;
  name: string;
  displayName: string;
  description: string;
  price: number;

  static has(id: string): boolean {
    return this.list.some((service) => service.id === id);
  }

  static get(id: string): Service {
    return this.has(id)
      ? this.list.filter((service) => service.id === id)[0]
      : null;
  }

  static createIfNotExists(
    id: string,
    name: string,
    displayName: string,
    description: string,
    price: number
  ): User {
    if (this.has(id)) {
      return this.get(id);
    }

    const service = new Service();
    service.id = id;
    service.name = name;
    service.displayName = displayName;
    service.description = description;
    service.price = price;
    this.list.push(service);
    return service;
  }
}

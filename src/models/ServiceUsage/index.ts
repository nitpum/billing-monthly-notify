import User from "../User";
import Service from "../Service";

export default class ServiceUsage {
  static list: Array<ServiceUsage> = [];

  id: string;
  user: User;
  services: Array<Service>;

  static has(id: string): boolean {
    return this.list.some((record) => record.id === id);
  }

  static get(id: string): ServiceUsage {
    return this.has(id)
      ? this.list.filter((record) => record.id === id)[0]
      : null;
  }

  static createIfNotExists(
    id: string,
    user: User,
    services: Array<Service>
  ): ServiceUsage {
    if (this.has(id)) {
      return this.get(id);
    }

    const serviceUsage = new ServiceUsage();
    serviceUsage.id = id;
    serviceUsage.user = user;
    serviceUsage.services = services;
    this.list.push(serviceUsage);
    return serviceUsage;
  }
}

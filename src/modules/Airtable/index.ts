import AirtableAPI from "airtable";
// import Service from 'models/Service'
// import ServiceUsage from 'models/ServiceUsage'
import User from "models/User";

export class Airtable {
  apiKey: string;
  baseId: string;
  base: any;

  constructor(apiKey: string, baseId: string) {
    this.apiKey = apiKey;
    this.baseId = baseId;
    this.base = new AirtableAPI({ apiKey }).base(baseId);
  }

  // private mapBaseToModels(
  //   baseName: string,
  //   eachRecord: (record: any) => void,
  //   done: Array<any>
  // ): Promise<Array<any>> {
  //   return new Promise<Array<any>>(async (resolve, reject) => {
  //     this.base(baseName)
  //       .select()
  //       .eachPage(
  //         async (records, fetchNextPage) => {
  //           await records.forEach(eachRecord)

  //           fetchNextPage()
  //         },
  //         (err) => {
  //           if (err) reject(err)
  //           resolve(done)
  //         }
  //       )
  //   })
  // }

  // getServices(): Promise<Array<Service>> {
  //   const services: Array<Service> = []
  //   return this.mapBaseToModels(
  //     'Services',
  //     (record) => {
  //       services.push(
  //         new Service(
  //           record.get('Name'),
  //           record.get('Name'),
  //           record.get('Price')
  //         )
  //       )
  //     },
  //     services
  //   )
  // }

  // getUsers(): Promise<Array<User>> {
  //   return this.mapBaseToModels(
  //     'User',
  //     (record) => {
  //       User.createIfNotExists(
  //         record.get('id'),
  //         record.get('name'),
  //         record.get('name'),
  //         record.get('Discord_id')
  //       )
  //     },
  //     User.list
  //   )
  // }

  // getServiceUsage(): Promise<Array<ServiceUsage>> {
  //   const serviceUsages: Array<ServiceUsage>
  //   return this.mapBaseToModels(
  //     'Service Usage',
  //     (record) => {
  //       serviceUsages.push(
  //         new ServiceUsage(
  //           record.get('id'),
  //           record.get('Name'),
  //           record.get('Name'),
  //           record.get('Discord_id')
  //         )
  //       )
  //     },
  //     serviceUsages
  //   )
  //}

  // getBillLogs(): Promise<Array> {
  //   return new Promise<Array>(async (resolve, reject) => {
  //     const users = []
  //     this.base('Bill Logs')
  //       .select()
  //       .eachPage(
  //         async (records, fetchNextPage) => {
  //           await records.forEach((record) => users.push(record))

  //           fetchNextPage()
  //         },
  //         (err) => {
  //           if (err) reject(err)
  //           resolve(users)
  //         }
  //       )
  //   })
  // }
}

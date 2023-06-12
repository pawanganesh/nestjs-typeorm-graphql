// // IN DTO FILE

// import { Between, FindManyOptions, In } from 'typeorm';

// export enum GermanRegionEnum {
//   BERLIN = 'BERLIN',
//   HAMBURG = 'HAMBURG',
//   MUNICH = 'MUNICH',
//   COLOGNE = 'COLOGNE',
//   FRANKFURT = 'FRANKFURT',
//   STUTTGART = 'STUTTGART',
// }

// export interface FindAllOrdersInterface {
//   orderSearchInput: Partial<OrderSearchInput>;
//   clientPhone: string;
//   partnerPhone: string;
//   region: GermanRegionEnum;
//   getFindManyOptions(): FindManyOptions<Order>;
// }

// export enum OrderSortEnum {
//   NEW_FIRST = 'NEW_FIRST',
//   A_Z = 'A_Z',
//   Z_A = 'Z_A',
// }

// export type DateRange = [Date, Date];

// export class FindManyOrderDto implements FindAllOrdersInterface {
//   orderSearchInput: Partial<OrderSearchInput>;
//   clientPhone: string;
//   partnerPhone: string;
//   region: GermanRegionEnum;

//   private findManyOptions: FindManyOptions<Order> = {
//     where: {},
//   };

//   getFindManyOptions(): FindManyOptions<Order> {
//     this.makeOrderObject();
//     this.makeWhereQueryObject();
//     this.makePaginationObject();
//     return this.findManyOptions;
//   }

//   private makePaginationObject(): void {
//     if (this.orderSearchInput.limit) this.findManyOptions.take = this.orderSearchInput.limit;
//     if (this.orderSearchInput.skip) this.findManyOptions.take = this.orderSearchInput.skip;
//   }

//   // This will return typeorm object for ordering of orders
//   private makeOrderObject(): void {
//     if (this.orderSearchInput.sort_by === OrderSortEnum.NEW_FIRST) {
//       this.findManyOptions.order = {
//         created_at: 'DESC',
//       };
//     }
//     if (this.orderSearchInput.sort_by === OrderSortEnum.A_Z) {
//       this.findManyOptions.order = {
//         cleanilo_service: {
//           name: 'ASC',
//         },
//       };
//     }
//     if (this.orderSearchInput.sort_by === OrderSortEnum.Z_A) {
//       this.findManyOptions.order = {
//         cleanilo_service: {
//           name: 'DESC',
//         },
//       };
//     }
//   }

//   // make a where query object - where in typeorm
//   private makeWhereQueryObject() {
//     if (this.region) this.handleRegionOfOrder(this.region);
//     if (this.orderSearchInput.date_range) this.handleSearchDateRange(this.orderSearchInput.date_range);
//     if (this.orderSearchInput?.service_ids) this.handleSearchByServiceIds(this.orderSearchInput?.service_ids);
//     if (this.clientPhone) this.handleClientPhone(this.clientPhone);
//     if (this.orderSearchInput.only_assigned_to_me) this.handleOnlyAssignedToAPartner(this.partnerPhone);

//     if (this.orderSearchInput.status) this.handleSearchByStatus(this.orderSearchInput.status);
//   }

//   private handleRegionOfOrder(region: string) {
//     this.findManyOptions.where['region'] = region;
//   }

//   private handleSearchDateRange(dateRange: DateRange) {
//     const [start_date, end_date] = dateRange;
//     this.findManyOptions.where['created_at'] = Between(start_date, end_date);
//   }

//   private handleSearchByServiceIds(service_ids: number[]) {
//     this.findManyOptions.where['cleanilo_service'] = { id: In(service_ids) };
//   }

//   private handleClientPhone(clientPhone: string) {
//     this.findManyOptions.where['client'] = {
//       phone: clientPhone,
//     };
//   }

//   private handleSearchByStatus(multipleStatus: string[]) {
//     this.findManyOptions.where['status'] = In(multipleStatus);
//   }

//   private handleOnlyAssignedToAPartner(partnerPhone: string) {
//     this.findManyOptions.where['assigned_partner'] = { phone: partnerPhone };
//   }
// }

// // IN SERVICE FILE

// // async findAll(findManyOrderDto: FindManyOrderDto) {
// //     return this.orderRepository.customFind(
// //       findManyOrderDto.getFindManyOptions(),
// //     );
// //   }

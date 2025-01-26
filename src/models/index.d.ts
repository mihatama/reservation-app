import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerStaff = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Staff, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly shifts?: (Shift | null)[] | null;
  readonly reservations?: (Reservation | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStaff = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Staff, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly shifts: AsyncCollection<Shift>;
  readonly reservations: AsyncCollection<Reservation>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Staff = LazyLoading extends LazyLoadingDisabled ? EagerStaff : LazyStaff

export declare const Staff: (new (init: ModelInit<Staff>) => Staff) & {
  copyOf(source: Staff, mutator: (draft: MutableModel<Staff>) => MutableModel<Staff> | void): Staff;
}

type EagerShift = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shift, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly staffID: string;
  readonly staffID_date: string;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly staff?: Staff | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShift = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Shift, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly staffID: string;
  readonly staffID_date: string;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly staff: AsyncItem<Staff | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Shift = LazyLoading extends LazyLoadingDisabled ? EagerShift : LazyShift

export declare const Shift: (new (init: ModelInit<Shift>) => Shift) & {
  copyOf(source: Shift, mutator: (draft: MutableModel<Shift>) => MutableModel<Shift> | void): Shift;
}

type EagerReservation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reservation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly staffID: string;
  readonly staffID_date: string;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly clientName: string;
  readonly staff?: Staff | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReservation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Reservation, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly staffID: string;
  readonly staffID_date: string;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly clientName: string;
  readonly staff: AsyncItem<Staff | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Reservation = LazyLoading extends LazyLoadingDisabled ? EagerReservation : LazyReservation

export declare const Reservation: (new (init: ModelInit<Reservation>) => Reservation) & {
  copyOf(source: Reservation, mutator: (draft: MutableModel<Reservation>) => MutableModel<Reservation> | void): Reservation;
}
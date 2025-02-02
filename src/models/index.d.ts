import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTodo = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Todo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Todo = LazyLoading extends LazyLoadingDisabled ? EagerTodo : LazyTodo

export declare const Todo: (new (init: ModelInit<Todo>) => Todo) & {
  copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}

type EagerStaff = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Staff, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly photo?: string | null;
  readonly hidden?: boolean | null;
  readonly description?: string | null;
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
  readonly photo?: string | null;
  readonly hidden?: boolean | null;
  readonly description?: string | null;
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
  readonly staffID_date?: string | null;
  readonly date?: string | null;
  readonly startTime?: string | null;
  readonly endTime?: string | null;
  readonly photo?: string | null;
  readonly details?: string | null;
  readonly capacity?: number | null;
  readonly tentative?: boolean | null;
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
  readonly staffID_date?: string | null;
  readonly date?: string | null;
  readonly startTime?: string | null;
  readonly endTime?: string | null;
  readonly photo?: string | null;
  readonly details?: string | null;
  readonly capacity?: number | null;
  readonly tentative?: boolean | null;
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
  readonly clientName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly owner?: string | null;
  readonly status?: string | null;
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
  readonly clientName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly owner?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Reservation = LazyLoading extends LazyLoadingDisabled ? EagerReservation : LazyReservation

export declare const Reservation: (new (init: ModelInit<Reservation>) => Reservation) & {
  copyOf(source: Reservation, mutator: (draft: MutableModel<Reservation>) => MutableModel<Reservation> | void): Reservation;
}

type EagerQuestionnaire = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Questionnaire, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reservationID: string;
  readonly placeOfVisit: string;
  readonly mamaLastName: string;
  readonly mamaFirstName: string;
  readonly mamaFuriganaLastName?: string | null;
  readonly mamaFuriganaFirstName?: string | null;
  readonly mamaBirthYear: string;
  readonly mamaBirthMonth: string;
  readonly mamaBirthDay: string;
  readonly childLastName?: string | null;
  readonly childFirstName?: string | null;
  readonly childFuriganaLastName?: string | null;
  readonly childFuriganaFirstName?: string | null;
  readonly childBirthYear?: string | null;
  readonly childBirthMonth?: string | null;
  readonly childBirthDay?: string | null;
  readonly childOrder?: string | null;
  readonly childSex?: string | null;
  readonly occupation?: string | null;
  readonly postpartumStatus?: string | null;
  readonly homePostalCode: string;
  readonly homeAddress: string;
  readonly rikaeriPostalCode?: string | null;
  readonly rikaeriAddress?: string | null;
  readonly deliveryMethod: string;
  readonly deliveryWeek: string;
  readonly birthWeight: string;
  readonly dischargeWeight: string;
  readonly dischargeDate?: string | null;
  readonly measurement1Date?: string | null;
  readonly measurement1?: string | null;
  readonly measurement2Date?: string | null;
  readonly measurement2?: string | null;
  readonly pregnancyCondition: string;
  readonly pastMedicalHistory: string;
  readonly medication: string;
  readonly infectionHistory: string;
  readonly familyHistory?: string | null;
  readonly visitReason: string;
  readonly additionalNotes?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyQuestionnaire = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Questionnaire, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly reservationID: string;
  readonly placeOfVisit: string;
  readonly mamaLastName: string;
  readonly mamaFirstName: string;
  readonly mamaFuriganaLastName?: string | null;
  readonly mamaFuriganaFirstName?: string | null;
  readonly mamaBirthYear: string;
  readonly mamaBirthMonth: string;
  readonly mamaBirthDay: string;
  readonly childLastName?: string | null;
  readonly childFirstName?: string | null;
  readonly childFuriganaLastName?: string | null;
  readonly childFuriganaFirstName?: string | null;
  readonly childBirthYear?: string | null;
  readonly childBirthMonth?: string | null;
  readonly childBirthDay?: string | null;
  readonly childOrder?: string | null;
  readonly childSex?: string | null;
  readonly occupation?: string | null;
  readonly postpartumStatus?: string | null;
  readonly homePostalCode: string;
  readonly homeAddress: string;
  readonly rikaeriPostalCode?: string | null;
  readonly rikaeriAddress?: string | null;
  readonly deliveryMethod: string;
  readonly deliveryWeek: string;
  readonly birthWeight: string;
  readonly dischargeWeight: string;
  readonly dischargeDate?: string | null;
  readonly measurement1Date?: string | null;
  readonly measurement1?: string | null;
  readonly measurement2Date?: string | null;
  readonly measurement2?: string | null;
  readonly pregnancyCondition: string;
  readonly pastMedicalHistory: string;
  readonly medication: string;
  readonly infectionHistory: string;
  readonly familyHistory?: string | null;
  readonly visitReason: string;
  readonly additionalNotes?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Questionnaire = LazyLoading extends LazyLoadingDisabled ? EagerQuestionnaire : LazyQuestionnaire

export declare const Questionnaire: (new (init: ModelInit<Questionnaire>) => Questionnaire) & {
  copyOf(source: Questionnaire, mutator: (draft: MutableModel<Questionnaire>) => MutableModel<Questionnaire> | void): Questionnaire;
}
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateStaff = /* GraphQL */ `
  subscription OnCreateStaff($filter: ModelSubscriptionStaffFilterInput) {
    onCreateStaff(filter: $filter) {
      id
      name
      photo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateStaff = /* GraphQL */ `
  subscription OnUpdateStaff($filter: ModelSubscriptionStaffFilterInput) {
    onUpdateStaff(filter: $filter) {
      id
      name
      photo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteStaff = /* GraphQL */ `
  subscription OnDeleteStaff($filter: ModelSubscriptionStaffFilterInput) {
    onDeleteStaff(filter: $filter) {
      id
      name
      photo
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateShift = /* GraphQL */ `
  subscription OnCreateShift($filter: ModelSubscriptionShiftFilterInput) {
    onCreateShift(filter: $filter) {
      id
      staffID
      staffID_date
      date
      startTime
      endTime
      photo
      details
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateShift = /* GraphQL */ `
  subscription OnUpdateShift($filter: ModelSubscriptionShiftFilterInput) {
    onUpdateShift(filter: $filter) {
      id
      staffID
      staffID_date
      date
      startTime
      endTime
      photo
      details
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteShift = /* GraphQL */ `
  subscription OnDeleteShift($filter: ModelSubscriptionShiftFilterInput) {
    onDeleteShift(filter: $filter) {
      id
      staffID
      staffID_date
      date
      startTime
      endTime
      photo
      details
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateReservation = /* GraphQL */ `
  subscription OnCreateReservation(
    $filter: ModelSubscriptionReservationFilterInput
  ) {
    onCreateReservation(filter: $filter) {
      id
      staffID
      staffID_date
      date
      startTime
      endTime
      clientName
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateReservation = /* GraphQL */ `
  subscription OnUpdateReservation(
    $filter: ModelSubscriptionReservationFilterInput
  ) {
    onUpdateReservation(filter: $filter) {
      id
      staffID
      staffID_date
      date
      startTime
      endTime
      clientName
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteReservation = /* GraphQL */ `
  subscription OnDeleteReservation(
    $filter: ModelSubscriptionReservationFilterInput
  ) {
    onDeleteReservation(filter: $filter) {
      id
      staffID
      staffID_date
      date
      startTime
      endTime
      clientName
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;

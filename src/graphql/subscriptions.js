/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStaff = /* GraphQL */ `
  subscription OnCreateStaff($filter: ModelSubscriptionStaffFilterInput) {
    onCreateStaff(filter: $filter) {
      id
      name
      shifts {
        nextToken
        __typename
      }
      reservations {
        nextToken
        __typename
      }
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
      shifts {
        nextToken
        __typename
      }
      reservations {
        nextToken
        __typename
      }
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
      shifts {
        nextToken
        __typename
      }
      reservations {
        nextToken
        __typename
      }
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
      staff {
        id
        name
        createdAt
        updatedAt
        __typename
      }
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
      staff {
        id
        name
        createdAt
        updatedAt
        __typename
      }
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
      staff {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateReservation = /* GraphQL */ `
  subscription OnCreateReservation(
    $filter: ModelSubscriptionReservationFilterInput
    $owner: String
  ) {
    onCreateReservation(filter: $filter, owner: $owner) {
      id
      staffID
      staffID_date
      date
      startTime
      endTime
      clientName
      owner
      staff {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateReservation = /* GraphQL */ `
  subscription OnUpdateReservation(
    $filter: ModelSubscriptionReservationFilterInput
    $owner: String
  ) {
    onUpdateReservation(filter: $filter, owner: $owner) {
      id
      staffID
      staffID_date
      date
      startTime
      endTime
      clientName
      owner
      staff {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteReservation = /* GraphQL */ `
  subscription OnDeleteReservation(
    $filter: ModelSubscriptionReservationFilterInput
    $owner: String
  ) {
    onDeleteReservation(filter: $filter, owner: $owner) {
      id
      staffID
      staffID_date
      date
      startTime
      endTime
      clientName
      owner
      staff {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;

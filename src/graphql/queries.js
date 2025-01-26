/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getStaff = /* GraphQL */ `
  query GetStaff($id: ID!) {
    getStaff(id: $id) {
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
export const listStaff = /* GraphQL */ `
  query ListStaff(
    $filter: ModelStaffFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStaff(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getShift = /* GraphQL */ `
  query GetShift($id: ID!) {
    getShift(id: $id) {
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
export const listShifts = /* GraphQL */ `
  query ListShifts(
    $filter: ModelShiftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShifts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        staffID
        staffID_date
        date
        startTime
        endTime
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const shiftsByStaffID_dateAndDate = /* GraphQL */ `
  query ShiftsByStaffID_dateAndDate(
    $staffID_date: ID!
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelShiftFilterInput
    $limit: Int
    $nextToken: String
  ) {
    shiftsByStaffID_dateAndDate(
      staffID_date: $staffID_date
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        staffID
        staffID_date
        date
        startTime
        endTime
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getReservation = /* GraphQL */ `
  query GetReservation($id: ID!) {
    getReservation(id: $id) {
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
export const listReservations = /* GraphQL */ `
  query ListReservations(
    $filter: ModelReservationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const reservationsByStaffID_dateAndDate = /* GraphQL */ `
  query ReservationsByStaffID_dateAndDate(
    $staffID_date: ID!
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReservationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    reservationsByStaffID_dateAndDate(
      staffID_date: $staffID_date
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;

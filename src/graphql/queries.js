/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncTodos = /* GraphQL */ `
  query SyncTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTodos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getStaff = /* GraphQL */ `
  query GetStaff($id: ID!) {
    getStaff(id: $id) {
      id
      name
      photo
      hidden
      description
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        photo
        hidden
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncStaff = /* GraphQL */ `
  query SyncStaff(
    $filter: ModelStaffFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncStaff(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        photo
        hidden
        description
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
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
      photo
      details
      capacity
      tentative
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        photo
        details
        capacity
        tentative
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncShifts = /* GraphQL */ `
  query SyncShifts(
    $filter: ModelShiftFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncShifts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        staffID
        staffID_date
        date
        startTime
        endTime
        photo
        details
        capacity
        tentative
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
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
      email
      phone
      owner
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
        email
        phone
        owner
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncReservations = /* GraphQL */ `
  query SyncReservations(
    $filter: ModelReservationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReservations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        staffID
        staffID_date
        date
        startTime
        endTime
        clientName
        email
        phone
        owner
        status
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getQuestionnaire = /* GraphQL */ `
  query GetQuestionnaire($id: ID!) {
    getQuestionnaire(id: $id) {
      id
      reservationID
      placeOfVisit
      mamaLastName
      mamaFirstName
      mamaFuriganaLastName
      mamaFuriganaFirstName
      mamaBirthYear
      mamaBirthMonth
      mamaBirthDay
      childLastName
      childFirstName
      childFuriganaLastName
      childFuriganaFirstName
      childBirthYear
      childBirthMonth
      childBirthDay
      childOrder
      childSex
      occupation
      postpartumStatus
      homePostalCode
      homeAddress
      rikaeriPostalCode
      rikaeriAddress
      deliveryMethod
      deliveryWeek
      birthWeight
      dischargeWeight
      dischargeDate
      measurement1Date
      measurement1
      measurement2Date
      measurement2
      pregnancyCondition
      pastMedicalHistory
      medication
      infectionHistory
      familyHistory
      visitReason
      additionalNotes
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listQuestionnaires = /* GraphQL */ `
  query ListQuestionnaires(
    $filter: ModelQuestionnaireFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionnaires(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        reservationID
        placeOfVisit
        mamaLastName
        mamaFirstName
        mamaFuriganaLastName
        mamaFuriganaFirstName
        mamaBirthYear
        mamaBirthMonth
        mamaBirthDay
        childLastName
        childFirstName
        childFuriganaLastName
        childFuriganaFirstName
        childBirthYear
        childBirthMonth
        childBirthDay
        childOrder
        childSex
        occupation
        postpartumStatus
        homePostalCode
        homeAddress
        rikaeriPostalCode
        rikaeriAddress
        deliveryMethod
        deliveryWeek
        birthWeight
        dischargeWeight
        dischargeDate
        measurement1Date
        measurement1
        measurement2Date
        measurement2
        pregnancyCondition
        pastMedicalHistory
        medication
        infectionHistory
        familyHistory
        visitReason
        additionalNotes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncQuestionnaires = /* GraphQL */ `
  query SyncQuestionnaires(
    $filter: ModelQuestionnaireFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncQuestionnaires(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        reservationID
        placeOfVisit
        mamaLastName
        mamaFirstName
        mamaFuriganaLastName
        mamaFuriganaFirstName
        mamaBirthYear
        mamaBirthMonth
        mamaBirthDay
        childLastName
        childFirstName
        childFuriganaLastName
        childFuriganaFirstName
        childBirthYear
        childBirthMonth
        childBirthDay
        childOrder
        childSex
        occupation
        postpartumStatus
        homePostalCode
        homeAddress
        rikaeriPostalCode
        rikaeriAddress
        deliveryMethod
        deliveryWeek
        birthWeight
        dischargeWeight
        dischargeDate
        measurement1Date
        measurement1
        measurement2Date
        measurement2
        pregnancyCondition
        pastMedicalHistory
        medication
        infectionHistory
        familyHistory
        visitReason
        additionalNotes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getMedicalRecord = /* GraphQL */ `
  query GetMedicalRecord($id: ID!) {
    getMedicalRecord(id: $id) {
      id
      recordNo
      recordMonth
      recordDay
      place
      staffName
      traineeName
      childName
      childAgeYears
      childAgeMonths
      childAgeDays
      weight
      weightGain
      breastInterval
      formula
      expressedMilk
      babyFood
      stoolCount
      urineCount
      childDevelopment
      weaningStatus
      dayCount
      breastShape
      nippleUsage
      expressionTimes
      expressionTool
      nippleCondition
      pain
      breastfeedingPosition
      familySupport
      oMemo
      sMemo
      pMemo
      breastDiagnosis
      paymentMethod
      additionalFees
      otherNotes
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listMedicalRecords = /* GraphQL */ `
  query ListMedicalRecords(
    $filter: ModelMedicalRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedicalRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        recordNo
        recordMonth
        recordDay
        place
        staffName
        traineeName
        childName
        childAgeYears
        childAgeMonths
        childAgeDays
        weight
        weightGain
        breastInterval
        formula
        expressedMilk
        babyFood
        stoolCount
        urineCount
        childDevelopment
        weaningStatus
        dayCount
        breastShape
        nippleUsage
        expressionTimes
        expressionTool
        nippleCondition
        pain
        breastfeedingPosition
        familySupport
        oMemo
        sMemo
        pMemo
        breastDiagnosis
        paymentMethod
        additionalFees
        otherNotes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncMedicalRecords = /* GraphQL */ `
  query SyncMedicalRecords(
    $filter: ModelMedicalRecordFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncMedicalRecords(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        recordNo
        recordMonth
        recordDay
        place
        staffName
        traineeName
        childName
        childAgeYears
        childAgeMonths
        childAgeDays
        weight
        weightGain
        breastInterval
        formula
        expressedMilk
        babyFood
        stoolCount
        urineCount
        childDevelopment
        weaningStatus
        dayCount
        breastShape
        nippleUsage
        expressionTimes
        expressionTool
        nippleCondition
        pain
        breastfeedingPosition
        familySupport
        oMemo
        sMemo
        pMemo
        breastDiagnosis
        paymentMethod
        additionalFees
        otherNotes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;

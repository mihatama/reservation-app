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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
export const onUpdateStaff = /* GraphQL */ `
  subscription OnUpdateStaff($filter: ModelSubscriptionStaffFilterInput) {
    onUpdateStaff(filter: $filter) {
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
export const onDeleteStaff = /* GraphQL */ `
  subscription OnDeleteStaff($filter: ModelSubscriptionStaffFilterInput) {
    onDeleteStaff(filter: $filter) {
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
export const onCreateQuestionnaire = /* GraphQL */ `
  subscription OnCreateQuestionnaire(
    $filter: ModelSubscriptionQuestionnaireFilterInput
  ) {
    onCreateQuestionnaire(filter: $filter) {
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
export const onUpdateQuestionnaire = /* GraphQL */ `
  subscription OnUpdateQuestionnaire(
    $filter: ModelSubscriptionQuestionnaireFilterInput
  ) {
    onUpdateQuestionnaire(filter: $filter) {
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
export const onDeleteQuestionnaire = /* GraphQL */ `
  subscription OnDeleteQuestionnaire(
    $filter: ModelSubscriptionQuestionnaireFilterInput
  ) {
    onDeleteQuestionnaire(filter: $filter) {
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
export const onCreateMedicalRecord = /* GraphQL */ `
  subscription OnCreateMedicalRecord(
    $filter: ModelSubscriptionMedicalRecordFilterInput
  ) {
    onCreateMedicalRecord(filter: $filter) {
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
export const onUpdateMedicalRecord = /* GraphQL */ `
  subscription OnUpdateMedicalRecord(
    $filter: ModelSubscriptionMedicalRecordFilterInput
  ) {
    onUpdateMedicalRecord(filter: $filter) {
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
export const onDeleteMedicalRecord = /* GraphQL */ `
  subscription OnDeleteMedicalRecord(
    $filter: ModelSubscriptionMedicalRecordFilterInput
  ) {
    onDeleteMedicalRecord(filter: $filter) {
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

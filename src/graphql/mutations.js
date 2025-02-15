/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
export const createStaff = /* GraphQL */ `
  mutation CreateStaff(
    $input: CreateStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    createStaff(input: $input, condition: $condition) {
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
export const updateStaff = /* GraphQL */ `
  mutation UpdateStaff(
    $input: UpdateStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    updateStaff(input: $input, condition: $condition) {
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
export const deleteStaff = /* GraphQL */ `
  mutation DeleteStaff(
    $input: DeleteStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    deleteStaff(input: $input, condition: $condition) {
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
export const createShift = /* GraphQL */ `
  mutation CreateShift(
    $input: CreateShiftInput!
    $condition: ModelShiftConditionInput
  ) {
    createShift(input: $input, condition: $condition) {
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
export const updateShift = /* GraphQL */ `
  mutation UpdateShift(
    $input: UpdateShiftInput!
    $condition: ModelShiftConditionInput
  ) {
    updateShift(input: $input, condition: $condition) {
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
export const deleteShift = /* GraphQL */ `
  mutation DeleteShift(
    $input: DeleteShiftInput!
    $condition: ModelShiftConditionInput
  ) {
    deleteShift(input: $input, condition: $condition) {
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
export const createReservation = /* GraphQL */ `
  mutation CreateReservation(
    $input: CreateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    createReservation(input: $input, condition: $condition) {
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
export const updateReservation = /* GraphQL */ `
  mutation UpdateReservation(
    $input: UpdateReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    updateReservation(input: $input, condition: $condition) {
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
export const deleteReservation = /* GraphQL */ `
  mutation DeleteReservation(
    $input: DeleteReservationInput!
    $condition: ModelReservationConditionInput
  ) {
    deleteReservation(input: $input, condition: $condition) {
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
export const createQuestionnaire = /* GraphQL */ `
  mutation CreateQuestionnaire(
    $input: CreateQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    createQuestionnaire(input: $input, condition: $condition) {
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
export const updateQuestionnaire = /* GraphQL */ `
  mutation UpdateQuestionnaire(
    $input: UpdateQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    updateQuestionnaire(input: $input, condition: $condition) {
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
export const deleteQuestionnaire = /* GraphQL */ `
  mutation DeleteQuestionnaire(
    $input: DeleteQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    deleteQuestionnaire(input: $input, condition: $condition) {
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
export const createMedicalRecord = /* GraphQL */ `
  mutation CreateMedicalRecord(
    $input: CreateMedicalRecordInput!
    $condition: ModelMedicalRecordConditionInput
  ) {
    createMedicalRecord(input: $input, condition: $condition) {
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
export const updateMedicalRecord = /* GraphQL */ `
  mutation UpdateMedicalRecord(
    $input: UpdateMedicalRecordInput!
    $condition: ModelMedicalRecordConditionInput
  ) {
    updateMedicalRecord(input: $input, condition: $condition) {
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
export const deleteMedicalRecord = /* GraphQL */ `
  mutation DeleteMedicalRecord(
    $input: DeleteMedicalRecordInput!
    $condition: ModelMedicalRecordConditionInput
  ) {
    deleteMedicalRecord(input: $input, condition: $condition) {
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

/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { Questionnaire } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function QuestionnaireUpdateForm(props) {
  const {
    id: idProp,
    questionnaire: questionnaireModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    reservationID: "",
    placeOfVisit: "",
    mamaLastName: "",
    mamaFirstName: "",
    mamaFuriganaLastName: "",
    mamaFuriganaFirstName: "",
    mamaBirthYear: "",
    mamaBirthMonth: "",
    mamaBirthDay: "",
    childLastName: "",
    childFirstName: "",
    childFuriganaLastName: "",
    childFuriganaFirstName: "",
    childBirthYear: "",
    childBirthMonth: "",
    childBirthDay: "",
    childOrder: "",
    childSex: "",
    occupation: "",
    postpartumStatus: "",
    homePostalCode: "",
    homeAddress: "",
    rikaeriPostalCode: "",
    rikaeriAddress: "",
    deliveryMethod: "",
    deliveryWeek: "",
    birthWeight: "",
    dischargeWeight: "",
    dischargeDate: "",
    measurement1Date: "",
    measurement1: "",
    measurement2Date: "",
    measurement2: "",
    pregnancyCondition: "",
    pastMedicalHistory: "",
    medication: "",
    infectionHistory: "",
    familyHistory: "",
    visitReason: "",
    additionalNotes: "",
  };
  const [reservationID, setReservationID] = React.useState(
    initialValues.reservationID
  );
  const [placeOfVisit, setPlaceOfVisit] = React.useState(
    initialValues.placeOfVisit
  );
  const [mamaLastName, setMamaLastName] = React.useState(
    initialValues.mamaLastName
  );
  const [mamaFirstName, setMamaFirstName] = React.useState(
    initialValues.mamaFirstName
  );
  const [mamaFuriganaLastName, setMamaFuriganaLastName] = React.useState(
    initialValues.mamaFuriganaLastName
  );
  const [mamaFuriganaFirstName, setMamaFuriganaFirstName] = React.useState(
    initialValues.mamaFuriganaFirstName
  );
  const [mamaBirthYear, setMamaBirthYear] = React.useState(
    initialValues.mamaBirthYear
  );
  const [mamaBirthMonth, setMamaBirthMonth] = React.useState(
    initialValues.mamaBirthMonth
  );
  const [mamaBirthDay, setMamaBirthDay] = React.useState(
    initialValues.mamaBirthDay
  );
  const [childLastName, setChildLastName] = React.useState(
    initialValues.childLastName
  );
  const [childFirstName, setChildFirstName] = React.useState(
    initialValues.childFirstName
  );
  const [childFuriganaLastName, setChildFuriganaLastName] = React.useState(
    initialValues.childFuriganaLastName
  );
  const [childFuriganaFirstName, setChildFuriganaFirstName] = React.useState(
    initialValues.childFuriganaFirstName
  );
  const [childBirthYear, setChildBirthYear] = React.useState(
    initialValues.childBirthYear
  );
  const [childBirthMonth, setChildBirthMonth] = React.useState(
    initialValues.childBirthMonth
  );
  const [childBirthDay, setChildBirthDay] = React.useState(
    initialValues.childBirthDay
  );
  const [childOrder, setChildOrder] = React.useState(initialValues.childOrder);
  const [childSex, setChildSex] = React.useState(initialValues.childSex);
  const [occupation, setOccupation] = React.useState(initialValues.occupation);
  const [postpartumStatus, setPostpartumStatus] = React.useState(
    initialValues.postpartumStatus
  );
  const [homePostalCode, setHomePostalCode] = React.useState(
    initialValues.homePostalCode
  );
  const [homeAddress, setHomeAddress] = React.useState(
    initialValues.homeAddress
  );
  const [rikaeriPostalCode, setRikaeriPostalCode] = React.useState(
    initialValues.rikaeriPostalCode
  );
  const [rikaeriAddress, setRikaeriAddress] = React.useState(
    initialValues.rikaeriAddress
  );
  const [deliveryMethod, setDeliveryMethod] = React.useState(
    initialValues.deliveryMethod
  );
  const [deliveryWeek, setDeliveryWeek] = React.useState(
    initialValues.deliveryWeek
  );
  const [birthWeight, setBirthWeight] = React.useState(
    initialValues.birthWeight
  );
  const [dischargeWeight, setDischargeWeight] = React.useState(
    initialValues.dischargeWeight
  );
  const [dischargeDate, setDischargeDate] = React.useState(
    initialValues.dischargeDate
  );
  const [measurement1Date, setMeasurement1Date] = React.useState(
    initialValues.measurement1Date
  );
  const [measurement1, setMeasurement1] = React.useState(
    initialValues.measurement1
  );
  const [measurement2Date, setMeasurement2Date] = React.useState(
    initialValues.measurement2Date
  );
  const [measurement2, setMeasurement2] = React.useState(
    initialValues.measurement2
  );
  const [pregnancyCondition, setPregnancyCondition] = React.useState(
    initialValues.pregnancyCondition
  );
  const [pastMedicalHistory, setPastMedicalHistory] = React.useState(
    initialValues.pastMedicalHistory
  );
  const [medication, setMedication] = React.useState(initialValues.medication);
  const [infectionHistory, setInfectionHistory] = React.useState(
    initialValues.infectionHistory
  );
  const [familyHistory, setFamilyHistory] = React.useState(
    initialValues.familyHistory
  );
  const [visitReason, setVisitReason] = React.useState(
    initialValues.visitReason
  );
  const [additionalNotes, setAdditionalNotes] = React.useState(
    initialValues.additionalNotes
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = questionnaireRecord
      ? { ...initialValues, ...questionnaireRecord }
      : initialValues;
    setReservationID(cleanValues.reservationID);
    setPlaceOfVisit(cleanValues.placeOfVisit);
    setMamaLastName(cleanValues.mamaLastName);
    setMamaFirstName(cleanValues.mamaFirstName);
    setMamaFuriganaLastName(cleanValues.mamaFuriganaLastName);
    setMamaFuriganaFirstName(cleanValues.mamaFuriganaFirstName);
    setMamaBirthYear(cleanValues.mamaBirthYear);
    setMamaBirthMonth(cleanValues.mamaBirthMonth);
    setMamaBirthDay(cleanValues.mamaBirthDay);
    setChildLastName(cleanValues.childLastName);
    setChildFirstName(cleanValues.childFirstName);
    setChildFuriganaLastName(cleanValues.childFuriganaLastName);
    setChildFuriganaFirstName(cleanValues.childFuriganaFirstName);
    setChildBirthYear(cleanValues.childBirthYear);
    setChildBirthMonth(cleanValues.childBirthMonth);
    setChildBirthDay(cleanValues.childBirthDay);
    setChildOrder(cleanValues.childOrder);
    setChildSex(cleanValues.childSex);
    setOccupation(cleanValues.occupation);
    setPostpartumStatus(cleanValues.postpartumStatus);
    setHomePostalCode(cleanValues.homePostalCode);
    setHomeAddress(cleanValues.homeAddress);
    setRikaeriPostalCode(cleanValues.rikaeriPostalCode);
    setRikaeriAddress(cleanValues.rikaeriAddress);
    setDeliveryMethod(cleanValues.deliveryMethod);
    setDeliveryWeek(cleanValues.deliveryWeek);
    setBirthWeight(cleanValues.birthWeight);
    setDischargeWeight(cleanValues.dischargeWeight);
    setDischargeDate(cleanValues.dischargeDate);
    setMeasurement1Date(cleanValues.measurement1Date);
    setMeasurement1(cleanValues.measurement1);
    setMeasurement2Date(cleanValues.measurement2Date);
    setMeasurement2(cleanValues.measurement2);
    setPregnancyCondition(cleanValues.pregnancyCondition);
    setPastMedicalHistory(cleanValues.pastMedicalHistory);
    setMedication(cleanValues.medication);
    setInfectionHistory(cleanValues.infectionHistory);
    setFamilyHistory(cleanValues.familyHistory);
    setVisitReason(cleanValues.visitReason);
    setAdditionalNotes(cleanValues.additionalNotes);
    setErrors({});
  };
  const [questionnaireRecord, setQuestionnaireRecord] = React.useState(
    questionnaireModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Questionnaire, idProp)
        : questionnaireModelProp;
      setQuestionnaireRecord(record);
    };
    queryData();
  }, [idProp, questionnaireModelProp]);
  React.useEffect(resetStateValues, [questionnaireRecord]);
  const validations = {
    reservationID: [{ type: "Required" }],
    placeOfVisit: [{ type: "Required" }],
    mamaLastName: [{ type: "Required" }],
    mamaFirstName: [{ type: "Required" }],
    mamaFuriganaLastName: [],
    mamaFuriganaFirstName: [],
    mamaBirthYear: [{ type: "Required" }],
    mamaBirthMonth: [{ type: "Required" }],
    mamaBirthDay: [{ type: "Required" }],
    childLastName: [],
    childFirstName: [],
    childFuriganaLastName: [],
    childFuriganaFirstName: [],
    childBirthYear: [],
    childBirthMonth: [],
    childBirthDay: [],
    childOrder: [],
    childSex: [],
    occupation: [],
    postpartumStatus: [],
    homePostalCode: [{ type: "Required" }],
    homeAddress: [{ type: "Required" }],
    rikaeriPostalCode: [],
    rikaeriAddress: [],
    deliveryMethod: [{ type: "Required" }],
    deliveryWeek: [{ type: "Required" }],
    birthWeight: [{ type: "Required" }],
    dischargeWeight: [{ type: "Required" }],
    dischargeDate: [],
    measurement1Date: [],
    measurement1: [],
    measurement2Date: [],
    measurement2: [],
    pregnancyCondition: [{ type: "Required" }],
    pastMedicalHistory: [{ type: "Required" }],
    medication: [{ type: "Required" }],
    infectionHistory: [{ type: "Required" }],
    familyHistory: [],
    visitReason: [{ type: "Required" }],
    additionalNotes: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          reservationID,
          placeOfVisit,
          mamaLastName,
          mamaFirstName,
          mamaFuriganaLastName,
          mamaFuriganaFirstName,
          mamaBirthYear,
          mamaBirthMonth,
          mamaBirthDay,
          childLastName,
          childFirstName,
          childFuriganaLastName,
          childFuriganaFirstName,
          childBirthYear,
          childBirthMonth,
          childBirthDay,
          childOrder,
          childSex,
          occupation,
          postpartumStatus,
          homePostalCode,
          homeAddress,
          rikaeriPostalCode,
          rikaeriAddress,
          deliveryMethod,
          deliveryWeek,
          birthWeight,
          dischargeWeight,
          dischargeDate,
          measurement1Date,
          measurement1,
          measurement2Date,
          measurement2,
          pregnancyCondition,
          pastMedicalHistory,
          medication,
          infectionHistory,
          familyHistory,
          visitReason,
          additionalNotes,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            Questionnaire.copyOf(questionnaireRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "QuestionnaireUpdateForm")}
      {...rest}
    >
      <TextField
        label="Reservation id"
        isRequired={true}
        isReadOnly={false}
        value={reservationID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID: value,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.reservationID ?? value;
          }
          if (errors.reservationID?.hasError) {
            runValidationTasks("reservationID", value);
          }
          setReservationID(value);
        }}
        onBlur={() => runValidationTasks("reservationID", reservationID)}
        errorMessage={errors.reservationID?.errorMessage}
        hasError={errors.reservationID?.hasError}
        {...getOverrideProps(overrides, "reservationID")}
      ></TextField>
      <TextField
        label="Place of visit"
        isRequired={true}
        isReadOnly={false}
        value={placeOfVisit}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit: value,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.placeOfVisit ?? value;
          }
          if (errors.placeOfVisit?.hasError) {
            runValidationTasks("placeOfVisit", value);
          }
          setPlaceOfVisit(value);
        }}
        onBlur={() => runValidationTasks("placeOfVisit", placeOfVisit)}
        errorMessage={errors.placeOfVisit?.errorMessage}
        hasError={errors.placeOfVisit?.hasError}
        {...getOverrideProps(overrides, "placeOfVisit")}
      ></TextField>
      <TextField
        label="Mama last name"
        isRequired={true}
        isReadOnly={false}
        value={mamaLastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName: value,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.mamaLastName ?? value;
          }
          if (errors.mamaLastName?.hasError) {
            runValidationTasks("mamaLastName", value);
          }
          setMamaLastName(value);
        }}
        onBlur={() => runValidationTasks("mamaLastName", mamaLastName)}
        errorMessage={errors.mamaLastName?.errorMessage}
        hasError={errors.mamaLastName?.hasError}
        {...getOverrideProps(overrides, "mamaLastName")}
      ></TextField>
      <TextField
        label="Mama first name"
        isRequired={true}
        isReadOnly={false}
        value={mamaFirstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName: value,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.mamaFirstName ?? value;
          }
          if (errors.mamaFirstName?.hasError) {
            runValidationTasks("mamaFirstName", value);
          }
          setMamaFirstName(value);
        }}
        onBlur={() => runValidationTasks("mamaFirstName", mamaFirstName)}
        errorMessage={errors.mamaFirstName?.errorMessage}
        hasError={errors.mamaFirstName?.hasError}
        {...getOverrideProps(overrides, "mamaFirstName")}
      ></TextField>
      <TextField
        label="Mama furigana last name"
        isRequired={false}
        isReadOnly={false}
        value={mamaFuriganaLastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName: value,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.mamaFuriganaLastName ?? value;
          }
          if (errors.mamaFuriganaLastName?.hasError) {
            runValidationTasks("mamaFuriganaLastName", value);
          }
          setMamaFuriganaLastName(value);
        }}
        onBlur={() =>
          runValidationTasks("mamaFuriganaLastName", mamaFuriganaLastName)
        }
        errorMessage={errors.mamaFuriganaLastName?.errorMessage}
        hasError={errors.mamaFuriganaLastName?.hasError}
        {...getOverrideProps(overrides, "mamaFuriganaLastName")}
      ></TextField>
      <TextField
        label="Mama furigana first name"
        isRequired={false}
        isReadOnly={false}
        value={mamaFuriganaFirstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName: value,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.mamaFuriganaFirstName ?? value;
          }
          if (errors.mamaFuriganaFirstName?.hasError) {
            runValidationTasks("mamaFuriganaFirstName", value);
          }
          setMamaFuriganaFirstName(value);
        }}
        onBlur={() =>
          runValidationTasks("mamaFuriganaFirstName", mamaFuriganaFirstName)
        }
        errorMessage={errors.mamaFuriganaFirstName?.errorMessage}
        hasError={errors.mamaFuriganaFirstName?.hasError}
        {...getOverrideProps(overrides, "mamaFuriganaFirstName")}
      ></TextField>
      <TextField
        label="Mama birth year"
        isRequired={true}
        isReadOnly={false}
        value={mamaBirthYear}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear: value,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.mamaBirthYear ?? value;
          }
          if (errors.mamaBirthYear?.hasError) {
            runValidationTasks("mamaBirthYear", value);
          }
          setMamaBirthYear(value);
        }}
        onBlur={() => runValidationTasks("mamaBirthYear", mamaBirthYear)}
        errorMessage={errors.mamaBirthYear?.errorMessage}
        hasError={errors.mamaBirthYear?.hasError}
        {...getOverrideProps(overrides, "mamaBirthYear")}
      ></TextField>
      <TextField
        label="Mama birth month"
        isRequired={true}
        isReadOnly={false}
        value={mamaBirthMonth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth: value,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.mamaBirthMonth ?? value;
          }
          if (errors.mamaBirthMonth?.hasError) {
            runValidationTasks("mamaBirthMonth", value);
          }
          setMamaBirthMonth(value);
        }}
        onBlur={() => runValidationTasks("mamaBirthMonth", mamaBirthMonth)}
        errorMessage={errors.mamaBirthMonth?.errorMessage}
        hasError={errors.mamaBirthMonth?.hasError}
        {...getOverrideProps(overrides, "mamaBirthMonth")}
      ></TextField>
      <TextField
        label="Mama birth day"
        isRequired={true}
        isReadOnly={false}
        value={mamaBirthDay}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay: value,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.mamaBirthDay ?? value;
          }
          if (errors.mamaBirthDay?.hasError) {
            runValidationTasks("mamaBirthDay", value);
          }
          setMamaBirthDay(value);
        }}
        onBlur={() => runValidationTasks("mamaBirthDay", mamaBirthDay)}
        errorMessage={errors.mamaBirthDay?.errorMessage}
        hasError={errors.mamaBirthDay?.hasError}
        {...getOverrideProps(overrides, "mamaBirthDay")}
      ></TextField>
      <TextField
        label="Child last name"
        isRequired={false}
        isReadOnly={false}
        value={childLastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName: value,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.childLastName ?? value;
          }
          if (errors.childLastName?.hasError) {
            runValidationTasks("childLastName", value);
          }
          setChildLastName(value);
        }}
        onBlur={() => runValidationTasks("childLastName", childLastName)}
        errorMessage={errors.childLastName?.errorMessage}
        hasError={errors.childLastName?.hasError}
        {...getOverrideProps(overrides, "childLastName")}
      ></TextField>
      <TextField
        label="Child first name"
        isRequired={false}
        isReadOnly={false}
        value={childFirstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName: value,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.childFirstName ?? value;
          }
          if (errors.childFirstName?.hasError) {
            runValidationTasks("childFirstName", value);
          }
          setChildFirstName(value);
        }}
        onBlur={() => runValidationTasks("childFirstName", childFirstName)}
        errorMessage={errors.childFirstName?.errorMessage}
        hasError={errors.childFirstName?.hasError}
        {...getOverrideProps(overrides, "childFirstName")}
      ></TextField>
      <TextField
        label="Child furigana last name"
        isRequired={false}
        isReadOnly={false}
        value={childFuriganaLastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName: value,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.childFuriganaLastName ?? value;
          }
          if (errors.childFuriganaLastName?.hasError) {
            runValidationTasks("childFuriganaLastName", value);
          }
          setChildFuriganaLastName(value);
        }}
        onBlur={() =>
          runValidationTasks("childFuriganaLastName", childFuriganaLastName)
        }
        errorMessage={errors.childFuriganaLastName?.errorMessage}
        hasError={errors.childFuriganaLastName?.hasError}
        {...getOverrideProps(overrides, "childFuriganaLastName")}
      ></TextField>
      <TextField
        label="Child furigana first name"
        isRequired={false}
        isReadOnly={false}
        value={childFuriganaFirstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName: value,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.childFuriganaFirstName ?? value;
          }
          if (errors.childFuriganaFirstName?.hasError) {
            runValidationTasks("childFuriganaFirstName", value);
          }
          setChildFuriganaFirstName(value);
        }}
        onBlur={() =>
          runValidationTasks("childFuriganaFirstName", childFuriganaFirstName)
        }
        errorMessage={errors.childFuriganaFirstName?.errorMessage}
        hasError={errors.childFuriganaFirstName?.hasError}
        {...getOverrideProps(overrides, "childFuriganaFirstName")}
      ></TextField>
      <TextField
        label="Child birth year"
        isRequired={false}
        isReadOnly={false}
        value={childBirthYear}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear: value,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.childBirthYear ?? value;
          }
          if (errors.childBirthYear?.hasError) {
            runValidationTasks("childBirthYear", value);
          }
          setChildBirthYear(value);
        }}
        onBlur={() => runValidationTasks("childBirthYear", childBirthYear)}
        errorMessage={errors.childBirthYear?.errorMessage}
        hasError={errors.childBirthYear?.hasError}
        {...getOverrideProps(overrides, "childBirthYear")}
      ></TextField>
      <TextField
        label="Child birth month"
        isRequired={false}
        isReadOnly={false}
        value={childBirthMonth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth: value,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.childBirthMonth ?? value;
          }
          if (errors.childBirthMonth?.hasError) {
            runValidationTasks("childBirthMonth", value);
          }
          setChildBirthMonth(value);
        }}
        onBlur={() => runValidationTasks("childBirthMonth", childBirthMonth)}
        errorMessage={errors.childBirthMonth?.errorMessage}
        hasError={errors.childBirthMonth?.hasError}
        {...getOverrideProps(overrides, "childBirthMonth")}
      ></TextField>
      <TextField
        label="Child birth day"
        isRequired={false}
        isReadOnly={false}
        value={childBirthDay}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay: value,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.childBirthDay ?? value;
          }
          if (errors.childBirthDay?.hasError) {
            runValidationTasks("childBirthDay", value);
          }
          setChildBirthDay(value);
        }}
        onBlur={() => runValidationTasks("childBirthDay", childBirthDay)}
        errorMessage={errors.childBirthDay?.errorMessage}
        hasError={errors.childBirthDay?.hasError}
        {...getOverrideProps(overrides, "childBirthDay")}
      ></TextField>
      <TextField
        label="Child order"
        isRequired={false}
        isReadOnly={false}
        value={childOrder}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder: value,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.childOrder ?? value;
          }
          if (errors.childOrder?.hasError) {
            runValidationTasks("childOrder", value);
          }
          setChildOrder(value);
        }}
        onBlur={() => runValidationTasks("childOrder", childOrder)}
        errorMessage={errors.childOrder?.errorMessage}
        hasError={errors.childOrder?.hasError}
        {...getOverrideProps(overrides, "childOrder")}
      ></TextField>
      <TextField
        label="Child sex"
        isRequired={false}
        isReadOnly={false}
        value={childSex}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex: value,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.childSex ?? value;
          }
          if (errors.childSex?.hasError) {
            runValidationTasks("childSex", value);
          }
          setChildSex(value);
        }}
        onBlur={() => runValidationTasks("childSex", childSex)}
        errorMessage={errors.childSex?.errorMessage}
        hasError={errors.childSex?.hasError}
        {...getOverrideProps(overrides, "childSex")}
      ></TextField>
      <TextField
        label="Occupation"
        isRequired={false}
        isReadOnly={false}
        value={occupation}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation: value,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.occupation ?? value;
          }
          if (errors.occupation?.hasError) {
            runValidationTasks("occupation", value);
          }
          setOccupation(value);
        }}
        onBlur={() => runValidationTasks("occupation", occupation)}
        errorMessage={errors.occupation?.errorMessage}
        hasError={errors.occupation?.hasError}
        {...getOverrideProps(overrides, "occupation")}
      ></TextField>
      <TextField
        label="Postpartum status"
        isRequired={false}
        isReadOnly={false}
        value={postpartumStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus: value,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.postpartumStatus ?? value;
          }
          if (errors.postpartumStatus?.hasError) {
            runValidationTasks("postpartumStatus", value);
          }
          setPostpartumStatus(value);
        }}
        onBlur={() => runValidationTasks("postpartumStatus", postpartumStatus)}
        errorMessage={errors.postpartumStatus?.errorMessage}
        hasError={errors.postpartumStatus?.hasError}
        {...getOverrideProps(overrides, "postpartumStatus")}
      ></TextField>
      <TextField
        label="Home postal code"
        isRequired={true}
        isReadOnly={false}
        value={homePostalCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode: value,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.homePostalCode ?? value;
          }
          if (errors.homePostalCode?.hasError) {
            runValidationTasks("homePostalCode", value);
          }
          setHomePostalCode(value);
        }}
        onBlur={() => runValidationTasks("homePostalCode", homePostalCode)}
        errorMessage={errors.homePostalCode?.errorMessage}
        hasError={errors.homePostalCode?.hasError}
        {...getOverrideProps(overrides, "homePostalCode")}
      ></TextField>
      <TextField
        label="Home address"
        isRequired={true}
        isReadOnly={false}
        value={homeAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress: value,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.homeAddress ?? value;
          }
          if (errors.homeAddress?.hasError) {
            runValidationTasks("homeAddress", value);
          }
          setHomeAddress(value);
        }}
        onBlur={() => runValidationTasks("homeAddress", homeAddress)}
        errorMessage={errors.homeAddress?.errorMessage}
        hasError={errors.homeAddress?.hasError}
        {...getOverrideProps(overrides, "homeAddress")}
      ></TextField>
      <TextField
        label="Rikaeri postal code"
        isRequired={false}
        isReadOnly={false}
        value={rikaeriPostalCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode: value,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.rikaeriPostalCode ?? value;
          }
          if (errors.rikaeriPostalCode?.hasError) {
            runValidationTasks("rikaeriPostalCode", value);
          }
          setRikaeriPostalCode(value);
        }}
        onBlur={() =>
          runValidationTasks("rikaeriPostalCode", rikaeriPostalCode)
        }
        errorMessage={errors.rikaeriPostalCode?.errorMessage}
        hasError={errors.rikaeriPostalCode?.hasError}
        {...getOverrideProps(overrides, "rikaeriPostalCode")}
      ></TextField>
      <TextField
        label="Rikaeri address"
        isRequired={false}
        isReadOnly={false}
        value={rikaeriAddress}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress: value,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.rikaeriAddress ?? value;
          }
          if (errors.rikaeriAddress?.hasError) {
            runValidationTasks("rikaeriAddress", value);
          }
          setRikaeriAddress(value);
        }}
        onBlur={() => runValidationTasks("rikaeriAddress", rikaeriAddress)}
        errorMessage={errors.rikaeriAddress?.errorMessage}
        hasError={errors.rikaeriAddress?.hasError}
        {...getOverrideProps(overrides, "rikaeriAddress")}
      ></TextField>
      <TextField
        label="Delivery method"
        isRequired={true}
        isReadOnly={false}
        value={deliveryMethod}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod: value,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.deliveryMethod ?? value;
          }
          if (errors.deliveryMethod?.hasError) {
            runValidationTasks("deliveryMethod", value);
          }
          setDeliveryMethod(value);
        }}
        onBlur={() => runValidationTasks("deliveryMethod", deliveryMethod)}
        errorMessage={errors.deliveryMethod?.errorMessage}
        hasError={errors.deliveryMethod?.hasError}
        {...getOverrideProps(overrides, "deliveryMethod")}
      ></TextField>
      <TextField
        label="Delivery week"
        isRequired={true}
        isReadOnly={false}
        value={deliveryWeek}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek: value,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.deliveryWeek ?? value;
          }
          if (errors.deliveryWeek?.hasError) {
            runValidationTasks("deliveryWeek", value);
          }
          setDeliveryWeek(value);
        }}
        onBlur={() => runValidationTasks("deliveryWeek", deliveryWeek)}
        errorMessage={errors.deliveryWeek?.errorMessage}
        hasError={errors.deliveryWeek?.hasError}
        {...getOverrideProps(overrides, "deliveryWeek")}
      ></TextField>
      <TextField
        label="Birth weight"
        isRequired={true}
        isReadOnly={false}
        value={birthWeight}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight: value,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.birthWeight ?? value;
          }
          if (errors.birthWeight?.hasError) {
            runValidationTasks("birthWeight", value);
          }
          setBirthWeight(value);
        }}
        onBlur={() => runValidationTasks("birthWeight", birthWeight)}
        errorMessage={errors.birthWeight?.errorMessage}
        hasError={errors.birthWeight?.hasError}
        {...getOverrideProps(overrides, "birthWeight")}
      ></TextField>
      <TextField
        label="Discharge weight"
        isRequired={true}
        isReadOnly={false}
        value={dischargeWeight}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight: value,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.dischargeWeight ?? value;
          }
          if (errors.dischargeWeight?.hasError) {
            runValidationTasks("dischargeWeight", value);
          }
          setDischargeWeight(value);
        }}
        onBlur={() => runValidationTasks("dischargeWeight", dischargeWeight)}
        errorMessage={errors.dischargeWeight?.errorMessage}
        hasError={errors.dischargeWeight?.hasError}
        {...getOverrideProps(overrides, "dischargeWeight")}
      ></TextField>
      <TextField
        label="Discharge date"
        isRequired={false}
        isReadOnly={false}
        value={dischargeDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate: value,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.dischargeDate ?? value;
          }
          if (errors.dischargeDate?.hasError) {
            runValidationTasks("dischargeDate", value);
          }
          setDischargeDate(value);
        }}
        onBlur={() => runValidationTasks("dischargeDate", dischargeDate)}
        errorMessage={errors.dischargeDate?.errorMessage}
        hasError={errors.dischargeDate?.hasError}
        {...getOverrideProps(overrides, "dischargeDate")}
      ></TextField>
      <TextField
        label="Measurement1 date"
        isRequired={false}
        isReadOnly={false}
        value={measurement1Date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date: value,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.measurement1Date ?? value;
          }
          if (errors.measurement1Date?.hasError) {
            runValidationTasks("measurement1Date", value);
          }
          setMeasurement1Date(value);
        }}
        onBlur={() => runValidationTasks("measurement1Date", measurement1Date)}
        errorMessage={errors.measurement1Date?.errorMessage}
        hasError={errors.measurement1Date?.hasError}
        {...getOverrideProps(overrides, "measurement1Date")}
      ></TextField>
      <TextField
        label="Measurement1"
        isRequired={false}
        isReadOnly={false}
        value={measurement1}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1: value,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.measurement1 ?? value;
          }
          if (errors.measurement1?.hasError) {
            runValidationTasks("measurement1", value);
          }
          setMeasurement1(value);
        }}
        onBlur={() => runValidationTasks("measurement1", measurement1)}
        errorMessage={errors.measurement1?.errorMessage}
        hasError={errors.measurement1?.hasError}
        {...getOverrideProps(overrides, "measurement1")}
      ></TextField>
      <TextField
        label="Measurement2 date"
        isRequired={false}
        isReadOnly={false}
        value={measurement2Date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date: value,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.measurement2Date ?? value;
          }
          if (errors.measurement2Date?.hasError) {
            runValidationTasks("measurement2Date", value);
          }
          setMeasurement2Date(value);
        }}
        onBlur={() => runValidationTasks("measurement2Date", measurement2Date)}
        errorMessage={errors.measurement2Date?.errorMessage}
        hasError={errors.measurement2Date?.hasError}
        {...getOverrideProps(overrides, "measurement2Date")}
      ></TextField>
      <TextField
        label="Measurement2"
        isRequired={false}
        isReadOnly={false}
        value={measurement2}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2: value,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.measurement2 ?? value;
          }
          if (errors.measurement2?.hasError) {
            runValidationTasks("measurement2", value);
          }
          setMeasurement2(value);
        }}
        onBlur={() => runValidationTasks("measurement2", measurement2)}
        errorMessage={errors.measurement2?.errorMessage}
        hasError={errors.measurement2?.hasError}
        {...getOverrideProps(overrides, "measurement2")}
      ></TextField>
      <TextField
        label="Pregnancy condition"
        isRequired={true}
        isReadOnly={false}
        value={pregnancyCondition}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition: value,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.pregnancyCondition ?? value;
          }
          if (errors.pregnancyCondition?.hasError) {
            runValidationTasks("pregnancyCondition", value);
          }
          setPregnancyCondition(value);
        }}
        onBlur={() =>
          runValidationTasks("pregnancyCondition", pregnancyCondition)
        }
        errorMessage={errors.pregnancyCondition?.errorMessage}
        hasError={errors.pregnancyCondition?.hasError}
        {...getOverrideProps(overrides, "pregnancyCondition")}
      ></TextField>
      <TextField
        label="Past medical history"
        isRequired={true}
        isReadOnly={false}
        value={pastMedicalHistory}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory: value,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.pastMedicalHistory ?? value;
          }
          if (errors.pastMedicalHistory?.hasError) {
            runValidationTasks("pastMedicalHistory", value);
          }
          setPastMedicalHistory(value);
        }}
        onBlur={() =>
          runValidationTasks("pastMedicalHistory", pastMedicalHistory)
        }
        errorMessage={errors.pastMedicalHistory?.errorMessage}
        hasError={errors.pastMedicalHistory?.hasError}
        {...getOverrideProps(overrides, "pastMedicalHistory")}
      ></TextField>
      <TextField
        label="Medication"
        isRequired={true}
        isReadOnly={false}
        value={medication}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication: value,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.medication ?? value;
          }
          if (errors.medication?.hasError) {
            runValidationTasks("medication", value);
          }
          setMedication(value);
        }}
        onBlur={() => runValidationTasks("medication", medication)}
        errorMessage={errors.medication?.errorMessage}
        hasError={errors.medication?.hasError}
        {...getOverrideProps(overrides, "medication")}
      ></TextField>
      <TextField
        label="Infection history"
        isRequired={true}
        isReadOnly={false}
        value={infectionHistory}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory: value,
              familyHistory,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.infectionHistory ?? value;
          }
          if (errors.infectionHistory?.hasError) {
            runValidationTasks("infectionHistory", value);
          }
          setInfectionHistory(value);
        }}
        onBlur={() => runValidationTasks("infectionHistory", infectionHistory)}
        errorMessage={errors.infectionHistory?.errorMessage}
        hasError={errors.infectionHistory?.hasError}
        {...getOverrideProps(overrides, "infectionHistory")}
      ></TextField>
      <TextField
        label="Family history"
        isRequired={false}
        isReadOnly={false}
        value={familyHistory}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory: value,
              visitReason,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.familyHistory ?? value;
          }
          if (errors.familyHistory?.hasError) {
            runValidationTasks("familyHistory", value);
          }
          setFamilyHistory(value);
        }}
        onBlur={() => runValidationTasks("familyHistory", familyHistory)}
        errorMessage={errors.familyHistory?.errorMessage}
        hasError={errors.familyHistory?.hasError}
        {...getOverrideProps(overrides, "familyHistory")}
      ></TextField>
      <TextField
        label="Visit reason"
        isRequired={true}
        isReadOnly={false}
        value={visitReason}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason: value,
              additionalNotes,
            };
            const result = onChange(modelFields);
            value = result?.visitReason ?? value;
          }
          if (errors.visitReason?.hasError) {
            runValidationTasks("visitReason", value);
          }
          setVisitReason(value);
        }}
        onBlur={() => runValidationTasks("visitReason", visitReason)}
        errorMessage={errors.visitReason?.errorMessage}
        hasError={errors.visitReason?.hasError}
        {...getOverrideProps(overrides, "visitReason")}
      ></TextField>
      <TextField
        label="Additional notes"
        isRequired={false}
        isReadOnly={false}
        value={additionalNotes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              reservationID,
              placeOfVisit,
              mamaLastName,
              mamaFirstName,
              mamaFuriganaLastName,
              mamaFuriganaFirstName,
              mamaBirthYear,
              mamaBirthMonth,
              mamaBirthDay,
              childLastName,
              childFirstName,
              childFuriganaLastName,
              childFuriganaFirstName,
              childBirthYear,
              childBirthMonth,
              childBirthDay,
              childOrder,
              childSex,
              occupation,
              postpartumStatus,
              homePostalCode,
              homeAddress,
              rikaeriPostalCode,
              rikaeriAddress,
              deliveryMethod,
              deliveryWeek,
              birthWeight,
              dischargeWeight,
              dischargeDate,
              measurement1Date,
              measurement1,
              measurement2Date,
              measurement2,
              pregnancyCondition,
              pastMedicalHistory,
              medication,
              infectionHistory,
              familyHistory,
              visitReason,
              additionalNotes: value,
            };
            const result = onChange(modelFields);
            value = result?.additionalNotes ?? value;
          }
          if (errors.additionalNotes?.hasError) {
            runValidationTasks("additionalNotes", value);
          }
          setAdditionalNotes(value);
        }}
        onBlur={() => runValidationTasks("additionalNotes", additionalNotes)}
        errorMessage={errors.additionalNotes?.errorMessage}
        hasError={errors.additionalNotes?.hasError}
        {...getOverrideProps(overrides, "additionalNotes")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || questionnaireModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || questionnaireModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { MedicalRecord } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function MedicalRecordUpdateForm(props) {
  const {
    id: idProp,
    medicalRecord: medicalRecordModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    recordNo: "",
    recordMonth: "",
    recordDay: "",
    place: "",
    staffName: "",
    traineeName: "",
    childName: "",
    childAgeYears: "",
    childAgeMonths: "",
    childAgeDays: "",
    weight: "",
    weightGain: "",
    breastInterval: "",
    formula: "",
    expressedMilk: "",
    babyFood: "",
    stoolCount: "",
    urineCount: "",
    childDevelopment: "",
    weaningStatus: "",
    dayCount: "",
    breastShape: "",
    nippleUsage: "",
    expressionTimes: "",
    expressionTool: "",
    nippleCondition: "",
    pain: "",
    breastfeedingPosition: "",
    familySupport: "",
    oMemo: "",
    sMemo: "",
    pMemo: "",
    breastDiagnosis: "",
    paymentMethod: "",
    additionalFees: "",
    otherNotes: "",
  };
  const [recordNo, setRecordNo] = React.useState(initialValues.recordNo);
  const [recordMonth, setRecordMonth] = React.useState(
    initialValues.recordMonth
  );
  const [recordDay, setRecordDay] = React.useState(initialValues.recordDay);
  const [place, setPlace] = React.useState(initialValues.place);
  const [staffName, setStaffName] = React.useState(initialValues.staffName);
  const [traineeName, setTraineeName] = React.useState(
    initialValues.traineeName
  );
  const [childName, setChildName] = React.useState(initialValues.childName);
  const [childAgeYears, setChildAgeYears] = React.useState(
    initialValues.childAgeYears
  );
  const [childAgeMonths, setChildAgeMonths] = React.useState(
    initialValues.childAgeMonths
  );
  const [childAgeDays, setChildAgeDays] = React.useState(
    initialValues.childAgeDays
  );
  const [weight, setWeight] = React.useState(initialValues.weight);
  const [weightGain, setWeightGain] = React.useState(initialValues.weightGain);
  const [breastInterval, setBreastInterval] = React.useState(
    initialValues.breastInterval
  );
  const [formula, setFormula] = React.useState(initialValues.formula);
  const [expressedMilk, setExpressedMilk] = React.useState(
    initialValues.expressedMilk
  );
  const [babyFood, setBabyFood] = React.useState(initialValues.babyFood);
  const [stoolCount, setStoolCount] = React.useState(initialValues.stoolCount);
  const [urineCount, setUrineCount] = React.useState(initialValues.urineCount);
  const [childDevelopment, setChildDevelopment] = React.useState(
    initialValues.childDevelopment
  );
  const [weaningStatus, setWeaningStatus] = React.useState(
    initialValues.weaningStatus
  );
  const [dayCount, setDayCount] = React.useState(initialValues.dayCount);
  const [breastShape, setBreastShape] = React.useState(
    initialValues.breastShape
  );
  const [nippleUsage, setNippleUsage] = React.useState(
    initialValues.nippleUsage
  );
  const [expressionTimes, setExpressionTimes] = React.useState(
    initialValues.expressionTimes
  );
  const [expressionTool, setExpressionTool] = React.useState(
    initialValues.expressionTool
  );
  const [nippleCondition, setNippleCondition] = React.useState(
    initialValues.nippleCondition
  );
  const [pain, setPain] = React.useState(initialValues.pain);
  const [breastfeedingPosition, setBreastfeedingPosition] = React.useState(
    initialValues.breastfeedingPosition
  );
  const [familySupport, setFamilySupport] = React.useState(
    initialValues.familySupport
  );
  const [oMemo, setOMemo] = React.useState(initialValues.oMemo);
  const [sMemo, setSMemo] = React.useState(initialValues.sMemo);
  const [pMemo, setPMemo] = React.useState(initialValues.pMemo);
  const [breastDiagnosis, setBreastDiagnosis] = React.useState(
    initialValues.breastDiagnosis
  );
  const [paymentMethod, setPaymentMethod] = React.useState(
    initialValues.paymentMethod
  );
  const [additionalFees, setAdditionalFees] = React.useState(
    initialValues.additionalFees
  );
  const [otherNotes, setOtherNotes] = React.useState(initialValues.otherNotes);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = medicalRecordRecord
      ? { ...initialValues, ...medicalRecordRecord }
      : initialValues;
    setRecordNo(cleanValues.recordNo);
    setRecordMonth(cleanValues.recordMonth);
    setRecordDay(cleanValues.recordDay);
    setPlace(cleanValues.place);
    setStaffName(cleanValues.staffName);
    setTraineeName(cleanValues.traineeName);
    setChildName(cleanValues.childName);
    setChildAgeYears(cleanValues.childAgeYears);
    setChildAgeMonths(cleanValues.childAgeMonths);
    setChildAgeDays(cleanValues.childAgeDays);
    setWeight(cleanValues.weight);
    setWeightGain(cleanValues.weightGain);
    setBreastInterval(cleanValues.breastInterval);
    setFormula(cleanValues.formula);
    setExpressedMilk(cleanValues.expressedMilk);
    setBabyFood(cleanValues.babyFood);
    setStoolCount(cleanValues.stoolCount);
    setUrineCount(cleanValues.urineCount);
    setChildDevelopment(cleanValues.childDevelopment);
    setWeaningStatus(cleanValues.weaningStatus);
    setDayCount(cleanValues.dayCount);
    setBreastShape(cleanValues.breastShape);
    setNippleUsage(cleanValues.nippleUsage);
    setExpressionTimes(cleanValues.expressionTimes);
    setExpressionTool(cleanValues.expressionTool);
    setNippleCondition(cleanValues.nippleCondition);
    setPain(cleanValues.pain);
    setBreastfeedingPosition(cleanValues.breastfeedingPosition);
    setFamilySupport(cleanValues.familySupport);
    setOMemo(cleanValues.oMemo);
    setSMemo(cleanValues.sMemo);
    setPMemo(cleanValues.pMemo);
    setBreastDiagnosis(cleanValues.breastDiagnosis);
    setPaymentMethod(cleanValues.paymentMethod);
    setAdditionalFees(cleanValues.additionalFees);
    setOtherNotes(cleanValues.otherNotes);
    setErrors({});
  };
  const [medicalRecordRecord, setMedicalRecordRecord] = React.useState(
    medicalRecordModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(MedicalRecord, idProp)
        : medicalRecordModelProp;
      setMedicalRecordRecord(record);
    };
    queryData();
  }, [idProp, medicalRecordModelProp]);
  React.useEffect(resetStateValues, [medicalRecordRecord]);
  const validations = {
    recordNo: [],
    recordMonth: [],
    recordDay: [],
    place: [],
    staffName: [],
    traineeName: [],
    childName: [],
    childAgeYears: [],
    childAgeMonths: [],
    childAgeDays: [],
    weight: [],
    weightGain: [],
    breastInterval: [],
    formula: [],
    expressedMilk: [],
    babyFood: [],
    stoolCount: [],
    urineCount: [],
    childDevelopment: [],
    weaningStatus: [],
    dayCount: [],
    breastShape: [],
    nippleUsage: [],
    expressionTimes: [],
    expressionTool: [],
    nippleCondition: [],
    pain: [],
    breastfeedingPosition: [],
    familySupport: [],
    oMemo: [],
    sMemo: [],
    pMemo: [],
    breastDiagnosis: [],
    paymentMethod: [],
    additionalFees: [],
    otherNotes: [],
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
          recordNo,
          recordMonth,
          recordDay,
          place,
          staffName,
          traineeName,
          childName,
          childAgeYears,
          childAgeMonths,
          childAgeDays,
          weight,
          weightGain,
          breastInterval,
          formula,
          expressedMilk,
          babyFood,
          stoolCount,
          urineCount,
          childDevelopment,
          weaningStatus,
          dayCount,
          breastShape,
          nippleUsage,
          expressionTimes,
          expressionTool,
          nippleCondition,
          pain,
          breastfeedingPosition,
          familySupport,
          oMemo,
          sMemo,
          pMemo,
          breastDiagnosis,
          paymentMethod,
          additionalFees,
          otherNotes,
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
            MedicalRecord.copyOf(medicalRecordRecord, (updated) => {
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
      {...getOverrideProps(overrides, "MedicalRecordUpdateForm")}
      {...rest}
    >
      <TextField
        label="Record no"
        isRequired={false}
        isReadOnly={false}
        value={recordNo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo: value,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.recordNo ?? value;
          }
          if (errors.recordNo?.hasError) {
            runValidationTasks("recordNo", value);
          }
          setRecordNo(value);
        }}
        onBlur={() => runValidationTasks("recordNo", recordNo)}
        errorMessage={errors.recordNo?.errorMessage}
        hasError={errors.recordNo?.hasError}
        {...getOverrideProps(overrides, "recordNo")}
      ></TextField>
      <TextField
        label="Record month"
        isRequired={false}
        isReadOnly={false}
        value={recordMonth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth: value,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.recordMonth ?? value;
          }
          if (errors.recordMonth?.hasError) {
            runValidationTasks("recordMonth", value);
          }
          setRecordMonth(value);
        }}
        onBlur={() => runValidationTasks("recordMonth", recordMonth)}
        errorMessage={errors.recordMonth?.errorMessage}
        hasError={errors.recordMonth?.hasError}
        {...getOverrideProps(overrides, "recordMonth")}
      ></TextField>
      <TextField
        label="Record day"
        isRequired={false}
        isReadOnly={false}
        value={recordDay}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay: value,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.recordDay ?? value;
          }
          if (errors.recordDay?.hasError) {
            runValidationTasks("recordDay", value);
          }
          setRecordDay(value);
        }}
        onBlur={() => runValidationTasks("recordDay", recordDay)}
        errorMessage={errors.recordDay?.errorMessage}
        hasError={errors.recordDay?.hasError}
        {...getOverrideProps(overrides, "recordDay")}
      ></TextField>
      <TextField
        label="Place"
        isRequired={false}
        isReadOnly={false}
        value={place}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place: value,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.place ?? value;
          }
          if (errors.place?.hasError) {
            runValidationTasks("place", value);
          }
          setPlace(value);
        }}
        onBlur={() => runValidationTasks("place", place)}
        errorMessage={errors.place?.errorMessage}
        hasError={errors.place?.hasError}
        {...getOverrideProps(overrides, "place")}
      ></TextField>
      <TextField
        label="Staff name"
        isRequired={false}
        isReadOnly={false}
        value={staffName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName: value,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.staffName ?? value;
          }
          if (errors.staffName?.hasError) {
            runValidationTasks("staffName", value);
          }
          setStaffName(value);
        }}
        onBlur={() => runValidationTasks("staffName", staffName)}
        errorMessage={errors.staffName?.errorMessage}
        hasError={errors.staffName?.hasError}
        {...getOverrideProps(overrides, "staffName")}
      ></TextField>
      <TextField
        label="Trainee name"
        isRequired={false}
        isReadOnly={false}
        value={traineeName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName: value,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.traineeName ?? value;
          }
          if (errors.traineeName?.hasError) {
            runValidationTasks("traineeName", value);
          }
          setTraineeName(value);
        }}
        onBlur={() => runValidationTasks("traineeName", traineeName)}
        errorMessage={errors.traineeName?.errorMessage}
        hasError={errors.traineeName?.hasError}
        {...getOverrideProps(overrides, "traineeName")}
      ></TextField>
      <TextField
        label="Child name"
        isRequired={false}
        isReadOnly={false}
        value={childName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName: value,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.childName ?? value;
          }
          if (errors.childName?.hasError) {
            runValidationTasks("childName", value);
          }
          setChildName(value);
        }}
        onBlur={() => runValidationTasks("childName", childName)}
        errorMessage={errors.childName?.errorMessage}
        hasError={errors.childName?.hasError}
        {...getOverrideProps(overrides, "childName")}
      ></TextField>
      <TextField
        label="Child age years"
        isRequired={false}
        isReadOnly={false}
        value={childAgeYears}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears: value,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.childAgeYears ?? value;
          }
          if (errors.childAgeYears?.hasError) {
            runValidationTasks("childAgeYears", value);
          }
          setChildAgeYears(value);
        }}
        onBlur={() => runValidationTasks("childAgeYears", childAgeYears)}
        errorMessage={errors.childAgeYears?.errorMessage}
        hasError={errors.childAgeYears?.hasError}
        {...getOverrideProps(overrides, "childAgeYears")}
      ></TextField>
      <TextField
        label="Child age months"
        isRequired={false}
        isReadOnly={false}
        value={childAgeMonths}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths: value,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.childAgeMonths ?? value;
          }
          if (errors.childAgeMonths?.hasError) {
            runValidationTasks("childAgeMonths", value);
          }
          setChildAgeMonths(value);
        }}
        onBlur={() => runValidationTasks("childAgeMonths", childAgeMonths)}
        errorMessage={errors.childAgeMonths?.errorMessage}
        hasError={errors.childAgeMonths?.hasError}
        {...getOverrideProps(overrides, "childAgeMonths")}
      ></TextField>
      <TextField
        label="Child age days"
        isRequired={false}
        isReadOnly={false}
        value={childAgeDays}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays: value,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.childAgeDays ?? value;
          }
          if (errors.childAgeDays?.hasError) {
            runValidationTasks("childAgeDays", value);
          }
          setChildAgeDays(value);
        }}
        onBlur={() => runValidationTasks("childAgeDays", childAgeDays)}
        errorMessage={errors.childAgeDays?.errorMessage}
        hasError={errors.childAgeDays?.hasError}
        {...getOverrideProps(overrides, "childAgeDays")}
      ></TextField>
      <TextField
        label="Weight"
        isRequired={false}
        isReadOnly={false}
        value={weight}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight: value,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.weight ?? value;
          }
          if (errors.weight?.hasError) {
            runValidationTasks("weight", value);
          }
          setWeight(value);
        }}
        onBlur={() => runValidationTasks("weight", weight)}
        errorMessage={errors.weight?.errorMessage}
        hasError={errors.weight?.hasError}
        {...getOverrideProps(overrides, "weight")}
      ></TextField>
      <TextField
        label="Weight gain"
        isRequired={false}
        isReadOnly={false}
        value={weightGain}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain: value,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.weightGain ?? value;
          }
          if (errors.weightGain?.hasError) {
            runValidationTasks("weightGain", value);
          }
          setWeightGain(value);
        }}
        onBlur={() => runValidationTasks("weightGain", weightGain)}
        errorMessage={errors.weightGain?.errorMessage}
        hasError={errors.weightGain?.hasError}
        {...getOverrideProps(overrides, "weightGain")}
      ></TextField>
      <TextField
        label="Breast interval"
        isRequired={false}
        isReadOnly={false}
        value={breastInterval}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval: value,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.breastInterval ?? value;
          }
          if (errors.breastInterval?.hasError) {
            runValidationTasks("breastInterval", value);
          }
          setBreastInterval(value);
        }}
        onBlur={() => runValidationTasks("breastInterval", breastInterval)}
        errorMessage={errors.breastInterval?.errorMessage}
        hasError={errors.breastInterval?.hasError}
        {...getOverrideProps(overrides, "breastInterval")}
      ></TextField>
      <TextField
        label="Formula"
        isRequired={false}
        isReadOnly={false}
        value={formula}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula: value,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.formula ?? value;
          }
          if (errors.formula?.hasError) {
            runValidationTasks("formula", value);
          }
          setFormula(value);
        }}
        onBlur={() => runValidationTasks("formula", formula)}
        errorMessage={errors.formula?.errorMessage}
        hasError={errors.formula?.hasError}
        {...getOverrideProps(overrides, "formula")}
      ></TextField>
      <TextField
        label="Expressed milk"
        isRequired={false}
        isReadOnly={false}
        value={expressedMilk}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk: value,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.expressedMilk ?? value;
          }
          if (errors.expressedMilk?.hasError) {
            runValidationTasks("expressedMilk", value);
          }
          setExpressedMilk(value);
        }}
        onBlur={() => runValidationTasks("expressedMilk", expressedMilk)}
        errorMessage={errors.expressedMilk?.errorMessage}
        hasError={errors.expressedMilk?.hasError}
        {...getOverrideProps(overrides, "expressedMilk")}
      ></TextField>
      <TextField
        label="Baby food"
        isRequired={false}
        isReadOnly={false}
        value={babyFood}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood: value,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.babyFood ?? value;
          }
          if (errors.babyFood?.hasError) {
            runValidationTasks("babyFood", value);
          }
          setBabyFood(value);
        }}
        onBlur={() => runValidationTasks("babyFood", babyFood)}
        errorMessage={errors.babyFood?.errorMessage}
        hasError={errors.babyFood?.hasError}
        {...getOverrideProps(overrides, "babyFood")}
      ></TextField>
      <TextField
        label="Stool count"
        isRequired={false}
        isReadOnly={false}
        value={stoolCount}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount: value,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.stoolCount ?? value;
          }
          if (errors.stoolCount?.hasError) {
            runValidationTasks("stoolCount", value);
          }
          setStoolCount(value);
        }}
        onBlur={() => runValidationTasks("stoolCount", stoolCount)}
        errorMessage={errors.stoolCount?.errorMessage}
        hasError={errors.stoolCount?.hasError}
        {...getOverrideProps(overrides, "stoolCount")}
      ></TextField>
      <TextField
        label="Urine count"
        isRequired={false}
        isReadOnly={false}
        value={urineCount}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount: value,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.urineCount ?? value;
          }
          if (errors.urineCount?.hasError) {
            runValidationTasks("urineCount", value);
          }
          setUrineCount(value);
        }}
        onBlur={() => runValidationTasks("urineCount", urineCount)}
        errorMessage={errors.urineCount?.errorMessage}
        hasError={errors.urineCount?.hasError}
        {...getOverrideProps(overrides, "urineCount")}
      ></TextField>
      <TextField
        label="Child development"
        isRequired={false}
        isReadOnly={false}
        value={childDevelopment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment: value,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.childDevelopment ?? value;
          }
          if (errors.childDevelopment?.hasError) {
            runValidationTasks("childDevelopment", value);
          }
          setChildDevelopment(value);
        }}
        onBlur={() => runValidationTasks("childDevelopment", childDevelopment)}
        errorMessage={errors.childDevelopment?.errorMessage}
        hasError={errors.childDevelopment?.hasError}
        {...getOverrideProps(overrides, "childDevelopment")}
      ></TextField>
      <TextField
        label="Weaning status"
        isRequired={false}
        isReadOnly={false}
        value={weaningStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus: value,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.weaningStatus ?? value;
          }
          if (errors.weaningStatus?.hasError) {
            runValidationTasks("weaningStatus", value);
          }
          setWeaningStatus(value);
        }}
        onBlur={() => runValidationTasks("weaningStatus", weaningStatus)}
        errorMessage={errors.weaningStatus?.errorMessage}
        hasError={errors.weaningStatus?.hasError}
        {...getOverrideProps(overrides, "weaningStatus")}
      ></TextField>
      <TextField
        label="Day count"
        isRequired={false}
        isReadOnly={false}
        value={dayCount}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount: value,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.dayCount ?? value;
          }
          if (errors.dayCount?.hasError) {
            runValidationTasks("dayCount", value);
          }
          setDayCount(value);
        }}
        onBlur={() => runValidationTasks("dayCount", dayCount)}
        errorMessage={errors.dayCount?.errorMessage}
        hasError={errors.dayCount?.hasError}
        {...getOverrideProps(overrides, "dayCount")}
      ></TextField>
      <TextField
        label="Breast shape"
        isRequired={false}
        isReadOnly={false}
        value={breastShape}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape: value,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.breastShape ?? value;
          }
          if (errors.breastShape?.hasError) {
            runValidationTasks("breastShape", value);
          }
          setBreastShape(value);
        }}
        onBlur={() => runValidationTasks("breastShape", breastShape)}
        errorMessage={errors.breastShape?.errorMessage}
        hasError={errors.breastShape?.hasError}
        {...getOverrideProps(overrides, "breastShape")}
      ></TextField>
      <TextField
        label="Nipple usage"
        isRequired={false}
        isReadOnly={false}
        value={nippleUsage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage: value,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.nippleUsage ?? value;
          }
          if (errors.nippleUsage?.hasError) {
            runValidationTasks("nippleUsage", value);
          }
          setNippleUsage(value);
        }}
        onBlur={() => runValidationTasks("nippleUsage", nippleUsage)}
        errorMessage={errors.nippleUsage?.errorMessage}
        hasError={errors.nippleUsage?.hasError}
        {...getOverrideProps(overrides, "nippleUsage")}
      ></TextField>
      <TextField
        label="Expression times"
        isRequired={false}
        isReadOnly={false}
        value={expressionTimes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes: value,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.expressionTimes ?? value;
          }
          if (errors.expressionTimes?.hasError) {
            runValidationTasks("expressionTimes", value);
          }
          setExpressionTimes(value);
        }}
        onBlur={() => runValidationTasks("expressionTimes", expressionTimes)}
        errorMessage={errors.expressionTimes?.errorMessage}
        hasError={errors.expressionTimes?.hasError}
        {...getOverrideProps(overrides, "expressionTimes")}
      ></TextField>
      <TextField
        label="Expression tool"
        isRequired={false}
        isReadOnly={false}
        value={expressionTool}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool: value,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.expressionTool ?? value;
          }
          if (errors.expressionTool?.hasError) {
            runValidationTasks("expressionTool", value);
          }
          setExpressionTool(value);
        }}
        onBlur={() => runValidationTasks("expressionTool", expressionTool)}
        errorMessage={errors.expressionTool?.errorMessage}
        hasError={errors.expressionTool?.hasError}
        {...getOverrideProps(overrides, "expressionTool")}
      ></TextField>
      <TextField
        label="Nipple condition"
        isRequired={false}
        isReadOnly={false}
        value={nippleCondition}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition: value,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.nippleCondition ?? value;
          }
          if (errors.nippleCondition?.hasError) {
            runValidationTasks("nippleCondition", value);
          }
          setNippleCondition(value);
        }}
        onBlur={() => runValidationTasks("nippleCondition", nippleCondition)}
        errorMessage={errors.nippleCondition?.errorMessage}
        hasError={errors.nippleCondition?.hasError}
        {...getOverrideProps(overrides, "nippleCondition")}
      ></TextField>
      <TextField
        label="Pain"
        isRequired={false}
        isReadOnly={false}
        value={pain}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain: value,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.pain ?? value;
          }
          if (errors.pain?.hasError) {
            runValidationTasks("pain", value);
          }
          setPain(value);
        }}
        onBlur={() => runValidationTasks("pain", pain)}
        errorMessage={errors.pain?.errorMessage}
        hasError={errors.pain?.hasError}
        {...getOverrideProps(overrides, "pain")}
      ></TextField>
      <TextField
        label="Breastfeeding position"
        isRequired={false}
        isReadOnly={false}
        value={breastfeedingPosition}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition: value,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.breastfeedingPosition ?? value;
          }
          if (errors.breastfeedingPosition?.hasError) {
            runValidationTasks("breastfeedingPosition", value);
          }
          setBreastfeedingPosition(value);
        }}
        onBlur={() =>
          runValidationTasks("breastfeedingPosition", breastfeedingPosition)
        }
        errorMessage={errors.breastfeedingPosition?.errorMessage}
        hasError={errors.breastfeedingPosition?.hasError}
        {...getOverrideProps(overrides, "breastfeedingPosition")}
      ></TextField>
      <TextField
        label="Family support"
        isRequired={false}
        isReadOnly={false}
        value={familySupport}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport: value,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.familySupport ?? value;
          }
          if (errors.familySupport?.hasError) {
            runValidationTasks("familySupport", value);
          }
          setFamilySupport(value);
        }}
        onBlur={() => runValidationTasks("familySupport", familySupport)}
        errorMessage={errors.familySupport?.errorMessage}
        hasError={errors.familySupport?.hasError}
        {...getOverrideProps(overrides, "familySupport")}
      ></TextField>
      <TextField
        label="O memo"
        isRequired={false}
        isReadOnly={false}
        value={oMemo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo: value,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.oMemo ?? value;
          }
          if (errors.oMemo?.hasError) {
            runValidationTasks("oMemo", value);
          }
          setOMemo(value);
        }}
        onBlur={() => runValidationTasks("oMemo", oMemo)}
        errorMessage={errors.oMemo?.errorMessage}
        hasError={errors.oMemo?.hasError}
        {...getOverrideProps(overrides, "oMemo")}
      ></TextField>
      <TextField
        label="S memo"
        isRequired={false}
        isReadOnly={false}
        value={sMemo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo: value,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.sMemo ?? value;
          }
          if (errors.sMemo?.hasError) {
            runValidationTasks("sMemo", value);
          }
          setSMemo(value);
        }}
        onBlur={() => runValidationTasks("sMemo", sMemo)}
        errorMessage={errors.sMemo?.errorMessage}
        hasError={errors.sMemo?.hasError}
        {...getOverrideProps(overrides, "sMemo")}
      ></TextField>
      <TextField
        label="P memo"
        isRequired={false}
        isReadOnly={false}
        value={pMemo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo: value,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.pMemo ?? value;
          }
          if (errors.pMemo?.hasError) {
            runValidationTasks("pMemo", value);
          }
          setPMemo(value);
        }}
        onBlur={() => runValidationTasks("pMemo", pMemo)}
        errorMessage={errors.pMemo?.errorMessage}
        hasError={errors.pMemo?.hasError}
        {...getOverrideProps(overrides, "pMemo")}
      ></TextField>
      <TextField
        label="Breast diagnosis"
        isRequired={false}
        isReadOnly={false}
        value={breastDiagnosis}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis: value,
              paymentMethod,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.breastDiagnosis ?? value;
          }
          if (errors.breastDiagnosis?.hasError) {
            runValidationTasks("breastDiagnosis", value);
          }
          setBreastDiagnosis(value);
        }}
        onBlur={() => runValidationTasks("breastDiagnosis", breastDiagnosis)}
        errorMessage={errors.breastDiagnosis?.errorMessage}
        hasError={errors.breastDiagnosis?.hasError}
        {...getOverrideProps(overrides, "breastDiagnosis")}
      ></TextField>
      <TextField
        label="Payment method"
        isRequired={false}
        isReadOnly={false}
        value={paymentMethod}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod: value,
              additionalFees,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.paymentMethod ?? value;
          }
          if (errors.paymentMethod?.hasError) {
            runValidationTasks("paymentMethod", value);
          }
          setPaymentMethod(value);
        }}
        onBlur={() => runValidationTasks("paymentMethod", paymentMethod)}
        errorMessage={errors.paymentMethod?.errorMessage}
        hasError={errors.paymentMethod?.hasError}
        {...getOverrideProps(overrides, "paymentMethod")}
      ></TextField>
      <TextField
        label="Additional fees"
        isRequired={false}
        isReadOnly={false}
        value={additionalFees}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees: value,
              otherNotes,
            };
            const result = onChange(modelFields);
            value = result?.additionalFees ?? value;
          }
          if (errors.additionalFees?.hasError) {
            runValidationTasks("additionalFees", value);
          }
          setAdditionalFees(value);
        }}
        onBlur={() => runValidationTasks("additionalFees", additionalFees)}
        errorMessage={errors.additionalFees?.errorMessage}
        hasError={errors.additionalFees?.hasError}
        {...getOverrideProps(overrides, "additionalFees")}
      ></TextField>
      <TextField
        label="Other notes"
        isRequired={false}
        isReadOnly={false}
        value={otherNotes}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              recordNo,
              recordMonth,
              recordDay,
              place,
              staffName,
              traineeName,
              childName,
              childAgeYears,
              childAgeMonths,
              childAgeDays,
              weight,
              weightGain,
              breastInterval,
              formula,
              expressedMilk,
              babyFood,
              stoolCount,
              urineCount,
              childDevelopment,
              weaningStatus,
              dayCount,
              breastShape,
              nippleUsage,
              expressionTimes,
              expressionTool,
              nippleCondition,
              pain,
              breastfeedingPosition,
              familySupport,
              oMemo,
              sMemo,
              pMemo,
              breastDiagnosis,
              paymentMethod,
              additionalFees,
              otherNotes: value,
            };
            const result = onChange(modelFields);
            value = result?.otherNotes ?? value;
          }
          if (errors.otherNotes?.hasError) {
            runValidationTasks("otherNotes", value);
          }
          setOtherNotes(value);
        }}
        onBlur={() => runValidationTasks("otherNotes", otherNotes)}
        errorMessage={errors.otherNotes?.errorMessage}
        hasError={errors.otherNotes?.hasError}
        {...getOverrideProps(overrides, "otherNotes")}
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
          isDisabled={!(idProp || medicalRecordModelProp)}
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
              !(idProp || medicalRecordModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

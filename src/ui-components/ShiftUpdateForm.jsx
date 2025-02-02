/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { Shift } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function ShiftUpdateForm(props) {
  const {
    id: idProp,
    shift: shiftModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    staffID: "",
    staffID_date: "",
    date: "",
    startTime: "",
    endTime: "",
    photo: "",
    details: "",
    capacity: "",
    tentative: false,
  };
  const [staffID, setStaffID] = React.useState(initialValues.staffID);
  const [staffID_date, setStaffID_date] = React.useState(
    initialValues.staffID_date
  );
  const [date, setDate] = React.useState(initialValues.date);
  const [startTime, setStartTime] = React.useState(initialValues.startTime);
  const [endTime, setEndTime] = React.useState(initialValues.endTime);
  const [photo, setPhoto] = React.useState(initialValues.photo);
  const [details, setDetails] = React.useState(initialValues.details);
  const [capacity, setCapacity] = React.useState(initialValues.capacity);
  const [tentative, setTentative] = React.useState(initialValues.tentative);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = shiftRecord
      ? { ...initialValues, ...shiftRecord }
      : initialValues;
    setStaffID(cleanValues.staffID);
    setStaffID_date(cleanValues.staffID_date);
    setDate(cleanValues.date);
    setStartTime(cleanValues.startTime);
    setEndTime(cleanValues.endTime);
    setPhoto(cleanValues.photo);
    setDetails(cleanValues.details);
    setCapacity(cleanValues.capacity);
    setTentative(cleanValues.tentative);
    setErrors({});
  };
  const [shiftRecord, setShiftRecord] = React.useState(shiftModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Shift, idProp)
        : shiftModelProp;
      setShiftRecord(record);
    };
    queryData();
  }, [idProp, shiftModelProp]);
  React.useEffect(resetStateValues, [shiftRecord]);
  const validations = {
    staffID: [{ type: "Required" }],
    staffID_date: [],
    date: [],
    startTime: [],
    endTime: [],
    photo: [],
    details: [],
    capacity: [],
    tentative: [],
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
          staffID,
          staffID_date,
          date,
          startTime,
          endTime,
          photo,
          details,
          capacity,
          tentative,
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
            Shift.copyOf(shiftRecord, (updated) => {
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
      {...getOverrideProps(overrides, "ShiftUpdateForm")}
      {...rest}
    >
      <TextField
        label="Staff id"
        isRequired={true}
        isReadOnly={false}
        value={staffID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              staffID: value,
              staffID_date,
              date,
              startTime,
              endTime,
              photo,
              details,
              capacity,
              tentative,
            };
            const result = onChange(modelFields);
            value = result?.staffID ?? value;
          }
          if (errors.staffID?.hasError) {
            runValidationTasks("staffID", value);
          }
          setStaffID(value);
        }}
        onBlur={() => runValidationTasks("staffID", staffID)}
        errorMessage={errors.staffID?.errorMessage}
        hasError={errors.staffID?.hasError}
        {...getOverrideProps(overrides, "staffID")}
      ></TextField>
      <TextField
        label="Staff id date"
        isRequired={false}
        isReadOnly={false}
        value={staffID_date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date: value,
              date,
              startTime,
              endTime,
              photo,
              details,
              capacity,
              tentative,
            };
            const result = onChange(modelFields);
            value = result?.staffID_date ?? value;
          }
          if (errors.staffID_date?.hasError) {
            runValidationTasks("staffID_date", value);
          }
          setStaffID_date(value);
        }}
        onBlur={() => runValidationTasks("staffID_date", staffID_date)}
        errorMessage={errors.staffID_date?.errorMessage}
        hasError={errors.staffID_date?.hasError}
        {...getOverrideProps(overrides, "staffID_date")}
      ></TextField>
      <TextField
        label="Date"
        isRequired={false}
        isReadOnly={false}
        value={date}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date: value,
              startTime,
              endTime,
              photo,
              details,
              capacity,
              tentative,
            };
            const result = onChange(modelFields);
            value = result?.date ?? value;
          }
          if (errors.date?.hasError) {
            runValidationTasks("date", value);
          }
          setDate(value);
        }}
        onBlur={() => runValidationTasks("date", date)}
        errorMessage={errors.date?.errorMessage}
        hasError={errors.date?.hasError}
        {...getOverrideProps(overrides, "date")}
      ></TextField>
      <TextField
        label="Start time"
        isRequired={false}
        isReadOnly={false}
        value={startTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date,
              startTime: value,
              endTime,
              photo,
              details,
              capacity,
              tentative,
            };
            const result = onChange(modelFields);
            value = result?.startTime ?? value;
          }
          if (errors.startTime?.hasError) {
            runValidationTasks("startTime", value);
          }
          setStartTime(value);
        }}
        onBlur={() => runValidationTasks("startTime", startTime)}
        errorMessage={errors.startTime?.errorMessage}
        hasError={errors.startTime?.hasError}
        {...getOverrideProps(overrides, "startTime")}
      ></TextField>
      <TextField
        label="End time"
        isRequired={false}
        isReadOnly={false}
        value={endTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date,
              startTime,
              endTime: value,
              photo,
              details,
              capacity,
              tentative,
            };
            const result = onChange(modelFields);
            value = result?.endTime ?? value;
          }
          if (errors.endTime?.hasError) {
            runValidationTasks("endTime", value);
          }
          setEndTime(value);
        }}
        onBlur={() => runValidationTasks("endTime", endTime)}
        errorMessage={errors.endTime?.errorMessage}
        hasError={errors.endTime?.hasError}
        {...getOverrideProps(overrides, "endTime")}
      ></TextField>
      <TextField
        label="Photo"
        isRequired={false}
        isReadOnly={false}
        value={photo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date,
              startTime,
              endTime,
              photo: value,
              details,
              capacity,
              tentative,
            };
            const result = onChange(modelFields);
            value = result?.photo ?? value;
          }
          if (errors.photo?.hasError) {
            runValidationTasks("photo", value);
          }
          setPhoto(value);
        }}
        onBlur={() => runValidationTasks("photo", photo)}
        errorMessage={errors.photo?.errorMessage}
        hasError={errors.photo?.hasError}
        {...getOverrideProps(overrides, "photo")}
      ></TextField>
      <TextField
        label="Details"
        isRequired={false}
        isReadOnly={false}
        value={details}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date,
              startTime,
              endTime,
              photo,
              details: value,
              capacity,
              tentative,
            };
            const result = onChange(modelFields);
            value = result?.details ?? value;
          }
          if (errors.details?.hasError) {
            runValidationTasks("details", value);
          }
          setDetails(value);
        }}
        onBlur={() => runValidationTasks("details", details)}
        errorMessage={errors.details?.errorMessage}
        hasError={errors.details?.hasError}
        {...getOverrideProps(overrides, "details")}
      ></TextField>
      <TextField
        label="Capacity"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={capacity}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date,
              startTime,
              endTime,
              photo,
              details,
              capacity: value,
              tentative,
            };
            const result = onChange(modelFields);
            value = result?.capacity ?? value;
          }
          if (errors.capacity?.hasError) {
            runValidationTasks("capacity", value);
          }
          setCapacity(value);
        }}
        onBlur={() => runValidationTasks("capacity", capacity)}
        errorMessage={errors.capacity?.errorMessage}
        hasError={errors.capacity?.hasError}
        {...getOverrideProps(overrides, "capacity")}
      ></TextField>
      <SwitchField
        label="Tentative"
        defaultChecked={false}
        isDisabled={false}
        isChecked={tentative}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date,
              startTime,
              endTime,
              photo,
              details,
              capacity,
              tentative: value,
            };
            const result = onChange(modelFields);
            value = result?.tentative ?? value;
          }
          if (errors.tentative?.hasError) {
            runValidationTasks("tentative", value);
          }
          setTentative(value);
        }}
        onBlur={() => runValidationTasks("tentative", tentative)}
        errorMessage={errors.tentative?.errorMessage}
        hasError={errors.tentative?.hasError}
        {...getOverrideProps(overrides, "tentative")}
      ></SwitchField>
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
          isDisabled={!(idProp || shiftModelProp)}
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
              !(idProp || shiftModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

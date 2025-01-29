/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { Shift } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function ShiftCreateForm(props) {
  const {
    clearOnSuccess = true,
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
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setStaffID(initialValues.staffID);
    setStaffID_date(initialValues.staffID_date);
    setDate(initialValues.date);
    setStartTime(initialValues.startTime);
    setEndTime(initialValues.endTime);
    setPhoto(initialValues.photo);
    setDetails(initialValues.details);
    setCapacity(initialValues.capacity);
    setErrors({});
  };
  const validations = {
    staffID: [{ type: "Required" }],
    staffID_date: [],
    date: [],
    startTime: [],
    endTime: [],
    photo: [],
    details: [],
    capacity: [],
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
          await DataStore.save(new Shift(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ShiftCreateForm")}
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
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

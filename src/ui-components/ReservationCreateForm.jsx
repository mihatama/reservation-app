/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { Reservation } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify/datastore";
export default function ReservationCreateForm(props) {
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
    clientName: "",
    email: "",
    phone: "",
    owner: "",
    status: "",
  };
  const [staffID, setStaffID] = React.useState(initialValues.staffID);
  const [staffID_date, setStaffID_date] = React.useState(
    initialValues.staffID_date
  );
  const [date, setDate] = React.useState(initialValues.date);
  const [startTime, setStartTime] = React.useState(initialValues.startTime);
  const [endTime, setEndTime] = React.useState(initialValues.endTime);
  const [clientName, setClientName] = React.useState(initialValues.clientName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [status, setStatus] = React.useState(initialValues.status);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setStaffID(initialValues.staffID);
    setStaffID_date(initialValues.staffID_date);
    setDate(initialValues.date);
    setStartTime(initialValues.startTime);
    setEndTime(initialValues.endTime);
    setClientName(initialValues.clientName);
    setEmail(initialValues.email);
    setPhone(initialValues.phone);
    setOwner(initialValues.owner);
    setStatus(initialValues.status);
    setErrors({});
  };
  const validations = {
    staffID: [{ type: "Required" }],
    staffID_date: [{ type: "Required" }],
    date: [{ type: "Required" }],
    startTime: [{ type: "Required" }],
    endTime: [{ type: "Required" }],
    clientName: [],
    email: [],
    phone: [],
    owner: [],
    status: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          clientName,
          email,
          phone,
          owner,
          status,
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
          await DataStore.save(new Reservation(modelFields));
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
      {...getOverrideProps(overrides, "ReservationCreateForm")}
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
              clientName,
              email,
              phone,
              owner,
              status,
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
        isRequired={true}
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
              clientName,
              email,
              phone,
              owner,
              status,
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
        isRequired={true}
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
              clientName,
              email,
              phone,
              owner,
              status,
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
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={startTime && convertToLocal(new Date(startTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date,
              startTime: value,
              endTime,
              clientName,
              email,
              phone,
              owner,
              status,
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
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={endTime && convertToLocal(new Date(endTime))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date,
              startTime,
              endTime: value,
              clientName,
              email,
              phone,
              owner,
              status,
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
        label="Client name"
        isRequired={false}
        isReadOnly={false}
        value={clientName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date,
              startTime,
              endTime,
              clientName: value,
              email,
              phone,
              owner,
              status,
            };
            const result = onChange(modelFields);
            value = result?.clientName ?? value;
          }
          if (errors.clientName?.hasError) {
            runValidationTasks("clientName", value);
          }
          setClientName(value);
        }}
        onBlur={() => runValidationTasks("clientName", clientName)}
        errorMessage={errors.clientName?.errorMessage}
        hasError={errors.clientName?.hasError}
        {...getOverrideProps(overrides, "clientName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date,
              startTime,
              endTime,
              clientName,
              email: value,
              phone,
              owner,
              status,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date,
              startTime,
              endTime,
              clientName,
              email,
              phone: value,
              owner,
              status,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date,
              startTime,
              endTime,
              clientName,
              email,
              phone,
              owner: value,
              status,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              staffID,
              staffID_date,
              date,
              startTime,
              endTime,
              clientName,
              email,
              phone,
              owner,
              status: value,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
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

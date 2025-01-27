/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getReservation } from "../graphql/queries";
import { updateReservation } from "../graphql/mutations";
const client = generateClient();
export default function ReservationUpdateForm(props) {
  const {
    id: idProp,
    reservation: reservationModelProp,
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
    owner: "",
  };
  const [staffID, setStaffID] = React.useState(initialValues.staffID);
  const [staffID_date, setStaffID_date] = React.useState(
    initialValues.staffID_date
  );
  const [date, setDate] = React.useState(initialValues.date);
  const [startTime, setStartTime] = React.useState(initialValues.startTime);
  const [endTime, setEndTime] = React.useState(initialValues.endTime);
  const [clientName, setClientName] = React.useState(initialValues.clientName);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = reservationRecord
      ? { ...initialValues, ...reservationRecord }
      : initialValues;
    setStaffID(cleanValues.staffID);
    setStaffID_date(cleanValues.staffID_date);
    setDate(cleanValues.date);
    setStartTime(cleanValues.startTime);
    setEndTime(cleanValues.endTime);
    setClientName(cleanValues.clientName);
    setOwner(cleanValues.owner);
    setErrors({});
  };
  const [reservationRecord, setReservationRecord] =
    React.useState(reservationModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getReservation.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getReservation
        : reservationModelProp;
      setReservationRecord(record);
    };
    queryData();
  }, [idProp, reservationModelProp]);
  React.useEffect(resetStateValues, [reservationRecord]);
  const validations = {
    staffID: [{ type: "Required" }],
    staffID_date: [{ type: "Required" }],
    date: [{ type: "Required" }],
    startTime: [{ type: "Required" }],
    endTime: [{ type: "Required" }],
    clientName: [],
    owner: [],
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
          clientName: clientName ?? null,
          owner: owner ?? null,
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
          await client.graphql({
            query: updateReservation.replaceAll("__typename", ""),
            variables: {
              input: {
                id: reservationRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ReservationUpdateForm")}
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
              owner,
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
              owner,
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
              owner,
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
              owner,
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
              owner,
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
              owner,
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
              owner: value,
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
          isDisabled={!(idProp || reservationModelProp)}
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
              !(idProp || reservationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}

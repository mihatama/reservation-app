/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ReservationCreateFormInputValues = {
    staffID?: string;
    staffID_date?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    clientName?: string;
    email?: string;
    phone?: string;
    owner?: string;
    status?: string;
};
export declare type ReservationCreateFormValidationValues = {
    staffID?: ValidationFunction<string>;
    staffID_date?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    startTime?: ValidationFunction<string>;
    endTime?: ValidationFunction<string>;
    clientName?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ReservationCreateFormOverridesProps = {
    ReservationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    staffID?: PrimitiveOverrideProps<TextFieldProps>;
    staffID_date?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    startTime?: PrimitiveOverrideProps<TextFieldProps>;
    endTime?: PrimitiveOverrideProps<TextFieldProps>;
    clientName?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ReservationCreateFormProps = React.PropsWithChildren<{
    overrides?: ReservationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ReservationCreateFormInputValues) => ReservationCreateFormInputValues;
    onSuccess?: (fields: ReservationCreateFormInputValues) => void;
    onError?: (fields: ReservationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ReservationCreateFormInputValues) => ReservationCreateFormInputValues;
    onValidate?: ReservationCreateFormValidationValues;
} & React.CSSProperties>;
export default function ReservationCreateForm(props: ReservationCreateFormProps): React.ReactElement;

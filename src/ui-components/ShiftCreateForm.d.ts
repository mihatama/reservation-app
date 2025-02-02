/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ShiftCreateFormInputValues = {
    staffID?: string;
    staffID_date?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    photo?: string;
    details?: string;
    capacity?: number;
    tentative?: boolean;
};
export declare type ShiftCreateFormValidationValues = {
    staffID?: ValidationFunction<string>;
    staffID_date?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    startTime?: ValidationFunction<string>;
    endTime?: ValidationFunction<string>;
    photo?: ValidationFunction<string>;
    details?: ValidationFunction<string>;
    capacity?: ValidationFunction<number>;
    tentative?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ShiftCreateFormOverridesProps = {
    ShiftCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    staffID?: PrimitiveOverrideProps<TextFieldProps>;
    staffID_date?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    startTime?: PrimitiveOverrideProps<TextFieldProps>;
    endTime?: PrimitiveOverrideProps<TextFieldProps>;
    photo?: PrimitiveOverrideProps<TextFieldProps>;
    details?: PrimitiveOverrideProps<TextFieldProps>;
    capacity?: PrimitiveOverrideProps<TextFieldProps>;
    tentative?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type ShiftCreateFormProps = React.PropsWithChildren<{
    overrides?: ShiftCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ShiftCreateFormInputValues) => ShiftCreateFormInputValues;
    onSuccess?: (fields: ShiftCreateFormInputValues) => void;
    onError?: (fields: ShiftCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ShiftCreateFormInputValues) => ShiftCreateFormInputValues;
    onValidate?: ShiftCreateFormValidationValues;
} & React.CSSProperties>;
export default function ShiftCreateForm(props: ShiftCreateFormProps): React.ReactElement;

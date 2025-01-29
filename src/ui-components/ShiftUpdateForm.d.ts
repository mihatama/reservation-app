/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Shift } from "../models";
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
export declare type ShiftUpdateFormInputValues = {
    staffID?: string;
    staffID_date?: string;
    date?: string;
    startTime?: string;
    endTime?: string;
    photo?: string;
    details?: string;
    capacity?: number;
};
export declare type ShiftUpdateFormValidationValues = {
    staffID?: ValidationFunction<string>;
    staffID_date?: ValidationFunction<string>;
    date?: ValidationFunction<string>;
    startTime?: ValidationFunction<string>;
    endTime?: ValidationFunction<string>;
    photo?: ValidationFunction<string>;
    details?: ValidationFunction<string>;
    capacity?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ShiftUpdateFormOverridesProps = {
    ShiftUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    staffID?: PrimitiveOverrideProps<TextFieldProps>;
    staffID_date?: PrimitiveOverrideProps<TextFieldProps>;
    date?: PrimitiveOverrideProps<TextFieldProps>;
    startTime?: PrimitiveOverrideProps<TextFieldProps>;
    endTime?: PrimitiveOverrideProps<TextFieldProps>;
    photo?: PrimitiveOverrideProps<TextFieldProps>;
    details?: PrimitiveOverrideProps<TextFieldProps>;
    capacity?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ShiftUpdateFormProps = React.PropsWithChildren<{
    overrides?: ShiftUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    shift?: Shift;
    onSubmit?: (fields: ShiftUpdateFormInputValues) => ShiftUpdateFormInputValues;
    onSuccess?: (fields: ShiftUpdateFormInputValues) => void;
    onError?: (fields: ShiftUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ShiftUpdateFormInputValues) => ShiftUpdateFormInputValues;
    onValidate?: ShiftUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ShiftUpdateForm(props: ShiftUpdateFormProps): React.ReactElement;

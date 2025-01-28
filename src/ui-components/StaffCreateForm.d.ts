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
export declare type StaffCreateFormInputValues = {
    name?: string;
    photo?: string;
    hidden?: boolean;
    description?: string;
};
export declare type StaffCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    photo?: ValidationFunction<string>;
    hidden?: ValidationFunction<boolean>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StaffCreateFormOverridesProps = {
    StaffCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    photo?: PrimitiveOverrideProps<TextFieldProps>;
    hidden?: PrimitiveOverrideProps<SwitchFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StaffCreateFormProps = React.PropsWithChildren<{
    overrides?: StaffCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: StaffCreateFormInputValues) => StaffCreateFormInputValues;
    onSuccess?: (fields: StaffCreateFormInputValues) => void;
    onError?: (fields: StaffCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StaffCreateFormInputValues) => StaffCreateFormInputValues;
    onValidate?: StaffCreateFormValidationValues;
} & React.CSSProperties>;
export default function StaffCreateForm(props: StaffCreateFormProps): React.ReactElement;

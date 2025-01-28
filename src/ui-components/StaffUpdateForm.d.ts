/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Staff } from "../models";
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
export declare type StaffUpdateFormInputValues = {
    name?: string;
    photo?: string;
    hidden?: boolean;
    description?: string;
};
export declare type StaffUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    photo?: ValidationFunction<string>;
    hidden?: ValidationFunction<boolean>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StaffUpdateFormOverridesProps = {
    StaffUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    photo?: PrimitiveOverrideProps<TextFieldProps>;
    hidden?: PrimitiveOverrideProps<SwitchFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StaffUpdateFormProps = React.PropsWithChildren<{
    overrides?: StaffUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    staff?: Staff;
    onSubmit?: (fields: StaffUpdateFormInputValues) => StaffUpdateFormInputValues;
    onSuccess?: (fields: StaffUpdateFormInputValues) => void;
    onError?: (fields: StaffUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StaffUpdateFormInputValues) => StaffUpdateFormInputValues;
    onValidate?: StaffUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StaffUpdateForm(props: StaffUpdateFormProps): React.ReactElement;

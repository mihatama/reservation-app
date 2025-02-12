/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { MedicalRecord } from "../models";
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
export declare type MedicalRecordUpdateFormInputValues = {
    recordNo?: string;
    recordMonth?: string;
    recordDay?: string;
    place?: string;
    staffName?: string;
    traineeName?: string;
    childName?: string;
    childAgeYears?: string;
    childAgeMonths?: string;
    childAgeDays?: string;
    weight?: string;
    weightGain?: string;
    breastInterval?: string;
    formula?: string;
    expressedMilk?: string;
    babyFood?: string;
    stoolCount?: string;
    urineCount?: string;
    childDevelopment?: string;
    weaningStatus?: string;
    dayCount?: string;
    breastShape?: string;
    nippleUsage?: string;
    expressionTimes?: string;
    expressionTool?: string;
    nippleCondition?: string;
    pain?: string;
    breastfeedingPosition?: string;
    familySupport?: string;
    oMemo?: string;
    sMemo?: string;
    pMemo?: string;
    breastDiagnosis?: string;
    paymentMethod?: string;
    additionalFees?: string;
    otherNotes?: string;
};
export declare type MedicalRecordUpdateFormValidationValues = {
    recordNo?: ValidationFunction<string>;
    recordMonth?: ValidationFunction<string>;
    recordDay?: ValidationFunction<string>;
    place?: ValidationFunction<string>;
    staffName?: ValidationFunction<string>;
    traineeName?: ValidationFunction<string>;
    childName?: ValidationFunction<string>;
    childAgeYears?: ValidationFunction<string>;
    childAgeMonths?: ValidationFunction<string>;
    childAgeDays?: ValidationFunction<string>;
    weight?: ValidationFunction<string>;
    weightGain?: ValidationFunction<string>;
    breastInterval?: ValidationFunction<string>;
    formula?: ValidationFunction<string>;
    expressedMilk?: ValidationFunction<string>;
    babyFood?: ValidationFunction<string>;
    stoolCount?: ValidationFunction<string>;
    urineCount?: ValidationFunction<string>;
    childDevelopment?: ValidationFunction<string>;
    weaningStatus?: ValidationFunction<string>;
    dayCount?: ValidationFunction<string>;
    breastShape?: ValidationFunction<string>;
    nippleUsage?: ValidationFunction<string>;
    expressionTimes?: ValidationFunction<string>;
    expressionTool?: ValidationFunction<string>;
    nippleCondition?: ValidationFunction<string>;
    pain?: ValidationFunction<string>;
    breastfeedingPosition?: ValidationFunction<string>;
    familySupport?: ValidationFunction<string>;
    oMemo?: ValidationFunction<string>;
    sMemo?: ValidationFunction<string>;
    pMemo?: ValidationFunction<string>;
    breastDiagnosis?: ValidationFunction<string>;
    paymentMethod?: ValidationFunction<string>;
    additionalFees?: ValidationFunction<string>;
    otherNotes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MedicalRecordUpdateFormOverridesProps = {
    MedicalRecordUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    recordNo?: PrimitiveOverrideProps<TextFieldProps>;
    recordMonth?: PrimitiveOverrideProps<TextFieldProps>;
    recordDay?: PrimitiveOverrideProps<TextFieldProps>;
    place?: PrimitiveOverrideProps<TextFieldProps>;
    staffName?: PrimitiveOverrideProps<TextFieldProps>;
    traineeName?: PrimitiveOverrideProps<TextFieldProps>;
    childName?: PrimitiveOverrideProps<TextFieldProps>;
    childAgeYears?: PrimitiveOverrideProps<TextFieldProps>;
    childAgeMonths?: PrimitiveOverrideProps<TextFieldProps>;
    childAgeDays?: PrimitiveOverrideProps<TextFieldProps>;
    weight?: PrimitiveOverrideProps<TextFieldProps>;
    weightGain?: PrimitiveOverrideProps<TextFieldProps>;
    breastInterval?: PrimitiveOverrideProps<TextFieldProps>;
    formula?: PrimitiveOverrideProps<TextFieldProps>;
    expressedMilk?: PrimitiveOverrideProps<TextFieldProps>;
    babyFood?: PrimitiveOverrideProps<TextFieldProps>;
    stoolCount?: PrimitiveOverrideProps<TextFieldProps>;
    urineCount?: PrimitiveOverrideProps<TextFieldProps>;
    childDevelopment?: PrimitiveOverrideProps<TextFieldProps>;
    weaningStatus?: PrimitiveOverrideProps<TextFieldProps>;
    dayCount?: PrimitiveOverrideProps<TextFieldProps>;
    breastShape?: PrimitiveOverrideProps<TextFieldProps>;
    nippleUsage?: PrimitiveOverrideProps<TextFieldProps>;
    expressionTimes?: PrimitiveOverrideProps<TextFieldProps>;
    expressionTool?: PrimitiveOverrideProps<TextFieldProps>;
    nippleCondition?: PrimitiveOverrideProps<TextFieldProps>;
    pain?: PrimitiveOverrideProps<TextFieldProps>;
    breastfeedingPosition?: PrimitiveOverrideProps<TextFieldProps>;
    familySupport?: PrimitiveOverrideProps<TextFieldProps>;
    oMemo?: PrimitiveOverrideProps<TextFieldProps>;
    sMemo?: PrimitiveOverrideProps<TextFieldProps>;
    pMemo?: PrimitiveOverrideProps<TextFieldProps>;
    breastDiagnosis?: PrimitiveOverrideProps<TextFieldProps>;
    paymentMethod?: PrimitiveOverrideProps<TextFieldProps>;
    additionalFees?: PrimitiveOverrideProps<TextFieldProps>;
    otherNotes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MedicalRecordUpdateFormProps = React.PropsWithChildren<{
    overrides?: MedicalRecordUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    medicalRecord?: MedicalRecord;
    onSubmit?: (fields: MedicalRecordUpdateFormInputValues) => MedicalRecordUpdateFormInputValues;
    onSuccess?: (fields: MedicalRecordUpdateFormInputValues) => void;
    onError?: (fields: MedicalRecordUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MedicalRecordUpdateFormInputValues) => MedicalRecordUpdateFormInputValues;
    onValidate?: MedicalRecordUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MedicalRecordUpdateForm(props: MedicalRecordUpdateFormProps): React.ReactElement;

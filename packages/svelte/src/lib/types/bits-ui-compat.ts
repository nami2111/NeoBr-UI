/**
 * Type compatibility layer for bits-ui components with Svelte 5
 *
 * This module provides type-safe wrappers around bits-ui types that are
 * compatible with Svelte 5's prop inference system.
 */

import type { AccordionRootProps, DatePickerRootProps, SelectRootProps } from "bits-ui";
import type { DateValue } from "@internationalized/date";

/**
 * Compatible Accordion props for Svelte 5
 * Handles both single and multiple selection modes with proper type inference
 */
export type CompatibleAccordionProps<T extends "single" | "multiple"> = Omit<
    AccordionRootProps,
    "value" | "type"
> & {
    value?: T extends "single" ? string : string[];
    type?: T;
};

/**
 * Compatible Select props for Svelte 5
 * Handles both single and multiple selection modes with proper type inference
 */
export type CompatibleSelectProps<T extends "single" | "multiple"> = Omit<
    SelectRootProps,
    "value" | "type"
> & {
    value?: T extends "single" ? string : string[];
    type?: T;
};

/**
 * Helper type to extract the selection type from props
 */
export type SelectionType<T> = T extends { type: infer U } ? U : "single";

/**
 * Helper type to infer value type from selection type
 */
export type ValueType<T extends "single" | "multiple"> = T extends "single" ? string : string[];

/**
 * Simplified DateValue type for components
 * Resolves the complex union type that causes TypeScript issues
 */
export type SimpleDateValue = DateValue;

/**
 * Compatible DatePicker props for Svelte 5
 * Uses SimpleDateValue to avoid complex union type issues
 */
export type CompatibleDatePickerProps = {
    value?: SimpleDateValue | undefined;
} & Omit<DatePickerRootProps, "value">;

/**
 * Compatible Calendar props for Svelte 5
 * Handles both single and multiple selection modes with proper type inference
 */
export type CompatibleCalendarProps<T extends "single" | "multiple"> = {
    value?: T extends "single" ? SimpleDateValue | undefined : SimpleDateValue[] | undefined;
    type?: T;
    placeholder?: SimpleDateValue | undefined;
    fixedWeeks?: boolean;
    class?: string;
};

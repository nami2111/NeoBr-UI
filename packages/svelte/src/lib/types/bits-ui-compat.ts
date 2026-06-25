/**
 * Type compatibility layer for bits-ui components with Svelte 5
 *
 * This module provides type-safe wrappers around bits-ui types that are
 * compatible with Svelte 5's prop inference system.
 */

import type { AccordionRootProps, DatePickerRootProps, SelectRootProps } from "bits-ui";
import type { DateValue } from "@internationalized/date";

type SingleValueProps<Base, Value> = Omit<Base, "value" | "type"> & {
    value?: Value;
    type?: "single";
};

type MultipleValueProps<Base, Value> = Omit<Base, "value" | "type"> & {
    value?: Value[];
    type: "multiple";
};

export type CompatibleAccordionProps =
    | SingleValueProps<AccordionRootProps, string>
    | MultipleValueProps<AccordionRootProps, string>;

export type CompatibleSelectProps =
    | SingleValueProps<SelectRootProps, string>
    | MultipleValueProps<SelectRootProps, string>;

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

type CalendarBaseProps = {
    placeholder?: SimpleDateValue | undefined;
    fixedWeeks?: boolean;
    class?: string;
};

export type CompatibleCalendarProps =
    | (CalendarBaseProps & {
          value?: SimpleDateValue | undefined;
          type?: "single";
      })
    | (CalendarBaseProps & {
          value?: SimpleDateValue[] | undefined;
          type: "multiple";
      });

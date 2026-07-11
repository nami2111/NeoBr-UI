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
 * Compatible DatePicker props for Svelte 5.
 */
export type CompatibleDatePickerProps = {
    value?: DateValue | undefined;
} & Omit<DatePickerRootProps, "value">;

type CalendarBaseProps = {
    placeholder?: DateValue | undefined;
    fixedWeeks?: boolean;
    class?: string;
};

export type CompatibleCalendarProps =
    | (CalendarBaseProps & {
          value?: DateValue | undefined;
          type?: "single";
      })
    | (CalendarBaseProps & {
          value?: DateValue[] | undefined;
          type: "multiple";
      });

"use client"

import * as React from "react"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"
import type { Matcher } from "react-day-picker"

import { cn } from "../../lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  captionLayout = "label",
  formatters,
  components,
  hidden: externalHidden,
  hiddenDates,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  hiddenDates?: Matcher | Matcher[]
}) {
  const defaultClassNames = getDefaultClassNames()
  const combinedHidden = React.useMemo<Matcher[] | undefined>(() => {
    const items: Matcher[] = []
    if (externalHidden) {
      if (Array.isArray(externalHidden)) items.push(...(externalHidden as Matcher[]))
      else items.push(externalHidden as Matcher)
    }
    if (hiddenDates) {
      if (Array.isArray(hiddenDates)) items.push(...(hiddenDates as Matcher[]))
      else items.push(hiddenDates as Matcher)
    }
    return items.length ? items : undefined
  }, [externalHidden, hiddenDates])

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        " group/calendar p-3 [--cell-size:--spacing(8)]",
        String.raw`rtl:**:[.rdp-button\_next  >svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      hidden={combinedHidden}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months
        ),
        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: "brandGhost" }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: "brandGhost" }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)  ",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5 ",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "relative border border-input rounded-md ",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn(
          "absolute  inset-0 opacity-0 ",
          defaultClassNames.dropdown
        ),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-foreground-secondary [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-foreground-secondary rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday
        ),
        week: cn("flex w-full mt-2", defaultClassNames.week),
        week_number_header: cn(
          "select-none w-(--cell-size)",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-[0.8rem] select-none text-foreground-secondary",
          defaultClassNames.week_number
        ),
        day: cn(
          "relative w-full h-full p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md group/day aspect-square select-none",
          defaultClassNames.day
        ),
        range_start: cn(
          "rounded-l-md bg-brand/60",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("rounded-r-md bg-brand/60", defaultClassNames.range_end),
        today: cn(
          "bg-brand/20 text-accent-foreground rounded-md data-[selected=true]:bg-transparent",
          defaultClassNames.today
        ),
        outside: cn(
          "text-foreground-secondary aria-selected:text-foreground-secondary opacity-0 cursor-not-allowed",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-foreground-secondary opacity-75",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <IconChevronLeft className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <IconChevronRight
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <IconChevronDown className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-(--cell-size) items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const isEdge = Boolean(modifiers.range_start) || Boolean(modifiers.range_end)
  const isMiddle = Boolean(modifiers.range_middle)
  const isSelectedSingle = Boolean(modifiers.selected) && !isEdge && !isMiddle

  return (
    <Button
      ref={ref}
      type="button"
      size="icon"
      variant={isSelectedSingle || isEdge ? "brandAccent" : isMiddle ? "brandGhost" : "brandGhost"}
      disabled={Boolean(modifiers.disabled)}
      data-day={day.date.toLocaleDateString()}
      className={cn(
        "aspect-square size-auto w-full min-w-(--cell-size) leading-none font-normal",
        // Range edge rounding
        isMiddle ? "rounded-none" : isEdge ? (modifiers.range_start ? "rounded-l-md border-r-0" : "rounded-r-md border-l-0") : "rounded-md",
        // Subtle weekday text scaling (if any spans inside)
        "[&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }

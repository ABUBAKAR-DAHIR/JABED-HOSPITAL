"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

function formatDate(date: Date | undefined) {
  if (!date) return ""
  return date.toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" })
}

function isValidDate(date: Date | undefined) {
  return date instanceof Date && !isNaN(date.getTime())
}

// ✅ Updated to accept RHF props
interface DatePickerProps {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  name?: string
  className?: string
  label?: string
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ value: controlledValue, onChange, onBlur, label, className }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(controlledValue ? new Date(controlledValue) : undefined)
    const [month, setMonth] = React.useState<Date | undefined>(date)
    const [value, setValue] = React.useState(controlledValue || formatDate(date))

    // Sync controlled value from RHF
    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setValue(controlledValue)
        const newDate = new Date(controlledValue)
        if (isValidDate(newDate)) setDate(newDate)
      }
    }, [controlledValue])

    const handleSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate)
      const formatted = formatDate(selectedDate)
      setValue(formatted)
      onChange?.(formatted)
      setOpen(false)
    }

    return (
      <div className="flex flex-col gap-3 justify-center">
        {label && <Label htmlFor="date" className="px-1 mb-1">{label}</Label>}
        <div className="relative flex gap-2">
          <Input
            ref={ref}
            id="date"
            value={value}
            placeholder="June 01, 2025"
            className={`bg-background pr-10 ${className}`}
            onChange={(e) => {
              const newDate = new Date(e.target.value)
              setValue(e.target.value)
              if (isValidDate(newDate)) {
                setDate(newDate)
                setMonth(newDate)
                onChange?.(e.target.value)
              }
            }}
            onBlur={onBlur}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault()
                setOpen(true)
              }
            }}
          />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button id="date-picker" variant="ghost" className="absolute top-1/2 right-2 size-6 -translate-y-1/2">
                <CalendarIcon className="size-3.5" />
                <span className="sr-only">Select date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="end" alignOffset={-8} sideOffset={10}>
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                month={month}
                onMonthChange={setMonth}
                onSelect={handleSelect}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    )
  }
)

DatePicker.displayName = "DatePicker"

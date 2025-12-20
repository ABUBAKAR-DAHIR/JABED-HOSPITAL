import * as React from "react"

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement>

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`
          border p-2 md:p-3 rounded-lg w-full
          bg-transparent
          focus:outline-none focus:ring-2 focus:ring-cyan-300
          dark:focus:ring-cyan-700
          ${className ?? ""}
        `}
      />
    )
  }
)

CustomInput.displayName = "CustomInput"

export default CustomInput

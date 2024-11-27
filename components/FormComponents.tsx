import React from "react"

interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  value: string
  placeholder?: string
  type?: string
  name?: string
}

export function Input({
  onChange,
  label,
  type,
  value,
  placeholder,
  name,
}: InputProps) {
  const id = React.useId()

  return (
    <div className="flex flex-col gap-1 items-start w-full flex-1">
      <label htmlFor={id}>{label}</label>
      <input
        className="border border-gray-500 bg-slate-800 px-2 py-1 rounded w-full"
        id={id}
        placeholder={placeholder}
        type={type || "text"}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  )
}

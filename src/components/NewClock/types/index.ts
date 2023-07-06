import { Nullable } from "@/types"

export type NewClockType = {
  timeZone: number
  name: string
  isSmall?: boolean
}
export type ClockRef = {
  current: Nullable<HTMLDivElement>;
}
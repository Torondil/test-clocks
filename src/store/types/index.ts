import { reducer } from "@/store/reducer";

export type initialStateType = {
  timeOffset: number,
  previousTimeOffset: number,
  nextTimeOffset: number,
}

export type AppStateType = ReturnType<typeof reducer>;

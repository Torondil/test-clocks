import { actionTypes } from "../actionTypes"

export const setNewDateAction = (timeOffset:number) => ({type: actionTypes.SET_NEW_DATE, timeOffset} as const)
export const increaseHourAction = (timeOffset:number) => ({type: actionTypes.INCREASE_HOUR, timeOffset} as const)
export const decreaseHourAction = (timeOffset:number) => ({type: actionTypes.DECREASE_HOUR, timeOffset} as const)

export type ActionCreatorTypes = ReturnType<typeof setNewDateAction> | ReturnType<typeof increaseHourAction> | ReturnType<typeof decreaseHourAction>

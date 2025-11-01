import axios, {AxiosError} from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"


export function createFetchThunk<T>(typePrefix: string) {
    return createAsyncThunk<{ data: T[]; totalCount: number }, string, { rejectValue: string }>(typePrefix, async (url, { rejectWithValue }) => {
        try {
            const response = await axios.get<{ data: T[]; totalCount: number }>(url)

            if (response.status !== 200) {
                throw new Error('Failed to fetch data with status: ' + response.statusText)
            }
            return { data: response.data.data, totalCount: response.data.totalCount }
        } catch (error) {
            const axiosError = error as AxiosError
            console.error('Error fetching data:', axiosError.message)
            return rejectWithValue(axiosError.message || 'Failed to fetch data')
        }
    })
}
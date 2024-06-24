import axios from 'axios';
import { AxiosInstance } from 'axios';
import { TableRow } from '../types/types';

const API_BASE_URL = 'https://api.baserow.io/api';
const XT20_API_TOKEN = 'saEQbzNccWX6yJgotuvOS9JETJdaYKVX';
const XT21_API_TOKEN = 'chVcwctHRhApBDhCDHrLQSjjx17sptwV';

function createApiClient(token: string) {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Token ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

async function fetchAllData(url: string, apiClient: AxiosInstance): Promise<any[]> {
  let allData: any[] = [];
  let nextUrl: string | null = url;

  while (nextUrl) {
    const response = await apiClient.get(nextUrl) as any;
    const apiData = response.data;
    const processedData = processApiResponse(apiData);

    allData = allData.concat(processedData);
    nextUrl = apiData.next;
  }

  return allData;
}

function processApiResponse(apiResponse: any): any[] {
  if (apiResponse.results && Array.isArray(apiResponse.results)) {
    return apiResponse.results.filter((row: any) => !row.hideRow);
  } else {
    console.log("No 'results' array found in the response");
    return [];
  }
}

export async function getRows(tableId: number, vehicle: string): Promise<TableRow[]> {
  const token = vehicle === '20xt' ? XT20_API_TOKEN : XT21_API_TOKEN;
  const apiClient = createApiClient(token);
  const url = `/database/rows/table/${tableId}/?user_field_names=true&size=200`;
  const data = await fetchAllData(url, apiClient);
  return data as TableRow[];
}

export async function getRow(tableId: number, rowId: number, vehicle: string): Promise<TableRow> {
  const token = vehicle === '20xt' ? XT20_API_TOKEN : XT21_API_TOKEN;
  const apiClient = createApiClient(token);
  const url = `/database/rows/table/${tableId}/${rowId}/?user_field_names=true`;
  const response = await apiClient.get(url);
  return response.data as TableRow;
}

export async function createRow(tableId: number, data: TableRow, vehicle: string): Promise<TableRow> {
  const token = vehicle === '20xt' ? XT20_API_TOKEN : XT21_API_TOKEN;
  const apiClient = createApiClient(token);
  const url = `/database/rows/table/${tableId}/?user_field_names=true`;
  console.log(data)
  const response = await apiClient.post(url, data);
  return response.data as TableRow;
}

export async function updateRow(tableId: number, rowId: number, data: Partial<TableRow>, vehicle: string): Promise<TableRow> {
  const token = vehicle === '20xt' ? XT20_API_TOKEN : XT21_API_TOKEN;
  const apiClient = createApiClient(token);
  const url = `/database/rows/table/${tableId}/${rowId}/?user_field_names=true`;
  const response = await apiClient.patch(url, data);
  return response.data as TableRow;
}

export async function deleteRow(tableId: number, rowId: number, vehicle: string): Promise<void> {
  const token = vehicle === '20xt' ? XT20_API_TOKEN : XT21_API_TOKEN;
  const apiClient = createApiClient(token);
  const url = `/database/rows/table/${tableId}/${rowId}/?user_field_names=true`;
  const response = await apiClient.patch(url, { hideRow: true });
  if (response.status !== 200) {
    throw new Error('Failed to delete row');
  }
}

export async function moveRow(tableId: number, rowId: number, beforeRowId: number | undefined, vehicle: string): Promise<TableRow> {
  const token = vehicle === '20xt' ? XT20_API_TOKEN : XT21_API_TOKEN;
  const apiClient = createApiClient(token);
  const url = `/database/rows/table/${tableId}/${rowId}/move/?user_field_names=true&before_id=${beforeRowId}`;
  const response = await apiClient.patch(url);
  return response.data as TableRow;
}
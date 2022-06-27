import { ErrorResponse, requestAxios } from "./requestApi";

const JOB_BASE_URL = '/jobs';

export async function createJob(params) {
  const response = await requestAxios("POST", `${JOB_BASE_URL}`, params );
  return response;
}

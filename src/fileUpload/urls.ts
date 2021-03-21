import { stringify as stringifyQs } from "qs";

import {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  Pagination,
  Sort
} from "../types";

export const fileUploadSection = "/fileUpload/";

export const fileUploadListPath = fileUploadSection;
export const fileUploadUrl = fileUploadSection;

export enum FileUploadListUrlFiltersEnum {
  joinedFrom = "joinedFrom",
  joinedTo = "joinedTo",
  numberOfOrdersFrom = "numberOfOrdersFrom",
  numberOfOrdersTo = "numberOfOrdersTo",
  query = "query"
}
export type FileUploadListUrlFilters = Filters<FileUploadListUrlFiltersEnum>;

export type FileUploadListUrlQueryParams = ActiveTab &
  BulkAction &
  FileUploadListUrlFilters &
  FileUploadListUrlSort &
  Dialog<any> &
  Pagination;

export const fileUploadlistUrl = (params?: FileUploadListUrlQueryParams) =>
  fileUploadListPath + "?" + stringifyQs(params);

export enum FileUploadListUrlSortField {
  name = "name",
  type = "type"
}

export type FileUploadListUrlSort = Sort<FileUploadListUrlSortField>;

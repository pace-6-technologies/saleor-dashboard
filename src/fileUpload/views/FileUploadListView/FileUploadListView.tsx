/* eslint-disable @typescript-eslint/no-empty-function */
import useBulkActions from "@saleor/hooks/useBulkActions";
import useListSettings from "@saleor/hooks/useListSettings";
import useNavigator from "@saleor/hooks/useNavigator";
import useNotifier from "@saleor/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@saleor/hooks/usePaginator";
import { maybe } from "@saleor/misc";
import { ListViews } from "@saleor/types";
import createSortHandler from "@saleor/utils/handlers/sortHandler";
import { getSortParams } from "@saleor/utils/sort";
import React from "react";

import FileUploadListPage from "../../components/FileUploadListPage";
import { useGetFileListQuery } from "../../queries";
import { fileUploadlistUrl, FileUploadListUrlQueryParams } from "../../urls";

interface FileUploadListProps {
  params: FileUploadListUrlQueryParams;
}

export const FileUploadList: React.FC<FileUploadListProps> = ({ params }) => {
  const navigate = useNavigator();
  const paginate = usePaginator();
  const notify = useNotifier();

  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const { updateListSettings, settings } = useListSettings(
    ListViews.CUSTOMER_LIST
  );

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState
    }),
    [params]
  );

  const { data, loading, refetch } = useGetFileListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const currentTab =
    params.activeTab === undefined
      ? parseInt(params.activeTab, 1)
      : parseInt(params.activeTab, 0);

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      fileUploadlistUrl({
        activeTab: tab.toString()
      })
    );
  };

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.customers.pageInfo),
    paginationState,
    params
  );

  const handleResponse = () => {
    notify({
      status: "success",
      text: "Successfully"
    });
    refetch();
  };

  const handleSort = createSortHandler(navigate, fileUploadlistUrl, params);

  return (
    <FileUploadListPage
      currentTab={currentTab}
      filterOpts={() => {}}
      initialSearch={params.query || ""}
      onSearchChange={() => {}}
      onFilterChange={() => {}}
      onAll={() => {}}
      onTabChange={handleTabChange}
      onTabDelete={() => {}}
      onTabSave={() => {}}
      tabs={[]}
      files={maybe(() => data?.csvUploadFiles?.edges.map(edge => edge.node))}
      settings={settings}
      disabled={loading}
      pageInfo={pageInfo}
      onAdd={handleResponse}
      onNextPage={loadNextPage}
      onPreviousPage={loadPreviousPage}
      onUpdateListSettings={updateListSettings}
      onRowClick={url => () => window.open(url)}
      onSort={handleSort}
      toolbar={<></>}
      isChecked={isSelected}
      selected={listElements.length}
      sort={getSortParams(params)}
      toggle={toggle}
      toggleAll={toggleAll}
    />
  );
};
export default FileUploadList;

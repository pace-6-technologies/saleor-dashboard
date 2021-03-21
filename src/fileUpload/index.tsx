import { sectionNames } from "@saleor/intl";
import { asSortParams } from "@saleor/utils/sort";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "../components/WindowTitle";
import {
  fileUploadListPath,
  FileUploadListUrlQueryParams,
  FileUploadListUrlSortField
} from "./urls";
import FileUploadListViewComponent from "./views/FileUploadListView";

const FileUploadListView: React.FC<RouteComponentProps<{}>> = ({
  location
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: FileUploadListUrlQueryParams = asSortParams(
    qs,
    FileUploadListUrlSortField
  );

  return <FileUploadListViewComponent params={params} />;
};

export const FileUploadSection: React.FC<{}> = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.fileUpload)} />
      <Switch>
        <Route exact path={fileUploadListPath} component={FileUploadListView} />
      </Switch>
    </>
  );
};

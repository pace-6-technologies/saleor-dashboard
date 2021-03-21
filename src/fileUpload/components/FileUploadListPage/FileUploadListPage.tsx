import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@saleor/components/Container";
import DropdownFileType from "@saleor/components/DropdownFileType";
import PageHeader from "@saleor/components/PageHeader";
import { sectionNames } from "@saleor/intl";
import {
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps
} from "@saleor/types";
import React, { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { useFileUploadCsvMutation } from "../../mutations";
import { useGetFileTypeQuery } from "../../queries";
import FileUploadList from "../FileUploadList/FileUploadList";

export interface FileUploadListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<any, any>,
    SortPage<any>,
    TabPageProps {
  files: any[];
}

const FileUploadListPage: React.FC<FileUploadListPageProps> = ({
  currentTab,
  filterOpts,
  initialSearch,
  onAdd,
  onAll,
  onFilterChange,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  tabs,
  ...fileUploadListProps
}) => {
  const intl = useIntl();
  const [type, setType] = useState([]);
  const [typeSelect, setTypeSelect] = useState("");
  const inputRef = useRef(null);
  const [uploadFile] = useFileUploadCsvMutation({});

  const { data } = useGetFileTypeQuery({
    displayLoader: true
  });

  const parseDataType = data?.csvImportTypes?.map(item => {
    if (item) {
      const data = item?.split(",")[0];
      const parseData = data?.replace(/[^\w]/g, "");
      return { id: parseData?.toUpperCase(), name: parseData?.toUpperCase() };
    }
  });

  useEffect(() => {
    const res = parseDataType;
    if (res?.length > 0) {
      setType(res);
    }
  }, [data]);

  const handleSelectType = data => {
    setTypeSelect(data);
  };

  const handleFileChange = async e => {
    const file = e?.target.files[0];
    const { data, errors } = await uploadFile({
      variables: { file, importType: typeSelect }
    });
    if (data && !errors) {
      onAdd();
    }
  };

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.fileUpload)}>
        <DropdownFileType
          channels={type}
          disabled={false}
          selectedChannelId={typeSelect}
          onChannelSelect={handleSelectType}
        />
        <input
          ref={inputRef}
          onChange={handleFileChange}
          type="file"
          hidden
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
        <Button
          color="primary"
          disabled={!typeSelect}
          variant="contained"
          onClick={() => inputRef.current?.click?.()}
        >
          <FormattedMessage defaultMessage="Upload File" description="button" />
        </Button>
      </PageHeader>
      <Card>
        <FileUploadList {...fileUploadListProps} />
      </Card>
    </Container>
  );
};
FileUploadListPage.displayName = "FileUploadListPage";
export default FileUploadListPage;

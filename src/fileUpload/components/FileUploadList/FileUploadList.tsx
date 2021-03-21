import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableCellHeader from "@saleor/components/TableCellHeader";
import TableHead from "@saleor/components/TableHead";
import TablePagination from "@saleor/components/TablePagination";
import { maybe, renderCollection } from "@saleor/misc";
import { ListActions, ListProps, SortPage } from "@saleor/types";
import moment from "moment-timezone";
import React from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    [theme.breakpoints.up("lg")]: {
      colEmail: {},
      colName: {},
      colOrders: {
        width: 200
      }
    },
    colEmail: {},
    colName: {
      paddingLeft: 0
    },
    colOrders: {
      textAlign: "center"
    },
    tableRow: {
      cursor: "pointer"
    }
  }),
  { name: "CustomerList" }
);

export interface FileUploadListProps
  extends ListProps,
    ListActions,
    SortPage<any> {
  files: any[];
}

const numberOfColumns = 4;

const FileUploadList: React.FC<FileUploadListProps> = props => {
  const {
    settings,
    disabled,
    files,
    pageInfo,
    onNextPage,
    onPreviousPage,
    onUpdateListSettings,
    onRowClick,
    // onSort,
    // toolbar,
    // toggle,
    // toggleAll,
    selected
    // sort,
    // isChecked
  } = props;

  const classes = useStyles(props);

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={true}
        items={files}
      >
        <TableCellHeader className={classes.colName}>
          <FormattedMessage defaultMessage="File Name" />
        </TableCellHeader>
        <TableCellHeader className={classes.colEmail}>
          <FormattedMessage defaultMessage="Type" />
        </TableCellHeader>
        <TableCellHeader className={classes.colOrders}>
          <FormattedMessage defaultMessage="Created At" />
        </TableCellHeader>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePagination
            colSpan={numberOfColumns}
            settings={settings}
            hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
            onNextPage={onNextPage}
            onUpdateListSettings={onUpdateListSettings}
            hasPreviousPage={
              pageInfo && !disabled ? pageInfo.hasPreviousPage : false
            }
            onPreviousPage={onPreviousPage}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          files,
          file => (
            <TableRow
              className={!!file ? classes.tableRow : undefined}
              hover={!!file}
              key={file ? file.id : "skeleton"}
              onClick={file ? onRowClick(file.url) : undefined}
            >
              <TableCell padding="checkbox" />
              <TableCell className={classes.colName}>
                {maybe<React.ReactNode>(() => file.id, <Skeleton />)}
              </TableCell>
              <TableCell className={classes.colEmail}>
                {maybe<React.ReactNode>(() => file.importType, <Skeleton />)}
              </TableCell>
              <TableCell className={classes.colEmail}>
                {maybe<React.ReactNode>(
                  () => moment(file.createdAt).format("DD/MM/YYYY"),
                  <Skeleton />
                )}
              </TableCell>
            </TableRow>
          ),
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                <FormattedMessage defaultMessage="No files found" />
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
FileUploadList.displayName = "FileUploadList";
export default FileUploadList;

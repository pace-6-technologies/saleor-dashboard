import makeQuery from "@saleor/hooks/makeQuery";
import gql from "graphql-tag";

export const getFileList = gql`
  {
    csvUploadFiles(filter: { importType: "PRODUCT" }, first: 10) {
      edges {
        node {
          createdAt
          id
          message
          status
          url
          importType
          events {
            date
            message
            type
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    }
  }
`;

export const useGetFileListQuery = makeQuery<any, any>(getFileList);

export const getFileType = gql`
  query {
    csvImportTypes
  }
`;

export const useGetFileTypeQuery = makeQuery<any, any>(getFileType);

import makeMutation from "@saleor/hooks/makeMutation";
import gql from "graphql-tag";

const csvUpload = gql`
  mutation csvUpload($file: Upload!, $importType: ImportTypesEnum!) {
    csvUpload(file: $file, importType: $importType) {
      importFile {
        createdAt
        message
        status
        updatedAt
        url
      }
    }
  }
`;
export const useFileUploadCsvMutation = makeMutation(csvUpload);

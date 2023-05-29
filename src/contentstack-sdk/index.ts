import * as Utils from "@contentstack/utils";
import { customHostUrl, initializeContentStackSdk, isValidCustomHostUrl } from "./utils";

let customHost = import.meta.env.CONTENTSTACK_API_HOST;
customHost = customHostUrl(customHost);

// initialize contentstack sdk
const Stack = initializeContentStackSdk()

if (isValidCustomHostUrl(customHost)) {
  Stack.setHost(customHost);
}

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};

type EntryProps = {
  contentTypeUid: string;
  referenceFieldPath?: string[];
  jsonRtePath?: string[];
};

type EntryUrlProps = EntryProps & {
  entryUrl: string;
};

export default {
  /**
   * ̰
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   *
   */
  getEntry({ contentTypeUid, referenceFieldPath, jsonRtePath }: EntryProps) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .toJSON()
        .find()
        .then(
          (result) => {
            jsonRtePath &&
              Utils.jsonToHTML({
                entry: result,
                paths: jsonRtePath,
                renderOption,
              });
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },

  /**
   *fetches specific entry from a content-type
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* url for entry to be fetched} entryUrl
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   * @returns
   */
  getEntryByUrl({
    contentTypeUid,
    entryUrl,
    referenceFieldPath,
    jsonRtePath,
  }: EntryUrlProps) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.toJSON();
      const data = blogQuery.where("url", `${entryUrl}`).find();
      data.then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result[0]);
        },
        (error) => {
          console.error(error);
          reject(error);
        }
      );
    });
  },
};

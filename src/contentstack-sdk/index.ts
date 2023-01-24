import * as contentstack from 'contentstack';
import * as Utils from '@contentstack/utils';

import ContentstackLivePreview from '@contentstack/live-preview-utils';


const Stack:contentstack.Stack = contentstack.Stack({
  api_key: import.meta.env.CONTENTSTACK_API_KEY as string,
  delivery_token: import.meta.env.CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: import.meta.env.CONTENTSTACK_ENVIRONMENT as string,
  //@ts-ignore
  region: import.meta.env.CONTENTSTACK_REGION || "us",
  live_preview: {
    enable: true,
    management_token: import.meta.env.CONTENTSTACK_MANAGEMENT_TOKEN as string,
    host: import.meta.env.CONTENTSTACK_API_HOST as string,
  },
});

if (import.meta.env.CONTENTSTACK_API_HOST) {
  Stack.setHost(import.meta.env.CONTENTSTACK_API_HOST);
}

ContentstackLivePreview.init({
  //@ts-ignore
  stackSdk: Stack,
  clientUrlParams: {
    host: import.meta.env.CONTENTSTACK_APP_HOST,
  },
  ssr: false,
});

export const { onEntryChange } = ContentstackLivePreview;

const renderOption = {
  span: (node:any, next:any) => next(node.children),
};

type EntryProps ={
  contentTypeUid:string;
  referenceFieldPath?:string[];
  jsonRtePath?:string[]
}

type EntryUrlProps = EntryProps & {
  entryUrl:string;
}

export default {
  /**
   * ̰
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   *
   */
  getEntry({ contentTypeUid, referenceFieldPath, jsonRtePath }:EntryProps) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .includeOwner()
        .toJSON()
        .find()
        .then(
          (result) => {
            jsonRtePath
              && Utils.jsonToHTML({
                entry: result,
                paths: jsonRtePath,
                renderOption,
              });
            resolve(result);
          },
          (error) => {
            reject(error);
          },
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
    contentTypeUid, entryUrl, referenceFieldPath, jsonRtePath,
  }:EntryUrlProps ) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
      const data = blogQuery.where('url', `${entryUrl}`).find();
      data.then(
        (result) => {
          jsonRtePath
            && Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result[0]);
        },
        (error) => {
          console.error(error);
          reject(error);
        },
      );
    });
  },
};
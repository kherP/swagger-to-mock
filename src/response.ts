import { OpenAPIObject, PathItemObject } from "openapi3-ts";

export const APPLICATION_JSON = "application/json";

export type ResponsesType = {
  [path: string]: {
    [APPLICATION_JSON]: { schema: any };
  };
};

export const extractResponses = (obj: OpenAPIObject): ResponsesType => {
  let ret: any = {};
  Object.keys(obj.paths).forEach(path => {
    const methods: PathItemObject = obj.paths[path];
    Object.keys(methods).forEach((method: string) => {
      const api = methods[method];
      const { responses, operationId } = api;
      const mainKey = operationId || `${path}_${method}`;
      ret[mainKey] = {}
      Object.keys(responses).forEach((statusCode: string) => {
        const response = responses[statusCode];
        const { content } = response;
        ret[mainKey][statusCode] = content || response;
      });
    });
  });
  return ret;
};

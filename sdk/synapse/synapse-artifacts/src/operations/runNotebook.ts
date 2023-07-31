/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { tracingClient } from "../tracing";
import { RunNotebook } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClient } from "../artifactsClient";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl";
import {
  RunNotebookRequest,
  RunNotebookCreateRunOptionalParams,
  RunNotebookCreateRunResponse,
  RunNotebookGetStatusOptionalParams,
  RunNotebookGetStatusResponse,
  RunNotebookCancelRunOptionalParams,
  RunNotebookCancelRunResponse,
  RunNotebookGetSnapshotOptionalParams,
  RunNotebookGetSnapshotResponse
} from "../models";

/** Class containing RunNotebook operations. */
export class RunNotebookImpl implements RunNotebook {
  private readonly client: ArtifactsClient;

  /**
   * Initialize a new instance of the class RunNotebook class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClient) {
    this.client = client;
  }

  /**
   * Run notebook
   * @param runId Notebook run id.
   * @param runNotebookRequest Run notebook request payload.
   * @param options The options parameters.
   */
  async beginCreateRun(
    runId: string,
    runNotebookRequest: RunNotebookRequest,
    options?: RunNotebookCreateRunOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<RunNotebookCreateRunResponse>,
      RunNotebookCreateRunResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<RunNotebookCreateRunResponse> => {
      return tracingClient.withSpan(
        "ArtifactsClient.beginCreateRun",
        options ?? {},
        async () => {
          return this.client.sendOperationRequest(args, spec) as Promise<
            RunNotebookCreateRunResponse
          >;
        }
      );
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { runId, runNotebookRequest, options },
      spec: createRunOperationSpec
    });
    const poller = await createHttpPoller<
      RunNotebookCreateRunResponse,
      OperationState<RunNotebookCreateRunResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
    await poller.poll();
    return poller;
  }

  /**
   * Run notebook
   * @param runId Notebook run id.
   * @param runNotebookRequest Run notebook request payload.
   * @param options The options parameters.
   */
  async beginCreateRunAndWait(
    runId: string,
    runNotebookRequest: RunNotebookRequest,
    options?: RunNotebookCreateRunOptionalParams
  ): Promise<RunNotebookCreateRunResponse> {
    const poller = await this.beginCreateRun(
      runId,
      runNotebookRequest,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Get RunNotebook Status for run id.
   * @param runId Notebook run id.
   * @param options The options parameters.
   */
  async getStatus(
    runId: string,
    options?: RunNotebookGetStatusOptionalParams
  ): Promise<RunNotebookGetStatusResponse> {
    return tracingClient.withSpan(
      "ArtifactsClient.getStatus",
      options ?? {},
      async (options) => {
        return this.client.sendOperationRequest(
          { runId, options },
          getStatusOperationSpec
        ) as Promise<RunNotebookGetStatusResponse>;
      }
    );
  }

  /**
   * Cancel notebook run.
   * @param runId Notebook run id.
   * @param options The options parameters.
   */
  async cancelRun(
    runId: string,
    options?: RunNotebookCancelRunOptionalParams
  ): Promise<RunNotebookCancelRunResponse> {
    return tracingClient.withSpan(
      "ArtifactsClient.cancelRun",
      options ?? {},
      async (options) => {
        return this.client.sendOperationRequest(
          { runId, options },
          cancelRunOperationSpec
        ) as Promise<RunNotebookCancelRunResponse>;
      }
    );
  }

  /**
   * Get RunNotebook Snapshot for run id.
   * @param runId Notebook run id.
   * @param options The options parameters.
   */
  async getSnapshot(
    runId: string,
    options?: RunNotebookGetSnapshotOptionalParams
  ): Promise<RunNotebookGetSnapshotResponse> {
    return tracingClient.withSpan(
      "ArtifactsClient.getSnapshot",
      options ?? {},
      async (options) => {
        return this.client.sendOperationRequest(
          { runId, options },
          getSnapshotOperationSpec
        ) as Promise<RunNotebookGetSnapshotResponse>;
      }
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const createRunOperationSpec: coreClient.OperationSpec = {
  path: "/notebooks/runs/{runId}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.RunNotebookResponse,
      headersMapper: Mappers.RunNotebookCreateRunHeaders
    },
    201: {
      bodyMapper: Mappers.RunNotebookResponse,
      headersMapper: Mappers.RunNotebookCreateRunHeaders
    },
    202: {
      bodyMapper: Mappers.RunNotebookResponse,
      headersMapper: Mappers.RunNotebookCreateRunHeaders
    },
    204: {
      bodyMapper: Mappers.RunNotebookResponse,
      headersMapper: Mappers.RunNotebookCreateRunHeaders
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  requestBody: Parameters.runNotebookRequest,
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint, Parameters.runId],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getStatusOperationSpec: coreClient.OperationSpec = {
  path: "/notebooks/runs/{runId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RunNotebookResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint, Parameters.runId],
  headerParameters: [Parameters.accept],
  serializer
};
const cancelRunOperationSpec: coreClient.OperationSpec = {
  path: "/notebooks/runs/{runId}/cancel",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.RunNotebookResponse
    },
    409: {
      bodyMapper: Mappers.RunNotebookResponse,
      isError: true
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint, Parameters.runId],
  headerParameters: [Parameters.accept],
  serializer
};
const getSnapshotOperationSpec: coreClient.OperationSpec = {
  path: "/notebooks/runs/{runId}/snapshot",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.RunNotebookSnapshotResponse
    },
    default: {
      bodyMapper: Mappers.CloudError
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint, Parameters.runId],
  headerParameters: [Parameters.accept],
  serializer
};
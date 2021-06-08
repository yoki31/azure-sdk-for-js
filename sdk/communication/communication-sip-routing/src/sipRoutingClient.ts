// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/// <reference lib="esnext.asynciterable" />

import {
  parseClientArguments,
  isKeyCredential,
  createCommunicationAuthPolicy
} from "@azure/communication-common";
import { KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  PipelineOptions,
  OperationOptions,
  InternalPipelineOptions,
  createPipelineFromOptions,
  operationOptionsToRequestOptionsBase
} from "@azure/core-http";
import { SpanStatusCode } from "@azure/core-tracing";
import { SipApiClient } from "./generated/src/sipApiClient";
import { SDK_VERSION } from "./constants";
import { createSpan } from "./tracing";
import { logger } from "./logger";
import { extractOperationOptions } from "./extractOperationOptions";
import { 
  SipApiClientGetSipConfigurationResponse, 
  SipApiClientPatchSipConfigurationResponse,
  SipApiClientPatchSipConfigurationOptionalParams
} from "./generated/src/models";


/**
 * Client options used to configure SIP Client API requests.
 */
export interface SipRoutingClientOptions extends PipelineOptions {}

/**
 * Checks whether the type of a value is SipClientOptions or not.
 *
 * @param options - The value being checked.
 */
const isSipClientOptions = (options: any): options is SipRoutingClientOptions =>
  !!options && !isKeyCredential(options);


export class SipRoutingClient {
  private readonly api: SipApiClient;

  /**
   * Initializes a new instance of the SipClient class.
   * @param connectionString - Connection string to connect to an Azure Communication Service resource.
   *                         Example: "endpoint=https://contoso.eastus.communications.azure.net/;accesskey=secret";
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(connectionString: string, options?: SipRoutingClientOptions);

  /**
   * Initializes a new instance of the SipClient class using an Azure KeyCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - An object that is used to authenticate requests to the service. Use the Azure KeyCredential or `@azure/identity` to create a credential.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(endpoint: string, credential: KeyCredential, options?: SipRoutingClientOptions);

  /**
   * Initializes a new instance of the SipClient class using a TokenCredential.
   * @param endpoint - The endpoint of the service (ex: https://contoso.eastus.communications.azure.net).
   * @param credential - TokenCredential that is used to authenticate requests to the service.
   * @param options - Optional. Options to configure the HTTP pipeline.
   */
  constructor(endpoint: string, credential: TokenCredential, options?: SipRoutingClientOptions);

  constructor(
    connectionStringOrUrl: string,
    credentialOrOptions?: KeyCredential | TokenCredential | SipRoutingClientOptions,
    maybeOptions: SipRoutingClientOptions = {}
  ) {
    const { url, credential } = parseClientArguments(connectionStringOrUrl, credentialOrOptions);
    const options = isSipClientOptions(credentialOrOptions) ? credentialOrOptions : maybeOptions;
    const libInfo = `azsdk-js-communication-sip/${SDK_VERSION}`;

    if (!options.userAgentOptions) {
      options.userAgentOptions = {};
    }

    if (options.userAgentOptions.userAgentPrefix) {
      options.userAgentOptions.userAgentPrefix = `${options.userAgentOptions.userAgentPrefix} ${libInfo}`;
    } else {
      options.userAgentOptions.userAgentPrefix = libInfo;
    }

    const internalPipelineOptions: InternalPipelineOptions = {
      ...options,
      ...{
        loggingOptions: {
          logger: logger.info
        }
      }
    };

    const authPolicy = createCommunicationAuthPolicy(credential);
    const pipeline = createPipelineFromOptions(internalPipelineOptions, authPolicy);
    this.api = new SipApiClient(url, pipeline);
  }

  /**
   * Sends an SMS from a phone number that is acquired by the authenticated account, to another phone number.
   */
  public async getSipConfiguration(
    options: SipConfigurationOptions = {}
  ): Promise<SipApiClientGetSipConfigurationResponse[]> {
    const { operationOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("SipClient-GetSipConfiguration", operationOptions);

    try {
      const reqOptions = operationOptionsToRequestOptionsBase(updatedOptions);
      const response = await this.api.getSipConfiguration(reqOptions);
      return [response];
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  public async updateSipConfiguration(
    options: SipApiClientPatchSipConfigurationOptionalParams = {}
  ): Promise<SipApiClientPatchSipConfigurationResponse> {
    const { operationOptions } = extractOperationOptions(options);
    const { span, updatedOptions } = createSpan("SipClient-UpdateSipConfiguration", operationOptions);

    try {
      const reqOptions = operationOptionsToRequestOptionsBase(updatedOptions);
      const response = await this.api.patchSipConfiguration(reqOptions);
      return response;
    } catch (e) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

export interface SipConfigurationOptions extends OperationOptions
{ }

/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  Workspace,
  WorkspacesListBySubscriptionOptionalParams,
  WorkspacesListByResourceGroupOptionalParams,
  WorkspacesCreateOptionalParams,
  WorkspacesCreateResponse,
  WorkspaceUpdateDefinition,
  WorkspacesUpdateOptionalParams,
  WorkspacesUpdateResponse,
  WorkspacesDeleteOptionalParams,
  WorkspacesGetOptionalParams,
  WorkspacesGetResponse,
  GenerateUploadUrlRequest,
  WorkspacesGenerateUploadUrlOptionalParams,
  WorkspacesGenerateUploadUrlResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Workspaces. */
export interface Workspaces {
  /**
   * Lists all of the firmware analysis workspaces in the specified subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: WorkspacesListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<Workspace>;
  /**
   * Lists all of the firmware analysis workspaces in the specified resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: WorkspacesListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<Workspace>;
  /**
   * The operation to create or update a firmware analysis workspace.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the firmware analysis workspace.
   * @param workspace Parameters when creating a firmware analysis workspace.
   * @param options The options parameters.
   */
  create(
    resourceGroupName: string,
    workspaceName: string,
    workspace: Workspace,
    options?: WorkspacesCreateOptionalParams
  ): Promise<WorkspacesCreateResponse>;
  /**
   * The operation to update a firmware analysis workspaces.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the firmware analysis workspace.
   * @param workspace Parameters when updating a firmware analysis workspace.
   * @param options The options parameters.
   */
  update(
    resourceGroupName: string,
    workspaceName: string,
    workspace: WorkspaceUpdateDefinition,
    options?: WorkspacesUpdateOptionalParams
  ): Promise<WorkspacesUpdateResponse>;
  /**
   * The operation to delete a firmware analysis workspace.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the firmware analysis workspace.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesDeleteOptionalParams
  ): Promise<void>;
  /**
   * Get firmware analysis workspace.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the firmware analysis workspace.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    workspaceName: string,
    options?: WorkspacesGetOptionalParams
  ): Promise<WorkspacesGetResponse>;
  /**
   * The operation to get a url for file upload.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName The name of the firmware analysis workspace.
   * @param generateUploadUrl Parameters when requesting a URL to upload firmware.
   * @param options The options parameters.
   */
  generateUploadUrl(
    resourceGroupName: string,
    workspaceName: string,
    generateUploadUrl: GenerateUploadUrlRequest,
    options?: WorkspacesGenerateUploadUrlOptionalParams
  ): Promise<WorkspacesGenerateUploadUrlResponse>;
}
/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { RegionSkuDetail, SkusListOptionalParams } from "../models";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Skus. */
export interface Skus {
  /**
   * Gets information about skus in specified location for the given subscription id
   * @param location The name of Azure region.
   * @param options The options parameters.
   */
  list(
    location: string,
    options?: SkusListOptionalParams
  ): PagedAsyncIterableIterator<RegionSkuDetail>;
}
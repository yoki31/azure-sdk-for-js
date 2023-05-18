/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a Dev Box definition
 *
 * @summary Gets a Dev Box definition
 * x-ms-original-file: specification/devcenter/resource-manager/Microsoft.DevCenter/stable/2023-04-01/examples/DevBoxDefinitions_Get.json
 */
async function devBoxDefinitionsGet() {
  const subscriptionId =
    process.env["DEVCENTER_SUBSCRIPTION_ID"] ||
    "0ac520ee-14c0-480f-b6c9-0a90c58ffff";
  const resourceGroupName = process.env["DEVCENTER_RESOURCE_GROUP"] || "rg1";
  const devCenterName = "Contoso";
  const devBoxDefinitionName = "WebDevBox";
  const credential = new DefaultAzureCredential();
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.devBoxDefinitions.get(
    resourceGroupName,
    devCenterName,
    devBoxDefinitionName
  );
  console.log(result);
}

async function main() {
  devBoxDefinitionsGet();
}

main().catch(console.error);
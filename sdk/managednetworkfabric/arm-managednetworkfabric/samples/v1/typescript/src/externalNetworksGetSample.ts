/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Implements ExternalNetworks GET method.
 *
 * @summary Implements ExternalNetworks GET method.
 * x-ms-original-file: specification/managednetworkfabric/resource-manager/Microsoft.ManagedNetworkFabric/stable/2023-06-15/examples/ExternalNetworks_Get_MaximumSet_Gen.json
 */
async function externalNetworksGetMaximumSetGen() {
  const subscriptionId =
    process.env["MANAGEDNETWORKFABRIC_SUBSCRIPTION_ID"] ||
    "42EEDB3B-8E17-46E3-B0B4-B1CD9842D90D";
  const resourceGroupName =
    process.env["MANAGEDNETWORKFABRIC_RESOURCE_GROUP"] ||
    "rgL3IsolationDomains";
  const l3IsolationDomainName = "yhtr";
  const externalNetworkName = "fltpszzikbalrzaqq";
  const credential = new DefaultAzureCredential();
  const client = new AzureNetworkFabricManagementServiceAPI(
    credential,
    subscriptionId
  );
  const result = await client.externalNetworks.get(
    resourceGroupName,
    l3IsolationDomainName,
    externalNetworkName
  );
  console.log(result);
}

async function main() {
  externalNetworksGetMaximumSetGen();
}

main().catch(console.error);
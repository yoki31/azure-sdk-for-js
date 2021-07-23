// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Convert a data blob into a UInt8 array.
 * @param data
 * @returns
 */
export function convertToUint8Array(value: Uint8Array | Buffer | Blob): Uint8Array {
  if (value.constructor?.name === "Blob") {
    throw new Error("Blobs are not supported when used in Node.js");
  }
  return value as Uint8Array;
}

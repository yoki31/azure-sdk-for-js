// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export function convertToUint8Array(data: Uint8Array | Buffer | Blob): Uint8Array {
  if (data instanceof Blob) {
    //      const buffer = await blobP.arrayBuffer();
    const fileReader = new FileReader();
    let arrayBuffer: unknown;
    fileReader.onload = function(event: ProgressEvent<FileReader>) {
      arrayBuffer = event.target?.result;
    };
    fileReader.readAsArrayBuffer(data);
    return new Uint8Array(arrayBuffer as ArrayBuffer);
  }
  return data as Uint8Array;
}

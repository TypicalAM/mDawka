export interface CodeResult{
    code: string;
    codeset: unknown;
    decodedCodes: Array<unknown>;
    direction: number;    end: number;
    format: BarcodeFormat;
    start: number;
    startInfo: unknown;
};

export enum BarcodeFormat {
    CODE_128_READER = "code_128_reader",
    EAN_READER = "ean_reader",
    EAN_8_READER = "ean_8_reader",
    CODE_39_READER = "code_39_reader",
    CODE_39_VIN_READER = "code_39_vin_reader",
    CODABAR_READER = "codabar_reader",
    UPC_READER = "upc_reader",
    UPC_E_READER = "upc_e_reader",
    I2OF5_READER = "i2of5_reader",
    _2OF5_READER = "2of5_reader",
    CODE_93_READER = "code_93_reader",
  }
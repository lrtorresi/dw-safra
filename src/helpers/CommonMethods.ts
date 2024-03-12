import { IValidationResultSchema } from "../interfaces/base/IValidationResultSchema";
import { Text } from "@microsoft/sp-core-library";

export default class CommonMethods {
  public static ValidateForm(data, fields): IValidationResultSchema {
    let validationCheckResult: IValidationResultSchema = { isValid: true };
    let isValid = true;
    for (let optType in fields) {
      switch (optType) {
        case "required":
          for (
            let fieldIndex = 0;
            fieldIndex < fields[optType].length;
            fieldIndex++
          ) {
            
            let currentValue = data[fields[optType][fieldIndex]];
            if (
              !currentValue ||
              currentValue == -1 ||
              (Array.isArray(currentValue) && currentValue.length == 0)
            ) {
              validationCheckResult[fields[optType][fieldIndex]] =
                fields[optType][fieldIndex] + " required";
              isValid = false;
            }
          }
          break;
        case "regular":
          for (let fieldKey in fields[optType]) {
            
            if (fields[optType].hasOwnProperty(fieldKey)) {
              if (!validationCheckResult[fieldKey]) {
                let value = data[fieldKey];
                if (typeof value !== "undefined") {
                  if (value != null)
                    if (value.length > 0) {
                      let regExp = new RegExp(fields[optType][fieldKey]);
                      let result = regExp.test(value);
                      if (!result) {
                        isValid = false;
                        validationCheckResult[fieldKey] = fieldKey + " regular"; //" is not Valid";
                      }
                    }
                }
              }
            }
          }
          break;
      }
      validationCheckResult["isValid"] = isValid;
    }
    return validationCheckResult;
  }

  public static GetListRelativeUrl(siteUrl: string, list: string): string {
    return Text.format("{0}/Lists/{1}", siteUrl, list);
  }

  public static GetLibraryRelativeUrl(
    siteUrl: string,
    library: string
  ): string {
    return Text.format("{0}/{1}", siteUrl, library);
  }
}

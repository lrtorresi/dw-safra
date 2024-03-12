const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const xml2js = require("xml2js");

const clientName = "safra";

const solutionGuid = uuidv4();
const featuresGuid = uuidv4();
const StylingExtensionGuid = uuidv4();

// Update package-solution.json
const packageSolution = require("./config/package-solution.json");

packageSolution.solution.name = `impar-digital-workplace-core-${clientName}-custom`;
packageSolution.paths.zippedPackage = `solution/impar-digital-workplace-core-${clientName}-custom.sppkg`;
packageSolution.solution.id = solutionGuid;
packageSolution.solution.features[0].id = featuresGuid;

const file = JSON.stringify(packageSolution);
fs.writeFile("./config/package-solution.json", file, "utf8", (error) => {
  if (error) console.log(error);
});

// Update StylingExtensionApplicationCustomizer.manifest.json
const StylingExtension = require("./src/extensions/stylingExtension/StylingExtensionApplicationCustomizer.manifest.json");
const oldStylingExtensionId = StylingExtension.id;
StylingExtension.id = StylingExtensionGuid;
const final = JSON.stringify(StylingExtension);
fs.writeFile(
  "./src/extensions/stylingExtension/StylingExtensionApplicationCustomizer.manifest.json",
  final,
  "utf8",
  (error) => {
    if (error) console.log(error);
  }
);

// Update serve.json
const serve = require("./config/serve.json");
let string = JSON.stringify(serve);
let regex = new RegExp(oldStylingExtensionId, "g");
string = string.replace(regex, StylingExtensionGuid);
fs.writeFile("./config/serve.json", string, "utf8", (error) => {
  if (error) console.log(error);
});

// Update ClientSideInstance.xml
fs.readFile(
  "./sharepoint/assets/ClientSideInstance.xml",
  "utf8",
  (error, data) => {
    if (error) console.log(error);

    // convert XML data to JSON object
    xml2js.parseString(data, (err, result) => {
      if (err) return;
      result.Elements.ClientSideComponentInstance[0].$.ComponentId =
        StylingExtensionGuid;

      const builder = new xml2js.Builder();
      const xml = builder.buildObject(result);

      fs.writeFile(
        "./sharepoint/assets/ClientSideInstance.xml",
        xml,
        "utf8",
        (error) => {
          if (error) console.log(error);
        }
      );
    });
  }
);

// Update elements.xml
fs.readFile("./sharepoint/assets/elements.xml", "utf8", (error, data) => {
  if (error) console.log(error);

  // convert XML data to JSON object
  xml2js.parseString(data, (err, result) => {
    if (err) return;

    result.Elements.CustomAction[0].$.ClientSideComponentId =
      StylingExtensionGuid;

    const builder = new xml2js.Builder();
    const xml = builder.buildObject(result);

    fs.writeFile("./sharepoint/assets/elements.xml", xml, "utf8", (error) => {
      if (error) console.log(error);
    });
  });
});

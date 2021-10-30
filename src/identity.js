const path = require("path");
const dfidentity = require("@dfinity/identity");
const fs = require("fs");
const getRandomValues = require("get-random-values");
const { exit } = require("process");

dfidentity.Ed25519KeyIdentity.generate();

const newIdentity = () => {
  const entropy = getRandomValues(new Uint8Array(32));
  const identity = dfidentity.Ed25519KeyIdentity.generate(entropy);
  return identity;
};

let identity;

try {
  const identityJson = require(path.resolve("identity.json"));
  //   console.log(identityJson);
  identity = dfidentity.Ed25519KeyIdentity.fromParsedJson(identityJson);
} catch (e) {
  //   console.log(e.message);
  console.log("Creating new identity and saving it in identity.json");
  identity = newIdentity();
  fs.writeFile("./identity.json", JSON.stringify(identity), (err) => {
    if (err) {
      console.log(err);
      exit;
    }
  });
}

export default identity;

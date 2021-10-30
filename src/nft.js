const nft_idl = require("./nft.did.js");
const fetch = require("node-fetch");
const actor = require("@dfinity/agent");
import identity from "./identity";

export default function (canisterId) {
  const agent = new actor.HttpAgent({
    identity,
    fetch,
    ...(process.env.NODE_ENV !== "production"
      ? { host: "http://localhost:8000" }
      : { host: "https://" + process.env.APP_CANISTER + ".ic0.app" }),
  });

  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  let can = actor.Actor.createActor(nft_idl.idlFactory, {
    agent,
    canisterId,
  });

  return can;
}

import { Principal } from "@dfinity/principal";

import nftInit from "./nft";
import dropshipInit from "./dropship";
import identity from "./identity";
import { principalToAccountIdentifier, encodeTokenId } from "./token";

const dropshipId =
  process.env.NODE_ENV !== "production"
    ? "rkp4c-7iaaa-aaaaa-aaaca-cai"
    : "445x6-xyaaa-aaaai-qa2dq-cai";

const main = async () => {
  let { dropship, principal } = await dropshipInit(dropshipId);

  let address = principalToAccountIdentifier(principal.toText());

  console.log("Principal: ", principal.toText());
  console.log("Address: ", address);

  let nftcan = await dropship.getAvailable();

  let nft = nftInit(nftcan.toText());

  let metadata = {
    name: ["Excalibur"],
    lore: [],
    use: [],
    transfer: { unrestricted: null },
    hold: [],
    quality: 1,
    ttl: [],
    attributes: [],
    content: [],
    thumb: { external: { idx: 1, contentType: "image/jpeg" } },
    secret: false,
    extensionCanister: [Principal.fromText("aaaaa-aa")],
  };

  try {
    let s = await nft.mintNFT({ to: { address }, metadata });
    if (s.ok) {
      let tid = encodeTokenId(nftcan.toText(), s.ok);
      console.log("Minted Token Id: ", tid);
    } else {
      console.log(s);
    }
  } catch (e) {
    console.log("Error minting: ", e.message);
  }
};

main();

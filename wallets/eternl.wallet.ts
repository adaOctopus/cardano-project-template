import { getAddressDetails } from "lucid-cardano";
import BaseWallet from "./base.wallet";

let events: any = [];

class EternlWallet extends BaseWallet {
  constructor() {
    super({
      provider: window?.cardano?.eternl,
      name: "Eternl",
      extensionLink:
        "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka?hl=en",
    });
  }

  async subscribeEvents({ dispatch }: any) {
    // TODO: implement syncAccount method to get new accounts
    return true;
  }
  async unsubscribeEvents() {
    return true;
  }
}

export default EternlWallet;

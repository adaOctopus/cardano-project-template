import { NamiIcon } from "../src/components/Wallet/nami.icon"
import { getAddressDetails } from "lucid-cardano";
import BaseWallet from "./base.wallet";
import { updateWalletRedux } from "../store/features/walletSlice";

let events: any = [];

class NamiWallet extends BaseWallet {
  constructor() {
    super({
      provider: window.cardano?.nami,
      name: "Nami",
      extensionLink:
        "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo?hl=en",
      icon: NamiIcon,
    });
  }

  async subscribeEvents({ dispatch }: any) {
    if (events.length > 0) {
      return;
    }

    const api = await this.getApi();

    events.push({
      name: "accountChange",
      callback: (addresses: any) => {
        console.log(
          "[events] accountChange of Nami wallet -> addresses",
          addresses
        );
        const result = getAddressDetails(addresses[0]);
        dispatch(
          updateWalletRedux({
            wallet: {
              address: result.address.bech32,
            },
          })
        );
      },
    });
    events.forEach((event: any) => {
      console.log('api.experimental: ', api.experimental)
      api.experimental.on(event.name, event.callback);
    });
  }
  async unsubscribeEvents() {
    const api = await this.getApi();
    events.forEach((event: any) => {
      api.experimental.off(event.name, event.callback);
    });
    events = [];
  }
}

export default NamiWallet;

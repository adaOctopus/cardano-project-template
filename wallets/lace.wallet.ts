import { getAddressDetails } from "lucid-cardano";
import BaseWallet from "./base.wallet";
import { updateWalletRedux } from "../store/features/walletSlice";

let events: any = [];

class LaceWallet extends BaseWallet {
  constructor() {
    super({
      provider: window.cardano?.lace,
      name: "Lace",
      extensionLink:
        "https://chromewebstore.google.com/detail/lace/gafhhkghbfjjkeiendhlofajokpaflmk?hl=en",
    });
  }

//   async subscribeEvents({ dispatch }: any) {
//     if (events.length > 0) {
//       return;
//     }

//     const api = await this.getApi();

//     events.push({
//       name: "accountChange",
//       callback: (addresses: any) => {
//         console.log(
//           "[events] accountChange of Lace wallet -> addresses",
//           addresses
//         );
//         const result = getAddressDetails(addresses[0]);
//         dispatch(
//           updateWalletRedux({
//             wallet: {
//               address: result.address.bech32,
//             },
//           })
//         );
//       },
//     });
//     events.forEach((event: any) => {
//       console.log('api.experimental: ', api.experimental)
//       api.experimental.on(event.name, event.callback);
//     });
//   }
//   async unsubscribeEvents() {
//     const api = await this.getApi();
//     events.forEach((event: any) => {
//       api.experimental.off(event.name, event.callback);
//     });
//     events = [];
//   }
// }

async subscribeEvents({ dispatch }: any) {
    // TODO: implement syncAccount method to get new accounts
    return true;
  }
  async unsubscribeEvents() {
    return true;
  }
}

export default LaceWallet;

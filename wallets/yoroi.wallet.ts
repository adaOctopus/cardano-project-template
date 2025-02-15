import BaseWallet from "./base.wallet";

const CARDANO_NETWORK_ID: any = process.env.NEXT_PUBLIC_CARDANO_NETWORK_ID

class YoroiWallet extends BaseWallet {
  constructor() {
    const extensionLinkMap: any = {
      0: 'https://chromewebstore.google.com/detail/yoroi-nightly/poonlenmfdfbjfeeballhiibknlknepo?hl=en',
      1: "https://chromewebstore.google.com/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb?hl=en",
    }

    super({
      provider: window?.cardano?.yoroi,
      name: "Yoroi",
      extensionLink: extensionLinkMap[CARDANO_NETWORK_ID] || extensionLinkMap[0]
    });
  }

  subscribeEvents() {
    return true;
  }

  unsubscribeEvents() {
    return true;
  }
}

export default YoroiWallet;

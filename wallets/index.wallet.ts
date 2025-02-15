import nami from "./nami.wallet";
import yoroi from "./yoroi.wallet";
import eternl from "./eternl.wallet";
import lace from "./lace.wallet";

export const Wallets: any = {
  
  eternl,
  lace,
  yoroi,
};

export const walletIcons: any = {
  
  eternl: "/public/assets/img/eternl.png",
  lace: "/public/assets/img/laceloco.png",
  yoroi: "/public/assets/img/yoroi.png"
}

export const getWalletsMetadata = () => {
  return Object.keys(Wallets).map((key) => {
    const wallet = new Wallets[key]();
    const walletIcon = walletIcons[key];
    const metadata = wallet.getMetadata();
    metadata["walletIcon"] = walletIcon;
    //console.log(metadata)

    return Object.assign({ id: key }, metadata);
  });
};

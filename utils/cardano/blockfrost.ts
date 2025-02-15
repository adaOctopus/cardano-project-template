'use client';

import { Lucid, Blockfrost, Assets } from "@lucid-evolution/lucid";
// import { Lucid, Blockfrost } from "lucid-cardano"
import { Wallets } from "../../wallets/index.wallet";
import { useSelector } from "react-redux";

export async function initLucid(wallet: any) {
	console.log(wallet)

	console.log("Lets go");
	const lucid = await Lucid(
    new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", process.env.NEXT_PUBLIC_PREPROD_BLOCKFROST_PROVIDER_ID),
    "Preprod"
  );
	// const lucid = await getLucid()
	const _wallet = new Wallets[wallet.metadata.id]();
	const api = await _wallet.getApi();
	lucid.selectWallet.fromAPI(api);
	// lucid.selectWallet(api)

	console.log("We are here");
	console.log(lucid)
	return lucid;
};

function sumAssets(...assets: Assets[]) {
	return assets.reduce((a, b) => {
		for (const k in b) {
			if (b.hasOwnProperty(k)) {
				a[k] = (a[k] || 0n) + b[k];
			}
		}
		return a;
	}, {});
}

export async function getBalance(lucid: any, addr: string) {
	if (lucid) {
		const utxo_lovelace = await lucid.utxosAt(addr);
		const summedassets = utxo_lovelace
			.map((utxo: any) => utxo.assets)
			.reduce((acc: any, assets: any) => sumAssets(acc, assets), {});
		return summedassets.lovelace;
	}
}

export function getPkh(lucid: any, addr: string) {
	if (lucid) {
		const pkh = lucid.utils.getAddressDetails(addr).paymentCredential!.hash;
		return pkh
	}
}
import { useDispatch, useSelector } from "react-redux";
import { Lucid } from "lucid-cardano";
//import { Lucid, Blockfrost } from "@lucid-evolution/lucid";
import { useCallback } from "react";
import { Wallets } from "../wallets/index.wallet";
import Networks from '../constants/cardano-network.constant'
import { useAppSelector } from "../store";
import { connectWalletRedux, disconnectWalletRedux } from "../store/features/walletSlice";

const CARDANO_NETWORK_ID: any = 0// process.env.NEXT_PUBLIC_CARDANO_NETWORK_ID

export function useCardanoWalletConnect(): [(wallet: Object) => void] {
    const dispatch = useDispatch();

    const connectWallet = useCallback(async (item: any) => {
        
            const wallet = new Wallets[item.id]();
            if (!wallet.provider) {
                return window.open(wallet.extensionLink);
            }
            const api = await wallet.enable();

            const networkId = await wallet.getNetworkId();

            if (networkId != CARDANO_NETWORK_ID) {
                throw new Error(
                    `Set network to "${Networks[CARDANO_NETWORK_ID]}" in your ${item.id} wallet to use`
                );
            }

            // const lucid = await Lucid(
            //     new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", `${process.env.NEXT_PUBLIC_PREPROD_BLOCKFROST_PROVIDER_ID}`),
            //     "Preprod"
            //   );
            const lucid = await Lucid.new();
            lucid.selectWallet(api);

            
            const address = await lucid.wallet.address();


            wallet.subscribeEvents({
                dispatch,
                lucid,
                api,
            });

            dispatch(
                connectWalletRedux({
                    wallet: {
                        address,
                        metadata: item,
                        networkId: networkId,
                    },
                })
            );
        // } catch (error) {
        //     console.error(`connect wallet=${item.id} failed: `, error)
        //     alert(error);
        // }
    }, []);

    return [connectWallet];
}

export function useCardanoWalletDisconnect() {
    const dispatch = useDispatch();

    const wallet = useSelector(
        (state: any) => state.wallet.wallet
    );

    const disconnectWallet = useCallback(() => {
        if (wallet.metadata && wallet.metadata.id) {
            const _wallet = new Wallets[wallet.metadata.id]();
            _wallet.unsubscribeEvents();
        }
        dispatch(disconnectWalletRedux());
    }, [wallet]);

    return [disconnectWallet];
}

export function useCardanoWalletConnected() {
    const wallet = useAppSelector(
        (state: any) => state.wallet.wallet
    );

    return [wallet];
}

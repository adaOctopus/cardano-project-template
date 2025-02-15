"use client"
import { Typography, message, Row, Col, Modal, Button, theme } from "antd";
import { twMerge } from "tailwind-merge";
import { ComponentProps, useEffect, useMemo, useState } from "react";
import { LogOutIcon, SettingsIcon, UserIcon } from "../Layouts/header/user-info/icons";
import { truncate } from "../../../utils/address.util";
import { useCallback } from "react";
import Image from "next/image"
import {
  useCardanoWalletConnect,
  useCardanoWalletConnected, useCardanoWalletDisconnect
} from "../../../hooks/cardano-wallet.hook";
import { Wallets, getWalletsMetadata } from "../../../wallets/index.wallet";
import cssClass from './web3-modal.component.module.scss';
import { get } from "http";
import nami from "../../assets/nami.png"
import yoroi from "../../assets/yoroi.png"
import eternl from "../../assets/eternl.png"
import lace from "../../assets/lacelogo.png"
import { useAppDispatch, useAppSelector } from "../../../store";

const walletIcons: any = {
  yoroi: yoroi,
  eternl: eternl,
  lace: lace
}



const { Text } = Typography;

const { useToken } = theme;

const WalletConnect = ({ style, className }: any) => {
  const { token } = useToken();
  const [messageApi, contextHolder] = message.useMessage();
  const [wallet] = useCardanoWalletConnected();
  const [connectWallet] = useCardanoWalletConnect();
  const [disconnectWallet] = useCardanoWalletDisconnect();
  const [selcectWalletModal, updateSelectWalletModal] = useState({
    open: false,
  });


  const [loading, setLoading] = useState("");
  const walletState = useAppSelector((state) => state.wallet.wallet);
  console.log(walletState.wallet, 'walletState')

  const handleConnect = useCallback(async (item: any) => {
    try {
      setLoading(item.id);
      await connectWallet(item);
      //console.log('ricoco', wallet)
      updateSelectWalletModal({
        open: false,
      });
    } catch (error: any) {
      messageApi.open({
        type: 'warning',
        content: 'You need to connect your wallet to continue 🙏',
        duration: 2,
      });
      //error?.info || error?.message || error
      //console.log(error, 'Here wallet crashed')
    } finally {
      setLoading("");
    }
  }, []);

  const handleDisconnect = useCallback(() => {
    try {
      disconnectWallet();
    } catch (error: any) {
      messageApi.error(error?.info || error?.message || error);
    }
  }, []);

  const wrappedClassName = useMemo(() => {
    return twMerge(
      "flex  min-h-10 items-center text-sm sm:text-2xl ",
      className
    );
  }, [className]);

  // const wrappedStyle = useMemo(() => {
  //   return Object.assign(
  //     {},
  //     {
  //       minHeight: 40,
  //       backgroundColor: "#202020",
  //     },
  //     style
  //   );
  // }, [style]);

  const handleConnectBtnClick = useCallback(() => {
    console.log(getWalletsMetadata);
    updateSelectWalletModal({ open: true });
  }, []);

  const handleSelectWalletModalClose = useCallback(() => {
    updateSelectWalletModal({ open: false });
  }, []);

  useEffect(() => {
    if (wallet && wallet.address) {
      connectWallet(wallet.metadata);
      console.log('ricoco')
      console.log(wallet.address)
      console.log(getWalletsMetadata)
    }
  }, [wallet.address]);

  if (!wallet.address) {
    return (
      <>
        {contextHolder}
        <div className={wrappedClassName}>
          {/* <Button
            onClick={handleConnectBtnClick}
            className="btn btn3"
            ghost
            type="primary"
            style={{
              color: 'white',
              background: "linear-gradient(to right, #DA22FF 0%, #9733EE  51%, #DA22FF  100%)",
              width: "200px"
            }}
          >
            CONNECT WALLET
          </Button> */}
         {!walletState.wallet ? ( <button

                    type="submit"
                    onClick={handleConnectBtnClick}
                    style={{height: "40px", fontSize: "15px"}}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
                    >
                    CONNECT WALLET

                    </button>) : ( <button

                    type="submit"
                    onClick={handleDisconnect}
                    style={{height: "30px", backgroundColor: "", fontSize: "15px", border: "1px solid", color: "#C4C4C4", borderColor: "#C4C4C4"}}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg p-4 font-medium transition hover:bg-opacity-90"
                    >
                    Disconnect

                    </button>)}
          <Modal
            // title="Select a wallet"
            wrapClassName={cssClass['web3-modal-wrapper']}
            open={selcectWalletModal.open}
            footer={null}
            styles={{
              body: { backgroundColor: "transparent", fontFamily: "Montserrat" }, // turns the "Modal's body" to red
            }}
            onCancel={handleSelectWalletModalClose}
          >
            {/* <h5 className="hero-magic"> Select a wallet 🚀</h5> */}
            <p className="font-medium"
            style={{fontSize: "20px", color: "white", fontFamily: "Satoshi, sans-serif",}}>Select a wallet 🚀</p>
            <div style={{marginTop: "20px"}}>
              </div>
              <Row gutter={[16, 16]}>

              {getWalletsMetadata().map((item) => (

                <Col key={`wallet-${item.id}`} span={24}>
                  <Button
                    onClick={() => handleConnect(item)}
                    block
                    style={{
                      minHeight: 64,
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      color: 'white',
                      fontSize: "17px",
                      fontFamily: "inherit",
                      background: "hsla(0, 0%, 100%, .07)"
                    }}
                    loading={loading == item.id}
                  >
                    <div
                      className="flex items-center justify-between"
                      style={{
                        width: "inherit",
                      }}
                    >
                      {item.name}
                      <Image src={walletIcons[item.id]} style={{ marginLeft: "10px" }} alt="img" width="35" height="30" />


                    </div>
                  </Button>
                </Col>
              ))}
            </Row>
          </Modal>
        </div>
      </>
    );
  }

  return (
    <>
      {contextHolder}
      <div className={wrappedClassName}>
        <Text className="font-semibold inline-block mr-1.5">Wallet:</Text>
        <Text style={{ color: token.colorTextTertiary }}>
          {truncate(wallet.address)}
        </Text>
        <Button
          onClick={handleDisconnect}
          type="primary"
          ghost
          className="ml-3"
          size="small"
        >
          {wallet.address.substring(0, 25)}...:Disconnect
        </Button>
      </div>
    </>
  );
};


export default WalletConnect;

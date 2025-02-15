class BaseWallet {
  provider: any;
  icon: any;
  extensionLink: any;
  name: any;
  api: any;
  constructor(_params: any) {
    this.provider = _params.provider;
    this.icon = _params.icon;
    this.extensionLink = _params.extensionLink;
    this.name = _params.name;
  }
  async enable() {
    return (this.api = await this.provider.enable());
  }

  async isEnabled() {
    if(!this.provider) {
      return false
    }
    return await this.provider.isEnabled();
  }

  async getApi() {
    if (this.api) {
      return this.api;
    }

    // if (await this.isEnabled()) {
    //   return await this.enable();
    // }

    // return null;
  }
  async getNetworkId() {
    const api = await this.getApi();
    return await api.getNetworkId();
  }

  getMetadata() {
    return {
      icon: this.icon,
      name: this.name,
      extensionLink: this.extensionLink,
      apiVersion: this.provider?.apiVersion,
    };
  }
}
export default BaseWallet;

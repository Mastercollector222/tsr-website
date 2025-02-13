import { config } from "@onflow/fcl";

config({
  "app.detail.title": "Top Shot Rewards",
  "app.detail.icon": "https://placekitten.com/g/200/200",
  "flow.network": "mainnet",
  "accessNode.api": "https://rest-mainnet.onflow.org",
  "discovery.wallet": "https://fcl-discovery.onflow.org/authn",
  "discovery.authn.endpoint": "https://fcl-discovery.onflow.org/api/authn",
  "fcl.limit": 9999,
  "walletConnect.projectId": "c3fe93cfb86ba1ac7862101c0ad8d33d",
  "walletConnect.metadata": {
    name: 'Top Shot Rewards',
    description: 'Top Shot Rewards Platform',
    url: window.location.origin,
    icons: ['https://placekitten.com/g/200/200']
  },
  "service.WalletConnect": {
    f_type: "Service",
    f_vsn: "1.0.0",
    type: "authn",
    uid: "walletconnect",
    endpoint: "https://fcl-discovery.onflow.org/api/walletconnect/authn",
    method: "WalletConnect/v2",
    id: "c3fe93cfb86ba1ac7862101c0ad8d33d"
  }
});

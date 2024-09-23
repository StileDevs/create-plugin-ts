import { TextPacket, Peer, Client } from "growtopia.js";
import { readFileSync } from "fs";

// This used to identifies your plugins config, e.g plugin name, version, necessary dependencies & etc.
const PluginPackage = JSON.parse(readFileSync("./package.json", "utf-8"));

export class Plugin {
  public pluginConf: any;

  constructor(public client: Client) {}

  /**
   * Initialize plugin
   */
  init() {
    this.pluginConf = PluginPackage;
    console.log(`Loaded ${this.pluginConf.name} v${this.pluginConf.version}`);
  }

  /**
   * Emitted when client successfully connected to ENet server.
   * Peer state will change into CONNECTED state.
   */
  onConnect(netID: number) {
    console.log("Client connected", this.client.cache);
    const peer = new Peer(this.client, netID);
    peer.send(TextPacket.from(0x1));
  }

  /**
   * Emitted when client disconnected from the ENet server.
   * Peer state will changed, depends what type of disconnected was used.
   */
  onDisconnect(netID: number) {
    console.log("Client disconnected", this.client.cache);
  }

  /**
   * Emitted when client sending a bunch of buffer data.
   */
  onRaw(netID: number, data: Buffer) {
    console.log(`Received raw data from netID: ${netID}`, data);
  }
}

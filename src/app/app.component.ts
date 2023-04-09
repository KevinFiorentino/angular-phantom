import { Component } from '@angular/core';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { PublicKey } from '@solana/web3.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {

  public phantom?: PhantomWalletAdapter;
  public address: string = '';

  async connectWallet() {
    this.phantom = new PhantomWalletAdapter();
    await this.phantom.connect();

    if (this.phantom && this.phantom.publicKey) {
      this.address = this.phantom.publicKey.toString();
      this.listeningChangeWallet();
    }
  }

  async disconnectWallet() {
    this.address = '';
    await this.phantom?.disconnect();
  }

  listeningChangeWallet() {
    /* (window as any).solana.on('accountChanged', (publicKey: PublicKey) => {
      this.address = publicKey.toString();
      console.log('Change Address:', this.address)
    }); */
    this.phantom?.on('connect', (publicKey) => {
      this.address = publicKey.toString();
      console.log('Change Address:', this.address)
    });
  }

}

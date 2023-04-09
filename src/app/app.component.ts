import { Component } from '@angular/core';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {

  public address: string = '';
  public phantom?: PhantomWalletAdapter;

  async connectWallet() {
    this.phantom = new PhantomWalletAdapter();
    await this.phantom.connect();

    if (this.phantom && this.phantom.publicKey) {
      this.address = this.phantom.publicKey.toString();
      this.listeningChangeWallet();
    }
  }

  async disconnectWallet() {
    await this.phantom?.disconnect();
    this.address = '';
  }

  listeningChangeWallet() {
    this.phantom?.on('connect', (publicKey) => {
      if (publicKey) {
        this.address = publicKey.toString();
        console.log('New Address', this.address)
      }
    });
  }

}

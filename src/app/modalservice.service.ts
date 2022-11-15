import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalserviceService {

  isActive: boolean = false;
  modal: boolean = false
  resolve?: (value?: (any | PromiseLike<any>)) => void
  reject?: (reason?: any) => void

  constructor() {
  }

  checkActive() {
    if (this.isActive === false) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }


  async ask() {
    this.checkActive()
    return new Promise<string | undefined>((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    });

  }

}

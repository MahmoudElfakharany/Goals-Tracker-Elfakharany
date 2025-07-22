import { Injectable, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastr = inject(ToastrService); // Use Angular's inject function

  success(message: string, title: string = 'Success') {
    this.toastr.success(message, title, { timeOut: 6000 });
  }

  error(message: string, title: string = 'Error') {
    this.toastr.error(message, title, { timeOut: 6000 });
  }

  warning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title, { timeOut: 6000 });
  }

  info(message: string, title: string = 'Info') {
    this.toastr.info(message, title, { timeOut: 6000 });
  }
}

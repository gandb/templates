import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  getCurrentDate(): string {
    // Se estiver no servidor, gera a data atual
    if (isPlatformServer(this.platformId)) {
      const today = new Date();
      return this.formatDate(today);
    }
    
    // Se estiver no cliente, usa a data do sistema do cliente
    const today = new Date();
    return this.formatDate(today);
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  }
}
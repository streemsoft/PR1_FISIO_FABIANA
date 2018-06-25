import { CurrencyMaskModule } from 'ng2-currency-mask';
import { FinanceiroFireService } from './financeiro-fire.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ToastModule } from 'ng2-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { FinanceiroRoutes } from './financeiro.routing';
import { BoletosComponent } from './boletos/boletos.component';
import { FaturamentoComponent } from './faturamento/faturamento.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { VendasComponent } from './vendas/vendas.component';


@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(FinanceiroRoutes),
    ToastModule.forRoot(),
    NgxMaskModule.forRoot(),
    CurrencyMaskModule
  ],
  declarations: [BoletosComponent, FaturamentoComponent, EstoqueComponent, VendasComponent ],
  providers: [FinanceiroFireService]
})
export class FinanceiroModule { }

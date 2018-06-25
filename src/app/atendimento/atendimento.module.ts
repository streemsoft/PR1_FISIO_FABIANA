import { AtendimentoFireService } from './atendimento-fire.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ToastModule } from 'ng2-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { AtendRouterComponent } from './atend-router/atend-router.component';
import { AtendimentoRoutes } from './atendimento.routing';
import { ProntuariosComponent } from './prontuarios/prontuarios.component';
import { AnamneseComponent } from './anamnese/anamnese.component';
import { SessoesComponent } from './sessoes/sessoes.component';
import { FaturasComponent } from './faturas/faturas.component';
import { RecibosComponent } from './recibos/recibos.component';
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(AtendimentoRoutes),
    ToastModule.forRoot(),
    NgxMaskModule.forRoot(),
    CurrencyMaskModule
  ],
  declarations: [AtendRouterComponent, ProntuariosComponent, AnamneseComponent, SessoesComponent, FaturasComponent, RecibosComponent],
  providers:[AtendimentoFireService]
})
export class AtendimentoModule { }

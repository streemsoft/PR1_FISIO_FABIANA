import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ToastModule } from 'ng2-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { PacientesFireService } from './pacientes-fire.service';
import { PacientesRoutes } from './pacientes.routing';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ManutencaoComponent } from './manutencao/manutencao.component';
import { BuscaComponent } from './busca/busca.component';
import { BuscaFinanceiroComponent } from './busca-financeiro/busca-financeiro.component';
import { BuscaAtendimentoComponent } from './busca-atendimento/busca-atendimento.component';
import { BuscaAgendComponent } from './busca-agend/busca-agend.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(PacientesRoutes),
    ToastModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  declarations: [CadastroComponent, ManutencaoComponent, BuscaComponent, BuscaFinanceiroComponent, BuscaAtendimentoComponent, BuscaAgendComponent],
  providers:[PacientesFireService]
})
export class PacientesModule { }

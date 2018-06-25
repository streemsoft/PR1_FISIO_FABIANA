import { AgendamentoFireService } from './agendamento-fire.service';
import { AgendamentoRoutes } from './agendamento.routing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ToastModule } from 'ng2-toastr';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {NgxMaskModule} from 'ngx-mask';
import { ConsultaComponent } from './consulta/consulta.component';
import { CadastroComponent } from './cadastro/cadastro.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild(AgendamentoRoutes),
    ToastModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxDatatableModule,
    Ng2SmartTableModule
  ],
  declarations: [ConsultaComponent, CadastroComponent],
  providers:[AgendamentoFireService]
})
export class AgendamentoModule { }

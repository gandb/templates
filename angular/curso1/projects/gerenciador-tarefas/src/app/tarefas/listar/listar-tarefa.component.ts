import { Component, OnInit } from '@angular/core';
import { Tarefa, TarefaService } from '../shared';

@Component({
  selector: 'app-listar-tarefa',
  templateUrl: './listar-tarefa.component.html',
  styleUrls: ['./listar-tarefa.component.scss']
})
export class ListarTarefaComponent implements OnInit {

  tarefas:Tarefa[];

  constructor(private tarefaService:TarefaService) {

  }

  ngOnInit(): void {
    this.tarefas = this.tarefaService.listarTodos();
  }

  remover($event:MouseEvent|KeyboardEvent,tarefa:Tarefa):void{
    $event.preventDefault();
    if(confirm('Deseja remover a tarefa' + tarefa.nome + '?'))
    {
      this.tarefaService.remover(tarefa.id);
      this.tarefas = this.tarefaService.listarTodos();
    }
  }

  alterarStatus(tarefa:Tarefa):void{
    this.tarefaService.alterarStatus(tarefa.id);
    tarefa.concluida = !tarefa.concluida;
  }

}

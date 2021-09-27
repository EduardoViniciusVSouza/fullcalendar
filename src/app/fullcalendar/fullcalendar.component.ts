import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import ptbrLocale from '@fullcalendar/core/locales/pt-br'

import { AuthService } from '../services/auth.service';
import { EventInterface } from '../interfaces/EventInterface';
import { CriarEventoModalComponent } from '../criar-evento-modal/criar-evento-modal.component';
import { ViewEventComponent } from '../view-event/view-event.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-fullcalendar',
  templateUrl: './fullcalendar.component.html',
  styleUrls: ['./fullcalendar.component.css']
})
export class FullcalendarComponent implements OnInit {

  events: EventInterface[]
  formattedEvent: any[] = []
  selectedEvent: EventInterface
  eventListColumns = ['Data', 'Evento', 'Duration']

  // objeto com as opções do full calendar do angular material,
  // é injetado na declaração do full calendar no html
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    eventClick: this.handleEventSelect.bind(this),
    dateClick: this.handleDateclick.bind(this),
    events: this.formattedEvent,
    locale: ptbrLocale,
  }

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ) { }

  // utiliza função para pegar os eventos do usuário, para aplicar na página ao logar
  ngOnInit(): void {
    this.getEvents()
  }
  
  // metódo para pegar os dados do evento escolhido, e abrir um dialog com esses dados,
  // é chamado ao clicar em um evento no calendário
  handleEventSelect(arg) {
    const eventData = this.authService.getEvent(arg.event.id).subscribe(
      (res) => {
        const dialog = this.dialog.open(ViewEventComponent, {
          width: '600px', height: '400px',
          data: {
            eventId: res.eventId,
            title: res.title,
            description: res.description,
            date: res.date,
            startTime: res.startTime,
            finishTime: res.finishTime
          }
        })

        // após o dialog ser fechado, pega os eventos do usuário 
        dialog.afterClosed().subscribe(() => {
          this.getEvents()
        })
      }
    )
  }

  // método para abrir dialog de criação de evento,
  // chamado quando usuário clica em alguma data
  handleDateclick(arg) {
    const date = arg.dateStr
    const dialog = this.dialog.open(CriarEventoModalComponent, { width: '600px', height: '400px', data: { date: date } })

    // quando dialog for fechado, é usado função para atualizar os eventos
    return dialog.afterClosed().subscribe(() => {
      this.getEvents()
    })
  }

  // função para pegar os eventos relacionados ao usuário, utiliza o authService para realizar o get
  getEvents(): void {
    this.authService.getEvents().subscribe((res) => {
      this.formattedEvent = []
      this.events = res

      res.forEach((item) => {
        this.formattedEvent.push({ id: item.eventId, title: item.title, date: item.date })
      })

      this.calendarOptions.events = this.formattedEvent
    })
  }



}

import { Injectable } from '@angular/core';

import { EventInterface } from '../interfaces/EventInterface';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

//fazer modulo de configuração para urls
const AUTH_API = 'http://localhost:8000/api'

const httpOptions = {
  headers: new HttpHeaders({'Content-Type' : 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // função para realizar um post enviando os dados de login para o servidor
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/auth/signin', {
      username,
      password
    }, httpOptions)
  }

  // função para realizar um post, enviando os dados para registrar um usuário
  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + '/register/signup', {
      username,
      email,
      password
    }, httpOptions)
  }

  // função para adicionar o Token jwt no headers, para a autorização no lado do servidor
  changeHeaders(): void {
    const token = localStorage.getItem('token')

    httpOptions.headers = new HttpHeaders({
      'x-acess-token' : token,
      'Content-Type' : 'application/json'
    })
  }

  // realiza post na rota de criar um evento com os dados recebidos como parametro,
  // enviando token para autorização
  createEvent(eventInfo: EventInterface): Observable<any> {
    this.changeHeaders()
    
    return this.http.post(AUTH_API + '/authorization/createEvent', eventInfo, httpOptions)
  }

  // envia um update pro servidor, enviando os dados necessários para o update 
  updateEvent(eventInfo: EventInterface): Observable<any> {
    this.changeHeaders()
    
    // envia o id do evento a ser atualizado, na url
    return this.http.put(AUTH_API + `/authorization/updateEvent/${eventInfo.eventId}`, eventInfo, httpOptions)
  }

  // envia um delete, com o id do evento a ser deletado
  removeEvent(eventId: number) {
    this.changeHeaders()
    
    return this.http.delete(AUTH_API + `/authorization/deleteEvent/${eventId}`, httpOptions)
  }

  // get para pegar todos eventos relacionados ao perfil logado, pelo jwt
  getEvents(): Observable<EventInterface[]> {
    this.changeHeaders()
    
    return this.http.get<EventInterface[]>(AUTH_API + '/authorization/getEvents', httpOptions)
  }

  // get para retornar apenas um evento relacionado ao perfil logado
  getEvent(eventId: number): Observable<EventInterface> {
    this.changeHeaders()
    return this.http.get<EventInterface>(AUTH_API + `/authorization/getEvent/${eventId}`, httpOptions)
  }
}

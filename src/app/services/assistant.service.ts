import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, UserQuestion} from "../interfaces/assistant";
import * as myglobals from '../globals';
import {apiCaregiver} from "../interfaces/caregivers";

const urlDem = myglobals.URL_DEM;
@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  constructor(private http: HttpClient) { }

  userQuestion(question: UserQuestion): Observable<Message> {
    const userQuestion: UserQuestion = {
      question: question.question,
      threadId: question.threadId.replace(/(^"|"$)/g, '')
    }
    return this.http.post<Message>(`${urlDem}/assistant/user-question`, { userQuestion } );
  }

  getMessagesByThreadId(thread: string): Observable<Message[]> {
    const threadId = thread.replace(/(^"|"$)/g, '')
    return this.http.get<any[]>(`${urlDem}/assistant/thread-messages/${threadId}`)
  }
}

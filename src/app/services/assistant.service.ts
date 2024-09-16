import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message, UserQuestion} from "../interfaces/assistant";
import * as myglobals from '../globals';

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
    console.log(userQuestion);
    return this.http.post<Message>(`${urlDem}/assistant/user-question`, { userQuestion } );
  }
}

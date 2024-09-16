import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent} from "@ionic/angular";
import {Message, UserQuestion} from "../../interfaces/assistant";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from "../../utils/custom-validators";
import {Caregiver} from "../../interfaces/caregivers";
import {AssistantService} from "../../services/assistant.service";

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.page.html',
  styleUrls: ['./assistant.page.scss'],
})
export class AssistantPage implements OnInit {
  @ViewChild(IonContent, {static: false}) content!: IonContent;

  messages: Message[] = [];
  relationWithPatient: string | undefined = "";
  private caregiver?: Caregiver;
  threadId: string = localStorage.getItem('threadId') || "";

  form = new FormGroup({
    prompt: new FormControl('', [Validators.required, CustomValidators.noWhiteSpace])
  })

  loading: boolean = false;

  constructor(private assistantService: AssistantService) {
  }

  submit() {

    if (this.form.valid) {
      let prompt = this.form.value.prompt as string;

      let userMsg: Message = {role: 'me', content: prompt}
      this.messages.push(userMsg);

      let botMsg: Message = {role: 'bot', content: ''}
      this.messages.push(botMsg);

      this.scrollToBottom();
      this.form.reset();
      this.form.disable();

      this.loading = true;
      const userQuestion: UserQuestion = {
        threadId: this.threadId,
        question: prompt
      }

      this.assistantService.userQuestion(userQuestion).subscribe({
        next: (res: any) => {
          this.loading = false;
          this.typeText(res.bot)
          this.form.enable();
        }, error: (error: any) => {
          console.log(error);
        },
      })
    }
  }

  typeText(text: string) {
    let textIndex = 0;
    let messagesLastIndex = this.messages.length - 1;

    let interval = setInterval(() => {
      if (textIndex < text.length) {
        this.messages[messagesLastIndex].content += text.charAt(textIndex);
        textIndex++;
      } else {
        clearInterval(interval);
        this.scrollToBottom();
      }
    }, 15)
  }

  scrollToBottom() {
    this.content.scrollToBottom(2000);
  }

  ngOnInit(): void {
    this.caregiver = this.getCaregiver();
    this.relationWithPatient = this.caregiver?.relation;
  }

  private getCaregiver() {
    const caregiverData = localStorage.getItem('caregiver');
    if (caregiverData) {
      return JSON.parse(caregiverData);
    }
  }

}

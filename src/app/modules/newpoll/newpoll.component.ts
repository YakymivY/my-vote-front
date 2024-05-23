import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-newpoll',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newpoll.component.html',
  styleUrl: './newpoll.component.css'
})
export class NewpollComponent {

  surveyTitle: string = '';
  surveyDescription: string = '';
  inputValues: string[] = ['', ''];

  constructor(private http: HttpClient, private router: Router, private service: SharedService) { }

  addOption(): void {
    this.inputValues.push('');
  }

  removeOption(i: number): void {
    this.inputValues.splice(i, 1);
  }

  inputChange(event: any, i: number): void {
    this.inputValues[i] = event.target.value;
  }

  createPoll(): void {
    const surveyTitle = this.surveyTitle;
    const surveyDescription = this.surveyDescription;
    const options = this.inputValues;

    try {
      this.http.post('https://my-vote-6-3.onrender.com/newpoll/add-voting', { surveyTitle, surveyDescription, options }).subscribe(
        (response: any) => {
          this.router.navigate([response.redirect]);
        },
        (error: any) => {
          if (error.status === 401) {
            this.service.triggerShowAlert('Not authorized. Please log in');
          } else {
            this.service.triggerShowAlert('Something went wrong');
          }
        }
      );
      } catch (error: any) {
        this.service.triggerShowAlert(error.message);
      }
  }
}

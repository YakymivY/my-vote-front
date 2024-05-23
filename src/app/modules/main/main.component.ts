import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent implements OnInit {

  votings: any = [];

  constructor(private http: HttpClient, private service: SharedService) { }

  ngOnInit(): void {
    try {
      this.http.get("https://my-vote-6-5.onrender.com").subscribe(
        (response: any) => {
          this.votings = response.votings;
        },
        (error) => {
          this.service.triggerShowAlert('Error fetching data');
        }
      );
      } catch (error: any) {
        this.service.triggerShowAlert(error.message);
      }
  }
}

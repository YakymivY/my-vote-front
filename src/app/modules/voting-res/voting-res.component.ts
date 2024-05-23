import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-voting-res',
  standalone: true,
  imports: [],
  templateUrl: './voting-res.component.html',
  styleUrl: './voting-res.component.css'
})
export class VotingResComponent implements OnInit {

  id: any;
  voting: any = {};
  candidates: any = {};

  constructor (private http: HttpClient, private route: ActivatedRoute, private service: SharedService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    try {
      this.http.get('https://my-vote-6-5.onrender.com/voting/' + this.id + '/res').subscribe(
        (response: any) => {
          this.candidates = response.candidates;
          this.voting = response.voting;
        },
        (error) => {
          this.service.triggerShowAlert('Error fetching data');
        }
      );
    } catch (error: any) {
      this.service.triggerShowAlert(error.message);
    }
  }

  async copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      this.service.triggerShowAlert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link ', err);
    }
  }
}

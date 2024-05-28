import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-voting',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.css'
})

export class VotingComponent implements OnInit {

  id: string | null = '';
  candidates: any = [];
  voting: any = [];
  vote: any = null;
  userId: string = '';
  voteAnswer: number | null = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private service: SharedService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    try {
      this.http.get('https://my-vote-6-6.onrender.com/voting/' + this.id).subscribe(
        (response: any) => {
          this.candidates = response.candidates;
          this.vote = response.vote;
          this.voting = response.voting;
          this.userId = response.userId;
        },
        (error) => {
          this.service.triggerShowAlert('Error fetching data');
        }
      );
    } catch (error: any) {
      this.service.triggerShowAlert(error.message);
    }
  }

  onVote(): void {
    if (this.voteAnswer === null) {
      this.service.triggerShowAlert('No candidate selected!');
      return;
    }
    try {
      this.http.post('https://my-vote-6-6.onrender.com/voting/' + this.id + '/vote', { candidateId: this.voteAnswer }).subscribe(
        (response: any) => {
          this.service.triggerShowAlert('Voted successfully');
          setTimeout(() => {
            location.reload();
          }, 1000);
        },
        (error) => {
          this.service.triggerShowAlert('Error: Failed to cast vote');
        }
      );
    } catch (error: any) {
      this.service.triggerShowAlert(error.message);
    }
  }

  retractVote(): void {
    try {
      this.http.post('https://my-vote-6-6.onrender.com/voting/' + this.id + '/retract', {}).subscribe(
        (response: any) => {
          this.service.triggerShowAlert('Vote has been retracted');
          setTimeout(() => {
            location.reload();
          }, 1000);
        },
        (error) => {
          this.service.triggerShowAlert('Error: Could not retract the vote');
        }
      );
    } catch (error: any) {
      this.service.triggerShowAlert(error.message);
    }
  }

  deleteVoting(): void {
    try {
      this.http.delete('https://my-vote-6-6.onrender.com/voting/' + this.id).subscribe(
        (response: any) => {
          this.service.triggerShowAlert('This vote is deleted');
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1000);
        },
        (error) => {
          this.service.triggerShowAlert('Something went wrong');
        }
      );
    } catch (error: any) {
      this.service.triggerShowAlert(error.message);
    }
  }

  closeVoting(): void {
    try {
      this.http.put('https://my-vote-6-6.onrender.com/voting/' + this.id + '/close', {}).subscribe(
        (response: any) => {
          this.service.triggerShowAlert('This voting is now closed');
          setTimeout(() => {
            location.reload();
          }, 1000);
        },
        (error) => {
          this.service.triggerShowAlert('Something went wrong');
        }
      );
    } catch (error: any) {
      this.service.triggerShowAlert(error.message);
    }
  }

  openVoting(): void {
    try {
      this.http.put('https://my-vote-6-6.onrender.com/voting/' + this.id + '/open', {}).subscribe(
        (response: any) => {
          this.service.triggerShowAlert('This voting is now opened');
          setTimeout(() => {
            location.reload();
          }, 1000);
        },
        (error) => {
          this.service.triggerShowAlert('Something went wrong');
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

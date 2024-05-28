import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})

export class MainComponent implements OnInit {

  votings: any = [];
  next: any = null;
  currentPage: number = 1;
  limit: number = 3;

  statusActive: boolean = false;
  statusClosed: boolean = false;
  statusLine: string = '';

  constructor(private http: HttpClient, private service: SharedService) { }

  ngOnInit(): void {
    this.getVotings();
  }

  getVotings(): void {
    try {
      this.http.get("https://my-vote-6-6.onrender.com?page=" + this.currentPage + "&limit=" + this.limit + this.statusLine).subscribe(
        (response: any) => {
          this.votings = response.results.results;
          this.next = response.results.next;
          this.statusLine = '';
        },
        (error) => {
          this.service.triggerShowAlert('Error fetching data');
        }
      );
    } catch (error: any) {
      this.service.triggerShowAlert(error.message);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getVotings();
    }
  }

  nextPage(): void {
    if (this.next.left > 0) {
      this.currentPage++;
      this.getVotings();
    }
  }

  filterVotings(): void {
    if (this.statusActive) {
      this.statusLine += '&status=active';
    }
    if (this.statusClosed) {
      this.statusLine += '&status=closed';
    }
    this.getVotings();
  }
}

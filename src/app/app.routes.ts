import { Routes } from '@angular/router';
import { MainComponent } from './modules/main/main.component';
import { NewpollComponent } from './modules/newpoll/newpoll.component';
import { VotingComponent } from './modules/voting/voting.component';
import { VotingResComponent } from './modules/voting-res/voting-res.component';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';

export const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'newpoll', component: NewpollComponent },
    { path: 'voting/:id', component: VotingComponent },
    { path: 'voting/:id/res', component: VotingResComponent },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent }
];
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingResComponent } from './voting-res.component';

describe('VotingResComponent', () => {
  let component: VotingResComponent;
  let fixture: ComponentFixture<VotingResComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingResComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VotingResComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

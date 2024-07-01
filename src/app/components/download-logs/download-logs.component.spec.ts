import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadLogsComponent } from './download-logs.component';

describe('DownloadLogsComponent', () => {
  let component: DownloadLogsComponent;
  let fixture: ComponentFixture<DownloadLogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadLogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

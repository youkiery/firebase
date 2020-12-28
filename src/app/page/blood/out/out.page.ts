import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-out',
  templateUrl: './out.page.html',
  styleUrls: ['./out.page.scss'],
})
export class OutPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() { }
}

import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-kaimin',
  templateUrl: './kaimin.page.html',
  styleUrls: ['./kaimin.page.scss'],
})
export class KaiminPage implements OnInit {

  constructor(
    public rest: RestService
  ) { }

  ngOnInit() {
  }

}

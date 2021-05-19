import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.page.html',
  styleUrls: ['./insert.page.scss'],
})
export class InsertProfile implements OnInit {
  public customer = ''
  public sampleid = ''
  public address = ''
  public name = ''
  public weight = ''
  public age = ''
  public gender = ''
  public type = ''
  public sampleid2 = ''
  public serial = ''
  public sampletype = ''
  public samplenumber = ''
  public samplesymbol = ''
  public samplestatus = ''
  public doctor = ''
  public time = ''
  public sgot = ''
  public sgpt = ''
  public ure = ''
  public cre = ''
  public alb = ''
  public pro = ''
  public bilit = ''
  public bilid = ''
  public alp = ''
  public lipase = ''
  public amy = ''
  public ckmb = ''
  public canxi = ''
  public ag = ''
  constructor(
    public rest: RestService,
    public modal: ModalController
  ) { }

  ngOnInit() {
  }

  public insert() {
    this.rest.check({
      action: 'profile-insert',
      customer: this.customer,
      sampleid: this.sampleid,
      address: this.address,
      name: this.name,
      weight: this.weight,
      age: this.age,
      gender: this.gender,
      type: this.type,
      serial: this.serial,
      sampletype: this.sampletype,
      samplenumber: this.samplenumber,
      samplesymbol: this.samplesymbol,
      samplestatus: this.samplestatus,
      doctor: this.doctor,
      sgot: this.sgot,
      sgpt: this.sgpt,
      ure: this.ure,
      cre: this.cre,
      alb: this.alb,
      pro: this.pro,
      bilit: this.bilit,
      bilid: this.bilid,
      alp: this.alp,
      lipase: this.lipase,
      amy: this.amy,
      ckmb: this.ckmb,
      canxi: this.canxi,
      ag: this.ag
    }).then(response => {
      let data = [response.data]
      this.rest.profile.list = data.concat(this.rest.profile.list)
      this.modal.dismiss()
      this.rest.defreeze('load')
    }, () => {
      this.rest.defreeze('load')
    })
  }
}

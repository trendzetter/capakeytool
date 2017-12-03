import { Component, Input, OnChanges, OnInit }       from '@angular/core';
import { FormControl, FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";;
import { ToasterService } from 'angular2-toaster/angular2-toaster';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';


import { Parcel, Requester, Municipality, Department, MunicipalitiesData, DepartmentsData, SectionData, ParcelData, Section, requesters } from './data-model';
import { RequesterService }           from './requester.service';
import { GeoService } from './geo.service';

@Component({
  selector: 'app-requester-detail',
  templateUrl: './requester-detail.component.html'
})
export class RequesterDetailComponent implements OnChanges, OnInit {
  @Input() requester: Requester;

  requesterForm: FormGroup;
  public message: string;
  public municipalities: Municipality[];
  public departments: Department[];
  public sections: Section[];
  public parcels: Object[];
  private municipality: string;
  private department: string;
  private section: string;
  private capakey: string;
  private currentRequester: number;

  constructor(
    private fb: FormBuilder,
    private requesterService: RequesterService,
    private geoService: GeoService,
    private toasterService: ToasterService,
    private slimLoadingBarService: SlimLoadingBarService,
    private _sanitizer: DomSanitizer) {

    this.createForm();
  }

  autocompleMunicipalityFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.municipalityName}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  autocompleDepartmentFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.departmentName}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  autocompleSectionFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.sectionCode}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  autocompleParcelFormatter = (data: any) : SafeHtml => {
    let html = `<span>${data.perceelnummer}</span>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }

  parcelSelected(event: Parcel) {
    if(!event.capakey) return;
        console.log('capakey: '+ event.capakey);
    this.capakey = event.capakey;
  }

  sectionSelected(event: Section, i: number) {
    if(!event.sectionCode) return;
    console.log('sectionCode: '+ event.sectionCode);
    this.geoService
    .getParcels<ParcelData>(event.sectionCode,this.department, this.municipality)
    .subscribe((data: ParcelData) => this.parcels = data.parcels,
    error => () => {
      console.log('this.departments'+JSON.stringify(this.departments));
      this.toasterService.pop('error', 'Damn', 'Something went wrong...');
    },
    () => {
      console.log('this.departments'+JSON.stringify(this.departments));
      this.toasterService.pop('success', 'Complete', 'Getting all values complete');
      this.slimLoadingBarService.complete();
      this.parcelArray.at(i).get('capakey').enable();
    });
    this.section = event.sectionCode;
  }

  departmentSelected(event: Department, i: number) {
    if(!event.departmentCode) return;
    console.log('departmentCode: '+ event.departmentCode);
    this.geoService
    .getSections<SectionData>(event.departmentCode, this.municipality)
    .subscribe((data: SectionData) => this.sections = data.sections,
    error => () => {
      console.log('this.departments'+JSON.stringify(this.departments));
      this.toasterService.pop('error', 'Damn', 'Something went wrong...');
    },
    () => {
      console.log('this.departments'+JSON.stringify(this.departments));
      this.toasterService.pop('success', 'Complete', 'Getting all values complete');
      this.slimLoadingBarService.complete();
      this.parcelArray.at(i).get('section').enable();
      this.parcelArray.at(i).get('capakey').disable();
    });
    this.department = event.departmentCode;
    this.parcels = null;
  }

  municipalitySelected(event: Municipality, i: number) {
    if(!event.municipalityCode) return;
    console.log('municipality: '+ event.municipalityCode);
    this.geoService
    .getDepartments<DepartmentsData>(event.municipalityCode)
    .subscribe((data: DepartmentsData) => this.departments = data.departments,
    error => () => {
      this.toasterService.pop('error', 'Damn', 'Something went wrong...');
    },
    () => {
      this.toasterService.pop('success', 'Complete', 'Getting all values complete');
      this.slimLoadingBarService.complete();
      this.parcelArray.at(i).get('department').enable();
      this.parcelArray.at(i).get('section').disable();
      this.parcelArray.at(i).get('capakey').disable();
    });
    this.municipality = event.municipalityCode;
    this.sections = null;
    this.parcels = null;
  }

  ngOnInit() {
    this.geoService
    .getMunicipalities<MunicipalitiesData>()
    .subscribe((data: MunicipalitiesData) => this.municipalities = data.municipalities,
    error => () => {
      console.log('this.municipals'+JSON.stringify(this.municipalities));
      this.toasterService.pop('error', 'Damn', 'Something went wrong...');
    },
    () => {
      console.log('this.municipals'+JSON.stringify(this.municipalities));
      this.toasterService.pop('success', 'Complete', 'Getting all values complete');
      this.slimLoadingBarService.complete();

    });
  }


  createForm() {
    this.requesterForm = this.fb.group({
      name: '',
      street: '',
      city: '',
      zip: '',
      parcelArray: this.fb.array([])
    });
  }

  ngOnChanges() {
    if(this.currentRequester){
      this.requesterService.updateRequester(this.prepareSaveRequester()).subscribe();
    }

    this.requesterForm.reset({
      name: this.requester.name,
      street: this.requester.street,
      city: this.requester.city,
      zip: this.requester.zip
    });
    this.setParcels(this.requester.parcels);
    this.currentRequester = this.requester.id;
  }

  get parcelArray(): FormArray {
    return this.requesterForm.get('parcelArray') as FormArray;
  };

  setParcels(parcels: Parcel[]) {
    const parcelFGs = parcels.map(parcel => this.fb.group(parcel));
    const parcelFormArray = this.fb.array(parcelFGs);
    this.requesterForm.setControl('parcelArray', parcelFormArray);
  }

  addParcel() {
    console.log('addparcel!')
    let group = this.fb.group(new Parcel());
    group.disable();

    if(group.get('municipality')){
      group.get('municipality').enable();
    }

    this.parcelArray.push(group);
  }

  prepareSaveRequester(): Requester {
    const formModel = this.requesterForm.value;

    //retain only the parcels that have all info
    let parcelArrayDeepCopy: Parcel[] = [];
    formModel.parcelArray.forEach((parcel: Parcel) =>  {
      if(parcel.capakey) {
        console.log('capakey: '+parcel.capakey);
        parcelArrayDeepCopy.push(parcel);
      }
    });

    // return new `Requester` object containing a combination of original requester value(s)
    // and deep copies of changed form model municipalities
    const saveRequester: Requester = {
      id: this.currentRequester,
      name: formModel.name as string,
      street : formModel.street as string,
      city : formModel.city as string,
      zip : formModel.zip as string,
      // addresses: formModel.parcelArray // <-- bad!
      parcels: parcelArrayDeepCopy
    };
    return saveRequester;
  }

}

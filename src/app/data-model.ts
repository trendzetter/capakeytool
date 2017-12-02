export class Hero {
  id = 0;
  name = '';
  addresses: Address[];
}

export class Address {
  street = '';
  city   = '';
  state  = '';
  zip    = '';
}

export class Requester {
  id = 0;
  name = '';
  street = '';
  city   = '';
  zip    = '';
  parcels: Parcel[];
}

export class Parcel {
  municipality = '';
  department = '';
  section = '';
  capakey = '';
}

export class Municipality {
  municipalityName = '';
  municipalityCode = '';
}

export class Department {
  departmentName = '';
  departmentCode = '';
}

export class Section {
  sectionCode = '';
}




export class MunicipalitiesData {
  municipalities: Municipality[] = []
}

export class DepartmentsData {
  departments: Department[] = []
}

export class SectionData {
  sections: Section[] = []
}

export class ParcelData {
  parcels = []
}

export const requesters: Requester[] = [
  {
    id: 1,
    name: 'Joris Willems',
    street: 'Smalle heerweg 156',
    city: 'Lochristi',
    zip: '9080',
    parcels: []
  }
];

export const heroes: Hero[] = [
  {
    id: 1,
    name: 'Whirlwind',
    addresses: [
      {street: '123 Main',  city: 'Anywhere', state: 'CA',  zip: '94801'},
      {street: '456 Maple', city: 'Somewhere', state: 'VA', zip: '23226'},
    ]
  },
  {
    id: 2,
    name: 'Bombastic',
    addresses: [
      {street: '789 Elm',  city: 'Smallville', state: 'OH',  zip: '04501'},
    ]
  },
  {
    id: 3,
    name: 'Magneta',
    addresses: [ ]
  },
];

export const states = ['CA', 'MD', 'OH', 'VA'];

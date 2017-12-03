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

export class Perceel {
  perceelnummer = '';
  capakey = '';
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
  parcels: Perceel[] = []
}

export const requesters: Requester[] = [
  {
    id: 1,
    name: 'Vogelbescherming Vlaanderen',
    street: 'Walburgstraat 37',
    city: 'Sint-Niklaas',
    zip: '9100',
    parcels: []
  }
];

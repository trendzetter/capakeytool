import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server = 'http://geoservices.informatievlaanderen.be/';
    public ApiUrl = 'capakey/api/v1/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}

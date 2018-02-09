import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL_API, ETHEREUM_API } from "../../constants/api.conf";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
  }

  global() {
    return this.http.get(GLOBAL_API).toPromise();
  }

  ethereum() {
    return this.http.get(ETHEREUM_API).toPromise();
  }

}

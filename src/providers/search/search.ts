import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as algoliasearch from "algoliasearch";
import { ALGOLIA_ID, ALGOLIA_SEARCH_KEY } from "../../constants/algolia.conf";

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_SEARCH_KEY, { protocol: 'https:', httpAgent: true });

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {

  constructor() {
  }

  search(indexName: string, query: string, limit: number, numericFilters?: any[]): Observable<string[]> {
    let index = client.initIndex(indexName);
    return new Observable((observer) => {
      index.search({
        query: query,
        numericFilters: numericFilters,
        hitsPerPage: limit,
        allowTyposOnNumericTokens: false,
      }).then(responses => {
        let hits: any[] = responses.hits;
        let objectIDs = [];
        hits.forEach(hit => {
          objectIDs.push(hit.objectID);
        });
        observer.next(objectIDs);
      }).catch(error => {
        observer.next([]);
      });
    }) as Observable<string[]>;
  }

  ICOOverviews(query: string, limit: number) {
    return this.search('ICOOverviews', query, limit);
  }

  ICORatings(query: string, limit: number) {
    return this.search('ICORatings', query, limit);
  }

  ICOPasses(query: string, limit: number) {
    return this.search('ICOPasses', query, limit);
  }

  Types(query: string) {
    let limit = 100;
    return this.search('types', query, limit);
  }

  Audiences(query: string) {
    let limit = 100;
    return this.search('audiences', query, limit);
  }

}

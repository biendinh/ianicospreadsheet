import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryFn } from 'angularfire2/firestore';

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface AUDIENCE {
  _key?: string;
  name?: string;
}

export interface TYPE {
  _key?: string;
  color?: string;
  name?: string;
  point?: number;
}

export interface USER {
  _key?: string;
  user_email: string;
  user_name?: string;
  user_picture?: string;
  user_role?: string;
}

export interface ICO {
  _key?: string;
  ico_name?: string;
  ico_url?: string;
  ico_rating?: number;
  ico_grade?: string;
  ico_largest_bonus?: number;
  ico_pre_sale_date?: number;
  ico_start_date?: number;
  ico_end_date?: number;
  ico_receive_token_date?: number;
  ico_price?: number;
  ico_tokens?: number;
  ico_total_tokens?: number;
  ico_supply?: number;
  ico_market_cap?: number;
  ico_crypto_market_cap?: number;
  ico_prototype?: string;
  ico_team?: number;
  ico_advisor?: number;
  ico_idea?: number;
  ico_community?: number;
  ico_sercurity?: string;
  ico_type?: TYPE;
  ico_audience?: AUDIENCE;
  ico_counter_part?: string;
  ico_color?: string;
  ico_ian_invested?: string;
  ico_idea_investiment_eth?: number;
  ico_idea_investiment_usd?: number;
  ico_idea_portfolio?: number;
  ico_usa_investor?: string;
  ico_ian_opinion?: string;
  ico_passed_reason?: string;
  ico_passed_date?: number;
  ico_pre_sale_status?: string;
  ico_start_in?: string;
  ico_end_in?: number;
  ico_modified_date?: number;
  is_overviewed?: boolean;
  is_passed?: boolean;
}

@Injectable()
export class FirestoreProvider {

  constructor(private fs?: AngularFirestore) {
  }

  ICOOverviews(query?: QueryFn): AngularFirestoreCollection<ICO> {
    return this.fs.collection<ICO>('ICOOverviews', query);
  }

  ICOPasses(query?: QueryFn): AngularFirestoreCollection<ICO> {
    return this.fs.collection<ICO>('ICOPasses', query);
  }

  ICORatings(query?: QueryFn): AngularFirestoreCollection<ICO> {
    return this.fs.collection<ICO>('ICORatings', query);
  }

  ICOs(query?: QueryFn): AngularFirestoreCollection<ICO> {
    return this.fs.collection<ICO>('ICOs', query);
  }

  Audiences(query?: QueryFn): AngularFirestoreCollection<AUDIENCE> {
    return this.fs.collection<AUDIENCE>('audiences', query);
  }

  Types(query?: QueryFn): AngularFirestoreCollection<TYPE> {
    return this.fs.collection<TYPE>('types', query);
  }

  AdminUsers(query?: QueryFn): AngularFirestoreCollection<USER> {
    return this.fs.collection<USER>('AdminUsers', query);
  }

}

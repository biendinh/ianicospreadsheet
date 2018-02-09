import { Component } from '@angular/core';
import { NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FirestoreProvider, ICO } from '../../providers/firestore/firestore';
import { SearchProvider } from '../../providers/search/search';
import { TabOverviewDetailPage } from '../tab-overview-detail/tab-overview-detail';

/**
 * Generated class for the TabOverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-overview',
  templateUrl: 'tab-overview.html',
})
export class TabOverviewPage {
  overviews: Observable<ICO[]>;
  limit_sub = new BehaviorSubject<number>(30);
  done_sub = new BehaviorSubject<boolean>(false);
  queryValue = new BehaviorSubject<string>(undefined);
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _fs: FirestoreProvider,
    public _search: SearchProvider
  ) {
    this.limit_sub.next(10);
    this.overviews = this.getOVerviews();
  }

  getOVerviews() {
    return Observable.combineLatest(this.queryValue, this.limit_sub).switchMap(([query, limit]) => {
      let obser: Observable<any>;
      if (!query) {
        obser = this._fs.ICOOverviews(ref => ref.orderBy('ico_rating', 'desc')).snapshotChanges().map(actions => {
          return actions.map(action => {
            return action.payload.doc.id;
          });
        });
      } else {
        obser = this._search.ICOOverviews(query, limit);
      }
      return obser.switchMap(ids => {
        let obs = ids.map(id => {
          return this._fs.ICOs().doc<ICO>(id).valueChanges().map(sn => {
            return { _key: id, ...sn };
          });
        });
        if (obs.length > 0) {
          return Observable.combineLatest(obs);
        } else {
          return new Observable<ICO[]>(sub => {
            sub.next([]);
          });
        }
      });
    }).do(overviews => {
      this.done_sub.next(overviews.length < this.limit_sub.value);
    });
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    setTimeout(() => {
      this.limit_sub.next(this.limit_sub.value + 20);
      infiniteScroll.waitFor(this.getOVerviews().toPromise());
    });
  }

  goToOverviewDetail(overview: ICO) {
    this.navCtrl.push(TabOverviewDetailPage, { overview_key: overview._key });
  }

  isNumber(v) {
    return !isNaN(Number(v));
  }

  onSearch(ev) {
    if (ev.target.value) {
      this.limit_sub.next(30);
      this.queryValue.next(ev.target.value);
    } else {
      this.limit_sub.next(30);
      this.queryValue.next(ev.target.value);
    }
  }

  ionViewWillEnter() {
    this.queryValue.next(undefined);
  }

  ionViewDidLoad() {

  }

}

import { Component } from '@angular/core';
import { NavController, NavParams, InfiniteScroll } from 'ionic-angular';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UtilProvider } from '../../providers/util/util';
import { FirestoreProvider, ICO } from '../../providers/firestore/firestore';
import { TabIcoPassedDetailPage } from '../tab-ico-passed-detail/tab-ico-passed-detail';
import { TabIcoRatingDetailPage } from '../tab-ico-rating-detail/tab-ico-rating-detail';
import { SearchProvider } from '../../providers/search/search';

/**
 * Generated class for the TabIcoRatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tab-ico-rating',
  templateUrl: 'tab-ico-rating.html',
})
export class TabIcoRatingPage {

  type: string = 'research';
  ico_ratings: Observable<ICO[]>;
  ico_passes: Observable<ICO[]>;
  ico_rating_limit_sub = new BehaviorSubject<number>(30);
  ico_rating_query_sub = new BehaviorSubject<string>(undefined);
  ico_rating_done_sub = new BehaviorSubject<boolean>(false);
  ico_passed_limit_sub = new BehaviorSubject<number>(30);
  ico_passed_query_sub = new BehaviorSubject<string>(undefined);
  ico_passed_done_sub = new BehaviorSubject<boolean>(false);

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _util: UtilProvider,
    public _fs: FirestoreProvider,
    public _search: SearchProvider
  ) {
    this.ico_ratings = this.getICORatings();
    this.ico_passes = this.getICOPasses();
  }

  getICORatings() {
    return Observable.combineLatest(this.ico_rating_query_sub, this.ico_rating_limit_sub).switchMap(([query, limit]) => {
      let obser: Observable<any>;
      if (!query) {
        obser = this._fs.ICORatings(ref => ref.orderBy('ico_modified_date', 'desc')).snapshotChanges().map(actions => {
          return actions.map(action => {
            return action.payload.doc.id;
          })
        });
      } else {
        obser = this._search.ICORatings(query, limit);
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
    }).do(ratings => {
      this.ico_rating_done_sub.next(ratings.length < this.ico_rating_limit_sub.value);
    });
  }

  doICORatingInfinite(infiniteScroll: InfiniteScroll) {
    setTimeout(() => {
      this.ico_rating_limit_sub.next(this.ico_rating_limit_sub.value + 20);
      infiniteScroll.waitFor(this.getICORatings().toPromise());
    });
  }


  getICOPasses() {
    return Observable.combineLatest(this.ico_passed_query_sub, this.ico_passed_limit_sub).switchMap(([query, limit]) => {
      let obser: Observable<any>;
      if (!query) {
        obser = this._fs.ICOPasses(ref => ref.orderBy('ico_passed_date', 'desc')).snapshotChanges().map(actions => {
          return actions.map(action => {
            return action.payload.doc.id;
          })
        });
      } else {
        obser = this._search.ICOPasses(query, limit);
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
    }).do(passes => {
      this.ico_passed_done_sub.next(passes.length < this.ico_passed_limit_sub.value);
    });
  }

  doICOPassedInfinite(infiniteScroll: InfiniteScroll) {
    setTimeout(() => {
      this.ico_passed_limit_sub.next(this.ico_passed_limit_sub.value + 20);
      infiniteScroll.waitFor(this.getICOPasses().toPromise());
    });
  }

  goToIcoRatingDetail(ico: ICO) {
    this.navCtrl.push(TabIcoRatingDetailPage, { ico_rating_key: ico._key });
  }

  goToICOPassedDetail(ico: ICO) {
    this.navCtrl.push(TabIcoPassedDetailPage, { ico_rating_key: ico._key });
  }

  onSearchICORating(ev) {
    if (ev.target.value) {
      this.ico_rating_limit_sub.next(30);
      this.ico_rating_query_sub.next(ev.target.value);
    } else {
      this.ico_rating_limit_sub.next(30);
      this.ico_rating_query_sub.next(ev.target.value);
    }
  }

  onSearchICOPassed(ev) {
    if (ev.target.value) {
      this.ico_passed_limit_sub.next(30);
      this.ico_passed_query_sub.next(ev.target.value);
    } else {
      this.ico_passed_limit_sub.next(30);
      this.ico_passed_query_sub.next(ev.target.value);
    }
  }

  ionViewWillEnter() {
    this.ico_rating_query_sub.next(undefined);
    this.ico_passed_query_sub.next(undefined);
  }

  ionViewDidLoad() {
  }

}

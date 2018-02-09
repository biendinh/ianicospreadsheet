import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular/module';
import { AppDisclamerPage } from './app-disclamer/app-disclamer';
import { AppLoginPage } from './app-login/app-login';
import { TabIcoPassedDetailPage } from './tab-ico-passed-detail/tab-ico-passed-detail';
import { TabIcoRatingPage } from './tab-ico-rating/tab-ico-rating';
import { TabIcoRatingDetailPage } from './tab-ico-rating-detail/tab-ico-rating-detail';
import { TabOverviewPage } from './tab-overview/tab-overview';
import { TabOverviewDetailPage } from './tab-overview-detail/tab-overview-detail';
import { TabsPage } from './tabs/tabs';

const PAGES = [
    AppDisclamerPage,
    AppLoginPage,
    TabIcoPassedDetailPage,
    TabIcoRatingPage,
    TabIcoRatingDetailPage,
    TabOverviewPage,
    TabOverviewDetailPage,
    TabsPage
];

@NgModule({
    declarations: PAGES,
    imports: [
        IonicModule.forRoot(PAGES)
    ],
    exports: PAGES
})
export class PagesModule { }
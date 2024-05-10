import { NgModule } from '@angular/core';
import { AcsMediaWatcherService } from '@acs/services/media-watcher/media-watcher.service';

@NgModule({
  providers: [AcsMediaWatcherService],
})
export class AcsMediaWatcherModule {
  constructor() {}
}

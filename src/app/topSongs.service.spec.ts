/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {TopSongsService} from './topSongs.service';

describe('TopSongsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopSongsService]
    });
  });

  it('should ...', inject([TopSongsService], (service: TopSongsService) => {
    expect(service).toBeTruthy();
  }));
});

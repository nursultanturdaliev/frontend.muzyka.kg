/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {TopSongsService} from './topSongs.service';
import {NewSongsService} from "./newSongs.service";

describe('NewSongsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopSongsService]
    });
  });

  it('should ...', inject([NewSongsService], (service: NewSongsService) => {
    expect(service).toBeTruthy();
  }));
});

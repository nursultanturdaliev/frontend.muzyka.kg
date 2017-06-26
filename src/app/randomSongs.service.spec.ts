/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {RandomSongsService} from "./randomSongs.service";

describe('RandomSongsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomSongsService]
    });
  });

  it('should ...', inject([RandomSongsService], (service: RandomSongsService) => {
    expect(service).toBeTruthy();
  }));
});

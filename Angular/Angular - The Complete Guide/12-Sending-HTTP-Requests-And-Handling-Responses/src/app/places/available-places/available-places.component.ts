import { Component, DestroyRef, inject, signal } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Place } from '../place.model';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent {
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(map((resData) => resData.places))
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        complete: () => this.isFetching.set(false),
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}

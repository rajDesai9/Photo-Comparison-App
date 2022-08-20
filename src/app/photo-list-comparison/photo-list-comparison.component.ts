import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Photo } from '../Interfaces/photo';
@Component({
  selector: 'app-photo-list-comparison',
  templateUrl: './photo-list-comparison.component.html',
  styleUrls: ['./photo-list-comparison.component.scss']
})
export class PhotoListComparisonComponent implements OnInit {

  public photoList: Photo[] = [];
  private offset: number = 0;
  private limit: number = 4;
  public comparisonArray: Photo[] = [];

  constructor(
    private http: HttpClient,
    private changeDetector: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.fetchPosts(this.offset, this.limit);
  }

  /**
   * 
   * @param offset : Defining the starting index point from where the photos need to be fetched
   * @param limit : Fetching limited number of photos in each request 
   */
  fetchPosts(offset: number, limit: number) {
    let photoUrl = 'https://jsonplaceholder.typicode.com/photos?';
    if (offset >= 0) {
      // Setting up URL with 4 photo ids at a time
      for (let i= offset; i < (offset + limit); i++) {
        photoUrl += (i + 1) === limit ? `id=${i + 1}` : `id=${i + 1}&`;
      }
      this.offset += limit;
    }
    this.http.get(photoUrl).subscribe((posts: Photo[]) => {
      if (posts && posts.length > 0) {
        if (!this.photoList) {
          this.photoList = [];
        }
        this.photoList = [...this.photoList, ...posts];
      }
    }, err => {
      alert('Error in fetching Data')
    })
  }

  loadMorePhotos() {
    this.fetchPosts(this.offset, this.limit);
  }

  addPhotoToCompare(photoIndex: number, photoId: number) {
    if (photoIndex !== -1 && this.photoList[photoIndex] && this.photoList[photoIndex].id === photoId) {
      const result = Object.assign({}, this.photoList[photoIndex]);
      const photoExistInComparison = this.comparisonArray.filter((photo) => photo.id === result.id)
      if (photoExistInComparison.length > 0) {
        alert('Error: Photo already exist in Comparison Table')
        return        
      }
      this.comparisonArray.push(result);
      this.photoList[photoIndex].isCompared = true;
    } else {
      alert('Error: Cannot find Photo details')
    }
  }

  removePhotoFromCompare(photoIndex: number, photoId: number) {
    if (photoIndex !== -1 && this.photoList[photoIndex] && this.photoList[photoIndex].id === photoId) {
      const comparisonPhotoIndex = this.comparisonArray.findIndex((photo) => photo.id === photoId);
      if (comparisonPhotoIndex === -1) {
        alert('Error faced while removing the Photo')
        return
      }
      this.comparisonArray.splice(comparisonPhotoIndex, 1);
      this.photoList[photoIndex].isCompared = false;
    } else {
      alert('Error: Cannot find Photo details')
    }
  }
}

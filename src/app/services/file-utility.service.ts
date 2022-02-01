import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileResponse } from '../models/file-response';
@Injectable({
  providedIn: 'root'
})
export class FileUtilityService {

  constructor(private httpClient: HttpClient) { }

  uploadFile(file: File) {
    let formdata = new FormData()
    formdata.append("lol", file)
    return this.httpClient.post<FileResponse>(environment.endPoint + "files/upload", formdata)
  }
}

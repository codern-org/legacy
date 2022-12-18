import { MultipartFile } from '@fastify/multipart';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import FormData from 'form-data';
import { catchError, map, Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { FastifyReply } from 'fastify';

@Injectable()
export class FileService {

  private readonly configService: ConfigService;
  private readonly httpService: HttpService;

  public constructor(configService: ConfigService, httpService: HttpService) {
    this.configService = configService;
    this.httpService = httpService;
  }

  public stream(urlFromController: string, response: FastifyReply): Observable<void> {
    const filerUrl = this.configService.get('filerUrl');
    const filerPath = urlFromController.substring('/file/'.length);
    const fileUrl = new URL(filerPath, filerUrl).href;
    return this.httpService
      .get(fileUrl, { responseType: 'stream' })
      .pipe(map((stream) => {
        response.headers(stream.headers);
        response.header('server', 'Codern File System 1.0');
        return stream.data;
      }))
      .pipe(catchError((error) => {
        if (error.response) {
          throw new HttpException(error.response.statusText, error.response.status);
        } else {
          throw new HttpException('Something went wrong on streaming from file system', 500);
        }
      }));
  }

  public async upload(multipartFile: MultipartFile, path: string): Promise<void> {
    const upstream = multipartFile.file;
    const formData = new FormData();
    formData.append('file', upstream);

    const filerUrl = this.configService.get('filerUrl');
    const fileUrl = new URL(path, filerUrl).href;
    await this.httpService.axiosRef.request({
      url: fileUrl,
      method: 'POST',
      headers: formData.getHeaders(),
      data: formData,
    });
  }

}

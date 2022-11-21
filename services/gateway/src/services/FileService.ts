import { MultipartFile } from '@fastify/multipart';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import FormData from 'form-data';

@Injectable()
export class FileService {

  private readonly httpService: HttpService;

  public constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  public async upload(multipartFile: MultipartFile, path: string): Promise<void> {
    const upstream = multipartFile.file;
    const formData = new FormData();
    formData.append('file', upstream);

    const fileUrl = new URL(path, 'http://localhost:8888').href;
    await this.httpService.axiosRef.request({
      url: fileUrl,
      method: 'POST',
      headers: formData.getHeaders(),
      data: formData,
    });
  }

}

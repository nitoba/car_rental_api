import { UploadCarImageUsecase } from '../../application/usecases/uploadCarImage/upload-car-image-usecase';
import { badRequest, created } from '../helpers/http-response-helper';
import { IController } from '../interfaces/controller';
import { HttpResponse } from '../interfaces/http-response';

type UploadCarImageRequest = {
  params: {
    id: string;
  };
  body: {
    image: string[];
  };
};

export class UploadCarImagesController
  implements IController<UploadCarImageRequest>
{
  constructor(private readonly uploadCarImageUsecase: UploadCarImageUsecase) {}
  async handle(request: UploadCarImageRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params;
      const { image } = request.body;
      await this.uploadCarImageUsecase.execute(id, image);
      return created('Car image uploaded');
    } catch (error) {
      return badRequest(error);
    }
  }
}
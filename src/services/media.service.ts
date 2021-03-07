import { Rest } from "@/lib/rest";

class MediaService extends Rest {
  constructor() {
    super("/medias");
  }

  public async upload(file: File, callback?: Function): Promise<any> {
    const data = new FormData();
    data.append("image", file, file.name);
    data.append("type", "file");
    data.append("name", file.name);

    return this.request({
      method: "POST",
      headers: {
        "Content-Type": "Multipart/form-data"
      },
      data,
      onUploadProgress: event => {
        if (callback) {
          callback(event.loaded / event.total);
        }
      }
    });
  }
}

export const medias = Object.freeze(new MediaService());

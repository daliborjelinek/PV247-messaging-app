
import {GET, POST, getFileUrl, getFileLinkUrl} from '../utils/requestUtils';
import {ServerResponseFile, ServerRespoonseFileLink} from '../@types/api';

export async function storeFileToServer(file: File): Promise<ServerResponseFile[]> {
  const formData = new FormData();
  formData.append('Files', file);
  const response = await POST<any>(getFileUrl(), formData);
  return response.data;
}

export async function getStoredFileURL(id: Uuid): Promise<ServerRespoonseFileLink> {

  const response = await GET<any>(getFileLinkUrl(id));
  return response.data;
}





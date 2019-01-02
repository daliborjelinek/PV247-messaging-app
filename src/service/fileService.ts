
import {GET, POST, getFileUrl, getFileLinkUrl} from '../utils/requestUtils';
import {ServerResponseFile, ServerResponseFileLink} from '../@types/api';

export async function storeFileToServer(file: File): Promise<ServerResponseFile[]> {
  const formData = new FormData();
  formData.append('Files', file);
  const response = await POST<any>(getFileUrl(), formData);
  return response.data;
}

export async function getStoredFileURL(id: Uuid): Promise<ServerResponseFileLink> {

  const response = await GET<any>(getFileLinkUrl(id));
  return response.data;
}





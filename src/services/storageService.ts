import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  UploadResult,
  StorageReference,
} from 'firebase/storage';
import { storage } from '../config/firebase';

/**
 * Upload a file to Firebase Storage
 */
export const uploadFile = async (
  path: string,
  file: File | Blob,
  metadata?: { contentType?: string; customMetadata?: Record<string, string> }
): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    const uploadResult: UploadResult = await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(uploadResult.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

/**
 * Upload a user profile image
 */
export const uploadProfileImage = async (
  userId: string,
  file: File
): Promise<string> => {
  const path = `users/${userId}/profile/${Date.now()}_${file.name}`;
  return await uploadFile(path, file, {
    contentType: file.type,
  });
};

/**
 * Upload a post image
 */
export const uploadPostImage = async (
  userId: string,
  postId: string,
  file: File
): Promise<string> => {
  const path = `posts/${userId}/${postId}/${Date.now()}_${file.name}`;
  return await uploadFile(path, file, {
    contentType: file.type,
  });
};

/**
 * Upload a message attachment
 */
export const uploadMessageAttachment = async (
  conversationId: string,
  messageId: string,
  file: File
): Promise<string> => {
  const path = `messages/${conversationId}/${messageId}/${Date.now()}_${file.name}`;
  return await uploadFile(path, file, {
    contentType: file.type,
  });
};

/**
 * Get download URL for a file
 */
export const getFileURL = async (path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error getting file URL:', error);
    throw error;
  }
};

/**
 * Delete a file from Storage
 */
export const deleteFile = async (path: string): Promise<void> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

/**
 * Delete user profile image
 */
export const deleteProfileImage = async (userId: string, imagePath: string): Promise<void> => {
  // Extract path from full URL if needed
  const path = imagePath.includes('users/') 
    ? imagePath.split('users/')[1] 
    : `users/${userId}/profile/${imagePath}`;
  await deleteFile(`users/${userId}/profile/${path}`);
};

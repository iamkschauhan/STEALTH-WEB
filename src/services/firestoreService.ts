import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  QueryConstraint,
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  POSTS: 'posts',
  MESSAGES: 'messages',
  CONVERSATIONS: 'conversations',
  NOTIFICATIONS: 'notifications',
  PROFILE_VIEWS: 'profileViews',
} as const;

/**
 * Remove undefined values from an object (Firestore doesn't allow undefined)
 */
const removeUndefined = <T extends Record<string, any>>(obj: T): Partial<T> => {
  const cleaned: any = {};
  for (const key in obj) {
    if (obj[key] !== undefined) {
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key]) && !(obj[key] instanceof Date) && !(obj[key] instanceof Timestamp)) {
        // Recursively clean nested objects
        const cleanedNested = removeUndefined(obj[key]);
        if (Object.keys(cleanedNested).length > 0) {
          cleaned[key] = cleanedNested;
        }
      } else {
        cleaned[key] = obj[key];
      }
    }
  }
  return cleaned;
};

/**
 * Create a new document
 */
export const createDocument = async <T extends DocumentData>(
  collectionName: string,
  data: T,
  documentId?: string
): Promise<string> => {
  try {
    // Remove undefined values before saving
    const cleanedData = removeUndefined({
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    if (documentId) {
      await setDoc(doc(db, collectionName, documentId), cleanedData);
      return documentId;
    } else {
      const docRef = await addDoc(collection(db, collectionName), cleanedData);
      return docRef.id;
    }
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

/**
 * Get a document by ID
 */
export const getDocument = async <T = DocumentData>(
  collectionName: string,
  documentId: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

/**
 * Update a document
 */
export const updateDocument = async <T extends DocumentData>(
  collectionName: string,
  documentId: string,
  data: Partial<T>
): Promise<void> => {
  try {
    // Remove undefined values before saving
    const cleanedData = removeUndefined({
      ...data,
      updatedAt: serverTimestamp(),
    });

    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, cleanedData);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

/**
 * Delete a document
 */
export const deleteDocument = async (
  collectionName: string,
  documentId: string
): Promise<void> => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

/**
 * Query documents with filters
 */
export const queryDocuments = async <T = DocumentData>(
  collectionName: string,
  constraints: QueryConstraint[] = []
): Promise<T[]> => {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as T[];
  } catch (error) {
    console.error('Error querying documents:', error);
    throw error;
  }
};

/**
 * User-specific functions
 */
export interface UserProfile {
  id?: string;
  uid: string;
  email: string;
  displayName?: string;
  firstName?: string;
  username?: string;
  phoneNumber?: string;
  currentCity?: string;
  homeCity?: string;
  sex?: string;
  birthday?: {
    day?: string;
    month?: string;
    year?: string;
  };
  education?: string;
  occupation?: string;
  relationship?: string;
  spokenLanguages?: string[];
  learningLanguages?: string[];
  about?: string;
  requests?: string;
  interests?: string[];
  music?: string;
  books?: string;
  movies?: string;
  quotes?: string;
  meetSex?: string;
  ageMin?: number;
  ageMax?: number;
  meetCountry?: string;
  meetLanguage?: string;
  meetGoals?: string[];
  onlyMatchingCanContact?: boolean;
  // Privacy Settings
  profileVisibility?: 'public' | 'friends' | 'private';
  whoCanContact?: 'everyone' | 'friends' | 'none';
  showEmail?: boolean;
  showPhone?: boolean;
  allowSearchEngines?: boolean;
  // Content Moderation Settings
  contentFilter?: 'strict' | 'moderate' | 'off';
  blockInappropriate?: boolean;
  reportContent?: boolean;
  // Data Settings
  dataSharing?: boolean;
  analyticsTracking?: boolean;
  marketingEmails?: boolean;
  // Notification Settings
  pushNotifications?: boolean;
  emailNotifications?: boolean;
  smsNotifications?: boolean;
  newMessageNotifications?: boolean;
  messageSound?: boolean;
  messagePreview?: boolean;
  friendRequestNotifications?: boolean;
  friendAcceptNotifications?: boolean;
  postLikeNotifications?: boolean;
  postCommentNotifications?: boolean;
  postShareNotifications?: boolean;
  mentionNotifications?: boolean;
  profileViewNotifications?: boolean;
  followNotifications?: boolean;
  activityReminders?: boolean;
  weeklyDigest?: boolean;
  newsletter?: boolean;
  quietHoursEnabled?: boolean;
  quietHoursStart?: string;
  quietHoursEnd?: string;
  // App Settings
  language?: string;
  theme?: 'light' | 'dark' | 'auto';
  autoPlayVideos?: boolean;
  dataSaver?: boolean;
  profileImageUrl?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const createUserProfile = async (
  userId: string,
  profileData: Omit<UserProfile, 'id' | 'uid' | 'createdAt' | 'updatedAt'>
): Promise<void> => {
  await createDocument(COLLECTIONS.USERS, {
    uid: userId,
    ...profileData,
  }, userId);
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  return await getDocument<UserProfile>(COLLECTIONS.USERS, userId);
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
): Promise<void> => {
  await updateDocument(COLLECTIONS.USERS, userId, updates);
};

/**
 * Notification-specific functions
 */
export interface Notification {
  id?: string;
  userId: string;
  type: 'message' | 'friend_request' | 'friend_accept' | 'post_like' | 'post_comment' | 'post_share' | 'mention' | 'profile_view' | 'follow';
  title: string;
  message: string;
  relatedUserId?: string;
  relatedPostId?: string;
  read: boolean;
  createdAt?: Timestamp;
}

export const createNotification = async (notification: Omit<Notification, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTIONS.NOTIFICATIONS), {
    ...notification,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getUserNotifications = async (userId: string, limitCount: number = 50): Promise<Notification[]> => {
  const q = query(
    collection(db, COLLECTIONS.NOTIFICATIONS),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Notification[];
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  await updateDocument(COLLECTIONS.NOTIFICATIONS, notificationId, { read: true });
};

export const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
  const notifications = await getUserNotifications(userId, 100);
  const unreadNotifications = notifications.filter(n => !n.read);
  const batch = unreadNotifications.map(n => 
    updateDocument(COLLECTIONS.NOTIFICATIONS, n.id!, { read: true })
  );
  await Promise.all(batch);
};

/**
 * Profile View-specific functions
 */
export interface ProfileView {
  id?: string;
  viewedUserId: string; // User whose profile was viewed
  viewerUserId: string; // User who viewed the profile
  viewerProfile?: UserProfile; // Snapshot of viewer's profile at time of view
  createdAt?: Timestamp;
}

export const trackProfileView = async (viewedUserId: string, viewerUserId: string, viewerProfile?: UserProfile): Promise<void> => {
  // Don't track if user views their own profile
  if (viewedUserId === viewerUserId) return;

  // Check if view already exists today (to avoid duplicates)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayTimestamp = Timestamp.fromDate(today);

  const q = query(
    collection(db, COLLECTIONS.PROFILE_VIEWS),
    where('viewedUserId', '==', viewedUserId),
    where('viewerUserId', '==', viewerUserId),
    where('createdAt', '>=', todayTimestamp)
  );
  const existingViews = await getDocs(q);

  // Only create if no view exists today
  if (existingViews.empty) {
    await addDoc(collection(db, COLLECTIONS.PROFILE_VIEWS), {
      viewedUserId,
      viewerUserId,
      viewerProfile: viewerProfile ? removeUndefined(viewerProfile) : undefined,
      createdAt: serverTimestamp(),
    });

    // Create a notification for the profile view (if enabled in settings)
    // This will be handled by checking user's notification settings
  }
};

export const getProfileViews = async (userId: string, limitCount: number = 100): Promise<ProfileView[]> => {
  const q = query(
    collection(db, COLLECTIONS.PROFILE_VIEWS),
    where('viewedUserId', '==', userId),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProfileView[];
};

/**
 * Post-specific functions
 */
export interface Post {
  id?: string;
  userId: string;
  content: string;
  visibility: 'Public' | 'Friends' | 'Private';
  language: string;
  imageUrl?: string;
  likes?: string[];
  comments?: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export const createPost = async (postData: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  return await createDocument(COLLECTIONS.POSTS, postData);
};

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  return await queryDocuments<Post>(
    COLLECTIONS.POSTS,
    [
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
    ]
  );
};

export const getPublicPosts = async (limitCount: number = 20): Promise<Post[]> => {
  return await queryDocuments<Post>(
    COLLECTIONS.POSTS,
    [
      where('visibility', '==', 'Public'),
      orderBy('createdAt', 'desc'),
      limit(limitCount),
    ]
  );
};

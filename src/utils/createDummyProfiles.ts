import { trackProfileView, createNotification, UserProfile, COLLECTIONS } from '../services/firestoreService';
import { db } from '../config/firebase';
import { addDoc, collection, serverTimestamp, Timestamp } from 'firebase/firestore';

// Dummy user profiles data
const dummyProfiles: Omit<UserProfile, 'uid' | 'email' | 'createdAt' | 'updatedAt'>[] = [
  {
    firstName: 'Sarah',
    username: 'sarah_travel',
    sex: 'Female',
    birthday: { day: '15', month: 'Mar', year: '1995' },
    currentCity: 'New York, United States',
    homeCity: 'Boston, United States',
    education: 'Master degree',
    occupation: 'Travel Blogger',
    relationship: 'Single',
    spokenLanguages: ['English', 'Spanish'],
    learningLanguages: ['French', 'Italian'],
    about: 'Passionate traveler and photographer. Love exploring new cultures and making friends from around the world!',
    requests: 'Looking for travel buddies and language exchange partners',
    interests: ['Travel', 'Photography', 'Food', 'Art', 'Music'],
    music: 'Jazz, Pop, World Music',
    books: 'Travel memoirs, Fiction',
    movies: 'Documentaries, Adventure',
    quotes: 'The world is a book, and those who do not travel read only one page.',
    showEmail: true,
    showPhone: false,
  },
  {
    firstName: 'Raj',
    username: 'raj_coder',
    sex: 'Male',
    birthday: { day: '22', month: 'Jul', year: '1992' },
    currentCity: 'Mumbai, India',
    homeCity: 'Delhi, India',
    education: 'Bachelor degree',
    occupation: 'Software Developer',
    relationship: 'Single',
    spokenLanguages: ['Hindi', 'English'],
    learningLanguages: ['Japanese', 'German'],
    about: 'Tech enthusiast and coding geek. Love building apps and learning new programming languages.',
    requests: 'Looking for coding buddies and tech discussions',
    interests: ['Programming', 'Gaming', 'Technology', 'AI', 'Startups'],
    music: 'Electronic, Rock',
    books: 'Tech books, Sci-Fi',
    movies: 'Sci-Fi, Action',
    quotes: 'Code is like humor. When you have to explain it, it\'s bad.',
    showEmail: false,
    showPhone: true,
  },
  {
    firstName: 'Emma',
    username: 'emma_writer',
    sex: 'Female',
    birthday: { day: '08', month: 'Nov', year: '1998' },
    currentCity: 'London, United Kingdom',
    homeCity: 'Manchester, United Kingdom',
    education: 'Master degree',
    occupation: 'Writer',
    relationship: 'In a relationship',
    spokenLanguages: ['English', 'French'],
    learningLanguages: ['Spanish', 'Portuguese'],
    about: 'Aspiring novelist and book lover. Always looking for inspiration and interesting conversations.',
    requests: 'Looking for writing partners and book recommendations',
    interests: ['Writing', 'Reading', 'Literature', 'Poetry', 'Coffee'],
    music: 'Classical, Indie',
    books: 'Literary Fiction, Poetry',
    movies: 'Drama, Romance',
    quotes: 'A reader lives a thousand lives before he dies.',
    showEmail: true,
    showPhone: false,
  },
  {
    firstName: 'Carlos',
    username: 'carlos_music',
    sex: 'Male',
    birthday: { day: '30', month: 'May', year: '1990' },
    currentCity: 'Barcelona, Spain',
    homeCity: 'Madrid, Spain',
    education: 'Bachelor degree',
    occupation: 'Musician',
    relationship: 'Single',
    spokenLanguages: ['Spanish', 'English', 'Catalan'],
    learningLanguages: ['Italian'],
    about: 'Professional musician and music teacher. Love sharing music and learning about different cultures through songs.',
    requests: 'Looking for music collaborators and students',
    interests: ['Music', 'Guitar', 'Composing', 'Concerts', 'Jazz'],
    music: 'Jazz, Flamenco, Classical',
    books: 'Music theory, Biographies',
    movies: 'Musicals, Drama',
    quotes: 'Music is the universal language of mankind.',
    showEmail: false,
    showPhone: true,
  },
  {
    firstName: 'Yuki',
    username: 'yuki_artist',
    sex: 'Female',
    birthday: { day: '14', month: 'Feb', year: '1996' },
    currentCity: 'Tokyo, Japan',
    homeCity: 'Osaka, Japan',
    education: 'Bachelor degree',
    occupation: 'Artist',
    relationship: 'Single',
    spokenLanguages: ['Japanese', 'English'],
    learningLanguages: ['Korean', 'Chinese'],
    about: 'Digital artist and illustrator. Love creating beautiful art and connecting with creative people worldwide.',
    requests: 'Looking for art collaborations and cultural exchange',
    interests: ['Art', 'Drawing', 'Digital Art', 'Anime', 'Design'],
    music: 'J-Pop, Electronic',
    books: 'Manga, Art Books',
    movies: 'Anime, Fantasy',
    quotes: 'Art is not what you see, but what you make others see.',
    showEmail: true,
    showPhone: false,
  },
];

/**
 * Create dummy profile views for testing
 * This creates profile views with snapshot data that can be displayed
 */
export const createDummyProfiles = async (currentUserId: string): Promise<void> => {
  console.log('Creating dummy profile views...');
  
  for (let i = 0; i < dummyProfiles.length; i++) {
    const dummyProfile = dummyProfiles[i];
    const dummyUserId = `dummy_user_${i + 1}_${Date.now()}`;
    const dummyEmail = `${dummyProfile.username}@example.com`;

    try {
      // Create profile view with snapshot data
      // This simulates someone viewing your profile
      const profileViewData = {
        viewedUserId: currentUserId,
        viewerUserId: dummyUserId,
        viewerProfile: {
          ...dummyProfile,
          uid: dummyUserId,
          email: dummyEmail,
        } as UserProfile,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, COLLECTIONS.PROFILE_VIEWS), profileViewData);

      console.log(`Created dummy profile view: ${dummyProfile.firstName}`);
    } catch (error) {
      console.error(`Error creating dummy profile view ${dummyProfile.firstName}:`, error);
    }
  }

  console.log('Dummy profile views created!');
};

/**
 * Create dummy notifications for testing
 */
export const createDummyNotifications = async (userId: string): Promise<void> => {
  console.log('Creating dummy notifications...');

  const dummyNotifications = [
    {
      userId,
      type: 'friend_request' as const,
      title: 'New Friend Request',
      message: 'Sarah sent you a friend request',
      relatedUserId: 'dummy_user_1',
      read: false,
    },
    {
      userId,
      type: 'post_like' as const,
      title: 'Post Liked',
      message: 'Raj liked your post',
      relatedUserId: 'dummy_user_2',
      relatedPostId: 'post_1',
      read: false,
    },
    {
      userId,
      type: 'post_comment' as const,
      title: 'New Comment',
      message: 'Emma commented on your post: "Great post!"',
      relatedUserId: 'dummy_user_3',
      relatedPostId: 'post_1',
      read: false,
    },
    {
      userId,
      type: 'message' as const,
      title: 'New Message',
      message: 'Carlos sent you a message',
      relatedUserId: 'dummy_user_4',
      read: true,
    },
    {
      userId,
      type: 'profile_view' as const,
      title: 'Profile Viewed',
      message: 'Yuki viewed your profile',
      relatedUserId: 'dummy_user_5',
      read: false,
    },
  ];

  for (const notification of dummyNotifications) {
    try {
      await createNotification(notification);
    } catch (error) {
      console.error('Error creating dummy notification:', error);
    }
  }

  console.log('Dummy notifications created!');
};

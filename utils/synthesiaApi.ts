import axios from 'axios';

const synthesiaApi = axios.create({
  baseURL: 'https://api.synthesia.io/v2',
  headers: {
    'Authorization': `Bearer ${process.env.SYNTHESIA_API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export const createVideo = async (script: string, title: string) => {
  try {
    const response = await synthesiaApi.post('/videos', {
      test: true, // Set to false for production
      input: [
        {
          scriptText: script,
          avatar: "anna_costume1_cameraA", // You can change this to any available avatar
          background: "office1", // You can change this to any available background
          avatarSettings: {
            voice: "en-US-Jenny", // You can change this to any available voice
            style: "casual"
      }
        }
      ],
      title: title,
      visibility: "private",
      callbackUrl: `${process.env.NEXT_PUBLIC_API_URL}/api/synthesia-callback` // Optional: for status updates
    });

    return response.data;
  } catch (error) {
    console.error('Error creating Synthesia video:', error);
    throw error;
  }
};

export const getVideoStatus = async (videoId: string) => {
  try {
    const response = await synthesiaApi.get(`/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error getting Synthesia video status:', error);
    throw error;
  }
};
import { google } from 'googleapis';

const admin = google.admin('directory_v1');

export async function getUserGroups(accessToken: string, userEmail: string) {
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });

  try {
    const res = await admin.groups.list({
      auth,
      userKey: userEmail,
    });

    const groups = res.data.groups?.map((group) => group.email) || [];
    return groups;
  } catch (error) {
    console.error('Error fetching user groups:', error);
    return [];
  }
}

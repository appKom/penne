const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];

interface Session {
  user?: {
    email?: string;
  };
}

export const isAdmin = (session: Session) => {
  if (session.user?.email && adminEmails.includes(session.user.email)) {
    return true;
  }
  return false;
};

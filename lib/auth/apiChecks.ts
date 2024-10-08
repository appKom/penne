interface Session {
  user?: {
    role?: string;
  };
}

export const isAdmin = (session: Session) => {
  if (session.user?.role !== 'admin') {
    return false;
  }
  return true;
};

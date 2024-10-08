interface Session {
  user?: {
    email?: string;
  };
}

export const isAdmin = (session: Session) => {
  if (
    session.user?.email !== 'fredrik.carsten.hansteen@online.ntnu.no' &&
    session.user?.email !== 'julian.ottosen@online.ntnu.no'
  ) {
    return false;
  }
  return true;
};

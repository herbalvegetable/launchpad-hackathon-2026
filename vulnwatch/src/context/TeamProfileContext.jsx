import { createContext, useContext, useState, useCallback } from 'react';
import { storage } from '../utils/storage';

const TeamProfileContext = createContext(null);

function makeId() {
  return 'team_' + Math.random().toString(36).slice(2, 10);
}

export function TeamProfileProvider({ children }) {
  const [team, setTeamState] = useState(() => storage.getTeam());

  const saveTeam = useCallback((partial) => {
    setTeamState((prev) => {
      const now = new Date().toISOString();
      const next = {
        id: prev?.id || makeId(),
        name: partial.name ?? prev?.name ?? '',
        stack: partial.stack ?? prev?.stack ?? [],
        onboarded: partial.onboarded ?? prev?.onboarded ?? false,
        createdAt: prev?.createdAt || now,
        updatedAt: now,
      };
      storage.setTeam(next);
      return next;
    });
  }, []);

  const addStackItem = useCallback((item) => {
    setTeamState((prev) => {
      if (!prev) return prev;
      const exists = prev.stack.some(
        (s) => s.vendor === item.vendor && s.product === item.product
      );
      const stack = exists ? prev.stack : [...prev.stack, item];
      const next = { ...prev, stack, updatedAt: new Date().toISOString() };
      storage.setTeam(next);
      return next;
    });
  }, []);

  const removeStackItem = useCallback((item) => {
    setTeamState((prev) => {
      if (!prev) return prev;
      const stack = prev.stack.filter(
        (s) => !(s.vendor === item.vendor && s.product === item.product)
      );
      const next = { ...prev, stack, updatedAt: new Date().toISOString() };
      storage.setTeam(next);
      return next;
    });
  }, []);

  const resetTeam = useCallback(() => {
    setTeamState(null);
    storage.setTeam(null);
  }, []);

  return (
    <TeamProfileContext.Provider
      value={{ team, saveTeam, addStackItem, removeStackItem, resetTeam }}
    >
      {children}
    </TeamProfileContext.Provider>
  );
}

export function useTeamProfile() {
  const ctx = useContext(TeamProfileContext);
  if (!ctx) throw new Error('useTeamProfile must be used within TeamProfileProvider');
  return ctx;
}

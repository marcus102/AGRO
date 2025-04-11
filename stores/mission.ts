import { create } from 'zustand';
import { Mission, MissionStatus } from '@/types/mission';
import { supabase } from '@/lib/supabase';

interface MissionState {
  missions: Mission[];
  draftMission: Partial<Mission> | null;
  loading: boolean;
  error: string | null;
  setMissions: (missions: Mission[]) => void;
  setDraftMission: (missions: Partial<Mission> | null) => void;
  updateDraftMission: (updates: Partial<Mission>) => void;
  fetchMissions: () => Promise<void>;
  createMission: (missions: Partial<Mission>) => Promise<Mission | null>;
  updateMission: (id: string, updates: Partial<Mission>) => Promise<Mission | null>;
  deleteMission: (id: string) => Promise<void>;
  publishMission: (missions: Mission) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMissionStore = create<MissionState>((set, get) => ({
  missions: [],
  draftMission: null,
  loading: false,
  error: null,

  setMissions: (missions) => set({ missions: missions }),

  setDraftMission: (mission) => set({ draftMission: mission }),

  updateDraftMission: (updates) =>
    set((state) => ({
      draftMission: state.draftMission ? { ...state.draftMission, ...updates } : updates,
    })),

  fetchMissions: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('missions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ missions: data as Mission[] });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch missions',
      });
    } finally {
      set({ loading: false });
    }
  },

  createMission: async (mission) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('missions')
        .insert([
          {
            ...mission,
            user_id: (await supabase.auth.getUser()).data?.user?.id,
            status: 'in_review' as MissionStatus,
            original_price: mission.original_price,
            adjustment_price: mission.adjustment_price,
            final_price: mission.final_price,
            applicants: [],
          },
        ])
        .select('*');

      console.log(data, error);
      if (error) throw error;
      if (data) {
        set((state) => ({ missions: [data[0] as Mission, ...state.missions] }));
        return data[0] as Mission;
      }
      return null;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to create mission',
      });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  updateMission: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('missions')
        .update(updates)
        .eq('id', id)
        .select('*');

      if (error) throw error;
      if (data) {
        set((state) => ({
          missions: state.missions.map((j) => (j.id === id ? (data[0] as Mission) : j)),
        }));
        return data[0] as Mission;
      }
      return null;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to update mission',
      });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  deleteMission: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase.from('missions').delete().eq('id', id);

      if (error) throw error;
      set((state) => ({
        missions: state.missions.filter((j) => j.id !== id),
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to delete mission',
      });
    } finally {
      set({ loading: false });
    }
  },

  publishMission: async (mission) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('jobs')
        .update({
          status: 'published',
          published_at: new Date().toISOString(),
        })
        .eq('id', mission.id)
        .select('*');

      if (error) throw error;
      if (data) {
        set((state) => ({
          missions: state.missions.map((j) => (j.id === mission.id ? (data[0] as Mission) : j)),
          draftMission: null,
        }));
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to publish job',
      });
    } finally {
      set({ loading: false });
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

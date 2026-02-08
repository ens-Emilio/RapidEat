import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
    nome: string;
    telefone: string;
    endereco: string;
    cidade: string;
}

interface UserState {
    profile: UserProfile;
    updateProfile: (profile: Partial<UserProfile>) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            profile: {
                nome: '',
                telefone: '',
                endereco: '',
                cidade: '',
            },
            updateProfile: (newProfile) => set((state) => ({
                profile: { ...state.profile, ...newProfile }
            })),
        }),
        {
            name: 'user-storage',
        }
    )
);

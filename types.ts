export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  phase: 'Pre-op' | 'Intra-op' | 'Post-op';
}

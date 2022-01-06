import { Action } from '@/actions/Action';
import { Prompt } from '@/prompts/Prompt';
import { Queue } from '@/structs/Queue';

export interface IStrategy {
  process: Queue<Action | Prompt>;
  name: string;
}

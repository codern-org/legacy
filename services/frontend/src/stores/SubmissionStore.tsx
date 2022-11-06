import { EditorLanguage } from '@/stores/EditorStore'

export type Testcase = {
  pass: boolean,
  info?: string,
};

export type Submission = {
  id: number,
  date: Date,
  language: EditorLanguage,
  testcases: Testcase[],
}

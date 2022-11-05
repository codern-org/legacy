import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import MonacoEditorComponent from '@monaco-editor/react';

export type Monaco = typeof monaco;
export type MonacoEditor = monaco.editor.IStandaloneCodeEditor;
export type MonacoEditorOptions = monaco.editor.IStandaloneEditorConstructionOptions;

export { monaco };
export { MonacoEditorComponent };

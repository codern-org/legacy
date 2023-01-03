import { Button } from '@/features/common/Button';
import { Input } from '@/features/common/Input';
import { ModalPanel } from '@/features/common/Modal';
import { Text } from '@/features/common/Text';
import { useEditor } from '@/hooks/useEditor';
import { isMacOs } from '@/utils/Device';
import { Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'preact/hooks';

export const EditorSettingsButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getFontSize, setFontSize } = useEditor();

  const getInt = (event: Event) => {
    if (!(event.target instanceof HTMLInputElement)) return 0;
    return Number.parseInt(event.target.value);
  };

  const handleChangeFontSize = (fontSize: number) => {
    if (fontSize < 6 || fontSize > 36 || !fontSize) return;
    setFontSize(fontSize);
  };

  return (
    <>
      <Button
        color="secondary"
        onClick={() => setIsOpen(true)}
      >
        <Cog6ToothIcon className="w-5 h-5" />
      </Button>

      <ModalPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="w-full max-w-lg m-auto p-6 bg-primary rounded-lg">
          <div className="flex flex-row justify-between items-center mb-4">
            <Text
              color="primary"
              className="font-semibold text-lg"
            >
              Editor Settings
            </Text>

            <button onClick={() => setIsOpen(false)} className="hover:cursor-pointer">
              <Text color="primary"><XMarkIcon className="w-6 h-6" /></Text>
            </button>
          </div>

          <div className="flex flex-col">
            <Text color="primary">Font size</Text>
            <Text color="secondary" className="text-sm mb-2">Controls the font size in pixels between 6px and 36px</Text>
            <Input
              type="number"
              min={6}
              max={36}
              className="mb-2"
              value={Math.floor(getFontSize() || 0)}
              onInput={(event) => handleChangeFontSize(getInt(event))}
            />
            <Text color="secondary" className="text-xs mb-2">
              Shortcut:&nbsp;
              <kbd className="font-sans font-semibold">
                <abbr title={isMacOs() ? 'COmmand' : 'Control'} className="no-underline">{isMacOs() ? '⌘' : 'Control'}</abbr>
                &nbsp;+
                Scroll
              </kbd>
              &nbsp;(When focus on editor)
            </Text>
          </div>
        </div>
      </ModalPanel>
    </>
  );
};

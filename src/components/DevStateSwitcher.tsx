import { Tab, TabList, Text } from '@fluentui/react-components';
import type { PreviewDataState } from '../api/previewState';

interface DevStateSwitcherProps {
  selectedState: PreviewDataState;
  onChange: (state: PreviewDataState) => void;
}

const states: readonly PreviewDataState[] = ['data', 'loading', 'empty', 'error'];

export function DevStateSwitcher({ selectedState, onChange }: DevStateSwitcherProps) {
  if (!import.meta.env.DEV) {
    return null;
  }

  return (
    <aside className="state-switcher" aria-label="Gallery preview state">
      <Text className="state-switcher-label">Preview</Text>
      <TabList
        size="small"
        selectedValue={selectedState}
        onTabSelect={(_, data) => onChange(data.value as PreviewDataState)}
        aria-label="Gallery data state"
      >
        {states.map((state) => (
          <Tab key={state} value={state}>{state}</Tab>
        ))}
      </TabList>
    </aside>
  );
}
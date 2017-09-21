import { configure } from '@kadira/storybook';
import Maps from '../widgets/Map/Map.stories.jsx';
import Chart from '../widgets/Chart/Chart.stories.jsx';

function loadStories() {
  return {
    Chart,
    Maps,
  };
}

configure(loadStories, module);

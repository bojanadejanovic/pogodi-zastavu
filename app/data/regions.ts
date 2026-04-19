import type { GameMode } from '../types';

export interface Region {
  id: string;
  name: string;
  mode: GameMode;
}

export const REGIONS: Region[] = [
  { id: 'umv41i1z8m607uf', name: 'World',    mode: 'world'    },
  { id: '84a273b413k7683', name: 'Europe',   mode: 'europe'   },
  { id: '0h7g61e70659ur5', name: 'Africa',   mode: 'africa'   },
  { id: 'n9s4wtjl70r0khy', name: 'Asia',     mode: 'asia'     },
  { id: 's2xx2hd596ebrby', name: 'Americas', mode: 'americas' },
  { id: 'hxp14h9y4ith0zg', name: 'Oceania',  mode: 'oceania'  },
];

export const REGION_BY_MODE: Record<GameMode, Region> = Object.fromEntries(
  REGIONS.map(r => [r.mode, r])
) as Record<GameMode, Region>;

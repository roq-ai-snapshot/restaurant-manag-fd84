const mapping: Record<string, string> = {
  menus: 'menu',
  'operational-hours': 'operational_hours',
  restaurants: 'restaurant',
  'seating-layouts': 'seating_layout',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Owner', 'Manager', 'Chef', 'Waitstaff'],
  tenantName: 'Restaurant',
  applicationName: 'Restaurant manager',
  addOns: [],
};

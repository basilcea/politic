import seed from "../helpers/seed";

export const offices = [
  {
    "type": " 'Federal'",
    "name": " 'President-Nigeria'"
  },
  {
    "type": " 'State'",
    "name": " 'Governor-Rivers'"
  },
  {
    "type": " 'Legislative'",
    "name": " 'Senator-Akwa-Ibom-North'"
  },
  {
    "type": " 'Legislative'",
    "name": " 'Representative-Anambara-Federal-Constituency-I'"
  },
  {
    "type": " 'Local Government'",
    "name": " 'Chairman-Kosofe'"
  }
];

export const seedOffices= seed('offices',offices)


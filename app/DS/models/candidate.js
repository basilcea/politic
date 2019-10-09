/* eslint-disable quote-props */
/* eslint-disable import/no-unresolved */
import users from './user';
import offices from './office';
import parties from '../party';

const candidates = [
  {
    'id': 1 ,
    'office': offices[0].id,
    'party': parties[1].id,
    'candidate': users[0].id ,
    'candidateName': `${users[0].firstname} ${users[0].lastName}`,
  },
  {
    'id': 2 ,
    'office': offices[2].id,
    'party': parties[3].id,
    'candidate': users[4].id,
    'candidateName': `${users[4].firstname} ${users[4].lastName}`,

  },
  {
    'id': 3 ,
    'office': offices[1].id,
    'party': parties[1].id,
    'candidate': users[3].id ,
    'candidateName': `${users[3].firstname} ${ users[3].lastName}`,
  },
  {
    'id': 4 ,
    'office': offices[4].id,
    'party': parties[1].id,
    'candidate': users[2].id ,
    'candidateName': `${users[2].firstname } ${  users[2].lastName}`,
  },
  {
    'id': 5,
    'office': offices[3].id,
    'party': parties[3].id,
    'candidate': users[1].id,
    'candidateName': `${users[1].firstname } ${  users[1].lastName}`,
  },
];

export default candidates;

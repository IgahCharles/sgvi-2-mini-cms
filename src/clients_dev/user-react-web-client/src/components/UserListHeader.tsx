/** Table header. We are separating this from TenantList just in case it has to carry out
 * some specific tasks like firing sort event based on the header column clicked.
*/
import React from 'react';


const UserListHeader: React.FC = () => {

  return (
    <thead>
      <tr>
          <th>First Name</th>
          <th>Middle Name</th>
          <th>Last Name</th>
          <th>Common Name</th>
          <th>Gender</th>
          <th>Primary Email Address</th>
          <th>Passoword Salt</th>
          <th>Passoword Hash</th>
      </tr>
    </thead>
  );
}

export default UserListHeader;

var PROJECTS = {};

function processKPIs() {
  OPTIONS.users = OPTIONS.users.map(function(userId) {
    var user = APIRequest('users', {query: [{key: 'name', value: userId}]}).users[0];
    // Get time entries for user in defined period
    user.time_entries = APIRequest('time_entries', {query: [
      {key: 'user_id', value: user.id},
      {key: 'spent_on', value: getDateRage()}
    ]}).time_entries;
    
    // Update projects list
    user.time_entries.forEach(function(t) {
      if (PROJECTS.hasOwnProperty(t.project.id)) return;
      PROJECTS[t.project.id] = t.project;
    });
    
    return user;
  });
}
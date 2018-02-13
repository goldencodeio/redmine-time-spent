var PROJECTS = {};

function initProjects() {
  var res = APIRequest('projects');
  res.projects.forEach(function(project) {
    if (!project.parent) {
      project.children = [];
      PROJECTS[project.id] = project;
      return;
    }

    if (PROJECTS[project.parent.id] && PROJECTS[project.parent.id].children.indexOf(project.id) === -1)
      PROJECTS[project.parent.id].children.push(project.id);
  });
}

function countTotal() {
  Object.keys(PROJECTS).forEach(function(id) {
    var project = PROJECTS[id];
    project.time_entries = APIRequest('time_entries', {query: [
      {key: 'project_id', value: id},
      {key: 'spent_on', value: getDateRage()}
    ]}).time_entries;
    PROJECTS[id] = project;
  });
}

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
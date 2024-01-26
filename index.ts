import {
    RaccoonMeadowsVolunteers,
    RaccoonMeadowsActivity,
    raccoonMeadowsVolunteers,
  } from './raccoon-meadows-log';
  
  import {
    WolfPointVolunteers,
    WolfPointActivity,
    wolfPointVolunteers,
  } from './wolf-point-log';
  
  type CombinedActivity = RaccoonMeadowsActivity | WolfPointActivity;
  
  type Volunteers = {
    id: number;
    name: string;
    activities: CombinedActivity[];
  };
  
  function combineVolunteers(
    volunteers: (RaccoonMeadowsVolunteers | WolfPointVolunteers)[]
  ) {
    return volunteers.map((volunteer) => {
      if (typeof volunteer.id === 'string') {
      let id: number = parseInt(volunteer.id, 10);
      // Transform each volunteer to match the Volunteers type
      const combinedVolunteer: Volunteers = {
        id: id,
        name: volunteer.name,
        activities: volunteer.activities as CombinedActivity[],
      };
  
      return combinedVolunteer;
    }});
  
  }
  function isVerified(verified: string | boolean) {
    if (typeof verified === 'string') {
      return verified;
    }
    return verified;
  }
  function getHours(activity: CombinedActivity): number {
    if ('hours' in activity) {
      return activity.hours;
    } else {
      return activity.time;
    }
  }
  
  function calculateHours(volunteers: Volunteers[]) {
    return volunteers.map((volunteer) => {
      let hours = 0;
  
      volunteer.activities.forEach((activity) => {
        if (isVerified(activity.verified)) {
          hours += getHours(activity);
        }
      getHours(activity);
    });
  
      return {
        id: volunteer.id,
        name: volunteer.name,
        hours: hours,
      };
    });
  }
  
  function byHours(a: { hours: number }, b: { hours: number }): number {
    return b.hours - a.hours;
  }
  
  const combinedVolunteers = combineVolunteers(
    [].concat(wolfPointVolunteers, raccoonMeadowsVolunteers)
  );
  
  console.log(combinedVolunteers);
  const result = calculateHours(combinedVolunteers);
  console.log(result);
  result.sort(byHours);
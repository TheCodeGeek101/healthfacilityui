// Navigation links
export const navLinks = [
    {
        label: 'Owners',
        id: 'OwnersPage'
    },
    {
        label: 'Districts',
        id: 'DistrictsPage'
    },
    {
        label: 'Facilities',
        id: 'FacilitiesPage'
    },
 
   
];

// Owners field config
export const fieldConfig = [
    {
      label: 'name',
      name: 'name',
      placeholder: 'Enter your good name',
      type: 'text',
    },
    {
      label: 'Email Address',
      name: 'email',
      placeholder: 'Enter your email address',
      type: 'email',
    },
    {
      label: 'Password',
      name: 'password',
      placeholder: 'Password',
      type: 'password',
    },
 
  ];

  // Owners field config
export const districtsFieldConfig = [
    {
      label: 'Code',
      name: 'code',
      placeholder: 'Enter the district code',
      type: 'text',
    },
    {
      label: 'Name',
      name: 'name',
      placeholder: 'Enter the district name',
      type: 'text',
    },
 
  ];

  // facilities field config
export const facilitiesFieldConfig = [
    {
      label: 'Facility Name',
      name: 'facilityName',
      placeholder: 'Enter your good name',
      type: 'text',
    },
    {
        label: 'District',
        name: 'districtId',
        placeholder: 'Select the district for the facilitiy ',
        options: 'dynamic',
      },
      {
        label: 'Owner',
        name: 'ownerId',
        placeholder: 'Select the owner of the facility',
        options: 'dynamic',
      },
  ];

  
  
  export const dropIn = {
	hidden: {
		y: "-100vh",
		opacity: 0,
	},
	visible: {
		y: "0",
		opacity: 1,
		transition: {
			duration: 0.1,
			type: "spring",
			damping: 25,
			stiffness: 500
		}
	},
	exit: {
		y: "100vh",
		opacity: 0
	}
};
import { roles, actions } from "./constants";

export const mappings = new Map(); 

//setup roles with their permissions
//admin can do everything 
mappings.set(roles.ADMIN, [actions.ADD_DOCTOR, actions.ADD_PATIENTS, actions.REMOVE_DOCTOR, actions.REMOVE_PATIENTS, actions.ADD_APPT, actions.REMOVE_APPT]); 

//doctor can add remove patients 
mappings.set(roles.DOCTOR, [actions.ADD_PATIENTS, actions.REMOVE_PATIENTS, actions.ADD_APPT, actions.REMOVE_APPT]);

//patient can add remove app
mappings.set(roles.PATIENT, [actions.ADD_APPT, actions.REMOVE_APPT]);
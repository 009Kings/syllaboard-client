import { Action, Actions } from '../actions/admin_dashboard';
import { Cohort, User } from '../Types';

export type AdminDashboardState = AdminDashboardUI & AdminDashboardData;

interface AdminDashboardUI {
  // Cohorts
  showAllCohorts: boolean;
  showAddCohort: boolean;
  showEditCohort: boolean;
  selectedCohort: Cohort | null;
  // Users
  showAllUsers: boolean;
  showSendRegistration: boolean;
  showEditUser: boolean;
  selectedUser: User | null;
}

interface AdminDashboardData {
  cohorts: Cohort[];
  users: User[];
}

const blankState: AdminDashboardState = {
  // Cohorts
  showAllCohorts: false,
  showAddCohort: false,
  showEditCohort: false,
  cohorts: [],
  selectedCohort: null,
  // Users
  showAllUsers: false,
  showEditUser: false,
  showSendRegistration: false,
  users: [],
  selectedUser: null,
};

export function adminDashboardReducer(state: AdminDashboardState = blankState, action: Action): AdminDashboardState {
  switch (action.type) {
  // UI
    case Actions.TOGGLE_ADD_COHORT:
      return {
        ...state,
        showAddCohort: !state.showAddCohort,
      };
    case Actions.TOGGLE_EDIT_COHORT:
      return {
        ...state,
        showEditCohort: !state.showEditCohort,
      };
    case Actions.TOGGLE_SHOW_COHORTS:
      return {
        ...state,
        showAllCohorts: !state.showAllCohorts,
      };
    case Actions.TOGGLE_SHOW_USERS:
      return {
        ...state,
        showAllUsers: !state.showAllUsers,
      };
    case Actions.TOGGLE_EDIT_USER:
      return {
        ...state,
        showEditUser: !state.showEditUser,
      };
    case Actions.TOGGLE_SEND_REGISTRATION:
      return {
        ...state,
        showSendRegistration: !state.showSendRegistration,
      };
  // Cohort
    case Actions.COHORT_REFRESH_STORE:
      return {
        ...state,
        cohorts: action.payload,
      };
    case Actions.COHORT_ADD_TO_STORE:
      return {
        ...state,
        cohorts: state.cohorts.concat(action.payload),
      };
    case Actions.COHORT_REMOVE_FROM_STORE:
      return {
        ...state,
        cohorts: state.cohorts.filter((cohort: Cohort) => (
          cohort._id !== action.payload
        )),
      };
    case Actions.COHORT_UPDATE_IN_STORE:
      return {
        ...state,
        cohorts: state.cohorts.map((cohort: Cohort) => (
          cohort._id === action.payload._id ? action.payload : cohort
        )),
      };
    case Actions.COHORT_SELECT:
      return {
        ...state,
        selectedCohort: action.payload,
        showEditCohort: !!action.payload,
    };
  // User
    case Actions.USER_REFRESH_STORE:
      return {
        ...state,
        users: action.payload,
      };
    case Actions.USER_ADD_TO_STORE:
      return {
        ...state,
        users: state.users.concat(action.payload),
      };
    case Actions.USER_REMOVE_FROM_STORE:
      return {
        ...state,
        users: state.users.filter((user: User) => (
          user._id !== action.payload
        )),
      };
    case Actions.USER_UPDATE_IN_STORE:
      return {
        ...state,
        users: state.users.map((user: User) => (
          user._id === action.payload._id ? action.payload : user
        )),
      };
    case Actions.USER_SELECT:
      return {
        ...state,
        selectedUser: action.payload,
        showEditUser: !!action.payload,
      };
    default:
      return state;
  }
}

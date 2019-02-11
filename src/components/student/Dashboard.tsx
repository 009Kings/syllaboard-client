import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import { fetchMessage } from '../../actions/notifications';
import * as studentActions from '../../actions/student_dashboard';
import { State } from '../../reducers';
import { Deliverable } from '../../Types';
import { connectedComponentHelper } from '../../utils/connectedComponent';
import Deliverables from './DeliverablePanel/Deliverables';


// TODO: add all needed state/dispatch to props
const mapStateToProps = (state: State) => ({
  message: state.notifications.message,
  errorMessage: state.auth.error,
  ...state.studentDashboard,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchMessage: () => fetchMessage()(dispatch),
  deliverable: {
    getAllDeliverables: () => studentActions.getAllDeliverables()(dispatch),
    toggleShowDeliverables: () => dispatch(studentActions.toggleShowDeliverables()),
    toggleTurnInDeliverable: () => dispatch(studentActions.toggleTurnInDeliverable()),
  },
});

const { propsGeneric, connect } = connectedComponentHelper<{}>()(
  mapStateToProps, 
  mapDispatchToProps,
);
type ComponentProps = typeof propsGeneric;

type Props = RouteComponentProps<any> & ComponentProps;

class StudentDashboard extends React.Component<Props, {}> {

  componentWillMount() {
    this.props.fetchMessage();
    this.props.getAllDeliverables();
  }

  render() {
    const deliverableData = {
      errorMessage: this.props.errorMessage,
      deliverables: this.props.deliverables,
      selectedDeliverable: this.props.selectedDeliverable,
      ...this.props.deliverable,
    }                                   

    return (
      <div>
        <Typography variant="h2" align="center">
          Student Dashboard
        </Typography>
        <Deliverables {...deliverableData} />
      </div>
    );
  }
}

export default connect(StudentDashboard);

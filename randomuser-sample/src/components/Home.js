import React from 'react';
import axios from 'axios';
import {Media, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import _ from 'lodash';

/**
 * Homepage component
 */
export class Home extends React.Component {

  /**
   * @param {object} props
   * @param {object} context
   */
  constructor(props, context) {
    super(props, context);

    this.state = {
      users: []
    };

    this.fetchUsers();

    this.handleClickRefreshButton = this.onClickRefreshButton.bind(this);
  }

  /**
   * Fetch users from randomuser API
   */
  fetchUsers() {
    let self = this;

    let url = 'https://randomuser.me/api/?results=' + (this.props.countUser ? this.props.countUser : '20');

    axios.get(url)
      .then(function (response) {
        console.log("### Randomuser API response ###", response);
        self.setState({
          users: response.data.results
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onClickRefreshButton() {
    this.fetchUsers();
  }

  /**
   * Render function
   *
   * @returns {JSX}
   */
  render() {
    let users = this.state.users.map((user, index) => {
      return (
        <ListGroupItem key={index}>
          <Media>
            <Media.Left>
              <img width={64} height={64} src={user.picture.thumbnail} alt="thumbnail" />
            </Media.Left>
            <Media.Body>
              <Media.Heading>
                {_.capitalize(user.name.title)} {_.capitalize(user.name.first)} {_.capitalize(user.name.last)}
              </Media.Heading>
              <p>
                Nationalité : {user.nat} <br/>
                Phone : {user.phone} <br/>
                Address : {user.location.street} <br/>
                {user.location.postcode} {user.location.city}
              </p>
            </Media.Body>
          </Media>
        </ListGroupItem>
      );
    });

    return (
      <div>
        <h1>Random users</h1>
        <ListGroup>
          {users}
        </ListGroup>
        <Button onClick={this.handleClickRefreshButton} bsStyle="primary">
          Refresh
        </Button>
      </div>
    );
  }
}
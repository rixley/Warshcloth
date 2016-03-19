// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('react-bootstrap/lib/Table');
var Grid = require('react-bootstrap/lib/Grid');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

/*var WeeklyChart = React.createClass({
    render: function() {
        return (
          <p>This is working</p>
        );
    }
});

*/

var ListItem = React.createClass({
    render: function() {
        return (<li>{this.props.name}</li>);
    }
});

var DisplayList = React.createClass({
    render: function() {
        var items = [];
        this.props.list.forEach(function(item) {
            items.push(<ListItem name={item.name} key={item.name} />);
        });
        return (
            <ul>{items}</ul>
        );
    }
});

/*

var WEEK = [
  {day: 'Sunday'},
  {day: 'Monday'},
  {day: 'Tuesday'},
  {day: 'Wednesday'},
  {day: 'Thursday'},
  {day: 'Friday'},
  {day: 'Saturday'}
];

*/

var TASKS = [
    {name: 'Clean bathroom', person: 'Aria', day: 'Monday'},
    {name: 'Vacuum', person: 'Sonja', day: 'Wednesday'},
    {name: 'Sweep', person: 'Kat', day: 'Friday'},
    {name: 'Cook dinner', person: 'Ray', day: 'Saturday'},
    {name: 'Bathe', person: 'Virgil', day: 'Sunday'}
];

var PEOPLE = [
    {name: 'Aria'},
    {name: 'Sonja'},
    {name: 'Ray'},
    {name: 'Kat'},
    {name: 'Virgil'}
];

var TestReact = React.createClass({
    render: function() {
        return (
          <Table bordered>
            <caption className="text-center">Week</caption>
            <tr>
              <th>S</th>
              <th>M</th>
              <th>T</th>
              <th>W</th>
              <th>T</th>
              <th>F</th>
              <th>S</th>
            </tr>
            <tr>
              <td colSpan="7">Nothing here yet</td>
            </tr>
        </Table>
        );
    }
});

var ChartContent = React.createClass({
    render: function() {
        return (
          <Grid>
              <Row className="show-grid">
                  <Col md={10} mdOffset={1}><TestReact /></Col>
              </Row>
              <Row className="show-grid">
                  <Col md={4} mdOffset={2}><DisplayList list={TASKS} /></Col>
                  <Col md={4} mdOffset={2}><DisplayList list={PEOPLE} /></Col>
              </Row>
          </Grid>
      );
    }
});

ReactDOM.render(
//    <ChartContent tasks={TASKS} week={WEEK} people={PEOPLE} />,
    <ChartContent />,
    document.getElementById('react-container')
);

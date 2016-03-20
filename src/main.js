// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Table = require('react-bootstrap/lib/Table');
var Grid = require('react-bootstrap/lib/Grid');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var ListGroup = require('react-bootstrap/lib/ListGroup');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
var Input = require('react-bootstrap/lib/Input');
var Glyphicon = require('react-bootstrap/lib/Glyphicon');
var Button = require('react-bootstrap/lib/Button');

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
        return (<ListGroupItem>{this.props.name}</ListGroupItem>);
    }
});

var DisplayList = React.createClass({
    render: function() {
        var items = [];
        this.props.list.forEach(function(item) {
            items.push(<ListItem name={item.name} key={item.name} />);
        });
        return (
            <ListGroup className="list">{items}</ListGroup>
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
            <thead>
                <tr>
                  <th>S</th>
                  <th>M</th>
                  <th>T</th>
                  <th>W</th>
                  <th>T</th>
                  <th>F</th>
                  <th>S</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                  <td>Nothing here yet</td>
                  <td>Nothing here yet</td>
                  <td>Nothing here yet</td>
                  <td>Nothing here yet</td>
                  <td>Nothing here yet</td>
                  <td>Nothing here yet</td>
                  <td>Nothing here yet</td>
                </tr>
            </tbody>
        </Table>
        );
    }
});

var ChartContent = React.createClass({
    render: function() {
        var innerGlyphicon = <Glyphicon glyph="plus" />;
        var innerButton = <Button>{innerGlyphicon}</Button>;
        return (
          <Grid>
              <Row className="show-grid">
                  <Col md={10} mdOffset={1}><h1 className="text-center">Week</h1><TestReact /></Col>
              </Row>
              <Row className="show-grid">
                  <Col md={3} mdOffset={2}><h2 className="text-center">Tasks</h2>
                      <form><Input type="text" buttonAfter={innerButton} /></form>
                      <DisplayList list={TASKS} /></Col>
                  <Col md={3} mdOffset={2}><h2 className="text-center">People</h2>
                      <form><Input type="text" buttonAfter={innerButton} /></form>
                      <DisplayList list={PEOPLE} /></Col>
              </Row>
          </Grid>
      );
    }
});

ReactDOM.render(
    <ChartContent />,
    document.getElementById('react-container')
);

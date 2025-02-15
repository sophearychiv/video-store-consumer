import React from 'react';
import PropTypes from 'prop-types';
import CustomerRentals from './CustomerRentals';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
// import './Customer.css';

const Customer = (props) => {
  const onSelectCustomer = () => {
    props.onSelectCustomerCallback(props.customer.id)
  }

  const onDeselectCustomer = () => {
    props.onDeselectCustomerCallback(props.customer.id)
  }

  const onViewRentals = () => {
    props.onCustomerRentalsCallback(props.customer.id)
  }

    
    const selectButton = (props.chosenCustomer === props.customer) ?
      <td><Button size="sm" variant="danger" onClick={onDeselectCustomer}>Deselect</Button></td> :
      <td><Button size="sm" variant="dark" onClick={onSelectCustomer}>Select Customer</Button></td>

    const rentalButton =  (props.viewCustomerRental) ?
      <td><Button variant="danger" size="sm" onClick={onViewRentals}>Close</Button></td> :
      <td><Button variant="outline-dark" size="sm" onClick={onViewRentals}>Customer Rentals</Button></td>
       
  return (
      <div className="avatar">
        <p className="user">#{props.customer.id}. {props.customer.name}</p>
        <p className="buttons">{selectButton}{rentalButton}</p>
        {props.viewCustomerRental && 
        <Card>
          <Card.Body>
            <Card.Title>
              {props.customer.name}'s Rentals
            </Card.Title>
            <Card.Text>
              <Table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Check-out</th>
                    <th>Check-in</th>
                  </tr>
                </thead>
                <CustomerRentals rentals={props.findRentalsCallback(props.customer.id)}/>
                </Table>
            </Card.Text>
          </Card.Body>
        </Card>}
      </div>
  )
}

Customer.propTypes = {
  customer: PropTypes.object.isRequired,
  viewCustomerRental: PropTypes.bool,
  customerRentals: PropTypes.array,
  onSelectCustomerCallback: PropTypes.func.isRequired,
  onCustomerRentalsCallback: PropTypes.func.isRequired,
};

export default Customer;
import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { itemsFetchData } from './actions/items';

class App extends React.Component {
  componentDidMount() {
          this.props.fetchData('https://jlrc.dev.perx.ru/carstock/api/v1/vehicles/?state=active&hidden=false&group=new');
      }

      render() {
          if (this.props.hasErrored) {
              return <p>Sorry! There was an error loading the items</p>;
          }

          if (this.props.isLoading) {
              return <p>Loading…</p>;
          }

          return (
            console.log(this.props.items),

         <table>
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Dealer ID</th>
                    <th>Dealer Name</th>
                </tr>
            </thead>
            <tbody>
              {this.props.items.map((item) => (
              <tr key={item.id}>
                    <td>{item.vin}</td>
                    <td>{item.dealer.id}</td>
                    <td>{item.dealerName}</td>
              </tr>
              ))}
            </tbody>
          </table>
          );
      }
  }

  const mapStateToProps = (state) => {
      return {
          items: state.items,
          hasErrored: state.itemsHasErrored,
          isLoading: state.itemsIsLoading,
      };
  };

  const mapDispatchToProps = (dispatch) => {
      return {
          fetchData: (url) => dispatch(itemsFetchData(url))
      };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(App);

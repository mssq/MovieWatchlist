import { Component } from 'react'
import AlertS from 'react-s-alert';
 
class Alert extends Component  {

  showAlert() {
    AlertS.error('Movie not found!', {
      position: 'top-right',
      effect: 'scale',
      timeout: 2000,
      offset: 100
    });
  }

  render () {
      this.showAlert()
      return null;
  }
}
 
export default Alert;
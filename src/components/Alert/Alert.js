import { Component } from 'react'
import AlertS from 'react-s-alert';
 
class Alert extends Component  {

  showAlert() {
    AlertS.error(this.props.message, {
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
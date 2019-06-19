import React, {Component} from 'react'
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal"


const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {
        state={
            error:null
        }
        componentDidMount(){
            axios.interceptors.request.use(req=>{
                this.setState({error:null}) //whenever I send a request I clean any error.
                return req //returning the request so that the request can continue
            })
            axios.interceptors.response.use(res=>res, error=>{//res=>res means we do not do nothing with
                //the response and thus we return it to let continue the process in axios
                this.setState({error})
            })
        }

        errorConfirmedHandler = () => {
            this.setState({error:null})
        }
        render(){
            return(
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error? this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    } 
}
export default withErrorHandler
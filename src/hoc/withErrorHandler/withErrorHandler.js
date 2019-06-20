import React, {Component} from 'react'
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal"


const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component {
        constructor(props){//using constructor instead of componentDidMount so that we can
            //handle error when childComponents are loaded.It was before in componentDidMount
            //and was working well because interceptors where hanlding network error that user
            //made when clicking some button which occurs after ALL is loaded; but by suing this old approach we could
            //not have handled errors that occurs during loading because componentDidMount in this anonymous
            //component should have rendered after all its childs are rendered so interceptors should have been
            //rendered after errors ocurred. - l-211
            super(props)

            //storing the request interceptor on the this object
            this.reqInterceptors = axios.interceptors.request.use(req=>{
                this.setState({error:null}) //whenever I send a request I clean any error.
                return req //returning the request so that the request can continue
            })
            //storing the response interceptor on the this object
            this.resInterceptors = axios.interceptors.response.use(res=>res, error=>{//res=>res means we do not do nothing with
                //the response and thus we return it to let continue the process in axios
                this.setState({error})
            })
        }
        state={
            error:null
        }

        componentWillUnmount(){
            console.log('[componentWillUnmount ... ', this.reqInterceptors, this.resInterceptors)
            //deleting interceptors otherwise each time this component is created will be attaching more and
            //more interceptors to the same axios instance, and it would be a problem when multiple instances access this withErrorHandler
            //component because we could have multiple interceptors in memory which are not dead and it would
            //cause maybe some problems in state of variables or in the best case they leak to memory 
            //because those are using memory for code that is not needed anymore
            axios.interceptors.request.eject(this.reqInterceptors) //eject => delete request interceptor
            axios.interceptors.response.eject(this.resInterceptors) //eject => delete response interceptor
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